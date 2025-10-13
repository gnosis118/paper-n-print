-- Safe RLS Performance Fix
-- Run this in Supabase SQL Editor if the migration failed
-- This version has all the correct policies

-- ============================================
-- INVOICE_ITEMS TABLE
-- ============================================

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

DROP POLICY IF EXISTS "Users can view their own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can view their own subscription"
ON public.user_subscriptions
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can create their own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can create their own subscription"
ON public.user_subscriptions
FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update their own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can update their own subscription"
ON public.user_subscriptions
FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- ============================================
-- CREDIT_LEDGER TABLE
-- ============================================

DROP POLICY IF EXISTS "Users can view their own credit transactions" ON public.credit_ledger;
CREATE POLICY "Users can view their own credit transactions"
ON public.credit_ledger
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- ============================================
-- ESTIMATES TABLE
-- ============================================

DROP POLICY IF EXISTS "Users can view only their own estimates" ON public.estimates;
CREATE POLICY "Users can view only their own estimates"
ON public.estimates
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can create their own estimates" ON public.estimates;
CREATE POLICY "Users can create their own estimates"
ON public.estimates
FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update their own estimates" ON public.estimates;
CREATE POLICY "Users can update their own estimates"
ON public.estimates
FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can delete their own estimates" ON public.estimates;
CREATE POLICY "Users can delete their own estimates"
ON public.estimates
FOR DELETE
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- ============================================
-- CLIENTS TABLE
-- ============================================

DROP POLICY IF EXISTS "Users can view their own clients" ON public.clients;
CREATE POLICY "Users can view their own clients"
ON public.clients
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can create their own clients" ON public.clients;
CREATE POLICY "Users can create their own clients"
ON public.clients
FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update their own clients" ON public.clients;
CREATE POLICY "Users can update their own clients"
ON public.clients
FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can delete their own clients" ON public.clients;
CREATE POLICY "Users can delete their own clients"
ON public.clients
FOR DELETE
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- ============================================
-- AUDIT_LOG TABLE
-- ============================================

DROP POLICY IF EXISTS "Users can view their own audit logs" ON public.audit_log;
CREATE POLICY "Users can view their own audit logs"
ON public.audit_log
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- ============================================
-- PAYMENTS TABLE
-- ============================================

DROP POLICY IF EXISTS "Users can view only their own payments" ON public.payments;
CREATE POLICY "Users can view only their own payments"
ON public.payments
FOR SELECT
TO authenticated
USING (
  (
    estimate_id IS NOT NULL 
    AND EXISTS (
      SELECT 1 FROM estimates e
      WHERE e.id = payments.estimate_id
      AND e.user_id = (SELECT auth.uid())
      AND (SELECT auth.uid()) IS NOT NULL
    )
  )
  OR
  (
    invoice_id IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM invoices i
      WHERE i.id = payments.invoice_id
      AND i.user_id = (SELECT auth.uid())
      AND (SELECT auth.uid()) IS NOT NULL
    )
  )
);

