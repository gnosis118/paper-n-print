import React, { lazy, Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load heavy components to improve initial load time
const FeatureGrid = lazy(() => import('./FeatureGrid'));
const TestimonialGrid = lazy(() => import('./TestimonialGrid'));
const ComparisonTable = lazy(() => import('./ComparisonTable'));

const IndexPageSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-64 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
    <Skeleton className="h-96 w-full" />
  </div>
);

export const LazyFeatureGrid = () => (
  <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Skeleton className="h-48" />
    <Skeleton className="h-48" />
    <Skeleton className="h-48" />
  </div>}>
    <FeatureGrid />
  </Suspense>
);

export const LazyTestimonialGrid = () => (
  <Suspense fallback={<div className="grid md:grid-cols-3 gap-6">
    <Skeleton className="h-64" />
    <Skeleton className="h-64" />
    <Skeleton className="h-64" />
  </div>}>
    <TestimonialGrid />
  </Suspense>
);

export const LazyComparisonTable = () => (
  <Suspense fallback={<Skeleton className="h-96 w-full" />}>
    <ComparisonTable />
  </Suspense>
);