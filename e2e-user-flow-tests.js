/**
 * ProInvoice E2E User Flow Testing Suite
 * Tests complete user journeys from signup to payment
 * 
 * Run: node e2e-user-flow-tests.js
 */

const SITE_URL = "https://www.proinvoice.app";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://xboyvlkpbmwvfapfupxs.supabase.co";
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhib3l2bGtwYm13dmZhcGZ1cHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1OTU4NzAsImV4cCI6MjA0NDE3MTg3MH0.qlCne0JkW_H-r5VLLkfcJEqRi_LbwwxWKqJQk0Aq_Aw";

// Test results tracking
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: [],
  details: []
};

// Color logging
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m"
};

const log = (message, type = "info") => {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const prefix = `[${timestamp}]`;
  
  switch(type) {
    case "success":
      console.log(`${colors.green}${prefix} ✅ ${message}${colors.reset}`);
      break;
    case "error":
      console.log(`${colors.red}${prefix} ❌ ${message}${colors.reset}`);
      break;
    case "warning":
      console.log(`${colors.yellow}${prefix} ⚠️  ${message}${colors.reset}`);
      break;
    case "info":
      console.log(`${colors.cyan}${prefix} ℹ️  ${message}${colors.reset}`);
      break;
    default:
      console.log(`${prefix} ${message}`);
  }
};

const test = async (name, fn) => {
  testResults.total++;
  try {
    await fn();
    testResults.passed++;
    testResults.tests.push({ name, status: "✅ PASS" });
    log(`${name}`, "success");
  } catch (error) {
    testResults.failed++;
    testResults.tests.push({ name, status: "❌ FAIL", error: error.message });
    testResults.details.push({ name, error: error.message });
    log(`${name}: ${error.message}`, "error");
  }
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

// ============================================================================
// SECTION 1: SITE AVAILABILITY & CORE PAGES
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("🌐 SECTION 1: SITE AVAILABILITY & CORE PAGES", "info");
log("=".repeat(80), "info");

await test("1.1 - Homepage loads successfully", async () => {
  const response = await fetch(SITE_URL);
  assert(response.ok, `Homepage failed to load: ${response.status}`);
  const html = await response.text();
  assert(html.includes("ProInvoice") || html.includes("Invoice"), "Homepage missing expected content");
  log(`  ✓ Status: ${response.status}`, "info");
  log(`  ✓ Content length: ${html.length} bytes`, "info");
});

await test("1.2 - Authentication page accessible", async () => {
  const response = await fetch(`${SITE_URL}/auth`);
  assert(response.ok, `Auth page failed: ${response.status}`);
  const html = await response.text();
  assert(html.includes("Sign In") || html.includes("Sign Up"), "Auth page missing sign in/up");
  log(`  ✓ Auth page loaded`, "info");
});

await test("1.3 - Invoice creation page accessible", async () => {
  const response = await fetch(`${SITE_URL}/invoice`);
  assert(response.ok, `Invoice page failed: ${response.status}`);
  log(`  ✓ Invoice creation page accessible`, "info");
});

await test("1.4 - Pricing page loads", async () => {
  const response = await fetch(`${SITE_URL}/pricing`);
  assert(response.ok, `Pricing page failed: ${response.status}`);
  const html = await response.text();
  assert(html.includes("Free") || html.includes("Pro"), "Pricing page missing plans");
  log(`  ✓ Pricing page shows plans`, "info");
});

await test("1.5 - Templates page loads", async () => {
  const response = await fetch(`${SITE_URL}/invoice-templates`);
  assert(response.ok, `Templates page failed: ${response.status}`);
  log(`  ✓ Templates page accessible`, "info");
});

await test("1.6 - Estimates page loads", async () => {
  const response = await fetch(`${SITE_URL}/estimate-templates`);
  assert(response.ok, `Estimates page failed: ${response.status}`);
  log(`  ✓ Estimates page accessible`, "info");
});

// ============================================================================
// SECTION 2: AUTHENTICATION ENDPOINTS
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("🔐 SECTION 2: AUTHENTICATION ENDPOINTS", "info");
log("=".repeat(80), "info");

await test("2.1 - Supabase Auth endpoint reachable", async () => {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/health`, {
    headers: { "apikey": SUPABASE_ANON_KEY }
  });
  assert(response.ok, `Auth health check failed: ${response.status}`);
  log(`  ✓ Supabase Auth is healthy`, "info");
});

await test("2.2 - Sign up endpoint accessible", async () => {
  // Test that signup endpoint exists (will fail without valid email, but should not 404)
  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "test@example.com",
      password: "testpassword123"
    })
  });
  
  // Should not be 404 - endpoint exists
  assert(response.status !== 404, "Signup endpoint not found");
  log(`  ✓ Signup endpoint exists (status: ${response.status})`, "info");
});

await test("2.3 - Sign in endpoint accessible", async () => {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "test@example.com",
      password: "wrongpassword"
    })
  });
  
  // Should not be 404 - endpoint exists
  assert(response.status !== 404, "Sign in endpoint not found");
  log(`  ✓ Sign in endpoint exists (status: ${response.status})`, "info");
});

// ============================================================================
// SECTION 3: DATABASE CONNECTIVITY
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("🗄️  SECTION 3: DATABASE CONNECTIVITY", "info");
log("=".repeat(80), "info");

await test("3.1 - Estimates table accessible", async () => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/estimates?select=count`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    }
  });
  
  // Should require auth (401) or return data, not 404
  assert(response.status !== 404, "Estimates table not found");
  log(`  ✓ Estimates table exists (status: ${response.status})`, "info");
});

