import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface ReminderPreferences {
  id: string;
  user_id: string;
  enabled: boolean;
  days_until_first_reminder: number;
  max_reminders_per_estimate: number;
  reminder_frequency_days: number;
  ai_personalization_enabled: boolean;
  ai_monthly_budget_cents: number;
  ai_usage_this_month_cents: number;
  ai_usage_reset_date: string | null;
  created_at: string;
  updated_at: string;
}

export const useReminderPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<ReminderPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load preferences
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    loadPreferences();
  }, [user?.id]);

  const loadPreferences = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('reminder_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (data) {
        setPreferences(data);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load preferences';
      setError(message);
      console.error('Error loading reminder preferences:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<ReminderPreferences>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error: updateError } = await supabase
        .from('reminder_preferences')
        .upsert({
          user_id: user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (updateError) throw updateError;

      setPreferences(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update preferences';
      setError(message);
      throw err;
    }
  };

  const getAIBudgetRemaining = (): number => {
    if (!preferences) return 0;
    return Math.max(0, preferences.ai_monthly_budget_cents - preferences.ai_usage_this_month_cents);
  };

  const getAIBudgetPercentage = (): number => {
    if (!preferences) return 0;
    return (preferences.ai_usage_this_month_cents / preferences.ai_monthly_budget_cents) * 100;
  };

  const canUseAI = (): boolean => {
    if (!preferences?.ai_personalization_enabled) return false;
    return getAIBudgetRemaining() > 0;
  };

  return {
    preferences,
    isLoading,
    error,
    loadPreferences,
    updatePreferences,
    getAIBudgetRemaining,
    getAIBudgetPercentage,
    canUseAI,
  };
};

