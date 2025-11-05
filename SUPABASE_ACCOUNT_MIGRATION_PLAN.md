# 🚀 Supabase Account Migration Plan

**From:** Current Account (hkzrfqpnkvpmsaeluksh)  
**To:** New Account (Different Email/Password)  
**Status:** Ready to Execute

---

## 📋 What Will Be Migrated

### ✅ Database
- All tables (estimates, invoices, payments, clients, etc.)
- All data (records)
- RLS policies
- Triggers
- Functions
- Indexes

### ✅ Edge Functions (15+)
- create-checkout
- estimate-checkout
- create-payment
- send-estimate-email
- send-invoice-email
- send-estimate-reminders
- send-sms-notification
- check-subscription
- customer-portal
- create-stripe-customer
- get-estimate
- stripe-webhook
- stripe-webhook-estimates
- check-trial-expiration
- backfill-stripe-customers
- handle-notification-event
- send-reminder-email

### ✅ Configuration
- Auth settings
- API configuration
- Storage buckets (if any)
- Environment variables

### ✅ Auth Users
- All user accounts
- Auth metadata

---

## 🎯 Migration Steps

### Phase 1: Preparation (30 minutes)

**Step 1.1: Create New Supabase Account**
- Go to https://supabase.com
- Sign up with new email/password
- Create new project in same region (us-east-2)
- Note the new project ID

**Step 1.2: Get Current Project Credentials**
- Current Project ID: `hkzrfqpnkvpmsaeluksh`
- Current Service Role Key: [You have this]
- Current Anon Key: [You have this]

**Step 1.3: Get New Project Credentials**
- New Project ID: [From new account]
- New Service Role Key: [From new account settings]
- New Anon Key: [From new account settings]

---

### Phase 2: Export Current Project (1-2 hours)

**Step 2.1: Export Database Schema**
```bash
# Using Supabase CLI
supabase db pull --project-id hkzrfqpnkvpmsaeluksh
```

**Step 2.2: Export Database Data**
```bash
# Using pg_dump
pg_dump -h db.hkzrfqpnkvpmsaeluksh.supabase.co \
  -U postgres \
  -d postgres \
  --data-only \
  > database-data.sql
```

**Step 2.3: Export Edge Functions**
```bash
# Copy all functions from supabase/functions directory
# Already in your repo at: supabase/functions/
```

**Step 2.4: Export Configuration**
- RLS policies
- Auth settings
- Storage configuration
- Environment variables

---

### Phase 3: Import to New Project (1-2 hours)

**Step 3.1: Create Schema in New Project**
```bash
# Push schema to new project
supabase db push --project-id [NEW_PROJECT_ID]
```

**Step 3.2: Import Data**
```bash
# Import data to new project
psql -h db.[NEW_PROJECT_ID].supabase.co \
  -U postgres \
  -d postgres \
  -f database-data.sql
```

**Step 3.3: Deploy Edge Functions**
```bash
# Deploy all functions to new project
supabase functions deploy --project-id [NEW_PROJECT_ID]
```

**Step 3.4: Configure Auth**
- Set up OAuth providers (if used)
- Configure email templates
- Set up auth redirects

---

### Phase 4: Update Application (30 minutes)

**Step 4.1: Update Environment Variables**
```env
# Old
VITE_SUPABASE_URL=https://hkzrfqpnkvpmsaeluksh.supabase.co
VITE_SUPABASE_ANON_KEY=old_key

# New
VITE_SUPABASE_URL=https://[NEW_PROJECT_ID].supabase.co
VITE_SUPABASE_ANON_KEY=new_key
```

**Step 4.2: Update Stripe Configuration**
- Update webhook URL to new project
- Update Edge Function URLs in Stripe dashboard

**Step 4.3: Update Backend Configuration**
- Update Supabase URL in backend
- Update API keys
- Update database connection strings

---

### Phase 5: Verification (1 hour)

**Step 5.1: Database Verification**
- ✅ All tables exist
- ✅ All data is present
- ✅ RLS policies working
- ✅ Triggers firing correctly

**Step 5.2: Edge Functions Verification**
- ✅ All functions deployed
- ✅ Functions responding correctly
- ✅ Stripe webhooks working
- ✅ Email functions working

**Step 5.3: Application Verification**
- ✅ Sign up works
- ✅ Sign in works
- ✅ Checkout works
- ✅ Payments process
- ✅ Webhooks received
- ✅ Estimates work
- ✅ Invoices work

**Step 5.4: Data Verification**
- ✅ All estimates present
- ✅ All invoices present
- ✅ All payments present
- ✅ All clients present
- ✅ All users present

---

## 📊 Timeline

| Phase | Task | Duration |
|-------|------|----------|
| 1 | Preparation | 30 min |
| 2 | Export | 1-2 hours |
| 3 | Import | 1-2 hours |
| 4 | Update App | 30 min |
| 5 | Verification | 1 hour |
| **Total** | **Complete Migration** | **4-5 hours** |

---

## ⚠️ Important Notes

### Before Migration
- ✅ Backup current project (we'll export everything)
- ✅ Have new Supabase account ready
- ✅ Have new email/password for new account
- ✅ Plan for downtime (app won't work during migration)

### During Migration
- ⚠️ App will be down
- ⚠️ No payments can be processed
- ⚠️ No emails will be sent
- ⚠️ Webhooks won't work

### After Migration
- ✅ Test everything thoroughly
- ✅ Verify all data transferred
- ✅ Monitor for errors
- ✅ Keep old project as backup for 24 hours

---

## 🔑 What You Need to Provide

1. **New Supabase Account**
   - Email: [Your new email]
   - Password: [Your new password]
   - Project ID: [From new account]

2. **New Project Credentials**
   - Service Role Key
   - Anon Key
   - Database password

3. **Stripe Configuration**
   - Webhook URL for new project
   - Any other Stripe settings

---

## 📁 Files I'll Create

1. **export-database.sh** - Export script
2. **import-database.sh** - Import script
3. **migrate-edge-functions.sh** - Function migration
4. **update-env-variables.md** - Environment variable updates
5. **migration-checklist.md** - Step-by-step checklist
6. **verification-tests.js** - Automated verification

---

## 🚀 Ready to Start?

Tell me:

1. ✅ Do you have the new Supabase account created?
2. ✅ What's the new project ID?
3. ✅ Do you have the new Service Role Key?
4. ✅ When do you want to do the migration? (Plan for 4-5 hours downtime)

Once you provide these, I'll create all the migration scripts and we can execute the migration! 🎉

---

**Generated:** 2025-11-05  
**Status:** Ready to Execute

