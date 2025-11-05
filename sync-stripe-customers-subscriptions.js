#!/usr/bin/env node

/**
 * ProInvoice Stripe Sync Script
 * Syncs all users and creates test subscriptions in Stripe
 */

const SUPABASE_URL = "https://hkzrfqpnkvpmsaeluksh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrenJmcXBua3ZwbXNhZWx1a3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDY5NzcsImV4cCI6MjA3MTI4Mjk3N30.ztGQNMLht4Gmo-PEgBlwXmuPjWdqsLOQSyfkwF04N7c";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

if (!SUPABASE_SERVICE_KEY) {
  console.error("❌ ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable not set");
  console.error("\n📋 To get your Service Role Key:");
  console.error("1. Go to https://app.supabase.com/project/hkzrfqpnkvpmsaeluksh/settings/api");
  console.error("2. Copy the 'Service Role' secret key");
  console.error("3. Set it as an environment variable:");
  console.error("   Windows: set SUPABASE_SERVICE_ROLE_KEY=your_key_here");
  console.error("   Mac/Linux: export SUPABASE_SERVICE_ROLE_KEY=your_key_here");
  console.error("\n4. Then run this script again");
  process.exit(1);
}

if (!STRIPE_SECRET_KEY) {
  console.error("❌ ERROR: STRIPE_SECRET_KEY environment variable not set");
  console.error("\n📋 To get your Stripe Secret Key:");
  console.error("1. Go to https://dashboard.stripe.com/apikeys");
  console.error("2. Copy your Secret Key (starts with sk_test_ or sk_live_)");
  console.error("3. Set it as an environment variable:");
  console.error("   Windows: set STRIPE_SECRET_KEY=your_key_here");
  console.error("   Mac/Linux: export STRIPE_SECRET_KEY=your_key_here");
  console.error("\n4. Then run this script again");
  process.exit(1);
}

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

// Price IDs from create-checkout
const PRICE_IDS = {
  lite_monthly: "price_1SCDIjGpz30x93KjADgoYSMS",
  pro_monthly: "price_1SCDJ4Gpz30x93KjNOLCJgNK",
  agency_monthly: "price_1SCDKrGpz30x93KjeKGawyGN",
};

let stats = {
  usersProcessed: 0,
  customersCreated: 0,
  customersFound: 0,
  subscriptionsCreated: 0,
  errors: []
};

// Step 1: Get all users from Supabase
async function getAllUsers() {
  log("Fetching all users from Supabase...", "info");

  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch users: ${response.status} - ${error}`);
    }

    const data = await response.json();
    log(`Found ${data.users.length} users`, "success");
    return data.users;
  } catch (error) {
    log(`Error fetching users: ${error.message}`, "error");
    throw error;
  }
}

// Step 2: Get user subscriptions from database
async function getUserSubscriptions() {
  log("Fetching user subscriptions from database...", "info");
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/user_subscriptions`, {
    headers: {
      "apikey": SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch subscriptions: ${response.status}`);
  }

  const data = await response.json();
  log(`Found ${data.length} subscription records`, "success");
  return data;
}

// Step 3: Create or find Stripe customer
async function createOrFindStripeCustomer(stripe, email, userId) {
  try {
    // Check if customer exists
    const customers = await stripe.customers.list({ email, limit: 1 });
    
    if (customers.data.length > 0) {
      log(`  ✅ Found existing Stripe customer: ${customers.data[0].id}`, "info");
      stats.customersFound++;
      return customers.data[0].id;
    }

    // Create new customer
    const customer = await stripe.customers.create({
      email,
      metadata: {
        supabase_user_id: userId,
      },
      name: email.split('@')[0],
      description: `ProInvoice user - ${email}`,
    });

    log(`  ✅ Created new Stripe customer: ${customer.id}`, "success");
    stats.customersCreated++;
    return customer.id;
  } catch (error) {
    log(`  ❌ Error with customer: ${error.message}`, "error");
    stats.errors.push({ email, error: error.message });
    return null;
  }
}

// Step 4: Create test subscription
async function createTestSubscription(stripe, customerId, email, planType = "pro_monthly") {
  try {
    const priceId = PRICE_IDS[planType];
    
    if (!priceId) {
      throw new Error(`Invalid plan type: ${planType}`);
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata: {
        test_subscription: "true",
        created_at: new Date().toISOString()
      }
    });

    log(`  ✅ Created subscription: ${subscription.id}`, "success");
    stats.subscriptionsCreated++;
    return subscription.id;
  } catch (error) {
    log(`  ❌ Error creating subscription: ${error.message}`, "error");
    stats.errors.push({ email, error: error.message });
    return null;
  }
}

// Step 5: Update database with Stripe IDs
async function updateDatabaseWithStripeIds(userId, customerId, subscriptionId) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/user_subscriptions`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        status: "active",
        plan: "paid",
        updated_at: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Database update failed: ${error}`);
    }

    log(`  ✅ Updated database with Stripe IDs`, "info");
  } catch (error) {
    log(`  ❌ Error updating database: ${error.message}`, "error");
    stats.errors.push({ userId, error: error.message });
  }
}

// Main sync function
async function syncStripeCustomersAndSubscriptions() {
  try {
    // Import Stripe dynamically
    const stripeModule = await import("https://esm.sh/stripe@18.5.0");
    const Stripe = stripeModule.default;
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2025-08-27.basil",
    });

    log("🚀 Starting Stripe Sync...", "info");
    console.log("=".repeat(70));

    // Get all users
    const users = await getAllUsers();

    // Get existing subscriptions
    const subscriptions = await getUserSubscriptions();
    const subMap = new Map(subscriptions.map(s => [s.user_id, s]));

    // Process each user
    for (const user of users) {
      stats.usersProcessed++;
      log(`\n[${stats.usersProcessed}/${users.length}] Processing: ${user.email}`, "info");

      // Create or find Stripe customer
      const customerId = await createOrFindStripeCustomer(stripe, user.email, user.id);
      
      if (!customerId) {
        continue;
      }

      // Check if subscription exists
      const existingSub = subMap.get(user.id);
      
      if (existingSub?.stripe_subscription_id) {
        log(`  ℹ️  Subscription already exists: ${existingSub.stripe_subscription_id}`, "info");
        continue;
      }

      // Create test subscription
      const subscriptionId = await createTestSubscription(stripe, customerId, user.email);
      
      if (subscriptionId) {
        // Update database
        await updateDatabaseWithStripeIds(user.id, customerId, subscriptionId);
      }
    }

    // Print summary
    console.log("\n" + "=".repeat(70));
    log("📊 SYNC COMPLETE", "success");
    console.log("=".repeat(70));
    log(`Users Processed: ${stats.usersProcessed}`, "info");
    log(`Customers Created: ${stats.customersCreated}`, "success");
    log(`Customers Found: ${stats.customersFound}`, "info");
    log(`Subscriptions Created: ${stats.subscriptionsCreated}`, "success");
    
    if (stats.errors.length > 0) {
      log(`Errors: ${stats.errors.length}`, "error");
      stats.errors.forEach(err => {
        console.log(`  - ${err.email || err.userId}: ${err.error}`);
      });
    }

    console.log("\n" + "=".repeat(70));
    log("✅ Check your Stripe Dashboard to verify customers and subscriptions!", "success");
    log("📊 Check Supabase to verify database updates!", "success");

  } catch (error) {
    log(`❌ Fatal error: ${error.message}`, "error");
    console.error(error);
    process.exit(1);
  }
}

// Run the sync
syncStripeCustomersAndSubscriptions();

