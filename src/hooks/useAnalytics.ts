import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface AnalyticsMetrics {
  // Estimate Metrics
  totalEstimates: number;
  estimatesByStatus: {
    pending_payment: number;
    accepted: number;
    invoiced: number;
    declined: number;
  };
  estimateConversionRate: number; // percentage
  totalEstimateValue: number;
  totalDepositCollected: number;

  // Reminder Metrics
  totalReminders: number;
  remindersThisMonth: number;
  estimatesWithReminders: number;

  // Payment Metrics
  totalPayments: number;
  totalPaymentAmount: number;
  paymentSuccessRate: number; // percentage
  averagePaymentAmount: number;

  // Email Metrics
  totalEmailsSent: number;
  emailSuccessRate: number; // percentage
  emailsByType: {
    created: number;
    deposit_paid: number;
    reminder: number;
    invoice_sent: number;
  };

  // Lead Metrics
  totalLeads: number;
  leadsByStatus: {
    new: number;
    contacted: number;
    qualified: number;
    converted: number;
    lost: number;
  };
  leadConversionRate: number; // percentage
  averageLeadScore: number;
  leadsBySource: {
    homepage: number;
    pricing: number;
    templates: number;
    referral: number;
    other: number;
  };

  // AI Usage Metrics
  aiCostThisMonth: number;
  aiUsageCount: number;

  // Revenue Metrics
  totalRevenue: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  revenueGrowth: number; // percentage

  // Trends
  estimatesCreatedThisMonth: number;
  estimatesCreatedLastMonth: number;
  leadsCreatedThisMonth: number;
  leadsCreatedLastMonth: number;
}

