-- Migration: Auto-create Stripe customers for new users
-- This sets up a database webhook that triggers when a new user signs up
-- The webhook calls the create-stripe-customer Edge Function

-- First, enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function that will be triggered when a new user is created
CREATE OR REPLACE FUNCTION public.trigger_create_stripe_customer()
RETURNS TRIGGER AS $$
DECLARE
  request_id bigint;
  function_url text;
BEGIN
  -- Get the Supabase project URL from environment or construct it
  -- Replace with your actual Supabase project URL
  function_url := 'https://hkzrfqpnkvpmsaeluksh.supabase.co/functions/v1/create-stripe-customer';
  
  -- Make async HTTP request to Edge Function
  SELECT net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'users',
      'record', jsonb_build_object(
        'id', NEW.id,
        'email', NEW.email,
        'raw_user_meta_data', NEW.raw_user_meta_data
      ),
      'old_record', null
    )
  ) INTO request_id;
  
  -- Log the request
  RAISE LOG 'Triggered create-stripe-customer function for user %', NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users table
-- This will fire AFTER a new user is inserted
DROP TRIGGER IF EXISTS on_auth_user_created_stripe_customer ON auth.users;

CREATE TRIGGER on_auth_user_created_stripe_customer
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_create_stripe_customer();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA net TO postgres, anon, authenticated, service_role;

-- Add comment
COMMENT ON FUNCTION public.trigger_create_stripe_customer() IS 
'Automatically creates a Stripe customer when a new user signs up by calling the create-stripe-customer Edge Function';

