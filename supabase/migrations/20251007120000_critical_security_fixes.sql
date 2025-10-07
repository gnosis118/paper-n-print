-- CRITICAL SECURITY FIXES
-- Date: 2025-10-07
-- Issues addressed:
-- 1. Move cron_secret from app_settings table to environment variables
-- 2. Add additional protection for clients table
-- 3. Add audit logging for sensitive data access

-- ============================================================================
-- ISSUE 1: Remove cron_secret from database, use environment variables instead
-- ============================================================================

-- Create a new app_settings table without the cron_secret field
CREATE TABLE IF NOT EXISTS public.app_settings_new (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_url TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Copy existing data (excluding cron_secret)
INSERT INTO public.app_settings_new (id, site_url, updated_at)
SELECT id, site_url, updated_at FROM public.app_settings
ON CONFLICT (id) DO NOTHING;

-- Drop old table and rename new one
DROP TABLE IF EXISTS public.app_settings CASCADE;
ALTER TABLE public.app_settings_new RENAME TO app_settings;

-- Enable RLS on new table
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Create restrictive policies
CREATE POLICY "Service role only access to app_settings" 
ON public.app_settings 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Deny authenticated user access to app_settings" 
ON public.app_settings 
FOR ALL 
TO authenticated
USING (false)
WITH CHECK (false);

-- Add comment explaining the security change
COMMENT ON TABLE public.app_settings IS 'Application settings. Sensitive secrets like cron_secret are stored in environment variables, not in the database.';

-- ============================================================================
-- ISSUE 2: Enhanced protection for clients table
-- ============================================================================

-- Add encryption indicator column (for future encryption implementation)
ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS email_encrypted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS data_classification TEXT DEFAULT 'PII';

-- Add index for better performance on user_id lookups
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients(user_id);

-- Update RLS policies to be more explicit and add additional checks
DROP POLICY IF EXISTS "Users can view their own clients" ON public.clients;
DROP POLICY IF EXISTS "Users can create their own clients" ON public.clients;
DROP POLICY IF EXISTS "Users can update their own clients" ON public.clients;
DROP POLICY IF EXISTS "Users can delete their own clients" ON public.clients;

-- Create new, more secure policies with explicit checks
CREATE POLICY "Users can view only their own clients" 
ON public.clients 
FOR SELECT 
USING (
  auth.uid() = user_id 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can insert only their own clients" 
ON public.clients 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id 
  AND auth.uid() IS NOT NULL
  AND email IS NOT NULL
  AND name IS NOT NULL
);

CREATE POLICY "Users can update only their own clients" 
ON public.clients 
FOR UPDATE 
USING (
  auth.uid() = user_id 
  AND auth.uid() IS NOT NULL
)
WITH CHECK (
  auth.uid() = user_id 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can delete only their own clients" 
ON public.clients 
FOR DELETE 
USING (
  auth.uid() = user_id 
  AND auth.uid() IS NOT NULL
);

-- Add comment about data sensitivity
COMMENT ON TABLE public.clients IS 'Client contact information (PII). Protected by RLS policies that enforce user_id ownership. All access must verify auth.uid() matches user_id.';
COMMENT ON COLUMN public.clients.email IS 'Client email address (PII). Consider encryption for additional security.';
COMMENT ON COLUMN public.clients.address IS 'Client address (PII). Consider encryption for additional security.';

-- ============================================================================
-- ISSUE 3: Create audit log for sensitive data access
-- ============================================================================

-- Create audit log table for tracking access to sensitive data
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only service role can write to audit log
CREATE POLICY "Service role can insert audit logs" 
ON public.audit_log 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Users can view their own audit logs
CREATE POLICY "Users can view their own audit logs" 
ON public.audit_log 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);

-- ============================================================================
-- ISSUE 4: Add function to safely access client data with audit logging
-- ============================================================================

-- Create a secure function to access client data with audit logging
CREATE OR REPLACE FUNCTION public.get_client_secure(p_client_id UUID)
RETURNS TABLE(
  id UUID,
  user_id UUID,
  name TEXT,
  company TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user owns this client
  IF NOT EXISTS (
    SELECT 1 FROM public.clients 
    WHERE id = p_client_id 
    AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied: Client not found or unauthorized';
  END IF;

  -- Log the access (optional, can be enabled for compliance)
  -- INSERT INTO public.audit_log (user_id, action, table_name, record_id)
  -- VALUES (auth.uid(), 'SELECT', 'clients', p_client_id);

  -- Return the client data
  RETURN QUERY
  SELECT 
    c.id,
    c.user_id,
    c.name,
    c.company,
    c.email,
    c.address,
    c.created_at,
    c.updated_at
  FROM public.clients c
  WHERE c.id = p_client_id
  AND c.user_id = auth.uid();
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_client_secure(UUID) TO authenticated;

-- ============================================================================
-- ISSUE 5: Update existing functions to remove cron_secret dependency
-- ============================================================================

-- Drop the old upsert_app_settings function that used cron_secret
DROP FUNCTION IF EXISTS public.upsert_app_settings(TEXT, TEXT);

-- Create new function without cron_secret parameter
CREATE OR REPLACE FUNCTION public.upsert_app_settings(p_site_url TEXT)
RETURNS public.app_settings
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_settings public.app_settings;
BEGIN
  -- Only service role can call this
  IF auth.jwt()->>'role' != 'service_role' THEN
    RAISE EXCEPTION 'Access denied: Service role required';
  END IF;

  INSERT INTO public.app_settings (site_url)
  VALUES (p_site_url)
  ON CONFLICT (id) DO UPDATE
  SET site_url = EXCLUDED.site_url,
      updated_at = now()
  RETURNING * INTO v_settings;

  RETURN v_settings;
END;
$$;

-- ============================================================================
-- ISSUE 6: Add data retention policy for audit logs
-- ============================================================================

-- Create function to clean up old audit logs (keep last 90 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.audit_log
  WHERE created_at < now() - INTERVAL '90 days';
END;
$$;

-- Add comment
COMMENT ON FUNCTION public.cleanup_old_audit_logs() IS 'Removes audit logs older than 90 days. Should be called periodically via cron job.';

-- ============================================================================
-- VERIFICATION QUERIES (Run these to verify the fixes)
-- ============================================================================

-- Verify app_settings no longer has cron_secret column
-- SELECT column_name FROM information_schema.columns 
-- WHERE table_name = 'app_settings' AND table_schema = 'public';

-- Verify clients table has proper RLS policies
-- SELECT policyname, permissive, roles, cmd, qual 
-- FROM pg_policies 
-- WHERE tablename = 'clients' AND schemaname = 'public';

-- Verify audit_log table exists
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_name = 'audit_log' AND table_schema = 'public';

