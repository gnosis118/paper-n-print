import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GET-ESTIMATE] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { token } = await req.json();
    if (!token) throw new Error("Sharing token is required");

    logStep("Fetching estimate", { token });

    // Use service role to bypass RLS and then manually verify access
    const { data: estimate, error: estimateError } = await supabaseClient
      .from('estimates')
      .select('*')
      .eq('sharing_token', token)
      .single();

    if (estimateError || !estimate) {
      logStep("Estimate not found", { error: estimateError?.message });
      throw new Error("Estimate not found or access denied");
    }

    // Verify sharing is enabled and not expired
    if (!estimate.sharing_enabled) {
      throw new Error("Estimate sharing is disabled");
    }

    if (estimate.sharing_expires_at && new Date(estimate.sharing_expires_at) < new Date()) {
      throw new Error("Estimate sharing has expired");
    }

    logStep("Estimate access granted", { id: estimate.id, status: estimate.status });

    // Return the estimate data (exclude sensitive internal fields)
    const publicEstimate = {
      id: estimate.id,
      number: estimate.number,
      title: estimate.title,
      items: estimate.items,
      subtotal: estimate.subtotal,
      tax_rate: estimate.tax_rate,
      tax_amount: estimate.tax_amount,
      total: estimate.total,
      deposit_type: estimate.deposit_type,
      deposit_value: estimate.deposit_value,
      status: estimate.status,
      terms: estimate.terms,
      created_at: estimate.created_at,
    };

    return new Response(JSON.stringify({ estimate: publicEstimate }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});