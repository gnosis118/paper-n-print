import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface EstimateAnalytics {
  totalEstimates: number;
  sentEstimates: number;
  acceptedEstimates: number;
  invoicedEstimates: number;
  conversionRate: number; // Percentage of sent estimates that became invoices
  averageTimeToAccept: number; // Days
  totalEstimateValue: number;
  totalDepositCollected: number;
  estimatesByStatus: {
    sent: number;
    accepted: number;
    invoiced: number;
  };
  recentEstimates: Array<{
    id: string;
    number: string;
    client_name: string;
    total: number;
    status: string;
    created_at: string;
  }>;
}

export const useEstimateAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<EstimateAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all estimates for the user
        const { data: estimates, error: estimatesError } = await supabase
          .from('estimates')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (estimatesError) throw estimatesError;

        if (!estimates || estimates.length === 0) {
          setAnalytics({
            totalEstimates: 0,
            sentEstimates: 0,
            acceptedEstimates: 0,
            invoicedEstimates: 0,
            conversionRate: 0,
            averageTimeToAccept: 0,
            totalEstimateValue: 0,
            totalDepositCollected: 0,
            estimatesByStatus: { sent: 0, accepted: 0, invoiced: 0 },
            recentEstimates: [],
          });
          setLoading(false);
          return;
        }

        // Calculate analytics
        const totalEstimates = estimates.length;
        const sentEstimates = estimates.filter(e => e.status === 'sent').length;
        const acceptedEstimates = estimates.filter(e => e.status === 'accepted').length;
        const invoicedEstimates = estimates.filter(e => e.status === 'invoiced').length;

        // Conversion rate: invoiced / sent
        const conversionRate = sentEstimates > 0 
          ? Math.round((invoicedEstimates / sentEstimates) * 100) 
          : 0;

        // Average time to accept (for accepted/invoiced estimates)
        const acceptedOrInvoiced = estimates.filter(e => 
          e.status === 'accepted' || e.status === 'invoiced'
        );
        
        let averageTimeToAccept = 0;
        if (acceptedOrInvoiced.length > 0) {
          const totalDays = acceptedOrInvoiced.reduce((sum, estimate) => {
            const createdDate = new Date(estimate.created_at);
            const acceptedDate = new Date(estimate.updated_at);
            const days = Math.floor((acceptedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
            return sum + days;
          }, 0);
          averageTimeToAccept = Math.round(totalDays / acceptedOrInvoiced.length);
        }

        // Total values
        const totalEstimateValue = estimates.reduce((sum, e) => sum + (e.total || 0), 0);
        const totalDepositCollected = estimates
          .filter(e => e.status === 'accepted' || e.status === 'invoiced')
          .reduce((sum, e) => sum + (e.deposit_value || 0), 0);

        // Recent estimates (last 5)
        const recentEstimates = estimates.slice(0, 5).map(e => ({
          id: e.id,
          number: e.number,
          client_name: e.title || 'Untitled',
          total: e.total,
          status: e.status,
          created_at: e.created_at,
        }));

        setAnalytics({
          totalEstimates,
          sentEstimates,
          acceptedEstimates,
          invoicedEstimates,
          conversionRate,
          averageTimeToAccept,
          totalEstimateValue,
          totalDepositCollected,
          estimatesByStatus: {
            sent: sentEstimates,
            accepted: acceptedEstimates,
            invoiced: invoicedEstimates,
          },
          recentEstimates,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch analytics';
        setError(errorMessage);
        console.error('Error fetching estimate analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();

    // Subscribe to changes
    const subscription = supabase
      .channel('estimates-analytics')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'estimates', filter: `user_id=eq.${user.id}` },
        () => {
          fetchAnalytics();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { analytics, loading, error };
};

