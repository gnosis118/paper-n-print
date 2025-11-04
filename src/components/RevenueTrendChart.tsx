import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp } from 'lucide-react';

interface TrendData {
  date: string;
  revenue: number;
  estimates: number;
  deposits: number;
}

export const RevenueTrendChart: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchTrendData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Calculate date range
        const now = new Date();
        let startDate = new Date();

        if (timeRange === 'week') {
          startDate.setDate(now.getDate() - 7);
        } else if (timeRange === 'month') {
          startDate.setMonth(now.getMonth() - 1);
        } else {
          startDate.setMonth(now.getMonth() - 3);
        }

        // Fetch estimates
        const { data: estimates, error: estimatesError } = await supabase
          .from('estimates')
          .select('*')
          .eq('user_id', user.id)
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: true });

        if (estimatesError) throw estimatesError;

        // Group by date
        const trendMap = new Map<string, TrendData>();

        if (estimates) {
          estimates.forEach(estimate => {
            const date = new Date(estimate.created_at);
            const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            const existing = trendMap.get(dateKey) || {
              date: dateKey,
              revenue: 0,
              estimates: 0,
              deposits: 0,
            };

            existing.revenue += estimate.total || 0;
            existing.estimates += 1;

            if (estimate.status === 'accepted' || estimate.status === 'invoiced') {
              const depositAmount = estimate.deposit_type === 'percent'
                ? (estimate.total * estimate.deposit_value) / 100
                : estimate.deposit_value;
              existing.deposits += depositAmount;
            }

            trendMap.set(dateKey, existing);
          });
        }

        // Convert to array and sort
        const trendData = Array.from(trendMap.values()).sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });

        setData(trendData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trend data';
        setError(errorMessage);
        console.error('Error fetching revenue trends:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendData();
  }, [user, timeRange]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive text-sm">Failed to load revenue trends: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No data available for this period</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate totals
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalDeposits = data.reduce((sum, d) => sum + d.deposits, 0);
  const totalEstimates = data.reduce((sum, d) => sum + d.estimates, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Revenue Trends
            </CardTitle>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-1">
              {(['week', 'month', 'quarter'] as const).map(range => (
                <Button
                  key={range}
                  size="sm"
                  variant={timeRange === range ? 'default' : 'outline'}
                  onClick={() => setTimeRange(range)}
                  className="text-xs"
                >
                  {range === 'week' ? '7D' : range === 'month' ? '30D' : '90D'}
                </Button>
              ))}
            </div>
            <div className="flex gap-1">
              {(['line', 'bar'] as const).map(type => (
                <Button
                  key={type}
                  size="sm"
                  variant={chartType === type ? 'default' : 'outline'}
                  onClick={() => setChartType(type)}
                  className="text-xs capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-xl font-bold text-blue-600">${totalRevenue.toFixed(0)}</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Deposits Collected</p>
            <p className="text-xl font-bold text-green-600">${totalDeposits.toFixed(0)}</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Estimates</p>
            <p className="text-xl font-bold text-purple-600">{totalEstimates}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `$${Number(value).toFixed(0)}`}
                  contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  name="Total Revenue"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="deposits"
                  stroke="#10b981"
                  name="Deposits"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `$${Number(value).toFixed(0)}`}
                  contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Total Revenue" />
                <Bar dataKey="deposits" fill="#10b981" name="Deposits" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs font-semibold text-amber-900 mb-1">💡 Insight</p>
          <p className="text-xs text-amber-800">
            {totalDeposits > 0
              ? `You've collected ${Math.round((totalDeposits / totalRevenue) * 100)}% of potential revenue as deposits.`
              : 'Start collecting deposits to improve cash flow.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueTrendChart;

