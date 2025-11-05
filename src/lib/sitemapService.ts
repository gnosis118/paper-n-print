/**
 * Sitemap Generation Service
 * Generates dynamic XML sitemap for SEO
 */

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Define all static pages
const STATIC_PAGES: SitemapEntry[] = [
  // Main pages
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/pricing', changefreq: 'monthly', priority: 0.9 },
  { url: '/get-started', changefreq: 'monthly', priority: 0.9 },
  { url: '/about', changefreq: 'yearly', priority: 0.7 },
  { url: '/contact', changefreq: 'yearly', priority: 0.7 },

  // Trade pages
  { url: '/trades', changefreq: 'monthly', priority: 0.9 },
  { url: '/hvac-contractors', changefreq: 'monthly', priority: 0.8 },
  { url: '/general-contractors', changefreq: 'monthly', priority: 0.8 },
  { url: '/plumbers', changefreq: 'monthly', priority: 0.8 },
  { url: '/electricians', changefreq: 'monthly', priority: 0.8 },
  { url: '/roofers', changefreq: 'monthly', priority: 0.8 },
  { url: '/painters', changefreq: 'monthly', priority: 0.8 },
  { url: '/landscapers', changefreq: 'monthly', priority: 0.8 },

  // Feature pages
  { url: '/features/milestone-payments', changefreq: 'monthly', priority: 0.8 },
  { url: '/features/change-order-management', changefreq: 'monthly', priority: 0.8 },
  { url: '/features/deposit-collection', changefreq: 'monthly', priority: 0.8 },
  { url: '/features/progress-billing', changefreq: 'monthly', priority: 0.8 },

  // Guide pages
  { url: '/guides/protecting-cashflow', changefreq: 'monthly', priority: 0.8 },
  { url: '/guides/handling-change-orders', changefreq: 'monthly', priority: 0.8 },
  { url: '/guides/multi-day-projects', changefreq: 'monthly', priority: 0.8 },

  // Comparison pages
  { url: '/compare/wave-vs-proinvoice', changefreq: 'monthly', priority: 0.8 },
  { url: '/compare/invoice-simple-vs-proinvoice', changefreq: 'monthly', priority: 0.8 },

  // Utility pages
  { url: '/why-estimates-matter', changefreq: 'monthly', priority: 0.7 },
  { url: '/deposit-collection-guide', changefreq: 'monthly', priority: 0.7 },
  { url: '/payment-speed-calculator', changefreq: 'monthly', priority: 0.7 },

  // Invoice templates
  { url: '/invoice-templates', changefreq: 'monthly', priority: 0.7 },
  { url: '/invoice-template/construction', changefreq: 'monthly', priority: 0.6 },
  { url: '/invoice-template/contractor', changefreq: 'monthly', priority: 0.6 },
  { url: '/invoice-template/plumber', changefreq: 'monthly', priority: 0.6 },
  { url: '/invoice-template/electrician', changefreq: 'monthly', priority: 0.6 },
  { url: '/invoice-template/hvac', changefreq: 'monthly', priority: 0.6 },
  { url: '/invoice-template/roofing', changefreq: 'monthly', priority: 0.6 },
  { url: '/invoice-template/painting', changefreq: 'monthly', priority: 0.6 },
  { url: '/invoice-template/handyman', changefreq: 'monthly', priority: 0.6 },
  { url: '/invoice-template/landscaping', changefreq: 'monthly', priority: 0.6 },
  { url: '/invoice-template/cleaning', changefreq: 'monthly', priority: 0.6 },

  // Estimate templates
  { url: '/estimate-templates', changefreq: 'monthly', priority: 0.7 },
  { url: '/templates/hvac-estimate-template', changefreq: 'monthly', priority: 0.6 },
  { url: '/templates/plumbing-estimate-template', changefreq: 'monthly', priority: 0.6 },
  { url: '/templates/construction-estimate-template', changefreq: 'monthly', priority: 0.6 },
  { url: '/templates/landscaping-estimate-template', changefreq: 'monthly', priority: 0.6 },
  { url: '/templates/roofing-estimate-template', changefreq: 'monthly', priority: 0.6 },
  { url: '/templates/cleaning-estimate-template', changefreq: 'monthly', priority: 0.6 },

  // Documentation
  { url: '/docs', changefreq: 'monthly', priority: 0.7 },
  { url: '/docs/creating-first-invoice', changefreq: 'monthly', priority: 0.6 },
  { url: '/docs/understanding-templates', changefreq: 'monthly', priority: 0.6 },
  { url: '/docs/adding-line-items', changefreq: 'monthly', priority: 0.6 },
  { url: '/docs/customizing-appearance', changefreq: 'monthly', priority: 0.6 },
  { url: '/docs/business-profile', changefreq: 'monthly', priority: 0.6 },
  { url: '/docs/payment-links', changefreq: 'monthly', priority: 0.6 },
  { url: '/docs/adding-clients', changefreq: 'monthly', priority: 0.6 },
  { url: '/docs/faq', changefreq: 'monthly', priority: 0.6 },

  // Legal pages
  { url: '/privacy', changefreq: 'yearly', priority: 0.5 },
  { url: '/terms', changefreq: 'yearly', priority: 0.5 },
  { url: '/cookies', changefreq: 'yearly', priority: 0.5 },
  { url: '/do-not-sell', changefreq: 'yearly', priority: 0.5 },
  { url: '/accessibility', changefreq: 'yearly', priority: 0.5 },
];

