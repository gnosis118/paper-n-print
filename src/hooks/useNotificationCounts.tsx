import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface NotificationCounts {
  invoices: number;
  estimates: number;
  notifications: number;
}

export const useNotificationCounts = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<NotificationCounts>({
    invoices: 0,
    estimates: 0,
    notifications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCounts({ invoices: 0, estimates: 0, notifications: 0 });
      setLoading(false);
      return;
    }

    const fetchCounts = async () => {
      try {
        // Get pending/draft invoices count
        const { count: invoicesCount } = await supabase
          .from('invoices')
          .select('*', { count: 'exact', head: true })
          .in('status', ['draft', 'pending']);

        // Get draft/sent estimates count
        const { count: estimatesCount } = await supabase
          .from('estimates')
          .select('*', { count: 'exact', head: true })
          .in('status', ['draft', 'sent']);

        // Get unread notifications count
        const { count: notificationsCount } = await supabase
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('read', false);

        setCounts({
          invoices: invoicesCount || 0,
          estimates: estimatesCount || 0,
          notifications: notificationsCount || 0,
        });
      } catch (error) {
        console.error('Error fetching notification counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();

    // Set up real-time subscriptions
    const invoicesChannel = supabase
      .channel('invoices-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'invoices' },
        () => fetchCounts()
      )
      .subscribe();

    const estimatesChannel = supabase
      .channel('estimates-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'estimates' },
        () => fetchCounts()
      )
      .subscribe();

    const notificationsChannel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        () => fetchCounts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(invoicesChannel);
      supabase.removeChannel(estimatesChannel);
      supabase.removeChannel(notificationsChannel);
    };
  }, [user]);

  return { counts, loading };
};
