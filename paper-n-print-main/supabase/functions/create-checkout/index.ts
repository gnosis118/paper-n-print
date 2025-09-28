import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { 
  securityMiddleware, 
  securityLogger, 
  inputValidator, 
  SecurityError 
} from "../_shared/security.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Direct price ID mapping based on existing Stripe prices
const PRICE_IDS = {
  lite_monthly: "price_1SCDIjGpz30x93KjADgoYSMS",      // $9/month
  lite_annual: "price_1SCDIvGpz30x93KjDmPo4w2a",       // $90/year
  pro_monthly: "price_1SCDJ4Gpz30x93KjNOLCJgNK",       // $19/month
  pro_annual: "price_1SCDJFGpz30x93KjrppMsUf7",        // $190/year
  agency_monthly: "price_1SCDKrGpz30x93KjeKGawyGN",     // $39/month
  agency_annual: "price_1SCDMRGpz30x93KjRMUamIOP",      // $390/year
  template_onetime: "price_1SCDMZGpz30x93Kj3kh1GXZS",   // $10 one-time
  template_trial: "price_1SCDMkGpz30x93KjqjZ806yi"      // $5 trial
} as const;

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

const handleCheckout = async (req: Request): Promise<Response> => {
  logStep(`Function started - Method: ${req.method}`);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    throw new SecurityError("Method not allowed", 405);
  }

  try {
    // Parse and validate request body - support both old and new format
    const requestData = await req.json();
    logStep("Request data received", { hasKeys: Object.keys(requestData) });
    
    // Handle legacy format (priceId) or new format (plan_type, billing_cycle, product_type)
    const { priceId, plan_type, billing_cycle, product_type } = requestData;
    
    // Validate input data
    if (priceId) {
      inputValidator.validateString(priceId, 100, 'priceId');
    }
    if (plan_type) {
      inputValidator.validateString(plan_type, 50, 'plan_type');
    }
    if (billing_cycle) {
      inputValidator.validateString(billing_cycle, 20, 'billing_cycle');
    }
    if (product_type) {
      inputValidator.validateString(product_type, 50, 'product_type');
    }

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
      // New format - use direct price IDs
      if (product_type === "template") {
        const priceKey = plan_type === "trial" ? "template_trial" : "template_onetime";
        finalPriceId = PRICE_IDS[priceKey as keyof typeof PRICE_IDS];
        mode = "payment";
        logStep("Template purchase", { priceKey, priceId: finalPriceId });
      } else {
        // Subscription plans
        if (!plan_type || !billing_cycle) {
          throw new Error("plan_type and billing_cycle are required for subscriptions");
        }
        
        const priceKey = `${plan_type}_${billing_cycle}` as keyof typeof PRICE_IDS;
        finalPriceId = PRICE_IDS[priceKey];
        
        if (!finalPriceId) {
          throw new Error(`Invalid plan combination: ${plan_type} ${billing_cycle}`);
        }
        
        mode = "subscription";
        logStep("Subscription purchase", { priceKey, priceId: finalPriceId, plan: plan_type, cycle: billing_cycle });
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    // Log security-related errors
    if (error instanceof SecurityError) {
      securityLogger.logSecurityEvent('CHECKOUT_SECURITY_ERROR', { 
        message: errorMessage,
        statusCode: error.statusCode
      }, 'WARN');
    } else {
      securityLogger.logSecurityEvent('CHECKOUT_ERROR', { message: errorMessage }, 'ERROR');
    }
    
    return new Response(JSON.stringify({ 
      error: error instanceof SecurityError ? errorMessage : "Checkout creation failed" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: error instanceof SecurityError ? error.statusCode : 500,
    });
  }
};

// Apply security middleware
serve(securityMiddleware.withSecurity(handleCheckout, {
  maxRequestsPerMinute: 20, // Allow 20 checkout requests per minute per IP
  maxPayloadSize: 5 * 1024, // 5KB max payload
  timeoutMs: 45000, // 45 second timeout (Stripe calls can be slow)
  requireUserAgent: true,
  allowedOrigins: ['*'] // Allow all origins for now, can be restricted later
}));