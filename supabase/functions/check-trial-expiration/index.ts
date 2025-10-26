import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Get the JWT token
    const token = authHeader.replace('Bearer ', '');

    // Verify JWT and get user ID
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Decode JWT to get user ID (basic decoding, Supabase will verify)
    const parts = token.split('.');
    if (parts.length !== 3) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Get user from auth
    const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': supabaseServiceKey,
      },
    });

    if (!authResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const user = await authResponse.json();
    const userId = user.id;

    // Get subscription info
    const subscriptionResponse = await fetch(
      `${supabaseUrl}/rest/v1/user_subscriptions?user_id=eq.${userId}`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
      }
    );

    if (!subscriptionResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch subscription' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const subscriptions = await subscriptionResponse.json();
    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({ 
          isExpired: false, 
          message: 'No subscription found' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const subscription = subscriptions[0];
    const trialEndDate = subscription.trial_end_date ? new Date(subscription.trial_end_date) : null;
    const now = new Date();
    const isExpired = trialEndDate && trialEndDate < now && subscription.is_trial;

    // If trial is expired and not yet converted, convert it
    if (isExpired && subscription.trial_status === 'active') {
      const updateResponse = await fetch(
        `${supabaseUrl}/rest/v1/user_subscriptions?user_id=eq.${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            is_trial: false,
            trial_status: 'expired',
            plan: 'free',
            features: {
              templates: 3,
              watermark: true,
              export_limit: 3,
              trial: false,
            },
            updated_at: new Date().toISOString(),
          }),
        }
      );

      if (!updateResponse.ok) {
        console.error('Failed to update subscription:', await updateResponse.text());
      }
    }

    const daysRemaining = trialEndDate 
      ? Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    return new Response(
      JSON.stringify({
        isExpired: isExpired || false,
        isTrialActive: subscription.is_trial && !isExpired,
        daysRemaining: Math.max(0, daysRemaining),
        plan: subscription.plan,
        features: subscription.features,
        trialEndDate: trialEndDate?.toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error in check-trial-expiration:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

