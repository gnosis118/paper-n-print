// Google Analytics event tracking utilities

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
  }
}

export const analytics = {
  // Track custom events
  trackEvent: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }
  },

  // Track invoice actions
  trackInvoiceCreated: (templateType?: string) => {
    analytics.trackEvent('invoice_created', {
      template_type: templateType || 'default',
      event_category: 'invoice',
      event_label: 'create'
    });
  },

  trackInvoiceDownloaded: (format: string = 'pdf') => {
    analytics.trackEvent('invoice_downloaded', {
      download_format: format,
      event_category: 'invoice',
      event_label: 'download'
    });
  },

  trackInvoiceSaved: () => {
    analytics.trackEvent('invoice_saved', {
      event_category: 'invoice',
      event_label: 'save'
    });
  },

  // Track user interactions
  trackButtonClick: (buttonName: string, location?: string) => {
    analytics.trackEvent('button_click', {
      button_name: buttonName,
      click_location: location || 'unknown',
      event_category: 'engagement'
    });
  },

  trackPageView: (pagePath: string, pageTitle?: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-0XY23WYE9B', {
        page_path: pagePath,
        page_title: pageTitle || document.title,
      });
    }
  },

  // Track conversion events
  trackSignUp: (method?: string) => {
    analytics.trackEvent('sign_up', {
      method: method || 'email',
      event_category: 'conversion'
    });
  },

  trackSubscription: (planType?: string) => {
    analytics.trackEvent('subscribe', {
      plan_type: planType || 'unknown',
      event_category: 'conversion',
      value: 1
    });
  },

  // Track payment events
  trackPaymentAttempt: (amount?: number, currency?: string) => {
    analytics.trackEvent('payment_attempt', {
      currency: currency || 'USD',
      value: amount || 0,
      event_category: 'payment'
    });
  },

  trackPaymentSuccess: (amount?: number, currency?: string) => {
    analytics.trackEvent('purchase', {
      currency: currency || 'USD',
      value: amount || 0,
      event_category: 'payment'
    });
  },

  trackPaymentFailed: (errorCode?: string) => {
    analytics.trackEvent('payment_failed', {
      error_code: errorCode || 'unknown',
      event_category: 'payment'
    });
  }
};