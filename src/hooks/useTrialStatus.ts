import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface TrialStatus {
  isTrialActive: boolean;
  isTrialExpired: boolean;
  trialEndDate: Date | null;
  daysRemaining: number;
  plan: string;
  features: any;
  hasSeenExpiredNotification: boolean;
}

export const useTrialStatus = () => {
  const { user } = useAuth();
  const [trialStatus, setTrialStatus] = useState<TrialStatus>({
    isTrialActive: false,
    isTrialExpired: false,
    trialEndDate: null,
    daysRemaining: 0,
    plan: 'free',
    features: {},
    hasSeenExpiredNotification: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const checkTrialStatus = async () => {
      try {
        // Get subscription info
        const { data: subscription, error: subError } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (subError) throw subError;

        if (!subscription) {
          setLoading(false);
          return;
        }

        const trialEndDate = subscription.trial_end_date ? new Date(subscription.trial_end_date) : null;
        const now = new Date();
        const isExpired = trialEndDate ? trialEndDate < now : false;
        const daysRemaining = trialEndDate ? Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 0;

        // Check if user has seen the expired notification
        const { data: notification } = await supabase
          .from('trial_expiration_notifications')
          .select('dismissed')
          .eq('user_id', user.id)
          .single();

        setTrialStatus({
          isTrialActive: subscription.is_trial && !isExpired,
          isTrialExpired: isExpired && subscription.is_trial,
          trialEndDate,
          daysRemaining: Math.max(0, daysRemaining),
          plan: subscription.plan,
          features: subscription.features,
          hasSeenExpiredNotification: notification?.dismissed || false,
        });

        // If trial is expired and not yet converted, convert it
        if (isExpired && subscription.is_trial && subscription.trial_status === 'active') {
          await supabase.rpc('expire_trial', { user_id: user.id });
        }
      } catch (error) {
        console.error('Error checking trial status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkTrialStatus();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`trial-status-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_subscriptions',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          checkTrialStatus();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { ...trialStatus, loading };
};

