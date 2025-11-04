-- Add reminder preferences table for user-specific reminder configuration
CREATE TABLE IF NOT EXISTS public.reminder_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  enabled BOOLEAN NOT NULL DEFAULT true,
  days_until_first_reminder INTEGER NOT NULL DEFAULT 3,
  max_reminders_per_estimate INTEGER NOT NULL DEFAULT 3,
  reminder_frequency_days INTEGER NOT NULL DEFAULT 3,
  ai_personalization_enabled BOOLEAN NOT NULL DEFAULT false,
  openai_api_key_encrypted TEXT, -- Encrypted user's OpenAI key (optional)
  ai_monthly_budget_cents INTEGER NOT NULL DEFAULT 500, -- $5 default budget
  ai_usage_this_month_cents INTEGER NOT NULL DEFAULT 0,
  ai_usage_reset_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for reminder_preferences
CREATE INDEX IF NOT EXISTS idx_reminder_preferences_user_id ON public.reminder_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_reminder_preferences_updated_at ON public.reminder_preferences(updated_at DESC);

-- Enable RLS on reminder_preferences
ALTER TABLE public.reminder_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own preferences
CREATE POLICY "Users can view their own reminder preferences"
ON public.reminder_preferences FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policy: Users can update their own preferences
CREATE POLICY "Users can update their own reminder preferences"
ON public.reminder_preferences FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own preferences
CREATE POLICY "Users can insert their own reminder preferences"
ON public.reminder_preferences FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add AI usage tracking table
CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  estimate_id UUID REFERENCES public.estimates(id) ON DELETE SET NULL,
  reminder_id UUID REFERENCES public.estimate_reminders(id) ON DELETE SET NULL,
  usage_type TEXT NOT NULL, -- 'personalization', 'template_generation'
  tokens_used INTEGER NOT NULL,
  cost_cents INTEGER NOT NULL,
  model TEXT NOT NULL DEFAULT 'gpt-3.5-turbo',
  status TEXT NOT NULL DEFAULT 'success', -- success, failed, rate_limited
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for ai_usage_logs
CREATE INDEX IF NOT EXISTS idx_ai_usage_logs_user_id ON public.ai_usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_usage_logs_estimate_id ON public.ai_usage_logs(estimate_id);
CREATE INDEX IF NOT EXISTS idx_ai_usage_logs_created_at ON public.ai_usage_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_usage_logs_status ON public.ai_usage_logs(status);

-- Enable RLS on ai_usage_logs
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own AI usage logs
CREATE POLICY "Users can view their own AI usage logs"
ON public.ai_usage_logs FOR SELECT
USING (auth.uid() = user_id);

-- Add reminder template customization table
CREATE TABLE IF NOT EXISTS public.reminder_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject_template TEXT NOT NULL,
  body_template TEXT NOT NULL, -- Can include {{estimate_number}}, {{days_overdue}}, {{amount}}, etc.
  reminder_number INTEGER NOT NULL, -- Which reminder (1st, 2nd, 3rd)
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for reminder_templates
CREATE INDEX IF NOT EXISTS idx_reminder_templates_user_id ON public.reminder_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_reminder_templates_reminder_number ON public.reminder_templates(reminder_number);
CREATE INDEX IF NOT EXISTS idx_reminder_templates_is_default ON public.reminder_templates(is_default);

-- Enable RLS on reminder_templates
ALTER TABLE public.reminder_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own templates
CREATE POLICY "Users can view their own reminder templates"
ON public.reminder_templates FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policy: Users can create templates
CREATE POLICY "Users can create reminder templates"
ON public.reminder_templates FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own templates
CREATE POLICY "Users can update their own reminder templates"
ON public.reminder_templates FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policy: Users can delete their own templates
CREATE POLICY "Users can delete their own reminder templates"
ON public.reminder_templates FOR DELETE
USING (auth.uid() = user_id);

-- Create function to initialize reminder preferences for new users
CREATE OR REPLACE FUNCTION public.create_reminder_preferences_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.reminder_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-create reminder preferences
DROP TRIGGER IF EXISTS create_reminder_preferences_on_user_signup ON auth.users;
CREATE TRIGGER create_reminder_preferences_on_user_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.create_reminder_preferences_for_user();

