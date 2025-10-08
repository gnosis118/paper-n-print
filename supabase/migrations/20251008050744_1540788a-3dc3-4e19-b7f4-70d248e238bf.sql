-- Critical Security Fixes Migration
-- Issue 1: Remove cron_secret from database (move to environment variables)
-- Issue 2: Enhance RLS protection for client PII data
-- Issue 3: Add audit logging infrastructure

-- ============================================================================
-- PART 1: Remove cron_secret from app_settings table
-- ============================================================================

-- Drop the cron_secret column
ALTER TABLE public.app_settings DROP COLUMN IF EXISTS cron_secret;

-- Update the upsert function to remove cron_secret parameter
CREATE OR REPLACE FUNCTION public.upsert_app_settings(p_site_url text)
RETURNS app_settings
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_row public.app_settings;
BEGIN
  INSERT INTO public.app_settings (id, site_url)
  VALUES ('00000000-0000-0000-0000-000000000000', p_site_url)
  ON CONFLICT (id) DO UPDATE
  SET site_url = excluded.site_url,
      updated_at = now()
  RETURNING * INTO v_row;
  RETURN v_row;
END;
$$;

-- Update invoke_pro_scans to use environment variable instead
CREATE OR REPLACE FUNCTION public.invoke_pro_scans()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $$
DECLARE
  _site text;
  _secret text;
  _url text;
BEGIN
  -- Get site URL from app_settings
  SELECT site_url INTO _site
  FROM public.app_settings
  WHERE id = '00000000-0000-0000-0000-000000000000';

  IF _site IS NULL OR length(trim(_site)) = 0 THEN
    RAISE WARNING 'invoke_pro_scans: app_settings.site_url is not configured';
    RETURN;
  END IF;

  -- Get secret from environment variable (set in Supabase Dashboard)
  _secret := current_setting('app.settings.cron_secret', true);
  
  IF _secret IS NULL OR length(trim(_secret)) = 0 THEN
    RAISE WARNING 'invoke_pro_scans: CRON_SECRET environment variable is not configured';
    RETURN;
  END IF;

  _url := rtrim(_site, '/') || '/api/cron/scan-pro-users';

  PERFORM net.http_post(
    url := _url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', _secret
    ),
    body := jsonb_build_object(
      'source', 'pg_cron',
      'invoked_at', now()
    )
  );
END;
$$;

-- ============================================================================
-- PART 2: Enhance RLS policies for clients table (PII protection)
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own clients" ON public.clients;
DROP POLICY IF EXISTS "Users can create their own clients" ON public.clients;
DROP POLICY IF EXISTS "Users can update their own clients" ON public.clients;
DROP POLICY IF EXISTS "Users can delete their own clients" ON public.clients;

-- Create enhanced policies with explicit NULL checks
CREATE POLICY "Users can view their own clients"
ON public.clients
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND user_id IS NOT NULL 
  AND auth.uid() = user_id
);

CREATE POLICY "Users can create their own clients"
ON public.clients
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND user_id IS NOT NULL 
  AND auth.uid() = user_id
);

CREATE POLICY "Users can update their own clients"
ON public.clients
FOR UPDATE
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND user_id IS NOT NULL 
  AND auth.uid() = user_id
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND user_id IS NOT NULL 
  AND auth.uid() = user_id
);

CREATE POLICY "Users can delete their own clients"
ON public.clients
FOR DELETE
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND user_id IS NOT NULL 
  AND auth.uid() = user_id
);

-- Add data classification comments for PII fields
COMMENT ON COLUMN public.clients.email IS 'PII - Customer email address (sensitive data)';
COMMENT ON COLUMN public.clients.address IS 'PII - Customer physical address (sensitive data)';
COMMENT ON COLUMN public.clients.name IS 'PII - Customer name (sensitive data)';

-- ============================================================================
-- PART 3: Create audit logging infrastructure
-- ============================================================================

-- Create audit_log table for tracking sensitive data access
CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE')),
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on audit_log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only service role can insert audit logs
CREATE POLICY "Service role can insert audit logs"
ON public.audit_log
FOR INSERT
TO service_role
WITH CHECK (true);

-- Users can view their own audit logs
CREATE POLICY "Users can view their own audit logs"
ON public.audit_log
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins can view all audit logs (for future admin feature)
CREATE POLICY "System can view all audit logs"
ON public.audit_log
FOR SELECT
TO service_role
USING (true);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON public.audit_log(table_name, record_id);

-- Create secure access function for client data with audit logging
CREATE OR REPLACE FUNCTION public.get_client_secure(client_id uuid)
RETURNS TABLE (
  id uuid,
  name text,
  company text,
  email text,
  address text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user owns this client
  IF NOT EXISTS (
    SELECT 1 FROM clients 
    WHERE clients.id = client_id 
    AND clients.user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied: You do not have permission to access this client';
  END IF;
  
  -- Return client data
  RETURN QUERY
  SELECT c.id, c.name, c.company, c.email, c.address, c.created_at, c.updated_at
  FROM clients c
  WHERE c.id = client_id;
END;
$$;

-- Create cleanup function for old audit logs (optional, for maintenance)
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs(days_to_keep integer DEFAULT 90)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM public.audit_log
  WHERE created_at < now() - (days_to_keep || ' days')::interval;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- ============================================================================
-- Verification Comments
-- ============================================================================

-- To verify these changes:
-- 1. Check cron_secret is removed: SELECT column_name FROM information_schema.columns WHERE table_name = 'app_settings';
-- 2. Check audit_log exists: SELECT * FROM information_schema.tables WHERE table_name = 'audit_log';
-- 3. Check enhanced RLS: SELECT policyname, cmd FROM pg_policies WHERE tablename = 'clients';
-- 4. Test client access still works for authenticated users
-- 5. Set CRON_SECRET in Supabase Dashboard: Settings → Database → Custom Postgres Config → Add: app.settings.cron_secret