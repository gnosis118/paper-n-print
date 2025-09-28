-- Drop the problematic view and create a secure function instead
DROP VIEW IF EXISTS public.credit_balance;

-- Create a security definer function to get user's credit balance
CREATE OR REPLACE FUNCTION public.get_user_credit_balance(p_user_id uuid DEFAULT auth.uid())
RETURNS TABLE(balance integer, templates_downloaded bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow users to query their own data
  IF p_user_id IS NULL OR (p_user_id != auth.uid() AND NOT auth.jwt()->>'role' = 'service_role') THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  RETURN QUERY
  SELECT 
    COALESCE(SUM(delta), 0)::integer AS balance,
    COUNT(*) FILTER (WHERE reason LIKE 'download:%') AS templates_downloaded
  FROM public.credit_ledger 
  WHERE user_id = p_user_id;
END;
$$;