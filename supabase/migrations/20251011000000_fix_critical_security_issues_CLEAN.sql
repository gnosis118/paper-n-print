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
-- ISSUE 3: Fix Payment Transaction Data Access Vulnerability
-- ============================================================================
-- Problem: The payments table SELECT policy uses complex EXISTS clauses that
-- could have edge cases. Additionally, there are no UPDATE or DELETE policies,
-- which could allow unauthorized modifications.
--
-- Solution: Simplify SELECT policy and add explicit DENY policies for UPDATE
-- and DELETE operations.
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;
DROP POLICY IF EXISTS "System can insert payments" ON public.payments;

-- Create simplified SELECT policy that only allows viewing own payments
CREATE POLICY "Users can view only their own payments" 
ON public.payments 
FOR SELECT 
TO authenticated
USING (
  -- User must own the estimate or invoice associated with this payment
  (
    estimate_id IS NOT NULL 
    AND EXISTS (
      SELECT 1 FROM public.estimates e 
      WHERE e.id = payments.estimate_id 
        AND e.user_id = auth.uid()
        AND auth.uid() IS NOT NULL
    )
  ) OR (
    invoice_id IS NOT NULL 
    AND EXISTS (
      SELECT 1 FROM public.invoices i 
      WHERE i.id = payments.invoice_id 
        AND i.user_id = auth.uid()
        AND auth.uid() IS NOT NULL
    )
  )
);

-- Only service role can insert payments (from Stripe webhooks)
CREATE POLICY "Only service role can insert payments" 
ON public.payments 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Explicitly deny authenticated users from inserting payments
CREATE POLICY "Deny authenticated user payment inserts" 
ON public.payments 
FOR INSERT 
TO authenticated
WITH CHECK (false);

-- Explicitly deny UPDATE operations (payments are immutable)
CREATE POLICY "Only service role can update payments" 
ON public.payments 
FOR UPDATE 
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Deny authenticated user payment updates" 
ON public.payments 
FOR UPDATE 
TO authenticated
USING (false)
WITH CHECK (false);

-- Explicitly deny DELETE operations (payments are immutable)
CREATE POLICY "Only service role can delete payments" 
ON public.payments 
FOR DELETE 
TO service_role
USING (true);

CREATE POLICY "Deny authenticated user payment deletes" 
ON public.payments 
FOR DELETE 
TO authenticated
USING (false);

-- Add comments for documentation
COMMENT ON POLICY "Users can view only their own payments" ON public.payments IS 
'Allows users to view payments only for estimates or invoices they own. Includes explicit NULL checks for security.';

COMMENT ON POLICY "Only service role can insert payments" ON public.payments IS 
'Restricts payment creation to service role only (Stripe webhooks). Prevents users from creating fake payment records.';

COMMENT ON POLICY "Deny authenticated user payment updates" ON public.payments IS 
'Payments are immutable. Only service role can update payment records.';

COMMENT ON POLICY "Deny authenticated user payment deletes" ON public.payments IS 
'Payments are immutable. Only service role can delete payment records for data integrity.';

