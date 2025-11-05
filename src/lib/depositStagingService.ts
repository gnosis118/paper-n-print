import { supabase } from '@/integrations/supabase/client';

export interface DepositStage {
  id: string;
  estimate_id: string;
  stage_number: number;
  description: string;
  percentage: number;
  amount: number;
  due_date?: string;
  status: 'pending' | 'paid' | 'overdue';
  paid_at?: string;
}

export interface ProgressBillingEntry {
  id: string;
  estimate_id: string;
  entry_number: number;
  description: string;
  percentage_complete: number;
  amount_to_bill: number;
  billed_at?: string;
}

/**
 * Predefined deposit staging templates
 */
export const DEPOSIT_STAGING_TEMPLATES = {
  standard: [
    { description: 'Deposit', percentage: 30 },
  ],
  split_50_50: [
    { description: 'Initial Deposit', percentage: 50 },
    { description: 'Final Payment', percentage: 50 },
  ],
  split_30_40_30: [
    { description: 'Initial Deposit', percentage: 30 },
    { description: 'Midway Payment', percentage: 40 },
    { description: 'Final Payment', percentage: 30 },
  ],
  split_25_25_25_25: [
    { description: 'Phase 1 Deposit', percentage: 25 },
    { description: 'Phase 2 Payment', percentage: 25 },
    { description: 'Phase 3 Payment', percentage: 25 },
    { description: 'Final Payment', percentage: 25 },
  ],
};

/**
 * Create deposit stages for an estimate
 */
export const createDepositStages = async (
  estimateId: string,
  userId: string,
  totalAmount: number,
  stages: Array<{ description: string; percentage: number; daysUntilDue?: number }>
): Promise<DepositStage[]> => {
  const depositStages = stages.map((stage, index) => {
    const dueDate = stage.daysUntilDue
      ? new Date(Date.now() + stage.daysUntilDue * 24 * 60 * 60 * 1000).toISOString()
      : null;

    return {
      estimate_id: estimateId,
      user_id: userId,
      stage_number: index + 1,
      description: stage.description,
      percentage: stage.percentage,
      amount: (totalAmount * stage.percentage) / 100,
      due_date: dueDate,
      status: 'pending',
    };
  });

  const { data: createdStages, error } = await supabase
    .from('deposit_stages')
    .insert(depositStages)
    .select();

  if (error) throw error;

  // Update estimate with deposit staging info
  await supabase
    .from('estimates')
    .update({
      deposit_staging: stages.length > 1 ? 'staged' : 'single',
      deposit_stages: depositStages,
    })
    .eq('id', estimateId);

  return createdStages || [];
};

/**
 * Mark a deposit stage as paid
 */
export const markDepositStagePaid = async (
  stageId: string,
  estimateId: string
): Promise<DepositStage> => {
  const { data: stage, error } = await supabase
    .from('deposit_stages')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
    })
    .eq('id', stageId)
    .select()
    .single();

  if (error) throw error;

  // Check if all stages are paid
  const { data: allStages } = await supabase
    .from('deposit_stages')
    .select('status')
    .eq('estimate_id', estimateId);

  const allPaid = allStages?.every((s) => s.status === 'paid');

  if (allPaid) {
    // Update estimate status
    await supabase
      .from('estimates')
      .update({ status: 'deposit_collected' })
      .eq('id', estimateId);
  }

  return stage;
};

/**
 * Get all deposit stages for an estimate
 */
export const getDepositStages = async (estimateId: string): Promise<DepositStage[]> => {
  const { data: stages, error } = await supabase
    .from('deposit_stages')
    .select('*')
    .eq('estimate_id', estimateId)
    .order('stage_number', { ascending: true });

  if (error) throw error;
  return stages || [];
};

/**
 * Get deposit staging summary
 */
export const getDepositStagingSummary = async (
  estimateId: string
): Promise<{
  totalStages: number;
  paidStages: number;
  pendingStages: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  percentageComplete: number;
}> => {
  const { data: stages, error } = await supabase
    .from('deposit_stages')
    .select('*')
    .eq('estimate_id', estimateId);

  if (error) throw error;

  const stages_list = stages || [];
  const totalStages = stages_list.length;
  const paidStages = stages_list.filter((s) => s.status === 'paid').length;
  const pendingStages = totalStages - paidStages;
  const totalAmount = stages_list.reduce((sum, s) => sum + s.amount, 0);
  const paidAmount = stages_list
    .filter((s) => s.status === 'paid')
    .reduce((sum, s) => sum + s.amount, 0);
  const pendingAmount = totalAmount - paidAmount;
  const percentageComplete = totalStages > 0 ? (paidStages / totalStages) * 100 : 0;

  return {
    totalStages,
    paidStages,
    pendingStages,
    totalAmount,
    paidAmount,
    pendingAmount,
    percentageComplete,
  };
};

/**
 * Create progress billing entries
 */
export const createProgressBillingEntry = async (
  estimateId: string,
  userId: string,
  data: {
    description: string;
    percentage_complete: number;
    amount_to_bill: number;
  }
): Promise<ProgressBillingEntry> => {
  // Get the next entry number
  const { data: existingEntries } = await supabase
    .from('progress_billing_entries')
    .select('entry_number')
    .eq('estimate_id', estimateId)
    .order('entry_number', { ascending: false })
    .limit(1);

  const nextNumber = (existingEntries?.[0]?.entry_number || 0) + 1;

  const { data: entry, error } = await supabase
    .from('progress_billing_entries')
    .insert({
      estimate_id: estimateId,
      user_id: userId,
      entry_number: nextNumber,
      description: data.description,
      percentage_complete: data.percentage_complete,
      amount_to_bill: data.amount_to_bill,
    })
    .select()
    .single();

  if (error) throw error;
  return entry;
};

/**
 * Get all progress billing entries for an estimate
 */
export const getProgressBillingEntries = async (
  estimateId: string
): Promise<ProgressBillingEntry[]> => {
  const { data: entries, error } = await supabase
    .from('progress_billing_entries')
    .select('*')
    .eq('estimate_id', estimateId)
    .order('entry_number', { ascending: true });

  if (error) throw error;
  return entries || [];
};

/**
 * Mark progress billing entry as billed
 */
export const markProgressBillingAsBilled = async (
  entryId: string
): Promise<ProgressBillingEntry> => {
  const { data: entry, error } = await supabase
    .from('progress_billing_entries')
    .update({
      billed_at: new Date().toISOString(),
    })
    .eq('id', entryId)
    .select()
    .single();

  if (error) throw error;
  return entry;
};

