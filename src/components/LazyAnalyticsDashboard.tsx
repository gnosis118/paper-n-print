import React, { Suspense, lazy } from 'react';
import { useLazyLoad } from '@/hooks/usePerformanceOptimization';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load chart components
const RevenueTrendChart = lazy(() =>
  import('@/components/RevenueTrendChart').then((m) => ({
    default: m.RevenueTrendChart,
  }))
);

const EstimateAnalyticsDashboard = lazy(() =>
  import('@/components/EstimateAnalyticsDashboard').then((m) => ({
    default: m.EstimateAnalyticsDashboard,
  }))
);

const SmartSuggestionsPanel = lazy(() =>
  import('@/components/SmartSuggestionsPanel').then((m) => ({
    default: m.SmartSuggestionsPanel,
  }))
);

/**
 * Lazy-loaded analytics dashboard with performance optimization
 */
export const LazyAnalyticsDashboard: React.FC = () => {
  const { ref: revenueRef, isVisible: revenueVisible } = useLazyLoad(0.2);
  const { ref: estimateRef, isVisible: estimateVisible } = useLazyLoad(0.2);
  const { ref: suggestionsRef, isVisible: suggestionsVisible } = useLazyLoad(0.2);

  return (
    <div className="space-y-6">
      {/* Revenue Trend Chart */}
      <div ref={revenueRef}>
        {revenueVisible ? (
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueTrendChart />
          </Suspense>
        ) : (
          <ChartSkeleton />
        )}
      </div>

      {/* Estimate Analytics */}
      <div ref={estimateRef}>
        {estimateVisible ? (
          <Suspense fallback={<ChartSkeleton />}>
            <EstimateAnalyticsDashboard />
          </Suspense>
        ) : (
          <ChartSkeleton />
        )}
      </div>

      {/* Smart Suggestions */}
      <div ref={suggestionsRef}>
        {suggestionsVisible ? (
          <Suspense fallback={<SuggestionsSkeleton />}>
            <SmartSuggestionsPanel />
          </Suspense>
        ) : (
          <SuggestionsSkeleton />
        )}
      </div>
    </div>
  );
};

/**
 * Skeleton loader for charts
 */
const ChartSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow p-6 space-y-4">
    <Skeleton className="h-8 w-48" />
    <div className="space-y-2">
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

/**
 * Skeleton loader for suggestions
 */
const SuggestionsSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow p-6 space-y-4">
    <Skeleton className="h-8 w-48" />
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  </div>
);

export default LazyAnalyticsDashboard;

