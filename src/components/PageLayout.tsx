import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { SEOHeaders } from './SEOHeaders';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title = 'ProInvoice - Create & Get Paid in 2 Clicks | Free Invoice Generator',
  description = 'Create professional invoices in 30 seconds with embedded Stripe checkout. Get paid 3x faster with smart dunning and auto-reminders. Free plan: 3 invoices/month.',
  canonical,
  noIndex = false,
}) => {
  const fullTitle = title.includes('ProInvoice') || title.includes('InvoicePro') ? title : `${title} | ProInvoice`;
  
  // Track page views
  useGoogleAnalytics();

  return (
    <>
      <SEOHeaders 
        title={fullTitle}
        description={description}
        canonical={canonical}
        noIndex={noIndex}
        ogImage="https://www.proinvoice.app/og-image.webp"
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;