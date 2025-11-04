-- Add idempotency tracking to payments table
-- This prevents duplicate payments if webhook is called multiple times

ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS stripe_event_id TEXT UNIQUE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_payments_stripe_event_id ON public.payments(stripe_event_id);

-- Add webhook event tracking table for comprehensive audit trail
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  estimate_id UUID REFERENCES public.estimates(id) ON DELETE SET NULL,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'processed', -- processed, failed, retried
  error_message TEXT,
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for webhook_events
CREATE INDEX IF NOT EXISTS idx_webhook_events_stripe_event_id ON public.webhook_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_estimate_id ON public.webhook_events(estimate_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_invoice_id ON public.webhook_events(invoice_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_status ON public.webhook_events(status);
CREATE INDEX IF NOT EXISTS idx_webhook_events_created_at ON public.webhook_events(created_at DESC);

-- Enable RLS on webhook_events
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Service role can manage webhook events
CREATE POLICY "Service role can manage webhook events"
ON public.webhook_events FOR ALL
USING (true)
WITH CHECK (true);

-- Add email tracking table to track sent emails
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID REFERENCES public.estimates(id) ON DELETE CASCADE,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  email_type TEXT NOT NULL, -- created, deposit_paid, reminder, invoice_sent
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent', -- sent, failed, bounced
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for email_logs
CREATE INDEX IF NOT EXISTS idx_email_logs_estimate_id ON public.email_logs(estimate_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_invoice_id ON public.email_logs(invoice_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient_email ON public.email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_email_type ON public.email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON public.email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON public.email_logs(sent_at DESC);

-- Enable RLS on email_logs
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own email logs
CREATE POLICY "Users can view their own email logs"
ON public.email_logs FOR SELECT
USING (
  estimate_id IN (SELECT id FROM public.estimates WHERE user_id = auth.uid())
  OR invoice_id IN (SELECT id FROM public.invoices WHERE user_id = auth.uid())
);

