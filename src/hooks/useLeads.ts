import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Lead {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_type: string | null;
  status: string;
  lead_score: number;
  source: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useLeads = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load leads
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    loadLeads();
  }, [user?.id]);

  const loadLeads = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setLeads(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load leads';
      setError(message);
      console.error('Error loading leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createLead = async (leadData: Omit<Lead, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error: createError } = await supabase
        .from('leads')
        .insert({
          user_id: user.id,
          ...leadData,
        })
        .select()
        .single();

      if (createError) throw createError;

      setLeads([data, ...leads]);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create lead';
      setError(message);
      throw err;
    }
  };

  const updateLead = async (leadId: string, updates: Partial<Lead>) => {
    try {
      const { data, error: updateError } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', leadId)
        .select()
        .single();

      if (updateError) throw updateError;

      setLeads(leads.map(l => l.id === leadId ? data : l));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update lead';
      setError(message);
      throw err;
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (deleteError) throw deleteError;

      setLeads(leads.filter(l => l.id !== leadId));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete lead';
      setError(message);
      throw err;
    }
  };

  const logInteraction = async (leadId: string, interactionType: string, description?: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .rpc('log_lead_interaction', {
          p_lead_id: leadId,
          p_user_id: user.id,
          p_interaction_type: interactionType,
          p_description: description,
        });

      if (error) throw error;

      // Reload leads to get updated scores
      await loadLeads();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to log interaction';
      console.error('Error logging interaction:', err);
      throw err;
    }
  };

  const getLeadStats = () => {
    return {
      total: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      qualified: leads.filter(l => l.status === 'qualified').length,
      converted: leads.filter(l => l.status === 'converted').length,
      lost: leads.filter(l => l.status === 'lost').length,
      avgScore: leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + l.lead_score, 0) / leads.length) : 0,
    };
  };

  return {
    leads,
    isLoading,
    error,
    loadLeads,
    createLead,
    updateLead,
    deleteLead,
    logInteraction,
    getLeadStats,
  };
};

