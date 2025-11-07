# Stripe Price Update Guide

**Date:** November 7, 2025  
**Purpose:** Update Stripe prices to match your pricing page ($19/$49/$99)

---

## 🎯 Current Situation

### Your Pricing Page Shows:
- **Starter:** $19/month
- **Pro Crew:** $49/month  
- **Contractor Plus:** $99/month

### Your Stripe Currently Has:
- **Lite:** $9/month (price_1SCDIjGpz30x93KjADgoYSMS)
- **Pro:** $19/month (price_1SCDJ4Gpz30x93KjNOLCJgNK)
- **Agency:** $39/month (price_1SCDKrGpz30x93KjeKGawyGN)

### ⚠️ Problem:
**Mismatch!** We need to create new Stripe prices for $19/$49/$99.

---

## 📋 Step-by-Step Instructions

### **STEP 1: Get Your Stripe Secret Key**

1. Go to https://dashboard.stripe.com
2. Make sure you're in **Test Mode** (toggle in top right)
3. Click **Developers** → **API Keys**
4. Copy your **Secret key** (starts with `sk_test_...`)

⚠️ **IMPORTANT:** Start with Test Mode first! Only use Live Mode after testing.

---

### **STEP 2: Run the Setup Script**

Open your terminal in the project folder and run:

```bash
# Install Stripe if not already installed
npm install stripe

# Set your Stripe secret key (replace with your actual key)
export STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE

# Run the setup script
node setup-new-stripe-prices.js
```

**On Windows PowerShell:**
```powershell
$env:STRIPE_SECRET_KEY="sk_test_YOUR_KEY_HERE"
node setup-new-stripe-prices.js
```

This will:
- ✅ Create 3 products in Stripe (Starter, Pro Crew, Contractor Plus)
- ✅ Create 6 prices (monthly + annual for each)
- ✅ Generate price IDs for you to use
- ✅ Save results to `stripe-price-ids.json`

---

### **STEP 3: Copy the Price IDs**

The script will output something like:

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

**Copy these IDs!** You'll need them in the next step.

---

### **STEP 4: Update Your Code**

I'll update these files for you with the new price IDs:

1. ✅ `supabase/functions/create-checkout/index.ts` - Main checkout function
2. ✅ `supabase/functions/stripe-webhook/index.ts` - Webhook handler
3. ✅ `src/pages/Pricing.tsx` - Add checkout buttons
4. ✅ `src/pages/SubscriptionManagement.tsx` - Update displayed prices

**But first, you need to run the script to get the price IDs!**

---

### **STEP 5: Deploy to Supabase**

After I update the code with your new price IDs:

```bash
# Deploy the updated functions
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
```

---

### **STEP 6: Test the Payment Flow**

1. Go to https://www.proinvoice.app/pricing
2. Click "Start Free Trial" on any plan
3. Complete signup
4. You should be redirected to Stripe Checkout
5. Use test card: `4242 4242 4242 4242`
6. Complete payment
7. Check Stripe Dashboard → You should see the test payment!

---

## 🎯 What Each Plan Includes

Based on your pricing page, here's what I'll configure:

### **Starter - $19/month ($190/year)**
- Unlimited job bids
- Deposit collection
- Mobile-optimized
- Basic templates
- Email support
- Up to 25 jobs/month

### **Pro Crew - $49/month ($490/year)** ⭐ Most Popular
- Everything in Starter
- Progress payments
- Change order management
- Custom branding
- Priority support
- Unlimited jobs
- Compliance doc tracking
- Job pipeline dashboard

### **Contractor Plus - $99/month ($990/year)**
- Everything in Pro Crew
- Multi-user accounts
- Subcontractor management
- Advanced reporting
- API access
- White-label option
- Dedicated support
- Custom integrations

---

## 💰 Revenue Calculation

### Monthly Plans:
- **Starter:** $19/month × 12 = $228/year per user
- **Pro Crew:** $49/month × 12 = $588/year per user
- **Contractor Plus:** $99/month × 12 = $1,188/year per user

### Annual Plans (Save ~17%):
- **Starter:** $190/year (save $38)
- **Pro Crew:** $490/year (save $98)
- **Contractor Plus:** $990/year (save $198)

### If you get 100 users on Pro Crew:
- **Monthly:** $49 × 100 = **$4,900/month** = **$58,800/year**
- **Annual:** $490 × 100 = **$49,000 upfront**

---

## 🔧 Troubleshooting

### "Stripe module not found"
```bash
npm install stripe
```

### "STRIPE_SECRET_KEY not set"
Make sure you exported it:
```bash
export STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

### "Authentication failed"
- Check your secret key is correct
- Make sure it starts with `sk_test_` (test mode) or `sk_live_` (live mode)
- Verify you copied the entire key

### "Price already exists"
That's OK! The script will use the existing price.

---

## ⚠️ Important Notes

1. **Test Mode First:** Always test with `sk_test_` keys before going live
2. **Keep Old Prices:** Don't delete your old Stripe prices - existing customers may be using them
3. **Webhook Setup:** Make sure your Stripe webhook is configured (already done)
4. **Live Mode:** When ready, repeat this process with `sk_live_` keys

---

## 🚀 After Setup

Once complete, you'll have:
- ✅ New Stripe prices matching your pricing page
- ✅ Working checkout flow
- ✅ Automatic subscription billing
- ✅ Webhook handling for payments
- ✅ Ready to accept real money!

---

## 📞 Next Steps

1. **Run the script** to create Stripe prices
2. **Give me the price IDs** from the output
3. **I'll update your code** with the new IDs
4. **Deploy to Supabase**
5. **Test the payment flow**
6. **Go live and start earning!** 💰

---

**Ready to proceed?** Run the script and share the price IDs with me!

