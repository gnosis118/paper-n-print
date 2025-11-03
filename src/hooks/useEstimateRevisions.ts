import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface EstimateRevision {
  id: string;
  estimate_id: string;
  version_number: number;
  title?: string;
  items: any[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  deposit_percentage: number;
  deposit_amount: number;
  notes?: string;
  change_description?: string;
  created_at: string;
}

export const useEstimateRevisions = (estimateId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [revisions, setRevisions] = useState<EstimateRevision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !estimateId) {
      setLoading(false);
      return;
    }

    const fetchRevisions = async () => {
      try {
        const { data, error } = await supabase
          .from('estimate_revisions')
          .select('*')
          .eq('estimate_id', estimateId)
          .order('version_number', { ascending: false });

        if (error) throw error;
        setRevisions(data || []);
      } catch (err) {
        console.error('Error fetching revisions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevisions();

    // Subscribe to changes
    const subscription = supabase
      .channel(`estimate-revisions-${estimateId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'estimate_revisions', filter: `estimate_id=eq.${estimateId}` },
        () => {
          fetchRevisions();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, estimateId]);

  const createRevision = async (
    estimateData: any,
    changeDescription: string
  ) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Get the next version number
      const maxVersion = revisions.length > 0 
        ? Math.max(...revisions.map(r => r.version_number))
        : 0;

      const { data, error } = await supabase
        .from('estimate_revisions')
        .insert({
          estimate_id: estimateId,
          user_id: user.id,
          version_number: maxVersion + 1,
          title: estimateData.title,
          items: estimateData.items,
          subtotal: estimateData.subtotal,
          tax_rate: estimateData.tax_rate,
          tax_amount: estimateData.tax_amount,
          total: estimateData.total,
          deposit_percentage: estimateData.deposit_percentage,
          deposit_amount: estimateData.deposit_amount,
          notes: estimateData.notes,
          change_description: changeDescription,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Revision ${maxVersion + 1} created`,
      });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create revision';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const restoreRevision = async (revision: EstimateRevision) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Update the estimate with the revision data
      const { error: updateError } = await supabase
        .from('estimates')
        .update({
          title: revision.title,
          items: revision.items,
          subtotal: revision.subtotal,
          tax_rate: revision.tax_rate,
          tax_amount: revision.tax_amount,
          total: revision.total,
          deposit_percentage: revision.deposit_percentage,
          deposit_amount: revision.deposit_amount,
          notes: revision.notes,
        })
        .eq('id', estimateId)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Create a new revision documenting the restore
      await createRevision(revision, `Restored from version ${revision.version_number}`);

      toast({
        title: 'Success',
        description: `Restored to version ${revision.version_number}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to restore revision';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  return {
    revisions,
    loading,
    createRevision,
    restoreRevision,
  };
};

