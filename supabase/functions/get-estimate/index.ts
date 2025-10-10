import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (identifier: string, maxRequests = 30, windowMs = 60000): boolean => {
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
  console.log(`[GET-ESTIMATE] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(clientIp)) {
      logStep("Rate limit exceeded", { ip: clientIp });
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 429,
      });
    }
    
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const body = await req.json();
    const { token } = body;
    
    // Input validation
    if (!token || typeof token !== 'string') {
      throw new Error("Valid sharing token is required");
    }
    
    // UUID format validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(token)) {
      throw new Error("Invalid token format");
    }

    logStep("Fetching estimate");

    // RLS policy handles all security checks automatically
    // Only estimates with sharing_enabled=true and valid expiry can be accessed
    const { data: estimate, error: estimateError } = await supabaseClient
      .from('estimates')
      .select('*')
      .eq('sharing_token', token)
      .single();

    if (estimateError || !estimate) {
      logStep("Estimate not found", { error: estimateError?.message });
      throw new Error("Estimate not found or access denied");
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