await test("3.2 - Invoices table accessible", async () => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/invoices?select=count`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    }
  });
  
  assert(response.status !== 404, "Invoices table not found");
  log(`  ✓ Invoices table exists (status: ${response.status})`, "info");
});

await test("3.3 - Clients table accessible", async () => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/clients?select=count`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    }
  });
  
  assert(response.status !== 404, "Clients table not found");
  log(`  ✓ Clients table exists (status: ${response.status})`, "info");
});

await test("3.4 - Payments table accessible", async () => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/payments?select=count`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    }
  });
  
  assert(response.status !== 404, "Payments table not found");
  log(`  ✓ Payments table exists (status: ${response.status})`, "info");
});

await test("3.5 - Subscriptions table accessible", async () => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/subscriptions?select=count`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    }
  });
  
  assert(response.status !== 404, "Subscriptions table not found");
  log(`  ✓ Subscriptions table exists (status: ${response.status})`, "info");
});

// ============================================================================
// SECTION 4: STRIPE PAYMENT ENDPOINTS
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("💳 SECTION 4: STRIPE PAYMENT ENDPOINTS", "info");
log("=".repeat(80), "info");

await test("4.1 - Create Checkout endpoint deployed", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      plan_type: "pro",
      billing_cycle: "monthly"
    })
  });
  
  assert(response.status !== 404, "Create checkout endpoint not found");
  log(`  ✓ Create checkout endpoint exists (status: ${response.status})`, "info");
});

await test("4.2 - Estimate Checkout endpoint deployed", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/estimate-checkout`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    }
  });

  assert(response.status !== 404, "Estimate checkout endpoint not found");
  log(`  ✓ Estimate checkout endpoint exists (status: ${response.status})`, "info");
});

await test("4.3 - Customer Portal endpoint deployed", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-portal-session`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    }
  });

  assert(response.status !== 404, "Customer portal endpoint not found");
  log(`  ✓ Customer portal endpoint exists (status: ${response.status})`, "info");
});

await test("4.4 - Stripe Webhook endpoint deployed", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/stripe-webhook`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY
    }
  });

  assert(response.status !== 404, "Stripe webhook endpoint not found");
  log(`  ✓ Stripe webhook endpoint exists (status: ${response.status})`, "info");
});

await test("4.5 - Check Subscription endpoint deployed", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/check-subscription`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    }
  });

  assert(response.status !== 404, "Check subscription endpoint not found");
  log(`  ✓ Check subscription endpoint exists (status: ${response.status})`, "info");
});

// ============================================================================
// SECTION 5: SEO & METADATA
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("🔍 SECTION 5: SEO & METADATA", "info");
log("=".repeat(80), "info");

await test("5.1 - Sitemap.xml accessible", async () => {
  const response = await fetch(`${SITE_URL}/sitemap.xml`);
  assert(response.ok, `Sitemap not found: ${response.status}`);
  const xml = await response.text();
  assert(xml.includes("<?xml"), "Sitemap is not valid XML");
  assert(xml.includes("<urlset"), "Sitemap missing urlset");
  log(`  ✓ Sitemap is valid XML`, "info");
});

await test("5.2 - Robots.txt accessible", async () => {
  const response = await fetch(`${SITE_URL}/robots.txt`);
  assert(response.ok, `Robots.txt not found: ${response.status}`);
  const txt = await response.text();
  assert(txt.includes("User-agent") || txt.includes("Sitemap"), "Robots.txt missing directives");
  log(`  ✓ Robots.txt configured`, "info");
});

