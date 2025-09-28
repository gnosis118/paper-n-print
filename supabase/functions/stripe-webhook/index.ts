import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CREDIT_MAP = {
  lite: 2,
  pro: 6, 
  agency: 15
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

// Helper to determine tier from price lookup key
function getTierFromLookupKey(lookupKey: string): string | null {
  if (!lookupKey) return null;
  
  if (lookupKey.includes("lite")) return "lite";
  if (lookupKey.includes("pro")) return "pro";
  if (lookupKey.includes("agency")) return "agency";
  return null;
}

// Helper to get first day of next month
function getFirstOfNextMonth(date = new Date()): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1, 0, 0, 0));
}

serve(async (req) => {
  logStep(`Webhook received - Method: ${req.method}`);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Create Supabase client with service role key for database operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Verify webhook signature
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!signature || !webhookSecret) {
      throw new Error("Missing webhook signature or secret");
    }

    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    
    logStep("Event received", { type: event.type, id: event.id });

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        logStep("Checkout completed", { 
          sessionId: session.id, 
          customerId: session.customer,
          mode: session.mode
        });

        // For one-time payments (templates), add credits immediately
        if (session.mode === "payment") {
          const metadata = session.metadata;
          if (metadata?.product_type === "template") {
            // Find user by customer ID
            const { data: profiles } = await supabase
              .from('profiles')
              .select('id')
              .eq('id', metadata.user_id)
              .single();

            if (profiles) {
              // Add template credit (1 credit per template purchase)
              const { error } = await supabase
                .from('credit_ledger')
                .insert({
                  user_id: metadata.user_id,
                  delta: 1,
                  reason: `template_purchase:${metadata.plan_type || 'standard'}`,
                  stripe_event_id: event.id
                });

              if (error) {
                logStep("Error adding template credits", { error: error.message });
              } else {
                logStep("Template credits added", { userId: metadata.user_id });
              }
            }
          }
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const price = subscription.items.data[0]?.price;
        
        if (!price?.lookup_key) {
          logStep("No lookup key found for subscription", { subscriptionId: subscription.id });
          break;
        }

        const tier = getTierFromLookupKey(price.lookup_key);
        const interval = price.recurring?.interval;
        
        logStep("Processing subscription", { 
          subscriptionId: subscription.id,
          tier,
          interval,
          status: subscription.status
        });

        // Find user by customer ID
        const customerId = subscription.customer;
        const { data: userSub } = await supabase
          .from('user_subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single();

        let userId = userSub?.user_id;

        // If no user found, try to find by customer email
        if (!userId) {
          const customer = await stripe.customers.retrieve(customerId as string);
          if ('email' in customer && customer.email) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('id')
              .eq('email', customer.email)
              .single();
            
            userId = profile?.id;
          }
        }

        if (!userId) {
          logStep("Cannot find user for subscription", { customerId });
          break;
        }

        // Update subscription record
        const subscriptionData = {
          user_id: userId,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: customerId,
          plan: tier || 'unknown',
          status: subscription.status,
          stripe_price_id: price.id,
          credits_per_month: tier ? CREDIT_MAP[tier as keyof typeof CREDIT_MAP] : 0,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          next_credit_at: interval === "year" ? getFirstOfNextMonth().toISOString() : null,
          features: {
            templates: tier === 'lite' ? 3 : tier === 'pro' ? 10 : 25,
            watermark: false,
            export_limit: tier === 'lite' ? 50 : tier === 'pro' ? 200 : -1
          }
        };

        const { error } = await supabase
          .from('user_subscriptions')
          .upsert(subscriptionData, { 
            onConflict: 'stripe_subscription_id',
            ignoreDuplicates: false 
          });

        if (error) {
          logStep("Error upserting subscription", { error: error.message });
        } else {
          logStep("Subscription upserted", { subscriptionId: subscription.id });
        }

        // Update user profile subscription status
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            subscription_status: tier || 'free',
            plan: tier || 'free'
          })
          .eq('id', userId);

        if (profileError) {
          logStep("Error updating profile", { error: profileError.message });
        }

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        
        if (!invoice.subscription) {
          logStep("Invoice not related to subscription", { invoiceId: invoice.id });
          break;
        }

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
        const price = subscription.items.data[0]?.price;
        const tier = getTierFromLookupKey(price?.lookup_key || "");
        const interval = price?.recurring?.interval;

        logStep("Processing invoice payment", { 
          invoiceId: invoice.id, 
          subscriptionId: subscription.id,
          tier,
          interval
        });

        // Find user
        const { data: userSub } = await supabase
          .from('user_subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single();

        if (!userSub?.user_id) {
          logStep("Cannot find user for subscription payment", { subscriptionId: subscription.id });
          break;
        }

        const credits = tier ? CREDIT_MAP[tier as keyof typeof CREDIT_MAP] : 0;

        // For monthly plans, add credits immediately
        // For annual plans, add the first month's credits (future months handled by cron)
        if (credits > 0) {
          const reason = interval === "month" ? "monthly_grant" : "annual_first_grant";
          
          // Check if credits already granted for this event (idempotency)
          const { data: existingCredit } = await supabase
            .from('credit_ledger')
            .select('id')
            .eq('stripe_event_id', event.id)
            .single();

          if (!existingCredit) {
            const { error } = await supabase
              .from('credit_ledger')
              .insert({
                user_id: userSub.user_id,
                delta: credits,
                reason,
                stripe_event_id: event.id
              });

            if (error) {
              logStep("Error adding subscription credits", { error: error.message });
            } else {
              logStep("Subscription credits added", { 
                userId: userSub.user_id, 
                credits, 
                reason 
              });
            }
          } else {
            logStep("Credits already granted for this event", { eventId: event.id });
          }
        }
        
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        
        if (invoice.subscription) {
          // Update subscription status to past_due
          const { error } = await supabase
            .from('user_subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', invoice.subscription);

          logStep("Subscription marked as past_due", { 
            subscriptionId: invoice.subscription,
            error: error?.message 
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        
        // Update subscription status
        const { error: subError } = await supabase
          .from('user_subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id);

        // Reset user profile to free
        const { data: userSub } = await supabase
          .from('user_subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single();

        if (userSub?.user_id) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ 
              subscription_status: 'free',
              plan: 'free'
            })
            .eq('id', userSub.user_id);

          logStep("User reset to free plan", { 
            userId: userSub.user_id,
            subscriptionId: subscription.id,
            errors: {
              subscription: subError?.message,
              profile: profileError?.message
            }
          });
        }
        break;
      }

      default:
        logStep("Unhandled event type", { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    logStep("ERROR processing webhook", { 
      message: error instanceof Error ? error.message : String(error) 
    });
    
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Webhook processing failed" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});