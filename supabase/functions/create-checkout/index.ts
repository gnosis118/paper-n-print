import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Price lookup keys mapping
const PRICE_LOOKUP_KEYS = {
  lite_monthly: "invoicepro_lite_monthly",
  lite_annual: "invoicepro_lite_annual", 
  pro_monthly: "invoicepro_pro_monthly",
  pro_annual: "invoicepro_pro_annual",
  agency_monthly: "invoicepro_agency_monthly",
  agency_annual: "invoicepro_agency_annual",
  template_onetime: "invoicepro_template_onetime",
  template_trial: "invoicepro_template_trial"
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  logStep(`Function started - Method: ${req.method}`);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body - support both old and new format
    const requestData = await req.json();
    logStep("Request data", requestData);
    
    // Handle legacy format (priceId) or new format (plan_type, billing_cycle, product_type)
    const { priceId, plan_type, billing_cycle, product_type } = requestData;

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    logStep("Authenticated user", { email: user.email, userId: user.id });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if a Stripe customer exists for this user
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      logStep("No existing customer, will create during checkout");
    }

    let finalPriceId: string;
    let mode: "subscription" | "payment";
    
    // Determine price ID and mode
    if (priceId) {
      // Legacy format - use provided price ID
      finalPriceId = priceId;
      mode = "subscription"; // Default to subscription for legacy
      logStep("Using legacy priceId", { priceId });
    } else {
      // New format - use lookup keys
      if (product_type === "template") {
        const lookupKey = plan_type === "trial" ? PRICE_LOOKUP_KEYS.template_trial : PRICE_LOOKUP_KEYS.template_onetime;
        mode = "payment";
        
        // Find price by lookup key
        const prices = await stripe.prices.search({
          query: `lookup_key:'${lookupKey}' AND active:'true'`
        });
        
        if (prices.data.length === 0) {
          throw new Error(`Price not found for lookup key: ${lookupKey}`);
        }
        
        finalPriceId = prices.data[0].id;
        logStep("Template purchase", { lookupKey, priceId: finalPriceId });
      } else {
        // Subscription plans
        if (!plan_type || !billing_cycle) {
          throw new Error("plan_type and billing_cycle are required for subscriptions");
        }
        
        const key = `${plan_type}_${billing_cycle}` as keyof typeof PRICE_LOOKUP_KEYS;
        const lookupKey = PRICE_LOOKUP_KEYS[key];
        
        if (!lookupKey) {
          throw new Error(`Invalid plan combination: ${plan_type} ${billing_cycle}`);
        }
        
        mode = "subscription";
        
        // Find price by lookup key
        const prices = await stripe.prices.search({
          query: `lookup_key:'${lookupKey}' AND active:'true'`
        });
        
        if (prices.data.length === 0) {
          throw new Error(`Price not found for lookup key: ${lookupKey}`);
        }
        
        finalPriceId = prices.data[0].id;
        logStep("Subscription purchase", { lookupKey, priceId: finalPriceId, plan: plan_type, cycle: billing_cycle });
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: finalPriceId,
          quantity: 1,
        },
      ],
      mode,
      allow_promotion_codes: true,
      success_url: mode === "subscription" 
        ? `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`
        : `${req.headers.get("origin")}/templates?purchased=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
      metadata: {
        user_id: user.id,
        plan_type: plan_type || "",
        billing_cycle: billing_cycle || "",
        product_type: product_type || "subscription"
      }
    });

    logStep("Checkout session created", { sessionId: session.id, mode });

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    logStep("ERROR", { message: error instanceof Error ? error.message : String(error) });
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Checkout creation failed" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});