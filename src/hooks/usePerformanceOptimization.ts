import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook for lazy loading components and images
 */
export const useLazyLoad = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

/**
 * Hook for pagination
 */
export interface PaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

export const usePagination = <T>(
  items: T[],
  options: PaginationOptions = {}
) => {
  const { initialPage = 1, pageSize = 10 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = useCallback((page: number) => {
    const pageNum = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNum);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

/**
 * Hook for infinite scroll pagination
 */
export const useInfiniteScroll = <T>(
  fetchMore: () => Promise<T[]>,
  initialItems: T[] = []
) => {
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          try {
            const newItems = await fetchMore();
            if (newItems.length === 0) {
              setHasMore(false);
            } else {
              setItems((prev) => [...prev, ...newItems]);
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load more');
          } finally {
            setIsLoading(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchMore, hasMore, isLoading]);

  return {
    items,
    isLoading,
    hasMore,
    error,
    observerTarget,
    reset: () => {
      setItems(initialItems);
      setHasMore(true);
      setError(null);
    },
  };
};

/**
 * Hook for debouncing values
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for throttling values
 */
export const useThrottle = <T>(value: T, interval: number = 500): T => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const handler = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(handler);
    }
  }, [value, interval]);

  return throttledValue;
};

/**
 * Hook for measuring performance
 */
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    fcp: 0, // First Contentful Paint
    lcp: 0, // Largest Contentful Paint
    cls: 0, // Cumulative Layout Shift
    fid: 0, // First Input Delay
  });

  useEffect(() => {
    // Measure Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // First Contentful Paint
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
        if (fcp) {
          setMetrics((prev) => ({ ...prev, fcp: fcp.startTime }));
        }

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let cls = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              cls += (entry as any).value;
            }
          }
          setMetrics((prev) => ({ ...prev, cls }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        return () => {
          lcpObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.error('Error measuring performance metrics:', error);
      }
    }
  }, []);

  return metrics;
};

