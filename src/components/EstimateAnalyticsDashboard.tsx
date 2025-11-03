import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, FileText, CheckCircle, Clock, Target } from 'lucide-react';
import { useEstimateAnalytics } from '@/hooks/useEstimateAnalytics';
import { Skeleton } from '@/components/ui/skeleton';

export const EstimateAnalyticsDashboard: React.FC = () => {
  const { analytics, loading, error } = useEstimateAnalytics();

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">Failed to load analytics: {error}</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-yellow-100 text-yellow-800';
      case 'invoiced':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Estimates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estimates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalEstimates}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.sentEstimates} pending payment
            </p>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {analytics.invoicedEstimates} of {analytics.sentEstimates} converted
            </p>
          </CardContent>
        </Card>

        {/* Total Estimate Value */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalEstimateValue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              Across all estimates
            </p>
          </CardContent>
        </Card>

        {/* Deposits Collected */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deposits Collected</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalDepositCollected.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              From accepted estimates
            </p>
          </CardContent>
        </Card>

        {/* Avg Time to Accept */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Time to Accept</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageTimeToAccept}</div>
            <p className="text-xs text-muted-foreground">
              Days to payment
            </p>
          </CardContent>
        </Card>

        {/* Accepted Estimates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.acceptedEstimates}</div>
            <p className="text-xs text-muted-foreground">
              Deposits received
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Estimate Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-sm font-medium">Sent (Pending Payment)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{analytics.estimatesByStatus.sent}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round((analytics.estimatesByStatus.sent / analytics.totalEstimates) * 100) || 0}%)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="text-sm font-medium">Accepted (Deposit Paid)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{analytics.estimatesByStatus.accepted}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round((analytics.estimatesByStatus.accepted / analytics.totalEstimates) * 100) || 0}%)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Invoiced (Work Started)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{analytics.estimatesByStatus.invoiced}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round((analytics.estimatesByStatus.invoiced / analytics.totalEstimates) * 100) || 0}%)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Estimates */}
      {analytics.recentEstimates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentEstimates.map((estimate) => (
                <div key={estimate.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">Estimate #{estimate.number}</p>
                    <p className="text-sm text-muted-foreground">{estimate.client_name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">${estimate.total.toFixed(2)}</p>
                      <Badge className={getStatusColor(estimate.status)}>
                        {estimate.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

