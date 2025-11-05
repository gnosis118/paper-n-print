# 🔄 Stripe Sync - Complete Setup Guide

**Date:** November 5, 2025  
**Status:** ✅ Ready to Sync

---

## 🎯 What's the Problem?

You have Stripe keys configured, but:
- ❌ No customers in Stripe dashboard
- ❌ No subscriptions in Stripe dashboard
- ✅ Backend is working correctly
- ✅ Database is ready

**Solution:** Sync your Supabase users to Stripe and create test subscriptions.

---

## 📋 What You Need

### 1. Supabase Service Role Key
- **Where:** https://app.supabase.com/project/hkzrfqpnkvpmsaeluksh/settings/api
- **What:** Copy the "Service Role" secret key
- **Format:** Long string starting with `eyJ...`

### 2. Stripe Secret Key
- **Where:** https://dashboard.stripe.com/apikeys
- **What:** Copy the "Secret key" (not Publishable key)
- **Format:** Starts with `sk_test_` or `sk_live_`

---

## 🚀 Quick Start (3 Steps)

### Step 1: Get Your Keys
```
Supabase Service Role Key: [Copy from settings]
Stripe Secret Key: [Copy from dashboard]
```

### Step 2: Set Environment Variables

**Windows (PowerShell):**
```powershell
$env:SUPABASE_SERVICE_ROLE_KEY = "your_service_role_key"
$env:STRIPE_SECRET_KEY = "your_stripe_secret_key"
```

**Mac/Linux (Terminal):**
```bash
export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"
export STRIPE_SECRET_KEY="your_stripe_secret_key"
```

### Step 3: Run the Sync Script
```bash
node sync-stripe-customers-subscriptions.js
```

---

## ✅ What Happens

The script will:

1. **Fetch all users** from Supabase
2. **Create Stripe customers** for each user
3. **Create test subscriptions** (Pro plan, monthly)
4. **Update database** with Stripe IDs
5. **Print results** showing what was created

---

## 📊 Expected Results

After running the script:

### In Stripe Dashboard
- ✅ New customers appear in https://dashboard.stripe.com/customers
- ✅ Each customer has a subscription
- ✅ Subscriptions show "Pro" plan at $19/month

### In Supabase Database
- ✅ `user_subscriptions` table updated with:
  - `stripe_customer_id` - Customer ID from Stripe
  - `stripe_subscription_id` - Subscription ID from Stripe
  - `status` - Set to "active"
  - `plan` - Set to "paid"

---

## 🔍 Verify the Sync

### Check Stripe
1. Go to https://dashboard.stripe.com/customers
2. You should see your users listed
3. Click on a customer to see their subscription

### Check Supabase
1. Go to https://app.supabase.com/project/hkzrfqpnkvpmsaeluksh/editor/user_subscriptions
2. Look for populated `stripe_customer_id` and `stripe_subscription_id` columns

---

## 🎯 What Gets Created

### Stripe Customers
- Email: User's email from Supabase
- Name: User's email prefix
- Metadata: Supabase user ID
- Description: "ProInvoice user - [email]"

### Subscriptions
- Plan: Pro ($19/month)
- Status: Active
- Billing: Monthly
- Metadata: Test subscription flag

---

## 📁 Files

- **sync-stripe-customers-subscriptions.js** - The sync script
- **STRIPE_SYNC_INSTRUCTIONS.md** - Detailed instructions
- **STRIPE_SYNC_SUMMARY.md** - This file

---

## ⚠️ Important Notes

### Before Running
- ✅ Make sure you have users in Supabase
- ✅ Make sure Stripe keys are correct
- ✅ Make sure you're in test mode (sk_test_)

### After Running
- ✅ Check Stripe dashboard for customers
- ✅ Check Supabase for updated records
- ✅ Test the checkout flow
- ✅ Verify webhooks are working

---

## 🔧 Troubleshooting

| Error | Solution |
|-------|----------|
| "SUPABASE_SERVICE_ROLE_KEY not set" | Set the environment variable with your key |
| "STRIPE_SECRET_KEY not set" | Set the environment variable with your key |
| "Invalid JWT" | Your Service Role Key is wrong, copy it again |
| "Invalid API Key" | Your Stripe Secret Key is wrong, copy it again |
| "No users found" | Create a test user first by signing up |
| "Failed to update database" | Check your Service Role Key has full permissions |

---

## 🎉 Next Steps

After syncing:

1. ✅ Verify customers in Stripe dashboard
2. ✅ Verify subscriptions in Stripe dashboard
3. ✅ Verify database updates in Supabase
4. ✅ Test checkout flow with a real user
5. ✅ Verify webhooks are working
6. ✅ Test subscription management
7. ✅ Deploy to production

---

## 📞 Support

If you need help:

1. Check the error message carefully
2. Verify your keys are correct
3. Make sure you have users in Supabase
4. Check Stripe dashboard for any errors
5. Review the detailed instructions in STRIPE_SYNC_INSTRUCTIONS.md

---

## 🚀 Ready?

You have everything you need. Follow the 3 steps above and your Stripe dashboard will be populated with customers and subscriptions!

**Let's sync! 🎉**

---

**Generated:** 2025-11-05  
**Status:** ✅ Ready to Use

