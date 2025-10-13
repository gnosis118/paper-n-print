-- Migration: Fix RLS Performance Issues
-- Wraps auth.uid() calls in SELECT to prevent re-evaluation for each row
-- This significantly improves query performance at scale

-- ============================================
-- INVOICE_ITEMS TABLE
-- ============================================

-- Drop and recreate: Users can update items of their own invoices
DROP POLICY IF EXISTS "Users can update items of their own invoices" ON public.invoice_items;
CREATE POLICY "Users can update items of their own invoices"
ON public.invoice_items
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.invoices
    WHERE invoices.id = invoice_items.invoice_id
    AND invoices.user_id = (SELECT auth.uid())
  )
);

-- Drop and recreate: Users can delete items of their own invoices
DROP POLICY IF EXISTS "Users can delete items of their own invoices" ON public.invoice_items;
CREATE POLICY "Users can delete items of their own invoices"
ON public.invoice_items
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.invoices
    WHERE invoices.id = invoice_items.invoice_id
    AND invoices.user_id = (SELECT auth.uid())
  )
);

-- ============================================
-- USER_SUBSCRIPTIONS TABLE
-- ============================================

-- Drop and recreate: Users can view their own subscription
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can view their own subscription"
ON public.user_subscriptions
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- Drop and recreate: Users can create their own subscription
DROP POLICY IF EXISTS "Users can create their own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can create their own subscription"
ON public.user_subscriptions
FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

-- Drop and recreate: Users can update their own subscription
DROP POLICY IF EXISTS "Users can update their own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can update their own subscription"
ON public.user_subscriptions
FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- ============================================
-- CREDIT_LEDGER TABLE
-- ============================================

-- Drop and recreate: Users can view their own credit transactions
DROP POLICY IF EXISTS "Users can view their own credit transactions" ON public.credit_ledger;
CREATE POLICY "Users can view their own credit transactions"
ON public.credit_ledger
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- ============================================
-- ESTIMATES TABLE
-- ============================================

-- Drop and recreate: Users can view only their own estimates
DROP POLICY IF EXISTS "Users can view only their own estimates" ON public.estimates;
CREATE POLICY "Users can view only their own estimates"
ON public.estimates
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- Drop and recreate: Users can create their own estimates
DROP POLICY IF EXISTS "Users can create their own estimates" ON public.estimates;
CREATE POLICY "Users can create their own estimates"
ON public.estimates
FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

-- Drop and recreate: Users can update their own estimates
DROP POLICY IF EXISTS "Users can update their own estimates" ON public.estimates;
CREATE POLICY "Users can update their own estimates"
ON public.estimates
FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- Drop and recreate: Users can delete their own estimates
DROP POLICY IF EXISTS "Users can delete their own estimates" ON public.estimates;
CREATE POLICY "Users can delete their own estimates"
ON public.estimates
FOR DELETE
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- ============================================
-- CLIENTS TABLE
-- ============================================

-- Drop and recreate: Users can view their own clients
DROP POLICY IF EXISTS "Users can view their own clients" ON public.clients;
CREATE POLICY "Users can view their own clients"
ON public.clients
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- Drop and recreate: Users can create their own clients
DROP POLICY IF EXISTS "Users can create their own clients" ON public.clients;
CREATE POLICY "Users can create their own clients"
ON public.clients
FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

-- Drop and recreate: Users can update their own clients
DROP POLICY IF EXISTS "Users can update their own clients" ON public.clients;
CREATE POLICY "Users can update their own clients"
ON public.clients
FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- Drop and recreate: Users can delete their own clients
DROP POLICY IF EXISTS "Users can delete their own clients" ON public.clients;
CREATE POLICY "Users can delete their own clients"
ON public.clients
FOR DELETE
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- ============================================
-- AUDIT_LOG TABLE
-- ============================================

-- Drop and recreate: Users can view their own audit logs
DROP POLICY IF EXISTS "Users can view their own audit logs" ON public.audit_log;
CREATE POLICY "Users can view their own audit logs"
ON public.audit_log
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- ============================================
-- PAYMENTS TABLE
-- ============================================

-- Drop and recreate: Users can view only their own payments
DROP POLICY IF EXISTS "Users can view only their own payments" ON public.payments;
CREATE POLICY "Users can view only their own payments"
ON public.payments
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- Add comment
COMMENT ON POLICY "Users can update items of their own invoices" ON public.invoice_items IS 
'Optimized RLS policy - auth.uid() wrapped in SELECT to prevent re-evaluation per row';

COMMENT ON POLICY "Users can view their own subscription" ON public.user_subscriptions IS 
'Optimized RLS policy - auth.uid() wrapped in SELECT to prevent re-evaluation per row';

COMMENT ON POLICY "Users can view only their own estimates" ON public.estimates IS 
'Optimized RLS policy - auth.uid() wrapped in SELECT to prevent re-evaluation per row';

COMMENT ON POLICY "Users can view their own clients" ON public.clients IS 
'Optimized RLS policy - auth.uid() wrapped in SELECT to prevent re-evaluation per row';

COMMENT ON POLICY "Users can view their own audit logs" ON public.audit_log IS 
'Optimized RLS policy - auth.uid() wrapped in SELECT to prevent re-evaluation per row';

COMMENT ON POLICY "Users can view only their own payments" ON public.payments IS 
'Optimized RLS policy - auth.uid() wrapped in SELECT to prevent re-evaluation per row';

