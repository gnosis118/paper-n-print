import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

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
    // Verify JWT token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the user is authenticated
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    console.log('Backfilling Stripe customers for all users...');

    // Get all users without Stripe customer IDs
    const { data: subscriptions, error: fetchError } = await supabase
      .from('user_subscriptions')
      .select(`
        id,
        user_id,
        stripe_customer_id,
        profiles:user_id (
          id,
          email
        )
      `)
      .is('stripe_customer_id', null);

    if (fetchError) {
      throw new Error(`Failed to fetch subscriptions: ${fetchError.message}`);
    }

    console.log(`Found ${subscriptions?.length || 0} users without Stripe customers`);

    const results = [];

    for (const subscription of subscriptions || []) {
      try {
        // Get user email from auth.users
        const { data: authUser, error: userError } = await supabase.auth.admin.getUserById(
          subscription.user_id
        );

        if (userError || !authUser.user) {
          console.error(`Failed to get user ${subscription.user_id}:`, userError);
          results.push({
            userId: subscription.user_id,
            success: false,
            error: 'User not found'
          });
          continue;
        }

        const email = authUser.user.email;
        if (!email) {
          console.error(`No email for user ${subscription.user_id}`);
          results.push({
            userId: subscription.user_id,
            success: false,
            error: 'No email found'
          });
          continue;
        }

        // Check if Stripe customer already exists
        const existingCustomers = await stripe.customers.list({
          email: email,
          limit: 1
        });

        let customerId: string;

        if (existingCustomers.data.length > 0) {
          customerId = existingCustomers.data[0].id;
          console.log(`Found existing Stripe customer for ${email}: ${customerId}`);
        } else {
          // Create new Stripe customer
          const customer = await stripe.customers.create({
            email: email,
            metadata: {
              supabase_user_id: subscription.user_id,
            },
            name: email.split('@')[0],
            description: `ProInvoice user - ${email}`,
          });

          customerId = customer.id;
          console.log(`Created new Stripe customer for ${email}: ${customerId}`);
        }

        // Update user_subscriptions with Stripe customer ID
        const { error: updateError } = await supabase
          .from('user_subscriptions')
          .update({
            stripe_customer_id: customerId,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', subscription.user_id);

        if (updateError) {
          throw new Error(`Failed to update subscription: ${updateError.message}`);
        }

        results.push({
          userId: subscription.user_id,
          email: email,
          customerId: customerId,
          success: true,
          created: existingCustomers.data.length === 0
        });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error processing user ${subscription.user_id}:`, error);
        results.push({
          userId: subscription.user_id,
          success: false,
          error: errorMessage
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Backfill complete: ${successCount} succeeded, ${failureCount} failed`,
        total: results.length,
        successCount,
        failureCount,
        results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error in backfill-stripe-customers function:', error);
    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: errorStack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

