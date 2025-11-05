/**
 * SEO Automation Service
 * Handles dynamic sitemap generation, metadata updates, and Google reindex triggers
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate dynamic sitemap XML
 */
export const generateDynamicSitemap = (entries: SitemapEntry[]): string => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://proinvoice.app';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${baseUrl}${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
};

/**
 * Trigger Google Search Console reindex
 */
export const triggerGoogleReindex = async (url: string) => {
  try {
    const apiKey = process.env.REACT_APP_GOOGLE_SEARCH_CONSOLE_API_KEY;
    if (!apiKey) {
      console.warn('Google Search Console API key not configured');
      return { success: false, message: 'API key not configured' };
    }

    const response = await fetch(
      `https://www.googleapis.com/indexing/v3/urlNotifications:publish?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          type: 'URL_UPDATED',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    return { success: true, message: `Reindex triggered for ${url}` };
  } catch (error) {
    console.error('Error triggering Google reindex:', error);
    return { success: false, error };
  }
};

/**
 * Update page metadata dynamically
 */
export const updatePageMetadata = (metadata: PageMetadata) => {
  // Update title
  document.title = metadata.title;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, isProperty: boolean = false) => {
    let tag = document.querySelector(
      isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
    ) as HTMLMetaElement;

    if (!tag) {
      tag = document.createElement('meta');
      if (isProperty) {
        tag.setAttribute('property', name);
      } else {
        tag.setAttribute('name', name);
      }
      document.head.appendChild(tag);
    }

    tag.content = content;
  };

  updateMetaTag('description', metadata.description);

  if (metadata.keywords) {
    updateMetaTag('keywords', metadata.keywords.join(', '));
  }

  if (metadata.canonical) {
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = metadata.canonical;
  }

  // Update Open Graph tags
  if (metadata.ogImage) {
    updateMetaTag('og:image', metadata.ogImage, true);
  }

  if (metadata.ogType) {
    updateMetaTag('og:type', metadata.ogType, true);
  }

  updateMetaTag('og:title', metadata.title, true);
  updateMetaTag('og:description', metadata.description, true);
};

/**
 * Generate metadata for contractor landing pages
 */
export const generateContractorPageMetadata = (
  trade: string,
  businessName?: string
): PageMetadata => {
  const tradeNames: Record<string, string> = {
    electrician: 'Electrician',
    plumber: 'Plumber',
    roofer: 'Roofer',
    landscaper: 'Landscaper',
    handyman: 'Handyman',
  };

  const tradeName = tradeNames[trade] || trade;
  const title = `${tradeName} Invoice & Estimate Software | ProInvoice`;
  const description = `Professional invoicing and estimate software designed for ${tradeName}s. Automate billing, track payments, and manage projects with ease.`;

  return {
    title,
    description,
    keywords: [
      `${tradeName} invoice software`,
      `${tradeName} estimate template`,
      `${tradeName} billing`,
      'contractor invoicing',
      'project management',
    ],
    canonical: `https://proinvoice.app/trades/${trade}`,
    ogType: 'website',
  };
};

/**
 * Rebuild and submit sitemap to search engines
 */
export const rebuildAndSubmitSitemap = async (entries: SitemapEntry[]) => {
  try {
    const sitemap = generateDynamicSitemap(entries);

    // Save sitemap (would be done via API in production)
    console.log('Sitemap generated:', sitemap.length, 'bytes');

    // Submit to Google Search Console
    const googleResult = await triggerGoogleReindex('https://proinvoice.app/sitemap.xml');

    // Submit to Bing Webmaster Tools
    const bingResult = await fetch(
      `http://www.bing.com/ping?sitemap=https://proinvoice.app/sitemap.xml`
    );

    return {
      success: true,
      google: googleResult,
      bing: bingResult.ok,
      sitemapSize: sitemap.length,
    };
  } catch (error) {
    console.error('Error rebuilding sitemap:', error);
    return { success: false, error };
  }
};

/**
 * Auto-update metadata when new pages are generated
 */
export const autoUpdateMetadata = async (
  pageType: string,
  pageData: Record<string, any>
) => {
  try {
    let metadata: PageMetadata;

    switch (pageType) {
      case 'contractor_landing':
        metadata = generateContractorPageMetadata(pageData.trade, pageData.businessName);
        break;

      case 'estimate_template':
        metadata = {
          title: `${pageData.title} Estimate Template | ProInvoice`,
          description: `Free ${pageData.title} estimate template. Customize and send professional estimates in minutes.`,
          keywords: [`${pageData.title} estimate`, 'estimate template', 'invoice software'],
          canonical: `https://proinvoice.app/templates/${pageData.slug}`,
        };
        break;

      case 'invoice_template':
        metadata = {
          title: `${pageData.title} Invoice Template | ProInvoice`,
          description: `Professional ${pageData.title} invoice template. Create and send invoices instantly.`,
          keywords: [`${pageData.title} invoice`, 'invoice template', 'billing software'],
          canonical: `https://proinvoice.app/invoice-templates/${pageData.slug}`,
        };
        break;

      default:
        return { success: false, message: 'Unknown page type' };
    }

    updatePageMetadata(metadata);

    // Trigger reindex for new page
    if (metadata.canonical) {
      await triggerGoogleReindex(metadata.canonical);
    }

    return { success: true, metadata };
  } catch (error) {
    console.error('Error auto-updating metadata:', error);
    return { success: false, error };
  }
};

