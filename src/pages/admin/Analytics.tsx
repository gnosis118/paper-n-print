import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';
import PageLayout from '@/components/PageLayout';
import AdminNav from '@/components/AdminNav';
import {
  TrendingUp, TrendingDown, DollarSign, FileText, Mail, Users,
  Zap, Download, RefreshCw, Target, CheckCircle, AlertCircle
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Analytics: React.FC = () => {
  const { metrics, isLoading, error, refetch } = useAnalytics();

  if (error) {
    return (
      <PageLayout title="Analytics | ProInvoice" description="View your business analytics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error loading analytics: {error}</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value / 100);
  };

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    description, 
    trend, 
    isCurrency = false 
  }: any) => (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-24" /> : (
                isCurrency ? formatCurrency(value) : value
              )}
            </p>
            {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
        {trend !== undefined && (
          <div className="mt-4 flex items-center gap-2">
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={trend >= 0 ? 'text-green-600' : 'text-red-600'}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <PageLayout title="Analytics | ProInvoice" description="View your business analytics and metrics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Admin Navigation */}
        <AdminNav />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your business performance and growth</p>
          </div>
          <Button 
            onClick={refetch} 
            variant="outline" 
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Motivational Message */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {metrics?.totalRevenue ? '💰 You\'re crushing it!' : '🚀 Ready to grow?'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {metrics?.totalRevenue 
                    ? `You've collected ${formatCurrency(metrics.totalRevenue)} in total revenue. Keep up the momentum!`
                    : 'Start creating estimates and capturing leads to see your metrics grow here.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Revenue
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Total Revenue"
              value={metrics?.totalRevenue || 0}
              icon={DollarSign}
              isCurrency
              description="All-time revenue"
            />
            <MetricCard
              title="This Month"
              value={metrics?.revenueThisMonth || 0}
              icon={TrendingUp}
              isCurrency
              description="Current month revenue"
            />
            <MetricCard
              title="Growth"
              value={metrics?.revenueGrowth || 0}
              icon={TrendingUp}
              description="Month-over-month growth"
              trend={metrics?.revenueGrowth}
            />
          </div>
        </div>

        {/* Estimates Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Estimates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Total Estimates"
              value={metrics?.totalEstimates || 0}
              icon={FileText}
              description="All estimates created"
            />
            <MetricCard
              title="Conversion Rate"
              value={metrics?.estimateConversionRate || 0}
              icon={Target}
              description="Estimates → Invoices"
            />
            <MetricCard
              title="This Month"
              value={metrics?.estimatesCreatedThisMonth || 0}
              icon={TrendingUp}
              description="Estimates created this month"
            />
            <MetricCard
              title="Total Value"
              value={metrics?.totalEstimateValue || 0}
              icon={DollarSign}
              isCurrency
              description="All estimate totals"
            />
          </div>
        </div>

        {/* Payments Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Payments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Total Payments"
              value={metrics?.totalPayments || 0}
              icon={CheckCircle}
              description="Payments received"
            />
            <MetricCard
              title="Success Rate"
              value={metrics?.paymentSuccessRate || 0}
              icon={CheckCircle}
              description="Successful payments"
            />
            <MetricCard
              title="Avg Payment"
              value={metrics?.averagePaymentAmount || 0}
              icon={DollarSign}
              isCurrency
              description="Average payment amount"
            />
          </div>
        </div>

        {/* Leads Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Leads
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Total Leads"
              value={metrics?.totalLeads || 0}
              icon={Users}
              description="All leads captured"
            />
            <MetricCard
              title="Conversion Rate"
              value={metrics?.leadConversionRate || 0}
              icon={Target}
              description="Leads → Converted"
            />
            <MetricCard
              title="Avg Lead Score"
              value={metrics?.averageLeadScore || 0}
              icon={TrendingUp}
              description="Average engagement score"
            />
            <MetricCard
              title="This Month"
              value={metrics?.leadsCreatedThisMonth || 0}
              icon={TrendingUp}
              description="Leads captured this month"
            />
          </div>
        </div>

        {/* Email & Reminders Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Communication
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Emails Sent"
              value={metrics?.totalEmailsSent || 0}
              icon={Mail}
              description="Total emails sent"
            />
            <MetricCard
              title="Email Success Rate"
              value={metrics?.emailSuccessRate || 0}
              icon={CheckCircle}
              description="Successfully delivered"
            />
            <MetricCard
              title="Reminders Sent"
              value={metrics?.totalReminders || 0}
              icon={AlertCircle}
              description="Payment reminders sent"
            />
          </div>
        </div>

        {/* AI Usage Section */}
        {metrics?.aiUsageCount > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              AI Usage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard
                title="AI Cost This Month"
                value={metrics?.aiCostThisMonth || 0}
                icon={Zap}
                isCurrency
                description="AI personalization costs"
              />
              <MetricCard
                title="Total AI Uses"
                value={metrics?.aiUsageCount || 0}
                icon={Zap}
                description="AI features used"
              />
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Analytics;

