import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Client {
  id: string;
  user_id: string;
  name: string;
  company?: string | null;
  email: string;
  address?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientWithStats extends Client {
  invoice_count?: number;
  estimate_count?: number;
  total_revenue?: number;
}

export function useClients() {
  const [clients, setClients] = useState<ClientWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch all clients for the current user
  const fetchClients = async () => {
    if (!user) {
      setClients([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Fetch clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (clientsError) throw clientsError;

      // Fetch invoice counts and totals for each client
      const clientsWithStats = await Promise.all(
        (clientsData || []).map(async (client) => {
          // Get invoice count and total revenue
          const { data: invoices } = await supabase
            .from('invoices')
            .select('total')
            .eq('client_id', client.id);

          // Get estimate count
          const { data: estimates } = await supabase
            .from('estimates')
            .select('id')
            .eq('client_id', client.id);

          const invoice_count = invoices?.length || 0;
          const estimate_count = estimates?.length || 0;
          const total_revenue = invoices?.reduce((sum, inv) => sum + Number(inv.total), 0) || 0;

          return {
            ...client,
            invoice_count,
            estimate_count,
            total_revenue,
          };
        })
      );

      setClients(clientsWithStats);
    } catch (error: any) {
      console.error('Error fetching clients:', error);
      toast({
        title: 'Error',
        description: 'Failed to load clients',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Create a new client
  const createClient = async (clientData: Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Client | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('clients')
        .insert({
          user_id: user.id,
          name: clientData.name,
          company: clientData.company,
          email: clientData.email,
          address: clientData.address,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Client created successfully',
      });

      // Refresh the client list
      await fetchClients();

      return data;
    } catch (error: any) {
      console.error('Error creating client:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create client',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Update an existing client
  const updateClient = async (id: string, updates: Partial<Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Client updated successfully',
      });

      // Refresh the client list
      await fetchClients();

      return true;
    } catch (error: any) {
      console.error('Error updating client:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update client',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Delete a client
  const deleteClient = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Client deleted successfully',
      });

      // Refresh the client list
      await fetchClients();

      return true;
    } catch (error: any) {
      console.error('Error deleting client:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete client',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Get a single client by ID
  const getClient = async (id: string): Promise<Client | null> => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      return data;
    } catch (error: any) {
      console.error('Error fetching client:', error);
      return null;
    }
  };

  // Get client history (invoices and estimates)
  const getClientHistory = async (clientId: string) => {
    try {
      const [invoicesResult, estimatesResult] = await Promise.all([
        supabase
          .from('invoices')
          .select('*')
          .eq('client_id', clientId)
          .order('created_at', { ascending: false }),
        supabase
          .from('estimates')
          .select('*')
          .eq('client_id', clientId)
          .order('created_at', { ascending: false }),
      ]);

      return {
        invoices: invoicesResult.data || [],
        estimates: estimatesResult.data || [],
      };
    } catch (error: any) {
      console.error('Error fetching client history:', error);
      return {
        invoices: [],
        estimates: [],
      };
    }
  };

  useEffect(() => {
    fetchClients();
  }, [user]);

  return {
    clients,
    loading,
    createClient,
    updateClient,
    deleteClient,
    getClient,
    getClientHistory,
    refreshClients: fetchClients,
  };
}

