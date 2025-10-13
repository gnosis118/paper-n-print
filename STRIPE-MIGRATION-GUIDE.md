# Stripe Billing Migration Guide for ProInvoice.app

**Date:** October 12, 2025
**File:** `stripe-billing-migration.csv`

---

## 📋 YOUR STRIPE PRICE IDs

Based on your codebase, here are your Stripe Price IDs:

### **Monthly Plans:**
- **Lite Monthly:** `price_1SCDIjGpz30x93KjADgoYSMS` ($9/month)
- **Pro Monthly:** `price_1SCDJ4Gpz30x93KjNOLCJgNK` ($19/month)
- **Agency Monthly:** `price_1SCDKrGpz30x93KjeKGawyGN` ($39/month)

### **Annual Plans:**
- **Lite Annual:** `price_1SCDIvGpz30x93KjDmPo4w2a` ($90/year)
- **Pro Annual:** `price_1SCDJFGpz30x93KjrppMsUf7` ($190/year)
- **Agency Annual:** `price_1SCDMRGpz30x93KjRMUamIOP` ($390/year)

---

## 👥 YOUR CURRENT USERS

**Total Users:** 3
**All on Free Plan:** Yes

1. **chorva.galemski24@gmail.com**
   - User ID: `6615a994-e8fe-4b61-84db-9d3dfa9741b4`
   - Joined: Oct 1, 2025
   - Plan: Free

2. **lyannatarly.518560@gmail.com**
   - User ID: `a79ccd37-664e-4b1f-858f-c3664bf311ac`
   - Joined: Sep 29, 2025
   - Plan: Free

3. **gavinvclay@gmail.com**
   - User ID: `7dd4768b-91e9-4ef0-a25b-3e4c049c02d8`
   - Joined: Sep 28, 2025
   - Plan: Free

---

## 📄 CSV FILE CREATED

**File:** `stripe-billing-migration.csv`

**Current Status:** Template with Pro Monthly plan ($19/month) for all 3 users

---

## 🔧 HOW TO USE THIS CSV

### **STEP 1: Create Stripe Customers First**

Before you can import subscriptions, you need Stripe Customer IDs. You have 2 options:

#### **Option A: Create Customers Manually in Stripe**
1. Go to Stripe Dashboard → Customers
2. Click "Add customer"
3. Enter email for each user:
   - `chorva.galemski24@gmail.com`
   - `lyannatarly.518560@gmail.com`
   - `gavinvclay@gmail.com`
4. Copy the Customer IDs (format: `cus_xxxxxxxxxxxxx`)

#### **Option B: Import Customers via CSV**
1. Create a customer import CSV:
```csv
email,name,description
chorva.galemski24@gmail.com,Chorva Galemski,ProInvoice User
lyannatarly.518560@gmail.com,Lyanna Tarly,ProInvoice User
gavinvclay@gmail.com,Gavin Clay,ProInvoice User
```
2. Go to Stripe Dashboard → Customers → Import
3. Upload the CSV
4. Export the customer list to get Customer IDs

---

### **STEP 2: Update the CSV with Customer IDs**

Replace these placeholders in `stripe-billing-migration.csv`:
- `cus_REPLACE_WITH_STRIPE_CUSTOMER_ID_1` → Actual Customer ID for chorva.galemski24@gmail.com
- `cus_REPLACE_WITH_STRIPE_CUSTOMER_ID_2` → Actual Customer ID for lyannatarly.518560@gmail.com
- `cus_REPLACE_WITH_STRIPE_CUSTOMER_ID_3` → Actual Customer ID for gavinvclay@gmail.com

---

### **STEP 3: Customize the Plan (if needed)**

The CSV is currently set to **Pro Monthly** (`price_1SCDJ4Gpz30x93KjNOLCJgNK`).

**To change the plan, replace the price ID in column 3:**

For **Lite Monthly** ($9/month):
```
price_1SCDIjGpz30x93KjADgoYSMS
```

For **Agency Monthly** ($39/month):
```
price_1SCDKrGpz30x93KjeKGawyGN
```

For **Pro Annual** ($190/year):
```
price_1SCDJFGpz30x93KjrppMsUf7
```

---

### **STEP 4: Import to Stripe**

1. Go to Stripe Dashboard → Billing → Subscriptions
2. Click "Import subscriptions"
3. Upload `stripe-billing-migration.csv`
4. Review the mapping
5. Click "Import"

---

## 📊 CSV COLUMN EXPLANATIONS

