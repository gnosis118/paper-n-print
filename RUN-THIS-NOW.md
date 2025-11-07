# 🚀 RUN THIS NOW - Create Stripe Prices

## Step 1: Get Your Stripe Secret Key

1. Go to https://dashboard.stripe.com
2. **Make sure you're in TEST MODE** (toggle in top right)
3. Click **Developers** → **API Keys**
4. Copy your **Secret key** (starts with `sk_test_...`)

## Step 2: Run the PowerShell Script

Open PowerShell in this folder and run:

```powershell
.\setup-stripe-prices.ps1 -StripeSecretKey "sk_test_YOUR_KEY_HERE"
```

**Replace `sk_test_YOUR_KEY_HERE` with your actual Stripe secret key!**

## Step 3: Copy the Output

The script will output price IDs like this:

```javascript
const PRICE_IDS = {
  starter_monthly: "price_ABC123...",
  starter_annual: "price_DEF456...",
  pro_crew_monthly: "price_GHI789...",
  pro_crew_annual: "price_JKL012...",
  contractor_plus_monthly: "price_MNO345...",
  contractor_plus_annual: "price_PQR678...",
  template_onetime: "price_1SCDMZGpz30x93Kj3kh1GXZS",
  template_trial: "price_1SCDMkGpz30x93KjqjZ806yi"
};
```

## Step 4: Tell Me the Price IDs

Copy all 6 new price IDs and paste them here so I can update your code!

---

## Alternative: Manual Creation in Stripe Dashboard

If the script doesn't work, you can create prices manually:

### Create Starter Plan:
1. Go to https://dashboard.stripe.com/test/products
2. Click **Add product**
3. Name: **Starter**
4. Description: **ProInvoice Starter Plan**
5. Click **Add pricing**
   - **Monthly:** $19.00 USD, Recurring: Monthly
   - Click **Add another price**
   - **Annual:** $190.00 USD, Recurring: Yearly
6. Click **Save product**
7. Copy both price IDs (they start with `price_...`)

### Create Pro Crew Plan:
1. Click **Add product**
2. Name: **Pro Crew**
3. Description: **ProInvoice Pro Crew Plan**
4. Add pricing:
   - **Monthly:** $49.00 USD, Recurring: Monthly
   - **Annual:** $490.00 USD, Recurring: Yearly
5. Save and copy price IDs

### Create Contractor Plus Plan:
1. Click **Add product**
2. Name: **Contractor Plus**
3. Description: **ProInvoice Contractor Plus Plan**
4. Add pricing:
   - **Monthly:** $99.00 USD, Recurring: Monthly
   - **Annual:** $990.00 USD, Recurring: Yearly
5. Save and copy price IDs

---

## What I Need From You:

Please provide the 6 price IDs in this format:

```
starter_monthly: price_XXXXX
starter_annual: price_XXXXX
pro_crew_monthly: price_XXXXX
pro_crew_annual: price_XXXXX
contractor_plus_monthly: price_XXXXX
contractor_plus_annual: price_XXXXX
```

Once you give me these, I'll update all your code automatically!

