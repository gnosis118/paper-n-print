-- Fix the app_settings policy to properly restrict access to service roles only
-- Drop the existing policy that's not properly restrictive
DROP POLICY IF EXISTS "Only service role can access app_settings" ON public.app_settings;

-- Create a proper policy that actually restricts access to service roles
-- This policy will deny access to regular authenticated users and only allow service role access
CREATE POLICY "Service role only access to app_settings" 
ON public.app_settings 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Also create a policy that explicitly denies access to authenticated users
CREATE POLICY "Deny authenticated user access to app_settings" 
ON public.app_settings 
FOR ALL 
TO authenticated
USING (false)
WITH CHECK (false);