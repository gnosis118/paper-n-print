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

// Plan configuration mapping
const PLAN_CONFIG = {
  free: {
    invoiceLimit: 3,
    hasWatermark: true,
    features: ['Basic templates', 'PDF export with watermark', '3 invoices per month', 'Email support']
  },
  paid: {
    invoiceLimit: Infinity,
    hasWatermark: false,
    features: ['All templates', 'Unlimited invoices', 'No watermark', 'Payment links', 'Custom branding', 'Priority support']
  }
};

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData>({
    subscribed: false,
    plan: 'free',
    loading: false
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
    if (!user) {
      throw new Error('Please log in to manage your subscription');
    }

    try {
      // Get the current session to ensure we have a valid token
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No active session. Please log in again.');
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Customer portal error:', error);
        throw new Error(error.message || 'Failed to open customer portal');
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No portal URL received from Stripe');
      }
    } catch (error) {
      console.error('Customer portal error:', error);
      throw error;
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

  const currentPlanConfig = PLAN_CONFIG[subscription.plan as keyof typeof PLAN_CONFIG] || PLAN_CONFIG.free;

  return {
    ...subscription,  
    checkSubscription,
    openCustomerPortal,
    // Plan type helpers
    isFree: subscription.plan === 'free',
    isPaid: subscription.plan === 'paid' || subscription.subscribed,
    // Plan configuration
    planConfig: currentPlanConfig,
    invoiceLimit: currentPlanConfig.invoiceLimit,
    hasWatermark: currentPlanConfig.hasWatermark,
    planFeatures: currentPlanConfig.features
  };
};