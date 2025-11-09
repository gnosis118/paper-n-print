import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useOnboarding = () => {
  const { user } = useAuth();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setIsOnboardingComplete(true);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;

        // If no profile exists or onboarding_completed is false/null, show wizard
        setIsOnboardingComplete(data?.onboarding_completed === true);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        // On error, default to showing onboarding for safety
        setIsOnboardingComplete(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  const markOnboardingComplete = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      if (error) throw error;

      setIsOnboardingComplete(true);
    } catch (error) {
      console.error('Error marking onboarding complete:', error);
    }
  };

  return {
    isOnboardingComplete,
    isLoading,
    markOnboardingComplete,
  };
};
