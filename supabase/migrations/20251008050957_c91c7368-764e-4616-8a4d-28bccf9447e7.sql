-- Fix audit_log security issue: Remove overly permissive policy
-- The 'System can view all audit logs' policy is not needed since:
-- 1. Users should only see their own audit logs (already covered by existing policy)
-- 2. Service role can bypass RLS when needed for admin operations
-- 3. Explicit system-wide access policy creates unnecessary security risk

DROP POLICY IF EXISTS "System can view all audit logs" ON public.audit_log;

-- Verify remaining policies are secure:
-- ✓ "Users can view their own audit logs" - restricts to auth.uid() = user_id
-- ✓ "Service role can insert audit logs" - allows logging but not reading
-- This ensures users can only see their own audit trail, not others'