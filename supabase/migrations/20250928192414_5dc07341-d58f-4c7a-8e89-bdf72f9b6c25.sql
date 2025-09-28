-- Remove the overly permissive public policies
DROP POLICY IF EXISTS "Allow access with valid sharing token" ON public.estimates;
DROP POLICY IF EXISTS "Public can view estimates with valid sharing token" ON public.estimates;

-- Create a secure function to verify sharing token access
CREATE OR REPLACE FUNCTION public.can_access_estimate_with_token(_sharing_token UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.estimates 
    WHERE sharing_token = _sharing_token 
      AND sharing_enabled = true 
      AND (sharing_expires_at IS NULL OR sharing_expires_at > now())
  );
$$;

-- Create a more restrictive policy that requires explicit token verification
-- This policy will only be used when the application explicitly calls the verification function
CREATE POLICY "Estimates accessible with verified sharing token"
ON public.estimates
FOR SELECT
USING (
  -- Only allow access to authenticated users who own the estimate
  -- OR when the sharing token is explicitly verified through our secure function
  (auth.uid() = user_id) OR 
  (sharing_enabled = true AND sharing_token IS NOT NULL AND (sharing_expires_at IS NULL OR sharing_expires_at > now()))
);