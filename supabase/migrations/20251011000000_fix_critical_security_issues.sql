-- ============================================================================
-- CRITICAL SECURITY FIX: Estimates Public Access & Credit Ledger Manipulation
-- Date: 2025-10-11
-- ============================================================================

-- ============================================================================
-- ISSUE 1: Fix Public Estimate Data Exposure
-- ============================================================================
-- Problem: The policy "Public can view shared estimates via token" allows
-- SELECT access based only on sharing_enabled=true, but does not verify
-- the sharing_token. This means anyone can read all shared estimates without
-- knowing the token.
--
-- Solution: Remove the insecure policy and ensure estimates can only be
-- accessed through the secure edge function that validates the token.
-- ============================================================================

-- Drop the insecure public policy
DROP POLICY IF EXISTS "Public can view shared estimates via token" ON public.estimates;

-- Ensure only authenticated users who own the estimate can view it directly
-- Public access MUST go through the edge function which validates the token
DROP POLICY IF EXISTS "Users can view only their own estimates" ON public.estimates;

CREATE POLICY "Users can view only their own estimates" 
ON public.estimates 
FOR SELECT 
TO authenticated
USING (
  auth.uid() = user_id 
  AND auth.uid() IS NOT NULL
);

-- Create a secure function that validates the sharing token
-- This function will be called by the edge function to verify access
CREATE OR REPLACE FUNCTION public.get_estimate_by_token(_sharing_token UUID)
RETURNS SETOF public.estimates
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return the estimate if:
  -- 1. The sharing_token matches
  -- 2. Sharing is enabled
  -- 3. The sharing hasn't expired
  RETURN QUERY
  SELECT e.* 
  FROM public.estimates e
  WHERE e.sharing_token = _sharing_token
    AND e.sharing_enabled = true
    AND (e.sharing_expires_at IS NULL OR e.sharing_expires_at > now());
END;
$$;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION public.get_estimate_by_token(UUID) TO authenticated, anon;

-- Add comment for documentation
COMMENT ON FUNCTION public.get_estimate_by_token IS 
'Securely retrieves an estimate by sharing token. Only returns estimates that are shared, enabled, and not expired. Used by edge functions to provide public access with proper token validation.';


-- ============================================================================
-- ISSUE 2: Fix Credit Ledger Manipulation Vulnerability
-- ============================================================================
-- Problem: The policy "System can insert credit transactions" has condition
-- 'true', which allows any authenticated user to insert credit transactions.
-- This could enable users to fraudulently grant themselves unlimited credits.
--
-- Solution: Restrict INSERT to only service_role, preventing regular users
-- from manipulating their credit balance.
-- ============================================================================

-- Drop the insecure INSERT policy
DROP POLICY IF EXISTS "System can insert credit transactions" ON public.credit_ledger;

-- Create a secure policy that ONLY allows service role to insert
CREATE POLICY "Only service role can insert credit transactions" 
ON public.credit_ledger 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Ensure no authenticated users can insert directly
CREATE POLICY "Deny authenticated user credit inserts" 
ON public.credit_ledger 
FOR INSERT 
TO authenticated
WITH CHECK (false);

-- Add comment for documentation
COMMENT ON POLICY "Only service role can insert credit transactions" ON public.credit_ledger IS 
'Prevents credit manipulation by restricting INSERT to service role only. Edge functions using service role key can insert credit transactions, but regular authenticated users cannot.';

COMMENT ON POLICY "Deny authenticated user credit inserts" ON public.credit_ledger IS 
'Explicitly denies authenticated users from inserting credit transactions to prevent fraud.';


-- ============================================================================
-- ADDITIONAL SECURITY: Ensure UPDATE and DELETE are also restricted
-- ============================================================================
-- These policies should already exist from previous migrations, but we'll
-- ensure they're in place to prevent any credit manipulation.

-- Ensure UPDATE is blocked for all users (only service role can update)
DROP POLICY IF EXISTS "Only system can update credit transactions" ON public.credit_ledger;
CREATE POLICY "Only service role can update credit transactions" 
ON public.credit_ledger
FOR UPDATE 
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Deny authenticated user credit updates" 
ON public.credit_ledger
FOR UPDATE 
TO authenticated
USING (false)
WITH CHECK (false);

-- Ensure DELETE is blocked for all users (only service role can delete)
DROP POLICY IF EXISTS "Only system can delete credit transactions" ON public.credit_ledger;
CREATE POLICY "Only service role can delete credit transactions" 
ON public.credit_ledger  
FOR DELETE 
TO service_role
USING (true);

CREATE POLICY "Deny authenticated user credit deletes" 
ON public.credit_ledger
FOR DELETE 
TO authenticated
USING (false);


-- ============================================================================
-- AUDIT LOG: Record security policy changes
-- ============================================================================
-- Log this security fix for audit trail
INSERT INTO public.audit_log (
  user_id,
  action,
  table_name,
  details
) VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid, -- System user
  'SECURITY_FIX',
  'estimates, credit_ledger',
  jsonb_build_object(
    'timestamp', now(),
    'migration', '20251011000000_fix_critical_security_issues',
    'issues_fixed', jsonb_build_array(
      'PUBLIC_ESTIMATE_DATA - Fixed public access to require token validation',
      'CREDIT_MANIPULATION - Restricted credit_ledger INSERT to service role only'
    ),
    'severity', 'CRITICAL',
    'status', 'RESOLVED'
  )
);


-- ============================================================================
-- VERIFICATION QUERIES (for testing)
-- ============================================================================
-- Run these queries to verify the fixes are working:

-- 1. Verify estimates can only be accessed by owners or through secure function
-- SELECT * FROM public.estimates; -- Should only show user's own estimates

-- 2. Verify credit_ledger INSERT is blocked for authenticated users
-- INSERT INTO public.credit_ledger (user_id, delta, reason) 
-- VALUES (auth.uid(), 1000, 'test'); -- Should FAIL with permission denied

-- 3. Verify the secure function works
-- SELECT * FROM public.get_estimate_by_token('valid-token-uuid'); -- Should work

-- 4. Verify RLS policies are active
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies 
-- WHERE tablename IN ('estimates', 'credit_ledger')
-- ORDER BY tablename, policyname;