/**
 * Generate XML sitemap
 */
export const generateSitemap = (baseUrl: string = 'https://www.proinvoice.app'): string => {
  const entries = STATIC_PAGES.map((entry) => {
    const lastmod = entry.lastmod || new Date().toISOString().split('T')[0];
    return `  <url>
    <loc>${baseUrl}${entry.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq || 'monthly'}</changefreq>
    <priority>${entry.priority || 0.5}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
};

/**
 * Generate robots.txt
 */
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /auth
Disallow: /dashboard
Disallow: /invoice/
Disallow: /estimate/
Disallow: /client/

# Crawl delay
Crawl-delay: 1

# Sitemaps
Sitemap: https://www.proinvoice.app/sitemap.xml
`;
};

/**
 * Get all sitemap entries
 */
export const getSitemapEntries = (): SitemapEntry[] => {
  return STATIC_PAGES;
};

/**
 * Add custom entry to sitemap
 */
export const addSitemapEntry = (entry: SitemapEntry): SitemapEntry[] => {
  // Check if entry already exists
  const exists = STATIC_PAGES.some((e) => e.url === entry.url);
  if (!exists) {
    STATIC_PAGES.push(entry);
  }
  return STATIC_PAGES;
};

/**
 * Remove entry from sitemap
 */
export const removeSitemapEntry = (url: string): SitemapEntry[] => {
  const index = STATIC_PAGES.findIndex((e) => e.url === url);
  if (index > -1) {
    STATIC_PAGES.splice(index, 1);
  }
  return STATIC_PAGES;
};

/**
 * Update entry in sitemap
 */
export const updateSitemapEntry = (url: string, updates: Partial<SitemapEntry>): SitemapEntry[] => {
  const entry = STATIC_PAGES.find((e) => e.url === url);
  if (entry) {
    Object.assign(entry, updates);
  }
  return STATIC_PAGES;
};

/**
 * Generate sitemap index for large sitemaps
 */
export const generateSitemapIndex = (baseUrl: string = 'https://www.proinvoice.app'): string => {
  const sitemaps = [
    { url: '/sitemap.xml', lastmod: new Date().toISOString().split('T')[0] },
  ];

  const entries = sitemaps.map((sitemap) => {
    return `  <sitemap>
    <loc>${baseUrl}${sitemap.url}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
};

/**
 * Get sitemap statistics
 */
export const getSitemapStats = () => {
  return {
    totalUrls: STATIC_PAGES.length,
    lastUpdated: new Date().toISOString(),
    byChangeFreq: {
      always: STATIC_PAGES.filter((e) => e.changefreq === 'always').length,
      hourly: STATIC_PAGES.filter((e) => e.changefreq === 'hourly').length,
      daily: STATIC_PAGES.filter((e) => e.changefreq === 'daily').length,
      weekly: STATIC_PAGES.filter((e) => e.changefreq === 'weekly').length,
      monthly: STATIC_PAGES.filter((e) => e.changefreq === 'monthly').length,
      yearly: STATIC_PAGES.filter((e) => e.changefreq === 'yearly').length,
      never: STATIC_PAGES.filter((e) => e.changefreq === 'never').length,
    },
    byPriority: {
      high: STATIC_PAGES.filter((e) => (e.priority || 0) >= 0.8).length,
      medium: STATIC_PAGES.filter((e) => (e.priority || 0) >= 0.5 && (e.priority || 0) < 0.8).length,
      low: STATIC_PAGES.filter((e) => (e.priority || 0) < 0.5).length,
    },
  };
};

