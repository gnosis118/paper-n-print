-- Contractor Pivot Schema Updates
-- Adds contractor-specific fields to estimates, profiles, and reminder_preferences tables

-- 1. Add contractor-specific fields to estimates table
ALTER TABLE public.estimates
ADD COLUMN IF NOT EXISTS appointment_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS milestone_payments JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS bid_type TEXT DEFAULT 'standard', -- standard, milestone, hourly
ADD COLUMN IF NOT EXISTS contractor_notes TEXT,
ADD COLUMN IF NOT EXISTS is_bid BOOLEAN DEFAULT true;

-- 2. Add industry and onboarding fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS industry TEXT, -- electrician, plumber, roofer, landscaper, handyman, other
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS contractor_type TEXT, -- contractor, service_provider, freelancer
ADD COLUMN IF NOT EXISTS business_license TEXT,
ADD COLUMN IF NOT EXISTS service_areas TEXT[]; -- Array of service areas

-- 3. Update reminder_preferences table with tone and schedule
ALTER TABLE public.reminder_preferences
ADD COLUMN IF NOT EXISTS tone TEXT DEFAULT 'professional', -- professional, friendly, casual
ADD COLUMN IF NOT EXISTS schedule_days INTEGER[] DEFAULT ARRAY[3, 7, 14], -- Days to send reminders
ADD COLUMN IF NOT EXISTS auto_send BOOLEAN DEFAULT false;

-- 4. Create contractor_templates table for industry-specific templates
CREATE TABLE IF NOT EXISTS public.contractor_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  industry TEXT NOT NULL, -- electrician, plumber, roofer, landscaper, handyman
  name TEXT NOT NULL,
  description TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  tax_rate NUMERIC NOT NULL DEFAULT 0,
  deposit_percentage INTEGER NOT NULL DEFAULT 30,
  milestone_structure JSONB, -- For milestone-based projects
  notes TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Create milestone_payments table for tracking milestone-based payments
CREATE TABLE IF NOT EXISTS public.milestone_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID NOT NULL REFERENCES public.estimates(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  milestone_number INTEGER NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, overdue
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_estimates_appointment_date ON public.estimates(appointment_date);
CREATE INDEX IF NOT EXISTS idx_estimates_bid_type ON public.estimates(bid_type);
CREATE INDEX IF NOT EXISTS idx_profiles_industry ON public.profiles(industry);
CREATE INDEX IF NOT EXISTS idx_contractor_templates_industry ON public.contractor_templates(industry);
CREATE INDEX IF NOT EXISTS idx_milestone_payments_status ON public.milestone_payments(status);
CREATE INDEX IF NOT EXISTS idx_milestone_payments_estimate_id ON public.milestone_payments(estimate_id);

-- 7. Enable RLS on new tables
ALTER TABLE public.contractor_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestone_payments ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS policies for contractor_templates
CREATE POLICY "Users can view their own contractor templates"
  ON public.contractor_templates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create contractor templates"
  ON public.contractor_templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contractor templates"
  ON public.contractor_templates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contractor templates"
  ON public.contractor_templates FOR DELETE
  USING (auth.uid() = user_id);

-- 9. Create RLS policies for milestone_payments
CREATE POLICY "Users can view their own milestone payments"
  ON public.milestone_payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create milestone payments"
  ON public.milestone_payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own milestone payments"
  ON public.milestone_payments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own milestone payments"
  ON public.milestone_payments FOR DELETE
  USING (auth.uid() = user_id);

