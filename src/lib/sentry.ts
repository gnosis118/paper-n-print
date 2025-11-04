/**
 * Sentry error tracking and monitoring integration
 * Provides error tracking, performance monitoring, and user feedback
 */

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

/**
 * Initialize Sentry for error tracking and performance monitoring
 */
export const initializeSentry = () => {
  const isDevelopment = import.meta.env.DEV;
  const sentryDSN = import.meta.env.VITE_SENTRY_DSN;

  if (!sentryDSN && !isDevelopment) {
    console.warn('Sentry DSN not configured');
    return;
  }

  Sentry.init({
    dsn: sentryDSN,
    environment: isDevelopment ? 'development' : 'production',
    integrations: [
      new BrowserTracing({
        // Set sampling rate for performance monitoring
        tracingOrigins: ['localhost', /^\//],
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          window.history
        ),
      }),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: isDevelopment ? 1.0 : 0.1,
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    // Release tracking
    release: import.meta.env.VITE_APP_VERSION || '1.0.0',
    // Ignore certain errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      // Random plugins/extensions
      'chrome-extension://',
      'moz-extension://',
      // Network errors
      'NetworkError',
      'Network request failed',
      // User cancelled
      'AbortError',
    ],
  });
};

/**
 * Capture an exception with context
 */
export const captureException = (
  error: Error,
  context?: Record<string, any>
) => {
  if (context) {
    Sentry.captureException(error, {
      contexts: {
        custom: context,
      },
    });
  } else {
    Sentry.captureException(error);
  }
};

/**
 * Capture a message
 */
export const captureMessage = (
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info'
) => {
  Sentry.captureMessage(message, level);
};

/**
 * Set user context for error tracking
 */
export const setUserContext = (userId: string, email?: string, name?: string) => {
  Sentry.setUser({
    id: userId,
    email,
    username: name,
  });
};

/**
 * Clear user context
 */
export const clearUserContext = () => {
  Sentry.setUser(null);
};

/**
 * Add breadcrumb for tracking user actions
 */
export const addBreadcrumb = (
  message: string,
  category: string,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info',
  data?: Record<string, any>
) => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
  });
};

/**
 * Start a transaction for performance monitoring
 */
export const startTransaction = (name: string, op: string) => {
  return Sentry.startTransaction({
    name,
    op,
  });
};

/**
 * Capture a performance metric
 */
export const captureMetric = (
  name: string,
  value: number,
  unit: string = 'millisecond'
) => {
  Sentry.captureMessage(`Metric: ${name} = ${value}${unit}`, 'info');
};

/**
 * Error handler for async operations
 */
export const handleAsyncError = async <T>(
  fn: () => Promise<T>,
  context?: Record<string, any>
): Promise<T | null> => {
  try {
    return await fn();
  } catch (error) {
    captureException(error as Error, context);
    throw error;
  }
};

/**
 * Wrap a function with error tracking
 */
export const withErrorTracking = <T extends (...args: any[]) => any>(
  fn: T,
  context?: Record<string, any>
): T => {
  return ((...args: any[]) => {
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        return result.catch((error) => {
          captureException(error, context);
          throw error;
        });
      }
      return result;
    } catch (error) {
      captureException(error as Error, context);
      throw error;
    }
  }) as T;
};

/**
 * Log API call for debugging
 */
export const logAPICall = (
  method: string,
  url: string,
  status: number,
  duration: number
) => {
  addBreadcrumb(
    `${method} ${url} - ${status}`,
    'api',
    status >= 400 ? 'warning' : 'info',
    { duration }
  );
};

/**
 * Log user action
 */
export const logUserAction = (action: string, details?: Record<string, any>) => {
  addBreadcrumb(action, 'user-action', 'info', details);
};

/**
 * Report Web Vitals to Sentry
 */
export const reportWebVitals = (metric: {
  name: string;
  value: number;
  rating?: string;
}) => {
  captureMetric(metric.name, metric.value, 'millisecond');
};

