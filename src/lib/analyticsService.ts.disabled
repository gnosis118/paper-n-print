/**
 * Analytics Tracking Service
 * Tracks key business events for ProInvoice
 */

import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsEvent {
  event_name: string;
  user_id?: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

/**
 * Track estimate created event
 */
export const trackEstimateCreated = async (
  userId: string,
  estimateData: {
    estimateId: string;
    amount: number;
    depositPercentage: number;
    clientId?: string;
    industry?: string;
  }
) => {
  try {
    await supabase.from('analytics_events').insert({
      event_name: 'estimate_created',
      user_id: userId,
      properties: {
        estimate_id: estimateData.estimateId,
        amount: estimateData.amount,
        deposit_percentage: estimateData.depositPercentage,
        client_id: estimateData.clientId,
        industry: estimateData.industry,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking estimate created:', error);
  }
};

/**
 * Track deposit paid event
 */
export const trackDepositPaid = async (
  userId: string,
  depositData: {
    estimateId: string;
    depositAmount: number;
    totalAmount: number;
    paymentMethod?: string;
  }
) => {
  try {
    await supabase.from('analytics_events').insert({
      event_name: 'deposit_paid',
      user_id: userId,
      properties: {
        estimate_id: depositData.estimateId,
        deposit_amount: depositData.depositAmount,
        total_amount: depositData.totalAmount,
        payment_method: depositData.paymentMethod,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking deposit paid:', error);
  }
};

/**
 * Track invoice created event
 */
export const trackInvoiceCreated = async (
  userId: string,
  invoiceData: {
    invoiceId: string;
    amount: number;
    estimateId?: string;
    clientId?: string;
  }
) => {
  try {
    await supabase.from('analytics_events').insert({
      event_name: 'invoice_created',
      user_id: userId,
      properties: {
        invoice_id: invoiceData.invoiceId,
        amount: invoiceData.amount,
        estimate_id: invoiceData.estimateId,
        client_id: invoiceData.clientId,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking invoice created:', error);
  }
};

/**
 * Track invoice paid event
 */
export const trackInvoicePaid = async (
  userId: string,
  invoiceData: {
    invoiceId: string;
    amount: number;
    paymentMethod?: string;
    daysToPayment?: number;
  }
) => {
  try {
    await supabase.from('analytics_events').insert({
      event_name: 'invoice_paid',
      user_id: userId,
      properties: {
        invoice_id: invoiceData.invoiceId,
        amount: invoiceData.amount,
        payment_method: invoiceData.paymentMethod,
        days_to_payment: invoiceData.daysToPayment,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking invoice paid:', error);
  }
};

/**
 * Track change order created event
 */
export const trackChangeOrderCreated = async (
  userId: string,
  changeOrderData: {
    changeOrderId: string;
    estimateId: string;
    amount: number;
    reason?: string;
  }
) => {
  try {
    await supabase.from('analytics_events').insert({
      event_name: 'change_order_created',
      user_id: userId,
      properties: {
        change_order_id: changeOrderData.changeOrderId,
        estimate_id: changeOrderData.estimateId,
        amount: changeOrderData.amount,
        reason: changeOrderData.reason,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking change order created:', error);
  }
};

/**
 * Track onboarding step completed
 */
export const trackOnboardingStepCompleted = async (
  userId: string,
  stepData: {
    stepId: string;
    day: number;
    title: string;
  }
) => {
  try {
    await supabase.from('analytics_events').insert({
      event_name: 'onboarding_step_completed',
      user_id: userId,
      properties: {
        step_id: stepData.stepId,
        day: stepData.day,
        title: stepData.title,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking onboarding step:', error);
  }
};

/**
 * Get analytics summary for user
 */
export const getAnalyticsSummary = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('event_name, properties')
      .eq('user_id', userId);

    if (error) throw error;

    // Calculate summary metrics
    const summary = {
      estimatesCreated: data?.filter((e) => e.event_name === 'estimate_created').length || 0,
      depositsPaid: data?.filter((e) => e.event_name === 'deposit_paid').length || 0,
      invoicesCreated: data?.filter((e) => e.event_name === 'invoice_created').length || 0,
      invoicesPaid: data?.filter((e) => e.event_name === 'invoice_paid').length || 0,
      changeOrdersCreated: data?.filter((e) => e.event_name === 'change_order_created').length || 0,
      onboardingStepsCompleted: data?.filter((e) => e.event_name === 'onboarding_step_completed').length || 0,
    };

    return summary;
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return null;
  }
};

/**
 * Get conversion metrics
 */
export const getConversionMetrics = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('event_name, properties')
      .eq('user_id', userId);

    if (error) throw error;

    const estimatesCreated = data?.filter((e) => e.event_name === 'estimate_created').length || 0;
    const invoicesCreated = data?.filter((e) => e.event_name === 'invoice_created').length || 0;
    const invoicesPaid = data?.filter((e) => e.event_name === 'invoice_paid').length || 0;

    return {
      estimateToInvoiceConversion: estimatesCreated > 0 ? (invoicesCreated / estimatesCreated) * 100 : 0,
      invoicePaymentRate: invoicesCreated > 0 ? (invoicesPaid / invoicesCreated) * 100 : 0,
      estimatesCreated,
      invoicesCreated,
      invoicesPaid,
    };
  } catch (error) {
    console.error('Error getting conversion metrics:', error);
    return null;
  }
};

/**
 * Track custom event
 */
export const trackCustomEvent = async (
  userId: string,
  eventName: string,
  properties?: Record<string, any>
) => {
  try {
    await supabase.from('analytics_events').insert({
      event_name: eventName,
      user_id: userId,
      properties: properties || {},
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking custom event:', error);
  }
};

