import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client with service role for accessing user data
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    // Use anon client for auth verification
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    
    const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get user's subscription data from our database
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    // Get user's credit balance
    const { data: creditData, error: creditError } = await supabase
      .rpc('get_user_credit_balance', { p_user_id: user.id });

    if (creditError) {
      logStep("Error getting credit balance", { error: creditError.message });
    }

    const credits = (creditData as any)?.[0]?.balance || 0;
    const templatesDownloaded = (creditData as any)?.[0]?.templates_downloaded || 0;

    if (!subscription) {
      logStep("No active subscription found");
      return new Response(JSON.stringify({
        subscribed: false,
        plan: 'free',
        credits,
        templates_downloaded: templatesDownloaded,
        features: {
          templates: 1,
          watermark: true,
          export_limit: 5
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    logStep("Active subscription found", { 
      plan: subscription.plan,
      status: subscription.status,
      creditsPerMonth: subscription.credits_per_month
    });

    return new Response(JSON.stringify({
      subscribed: true,
      plan: subscription.plan,
      status: subscription.status,
      subscription_end: subscription.current_period_end,
      credits,
      credits_per_month: subscription.credits_per_month,
      templates_downloaded: templatesDownloaded,
      features: subscription.features,
      stripe_customer_id: subscription.stripe_customer_id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});