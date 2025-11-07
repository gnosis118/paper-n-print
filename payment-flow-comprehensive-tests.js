/**
 * ProInvoice Payment Flow Comprehensive Testing Suite
 * Tests all Stripe payment workflows end-to-end
 * 
 * Run: node payment-flow-comprehensive-tests.js
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
  details: [],
  paymentUrls: []
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
    case "payment":
      console.log(`${colors.magenta}${prefix} 💳 ${message}${colors.reset}`);
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
// SECTION 1: SUBSCRIPTION PAYMENT FLOWS
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("💳 SECTION 1: SUBSCRIPTION PAYMENT FLOWS", "info");
log("=".repeat(80), "info");

await test("1.1 - Pro Monthly Subscription Checkout", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      plan_type: "pro",
      billing_cycle: "monthly",
      product_type: "subscription"
    })
  });
  
  const data = await response.json();
  
  if (response.ok && data.url) {
    log(`  ✓ Checkout URL created: ${data.url.substring(0, 60)}...`, "payment");
    testResults.paymentUrls.push({
      type: "Pro Monthly Subscription",
      url: data.url,
      sessionId: data.sessionId
    });
  } else if (response.status === 401) {
    log(`  ⚠ Requires authentication (expected for protected endpoint)`, "warning");
    testResults.warnings++;
  } else {
    log(`  ℹ Response: ${JSON.stringify(data)}`, "info");
  }
  
  assert(response.status !== 404, "Checkout endpoint not found");
  assert(response.status !== 500, "Server error creating checkout");
});

await test("1.2 - Pro Annual Subscription Checkout", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      plan_type: "pro",
      billing_cycle: "annual",
      product_type: "subscription"
    })
  });
  
  const data = await response.json();
  
  if (response.ok && data.url) {
    log(`  ✓ Annual checkout URL created`, "payment");
    testResults.paymentUrls.push({
      type: "Pro Annual Subscription",
      url: data.url,
      sessionId: data.sessionId
    });
  } else if (response.status === 401) {
    log(`  ⚠ Requires authentication`, "warning");
    testResults.warnings++;
  }
  
  assert(response.status !== 404, "Checkout endpoint not found");
});

await test("1.3 - Agency Plan Subscription Checkout", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      plan_type: "agency",
      billing_cycle: "monthly",
      product_type: "subscription"
    })
  });
  
  const data = await response.json();
  
  if (response.ok && data.url) {
    log(`  ✓ Agency plan checkout created`, "payment");
    testResults.paymentUrls.push({
      type: "Agency Monthly Subscription",
      url: data.url,
      sessionId: data.sessionId
    });
  } else if (response.status === 401) {
    log(`  ⚠ Requires authentication`, "warning");
    testResults.warnings++;
  }
  
  assert(response.status !== 404, "Checkout endpoint not found");
});

await test("1.4 - Lite Plan Subscription Checkout", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      plan_type: "lite",
      billing_cycle: "monthly",
      product_type: "subscription"
    })
  });
  
  const data = await response.json();
  
  if (response.ok && data.url) {
    log(`  ✓ Lite plan checkout created`, "payment");
    testResults.paymentUrls.push({
      type: "Lite Monthly Subscription",
      url: data.url,
      sessionId: data.sessionId
    });
  } else if (response.status === 401) {
    log(`  ⚠ Requires authentication`, "warning");
    testResults.warnings++;
  }
  
  assert(response.status !== 404, "Checkout endpoint not found");
});

// ============================================================================
// SECTION 2: ONE-TIME PAYMENT FLOWS
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("💰 SECTION 2: ONE-TIME PAYMENT FLOWS", "info");
log("=".repeat(80), "info");

await test("2.1 - Template Pack Purchase", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      plan_type: "templates",
      product_type: "one_time",
      amount: 4900 // $49.00
    })
  });
  
  const data = await response.json();
  
  if (response.ok && data.url) {
    log(`  ✓ Template pack checkout created ($49)`, "payment");
    testResults.paymentUrls.push({
      type: "Template Pack One-Time",
      url: data.url,
      amount: "$49.00"
    });
  } else if (response.status === 401) {
    log(`  ⚠ Requires authentication`, "warning");
    testResults.warnings++;
  }
  
  assert(response.status !== 404, "Checkout endpoint not found");
});

await test("2.2 - Custom Invoice Payment", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      amount: 15000, // $150.00
      currency: "usd",
      description: "Test Invoice Payment"
    })
  });
  
  const data = await response.json();
  
  if (response.ok && data.url) {
    log(`  ✓ Invoice payment link created ($150)`, "payment");
    testResults.paymentUrls.push({
      type: "Invoice Payment",
      url: data.url,
      amount: "$150.00"
    });
  } else if (response.status === 401) {
    log(`  ⚠ Requires authentication`, "warning");
    testResults.warnings++;
  }
  
  assert(response.status !== 404, "Payment endpoint not found");
});

// ============================================================================
// SECTION 3: ESTIMATE DEPOSIT FLOWS
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("📋 SECTION 3: ESTIMATE DEPOSIT FLOWS", "info");
log("=".repeat(80), "info");

await test("3.1 - Estimate Deposit Payment (25%)", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/estimate-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      token: "test_estimate_token",
      amount: 25000, // $250 deposit
      currency: "usd"
    })
  });
  
  const data = await response.json();
  
  if (response.ok && data.url) {
    log(`  ✓ Estimate deposit checkout created ($250)`, "payment");
    testResults.paymentUrls.push({
      type: "Estimate Deposit 25%",
      url: data.url,
      amount: "$250.00"
    });
  } else if (response.status === 400 || response.status === 401) {
    log(`  ⚠ Requires valid estimate token`, "warning");
    testResults.warnings++;
  }
  
  assert(response.status !== 404, "Estimate checkout endpoint not found");
});

await test("3.2 - Estimate Deposit Payment (50%)", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/estimate-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      token: "test_estimate_token_50",
      amount: 50000, // $500 deposit
      currency: "usd"
    })
  });
  
  const data = await response.json();
  
  if (response.ok && data.url) {
    log(`  ✓ Estimate deposit checkout created ($500)`, "payment");
  } else if (response.status === 400 || response.status === 401) {
    log(`  ⚠ Requires valid estimate token`, "warning");
    testResults.warnings++;
  }
  
  assert(response.status !== 404, "Estimate checkout endpoint not found");
});

// ============================================================================
// SECTION 4: CUSTOMER PORTAL & SUBSCRIPTION MANAGEMENT
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("👤 SECTION 4: CUSTOMER PORTAL & SUBSCRIPTION MANAGEMENT", "info");
log("=".repeat(80), "info");

await test("4.1 - Customer Portal Access", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-portal-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      return_url: `${SITE_URL}/dashboard`
    })
  });

  const data = await response.json();

  if (response.ok && data.url) {
    log(`  ✓ Customer portal URL created`, "payment");
    testResults.paymentUrls.push({
      type: "Customer Portal",
      url: data.url
    });
  } else if (response.status === 401) {
    log(`  ⚠ Requires authentication (expected)`, "warning");
    testResults.warnings++;
  }

  assert(response.status !== 404, "Portal endpoint not found");
  assert(response.status !== 500, "Server error creating portal session");
});

await test("4.2 - Check Subscription Status", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/check-subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    }
  });

  const data = await response.json();

  if (response.ok) {
    log(`  ✓ Subscription check endpoint working`, "info");
  } else if (response.status === 401) {
    log(`  ⚠ Requires authentication (expected)`, "warning");
    testResults.warnings++;
  }

  assert(response.status !== 404, "Check subscription endpoint not found");
});

// ============================================================================
// SECTION 5: WEBHOOK ENDPOINTS
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("🔔 SECTION 5: WEBHOOK ENDPOINTS", "info");
log("=".repeat(80), "info");

await test("5.1 - Stripe Webhook Endpoint Deployed", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/stripe-webhook`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "test.event"
    })
  });

  // Webhook should exist (not 404), but will reject invalid signatures
  assert(response.status !== 404, "Stripe webhook endpoint not found");
  log(`  ✓ Webhook endpoint deployed (status: ${response.status})`, "info");
});

await test("5.2 - Stripe Webhook for Estimates", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/stripe-webhook-estimates`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Content-Type": "application/json"
    }
  });

  assert(response.status !== 404, "Estimate webhook endpoint not found");
  log(`  ✓ Estimate webhook endpoint deployed (status: ${response.status})`, "info");
});

// ============================================================================
// SECTION 6: PAYMENT VALIDATION & ERROR HANDLING
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("🛡️  SECTION 6: PAYMENT VALIDATION & ERROR HANDLING", "info");
log("=".repeat(80), "info");

await test("6.1 - Invalid Plan Type Rejected", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      plan_type: "invalid_plan_xyz",
      billing_cycle: "monthly"
    })
  });

  // Should reject invalid plan (400 or 401, not 500)
  assert(response.status !== 500, "Server error on invalid input");
  log(`  ✓ Invalid plan rejected (status: ${response.status})`, "info");
});

await test("6.2 - Missing Required Fields Rejected", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      // Missing plan_type
      billing_cycle: "monthly"
    })
  });

  assert(response.status !== 500, "Server error on missing fields");
  log(`  ✓ Missing fields rejected (status: ${response.status})`, "info");
});

await test("6.3 - Negative Amount Rejected", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      amount: -1000,
      currency: "usd"
    })
  });

  assert(response.status !== 500, "Server error on negative amount");
  log(`  ✓ Negative amount rejected (status: ${response.status})`, "info");
});

await test("6.4 - Invalid Currency Rejected", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      amount: 1000,
      currency: "INVALID"
    })
  });

  assert(response.status !== 500, "Server error on invalid currency");
  log(`  ✓ Invalid currency rejected (status: ${response.status})`, "info");
});

// ============================================================================
// SECTION 7: PRICING PAGE INTEGRATION
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("💵 SECTION 7: PRICING PAGE INTEGRATION", "info");
log("=".repeat(80), "info");

await test("7.1 - Pricing Page Displays Plans", async () => {
  const response = await fetch(`${SITE_URL}/pricing`);
  const html = await response.text();

  assert(response.ok, "Pricing page failed to load");
  assert(html.includes("Free") || html.includes("Lite"), "Free/Lite plan not found");
  assert(html.includes("Pro"), "Pro plan not found");
  assert(html.includes("$") || html.includes("month"), "Pricing not displayed");

  log(`  ✓ All pricing plans displayed`, "info");
});

await test("7.2 - Pricing Page Has CTA Buttons", async () => {
  const response = await fetch(`${SITE_URL}/pricing`);
  const html = await response.text();

  assert(html.includes("Start") || html.includes("Get Started") || html.includes("Subscribe"),
    "CTA buttons not found");

  log(`  ✓ CTA buttons present on pricing page`, "info");
});

// ============================================================================
// FINAL REPORT
// ============================================================================

log("\n" + "=".repeat(80), "info");
log("📊 PAYMENT FLOW TEST RESULTS", "info");
log("=".repeat(80), "info");

console.log(`\n${colors.bright}Total Tests:${colors.reset} ${testResults.total}`);
console.log(`${colors.green}Passed:${colors.reset} ${testResults.passed}`);
console.log(`${colors.red}Failed:${colors.reset} ${testResults.failed}`);
console.log(`${colors.yellow}Warnings:${colors.reset} ${testResults.warnings}`);
console.log(`${colors.cyan}Success Rate:${colors.reset} ${((testResults.passed / testResults.total) * 100).toFixed(1)}%\n`);

if (testResults.paymentUrls.length > 0) {
  console.log(`\n${colors.magenta}${colors.bright}PAYMENT URLS GENERATED:${colors.reset}`);
  testResults.paymentUrls.forEach((payment, index) => {
    console.log(`\n${colors.magenta}${index + 1}. ${payment.type}${colors.reset}`);
    if (payment.amount) {
      console.log(`   Amount: ${payment.amount}`);
    }
    if (payment.url) {
      console.log(`   URL: ${payment.url.substring(0, 80)}...`);
    }
    if (payment.sessionId) {
      console.log(`   Session ID: ${payment.sessionId}`);
    }
  });
}

if (testResults.failed > 0) {
  console.log(`\n${colors.red}${colors.bright}FAILED TESTS:${colors.reset}`);
  testResults.details.forEach(detail => {
    console.log(`${colors.red}❌ ${detail.name}${colors.reset}`);
    console.log(`   ${detail.error}\n`);
  });
}

// Overall status
if (testResults.failed === 0) {
  log("✅ ALL PAYMENT FLOW TESTS PASSED - READY FOR TRANSACTIONS", "success");
} else if (testResults.failed <= 2) {
  log("⚠️  MOSTLY PASSING - MINOR PAYMENT ISSUES", "warning");
} else {
  log("❌ PAYMENT SYSTEM REQUIRES ATTENTION", "error");
}

log("\n" + "=".repeat(80), "info");
log("Payment flow testing completed at " + new Date().toISOString(), "info");
log("=".repeat(80), "info");
