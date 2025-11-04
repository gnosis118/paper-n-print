import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface SmartSuggestion {
  id: string;
  type: 'upsell' | 'timing' | 'follow_up' | 'optimization';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  impact: string; // e.g., "Could increase revenue by $500"
  estimateId?: string;
}

export const useSmartSuggestions = () => {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all estimates
        const { data: estimates, error: estimatesError } = await supabase
          .from('estimates')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (estimatesError) throw estimatesError;

        const newSuggestions: SmartSuggestion[] = [];

        if (estimates && estimates.length > 0) {
          // Analyze estimates for suggestions
          const now = new Date();
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

          // 1. Follow-up on pending estimates (older than 7 days)
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          const pendingOld = estimates.filter(e => 
            e.status === 'sent' && 
            new Date(e.created_at) < sevenDaysAgo
          );

          if (pendingOld.length > 0) {
            newSuggestions.push({
              id: 'follow-up-pending',
              type: 'follow_up',
              title: `Follow up on ${pendingOld.length} pending estimate${pendingOld.length > 1 ? 's' : ''}`,
              description: `You have ${pendingOld.length} estimate${pendingOld.length > 1 ? 's' : ''} waiting for response for over a week.`,
              action: 'Send reminder',
              priority: 'high',
              impact: `Could recover $${pendingOld.reduce((sum, e) => sum + (e.total || 0), 0).toFixed(0)} in potential revenue`,
              estimateId: pendingOld[0].id,
            });
          }

          // 2. Upsell opportunity: Clients with multiple estimates
          const clientEstimates = new Map<string, number>();
          estimates.forEach(e => {
            const key = e.title || 'unknown';
            clientEstimates.set(key, (clientEstimates.get(key) || 0) + 1);
          });

          const repeatClients = Array.from(clientEstimates.entries())
            .filter(([_, count]) => count >= 2)
            .sort((a, b) => b[1] - a[1]);

          if (repeatClients.length > 0) {
            const topClient = repeatClients[0];
            newSuggestions.push({
              id: 'upsell-repeat-client',
              type: 'upsell',
              title: `Upsell opportunity: ${topClient[0]}`,
              description: `This client has requested ${topClient[1]} estimates. Consider offering a package deal or loyalty discount.`,
              action: 'Create package offer',
              priority: 'medium',
              impact: 'Could increase average deal size by 15-25%',
            });
          }

          // 3. Conversion optimization: Low conversion rate
          const sentEstimates = estimates.filter(e => e.status === 'sent').length;
          const acceptedEstimates = estimates.filter(e => 
            e.status === 'accepted' || e.status === 'invoiced'
          ).length;

          if (sentEstimates > 5) {
            const conversionRate = (acceptedEstimates / sentEstimates) * 100;
            if (conversionRate < 50) {
              newSuggestions.push({
                id: 'low-conversion-rate',
                type: 'optimization',
                title: 'Improve estimate conversion rate',
                description: `Your conversion rate is ${Math.round(conversionRate)}%. Industry average is 60-70%.`,
                action: 'Review estimate templates',
                priority: 'high',
                impact: `Improving to 60% could add $${Math.round((sentEstimates * 0.1 * estimates.reduce((sum, e) => sum + (e.total || 0), 0) / sentEstimates))}/month`,
              });
            }
          }

          // 4. Timing optimization: Best days to send estimates
          const estimatesByDayOfWeek = new Map<number, number>();
          const acceptedByDayOfWeek = new Map<number, number>();

          estimates.forEach(e => {
            const dayOfWeek = new Date(e.created_at).getDay();
            estimatesByDayOfWeek.set(dayOfWeek, (estimatesByDayOfWeek.get(dayOfWeek) || 0) + 1);

            if (e.status === 'accepted' || e.status === 'invoiced') {
              acceptedByDayOfWeek.set(dayOfWeek, (acceptedByDayOfWeek.get(dayOfWeek) || 0) + 1);
            }
          });

          let bestDay = 0;
          let bestRate = 0;
          estimatesByDayOfWeek.forEach((count, day) => {
            const rate = (acceptedByDayOfWeek.get(day) || 0) / count;
            if (rate > bestRate) {
              bestRate = rate;
              bestDay = day;
            }
          });

          const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          if (bestRate > 0 && bestDay !== 0) {
            newSuggestions.push({
              id: 'best-send-day',
              type: 'timing',
              title: `${dayNames[bestDay]} is your best day to send estimates`,
              description: `Estimates sent on ${dayNames[bestDay]} have a ${Math.round(bestRate * 100)}% acceptance rate.`,
              action: 'Schedule estimates for this day',
              priority: 'low',
              impact: 'Could improve conversion by 5-10%',
            });
          }

          // 5. Revenue growth opportunity
          const thisMonthEstimates = estimates.filter(e => 
            new Date(e.created_at) >= thirtyDaysAgo
          );
          const thisMonthValue = thisMonthEstimates.reduce((sum, e) => sum + (e.total || 0), 0);
          const avgEstimateValue = thisMonthValue / Math.max(thisMonthEstimates.length, 1);

          if (thisMonthEstimates.length > 0 && thisMonthEstimates.length < 10) {
            newSuggestions.push({
              id: 'increase-volume',
              type: 'optimization',
              title: 'Increase estimate volume',
              description: `You've created ${thisMonthEstimates.length} estimates this month. Aim for 15-20 to maximize revenue.`,
              action: 'Review marketing strategy',
              priority: 'medium',
              impact: `Could add $${Math.round(avgEstimateValue * 10)}/month in potential revenue`,
            });
          }
        }

        setSuggestions(newSuggestions);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch suggestions';
        setError(errorMessage);
        console.error('Error fetching smart suggestions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();

    // Subscribe to changes
    const subscription = supabase
      .channel('estimates-suggestions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'estimates', filter: `user_id=eq.${user.id}` },
        () => {
          fetchSuggestions();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { suggestions, loading, error };
};

