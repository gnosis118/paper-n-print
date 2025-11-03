# ProInvoice Estimate System - Deployment Instructions

## 🚀 Step-by-Step Deployment Guide

### Phase 1: Database Setup (Required)

#### Step 1.1: Apply Database Migration
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy the entire SQL from `supabase/migrations/20251103_create_estimates_table.sql`
6. Paste into the SQL editor
7. Click **Run**
8. Verify all 3 tables created:
   - `estimate_reminders`
   - `estimate_templates`
   - `estimate_revisions`

**Verification:**
```sql
-- Run this to verify tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('estimate_reminders', 'estimate_templates', 'estimate_revisions');
```

Expected output: 3 rows

---

### Phase 2: Environment Configuration (Required)

#### Step 2.1: Configure Resend API Key
1. Go to [Resend Dashboard](https://resend.com)
2. Get your API key
3. Go to Supabase Dashboard → Settings → Environment Variables
4. Add new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key
5. Click **Add**

#### Step 2.2: Verify Stripe Configuration
1. Go to Supabase Dashboard → Settings → Environment Variables
2. Verify these variables exist:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`

If missing, add them from your Stripe dashboard.

---

### Phase 3: Edge Function Deployment (Required for Reminders)

#### Step 3.1: Deploy send-estimate-reminders Function
1. Go to Supabase Dashboard → Edge Functions
2. Click **Create a new function**
3. Name: `send-estimate-reminders`
4. Copy entire content from `supabase/functions/send-estimate-reminders/index.ts`
5. Paste into the editor
6. Click **Deploy**

**Verification:**
```bash
# Test the function
curl -X POST https://your-project.supabase.co/functions/v1/send-estimate-reminders \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"daysUntilReminder": 3, "maxReminders": 3}'
```

Expected response: Success message with reminder count

#### Step 3.2: Set Up Cron Job
1. Go to Supabase Dashboard → Edge Functions
2. Click on `send-estimate-reminders`
3. Go to **Cron** tab
4. Click **Create a new cron job**
5. Set schedule: `0 9 * * *` (Daily at 9 AM UTC)
6. Click **Create**

**Alternative: Use External Cron Service**
- Use [EasyCron](https://www.easycron.com) or similar
- Set URL: `https://your-project.supabase.co/functions/v1/send-estimate-reminders`
- Set frequency: Daily
- Add header: `Authorization: Bearer YOUR_SERVICE_ROLE_KEY`

---

### Phase 4: Frontend Deployment (Required)

#### Step 4.1: Build and Test Locally
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Navigate to http://localhost:5173/estimates
# Test all features
```

#### Step 4.2: Build for Production
```bash
# Create production build
npm run build

# Verify no errors
npm run preview
```

#### Step 4.3: Deploy to Production
**Option A: Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Option B: Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Option C: Docker**
```bash
# Build Docker image
docker build -t proinvoice .

# Run container
docker run -p 3000:3000 proinvoice
```

---

### Phase 5: Testing & Verification

#### Step 5.1: Test Analytics Dashboard
1. Navigate to `/estimates`
2. Click **Analytics** tab
3. Verify all 6 metric cards display
4. Create a new estimate
5. Verify analytics update in real-time

#### Step 5.2: Test Bulk Creation
1. Click **Bulk Create** button
2. Create a template (or select existing)
3. Add 3 test clients
4. Click **Create 3 Estimates**
5. Verify all 3 estimates created
6. Check emails sent to clients

#### Step 5.3: Test Versioning
1. Create an estimate
2. Edit it (change title or items)
3. View estimate details
4. Check revision history
5. Restore previous version
6. Verify new revision created

#### Step 5.4: Test Reminders
1. Create estimate with status "sent"
2. Manually run reminder function:
```bash
curl -X POST https://your-project.supabase.co/functions/v1/send-estimate-reminders \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"daysUntilReminder": 0, "maxReminders": 3}'
```
3. Check estimate_reminders table for new record
4. Verify email sent to client

#### Step 5.5: Test on Mobile
1. Open `/estimates` on mobile device
2. Test Analytics tab
3. Test Bulk Create
4. Test Revision History
5. Verify all responsive

---

### Phase 6: Monitoring & Maintenance

#### Step 6.1: Set Up Monitoring
1. Go to Supabase Dashboard → Logs
2. Monitor edge function logs
3. Check for errors
4. Monitor database performance

#### Step 6.2: Monitor Email Delivery
1. Go to Resend Dashboard
2. Check email delivery rates
3. Monitor bounce rates
4. Check for spam complaints

#### Step 6.3: Performance Monitoring
1. Use Google Analytics to track page performance
2. Monitor Core Web Vitals
3. Check database query performance
4. Monitor API response times

---

## 🔧 Troubleshooting

### Issue: Database Migration Fails
**Solution:**
1. Check Supabase connection
2. Verify you have admin access
3. Check for syntax errors in SQL
4. Try running tables one at a time
5. Check Supabase logs for errors

### Issue: Edge Function Not Deploying
**Solution:**
1. Verify Resend API key configured
2. Check function syntax
3. Verify all imports available
4. Check Supabase logs
5. Try redeploying

### Issue: Emails Not Sending
**Solution:**
1. Verify RESEND_API_KEY configured
2. Check Resend dashboard for errors
3. Verify email addresses valid
4. Check spam folder
5. Check Supabase logs

### Issue: Analytics Not Loading
**Solution:**
1. Verify user authenticated
2. Check Supabase connection
3. Verify estimates table has data
4. Check browser console for errors
5. Clear browser cache

### Issue: Bulk Create Not Working
**Solution:**
1. Verify templates table created
2. Check email addresses valid
3. Verify RESEND_API_KEY configured
4. Check browser console for errors
5. Verify user has permission

---

## 📋 Pre-Launch Checklist

- [ ] Database migration applied
- [ ] All 3 tables created and verified
- [ ] RESEND_API_KEY configured
- [ ] Stripe keys configured
- [ ] Edge function deployed
- [ ] Cron job set up
- [ ] Frontend built and tested
- [ ] All features tested locally
- [ ] Mobile testing completed
- [ ] Analytics dashboard working
- [ ] Bulk create working
- [ ] Versioning working
- [ ] Reminders working
- [ ] Emails sending correctly
- [ ] Performance acceptable
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Documentation reviewed

---

## 🎯 Post-Launch Tasks

### Day 1
- [ ] Monitor error logs
- [ ] Check email delivery
- [ ] Verify analytics working
- [ ] Test with real users

### Week 1
- [ ] Gather user feedback
- [ ] Monitor performance
- [ ] Fix any issues
- [ ] Optimize based on usage

### Month 1
- [ ] Analyze usage patterns
- [ ] Plan enhancements
- [ ] Optimize database queries
- [ ] Plan next features

---

## 📞 Support Contacts

- **Supabase Support:** https://supabase.com/support
- **Resend Support:** https://resend.com/support
- **Stripe Support:** https://support.stripe.com
- **Your Team:** [Add contact info]

---

## 🎉 Deployment Complete!

Once all steps completed, your ProInvoice estimate system is ready for production use with:
- ✅ Automated reminders
- ✅ Real-time analytics
- ✅ Bulk estimate creation
- ✅ Full version history
- ✅ Advanced settings
- ✅ Export capabilities

**Congratulations! 🚀**

