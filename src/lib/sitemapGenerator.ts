/**
 * Dynamic sitemap generator for ProInvoice
 * Generates XML sitemap for SEO and search engine indexing
 */

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Core pages that should always be in the sitemap
 */
export const CORE_PAGES: SitemapEntry[] = [
  {
    loc: 'https://www.proinvoice.app/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    loc: 'https://www.proinvoice.app/pricing',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    loc: 'https://www.proinvoice.app/invoice-templates',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    loc: 'https://www.proinvoice.app/estimate-templates',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    loc: 'https://www.proinvoice.app/get-started',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    loc: 'https://www.proinvoice.app/about',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    loc: 'https://www.proinvoice.app/contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    loc: 'https://www.proinvoice.app/docs',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.7,
  },
];

/**
 * Contractor trade pages
 */
export const TRADE_PAGES: SitemapEntry[] = [
  {
    loc: 'https://www.proinvoice.app/trades',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    loc: 'https://www.proinvoice.app/plumbers',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://www.proinvoice.app/roofers',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://www.proinvoice.app/electricians',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://www.proinvoice.app/painters',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://www.proinvoice.app/landscapers',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://www.proinvoice.app/trades/electricians',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://www.proinvoice.app/trades/plumbers',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://www.proinvoice.app/trades/roofers',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://www.proinvoice.app/trades/landscapers',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://www.proinvoice.app/trades/handymen',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  },
];

/**
 * Legal pages
 */
export const LEGAL_PAGES: SitemapEntry[] = [
  {
    loc: 'https://www.proinvoice.app/privacy',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    loc: 'https://www.proinvoice.app/terms',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    loc: 'https://www.proinvoice.app/cookies',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.5,
  },
];

/**
 * Generate XML sitemap from entries
 */
export const generateSitemapXML = (entries: SitemapEntry[]): string => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
};

/**
 * Generate complete sitemap with all pages
 */
export const generateCompleteSitemap = (): string => {
  const allEntries = [...CORE_PAGES, ...TRADE_PAGES, ...LEGAL_PAGES];
  return generateSitemapXML(allEntries);
};

/**
 * Generate sitemap index for large sitemaps
 */
export const generateSitemapIndex = (sitemaps: Array<{ loc: string; lastmod?: string }>): string => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sitemap) => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    ${sitemap.lastmod ? `<lastmod>${sitemap.lastmod}</lastmod>` : ''}
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return xml;
};

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = (): string => {
  return `# ProInvoice robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/
Disallow: /*.json$
Disallow: /*.xml$

# Specific rules for search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Sitemap
Sitemap: https://www.proinvoice.app/sitemap.xml

# Crawl delay
Crawl-delay: 1
`;
};

