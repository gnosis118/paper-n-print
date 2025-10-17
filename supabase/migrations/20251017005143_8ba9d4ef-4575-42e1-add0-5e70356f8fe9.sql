-- Add missing email column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email text;

-- Add index for better performance on email lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);