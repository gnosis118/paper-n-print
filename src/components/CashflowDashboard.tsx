/**
 * Cashflow Dashboard Component
 * Displays contractor cashflow metrics with motivational messaging
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getCashflowMetrics, CashflowMetrics } from '@/lib/cashflowDashboardService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertCircle, TrendingUp, DollarSign, Clock } from 'lucide-react';

export const CashflowDashboard: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<CashflowMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadMetrics = async () => {
      try {
        setLoading(true);
        const data = await getCashflowMetrics(user.id);
        setMetrics(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load metrics';
        setError(message);
        console.error('Error loading cashflow metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cashflow metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-lg font-semibold text-blue-900">{metrics.motivationalMessage}</p>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Collected This Month */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Collected This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-green-600">
                  ${metrics.totalCollectedThisMonth.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        {/* Pending Deposits */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-600">
                  ${metrics.pendingDeposits.toFixed(2)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        {/* Overdue Payments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-3xl font-bold ${metrics.overduePayments > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                  ${metrics.overduePayments.toFixed(2)}
                </p>
              </div>
              <AlertCircle className={`h-8 w-8 ${metrics.overduePayments > 0 ? 'text-red-500' : 'text-gray-300'} opacity-20`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>6-Month Cashflow Trend</CardTitle>
          <CardDescription>Collected vs Pending payments over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="collected"
                stroke="#10b981"
                name="Collected"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#3b82f6"
                name="Pending"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Best Performing Services */}
      {metrics.bestPerformingServices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Best Performing Services</CardTitle>
            <CardDescription>Revenue by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics.bestPerformingServices}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Service Summary Table */}
      {metrics.bestPerformingServices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Service Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold">Service</th>
                    <th className="text-right py-2 px-4 font-semibold">Revenue</th>
                    <th className="text-right py-2 px-4 font-semibold">Count</th>
                    <th className="text-right py-2 px-4 font-semibold">Avg Value</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.bestPerformingServices.map((service, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{service.service}</td>
                      <td className="text-right py-2 px-4 font-semibold">
                        ${service.revenue.toFixed(2)}
                      </td>
                      <td className="text-right py-2 px-4">{service.count}</td>
                      <td className="text-right py-2 px-4">
                        ${(service.revenue / service.count).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CashflowDashboard;

