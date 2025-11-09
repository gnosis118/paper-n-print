import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, FileText, Users, TrendingUp, Clock, CheckCircle } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Analytics() {
  const { user } = useAuth();

  // Fetch invoice statistics
  const { data: invoiceStats } = useQuery({
    queryKey: ['invoice-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('invoices')
        .select('status, total, created_at')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      const total = data?.reduce((sum, inv) => sum + Number(inv.total || 0), 0) || 0;
      const paid = data?.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + Number(inv.total || 0), 0) || 0;
      const pending = data?.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + Number(inv.total || 0), 0) || 0;
      const overdue = data?.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + Number(inv.total || 0), 0) || 0;
      
      // Revenue by month
      const revenueByMonth = data?.reduce((acc: any, inv) => {
        const month = new Date(inv.created_at).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (!acc[month]) acc[month] = 0;
        acc[month] += Number(inv.total || 0);
        return acc;
      }, {});
      
      const revenueData = Object.entries(revenueByMonth || {}).map(([month, revenue]) => ({
        month,
        revenue: Number(revenue)
      }));
      
      // Status distribution
      const statusData = [
        { name: 'Paid', value: data?.filter(inv => inv.status === 'paid').length || 0 },
        { name: 'Pending', value: data?.filter(inv => inv.status === 'pending').length || 0 },
        { name: 'Overdue', value: data?.filter(inv => inv.status === 'overdue').length || 0 },
        { name: 'Draft', value: data?.filter(inv => inv.status === 'draft').length || 0 },
      ].filter(item => item.value > 0);
      
      return {
        total,
        paid,
        pending,
        overdue,
        count: data?.length || 0,
        paidCount: data?.filter(inv => inv.status === 'paid').length || 0,
        pendingCount: data?.filter(inv => inv.status === 'pending').length || 0,
        revenueData,
        statusData
      };
    },
    enabled: !!user,
  });

  // Fetch client statistics
  const { data: clientStats } = useQuery({
    queryKey: ['client-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // Get all invoices with client info
      const { data: invoices, error } = await supabase
        .from('invoices')
        .select('total, client_id, business_profile_id')
        .eq('user_id', user.id)
        .eq('status', 'paid');
      
      if (error) throw error;
      
      // Group by client
      const clientRevenue: Record<string, number> = {};
      invoices?.forEach(inv => {
        const key = inv.client_id || inv.business_profile_id || 'Unknown';
        if (!clientRevenue[key]) clientRevenue[key] = 0;
        clientRevenue[key] += Number(inv.total || 0);
      });
      
      const topClients = Object.entries(clientRevenue)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([client, revenue], index) => ({
          name: `Client ${index + 1}`,
          revenue: Number(revenue)
        }));
      
      return {
        totalClients: Object.keys(clientRevenue).length,
        topClients
      };
    },
    enabled: !!user,
  });

  return (
    <PageLayout
      title="Analytics - ProInvoice"
      description="View your revenue trends, payment statistics, and client insights"
    >
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track your business performance and revenue trends
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(invoiceStats?.total || 0).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${(invoiceStats?.paid || 0).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{invoiceStats?.paidCount || 0} invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">${(invoiceStats?.pending || 0).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{invoiceStats?.pendingCount || 0} invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientStats?.totalClients || 0}</div>
              <p className="text-xs text-muted-foreground">Active clients</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              {invoiceStats?.revenueData && invoiceStats.revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={invoiceStats.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No revenue data yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Invoice Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Status</CardTitle>
              <CardDescription>Distribution by status</CardDescription>
            </CardHeader>
            <CardContent>
              {invoiceStats?.statusData && invoiceStats.statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={invoiceStats.statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {invoiceStats.statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No invoice data yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Clients */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Top Clients by Revenue</CardTitle>
              <CardDescription>Your highest paying clients</CardDescription>
            </CardHeader>
            <CardContent>
              {clientStats?.topClients && clientStats.topClients.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={clientStats.topClients}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    <Legend />
                    <Bar 
                      dataKey="revenue" 
                      fill="hsl(var(--primary))"
                      name="Revenue"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No client data yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