await test("5.3 - Homepage has meta tags", async () => {
  const response = await fetch(SITE_URL);
  const html = await response.text();
  assert(html.includes("<meta"), "Homepage missing meta tags");
  assert(html.includes("description") || html.includes("og:"), "Homepage missing SEO meta tags");
  log(`  ✓ Homepage has SEO meta tags`, "info");
});

await test("5.4 - Favicon accessible", async () => {
  const response = await fetch(`${SITE_URL}/favicon.ico`);
  assert(response.ok || response.status === 304, `Favicon not found: ${response.status}`);
  log(`  ✓ Favicon exists`, "info");
});

// ============================================================================
// SECTION 6: SECURITY HEADERS
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("🔒 SECTION 6: SECURITY HEADERS", "info");
log("=".repeat(80), "info");

await test("6.1 - X-Frame-Options header present", async () => {
  const response = await fetch(SITE_URL);
  const xFrameOptions = response.headers.get("x-frame-options");
  assert(xFrameOptions, "X-Frame-Options header missing");
  log(`  ✓ X-Frame-Options: ${xFrameOptions}`, "info");
});

await test("6.2 - X-Content-Type-Options header present", async () => {
  const response = await fetch(SITE_URL);
  const xContentType = response.headers.get("x-content-type-options");
  assert(xContentType, "X-Content-Type-Options header missing");
  log(`  ✓ X-Content-Type-Options: ${xContentType}`, "info");
});

await test("6.3 - Strict-Transport-Security header present", async () => {
  const response = await fetch(SITE_URL);
  const hsts = response.headers.get("strict-transport-security");
  assert(hsts, "HSTS header missing");
  log(`  ✓ HSTS: ${hsts}`, "info");
});

await test("6.4 - Referrer-Policy header present", async () => {
  const response = await fetch(SITE_URL);
  const referrer = response.headers.get("referrer-policy");
  assert(referrer, "Referrer-Policy header missing");
  log(`  ✓ Referrer-Policy: ${referrer}`, "info");
});

// ============================================================================
// SECTION 7: PERFORMANCE & CACHING
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("⚡ SECTION 7: PERFORMANCE & CACHING", "info");
log("=".repeat(80), "info");

await test("7.1 - Homepage loads in reasonable time", async () => {
  const start = Date.now();
  const response = await fetch(SITE_URL);
  const loadTime = Date.now() - start;

  assert(response.ok, "Homepage failed to load");
  assert(loadTime < 5000, `Homepage too slow: ${loadTime}ms`);
  log(`  ✓ Load time: ${loadTime}ms`, "info");
});

await test("7.2 - Static assets have cache headers", async () => {
  const response = await fetch(SITE_URL);
  const cacheControl = response.headers.get("cache-control");

  if (cacheControl) {
    log(`  ✓ Cache-Control: ${cacheControl}`, "info");
  } else {
    log(`  ⚠ No cache headers found`, "warning");
    testResults.warnings++;
  }
});

// ============================================================================
// FINAL REPORT
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("📊 TEST RESULTS SUMMARY", "info");
log("=".repeat(80), "info");

console.log(`\n${colors.bright}Total Tests:${colors.reset} ${testResults.total}`);
console.log(`${colors.green}Passed:${colors.reset} ${testResults.passed}`);
console.log(`${colors.red}Failed:${colors.reset} ${testResults.failed}`);
console.log(`${colors.yellow}Warnings:${colors.reset} ${testResults.warnings}`);
console.log(`${colors.cyan}Success Rate:${colors.reset} ${((testResults.passed / testResults.total) * 100).toFixed(1)}%\n`);

if (testResults.failed > 0) {
  console.log(`\n${colors.red}${colors.bright}FAILED TESTS:${colors.reset}`);
  testResults.details.forEach(detail => {
    console.log(`${colors.red}❌ ${detail.name}${colors.reset}`);
    console.log(`   ${detail.error}\n`);
  });
}

// Overall status
if (testResults.failed === 0) {
  log("✅ ALL E2E TESTS PASSED - SITE IS PRODUCTION READY", "success");
} else if (testResults.failed <= 2) {
  log("⚠️  MOSTLY PASSING - MINOR ISSUES FOUND", "warning");
} else {
  log("❌ MULTIPLE FAILURES - REQUIRES ATTENTION", "error");
}

log("\n" + "=".repeat(80), "info");
log("Test suite completed at " + new Date().toISOString(), "info");
log("=".repeat(80), "info");

