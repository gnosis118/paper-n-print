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

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
};

const handlePayment = async (req: Request): Promise<Response> => {
  logStep("Function started", { method: req.method });

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    throw new SecurityError("Method not allowed", 405);
  }

  try {
    // Create Supabase client using the anon key for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Retrieve authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Check user subscription - payment links require paid subscription
    const { data: subscription } = await supabaseClient
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (!subscription || subscription.plan === 'free') {
      logStep("Subscription check failed", { hasSubscription: !!subscription, plan: subscription?.plan });
      throw new SecurityError('Payment links require a paid subscription. Please upgrade to Pro or Agency plan.', 403);
    }

    logStep("Subscription verified", { plan: subscription.plan });

    // Parse and validate request body
    const body = await req.json();
    const { invoiceId, amount, description, clientEmail } = body;
    
    // Enhanced input validation
    const validatedAmount = inputValidator.validateAmount(amount);
    const validatedInvoiceId = inputValidator.validateString(invoiceId, 100, 'invoiceId');
    const validatedDescription = inputValidator.validateString(description || '', 500, 'description');
    
    if (clientEmail) {
      inputValidator.validateEmail(clientEmail);
    }

    logStep("Payment request received", { 
      invoiceId: validatedInvoiceId, 
      amount: validatedAmount, 
      description: validatedDescription,
      hasClientEmail: !!clientEmail
    });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if a Stripe customer record exists for the user (business owner)
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    // Create checkout session for one-time payment
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Invoice Payment - ${invoiceId}`,
              description: description || `Payment for Invoice ${invoiceId}`,
            },
            unit_amount: Math.round(validatedAmount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_intent_data: {
        statement_descriptor: "PROINVOICE",
        statement_descriptor_suffix: "INVOICE"
      },
      success_url: `${req.headers.get("origin")}/payment-success?invoice_id=${validatedInvoiceId}`,
      cancel_url: `${req.headers.get("origin")}/invoice`,
      metadata: {
        invoice_id: validatedInvoiceId,
        user_id: user.id,
        client_email: clientEmail || '',
        payment_type: 'invoice'
      },
      // Prefill customer email if provided
      ...(clientEmail && { customer_email: clientEmail }),
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    // Log security-related errors
    if (error instanceof SecurityError) {
      securityLogger.logSecurityEvent('PAYMENT_SECURITY_ERROR', { 
        message: errorMessage,
        statusCode: error.statusCode
      }, 'WARN');
    } else {
      securityLogger.logSecurityEvent('PAYMENT_ERROR', { message: errorMessage }, 'ERROR');
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: error instanceof SecurityError ? error.statusCode : 500,
    });
  }
};

// Apply security middleware
serve(securityMiddleware.withSecurity(handlePayment, {
  maxRequestsPerMinute: 10, // Allow 10 payment requests per minute per IP
  maxPayloadSize: 5 * 1024, // 5KB max payload
  timeoutMs: 30000, // 30 second timeout
  requireUserAgent: true,
  allowedOrigins: ['*'] // Allow all origins for now, can be restricted later
}));