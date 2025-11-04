/**
 * Performance optimization utilities for ProInvoice
 */

/**
 * Debounce function to limit function calls
 * Useful for search, resize, scroll events
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function calls
 * Useful for scroll, resize events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImages = () => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support IntersectionObserver
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img: any) => {
      img.src = img.dataset.src;
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
};

/**
 * Measure performance metrics
 */
export const measurePerformance = (label: string) => {
  const startTime = performance.now();

  return {
    end: () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`${label}: ${duration.toFixed(2)}ms`);
      return duration;
    },
  };
};

/**
 * Request idle callback polyfill
 */
export const requestIdleCallback =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (callback: IdleRequestCallback) => {
        const start = Date.now();
        return setTimeout(() => {
          callback({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
          } as IdleDeadline);
        }, 1);
      };

/**
 * Cancel idle callback polyfill
 */
export const cancelIdleCallback =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? window.cancelIdleCallback
    : (id: number) => clearTimeout(id);

/**
 * Prefetch resource
 */
export const prefetchResource = (url: string, type: 'script' | 'style' | 'image' = 'script') => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  if (type === 'script') link.as = 'script';
  if (type === 'style') link.as = 'style';
  if (type === 'image') link.as = 'image';
  document.head.appendChild(link);
};

/**
 * Preload resource
 */
export const preloadResource = (url: string, type: 'script' | 'style' | 'image' = 'script') => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  if (type === 'script') link.as = 'script';
  if (type === 'style') link.as = 'style';
  if (type === 'image') link.as = 'image';
  document.head.appendChild(link);
};

/**
 * Get Core Web Vitals
 */
export const getCoreWebVitals = () => {
  if (typeof window === 'undefined') return null;

  const vitals = {
    fcp: 0, // First Contentful Paint
    lcp: 0, // Largest Contentful Paint
    cls: 0, // Cumulative Layout Shift
    fid: 0, // First Input Delay
    ttfb: 0, // Time to First Byte
  };

  // Get FCP
  const paintEntries = performance.getEntriesByType('paint');
  const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
  if (fcpEntry) vitals.fcp = fcpEntry.startTime;

  // Get LCP
  const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
  if (lcpEntries.length > 0) {
    vitals.lcp = lcpEntries[lcpEntries.length - 1].startTime;
  }

  // Get TTFB
  const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigationTiming) {
    vitals.ttfb = navigationTiming.responseStart - navigationTiming.fetchStart;
  }

  return vitals;
};

/**
 * Report performance metrics to analytics
 */
export const reportPerformanceMetrics = (callback: (metrics: any) => void) => {
  if (typeof window === 'undefined') return;

  // Report on page load
  if (document.readyState === 'complete') {
    callback(getCoreWebVitals());
  } else {
    window.addEventListener('load', () => {
      callback(getCoreWebVitals());
    });
  }
};

/**
 * Optimize bundle size by lazy loading routes
 */
export const lazyLoadRoute = (importFunc: () => Promise<any>) => {
  return React.lazy(importFunc);
};

