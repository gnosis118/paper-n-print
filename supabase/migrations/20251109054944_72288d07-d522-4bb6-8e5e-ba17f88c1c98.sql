-- Create webhook_events table for idempotency tracking
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  estimate_id UUID REFERENCES public.estimates(id),
  invoice_id UUID REFERENCES public.invoices(id),
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create email_logs table for tracking email sends
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estimate_id UUID REFERENCES public.estimates(id),
  invoice_id UUID REFERENCES public.invoices(id),
  recipient_email TEXT NOT NULL,
  email_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  sent_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_webhook_events_stripe_event_id ON public.webhook_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_estimate_id ON public.webhook_events(estimate_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_estimate_id ON public.email_logs(estimate_id);

-- Enable RLS
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Service role can do everything
CREATE POLICY "Service role full access to webhook_events" ON public.webhook_events
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to email_logs" ON public.email_logs
  FOR ALL USING (true) WITH CHECK (true);

-- Users can view webhook events for their estimates
CREATE POLICY "Users can view webhook events for their estimates" ON public.webhook_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.estimates e
      WHERE e.id = webhook_events.estimate_id
      AND e.user_id = auth.uid()
    )
  );

-- Users can view email logs for their estimates
CREATE POLICY "Users can view email logs for their estimates" ON public.email_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.estimates e
      WHERE e.id = email_logs.estimate_id
      AND e.user_id = auth.uid()
    )
  );

-- Add missing column to payments table for idempotency
ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS stripe_event_id TEXT UNIQUE;