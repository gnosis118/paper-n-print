-- Add UPDATE and DELETE policies to credit_ledger table to prevent financial record tampering
-- Only service role can modify credit transactions to maintain financial integrity

CREATE POLICY "Only system can update credit transactions" ON public.credit_ledger
FOR UPDATE USING (false);

CREATE POLICY "Only system can delete credit transactions" ON public.credit_ledger  
FOR DELETE USING (false);