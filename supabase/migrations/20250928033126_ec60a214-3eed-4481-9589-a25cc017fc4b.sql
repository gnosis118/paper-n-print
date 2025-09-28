-- Fix security warnings by updating functions with proper search_path

-- Update the handle_updated_at function to have secure search_path
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public;

-- Update the handle_new_user_subscription function to have secure search_path  
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_subscriptions (user_id, plan, status, features)
  VALUES (
    NEW.id, 
    'free', 
    'active',
    '{"templates": 1, "watermark": true, "export_limit": 5}'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public;