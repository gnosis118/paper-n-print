-- Create credit ledger table for tracking credit transactions
CREATE TABLE IF NOT EXISTS public.credit_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  delta integer NOT NULL, -- +credits or -credits
  reason text NOT NULL, -- e.g., 'monthly_grant', 'download', 'annual_monthly_drop', 'template_purchase'
  stripe_event_id text, -- for idempotency
  template_id text, -- for tracking template downloads
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.credit_ledger ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own credit transactions" 
ON public.credit_ledger 
FOR SELECT 
USING (auth.uid() = user_id);

-- Only allow inserts from system (edge functions)
CREATE POLICY "System can insert credit transactions" 
ON public.credit_ledger 
FOR INSERT 
WITH CHECK (true); -- Edge functions will use service role key

-- Create view for credit balance
CREATE OR REPLACE VIEW public.credit_balance AS
SELECT 
  user_id, 
  COALESCE(SUM(delta), 0) AS balance,
  COUNT(*) FILTER (WHERE reason LIKE 'download:%') AS templates_downloaded
FROM public.credit_ledger 
GROUP BY user_id;

-- Update user_subscriptions table with better tracking
ALTER TABLE public.user_subscriptions 
ADD COLUMN IF NOT EXISTS stripe_price_id text,
ADD COLUMN IF NOT EXISTS credits_per_month integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS next_credit_at timestamp with time zone;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_credit_ledger_user_id ON public.credit_ledger(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_ledger_stripe_event ON public.credit_ledger(stripe_event_id) WHERE stripe_event_id IS NOT NULL;