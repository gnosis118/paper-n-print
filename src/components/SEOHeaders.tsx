import { Helmet } from 'react-helmet-async';

interface SEOHeadersProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
}

export const SEOHeaders = ({
  title = "InvoicePro - Create & Get Paid in 2 Clicks | Free Invoice Generator",
  description = "Create professional invoices in 30 seconds with embedded Stripe checkout. Get paid 3x faster with smart dunning and auto-reminders. Free plan: 3 invoices/month.",
  canonical,
  ogImage = "https://paper-n-print.lovable.app/og-image.png",
  ogType = "website",
  structuredData,
  noIndex = false
}: SEOHeadersProps) => {
  const currentUrl = canonical || window.location.href;
  const siteName = "InvoicePro";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="InvoicePro - Professional Invoice Generator" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="InvoicePro - Professional Invoice Generator" />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="InvoicePro" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3B82F6" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Default Structured Data for SoftwareApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "InvoicePro",
          "description": "Professional invoice generator with embedded payments",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free plan with 3 invoices per month"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "10000"
          },
          "creator": {
            "@type": "Organization",
            "name": "InvoicePro",
            "url": currentUrl
          }
        })}
      </script>
    </Helmet>
  );
};