import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface ActivationAnalyticsProps {
  eventType: 'page_view' | 'invoice_created' | 'pdf_downloaded' | 'invoice_sent' | 'payment_received';
  metadata?: Record<string, any>;
}

export const ActivationAnalytics = ({ eventType, metadata }: ActivationAnalyticsProps) => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const trackEvent = () => {
      switch (eventType) {
        case 'page_view':
          analytics.trackPageView(location.pathname, document.title);
          break;
        case 'invoice_created':
          analytics.trackInvoiceCreated(metadata?.templateType);
          // Track activation funnel step
          analytics.trackEvent('activation_step_1_invoice_created', {
            user_id: user?.id,
            template_type: metadata?.templateType || 'default',
            time_on_page: metadata?.timeOnPage || 0,
            event_category: 'activation'
          });
          break;
        case 'pdf_downloaded':
          analytics.trackInvoiceDownloaded('pdf');
          // Track activation funnel step
          analytics.trackEvent('activation_step_2_pdf_downloaded', {
            user_id: user?.id,
            invoice_id: metadata?.invoiceId,
            time_since_creation: metadata?.timeSinceCreation || 0,
            event_category: 'activation'
          });
          break;
        case 'invoice_sent':
          analytics.trackEvent('activation_step_3_invoice_sent', {
            user_id: user?.id,
            invoice_id: metadata?.invoiceId,
            send_method: metadata?.sendMethod || 'email',
            time_since_download: metadata?.timeSinceDownload || 0,
            event_category: 'activation'
          });
          break;
        case 'payment_received':
          analytics.trackPaymentSuccess(metadata?.amount, metadata?.currency);
          // Track activation funnel completion
          analytics.trackEvent('activation_step_4_payment_received', {
            user_id: user?.id,
            invoice_id: metadata?.invoiceId,
            amount: metadata?.amount,
            currency: metadata?.currency || 'USD',
            payment_method: metadata?.paymentMethod,
            time_since_sent: metadata?.timeSinceSent || 0,
            event_category: 'activation'
          });
          break;
      }
    };

    trackEvent();
  }, [eventType, metadata, user, location]);

  return null; // This component doesn't render anything
};

// Hook for easier usage
export const useActivationTracking = () => {
  const trackActivationStep = (step: ActivationAnalyticsProps['eventType'], metadata?: Record<string, any>) => {
    // Create a temporary component to trigger the tracking
    const TrackingComponent = () => <ActivationAnalytics eventType={step} metadata={metadata} />;
    return TrackingComponent;
  };

  return { trackActivationStep };
};