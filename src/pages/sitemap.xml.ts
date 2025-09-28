export const generateSitemap = () => {
  const baseUrl = 'https://www.proinvoice.app';
  
  const staticPages = [
    '',
    '/pricing',
    '/templates', 
    '/estimates',
    '/get-started',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/compare/wave-vs-proinvoice',
    '/compare/invoice-simple-vs-proinvoice'
  ];

  const nicheTemplates = [
    'hvac', 'plumbing', 'electrician', 'roofing', 'construction', 'handyman',
    'landscaping', 'cleaning', 'pest-control', 'auto-detailing', 'mobile-mechanic',
    'photographer', 'videographer', 'freelance-designer', 'personal-trainer',
    'massage-therapist', 'bookkeeping', 'dj', 'event-planner', 'caterer',
    'carpet-cleaner', 'window-cleaning', 'snow-removal', 'pressure-washing',
    'landscaper', 'real-estate-photographer', 'tattoo-artist', 'makeup-artist',
    'hair-stylist', 'notary'
  ];

  const estimatePages = nicheTemplates.map(niche => `/estimates/${niche}-estimate-template`);
  const invoicePages = nicheTemplates.map(niche => `/templates/${niche}-invoice-template`);
  
  const allPages = [...staticPages, ...estimatePages, ...invoicePages];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : page.includes('/estimates/') || page.includes('/templates/') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
};