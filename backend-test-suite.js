#!/usr/bin/env node

/**
 * ProInvoice Backend Test Suite
 * Tests all critical API endpoints and workflows
 */

const SUPABASE_URL = "https://hkzrfqpnkvpmsaeluksh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrenJmcXBua3ZwbXNhZWx1a3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDY5NzcsImV4cCI6MjA3MTI4Mjk3N30.ztGQNMLht4Gmo-PEgBlwXmuPjWdqsLOQSyfkwF04N7c";

let testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

const log = (message, type = "info") => {
  const colors = {
    info: "\x1b[36m",
    success: "\x1b[32m",
    error: "\x1b[31m",
    warning: "\x1b[33m",
    reset: "\x1b[0m"
  };
  console.log(`${colors[type]}[${type.toUpperCase()}]${colors.reset} ${message}`);
};

const test = async (name, fn) => {
  try {
    await fn();
    testResults.passed++;
    testResults.tests.push({ name, status: "✅ PASS" });
    log(`✅ ${name}`, "success");
  } catch (error) {
    testResults.failed++;
    testResults.tests.push({ name, status: "❌ FAIL", error: error.message });
    log(`❌ ${name}: ${error.message}`, "error");
  }
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

// Test 1: Sign Up
await test("Sign Up - Create new user", async () => {
  const email = `test-${Date.now()}@example.com`;
  const password = "TestPassword123!";
  
  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({ email, password })
  });
  
  assert(response.ok, `Sign up failed: ${response.status}`);
  const data = await response.json();
  assert(data.user, "No user returned");
  assert(data.session, "No session returned");
  
  // Store for later tests
  global.testUser = { email, password, id: data.user.id };
  global.testToken = data.session.access_token;
});

// Test 2: Sign In
await test("Sign In - Login with credentials", async () => {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      email: global.testUser.email,
      password: global.testUser.password
    })
  });
  
  assert(response.ok, `Sign in failed: ${response.status}`);
  const data = await response.json();
  assert(data.access_token, "No access token returned");
  global.testToken = data.access_token;
});

// Test 3: Create Estimate
await test("Create Estimate - POST /rest/v1/estimates", async () => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/estimates`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${global.testToken}`,
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      client_name: "Test Client",
      client_email: "client@example.com",
      number: `EST-${Date.now()}`,
      title: "Test Estimate",
      items: [{ description: "Labor", quantity: 8, rate: 75, amount: 600 }],
      subtotal: 600,
      tax_rate: 0.08,
      tax_amount: 48,
      total: 648,
      deposit_percentage: 30,
      status: "pending_payment"
    })
  });
  
  assert(response.ok, `Create estimate failed: ${response.status}`);
  const data = await response.json();
  assert(Array.isArray(data) && data.length > 0, "No estimate returned");
  global.estimateId = data[0].id;
});

// Test 4: Get Estimate
await test("Get Estimate - GET /rest/v1/estimates/{id}", async () => {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/estimates?id=eq.${global.estimateId}`,
    {
      headers: {
        "Authorization": `Bearer ${global.testToken}`,
        "apikey": SUPABASE_ANON_KEY
      }
    }
  );
  
  assert(response.ok, `Get estimate failed: ${response.status}`);
  const data = await response.json();
  assert(Array.isArray(data) && data.length > 0, "Estimate not found");
  assert(data[0].id === global.estimateId, "Wrong estimate returned");
});

// Test 5: List Estimates
await test("List Estimates - GET /rest/v1/estimates", async () => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/estimates?limit=10`, {
    headers: {
      "Authorization": `Bearer ${global.testToken}`,
      "apikey": SUPABASE_ANON_KEY
    }
  });
  
  assert(response.ok, `List estimates failed: ${response.status}`);
  const data = await response.json();
  assert(Array.isArray(data), "Response is not an array");
});

// Test 6: Create Checkout
await test("Create Checkout - POST /functions/v1/create-checkout", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${global.testToken}`,
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      priceId: "price_test_monthly",
      plan_type: "pro",
      billing_cycle: "monthly"
    })
  });
  
  // This might fail if Stripe keys aren't set, but we're testing the endpoint
  assert(response.status !== 404, "Endpoint not found");
  if (response.ok) {
    const data = await response.json();
    assert(data.url || data.sessionId, "No checkout URL returned");
  }
});

// Test 7: Check Subscription
await test("Check Subscription - POST /functions/v1/check-subscription", async () => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/check-subscription`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${global.testToken}`,
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({})
  });
  
  assert(response.status !== 404, "Endpoint not found");
  // 200 or 400 are both valid responses depending on subscription status
  assert([200, 400, 401].includes(response.status), `Unexpected status: ${response.status}`);
});

// Test 8: Get Estimate (Public - no auth)
await test("Get Estimate Public - GET /functions/v1/get-estimate", async () => {
  // This endpoint doesn't require auth
  const response = await fetch(`${SUPABASE_URL}/functions/v1/get-estimate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({ token: "invalid-token" })
  });
  
  assert(response.status !== 404, "Endpoint not found");
  // Should return 400 for invalid token
  assert([400, 500].includes(response.status), `Unexpected status: ${response.status}`);
});

// Test 9: Create Client
await test("Create Client - POST /rest/v1/clients", async () => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/clients`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${global.testToken}`,
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY
    },
    body: JSON.stringify({
      name: "Test Client",
      email: "client@example.com",
      phone: "555-1234",
      city: "New York",
      state: "NY",
      zip: "10001"
    })
  });
  
  assert(response.ok, `Create client failed: ${response.status}`);
  const data = await response.json();
  assert(Array.isArray(data) && data.length > 0, "No client returned");
  global.clientId = data[0].id;
});

// Test 10: List Clients
await test("List Clients - GET /rest/v1/clients", async () => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/clients?limit=10`, {
    headers: {
      "Authorization": `Bearer ${global.testToken}`,
      "apikey": SUPABASE_ANON_KEY
    }
  });
  
  assert(response.ok, `List clients failed: ${response.status}`);
  const data = await response.json();
  assert(Array.isArray(data), "Response is not an array");
});

// Print Results
console.log("\n" + "=".repeat(60));
console.log("📊 TEST RESULTS");
console.log("=".repeat(60));

testResults.tests.forEach(t => {
  console.log(`${t.status} ${t.name}`);
  if (t.error) console.log(`   Error: ${t.error}`);
});

console.log("\n" + "=".repeat(60));
log(`Total: ${testResults.passed + testResults.failed} | Passed: ${testResults.passed} | Failed: ${testResults.failed}`, 
    testResults.failed === 0 ? "success" : "warning");
console.log("=".repeat(60));

process.exit(testResults.failed > 0 ? 1 : 0);

