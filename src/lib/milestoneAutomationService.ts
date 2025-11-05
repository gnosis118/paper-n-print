/**
 * Milestone Automation Service
 * Handles milestone payment tracking, auto-reminders, and invoice generation
 */

import { supabase } from '@/integrations/supabase/client';

export interface MilestoneStage {
  percentage: number;
  description: string;
  daysUntilDue?: number;
}

export interface MilestoneAutomationConfig {
  estimateId: string;
  userId: string;
  stages: MilestoneStage[];
  totalAmount: number;
  clientEmail: string;
  clientName: string;
  jobDescription: string;
}

/**
 * Create milestone payments from estimate
 * Splits total amount into stages (e.g., 30% deposit, 50% midway, 20% final)
 */
export const createMilestonePayments = async (config: MilestoneAutomationConfig) => {
  const { estimateId, userId, stages, totalAmount, clientEmail, clientName, jobDescription } = config;

  try {
    const milestones = stages.map((stage, index) => ({
      estimate_id: estimateId,
      user_id: userId,
      milestone_number: index + 1,
      description: stage.description,
      amount: (totalAmount * stage.percentage) / 100,
      due_date: stage.daysUntilDue 
        ? new Date(Date.now() + stage.daysUntilDue * 24 * 60 * 60 * 1000).toISOString()
        : null,
      status: 'pending',
    }));

    const { data, error } = await supabase
      .from('milestone_payments')
      .insert(milestones)
      .select();

    if (error) throw error;

    // Update estimate with milestone_payments JSONB
    await supabase
      .from('estimates')
      .update({
        milestone_payments: milestones.map(m => ({
          number: m.milestone_number,
          description: m.description,
          amount: m.amount,
          percentage: stages[m.milestone_number - 1].percentage,
          status: 'pending',
        })),
        bid_type: 'milestone',
      })
      .eq('id', estimateId);

    return { success: true, milestones: data };
  } catch (error) {
    console.error('Error creating milestone payments:', error);
    throw error;
  }
};

/**
 * Mark milestone as paid and trigger invoice generation
 */
export const markMilestoneAsPaid = async (
  milestoneId: string,
  userId: string,
  estimateId: string
) => {
  try {
    // Update milestone status
    const { data: milestone, error: updateError } = await supabase
      .from('milestone_payments')
      .update({
        status: 'paid',
        paid_at: new Date().toISOString(),
      })
      .eq('id', milestoneId)
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Get estimate details
    const { data: estimate, error: estimateError } = await supabase
      .from('estimates')
      .select('*')
      .eq('id', estimateId)
      .eq('user_id', userId)
      .single();

    if (estimateError) throw estimateError;

    // Generate invoice segment for this milestone
    const invoiceData = {
      user_id: userId,
      estimate_id: estimateId,
      client_id: estimate.client_id,
      client_name: estimate.client_name,
      client_email: estimate.client_email,
      number: `INV-${estimate.number.replace('EST-', '')}-M${milestone.milestone_number}`,
      items: estimate.items.map((item: any) => ({
        ...item,
        description: `${item.description} (Milestone ${milestone.milestone_number}: ${milestone.description})`,
      })),
      subtotal: milestone.amount,
      tax_rate: estimate.tax_rate,
      tax_amount: (milestone.amount * estimate.tax_rate) / 100,
      total: milestone.amount + (milestone.amount * estimate.tax_rate) / 100,
      status: 'paid',
      terms: estimate.terms,
      notes: `Milestone ${milestone.milestone_number} of ${estimate.milestone_payments?.length || 1}`,
      created_at: new Date().toISOString(),
    };

    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert(invoiceData)
      .select()
      .single();

    if (invoiceError) throw invoiceError;

    return {
      success: true,
      milestone,
      invoice,
      message: `Milestone ${milestone.milestone_number} marked as paid and invoice generated`,
    };
  } catch (error) {
    console.error('Error marking milestone as paid:', error);
    throw error;
  }
};

/**
 * Check for overdue milestones and trigger reminders
 */
export const checkOverdueMilestones = async (userId: string) => {
  try {
    const now = new Date().toISOString();

    const { data: overdueMilestones, error } = await supabase
      .from('milestone_payments')
      .update({ status: 'overdue' })
      .eq('user_id', userId)
      .lt('due_date', now)
      .eq('status', 'pending')
      .select();

    if (error) throw error;

    return {
      success: true,
      overdueMilestones: overdueMilestones || [],
      count: overdueMilestones?.length || 0,
    };
  } catch (error) {
    console.error('Error checking overdue milestones:', error);
    throw error;
  }
};

/**
 * Get milestone payment summary for an estimate
 */
export const getMilestoneSummary = async (estimateId: string, userId: string) => {
  try {
    const { data: milestones, error } = await supabase
      .from('milestone_payments')
      .select('*')
      .eq('estimate_id', estimateId)
      .eq('user_id', userId)
      .order('milestone_number', { ascending: true });

    if (error) throw error;

    const total = milestones?.reduce((sum, m) => sum + m.amount, 0) || 0;
    const paid = milestones?.filter(m => m.status === 'paid').reduce((sum, m) => sum + m.amount, 0) || 0;
    const pending = milestones?.filter(m => m.status === 'pending').reduce((sum, m) => sum + m.amount, 0) || 0;
    const overdue = milestones?.filter(m => m.status === 'overdue').reduce((sum, m) => sum + m.amount, 0) || 0;

    return {
      success: true,
      milestones: milestones || [],
      summary: {
        total,
        paid,
        pending,
        overdue,
        percentagePaid: total > 0 ? (paid / total) * 100 : 0,
      },
    };
  } catch (error) {
    console.error('Error getting milestone summary:', error);
    throw error;
  }
};

