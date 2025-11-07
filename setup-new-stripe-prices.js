/**
 * Setup New Stripe Prices for ProInvoice
 * 
 * This script creates new Stripe prices to match your pricing page:
 * - Starter: $19/month, $190/year
 * - Pro Crew: $49/month, $490/year  
 * - Contractor Plus: $99/month, $990/year
 * 
 * Run: node setup-new-stripe-prices.js
 */

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "YOUR_STRIPE_SECRET_KEY_HERE";

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

async function createStripePrice(stripe, productName, amount, interval, lookupKey) {
  try {
    // First, create or get the product
    const products = await stripe.products.list({ limit: 100 });
    let product = products.data.find(p => p.name === productName);
    
    if (!product) {
      log(`Creating product: ${productName}`, "info");
      product = await stripe.products.create({
        name: productName,
        description: `ProInvoice ${productName} Plan`,
      });
      log(`✅ Product created: ${product.id}`, "success");
    } else {
      log(`✅ Product exists: ${product.id}`, "success");
    }

    // Create the price
    log(`Creating price: ${productName} - $${amount/100}/${interval}`, "info");
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount,
      currency: 'usd',
      recurring: {
        interval: interval,
      },
      lookup_key: lookupKey,
    });

    log(`✅ Price created: ${price.id}`, "success");
    return price;
  } catch (error) {
    log(`❌ Error creating price: ${error.message}`, "error");
    throw error;
  }
}

async function main() {
  log("=".repeat(60), "info");
  log("ProInvoice Stripe Price Setup", "info");
  log("=".repeat(60), "info");
  log("", "info");

  if (STRIPE_SECRET_KEY === "YOUR_STRIPE_SECRET_KEY_HERE") {
    log("❌ ERROR: Please set your STRIPE_SECRET_KEY", "error");
    log("", "info");
    log("Set it as an environment variable:", "warning");
    log("  export STRIPE_SECRET_KEY=sk_test_...", "warning");
    log("", "info");
    log("Or edit this file and replace YOUR_STRIPE_SECRET_KEY_HERE", "warning");
    process.exit(1);
  }

  const stripe = require('stripe')(STRIPE_SECRET_KEY);

  log("Creating new Stripe prices...", "info");
  log("", "info");

  const prices = {};

  try {
    // Starter Plan - $19/month, $190/year
    log("📦 STARTER PLAN", "info");
    prices.starter_monthly = await createStripePrice(
      stripe, 
      "Starter", 
      1900, // $19.00
      "month",
      "starter_monthly"
    );
    prices.starter_annual = await createStripePrice(
      stripe, 
      "Starter", 
      19000, // $190.00
      "year",
      "starter_annual"
    );
    log("", "info");

    // Pro Crew Plan - $49/month, $490/year
    log("📦 PRO CREW PLAN", "info");
    prices.pro_crew_monthly = await createStripePrice(
      stripe, 
      "Pro Crew", 
      4900, // $49.00
      "month",
      "pro_crew_monthly"
    );
    prices.pro_crew_annual = await createStripePrice(
      stripe, 
      "Pro Crew", 
      49000, // $490.00
      "year",
      "pro_crew_annual"
    );
    log("", "info");

    // Contractor Plus Plan - $99/month, $990/year
    log("📦 CONTRACTOR PLUS PLAN", "info");
    prices.contractor_plus_monthly = await createStripePrice(
      stripe, 
      "Contractor Plus", 
      9900, // $99.00
      "month",
      "contractor_plus_monthly"
    );
    prices.contractor_plus_annual = await createStripePrice(
      stripe, 
      "Contractor Plus", 
      99000, // $990.00
      "year",
      "contractor_plus_annual"
    );
    log("", "info");

    // Display results
    log("=".repeat(60), "success");
    log("✅ ALL PRICES CREATED SUCCESSFULLY!", "success");
    log("=".repeat(60), "success");
    log("", "info");
    log("📋 COPY THESE PRICE IDs TO YOUR CODE:", "warning");
    log("", "info");
    log("const PRICE_IDS = {", "info");
    log(`  starter_monthly: "${prices.starter_monthly.id}",      // $19/month`, "info");
    log(`  starter_annual: "${prices.starter_annual.id}",       // $190/year`, "info");
    log(`  pro_crew_monthly: "${prices.pro_crew_monthly.id}",       // $49/month`, "info");
    log(`  pro_crew_annual: "${prices.pro_crew_annual.id}",        // $490/year`, "info");
    log(`  contractor_plus_monthly: "${prices.contractor_plus_monthly.id}",     // $99/month`, "info");
    log(`  contractor_plus_annual: "${prices.contractor_plus_annual.id}",      // $990/year`, "info");
    log("};", "info");
    log("", "info");
    log("=".repeat(60), "info");
    log("📝 NEXT STEPS:", "warning");
    log("", "info");
    log("1. Copy the price IDs above", "info");
    log("2. Update supabase/functions/create-checkout/index.ts", "info");
    log("3. Update the PRICE_IDS constant with these new IDs", "info");
    log("4. Deploy the updated function to Supabase", "info");
    log("5. Test the payment flow!", "info");
    log("", "info");
    log("=".repeat(60), "info");

    // Save to file for reference
    const fs = require('fs');
    const output = {
      created_at: new Date().toISOString(),
      prices: {
        starter_monthly: { id: prices.starter_monthly.id, amount: "$19/month" },
        starter_annual: { id: prices.starter_annual.id, amount: "$190/year" },
        pro_crew_monthly: { id: prices.pro_crew_monthly.id, amount: "$49/month" },
        pro_crew_annual: { id: prices.pro_crew_annual.id, amount: "$490/year" },
        contractor_plus_monthly: { id: prices.contractor_plus_monthly.id, amount: "$99/month" },
        contractor_plus_annual: { id: prices.contractor_plus_annual.id, amount: "$990/year" },
      }
    };

    fs.writeFileSync('stripe-price-ids.json', JSON.stringify(output, null, 2));
    log("✅ Price IDs saved to stripe-price-ids.json", "success");

  } catch (error) {
    log("", "info");
    log("=".repeat(60), "error");
    log("❌ ERROR OCCURRED", "error");
    log("=".repeat(60), "error");
    log(error.message, "error");
    log("", "info");
    process.exit(1);
  }
}

// Check if stripe module is installed
try {
  require('stripe');
} catch (error) {
  log("❌ ERROR: Stripe module not found", "error");
  log("", "info");
  log("Please install it first:", "warning");
  log("  npm install stripe", "warning");
  log("", "info");
  process.exit(1);
}

main();

