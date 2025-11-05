# 🚀 Complete Supabase Account Migration Guide

**From:** Current Account (hkzrfqpnkvpmsaeluksh)  
**To:** New Account (Different Email/Password)  
**Duration:** 4-5 hours  
**Downtime:** Yes (plan accordingly)

---

## 📋 What Gets Migrated

✅ **Database**
- All tables (estimates, invoices, payments, clients, profiles, etc.)
- All data (every record)
- RLS policies
- Triggers
- Functions
- Indexes

✅ **Edge Functions** (15+)
- All 15+ deployed functions
- Function code
- Environment variables
- Configurations

✅ **Authentication**
- All user accounts
- Auth metadata
- Auth settings

✅ **Configuration**
- Storage buckets
- API settings
- Webhooks

---

## 🎯 Step-by-Step Migration

### Step 1: Create New Supabase Account (15 minutes)

1. Go to https://supabase.com
2. Click "Sign Up"
3. Use your **new email address**
4. Create a **strong password**
5. Verify your email
6. Create a new organization (optional)

### Step 2: Create New Project (15 minutes)

1. In new account, click "New Project"
2. **Project Name:** ProInvoice (or your choice)
3. **Region:** us-east-2 (same as current)
4. **Database Password:** Create a strong password
5. Click "Create new project"
6. **Wait 5-10 minutes** for project to initialize

### Step 3: Gather Credentials (10 minutes)

**From New Account:**
1. Go to Settings → API
2. Copy **Project ID** (e.g., `abc123xyz`)
3. Copy **Service Role** secret key
4. Copy **Anon Key**
5. Go to Settings → Database
6. Copy **Database Password**

**Store these securely** - you'll need them for migration

### Step 4: Prepare Current Project (5 minutes)

**From Current Account:**
1. Go to Settings → API
2. Copy **Service Role** secret key
3. Copy **Database Password**

### Step 5: Run Migration Script (2-3 hours)

**On Windows (PowerShell):**
```powershell
# Make script executable
chmod +x migrate-supabase-account.sh

# Run migration
./migrate-supabase-account.sh
```

**On Mac/Linux:**
```bash
# Make script executable
chmod +x migrate-supabase-account.sh

# Run migration
./migrate-supabase-account.sh
```

**The script will:**
1. Export current database schema
2. Export all data
3. Export Edge Functions
4. Import to new project
5. Deploy Edge Functions
6. Verify everything

### Step 6: Update Application (30 minutes)

**Update Environment Variables:**

Find `.env` or `.env.local` and update:

```env
# OLD
VITE_SUPABASE_URL=https://hkzrfqpnkvpmsaeluksh.supabase.co
VITE_SUPABASE_ANON_KEY=old_key_here

# NEW
VITE_SUPABASE_URL=https://[NEW_PROJECT_ID].supabase.co
VITE_SUPABASE_ANON_KEY=new_key_here
```

**Update Backend Configuration:**

If you have a backend, update:
- Supabase URL
- Service Role Key
- Database connection string

**Update Stripe Webhook:**

1. Go to https://dashboard.stripe.com/webhooks
2. Find your webhook endpoint
3. Update URL to new project:
   ```
   https://[NEW_PROJECT_ID].supabase.co/functions/v1/stripe-webhook
   ```

### Step 7: Rebuild and Deploy (30 minutes)

```bash
# Rebuild frontend
npm run build

# Deploy to your hosting
# (Vercel, Railway, etc.)
```

### Step 8: Verify Everything (1 hour)

**Test Core Features:**
- [ ] Sign up works
- [ ] Sign in works
- [ ] Checkout works
- [ ] Payments process
- [ ] Webhooks received
- [ ] Estimates work
- [ ] Invoices work
- [ ] Clients work

**Check Data:**
- [ ] All estimates present
- [ ] All invoices present
- [ ] All payments present
- [ ] All clients present
- [ ] All users present

**Check Stripe:**
- [ ] Customers synced
- [ ] Subscriptions synced
- [ ] Webhooks working

---

## 🔑 Important Credentials

### Current Project
```
Project ID: hkzrfqpnkvpmsaeluksh
Region: us-east-2
URL: https://hkzrfqpnkvpmsaeluksh.supabase.co
```

### New Project
```
Project ID: [YOUR_NEW_PROJECT_ID]
Region: us-east-2
URL: https://[YOUR_NEW_PROJECT_ID].supabase.co
Service Role Key: [SAVE THIS]
Anon Key: [SAVE THIS]
Database Password: [SAVE THIS]
```

---

## ⚠️ Important Notes

### Before Migration
- ✅ Backup current project (we export everything)
- ✅ Have new account ready
- ✅ Plan for 4-5 hours downtime
- ✅ Notify users/team
- ✅ Have all credentials ready

### During Migration
- ⚠️ App will be down
- ⚠️ No payments can be processed
- ⚠️ No emails will be sent
- ⚠️ Webhooks won't work

### After Migration
- ✅ Test everything thoroughly
- ✅ Monitor logs for 24 hours
- ✅ Keep old project as backup for 24 hours
- ✅ Delete old project after verification

---

## 🆘 Troubleshooting

### Migration Script Fails
**Solution:**
1. Check all credentials are correct
2. Verify new project is fully initialized
3. Check internet connection
4. Run script again

### Data Not Imported
**Solution:**
1. Check database password is correct
2. Verify new project has enough space
3. Check for connection errors in logs
4. Re-run import step

### Edge Functions Won't Deploy
**Solution:**
1. Check all functions have `index.ts`
2. Check for syntax errors
3. Deploy functions individually
4. Check logs for errors

### App Won't Connect
**Solution:**
1. Verify environment variables updated
2. Check URLs are correct
3. Verify API keys are valid
4. Clear browser cache
5. Restart app

### Webhooks Not Working
**Solution:**
1. Update webhook URL in Stripe
2. Verify Edge Function deployed
3. Check logs for errors
4. Test webhook manually

---

## 📊 Migration Checklist

- [ ] New Supabase account created
- [ ] New project created
- [ ] Credentials gathered
- [ ] Migration script run
- [ ] Database imported
- [ ] Edge Functions deployed
- [ ] Environment variables updated
- [ ] Stripe webhook updated
- [ ] App rebuilt and deployed
- [ ] All features tested
- [ ] Data verified
- [ ] Webhooks working
- [ ] Monitoring enabled
- [ ] Old project backed up
- [ ] Old project deleted (after 24 hours)

---

## 📁 Files Provided

1. **migrate-supabase-account.sh** - Automated migration script
2. **SUPABASE_MIGRATION_PLAN.md** - Detailed plan
3. **SUPABASE_MIGRATION_CHECKLIST.md** - Step-by-step checklist
4. **SUPABASE_MIGRATION_GUIDE.md** - This guide

---

## 🎯 Next Steps

1. Create new Supabase account
2. Create new project
3. Gather all credentials
4. Run migration script
5. Update application
6. Test everything
7. Deploy to production

---

## 📞 Need Help?

1. Check the troubleshooting section
2. Review the migration plan
3. Check Supabase documentation
4. Review error logs

---

**Ready to migrate? You've got this! 🚀**

**Estimated Time:** 4-5 hours  
**Difficulty:** Medium  
**Risk:** Low (we backup everything)

