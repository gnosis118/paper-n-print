-- Create estimates table for the estimate-to-invoice automation system
CREATE TABLE IF NOT EXISTS public.estimates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  number TEXT NOT NULL,
  title TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax_rate NUMERIC NOT NULL DEFAULT 0,
  tax_amount NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  deposit_percentage INTEGER NOT NULL DEFAULT 30,
  deposit_amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending_payment',
  terms TEXT,
  notes TEXT,
  public_slug UUID UNIQUE,
  sharing_token UUID UNIQUE,
  sharing_enabled BOOLEAN DEFAULT false,
  sharing_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_estimates_user_id ON public.estimates(user_id);
CREATE INDEX IF NOT EXISTS idx_estimates_client_id ON public.estimates(client_id);
CREATE INDEX IF NOT EXISTS idx_estimates_status ON public.estimates(status);
CREATE INDEX IF NOT EXISTS idx_estimates_created_at ON public.estimates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_estimates_public_slug ON public.estimates(public_slug);

-- Enable RLS on estimates table
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own estimates
CREATE POLICY "Users can view their own estimates"
ON public.estimates FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policy: Users can create estimates
CREATE POLICY "Users can create estimates"
ON public.estimates FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own estimates
CREATE POLICY "Users can update their own estimates"
ON public.estimates FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policy: Users can delete their own estimates
CREATE POLICY "Users can delete their own estimates"
ON public.estimates FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policy: Public access to shared estimates (no auth required)
CREATE POLICY "Public can view shared estimates"
ON public.estimates FOR SELECT
USING (sharing_enabled = true AND (sharing_expires_at IS NULL OR sharing_expires_at > now()));

-- Create function to update estimate's updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_estimate_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_estimates_updated_at ON public.estimates;
CREATE TRIGGER update_estimates_updated_at
BEFORE UPDATE ON public.estimates
FOR EACH ROW
EXECUTE FUNCTION public.update_estimate_updated_at();

