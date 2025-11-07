# 🚀 ProInvoice Stripe Setup Instructions

**Updated:** November 7, 2025  
**Goal:** Configure Stripe to match your pricing page ($19/$49/$99)

---

## ✅ What I've Done For You

I've updated your code to support the new pricing structure:

### Files Updated:
1. ✅ **supabase/functions/create-checkout/index.ts** - Ready for new price IDs
2. ✅ **supabase/functions/stripe-webhook/index.ts** - Updated to handle new tiers
3. ✅ **src/pages/Pricing.tsx** - Added Stripe checkout integration
4. ✅ **setup-new-stripe-prices.js** - Script to create Stripe prices

### New Pricing Structure:
- **Starter:** $19/month ($190/year) - 25 jobs/month
- **Pro Crew:** $49/month ($490/year) - Unlimited jobs ⭐ Most Popular
- **Contractor Plus:** $99/month ($990/year) - Unlimited jobs + Enterprise features

---

## 📋 What You Need To Do

### **STEP 1: Install Stripe Package**

```bash
npm install stripe
```

---

### **STEP 2: Get Your Stripe Secret Key**

1. Go to https://dashboard.stripe.com
2. **Toggle to TEST MODE** (top right corner - should say "Test mode")
3. Click **Developers** → **API Keys**
4. Copy your **Secret key** (starts with `sk_test_...`)

⚠️ **IMPORTANT:** Use TEST MODE first! Only switch to live mode after testing.

---

### **STEP 3: Run the Setup Script**

**On Mac/Linux:**
```bash
export STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
node setup-new-stripe-prices.js
```

**On Windows PowerShell:**
```powershell
$env:STRIPE_SECRET_KEY="sk_test_YOUR_ACTUAL_KEY_HERE"
node setup-new-stripe-prices.js
```

**On Windows CMD:**
```cmd
set STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
node setup-new-stripe-prices.js
```

This script will:
- ✅ Create 3 products in Stripe (Starter, Pro Crew, Contractor Plus)
- ✅ Create 6 prices (monthly + annual for each plan)
- ✅ Output the price IDs you need
- ✅ Save results to `stripe-price-ids.json`

---

### **STEP 4: Copy the Price IDs**

The script will output something like this:

```javascript
const PRICE_IDS = {
  starter_monthly: "price_ABC123...",      // $19/month
  starter_annual: "price_DEF456...",       // $190/year
  pro_crew_monthly: "price_GHI789...",     // $49/month
  pro_crew_annual: "price_JKL012...",      // $490/year
  contractor_plus_monthly: "price_MNO345...", // $99/month
  contractor_plus_annual: "price_PQR678...",  // $990/year
};
```

**COPY ALL 6 PRICE IDs!**

---

### **STEP 5: Update create-checkout Function**

Open `supabase/functions/create-checkout/index.ts` and find this section (around line 16):

```typescript
const PRICE_IDS = {
  // Starter Plan - $19/month, $190/year
  starter_monthly: "REPLACE_WITH_STARTER_MONTHLY_PRICE_ID",      // $19/month
  starter_annual: "REPLACE_WITH_STARTER_ANNUAL_PRICE_ID",        // $190/year
  
  // Pro Crew Plan - $49/month, $490/year
  pro_crew_monthly: "REPLACE_WITH_PRO_CREW_MONTHLY_PRICE_ID",    // $49/month
  pro_crew_annual: "REPLACE_WITH_PRO_CREW_ANNUAL_PRICE_ID",      // $490/year
  
  // Contractor Plus Plan - $99/month, $990/year
  contractor_plus_monthly: "REPLACE_WITH_CONTRACTOR_PLUS_MONTHLY_PRICE_ID",  // $99/month
  contractor_plus_annual: "REPLACE_WITH_CONTRACTOR_PLUS_ANNUAL_PRICE_ID",    // $990/year
  
  // Template purchases (keep existing)
  template_onetime: "price_1SCDMZGpz30x93Kj3kh1GXZS",   // $10 one-time
  template_trial: "price_1SCDMkGpz30x93KjqjZ806yi"      // $5 trial
} as const;
```

**Replace each "REPLACE_WITH_..." with the actual price IDs from Step 4.**

Example:
```typescript
const PRICE_IDS = {
  starter_monthly: "price_1ABC123xyz",      // $19/month
  starter_annual: "price_1DEF456xyz",       // $190/year
  pro_crew_monthly: "price_1GHI789xyz",     // $49/month
  pro_crew_annual: "price_1JKL012xyz",      // $490/year
  contractor_plus_monthly: "price_1MNO345xyz",  // $99/month
  contractor_plus_annual: "price_1PQR678xyz",    // $990/year
  template_onetime: "price_1SCDMZGpz30x93Kj3kh1GXZS",
  template_trial: "price_1SCDMkGpz30x93KjqjZ806yi"
} as const;
```

