import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
  }
}

export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Ensure gtag is available
    if (typeof window.gtag === 'function') {
      // Track page view
      window.gtag('config', 'G-0XY23WYE9B', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  // Event tracking functions
  const trackEvent = (eventName: string, parameters?: any) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }
  };

  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-0XY23WYE9B', {
        page_path: pagePath,
        page_title: pageTitle || document.title,
      });
    }
  };

  return { trackEvent, trackPageView };
};