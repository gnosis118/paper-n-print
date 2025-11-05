/**
 * Observability Service
 * Integrates Sentry, Honeycomb, and performance monitoring
 */

import * as Sentry from '@sentry/react';

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

export interface HoneycombEvent {
  name: string;
  duration_ms: number;
  status: 'success' | 'error';
  userId?: string;
  metadata?: Record<string, any>;
}

/**
 * Initialize Sentry for error tracking
 */
export const initializeSentry = () => {
  if (typeof window !== 'undefined') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
      integrations: [
        new Sentry.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
};

/**
 * Send event to Honeycomb
 */
export const sendHoneycombEvent = async (event: HoneycombEvent) => {
  try {
    const honeycombKey = process.env.REACT_APP_HONEYCOMB_API_KEY;
    if (!honeycombKey) {
      console.warn('Honeycomb API key not configured');
      return;
    }

    const payload = {
      ...event,
      timestamp: new Date().toISOString(),
      service_name: 'proinvoice-frontend',
      environment: process.env.NODE_ENV,
    };

    await fetch('https://api.honeycomb.io/1/events/proinvoice', {
      method: 'POST',
      headers: {
        'X-Honeycomb-Team': honeycombKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Error sending Honeycomb event:', error);
  }
};

/**
 * Track performance metric
 */
export const trackPerformanceMetric = (metric: PerformanceMetric) => {
  try {
    // Send to Sentry
    Sentry.captureMessage(`Performance: ${metric.name} = ${metric.value}${metric.unit}`, 'info');

    // Send to Honeycomb
    sendHoneycombEvent({
      name: `perf_${metric.name}`,
      duration_ms: metric.value,
      status: 'success',
      metadata: {
        unit: metric.unit,
      },
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${metric.name}: ${metric.value}${metric.unit}`);
    }
  } catch (error) {
    console.error('Error tracking performance metric:', error);
  }
};

/**
 * Track API call performance
 */
export const trackAPICall = async <T>(
  name: string,
  fn: () => Promise<T>,
  userId?: string
): Promise<T> => {
  const startTime = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - startTime;

    await sendHoneycombEvent({
      name: `api_${name}`,
      duration_ms: duration,
      status: 'success',
      userId,
      metadata: {
        endpoint: name,
      },
    });

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;

    await sendHoneycombEvent({
      name: `api_${name}`,
      duration_ms: duration,
      status: 'error',
      userId,
      metadata: {
        endpoint: name,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    Sentry.captureException(error, {
      tags: {
        api_call: name,
      },
    });

    throw error;
  }
};

/**
 * Track database query performance
 */
export const trackDatabaseQuery = async <T>(
  queryName: string,
  fn: () => Promise<T>,
  userId?: string
): Promise<T> => {
  const startTime = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - startTime;

    // Only log slow queries (> 500ms)
    if (duration > 500) {
      await sendHoneycombEvent({
        name: `db_query_slow`,
        duration_ms: duration,
        status: 'success',
        userId,
        metadata: {
          query: queryName,
        },
      });
    }

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;

    await sendHoneycombEvent({
      name: `db_query_error`,
      duration_ms: duration,
      status: 'error',
      userId,
      metadata: {
        query: queryName,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    throw error;
  }
};

/**
 * Track Web Vitals
 */
export const trackWebVitals = (metric: any) => {
  const { name, value, rating } = metric;

  trackPerformanceMetric({
    name: `web_vital_${name}`,
    value: Math.round(value),
    unit: name === 'CLS' ? '' : 'ms',
  });

  // Alert on poor metrics
  if (rating === 'poor') {
    Sentry.captureMessage(`Poor Web Vital: ${name} = ${value}`, 'warning');
  }
};

/**
 * Create performance transaction
 */
export const createTransaction = (name: string) => {
  return Sentry.startTransaction({
    name,
    op: 'transaction',
  });
};

/**
 * Report error to Sentry with context
 */
export const reportError = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    contexts: {
      custom: context,
    },
  });
};

/**
 * Set user context for error tracking
 */
export const setUserContext = (userId: string, email?: string) => {
  Sentry.setUser({
    id: userId,
    email,
  });
};

/**
 * Clear user context
 */
export const clearUserContext = () => {
  Sentry.setUser(null);
};

