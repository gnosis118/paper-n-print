import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type ContractorIndustry = 'electrician' | 'plumber' | 'roofer' | 'landscaper' | 'handyman';

export interface ContractorTemplate {
  id: string;
  user_id: string;
  industry: ContractorIndustry;
  name: string;
  description?: string;
  items: any[];
  tax_rate: number;
  deposit_percentage: number;
  milestone_structure?: any;
  notes?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export const CONTRACTOR_INDUSTRIES = [
  { value: 'electrician', label: '⚡ Electrician', icon: '⚡' },
  { value: 'plumber', label: '🔧 Plumber', icon: '🔧' },
  { value: 'roofer', label: '🏠 Roofer', icon: '🏠' },
  { value: 'landscaper', label: '🌳 Landscaper', icon: '🌳' },
  { value: 'handyman', label: '🔨 Handyman', icon: '🔨' },
];

export const DEFAULT_CONTRACTOR_TEMPLATES: Record<ContractorIndustry, Partial<ContractorTemplate>> = {
  electrician: {
    name: 'Electrical Work',
    items: [
      { description: 'Service Call', quantity: 1, rate: 75 },
      { description: 'Labor (per hour)', quantity: 1, rate: 85 },
      { description: 'Materials', quantity: 1, rate: 0 },
    ],
    tax_rate: 8,
    deposit_percentage: 50,
  },
  plumber: {
    name: 'Plumbing Services',
    items: [
      { description: 'Service Call', quantity: 1, rate: 65 },
      { description: 'Labor (per hour)', quantity: 1, rate: 75 },
      { description: 'Materials & Parts', quantity: 1, rate: 0 },
    ],
    tax_rate: 8,
    deposit_percentage: 40,
  },
  roofer: {
    name: 'Roofing Project',
    items: [
      { description: 'Inspection & Estimate', quantity: 1, rate: 150 },
      { description: 'Labor (per square)', quantity: 1, rate: 300 },
      { description: 'Materials', quantity: 1, rate: 0 },
    ],
    tax_rate: 8,
    deposit_percentage: 50,
  },
  landscaper: {
    name: 'Landscaping Services',
    items: [
      { description: 'Design Consultation', quantity: 1, rate: 100 },
      { description: 'Labor (per hour)', quantity: 1, rate: 50 },
      { description: 'Plants & Materials', quantity: 1, rate: 0 },
    ],
    tax_rate: 8,
    deposit_percentage: 30,
  },
  handyman: {
    name: 'Handyman Services',
    items: [
      { description: 'Service Call', quantity: 1, rate: 60 },
      { description: 'Labor (per hour)', quantity: 1, rate: 65 },
      { description: 'Materials', quantity: 1, rate: 0 },
    ],
    tax_rate: 8,
    deposit_percentage: 25,
  },
};

export const useContractorTemplates = () => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<ContractorTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load templates
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadTemplates();
  }, [user?.id]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('contractor_templates')
        .select('*')
        .eq('user_id', user!.id)
        .order('industry', { ascending: true });

      if (err) throw err;
      setTemplates(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load templates';
      setError(message);
      console.error('Error loading contractor templates:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = async (template: Omit<ContractorTemplate, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('contractor_templates')
        .insert({
          ...template,
          user_id: user!.id,
        })
        .select()
        .single();

      if (err) throw err;
      setTemplates([...templates, data]);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save template';
      setError(message);
      throw err;
    }
  };

  const updateTemplate = async (id: string, updates: Partial<ContractorTemplate>) => {
    try {
      const { data, error: err } = await supabase
        .from('contractor_templates')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user!.id)
        .select()
        .single();

      if (err) throw err;
      setTemplates(templates.map(t => t.id === id ? data : t));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update template';
      setError(message);
      throw err;
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const { error: err } = await supabase
        .from('contractor_templates')
        .delete()
        .eq('id', id)
        .eq('user_id', user!.id);

      if (err) throw err;
      setTemplates(templates.filter(t => t.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete template';
      setError(message);
      throw err;
    }
  };

  const getTemplatesByIndustry = (industry: ContractorIndustry) => {
    return templates.filter(t => t.industry === industry);
  };

  return {
    templates,
    loading,
    error,
    loadTemplates,
    saveTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplatesByIndustry,
  };
};