export const useAnalytics = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    loadAnalytics();
  }, [user?.id]);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const now = new Date();
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

      // Fetch all data in parallel
      const [
        estimatesRes,
        remindersRes,
        paymentsRes,
        emailsRes,
        leadsRes,
        aiUsageRes,
      ] = await Promise.all([
        supabase.from('estimates').select('*').eq('user_id', user?.id),
        supabase.from('estimate_reminders').select('*').eq('user_id', user?.id),
        supabase.from('payments').select('*').eq('user_id', user?.id),
        supabase.from('email_logs').select('*').eq('user_id', user?.id),
        supabase.from('leads').select('*').eq('user_id', user?.id),
        supabase.from('ai_usage_logs').select('*').eq('user_id', user?.id),
      ]);

      const estimates = estimatesRes.data || [];
      const reminders = remindersRes.data || [];
      const payments = paymentsRes.data || [];
      const emails = emailsRes.data || [];
      const leads = leadsRes.data || [];
      const aiUsage = aiUsageRes.data || [];

      // Calculate metrics
      const totalEstimates = estimates.length;
      const estimatesByStatus = {
        pending_payment: estimates.filter(e => e.status === 'pending_payment').length,
        accepted: estimates.filter(e => e.status === 'accepted').length,
        invoiced: estimates.filter(e => e.status === 'invoiced').length,
        declined: estimates.filter(e => e.status === 'declined').length,
      };
      const estimateConversionRate = totalEstimates > 0 
        ? Math.round((estimatesByStatus.invoiced / totalEstimates) * 100) 
        : 0;
      const totalEstimateValue = estimates.reduce((sum, e) => sum + (e.total || 0), 0);
      const totalDepositCollected = estimates.reduce((sum, e) => sum + (e.deposit_amount || 0), 0);

      const totalReminders = reminders.length;
      const remindersThisMonth = reminders.filter(r => new Date(r.sent_at) >= thisMonthStart).length;
      const estimatesWithReminders = new Set(reminders.map(r => r.estimate_id)).size;

      const totalPayments = payments.length;
      const totalPaymentAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
      const successfulPayments = payments.filter(p => p.status === 'succeeded').length;
      const paymentSuccessRate = totalPayments > 0 ? Math.round((successfulPayments / totalPayments) * 100) : 0;
      const averagePaymentAmount = totalPayments > 0 ? Math.round(totalPaymentAmount / totalPayments) : 0;

      const totalEmailsSent = emails.length;
      const successfulEmails = emails.filter(e => e.status === 'sent').length;
      const emailSuccessRate = totalEmailsSent > 0 ? Math.round((successfulEmails / totalEmailsSent) * 100) : 0;
      const emailsByType = {
        created: emails.filter(e => e.email_type === 'created').length,
        deposit_paid: emails.filter(e => e.email_type === 'deposit_paid').length,
        reminder: emails.filter(e => e.email_type === 'reminder').length,
        invoice_sent: emails.filter(e => e.email_type === 'invoice_sent').length,
      };

      const totalLeads = leads.length;
      const leadsByStatus = {
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        converted: leads.filter(l => l.status === 'converted').length,
        lost: leads.filter(l => l.status === 'lost').length,
      };
      const leadConversionRate = totalLeads > 0 
        ? Math.round((leadsByStatus.converted / totalLeads) * 100) 
        : 0;
      const averageLeadScore = totalLeads > 0 
        ? Math.round(leads.reduce((sum, l) => sum + (l.lead_score || 0), 0) / totalLeads) 
        : 0;
      const leadsBySource = {
        homepage: leads.filter(l => l.source === 'homepage').length,
        pricing: leads.filter(l => l.source === 'pricing').length,
        templates: leads.filter(l => l.source === 'templates').length,
        referral: leads.filter(l => l.source === 'referral').length,
        other: leads.filter(l => l.source === 'other').length,
      };

      const aiCostThisMonth = aiUsage
        .filter(a => new Date(a.created_at) >= thisMonthStart)
        .reduce((sum, a) => sum + (a.cost_cents || 0), 0);
      const aiUsageCount = aiUsage.length;

      const totalRevenue = totalPaymentAmount;
      const revenueThisMonth = payments
        .filter(p => new Date(p.created_at) >= thisMonthStart && p.status === 'succeeded')
        .reduce((sum, p) => sum + (p.amount || 0), 0);
      const revenueLastMonth = payments
        .filter(p => new Date(p.created_at) >= lastMonthStart && new Date(p.created_at) <= lastMonthEnd && p.status === 'succeeded')
        .reduce((sum, p) => sum + (p.amount || 0), 0);
      const revenueGrowth = revenueLastMonth > 0 
        ? Math.round(((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100) 
        : 0;

      const estimatesCreatedThisMonth = estimates.filter(e => new Date(e.created_at) >= thisMonthStart).length;
      const estimatesCreatedLastMonth = estimates.filter(e => new Date(e.created_at) >= lastMonthStart && new Date(e.created_at) <= lastMonthEnd).length;
      const leadsCreatedThisMonth = leads.filter(l => new Date(l.created_at) >= thisMonthStart).length;
      const leadsCreatedLastMonth = leads.filter(l => new Date(l.created_at) >= lastMonthStart && new Date(l.created_at) <= lastMonthEnd).length;

      setMetrics({
        totalEstimates,
        estimatesByStatus,
        estimateConversionRate,
        totalEstimateValue,
        totalDepositCollected,
        totalReminders,
        remindersThisMonth,
        estimatesWithReminders,
        totalPayments,
        totalPaymentAmount,
        paymentSuccessRate,
        averagePaymentAmount,
        totalEmailsSent,
        emailSuccessRate,
        emailsByType,
        totalLeads,
        leadsByStatus,
        leadConversionRate,
        averageLeadScore,
        leadsBySource,
        aiCostThisMonth,
        aiUsageCount,
        totalRevenue,
        revenueThisMonth,
        revenueLastMonth,
        revenueGrowth,
        estimatesCreatedThisMonth,
        estimatesCreatedLastMonth,
        leadsCreatedThisMonth,
        leadsCreatedLastMonth,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load analytics';
      setError(message);
      console.error('Error loading analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    metrics,
    isLoading,
    error,
    refetch: loadAnalytics,
  };
};

