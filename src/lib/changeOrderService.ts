import { supabase } from '@/integrations/supabase/client';

export interface ChangeOrderItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface ChangeOrder {
  id: string;
  estimate_id: string;
  change_order_number: number;
  title: string;
  description?: string;
  items: ChangeOrderItem[];
  amount_change: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'applied';
  requested_at: string;
  approved_at?: string;
  applied_at?: string;
}

/**
 * Create a new change order for an estimate
 */
export const createChangeOrder = async (
  estimateId: string,
  userId: string,
  data: {
    title: string;
    description?: string;
    items: ChangeOrderItem[];
    reason: string;
  }
): Promise<ChangeOrder> => {
  // Get the next change order number
  const { data: existingOrders } = await supabase
    .from('change_orders')
    .select('change_order_number')
    .eq('estimate_id', estimateId)
    .order('change_order_number', { ascending: false })
    .limit(1);

  const nextNumber = (existingOrders?.[0]?.change_order_number || 0) + 1;

  // Calculate total amount change
  const amountChange = data.items.reduce((sum, item) => sum + item.amount, 0);

  const { data: changeOrder, error } = await supabase
    .from('change_orders')
    .insert({
      estimate_id: estimateId,
      user_id: userId,
      change_order_number: nextNumber,
      title: data.title,
      description: data.description,
      items: data.items,
      amount_change: amountChange,
      reason: data.reason,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return changeOrder;
};

/**
 * Approve a change order
 */
export const approveChangeOrder = async (
  changeOrderId: string
): Promise<ChangeOrder> => {
  const { data: changeOrder, error } = await supabase
    .from('change_orders')
    .update({
      status: 'approved',
      approved_at: new Date().toISOString(),
    })
    .eq('id', changeOrderId)
    .select()
    .single();

  if (error) throw error;
  return changeOrder;
};

/**
 * Apply a change order to the estimate (updates estimate total)
 */
export const applyChangeOrder = async (
  changeOrderId: string,
  estimateId: string
): Promise<{ changeOrder: ChangeOrder; updatedEstimate: any }> => {
  // Get the change order
  const { data: changeOrder, error: fetchError } = await supabase
    .from('change_orders')
    .select('*')
    .eq('id', changeOrderId)
    .single();

  if (fetchError) throw fetchError;

  // Get the estimate
  const { data: estimate, error: estimateError } = await supabase
    .from('estimates')
    .select('*')
    .eq('id', estimateId)
    .single();

  if (estimateError) throw estimateError;

  // Update estimate total
  const newTotal = estimate.total + changeOrder.amount_change;
  const newDepositAmount = (newTotal * estimate.deposit_percentage) / 100;

  const { data: updatedEstimate, error: updateError } = await supabase
    .from('estimates')
    .update({
      total: newTotal,
      deposit_amount: newDepositAmount,
      updated_at: new Date().toISOString(),
    })
    .eq('id', estimateId)
    .select()
    .single();

  if (updateError) throw updateError;

  // Mark change order as applied
  const { data: appliedChangeOrder, error: applyError } = await supabase
    .from('change_orders')
    .update({
      status: 'applied',
      applied_at: new Date().toISOString(),
    })
    .eq('id', changeOrderId)
    .select()
    .single();

  if (applyError) throw applyError;

  return {
    changeOrder: appliedChangeOrder,
    updatedEstimate,
  };
};

/**
 * Reject a change order
 */
export const rejectChangeOrder = async (
  changeOrderId: string
): Promise<ChangeOrder> => {
  const { data: changeOrder, error } = await supabase
    .from('change_orders')
    .update({
      status: 'rejected',
    })
    .eq('id', changeOrderId)
    .select()
    .single();

  if (error) throw error;
  return changeOrder;
};

/**
 * Get all change orders for an estimate
 */
export const getChangeOrdersByEstimate = async (
  estimateId: string
): Promise<ChangeOrder[]> => {
  const { data: changeOrders, error } = await supabase
    .from('change_orders')
    .select('*')
    .eq('estimate_id', estimateId)
    .order('change_order_number', { ascending: true });

  if (error) throw error;
  return changeOrders || [];
};

/**
 * Clone an estimate and create a new version with modifications
 */
export const cloneEstimate = async (
  estimateId: string,
  userId: string,
  modifications?: {
    title?: string;
    items?: any[];
    deposit_percentage?: number;
  }
): Promise<any> => {
  // Get the original estimate
  const { data: original, error: fetchError } = await supabase
    .from('estimates')
    .select('*')
    .eq('id', estimateId)
    .single();

  if (fetchError) throw fetchError;

  // Create new estimate with modifications
  const newEstimate = {
    user_id: userId,
    client_id: original.client_id,
    client_name: original.client_name,
    client_email: original.client_email,
    number: `${original.number}-v2`,
    title: modifications?.title || original.title,
    items: modifications?.items || original.items,
    subtotal: modifications?.items
      ? modifications.items.reduce((sum: number, item: any) => sum + item.amount, 0)
      : original.subtotal,
    tax_rate: original.tax_rate,
    tax_amount: modifications?.items
      ? (modifications.items.reduce((sum: number, item: any) => sum + item.amount, 0) * original.tax_rate) / 100
      : original.tax_amount,
    total: modifications?.items
      ? modifications.items.reduce((sum: number, item: any) => sum + item.amount, 0) * (1 + original.tax_rate / 100)
      : original.total,
    deposit_percentage: modifications?.deposit_percentage || original.deposit_percentage,
    deposit_amount: 0, // Will be calculated
    status: 'pending_payment',
    terms: original.terms,
    notes: original.notes,
    original_estimate_id: estimateId,
    bid_type: original.bid_type,
    contractor_notes: original.contractor_notes,
    is_bid: original.is_bid,
  };

  // Calculate deposit amount
  newEstimate.deposit_amount = (newEstimate.total * newEstimate.deposit_percentage) / 100;

  const { data: clonedEstimate, error: createError } = await supabase
    .from('estimates')
    .insert(newEstimate)
    .select()
    .single();

  if (createError) throw createError;
  return clonedEstimate;
};

