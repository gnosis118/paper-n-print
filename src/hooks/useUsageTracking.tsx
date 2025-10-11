import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UsageData {
  invoicesThisMonth: number;
  invoiceLimit: number;
  canCreateInvoice: boolean;
  isNearLimit: boolean;
  resetDate: Date | null;
  loading: boolean;
}

export const useUsageTracking = () => {
  const { user } = useAuth();
  const [usage, setUsage] = useState<UsageData>({
    invoicesThisMonth: 0,
    invoiceLimit: 3, // Free plan default
    canCreateInvoice: true,
    isNearLimit: false,
    resetDate: null,
    loading: false
  });

  const checkUsage = async () => {
    if (!user) {
      setUsage(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      setUsage(prev => ({ ...prev, loading: true }));

      // Get current month start
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      // Get user subscription to determine limits
      const { data: subscription } = await supabase
        .from('user_subscriptions')
        .select('plan, features')
        .eq('user_id', user.id)
        .single();

      let invoiceLimit = 3; // Free plan default
      if (subscription && subscription.plan === 'paid') {
        invoiceLimit = Infinity; // Unlimited for paid plan
      }

      // Count invoices created this month
      const { count: invoiceCount } = await supabase
        .from('invoices')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', monthStart.toISOString());

      const invoicesThisMonth = invoiceCount || 0;
      const canCreateInvoice = invoicesThisMonth < invoiceLimit;
      const isNearLimit = invoicesThisMonth >= invoiceLimit * 0.8; // 80% threshold

      setUsage({
        invoicesThisMonth,
        invoiceLimit,
        canCreateInvoice,
        isNearLimit,
        resetDate: nextMonthStart,
        loading: false
      });

    } catch (error) {
      console.error('Usage tracking error:', error);
      setUsage(prev => ({ ...prev, loading: false }));
    }
  };

  const trackInvoiceCreation = async () => {
    if (!user) return false;

    try {
      // Check if user can create invoice
      await checkUsage();
      
      if (!usage.canCreateInvoice) {
        return false;
      }

      // Update usage count
      setUsage(prev => ({
        ...prev,
        invoicesThisMonth: prev.invoicesThisMonth + 1,
        canCreateInvoice: prev.invoicesThisMonth + 1 < prev.invoiceLimit,
        isNearLimit: prev.invoicesThisMonth + 1 >= prev.invoiceLimit * 0.8
      }));

      return true;
    } catch (error) {
      console.error('Invoice creation tracking error:', error);
      return false;
    }
  };

  useEffect(() => {
    checkUsage();
  }, [user]);

  return {
    ...usage,
    checkUsage,
    trackInvoiceCreation,
    upgradeRequired: !usage.canCreateInvoice,
    progressPercentage: Math.min((usage.invoicesThisMonth / usage.invoiceLimit) * 100, 100)
  };
};