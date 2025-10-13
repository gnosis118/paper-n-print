import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookPayload {
  type: 'INSERT';
  table: string;
  record: {
    id: string;
    email: string;
    raw_user_meta_data?: {
      business_name?: string;
      full_name?: string;
    };
  };
  old_record: null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: WebhookPayload = await req.json();
    
    console.log('Webhook received:', {
      type: payload.type,
      table: payload.table,
      userId: payload.record.id,
      email: payload.record.email
    });

    // Only process INSERT events on auth.users table
    if (payload.type !== 'INSERT' || payload.table !== 'users') {
      return new Response(
        JSON.stringify({ message: 'Not a user insert event' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const { id: userId, email, raw_user_meta_data } = payload.record;

    // Check if customer already exists
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1
    });

    let customerId: string;

    if (existingCustomers.data.length > 0) {
      // Customer already exists
      customerId = existingCustomers.data[0].id;
      console.log('Existing Stripe customer found:', customerId);
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: email,
        metadata: {
          supabase_user_id: userId,
          business_name: raw_user_meta_data?.business_name || '',
        },
        name: raw_user_meta_data?.full_name || raw_user_meta_data?.business_name || email.split('@')[0],
        description: `ProInvoice user - ${email}`,
      });

      customerId = customer.id;
      console.log('New Stripe customer created:', customerId);
    }

    // Update user_subscriptions table with Stripe customer ID
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const updateResponse = await fetch(
      `${supabaseUrl}/rest/v1/user_subscriptions?user_id=eq.${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          stripe_customer_id: customerId,
          updated_at: new Date().toISOString()
        })
      }
    );

    if (!updateResponse.ok) {
      const error = await updateResponse.text();
      console.error('Failed to update user_subscriptions:', error);
      throw new Error(`Failed to update subscription: ${error}`);
    }

    const updatedSubscription = await updateResponse.json();
    console.log('Updated user_subscriptions:', updatedSubscription);

    return new Response(
      JSON.stringify({
        success: true,
        customerId: customerId,
        userId: userId,
        message: 'Stripe customer created and linked successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in create-stripe-customer function:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.stack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

