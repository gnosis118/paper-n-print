/**
 * Performance Optimization Service
 * Monitors and optimizes Core Web Vitals
 */

/**
 * Core Web Vitals Metrics
 */
export interface CoreWebVitals {
  lcp?: number; // Largest Contentful Paint (ms)
  fid?: number; // First Input Delay (ms)
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte (ms)
  fcp?: number; // First Contentful Paint (ms)
}

/**
 * Measure Core Web Vitals
 */
export const measureCoreWebVitals = (): CoreWebVitals => {
  const vitals: CoreWebVitals = {};

  // Measure LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP measurement not supported');
    }

    // Measure FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          vitals.fid = entry.processingDuration;
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID measurement not supported');
    }

    // Measure CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            vitals.cls = clsValue;
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS measurement not supported');
    }

    // Measure FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            vitals.fcp = entry.startTime;
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('FCP measurement not supported');
    }
  }

  // Measure TTFB (Time to First Byte)
  if ('performance' in window && 'timing' in window.performance) {
    const timing = window.performance.timing;
    vitals.ttfb = timing.responseStart - timing.navigationStart;
  }

  return vitals;
};

/**
 * Report Core Web Vitals
 */
export const reportCoreWebVitals = (vitals: CoreWebVitals): void => {
  const report = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    vitals,
    thresholds: {
      lcp: { good: 2500, needsImprovement: 4000 },
      fid: { good: 100, needsImprovement: 300 },
      cls: { good: 0.1, needsImprovement: 0.25 },
      ttfb: { good: 600, needsImprovement: 1800 },
      fcp: { good: 1800, needsImprovement: 3000 },
    },
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Core Web Vitals Report:', report);
  }

  // Send to analytics service
  if (window.navigator.sendBeacon) {
    window.navigator.sendBeacon(
      '/api/analytics/vitals',
      JSON.stringify(report)
    );
  }
};

/**
 * Optimize image loading
 */
export const optimizeImageLoading = (): void => {
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Prefetch critical resources
 */
export const prefetchCriticalResources = (urls: string[]): void => {
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = (urls: string[]): void => {
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    if (url.endsWith('.woff2')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (url.endsWith('.js')) {
      link.as = 'script';
    } else if (url.endsWith('.css')) {
      link.as = 'style';
    }
    document.head.appendChild(link);
  });
};

/**
 * Enable resource hints
 */
export const enableResourceHints = (): void => {
  // DNS prefetch
  const dnsPrefetchDomains = [
    'https://cdn.jsdelivr.net',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  dnsPrefetchDomains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });

  // Preconnect
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  preconnectDomains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

/**
 * Monitor performance metrics
 */
export const monitorPerformance = (): void => {
  // Measure Core Web Vitals
  const vitals = measureCoreWebVitals();

  // Report metrics
  reportCoreWebVitals(vitals);

  // Optimize images
  optimizeImageLoading();

  // Enable resource hints
  enableResourceHints();

  // Preload critical resources
  preloadCriticalResources([
    '/fonts/inter-var.woff2',
  ]);
};

/**
 * Get performance score
 */
export const getPerformanceScore = (vitals: CoreWebVitals): number => {
  let score = 100;

  // LCP scoring
  if (vitals.lcp) {
    if (vitals.lcp > 4000) score -= 50;
    else if (vitals.lcp > 2500) score -= 25;
  }

  // FID scoring
  if (vitals.fid) {
    if (vitals.fid > 300) score -= 50;
    else if (vitals.fid > 100) score -= 25;
  }

  // CLS scoring
  if (vitals.cls) {
    if (vitals.cls > 0.25) score -= 50;
    else if (vitals.cls > 0.1) score -= 25;
  }

  // TTFB scoring
  if (vitals.ttfb) {
    if (vitals.ttfb > 1800) score -= 25;
    else if (vitals.ttfb > 600) score -= 10;
  }

  return Math.max(0, score);
};

