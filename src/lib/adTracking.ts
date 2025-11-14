declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GADS_SEND_TO = import.meta.env.VITE_GADS_SEND_TO; // e.g., AW-XXXX/label

export const adTracking = {
  lead: (params?: { value?: number; currency?: string }) => {
    try {
      if (typeof window.gtag === 'function' && GADS_SEND_TO) {
        window.gtag('event', 'conversion', {
          send_to: GADS_SEND_TO,
          ...(params?.value !== undefined ? { value: params.value } : {}),
          currency: params?.currency || 'USD',
        });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }
    } catch (e) {
      // swallow
    }
  },
  purchase: (params?: { value?: number; currency?: string }) => {
    try {
      if (typeof window.gtag === 'function' && GADS_SEND_TO) {
        window.gtag('event', 'conversion', {
          send_to: GADS_SEND_TO,
          ...(params?.value !== undefined ? { value: params.value } : {}),
          currency: params?.currency || 'USD',
        });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Purchase', {
          value: params?.value || 0,
          currency: params?.currency || 'USD',
        });
      }
    } catch (e) {
      // swallow
    }
  },
  signup: () => {
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'CompleteRegistration');
      }
    } catch {}
  }
};

