/**
 * Sitemap Update Cron Job
 * Runs weekly on Sunday at 2 AM to update sitemap and trigger Google reindex
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function updateSitemap() {
  try {
    console.log("Starting sitemap update job...");

    // Get all estimates and invoices
    const [estimatesResult, invoicesResult] = await Promise.all([
      supabase.from("estimates").select("id, created_at, updated_at"),
      supabase.from("invoices").select("id, created_at, updated_at"),
    ]);

    const estimates = estimatesResult.data || [];
    const invoices = invoicesResult.data || [];

    console.log(`Found ${estimates.length} estimates and ${invoices.length} invoices`);

    // Generate sitemap XML
    const baseUrl = process.env.REACT_APP_BASE_URL || "https://proinvoice.app";
    const sitemapEntries = [];

    // Add static pages
    const staticPages = [
      { url: "/", priority: 1.0, changefreq: "daily" },
      { url: "/pricing", priority: 0.8, changefreq: "weekly" },
      { url: "/features", priority: 0.8, changefreq: "weekly" },
      { url: "/about", priority: 0.7, changefreq: "monthly" },
      { url: "/contact", priority: 0.7, changefreq: "monthly" },
      { url: "/trades/electricians", priority: 0.8, changefreq: "weekly" },
      { url: "/trades/plumbers", priority: 0.8, changefreq: "weekly" },
      { url: "/trades/roofers", priority: 0.8, changefreq: "weekly" },
      { url: "/trades/landscapers", priority: 0.8, changefreq: "weekly" },
      { url: "/trades/handymen", priority: 0.8, changefreq: "weekly" },
    ];

    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}${page.url}`,
        lastmod: new Date().toISOString().split("T")[0],
        priority: page.priority,
        changefreq: page.changefreq,
      });
    }

    // Add dynamic pages
    for (const estimate of estimates) {
      sitemapEntries.push({
        url: `${baseUrl}/estimates/${estimate.id}`,
        lastmod: new Date(estimate.updated_at).toISOString().split("T")[0],
        priority: 0.6,
        changefreq: "monthly",
      });
    }

    for (const invoice of invoices) {
      sitemapEntries.push({
        url: `${baseUrl}/invoices/${invoice.id}`,
        lastmod: new Date(invoice.updated_at).toISOString().split("T")[0],
        priority: 0.5,
        changefreq: "monthly",
      });
    }

    // Generate XML
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    // Save sitemap
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml);
    console.log(`Generated sitemap with ${sitemapEntries.length} entries`);

    // Trigger Google reindex for each URL
    const googleApiKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
    if (googleApiKey) {
      console.log("Triggering Google reindex...");

      for (const entry of sitemapEntries.slice(0, 10)) {
        // Limit to first 10 to avoid rate limiting
        try {
          const response = await fetch(
            `https://www.googleapis.com/indexing/v3/urlNotifications:publish?key=${googleApiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                url: entry.url,
                type: "URL_UPDATED",
              }),
            }
          );

          if (response.ok) {
            console.log(`Reindex triggered for ${entry.url}`);
          } else {
            console.error(
              `Failed to trigger reindex for ${entry.url}: ${response.statusText}`
            );
          }
        } catch (error) {
          console.error(`Error triggering reindex for ${entry.url}:`, error);
        }
      }
    }

    console.log("Sitemap update job completed successfully");
  } catch (error) {
    console.error("Error in sitemap update job:", error);
    process.exit(1);
  }
}

// Run the job
updateSitemap();

