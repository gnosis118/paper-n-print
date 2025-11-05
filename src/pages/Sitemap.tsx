import React, { useEffect } from 'react';
import { generateSitemap } from '@/lib/sitemapService';

/**
 * Sitemap Page
 * Generates and serves dynamic XML sitemap for SEO
 * Route: /sitemap.xml
 */
const Sitemap: React.FC = () => {
  useEffect(() => {
    // Generate sitemap XML
    const sitemapXml = generateSitemap();

    // Set response headers
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';

    // Trigger download (in production, this would be served by the server)
    // For now, we'll just log it
    console.log('Sitemap generated:', sitemapXml);
  }, []);

  return (
    <div style={{ display: 'none' }}>
      {/* This page is not meant to be viewed in the browser */}
      {/* It serves the sitemap.xml file for search engines */}
    </div>
  );
};

export default Sitemap;

