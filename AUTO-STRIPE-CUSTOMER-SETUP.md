# Automatic Stripe Customer Creation - Setup Guide

**Date:** October 13, 2025
**Status:** Ready to Deploy

---

## 🎯 WHAT THIS DOES

Automatically creates Stripe customers for every new user that signs up on ProInvoice.app!

### **Before:**
- ❌ Users sign up but no Stripe customer created
- ❌ Manual CSV import needed
- ❌ Stripe customer ID is null in database
- ❌ Can't upgrade until customer is created

### **After:**
- ✅ User signs up → Stripe customer created automatically
- ✅ Stripe customer ID saved to database immediately
- ✅ Ready to upgrade to paid plans instantly
- ✅ No manual work needed

---

## 📦 WHAT WAS CREATED

### **1. Edge Function: `create-stripe-customer`**
**File:** `supabase/functions/create-stripe-customer/index.ts`

**What it does:**
- Receives webhook when new user signs up
- Creates Stripe customer with user's email
- Links Stripe customer ID to user_subscriptions table
- Handles duplicate prevention (checks if customer exists)

**Features:**
- ✅ Automatic customer creation
- ✅ Duplicate prevention
- ✅ Metadata tracking (Supabase user ID)
- ✅ Error handling and logging

---

### **2. Database Migration: Auto-trigger**
**File:** `supabase/migrations/20251013000000_auto_create_stripe_customers.sql`

**What it does:**
- Creates database trigger on `auth.users` table
- Fires when new user is inserted
- Calls the `create-stripe-customer` Edge Function
- Uses pg_net extension for async HTTP requests

