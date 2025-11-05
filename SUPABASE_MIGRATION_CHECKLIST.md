# ✅ Supabase Account Migration Checklist

**Current Project:** hkzrfqpnkvpmsaeluksh  
**Migration Date:** [Your Date]  
**Estimated Duration:** 4-5 hours

---

## 📋 Pre-Migration Checklist

### Account Setup
- [ ] New Supabase account created
- [ ] New email: ___________________
- [ ] New password: ___________________
- [ ] New project created in us-east-2 region
- [ ] New Project ID: ___________________

### Credentials Gathered
- [ ] Current Service Role Key: ___________________
- [ ] Current Anon Key: ___________________
- [ ] New Service Role Key: ___________________
- [ ] New Anon Key: ___________________
- [ ] New Database Password: ___________________

### Preparation
- [ ] Backup current project (export everything)
- [ ] Notify team of downtime window
- [ ] Schedule migration time
- [ ] Have all credentials ready
- [ ] Test new account access

---

## 🚀 Migration Execution

### Phase 1: Export Current Project

**Database Schema**
- [ ] Run: `supabase db pull --project-id hkzrfqpnkvpmsaeluksh`
- [ ] Verify: `supabase/migrations/` directory populated
- [ ] Backup: Copy migrations to safe location

**Database Data**
- [ ] Export data using pg_dump
- [ ] Verify: `database-data.sql` file created
- [ ] Check: File size > 0 bytes
- [ ] Backup: Copy to safe location

**Edge Functions**
- [ ] Verify: All 15+ functions in `supabase/functions/`
- [ ] Check: Each function has `index.ts` file
- [ ] Backup: Copy entire `supabase/functions/` directory

**Configuration**
- [ ] Export: RLS policies
- [ ] Export: Auth settings
- [ ] Export: Storage configuration
- [ ] Export: Environment variables

---

### Phase 2: Prepare New Project

**Create Project**
- [ ] Log in to new Supabase account
- [ ] Create new project
- [ ] Select region: us-east-2
- [ ] Wait for project to initialize (5-10 minutes)
- [ ] Note Project ID: ___________________

**Get Credentials**
- [ ] Copy Service Role Key
- [ ] Copy Anon Key
- [ ] Copy Database Password
- [ ] Store securely

**Configure Project**
- [ ] Set up auth providers (if needed)
- [ ] Configure email settings
- [ ] Set up storage buckets (if needed)

---

### Phase 3: Import to New Project

**Import Schema**
- [ ] Run: `supabase db push --project-id [NEW_PROJECT_ID]`
- [ ] Verify: All tables created
- [ ] Check: RLS policies applied
- [ ] Confirm: Triggers created

**Import Data**
- [ ] Run: `psql` import command
- [ ] Verify: Data imported successfully
- [ ] Check: Row counts match
- [ ] Confirm: No errors in import

**Deploy Edge Functions**
- [ ] Run: `supabase functions deploy --project-id [NEW_PROJECT_ID]`
- [ ] Verify: All functions deployed
- [ ] Check: Each function status is "deployed"
- [ ] Confirm: No deployment errors

**Configure Auth**
- [ ] Set up OAuth providers
- [ ] Configure email templates
- [ ] Set up auth redirects
- [ ] Test auth endpoints

---

### Phase 4: Update Application

**Environment Variables**
- [ ] Update: `VITE_SUPABASE_URL`
- [ ] Update: `VITE_SUPABASE_ANON_KEY`
- [ ] Update: Backend Supabase URL
- [ ] Update: Backend Service Role Key
- [ ] Verify: All URLs correct

**Stripe Configuration**
- [ ] Update: Webhook URL in Stripe dashboard
- [ ] Update: Edge Function URLs
- [ ] Update: Stripe keys (if needed)
- [ ] Verify: Webhook endpoint correct

**Backend Configuration**
- [ ] Update: Database connection string
- [ ] Update: API keys
- [ ] Update: Service URLs
- [ ] Verify: All connections working

**Deployment**
- [ ] Rebuild frontend
- [ ] Deploy frontend
- [ ] Restart backend
- [ ] Verify: App loads correctly

---

### Phase 5: Verification

**Database Verification**
- [ ] [ ] All tables exist
- [ ] [ ] All data present
- [ ] [ ] Row counts match
- [ ] [ ] RLS policies working
- [ ] [ ] Triggers firing

**Edge Functions Verification**
- [ ] [ ] All functions deployed
- [ ] [ ] Functions responding
- [ ] [ ] Stripe webhooks working
- [ ] [ ] Email functions working
- [ ] [ ] No errors in logs

**Application Verification**
- [ ] [ ] Sign up works
- [ ] [ ] Sign in works
- [ ] [ ] Checkout works
- [ ] [ ] Payments process
- [ ] [ ] Webhooks received
- [ ] [ ] Estimates work
- [ ] [ ] Invoices work
- [ ] [ ] Clients work
- [ ] [ ] Payments work

**Data Verification**
- [ ] [ ] All estimates present
- [ ] [ ] All invoices present
- [ ] [ ] All payments present
- [ ] [ ] All clients present
- [ ] [ ] All users present
- [ ] [ ] All subscriptions present

**Stripe Verification**
- [ ] [ ] Customers synced
- [ ] [ ] Subscriptions synced
- [ ] [ ] Webhooks working
- [ ] [ ] Payments processing

---

## 🎯 Post-Migration

### Cleanup
- [ ] Keep old project as backup for 24 hours
- [ ] Archive old project data
- [ ] Delete old project (after 24 hours)
- [ ] Update documentation

### Monitoring
- [ ] Monitor error logs for 24 hours
- [ ] Check Stripe webhook logs
- [ ] Monitor database performance
- [ ] Check Edge Function logs

### Communication
- [ ] Notify team migration complete
- [ ] Update documentation
- [ ] Update deployment guides
- [ ] Share new credentials (securely)

---

## 📊 Migration Summary

| Item | Status | Notes |
|------|--------|-------|
| Database Schema | [ ] | |
| Database Data | [ ] | |
| Edge Functions | [ ] | |
| Auth Configuration | [ ] | |
| Environment Variables | [ ] | |
| Stripe Configuration | [ ] | |
| Application Deployment | [ ] | |
| Verification Complete | [ ] | |

---

## 🆘 Troubleshooting

### If Something Goes Wrong

1. **Database Import Fails**
   - Check: Database password correct
   - Check: Sufficient disk space
   - Check: No connection issues
   - Solution: Re-run import with verbose logging

2. **Edge Functions Won't Deploy**
   - Check: All functions have index.ts
   - Check: No syntax errors
   - Check: Dependencies installed
   - Solution: Deploy functions individually

3. **App Won't Connect**
   - Check: Environment variables correct
   - Check: URLs match new project
   - Check: API keys valid
   - Solution: Verify credentials in new project

4. **Data Missing**
   - Check: Import completed successfully
   - Check: Row counts match
   - Check: No errors in logs
   - Solution: Re-run import

5. **Webhooks Not Working**
   - Check: Webhook URL updated in Stripe
   - Check: Edge Function deployed
   - Check: Logs for errors
   - Solution: Update webhook URL and test

---

## 📞 Support

If you need help:
1. Check the troubleshooting section
2. Review the migration plan
3. Check Supabase documentation
4. Review error logs

---

**Ready to migrate? Let's do this! 🚀**