| Column | Value | Explanation |
|--------|-------|-------------|
| `customer` | `cus_xxxxx` | Stripe Customer ID (required) |
| `start_date` | Unix timestamp | When subscription started |
| `price` | `price_xxxxx` | Stripe Price ID for the plan |
| `quantity` | `1` | Number of subscriptions (usually 1) |
| `metadata.third_party_sub_id` | User ID | Your internal user ID for tracking |
| `automatic_tax` | `FALSE` | Whether to calculate tax automatically |
| `billing_cycle_anchor` | Unix timestamp | When billing cycle resets |
| `coupon` | (empty) | Coupon code if applicable |
| `trial_end` | (empty) | Trial end date if applicable |
| `proration_behavior` | `create_prorations` | How to handle prorations |
| `collection_method` | `charge_automatically` | How to collect payment |
| `default_tax_rate` | (empty) | Tax rate ID if applicable |
| `backdate_start_date` | (empty) | Backdate subscription start |
| `days_until_due` | (empty) | Payment terms |
| `cancel_at_period_end` | `FALSE` | Whether to cancel at period end |

---

## 🗓️ TIMESTAMP EXPLANATIONS

The CSV uses Unix timestamps (seconds since Jan 1, 1970):

**Current timestamps in CSV:**

1. **chorva.galemski24@gmail.com:**
   - `start_date`: `1727481010` = Sep 28, 2024 04:56:50 UTC
   - `billing_cycle_anchor`: `1730159410` = Oct 28, 2024 04:56:50 UTC

2. **lyannatarly.518560@gmail.com:**
   - `start_date`: `1727649048` = Sep 29, 2024 20:10:48 UTC
   - `billing_cycle_anchor`: `1730327448` = Oct 29, 2024 20:10:48 UTC

3. **gavinvclay@gmail.com:**
   - `start_date`: `1727496910` = Sep 28, 2024 04:55:10 UTC
   - `billing_cycle_anchor`: `1730175310` = Oct 28, 2024 04:55:10 UTC

**These are set to their actual signup dates from your database.**

---

## ⚠️ IMPORTANT NOTES

### **1. All Users Are Currently Free**
- None of your users have Stripe Customer IDs yet
- None have active paid subscriptions
- You'll need to create Stripe customers first

### **2. Billing Will Start Immediately**
- When you import, Stripe will charge the customers
- Make sure customers are aware and have agreed
- Consider using trial periods if needed

### **3. Metadata Tracking**
- The `metadata.third_party_sub_id` field contains your internal user IDs
- This helps you match Stripe subscriptions to your database
- Update your webhook to sync this data back to Supabase

---

## 🔄 AFTER IMPORT: UPDATE SUPABASE

After importing to Stripe, you need to update your Supabase database:

```sql
-- Update user 1
UPDATE user_subscriptions 
SET 
  stripe_customer_id = 'cus_xxxxx1',
  stripe_subscription_id = 'sub_xxxxx1',
  plan = 'pro',
  status = 'active',
  current_period_start = '2024-09-28 04:56:50+00',
  current_period_end = '2024-10-28 04:56:50+00'
WHERE user_id = '6615a994-e8fe-4b61-84db-9d3dfa9741b4';

-- Update user 2
UPDATE user_subscriptions 
SET 
  stripe_customer_id = 'cus_xxxxx2',
  stripe_subscription_id = 'sub_xxxxx2',
  plan = 'pro',
  status = 'active',
  current_period_start = '2024-09-29 20:10:48+00',
  current_period_end = '2024-10-29 20:10:48+00'
WHERE user_id = 'a79ccd37-664e-4b1f-858f-c3664bf311ac';

-- Update user 3
UPDATE user_subscriptions 
SET 
  stripe_customer_id = 'cus_xxxxx3',
  stripe_subscription_id = 'sub_xxxxx3',
  plan = 'pro',
  status = 'active',
  current_period_start = '2024-09-28 04:55:10+00',
  current_period_end = '2024-10-28 04:55:10+00'
WHERE user_id = '7dd4768b-91e9-4ef0-a25b-3e4c049c02d8';
```

---

## 💡 ALTERNATIVE APPROACH (RECOMMENDED)

Since all your users are on free plans, I recommend:

### **Don't Import Yet - Let Users Upgrade Naturally**

1. ✅ Keep users on free plan
2. ✅ When they click "Upgrade" in your app, Stripe creates customer automatically
3. ✅ Your webhook handles the subscription creation
4. ✅ No manual CSV import needed
5. ✅ No risk of charging users unexpectedly

**Your app already does this automatically!**

---

## 📝 SUMMARY

**Files Created:**
- ✅ `stripe-billing-migration.csv` - Ready for Stripe import
- ✅ `STRIPE-MIGRATION-GUIDE.md` - This guide

**Next Steps:**
1. Decide if you want to import or let users upgrade naturally
2. If importing: Create Stripe customers first
3. Update CSV with actual Customer IDs
4. Import to Stripe
5. Update Supabase with Stripe IDs

**Recommendation:** 
Since all users are free, **wait for them to upgrade naturally** through your app. Your existing Stripe integration handles everything automatically!

---

**Questions? Let me know what you'd like to do!**

