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
    features: ['Basic templates', 'PDF export with watermark', 'Email support']
  },
  basic: {
    invoiceLimit: 25, 
    hasWatermark: false,
    features: ['All templates', 'No watermark', 'Priority support', 'Custom branding']
  },
  professional: {
    invoiceLimit: 100,
    hasWatermark: false,
    features: ['Premium templates', 'Team collaboration', 'Advanced features']
  },
  enterprise: {
    invoiceLimit: 500,
    hasWatermark: false,
    features: ['Unlimited features', 'API access', 'Dedicated support']
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
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        console.error('Customer portal error:', error);
        throw error;
      }
      
      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No portal URL received');
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
    isBasic: subscription.plan === 'basic', 
    isProfessional: subscription.plan === 'professional',
    isEnterprise: subscription.plan === 'enterprise',
    // Legacy compatibility
    isStarter: subscription.plan === 'basic',
    isPro: subscription.plan === 'professional', 
    isAgency: subscription.plan === 'enterprise',
    // Plan configuration
    planConfig: currentPlanConfig,
    invoiceLimit: currentPlanConfig.invoiceLimit,
    hasWatermark: currentPlanConfig.hasWatermark,
    planFeatures: currentPlanConfig.features
  };
};