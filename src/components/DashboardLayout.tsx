import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import DashboardNav from './DashboardNav';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { SEOHeaders } from './SEOHeaders';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = 'Dashboard - ProInvoice',
  description = 'Manage your invoices, estimates, clients, and business settings with ProInvoice.',
  canonical,
  noIndex = false,
}) => {
  const fullTitle = title.includes('ProInvoice') ? title : `${title} | ProInvoice`;
  
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
        <DashboardNav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DashboardLayout;

