import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface EstimateItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Estimate {
  id: string;
  user_id: string;
  client_id?: string;
  number: string;
  title: string;
  items: EstimateItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  deposit_type: 'percent' | 'fixed';
  deposit_value: number;
  status: 'draft' | 'sent' | 'accepted' | 'invoiced';
  public_slug: string;
  terms?: string;
  created_at: string;
  updated_at: string;
  accepted_at?: string;
  accepted_ip?: string;
  checkout_session_id?: string;
  payment_intent_id?: string;
}

export const useEstimates = () => {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchEstimates = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('estimates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type cast the data properly
      const typedEstimates: Estimate[] = (data || []).map(item => ({
        ...item,
        items: (item.items as unknown as EstimateItem[]) || [],
        deposit_type: item.deposit_type as 'percent' | 'fixed',
        status: item.status as 'draft' | 'sent' | 'accepted' | 'invoiced',
        accepted_ip: item.accepted_ip as string | undefined,
        client_id: item.client_id || undefined,
        terms: item.terms || undefined,
        accepted_at: item.accepted_at || undefined,
        checkout_session_id: item.checkout_session_id || undefined,
        payment_intent_id: item.payment_intent_id || undefined,
      }));

      setEstimates(typedEstimates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load estimates');
    } finally {
      setLoading(false);
    }
  };

  const createEstimate = async (estimateData: Partial<Estimate>): Promise<Estimate | null> => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Generate a unique slug
      const slug = `est-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      
      const insertData = {
        number: estimateData.number || `EST-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
        title: estimateData.title || '',
        items: (estimateData.items || []) as any,
        subtotal: estimateData.subtotal || 0,
        tax_rate: estimateData.tax_rate || 0,
        tax_amount: estimateData.tax_amount || 0,
        total: estimateData.total || 0,
        deposit_type: estimateData.deposit_type || 'percent',
        deposit_value: estimateData.deposit_value || 0,
        terms: estimateData.terms,
        user_id: user.id,
        public_slug: slug,
      };

      const { data, error } = await supabase
        .from('estimates')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      const newEstimate: Estimate = {
        ...data,
        items: (data.items as unknown as EstimateItem[]) || [],
        deposit_type: data.deposit_type as 'percent' | 'fixed',
        status: data.status as 'draft' | 'sent' | 'accepted' | 'invoiced',
        accepted_ip: data.accepted_ip as string | undefined,
        client_id: data.client_id || undefined,
        terms: data.terms || undefined,
        accepted_at: data.accepted_at || undefined,
        checkout_session_id: data.checkout_session_id || undefined,
        payment_intent_id: data.payment_intent_id || undefined,
      };

      setEstimates(prev => [newEstimate, ...prev]);
      return newEstimate;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create estimate');
    }
  };

  const updateEstimate = async (id: string, updates: Partial<Estimate>): Promise<void> => {
    try {
      const updateData = { ...updates };
      if (updates.items) {
        updateData.items = updates.items as any; // Cast to handle Json type
      }
      
      const { error } = await supabase
        .from('estimates')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setEstimates(prev => 
        prev.map(est => 
          est.id === id ? { ...est, ...updates } : est
        )
      );
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update estimate');
    }
  };

  const deleteEstimate = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('estimates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEstimates(prev => prev.filter(est => est.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete estimate');
    }
  };

  useEffect(() => {
    fetchEstimates();
  }, [user]);

  return {
    estimates,
    loading,
    error,
    createEstimate,
    updateEstimate,
    deleteEstimate,
    refetch: fetchEstimates,
  };
};