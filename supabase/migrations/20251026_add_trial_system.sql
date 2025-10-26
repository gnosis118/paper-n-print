-- Add trial system support to user_subscriptions table

-- Add trial-related columns
ALTER TABLE public.user_subscriptions
ADD COLUMN IF NOT EXISTS is_trial BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS trial_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS trial_status TEXT DEFAULT 'active'; -- active, expired, converted

-- Update the handle_new_user_subscription function to set trial dates
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_subscriptions (
    user_id, 
    plan, 
    status, 
    is_trial,
    trial_start_date,
    trial_end_date,
    trial_status,
    features
  )
  VALUES (
    NEW.id, 
    'free', 
    'active',
    true,
    now(),
    now() + interval '7 days',
    'active',
    '{"templates": 3, "watermark": false, "export_limit": 3, "trial": true}'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check and handle trial expiration
CREATE OR REPLACE FUNCTION public.check_trial_expiration(user_id UUID)
RETURNS TABLE(is_expired BOOLEAN, trial_status TEXT, plan TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (us.trial_end_date < now() AND us.is_trial = true)::BOOLEAN as is_expired,
    us.trial_status,
    us.plan
  FROM public.user_subscriptions us
  WHERE us.user_id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to expire trial and convert to free plan
CREATE OR REPLACE FUNCTION public.expire_trial(user_id UUID)
RETURNS TABLE(success BOOLEAN, message TEXT) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create table to track trial expiration notifications (to avoid showing popup multiple times)
CREATE TABLE IF NOT EXISTS public.trial_expiration_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  dismissed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on trial_expiration_notifications
ALTER TABLE public.trial_expiration_notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for trial_expiration_notifications
CREATE POLICY "Users can view their own trial notifications"
ON public.trial_expiration_notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own trial notifications"
ON public.trial_expiration_notifications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trial notifications"
ON public.trial_expiration_notifications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

