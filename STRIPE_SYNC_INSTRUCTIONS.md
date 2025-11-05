# 🔄 Stripe Sync Instructions

## Problem
No customers or subscriptions are showing in your Stripe dashboard, even though the backend is configured.

## Solution
We need to sync your Supabase users with Stripe and create test subscriptions.

---

## 📋 Step 1: Get Your Supabase Service Role Key

1. Go to: **https://app.supabase.com/project/hkzrfqpnkvpmsaeluksh/settings/api**
2. Look for **"Service Role"** section
3. Copy the secret key (it's a long string starting with `eyJ...`)
4. **Keep this safe** - it's like a master password

---

## 📋 Step 2: Get Your Stripe Secret Key

1. Go to: **https://dashboard.stripe.com/apikeys**
2. Look for **"Secret key"** (not Publishable key)
3. Copy it (starts with `sk_test_` or `sk_live_`)
4. **Keep this safe** - never share it

---

## 🚀 Step 3: Run the Sync Script

### On Windows (PowerShell):
```powershell
# Set the environment variables
$env:SUPABASE_SERVICE_ROLE_KEY = "your_service_role_key_here"
$env:STRIPE_SECRET_KEY = "your_stripe_secret_key_here"

# Run the sync script
node sync-stripe-customers-subscriptions.js
```

### On Mac/Linux (Terminal):
```bash
# Set the environment variables
export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
export STRIPE_SECRET_KEY="your_stripe_secret_key_here"

# Run the sync script
node sync-stripe-customers-subscriptions.js
```

---

## ✅ What the Script Does

1. **Fetches all users** from your Supabase database
2. **Creates Stripe customers** for each user (or finds existing ones)
3. **Creates test subscriptions** (Pro plan, monthly)
4. **Updates your database** with Stripe customer and subscription IDs
5. **Prints a summary** of what was created

---

## 📊 Expected Output

```
[INFO] 🚀 Starting Stripe Sync...
[INFO] Fetching all users from Supabase...
[SUCCESS] Found 3 users

[INFO] [1/3] Processing: user1@example.com
[SUCCESS]   ✅ Created new Stripe customer: cus_xxxxx
[SUCCESS]   ✅ Created subscription: sub_xxxxx
[INFO]   ✅ Updated database with Stripe IDs

[INFO] [2/3] Processing: user2@example.com
[INFO]   ✅ Found existing Stripe customer: cus_yyyyy
[SUCCESS]   ✅ Created subscription: sub_yyyyy
[INFO]   ✅ Updated database with Stripe IDs

[INFO] [3/3] Processing: user3@example.com
[INFO]   ✅ Found existing Stripe customer: cus_zzzzz
[INFO]   ℹ️  Subscription already exists: sub_zzzzz

📊 SYNC COMPLETE
Users Processed: 3
Customers Created: 1
Customers Found: 2
Subscriptions Created: 2
```

---

## ✅ Verify the Sync

### Check Stripe Dashboard
1. Go to **https://dashboard.stripe.com/customers**
2. You should see your users listed as customers
3. Click on a customer to see their subscription

### Check Supabase Database
1. Go to **https://app.supabase.com/project/hkzrfqpnkvpmsaeluksh/editor/user_subscriptions**
2. You should see `stripe_customer_id` and `stripe_subscription_id` populated

---

## 🔧 Troubleshooting

### Error: "Invalid JWT"
- Your Service Role Key is wrong
- Copy it again from Supabase settings

### Error: "Invalid API Key"
- Your Stripe Secret Key is wrong
- Copy it again from Stripe dashboard

### Error: "No users found"
- You don't have any users in Supabase yet
- Create a test user first by signing up on your app

### Error: "Failed to update database"
- Your Service Role Key doesn't have permission
- Make sure you copied the full key

---

## 🎯 Next Steps

After syncing:

1. ✅ Check Stripe dashboard for customers
2. ✅ Check Supabase for updated subscription records
3. ✅ Test the checkout flow with a real user
4. ✅ Verify webhooks are working

---

## 📁 Files

- **sync-stripe-customers-subscriptions.js** - The sync script
- **STRIPE_SYNC_INSTRUCTIONS.md** - This file

---

## ❓ Questions?

If something goes wrong:
1. Check the error message carefully
2. Verify your keys are correct
3. Make sure you have users in Supabase
4. Check Stripe dashboard for any errors

---

**Ready? Let's sync! 🚀**

