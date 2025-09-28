-- Drop the overly permissive policy that allows authenticated users access to app_settings
DROP POLICY IF EXISTS "Service role can manage app_settings" ON public.app_settings;

-- Create a proper policy that only allows service role access to app_settings
-- Service roles are identified by having bypass_rls capability
CREATE POLICY "Only service role can access app_settings" 
ON public.app_settings 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Ensure RLS is enabled on app_settings
ALTER TABLE public.app_settings FORCE ROW LEVEL SECURITY;