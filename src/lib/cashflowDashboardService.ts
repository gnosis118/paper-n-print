/**
 * Cashflow Dashboard Service
 * Calculates metrics for contractor cashflow dashboard
 */

import { supabase } from '@/integrations/supabase/client';

export interface CashflowMetrics {
  totalCollectedThisMonth: number;
  pendingDeposits: number;
  overduePayments: number;
  bestPerformingServices: Array<{ service: string; revenue: number; count: number }>;
  monthlyTrend: Array<{ month: string; collected: number; pending: number }>;
  motivationalMessage: string;
}

/**
 * Get total collected this month
 */
export const getTotalCollectedThisMonth = async (userId: string): Promise<number> => {
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

    const { data, error } = await supabase
      .from('payments')
      .select('amount')
      .eq('user_id', userId)
      .gte('created_at', monthStart)
      .lte('created_at', monthEnd)
      .eq('status', 'completed');

    if (error) throw error;

    return data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
  } catch (error) {
    console.error('Error getting total collected:', error);
    return 0;
  }
};

/**
 * Get pending deposits (unpaid estimates with deposit due)
 */
export const getPendingDeposits = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('estimates')
      .select('deposit_amount')
      .eq('user_id', userId)
      .eq('status', 'pending_payment');

    if (error) throw error;

    return data?.reduce((sum, e) => sum + (e.deposit_amount || 0), 0) || 0;
  } catch (error) {
    console.error('Error getting pending deposits:', error);
    return 0;
  }
};

/**
 * Get overdue payments
 */
export const getOverduePayments = async (userId: string): Promise<number> => {
  try {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('invoices')
      .select('total')
      .eq('user_id', userId)
      .eq('status', 'sent')
      .lt('due_date', now);

    if (error) throw error;

    return data?.reduce((sum, i) => sum + (i.total || 0), 0) || 0;
  } catch (error) {
    console.error('Error getting overdue payments:', error);
    return 0;
  }
};

/**
 * Get best-performing service types
 */
export const getBestPerformingServices = async (
  userId: string,
  limit: number = 5
): Promise<Array<{ service: string; revenue: number; count: number }>> => {
  try {
    const { data, error } = await supabase
      .from('estimates')
      .select('title, total')
      .eq('user_id', userId)
      .eq('status', 'invoiced')
      .limit(100);

    if (error) throw error;

    // Group by service type and calculate totals
    const serviceMap = new Map<string, { revenue: number; count: number }>();

    data?.forEach((estimate: any) => {
      const service = estimate.title || 'Other';
      const current = serviceMap.get(service) || { revenue: 0, count: 0 };
      serviceMap.set(service, {
        revenue: current.revenue + (estimate.total || 0),
        count: current.count + 1,
      });
    });

    return Array.from(serviceMap.entries())
      .map(([service, { revenue, count }]) => ({ service, revenue, count }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting best performing services:', error);
    return [];
  }
};

/**
 * Generate motivational message based on metrics
 */
export const generateMotivationalMessage = (
  collected: number,
  pending: number,
  bestMonth: number
): string => {
  const potentialTotal = collected + pending;
  const amountToGoal = Math.max(0, bestMonth - collected);

  if (amountToGoal <= 0) {
    return `🎉 Amazing! You've already surpassed your best month with $${collected.toFixed(2)} collected!`;
  }

  if (pending > 0) {
    return `💪 You're $${amountToGoal.toFixed(2)} away from your best month! You have $${pending.toFixed(2)} in pending payments.`;
  }

  if (collected > bestMonth * 0.8) {
    return `🚀 You're on track! $${amountToGoal.toFixed(2)} more and you'll beat your best month.`;
  }

  return `📈 Keep pushing! You've collected $${collected.toFixed(2)} this month. $${amountToGoal.toFixed(2)} to go!`;
};

/**
 * Get complete cashflow metrics
 */
export const getCashflowMetrics = async (userId: string): Promise<CashflowMetrics> => {
  try {
    const [collected, pending, overdue, services] = await Promise.all([
      getTotalCollectedThisMonth(userId),
      getPendingDeposits(userId),
      getOverduePayments(userId),
      getBestPerformingServices(userId),
    ]);

    // Calculate best month (for now, use collected as baseline)
    const bestMonth = collected * 1.2; // Assume 20% growth target

    const motivationalMessage = generateMotivationalMessage(collected, pending, bestMonth);

    // Get monthly trend (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();

      const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('user_id', userId)
        .gte('created_at', monthStart)
        .lte('created_at', monthEnd)
        .eq('status', 'completed');

      const { data: invoices } = await supabase
        .from('invoices')
        .select('total')
        .eq('user_id', userId)
        .gte('created_at', monthStart)
        .lte('created_at', monthEnd)
        .eq('status', 'sent');

      monthlyTrend.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        collected: payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0,
        pending: invoices?.reduce((sum, i) => sum + (i.total || 0), 0) || 0,
      });
    }

    return {
      totalCollectedThisMonth: collected,
      pendingDeposits: pending,
      overduePayments: overdue,
      bestPerformingServices: services,
      monthlyTrend,
      motivationalMessage,
    };
  } catch (error) {
    console.error('Error getting cashflow metrics:', error);
    throw error;
  }
};

