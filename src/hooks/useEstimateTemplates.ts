import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface EstimateTemplate {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  items: Array<{
    description: string;
    qty: number;
    rate: number;
  }>;
  tax_rate: number;
  deposit_percentage: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useEstimateTemplates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<EstimateTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchTemplates = async () => {
      try {
        // Note: estimate_templates table requires migration to be applied
        // See MIGRATION_REQUIRED.md for setup instructions
        setTemplates([]);
      } catch (err) {
        console.error('Error fetching templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();

    return () => {
      // Cleanup
    };
  }, [user]);

  const saveTemplate = async (template: Omit<EstimateTemplate, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      toast({
        title: 'Info',
        description: 'Template saving requires database migration. See MIGRATION_REQUIRED.md',
      });
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save template';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateTemplate = async (id: string, updates: Partial<EstimateTemplate>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      toast({
        title: 'Info',
        description: 'Template update requires database migration. See MIGRATION_REQUIRED.md',
      });
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update template';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteTemplate = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      toast({
        title: 'Info',
        description: 'Template deletion requires database migration. See MIGRATION_REQUIRED.md',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete template';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  return {
    templates,
    loading,
    saveTemplate,
    updateTemplate,
    deleteTemplate,
  };
};

