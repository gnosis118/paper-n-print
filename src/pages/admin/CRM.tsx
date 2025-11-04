import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import PageLayout from '@/components/PageLayout';
import AdminNav from '@/components/AdminNav';
import { Loader, Search, Trash2, Mail, Phone, Building2, TrendingUp } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_type: string | null;
  status: string;
  lead_score: number;
  source: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-purple-100 text-purple-800',
  converted: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

const SERVICE_LABELS: Record<string, string> = {
  hair_styling: '💇 Hair Styling',
  nail_services: '💅 Nail Services',
  lash_services: '✨ Lash Services',
  massage_therapy: '💆 Massage Therapy',
  tattoo_services: '🎨 Tattoo Services',
  esthetics: '💄 Esthetics',
};

export const CRM: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  useEffect(() => {
    if (user) {
      loadLeads();
    }
  }, [user]);

  const loadLeads = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Error loading leads:', err);
      toast({
        title: 'Error',
        description: 'Failed to load leads',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;

      setLeads(leads.filter(l => l.id !== leadId));
      toast({
        title: 'Success',
        description: 'Lead deleted',
      });
    } catch (err) {
      console.error('Error deleting lead:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete lead',
        variant: 'destructive',
      });
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) throw error;

      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      toast({
        title: 'Success',
        description: `Lead status updated to ${newStatus}`,
      });
    } catch (err) {
      console.error('Error updating lead:', err);
      toast({
        title: 'Error',
        description: 'Failed to update lead',
        variant: 'destructive',
      });
    }
  };

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesService = serviceFilter === 'all' || lead.service_type === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate stats
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length,
  };

  return (
    <PageLayout
      title="CRM - Lead Management | ProInvoice"
      description="Manage and track your leads with our simple CRM interface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Admin Navigation */}
        <AdminNav />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Lead Management</h1>
          <p className="text-muted-foreground">Track and manage your leads from one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
                <p className="text-sm text-muted-foreground">New</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{stats.qualified}</p>
                <p className="text-sm text-muted-foreground">Qualified</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{stats.converted}</p>
                <p className="text-sm text-muted-foreground">Converted</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>

              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {Object.entries(SERVICE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={loadLeads} disabled={isLoading}>
                {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Refresh'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Leads List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-muted-foreground mb-4">No leads found</p>
              <p className="text-sm text-muted-foreground">Start capturing leads from your homepage</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map(lead => (
              <Card key={lead.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Lead Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{lead.name}</h3>
                        <Badge className={STATUS_COLORS[lead.status] || 'bg-gray-100'}>
                          {lead.status}
                        </Badge>
                        {lead.service_type && (
                          <Badge variant="outline">{SERVICE_LABELS[lead.service_type] || lead.service_type}</Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {lead.phone}
                          </div>
                        )}
                        {lead.company && (
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {lead.company}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Score: {lead.lead_score}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Select value={lead.status} onValueChange={(value) => handleStatusChange(lead.id, value)}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="lost">Lost</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CRM;

