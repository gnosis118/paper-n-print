-- Create leads table for CRM lite functionality
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_type TEXT, -- hair_styling, nail_services, lash_services, massage_therapy, tattoo_services, esthetics
  status TEXT NOT NULL DEFAULT 'new', -- new, contacted, qualified, converted, lost
  lead_score INTEGER NOT NULL DEFAULT 0, -- 0-100
  source TEXT NOT NULL DEFAULT 'homepage', -- homepage, pricing, templates, referral, other
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lead interactions table for tracking engagement
CREATE TABLE IF NOT EXISTS public.lead_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL, -- email_sent, email_opened, link_clicked, form_submitted, call_made, note_added
  description TEXT,
  metadata JSONB, -- store additional data like email subject, link URL, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_leads_user_id ON public.leads(user_id);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_service_type ON public.leads(service_type);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_lead_interactions_lead_id ON public.lead_interactions(lead_id);
CREATE INDEX idx_lead_interactions_user_id ON public.lead_interactions(user_id);
CREATE INDEX idx_lead_interactions_created_at ON public.lead_interactions(created_at DESC);

-- Enable RLS on leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own leads
CREATE POLICY "Users can view their own leads"
  ON public.leads
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own leads
CREATE POLICY "Users can insert their own leads"
  ON public.leads
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own leads
CREATE POLICY "Users can update their own leads"
  ON public.leads
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can delete their own leads
CREATE POLICY "Users can delete their own leads"
  ON public.leads
  FOR DELETE
  USING (auth.uid() = user_id);

-- Enable RLS on lead_interactions table
ALTER TABLE public.lead_interactions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see interactions for their own leads
CREATE POLICY "Users can view interactions for their leads"
  ON public.lead_interactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert interactions for their own leads
CREATE POLICY "Users can insert interactions for their leads"
  ON public.lead_interactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to update lead score based on interactions
CREATE OR REPLACE FUNCTION update_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate score based on interactions
  UPDATE public.leads
  SET lead_score = (
    SELECT COALESCE(COUNT(*), 0) * 10
    FROM public.lead_interactions
    WHERE lead_id = NEW.lead_id
  )
  WHERE id = NEW.lead_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update lead score on new interaction
CREATE TRIGGER trigger_update_lead_score
AFTER INSERT ON public.lead_interactions
FOR EACH ROW
EXECUTE FUNCTION update_lead_score();

-- Function to auto-create lead interactions table entry
CREATE OR REPLACE FUNCTION log_lead_interaction(
  p_lead_id UUID,
  p_user_id UUID,
  p_interaction_type TEXT,
  p_description TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_interaction_id UUID;
BEGIN
  INSERT INTO public.lead_interactions (
    lead_id,
    user_id,
    interaction_type,
    description,
    metadata
  ) VALUES (
    p_lead_id,
    p_user_id,
    p_interaction_type,
    p_description,
    p_metadata
  )
  RETURNING id INTO v_interaction_id;
  
  RETURN v_interaction_id;
END;
$$ LANGUAGE plpgsql;

