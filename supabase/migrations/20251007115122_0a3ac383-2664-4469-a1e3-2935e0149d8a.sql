-- SECURITY FIX: Remove email column from profiles table to prevent PII exposure
-- Emails are already stored in auth.users and should not be duplicated

-- Drop the email column from profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;

-- Add a comment explaining why we removed it
COMMENT ON TABLE public.profiles IS 'User profile data. Email addresses are stored in auth.users only to prevent PII duplication and exposure risks.';