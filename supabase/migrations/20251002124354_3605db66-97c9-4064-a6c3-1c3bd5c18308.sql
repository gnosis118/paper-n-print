-- Remove duplicate RLS policy on estimates table
DROP POLICY IF EXISTS "Users can view their own estimates" ON public.estimates;