-- Create marketing_leads table for exit-intent and other marketing captures
CREATE TABLE IF NOT EXISTS public.marketing_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'exit_intent',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on marketing_leads
ALTER TABLE public.marketing_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for marketing leads (no auth required)
CREATE POLICY IF NOT EXISTS "Allow public inserts on marketing_leads"
  ON public.marketing_leads
  FOR INSERT
  WITH CHECK (true);

