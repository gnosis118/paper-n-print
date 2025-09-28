import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface SubscriptionData {
  subscribed: boolean;
  plan: string;
  product_id?: string;
  subscription_end?: string;
  loading: boolean;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData>({
    subscribed: false,
    plan: 'free',
    loading: true
  });

  const checkSubscription = async () => {
    if (!user) {
      setSubscription({
        subscribed: false,
        plan: 'free',
        loading: false
      });
      return;
    }

    try {
      setSubscription(prev => ({ ...prev, loading: true }));
      
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Subscription check error:', error);
        setSubscription({
          subscribed: false,
          plan: 'free',
          loading: false
        });
        return;
      }

      setSubscription({
        subscribed: data.subscribed || false,
        plan: data.plan || 'free',
        product_id: data.product_id,
        subscription_end: data.subscription_end,
        loading: false
      });
    } catch (error) {
      console.error('Subscription check failed:', error);
      setSubscription({
        subscribed: false,
        plan: 'free',
        loading: false
      });
    }
  };

  const openCustomerPortal = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Customer portal error:', error);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  // Auto-refresh subscription status every minute
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      checkSubscription();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [user]);

  return {
    ...subscription,  
    checkSubscription,
    openCustomerPortal,
    isStarter: subscription.plan === 'starter',
    isPro: subscription.plan === 'pro', 
    isAgency: subscription.plan === 'agency',
    isFree: subscription.plan === 'free'
  };
};