**Features:**
- ✅ Automatic trigger on signup
- ✅ Async processing (doesn't slow down signup)
- ✅ Secure (uses service role key)

---

### **3. Backfill Function: `backfill-stripe-customers`**
**File:** `supabase/functions/backfill-stripe-customers/index.ts`

**What it does:**
- Creates Stripe customers for existing users
- One-time run to catch up on existing users
- Updates all user_subscriptions with Stripe customer IDs

**Use case:**
- Run once to create Stripe customers for your 3 existing users
- Then the automatic trigger handles all new signups

---

## 🚀 DEPLOYMENT STEPS

### **STEP 1: Deploy the Edge Functions**

```bash
# Navigate to your project directory
cd f:\Documents\GitHub\paper-n-print

# Deploy the create-stripe-customer function
supabase functions deploy create-stripe-customer

# Deploy the backfill function
supabase functions deploy backfill-stripe-customers
```

---

### **STEP 2: Run the Database Migration**

```bash
# Apply the migration to create the trigger
supabase db push
```

**Or manually in Supabase Dashboard:**
1. Go to SQL Editor
2. Copy contents of `supabase/migrations/20251013000000_auto_create_stripe_customers.sql`
3. Run the SQL

---

### **STEP 3: Backfill Existing Users**

This creates Stripe customers for your 3 existing users.

**Option A: Using curl**
```bash
curl -X POST https://hkzrfqpnkvpmsaeluksh.supabase.co/functions/v1/backfill-stripe-customers \
  -H "Authorization: Bearer YOUR_USER_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Option B: Using Supabase Dashboard**
1. Go to Edge Functions
2. Find `backfill-stripe-customers`
3. Click "Invoke"
4. Add your JWT token in headers

**Option C: I can run it for you via API**
Just say "run the backfill" and I'll execute it!

---

### **STEP 4: Verify It Works**

After deployment, test with a new signup:

1. Create a test account on your site
2. Check Supabase `user_subscriptions` table
3. Verify `stripe_customer_id` is populated
4. Check Stripe Dashboard → Customers
5. Confirm new customer appears

---

## 🔧 HOW IT WORKS

### **Flow Diagram:**

```
1. User signs up on ProInvoice.app
   ↓
2. Supabase creates user in auth.users
   ↓
3. Database trigger fires: on_auth_user_created_stripe_customer
   ↓
4. Trigger calls Edge Function: create-stripe-customer
   ↓
5. Edge Function creates Stripe customer
   ↓
6. Edge Function updates user_subscriptions table
   ↓
7. User now has stripe_customer_id in database
   ↓
8. User can upgrade to paid plans immediately!
```

---

## 📊 WHAT GETS CREATED IN STRIPE

For each new user, a Stripe customer is created with:

```javascript
{
  email: "user@example.com",
  name: "User Name or Email Prefix",
  description: "ProInvoice user - user@example.com",
  metadata: {
    supabase_user_id: "uuid-here",
    business_name: "Business Name (if provided)"
  }
}
```

---

## 🔍 MONITORING & DEBUGGING

### **Check if it's working:**

**1. Check Supabase Logs:**
```bash
supabase functions logs create-stripe-customer
```

**2. Check Database:**
```sql
SELECT 
  us.user_id,
  au.email,
  us.stripe_customer_id,
  us.created_at
FROM user_subscriptions us
LEFT JOIN auth.users au ON us.user_id = au.id
ORDER BY us.created_at DESC;
```

**3. Check Stripe Dashboard:**
- Go to Customers
- Filter by "Created" date
- Look for recent customers

---

## ⚠️ IMPORTANT NOTES

### **1. Service Role Key Required**
The migration uses `app.settings.service_role_key` setting. You may need to set this:

```sql
-- Set the service role key (run once)
ALTER DATABASE postgres SET app.settings.service_role_key = 'your-service-role-key-here';
```

**Or update the migration to use a different method** (I can help with this).

---

### **2. Duplicate Prevention**
The function checks if a Stripe customer already exists with the email before creating a new one. This prevents duplicates.

---

### **3. Async Processing**
The trigger uses `pg_net.http_post()` which is asynchronous. This means:
- ✅ Signup is not slowed down
- ✅ User doesn't wait for Stripe API
- ⚠️ Small delay (1-2 seconds) before customer ID appears in database

---

### **4. Error Handling**
If Stripe customer creation fails:
- User can still sign up and use free plan
- Customer creation can be retried manually
- Backfill function can catch missed users

---

## 🎯 EXISTING USERS (BACKFILL)

Your 3 existing users need Stripe customers created:

1. **chorva.galemski24@gmail.com**
2. **lyannatarly.518560@gmail.com**
3. **gavinvclay@gmail.com**

**Run the backfill function to create customers for them!**

---

## 📝 TESTING CHECKLIST

After deployment:

- [ ] Deploy Edge Functions
- [ ] Run database migration
- [ ] Run backfill for existing users
- [ ] Verify existing users have `stripe_customer_id`
- [ ] Create test account
- [ ] Verify new user gets `stripe_customer_id` automatically
- [ ] Check Stripe Dashboard for new customers
- [ ] Test upgrade flow (should work seamlessly)

---

## 🔄 ALTERNATIVE: Simpler Approach

If the database trigger approach is too complex, I can create a simpler version that:

1. Calls the Edge Function directly from your signup code
2. No database triggers needed
3. More control over when it runs

**Would you prefer this approach instead?**

---

## 💡 NEXT STEPS

**Choose one:**

**Option 1: Deploy Everything (Recommended)**
- I'll help you deploy the Edge Functions
- Run the migration
- Backfill existing users
- Test with new signup

**Option 2: Simpler Client-Side Approach**
- I'll modify your signup code to call Stripe directly
- No database triggers
- Easier to debug

**Option 3: Manual for Now**
- Keep using CSV import
- Add automatic creation later

---

## 🚀 READY TO DEPLOY?

Just say:
- **"Deploy it"** - I'll guide you through deployment
- **"Run backfill"** - I'll create Stripe customers for existing users
- **"Simpler approach"** - I'll create client-side version
- **"Test it first"** - I'll help you test locally

---

**What would you like to do?**

