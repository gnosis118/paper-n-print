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

  trackInvoiceSent: (method: string = 'email') => {
    analytics.trackEvent('invoice_sent', {
      send_method: method,
      event_category: 'invoice',
      event_label: 'send'
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

  // Track activation funnel events
  trackFirstInvoiceCreated: (timeToCreate?: number) => {
    analytics.trackEvent('first_invoice_created', {
      time_to_create: timeToCreate || 0,
      event_category: 'activation',
      event_label: 'milestone_1'
    });
  },

  trackFirstPDFDownloaded: (timeSinceCreation?: number) => {
    analytics.trackEvent('first_pdf_downloaded', {
      time_since_creation: timeSinceCreation || 0,
      event_category: 'activation',
      event_label: 'milestone_2'
    });
  },

  trackFirstInvoiceSent: (timeSinceDownload?: number) => {
    analytics.trackEvent('first_invoice_sent', {
      time_since_download: timeSinceDownload || 0,
      event_category: 'activation',
      event_label: 'milestone_3'
    });
  },

  trackFirstPaymentReceived: (amount?: number, timeSinceSent?: number) => {
    analytics.trackEvent('first_payment_received', {
      amount: amount || 0,
      time_since_sent: timeSinceSent || 0,
      event_category: 'activation',
      event_label: 'milestone_4'
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