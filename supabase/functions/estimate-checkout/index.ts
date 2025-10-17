import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (identifier: string, maxRequests = 10, windowMs = 60000): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
};

const logStep = (step: string, details?: any) => {
  const env = Deno.env.get("DENO_DEPLOYMENT_ID") ? "production" : "development";
  if (env === "production" && details?.token) {
    // Don't log tokens in production
    delete details.token;
  }
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[ESTIMATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP (stricter for checkout)
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(clientIp)) {
      logStep("Rate limit exceeded", { ip: clientIp });
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 429,
      });
    }
    
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const body = await req.json();
    const { token } = body;
    
    // Input validation
    if (!token || typeof token !== 'string') {
      throw new Error("Valid estimate sharing token is required");
    }
    
    // UUID format validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(token)) {
      throw new Error("Invalid token format");
    }

    logStep("Fetching estimate");

    // Get estimate by sharing token
    const { data: estimate, error: estimateError } = await supabaseClient
      .from('estimates')
      .select('*')
      .eq('sharing_token', token)
      .single();

    if (estimateError || !estimate) {
      throw new Error(`Estimate not found: ${estimateError?.message}`);
    }

    if (estimate.status !== 'sent') {
      throw new Error("Estimate is not available for payment");
    }

    logStep("Estimate found", { id: estimate.id, status: estimate.status });

    // Check user subscription - deposit collection requires paid subscription
    const { data: subscription } = await supabaseClient
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', estimate.user_id)
      .eq('status', 'active')
      .single();

    if (!subscription || subscription.plan === 'free') {
      logStep("Subscription check failed", {
        userId: estimate.user_id,
        hasSubscription: !!subscription,
        plan: subscription?.plan
      });
      throw new Error('Deposit collection requires a paid subscription. The business owner needs to upgrade to Pro or Agency plan.');
    }

    logStep("Subscription verified", { plan: subscription.plan });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Calculate deposit amount
    let depositAmount: number;
    if (estimate.deposit_type === 'percent') {
      depositAmount = Math.round((estimate.total * estimate.deposit_value) / 100 * 100); // Convert to cents
    } else {
      depositAmount = Math.round(estimate.deposit_value * 100); // Convert to cents
    }

    logStep("Creating checkout session", { depositAmount });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'us_bank_account'],
      payment_method_options: {
        us_bank_account: {
          financial_connections: {
            permissions: ['payment_method'],
          },
        },
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Deposit for Estimate #${estimate.number}`,
              description: estimate.title,
            },
            unit_amount: depositAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get("origin")}/e/${token}?success=true`,
      cancel_url: `${req.headers.get("origin")}/e/${token}?canceled=true`,
      metadata: {
        estimate_id: estimate.id,
        estimate_token: token,
      },
    });

    logStep("Checkout session created", { sessionId: session.id });

    // Update estimate with checkout session ID
    await supabaseClient
      .from('estimates')
      .update({ checkout_session_id: session.id })
      .eq('id', estimate.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });

    // Return generic error message to client, log detailed error server-side
    const clientError = errorMessage.includes('subscription') || errorMessage.includes('not found') || errorMessage.includes('not available')
      ? errorMessage
      : 'An error occurred processing your request';

    return new Response(JSON.stringify({ error: clientError }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});