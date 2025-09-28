-- Create estimates table
CREATE TABLE public.estimates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  client_id UUID REFERENCES public.clients(id),
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  items JSONB DEFAULT '[]'::jsonb,
  subtotal NUMERIC(12,2) DEFAULT 0,
  tax_rate NUMERIC(5,4) DEFAULT 0,
  tax_amount NUMERIC(12,2) DEFAULT 0,
  total NUMERIC(12,2) DEFAULT 0,
  deposit_type TEXT CHECK (deposit_type IN ('percent', 'fixed')) DEFAULT 'percent',
  deposit_value NUMERIC(12,2),
  status TEXT CHECK (status IN ('draft', 'sent', 'accepted', 'invoiced')) DEFAULT 'draft',
  public_slug TEXT UNIQUE NOT NULL,
  terms TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  accepted_ip INET,
  checkout_session_id TEXT,
  payment_intent_id TEXT
);

-- Add RLS to estimates
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;

-- RLS policies for estimates
CREATE POLICY "Users can view their own estimates" ON public.estimates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own estimates" ON public.estimates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own estimates" ON public.estimates
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own estimates" ON public.estimates
  FOR DELETE USING (auth.uid() = user_id);

-- Public access for estimate viewing by slug
CREATE POLICY "Public can view estimates by slug" ON public.estimates
  FOR SELECT USING (true);

-- Add columns to invoices table
ALTER TABLE public.invoices 
ADD COLUMN pay_link_url TEXT,
ADD COLUMN pay_qr_svg TEXT,
ADD COLUMN estimate_id UUID REFERENCES public.estimates(id);

-- Create payments table
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID REFERENCES public.estimates(id),
  invoice_id UUID REFERENCES public.invoices(id),
  amount NUMERIC(12,2) NOT NULL,
  method TEXT,
  stripe_payment_intent TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add RLS to payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.estimates e WHERE e.id = payments.estimate_id AND e.user_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM public.invoices i WHERE i.id = payments.invoice_id AND i.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert payments" ON public.payments
  FOR INSERT WITH CHECK (true);

-- Add updated_at trigger for estimates
CREATE TRIGGER update_estimates_updated_at
  BEFORE UPDATE ON public.estimates
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create unique index on estimate number per user
CREATE UNIQUE INDEX idx_estimates_user_number ON public.estimates(user_id, number);

-- Create index on public_slug for fast lookups
CREATE INDEX idx_estimates_public_slug ON public.estimates(public_slug);

-- Seed demo data for HVAC estimate
INSERT INTO public.estimates (
  user_id, 
  client_id, 
  number, 
  title, 
  items, 
  subtotal, 
  tax_rate, 
  tax_amount, 
  total, 
  deposit_type, 
  deposit_value, 
  status, 
  public_slug,
  terms
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  NULL,
  'EST-2024-001',
  'HVAC System Installation',
  '[
    {"description": "High-efficiency AC unit installation", "quantity": 1, "rate": 3500.00, "amount": 3500.00},
    {"description": "Ductwork modification and cleaning", "quantity": 1, "rate": 1200.00, "amount": 1200.00},
    {"description": "Thermostat upgrade and programming", "quantity": 1, "rate": 450.00, "amount": 450.00}
  ]'::jsonb,
  5150.00,
  0.0875,
  450.63,
  5600.63,
  'percent',
  25.00,
  'draft',
  'hvac-demo-estimate-' || substr(md5(random()::text), 1, 8),
  'This estimate is valid for 30 days. A 25% deposit is required to begin work. Deposit is non-refundable and will be applied to the final invoice.'
);

-- Seed demo data for Plumbing estimate  
INSERT INTO public.estimates (
  user_id, 
  client_id, 
  number, 
  title, 
  items, 
  subtotal, 
  tax_rate, 
  tax_amount, 
  total, 
  deposit_type, 
  deposit_value, 
  status, 
  public_slug,
  terms
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  NULL,
  'EST-2024-002',
  'Bathroom Renovation Plumbing',
  '[
    {"description": "Main water line replacement", "quantity": 1, "rate": 2400.00, "amount": 2400.00},
    {"description": "New fixture installation (toilet, sink, shower)", "quantity": 1, "rate": 1800.00, "amount": 1800.00},
    {"description": "Permit and inspection fees", "quantity": 1, "rate": 350.00, "amount": 350.00}
  ]'::jsonb,
  4550.00,
  0.0875,
  398.13,
  4948.13,
  'fixed',
  1500.00,
  'draft',
  'plumbing-demo-estimate-' || substr(md5(random()::text), 1, 8),
  'This estimate is valid for 45 days. A $1,500 deposit is required to secure materials and schedule work. Deposit is non-refundable and will be applied to the final invoice.'
);