import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[ESTIMATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { slug } = await req.json();
    if (!slug) throw new Error("Estimate slug is required");

    logStep("Fetching estimate", { slug });

    // Get estimate by slug
    const { data: estimate, error: estimateError } = await supabaseClient
      .from('estimates')
      .select('*')
      .eq('public_slug', slug)
      .single();

    if (estimateError || !estimate) {
      throw new Error(`Estimate not found: ${estimateError?.message}`);
    }

    if (estimate.status !== 'sent') {
      throw new Error("Estimate is not available for payment");
    }

    logStep("Estimate found", { id: estimate.id, status: estimate.status });

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
      success_url: `${req.headers.get("origin")}/e/${slug}?success=true`,
      cancel_url: `${req.headers.get("origin")}/e/${slug}?canceled=true`,
      metadata: {
        estimate_id: estimate.id,
        estimate_slug: slug,
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
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});