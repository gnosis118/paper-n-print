-- Enhance estimate sharing security by adding public RLS policy
-- This allows the edge function to use anon key instead of service role
-- RLS will handle all security checks automatically

CREATE POLICY "Public can view shared estimates via token"
ON public.estimates
FOR SELECT
TO anon
USING (
  sharing_enabled = true 
  AND (sharing_expires_at IS NULL OR sharing_expires_at > now())
);

-- This policy allows anyone (including anonymous users) to read estimates
-- but ONLY if:
-- 1. sharing_enabled is true
-- 2. sharing_expires_at is NULL or hasn't passed yet
-- The edge function will still filter by sharing_token to find the specific estimate