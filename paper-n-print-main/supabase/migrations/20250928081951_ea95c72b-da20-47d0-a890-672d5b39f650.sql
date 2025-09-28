-- Add accent_color column to business_profiles table for brand customization
ALTER TABLE public.business_profiles 
ADD COLUMN accent_color TEXT DEFAULT '#3b82f6';