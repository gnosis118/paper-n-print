-- Add Change Order Management and Deposit Staging
-- Extends estimates table with change order tracking and deposit staging options

-- 1. Add columns to estimates table for change orders and deposit staging
ALTER TABLE public.estimates
ADD COLUMN IF NOT EXISTS change_orders JSONB DEFAULT '[]', -- Array of change orders
ADD COLUMN IF NOT EXISTS deposit_staging TEXT DEFAULT 'single', -- single, staged, progress
ADD COLUMN IF NOT EXISTS deposit_stages JSONB DEFAULT '[]', -- For staged deposits (e.g., 30/40/30)
ADD COLUMN IF NOT EXISTS progress_billing_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS original_estimate_id UUID REFERENCES public.estimates(id) ON DELETE SET NULL; -- For cloned estimates

-- 2. Create change_orders table for detailed tracking
CREATE TABLE IF NOT EXISTS public.change_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID NOT NULL REFERENCES public.estimates(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  change_order_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  items JSONB NOT NULL DEFAULT '[]', -- Added/removed items
  amount_change NUMERIC NOT NULL, -- Positive for additions, negative for reductions
  reason TEXT, -- Scope change, client request, etc.
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected, applied
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved_at TIMESTAMP WITH TIME ZONE,
  applied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Create deposit_stages table for tracking staged deposits
CREATE TABLE IF NOT EXISTS public.deposit_stages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID NOT NULL REFERENCES public.estimates(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stage_number INTEGER NOT NULL,
  description TEXT NOT NULL, -- e.g., "Initial Deposit", "Midway Payment", "Final Payment"
  percentage NUMERIC NOT NULL, -- Percentage of total
  amount NUMERIC NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, overdue
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Create progress_billing_entries table for tracking work progress
CREATE TABLE IF NOT EXISTS public.progress_billing_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID NOT NULL REFERENCES public.estimates(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_number INTEGER NOT NULL,
  description TEXT NOT NULL, -- e.g., "Foundation completed", "Framing in progress"
  percentage_complete NUMERIC NOT NULL, -- 0-100
  amount_to_bill NUMERIC NOT NULL,
  billed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_change_orders_estimate_id ON public.change_orders(estimate_id);
CREATE INDEX IF NOT EXISTS idx_change_orders_user_id ON public.change_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_change_orders_status ON public.change_orders(status);
CREATE INDEX IF NOT EXISTS idx_deposit_stages_estimate_id ON public.deposit_stages(estimate_id);
CREATE INDEX IF NOT EXISTS idx_deposit_stages_status ON public.deposit_stages(status);
CREATE INDEX IF NOT EXISTS idx_progress_billing_estimate_id ON public.progress_billing_entries(estimate_id);

-- 6. Enable RLS on new tables
ALTER TABLE public.change_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposit_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_billing_entries ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies for change_orders
CREATE POLICY "Users can view their own change orders"
  ON public.change_orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create change orders"
  ON public.change_orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own change orders"
  ON public.change_orders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own change orders"
  ON public.change_orders FOR DELETE
  USING (auth.uid() = user_id);

-- 8. Create RLS policies for deposit_stages
CREATE POLICY "Users can view their own deposit stages"
  ON public.deposit_stages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create deposit stages"
  ON public.deposit_stages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own deposit stages"
  ON public.deposit_stages FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own deposit stages"
  ON public.deposit_stages FOR DELETE
  USING (auth.uid() = user_id);

-- 9. Create RLS policies for progress_billing_entries
CREATE POLICY "Users can view their own progress billing entries"
  ON public.progress_billing_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create progress billing entries"
  ON public.progress_billing_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress billing entries"
  ON public.progress_billing_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress billing entries"
  ON public.progress_billing_entries FOR DELETE
  USING (auth.uid() = user_id);

-- 10. Create function to update change_orders updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_change_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 11. Create trigger for change_orders updated_at
DROP TRIGGER IF EXISTS update_change_orders_updated_at ON public.change_orders;
CREATE TRIGGER update_change_orders_updated_at
BEFORE UPDATE ON public.change_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_change_orders_updated_at();

-- 12. Create function to update deposit_stages updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_deposit_stages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 13. Create trigger for deposit_stages updated_at
DROP TRIGGER IF EXISTS update_deposit_stages_updated_at ON public.deposit_stages;
CREATE TRIGGER update_deposit_stages_updated_at
BEFORE UPDATE ON public.deposit_stages
FOR EACH ROW
EXECUTE FUNCTION public.update_deposit_stages_updated_at();

-- 14. Create function to update progress_billing_entries updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_progress_billing_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 15. Create trigger for progress_billing_entries updated_at
DROP TRIGGER IF EXISTS update_progress_billing_updated_at ON public.progress_billing_entries;
CREATE TRIGGER update_progress_billing_updated_at
BEFORE UPDATE ON public.progress_billing_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_progress_billing_updated_at();

