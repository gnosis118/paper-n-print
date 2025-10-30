-- Fix function search_path security issue
-- This migration sets search_path to 'public' for all functions to prevent search_path injection attacks

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- Fix handle_new_user_subscription function
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.user_subscriptions (
    user_id, plan, status, is_trial, trial_start_date, trial_end_date, trial_status, features
  )
  VALUES (
    NEW.id, 'free', 'active', true, now(), now() + interval '7 days', 'active',
    '{"templates": 3, "watermark": false, "export_limit": 3, "trial": true}'::JSONB
  );
  RETURN NEW;
END;
$$;

-- Fix expire_trial function
CREATE OR REPLACE FUNCTION public.expire_trial(user_id UUID)
RETURNS TABLE(success BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  UPDATE public.user_subscriptions
  SET 
    is_trial = false,
    trial_status = 'expired',
    plan = 'free',
    features = '{"templates": 3, "watermark": true, "export_limit": 3, "trial": false}'::JSONB,
    updated_at = now()
  WHERE user_subscriptions.user_id = user_id AND is_trial = true AND trial_end_date < now();
  
  RETURN QUERY SELECT true::BOOLEAN, 'Trial expired, converted to free plan'::TEXT;
END;
$$;

