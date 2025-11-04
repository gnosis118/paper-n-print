import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface MilestonePayment {
  id: string;
  estimate_id: string;
  user_id: string;
  milestone_number: number;
  description: string;
  amount: number;
  due_date?: string;
  status: 'pending' | 'paid' | 'overdue';
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export const useMilestonePayments = (estimateId?: string) => {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<MilestonePayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load milestones
  useEffect(() => {
    if (!user || !estimateId) {
      setLoading(false);
      return;
    }

    loadMilestones();
  }, [user?.id, estimateId]);

  const loadMilestones = async () => {
    if (!estimateId) return;

    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('milestone_payments')
        .select('*')
        .eq('estimate_id', estimateId)
        .eq('user_id', user!.id)
        .order('milestone_number', { ascending: true });

      if (err) throw err;
      setMilestones(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load milestones';
      setError(message);
      console.error('Error loading milestone payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const createMilestone = async (milestone: Omit<MilestonePayment, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('milestone_payments')
        .insert({
          ...milestone,
          user_id: user!.id,
        })
        .select()
        .single();

      if (err) throw err;
      setMilestones([...milestones, data]);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create milestone';
      setError(message);
      throw err;
    }
  };

  const updateMilestone = async (id: string, updates: Partial<MilestonePayment>) => {
    try {
      const { data, error: err } = await supabase
        .from('milestone_payments')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user!.id)
        .select()
        .single();

      if (err) throw err;
      setMilestones(milestones.map(m => m.id === id ? data : m));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update milestone';
      setError(message);
      throw err;
    }
  };

  const markAsPaid = async (id: string) => {
    return updateMilestone(id, {
      status: 'paid',
      paid_at: new Date().toISOString(),
    });
  };

  const deleteMilestone = async (id: string) => {
    try {
      const { error: err } = await supabase
        .from('milestone_payments')
        .delete()
        .eq('id', id)
        .eq('user_id', user!.id);

      if (err) throw err;
      setMilestones(milestones.filter(m => m.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete milestone';
      setError(message);
      throw err;
    }
  };

  const getTotalMilestoneAmount = () => {
    return milestones.reduce((sum, m) => sum + m.amount, 0);
  };

  const getPaidAmount = () => {
    return milestones
      .filter(m => m.status === 'paid')
      .reduce((sum, m) => sum + m.amount, 0);
  };

  const getPendingAmount = () => {
    return milestones
      .filter(m => m.status === 'pending' || m.status === 'overdue')
      .reduce((sum, m) => sum + m.amount, 0);
  };

  return {
    milestones,
    loading,
    error,
    loadMilestones,
    createMilestone,
    updateMilestone,
    markAsPaid,
    deleteMilestone,
    getTotalMilestoneAmount,
    getPaidAmount,
    getPendingAmount,
  };
};

