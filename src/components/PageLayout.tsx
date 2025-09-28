import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title = 'Professional Invoice Generator - Create Professional Invoices',
  description = 'Create professional invoices with our easy-to-use invoice generator. Professional templates, automated calculations, and seamless payment integration.',
  canonical,
  noIndex = false,
}) => {
  const fullTitle = title.includes('Invoice Generator') ? title : `${title} | Invoice Generator`;

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Invoice Generator" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        
        {/* Canonical URL */}
        {canonical && <link rel="canonical" href={canonical} />}
        
        {/* No Index */}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        
        {/* Additional SEO */}
        <meta name="author" content="Gavin Clay" />
        <meta name="copyright" content="Invoice Generator" />
        <meta name="language" content="en-US" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
};

export default PageLayout;