---

### **STEP 6: Deploy to Supabase**

```bash
# Deploy the updated checkout function
supabase functions deploy create-checkout

# Deploy the updated webhook function
supabase functions deploy stripe-webhook
```

If you don't have Supabase CLI installed:
```bash
npm install -g supabase
supabase login
```

---

### **STEP 7: Configure Stripe Webhook**

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **Add endpoint**
3. Enter your webhook URL:
   ```
   https://YOUR_PROJECT_ID.supabase.co/functions/v1/stripe-webhook
   ```
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_...`)

---

### **STEP 8: Add Webhook Secret to Supabase**

```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

---

### **STEP 9: Test the Payment Flow!**

1. Go to https://www.proinvoice.app/pricing
2. Click **"Start Free Trial"** on any plan
3. If not logged in, you'll be redirected to sign up
4. After signup, you'll be redirected to Stripe Checkout
5. Use test card: **4242 4242 4242 4242**
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)
6. Complete the payment
7. You should be redirected back to your site
8. Check Stripe Dashboard → You should see the test payment!

---

## 🎯 Verification Checklist

After completing all steps, verify:

- [ ] Script ran successfully and created 6 prices
- [ ] Price IDs copied to `create-checkout/index.ts`
- [ ] Functions deployed to Supabase
- [ ] Webhook endpoint created in Stripe
- [ ] Webhook secret added to Supabase
- [ ] Test payment completed successfully
- [ ] User subscription shows in database
- [ ] User can access Pro features

---

## 🔄 Going Live (After Testing)

Once everything works in test mode:

1. **Switch to Live Mode** in Stripe Dashboard
2. **Get live API keys** (start with `sk_live_...`)
3. **Run the script again** with live keys:
   ```bash
   export STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY_HERE
   node setup-new-stripe-prices.js
   ```
4. **Update Supabase secrets** with live keys:
   ```bash
   supabase secrets set STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY_HERE
   ```
5. **Update create-checkout** with live price IDs
6. **Deploy functions** again
7. **Create live webhook** endpoint
8. **Update webhook secret**:
   ```bash
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET
   ```
9. **Test with real card** (will charge real money!)
10. **Start accepting real payments!** 💰

---

## 💰 Expected Revenue

### If you get 100 customers:

**Starter Plan ($19/month):**
- 100 users × $19 = **$1,900/month** = **$22,800/year**

**Pro Crew Plan ($49/month):**
- 100 users × $49 = **$4,900/month** = **$58,800/year**

**Contractor Plus Plan ($99/month):**
- 100 users × $99 = **$9,900/month** = **$118,800/year**

**Mixed (realistic scenario):**
- 50 Starter + 40 Pro Crew + 10 Contractor Plus
- = $950 + $1,960 + $990
- = **$3,900/month** = **$46,800/year**

---

## 🆘 Troubleshooting

### "Stripe module not found"
```bash
npm install stripe
```

### "STRIPE_SECRET_KEY not set"
Make sure you exported it correctly. Try:
```bash
echo $STRIPE_SECRET_KEY  # Mac/Linux
echo %STRIPE_SECRET_KEY%  # Windows CMD
echo $env:STRIPE_SECRET_KEY  # Windows PowerShell
```

### "Authentication failed"
- Verify your secret key is correct
- Make sure it starts with `sk_test_` (test) or `sk_live_` (live)
- Copy the entire key without spaces

### "Webhook signature verification failed"
- Make sure webhook secret is set in Supabase
- Verify the webhook URL is correct
- Check that you selected the right events

### "No checkout URL received"
- Check Supabase function logs
- Verify price IDs are correct
- Make sure user is authenticated

---

## 📞 Need Help?

If you get stuck:

1. Check `stripe-price-ids.json` for your price IDs
2. Check Supabase function logs: `supabase functions logs create-checkout`
3. Check Stripe Dashboard → Developers → Logs
4. Verify all environment variables are set

---

## ✅ Summary

You're setting up:
- ✅ 3 subscription plans ($19, $49, $99)
- ✅ Monthly and annual billing options
- ✅ Automatic recurring payments
- ✅ Webhook handling for subscriptions
- ✅ User account upgrades
- ✅ Ready to accept real money!

**Start with Step 1 and work through each step carefully. You've got this!** 🚀

