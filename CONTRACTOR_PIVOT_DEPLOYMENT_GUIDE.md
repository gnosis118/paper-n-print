# Contractor Pivot - Deployment Guide

## Overview

This guide covers the deployment of the ProInvoice Contractor Pivot (Phases 1-5) to production.

**Timeline:** ~2-3 hours for full deployment
**Risk Level:** Medium (database migration + new features)
**Rollback Time:** ~30 minutes

---

## Pre-Deployment Checklist

### 1. Code Review
```bash
# Review all changes
git log --oneline main..feature/contractor-pivot | head -20

# Check for any uncommitted changes
git status
```

### 2. Run Tests
```bash
# Run all unit tests
npm test

# Run integration tests
npm run test:integration

# Check test coverage
npm run test:coverage
```

### 3. Build Verification
```bash
# Build production bundle
npm run build

# Check bundle size
npm run build:analyze

# Verify no build errors
npm run lint
```

### 4. Performance Check
```bash
# Run Lighthouse audit
npm run lighthouse

# Check Core Web Vitals
npm run vitals
```

---

## Database Migration

### 1. Backup Production Database
```bash
# Using Supabase CLI
supabase db pull --db-url $PRODUCTION_DB_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Or using pg_dump
pg_dump $PRODUCTION_DB_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 2. Test Migration in Staging
```bash
# Connect to staging database
export SUPABASE_DB_URL=$STAGING_DB_URL

# Run migration
supabase migration up

# Verify tables created
supabase db list-tables
```

### 3. Verify Migration
```sql
-- Check new tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('contractor_templates', 'milestone_payments');

-- Check new columns exist
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'estimates' 
AND column_name IN ('appointment_date', 'milestone_payments', 'bid_type');

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename IN ('contractor_templates', 'milestone_payments');

-- Check indexes
SELECT indexname FROM pg_indexes 
WHERE tablename IN ('estimates', 'profiles', 'contractor_templates', 'milestone_payments');
```

### 4. Run Migration in Production
```bash
# Connect to production database
export SUPABASE_DB_URL=$PRODUCTION_DB_URL

# Run migration
supabase migration up

# Verify success
supabase db list-tables
```

---

## Environment Configuration

### 1. Set Environment Variables
```bash
# Sentry configuration
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
VITE_SENTRY_ENVIRONMENT=production
VITE_SENTRY_RELEASE=1.0.0

# Email service (if using external service)
VITE_EMAIL_SERVICE_API_KEY=your-api-key
VITE_EMAIL_FROM=noreply@proinvoice.app

# Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 2. Verify Configuration
```bash
# Check all required env vars are set
npm run check:env

# Verify Sentry connection
npm run test:sentry
```

---

## Code Deployment

### 1. Build Production Bundle
```bash
# Clean build
rm -rf dist/
npm run build

# Verify build output
ls -lh dist/
```

### 2. Deploy to Staging
```bash
# Deploy to staging environment
npm run deploy:staging

# Run smoke tests
npm run test:smoke

# Check for errors
npm run check:errors
```

### 3. Deploy to Production
```bash
# Deploy to production
npm run deploy:production

# Verify deployment
npm run verify:deployment
```

---

## Post-Deployment Verification

### 1. Verify All Pages Load
```bash
# Check homepage
curl -I https://www.proinvoice.app/

# Check trade pages
curl -I https://www.proinvoice.app/trades
curl -I https://www.proinvoice.app/trades/electricians

# Check admin pages
curl -I https://www.proinvoice.app/admin/crm
curl -I https://www.proinvoice.app/admin/analytics
```

### 2. Check Error Tracking
```bash
# Verify Sentry is receiving events
# Go to Sentry dashboard and check for any errors

# Check error rate
# Should be < 0.1% for normal operation
```

### 3. Monitor Performance
```bash
# Check Core Web Vitals
# Go to Google Search Console > Core Web Vitals

# Check Lighthouse scores
# Should be ≥90 for Performance and SEO
```

### 4. Verify Features
- [ ] Contractor onboarding works
- [ ] Bid-to-invoice conversion works
- [ ] Email notifications sent
- [ ] Mobile FAB buttons work
- [ ] Pagination works
- [ ] Lazy loading works

### 5. Check Analytics
```bash
# Verify Google Analytics is tracking
# Check for new events and page views

# Verify schema markup
# Use Google's Rich Results Test
```

---

## Monitoring & Alerts

### 1. Set Up Alerts
```bash
# Sentry alerts
- Alert on error rate > 1%
- Alert on performance degradation
- Alert on new issues

# Uptime monitoring
- Monitor all critical pages
- Alert on 5xx errors
- Alert on slow response times
```

### 2. Monitor Key Metrics
- Error rate
- Page load time
- Core Web Vitals
- User engagement
- Conversion rate

### 3. Daily Checks (First Week)
- [ ] Check error logs
- [ ] Check performance metrics
- [ ] Check user feedback
- [ ] Check conversion rates
- [ ] Check email delivery

---

## Rollback Plan

If critical issues occur:

### 1. Immediate Actions
```bash
# Revert code deployment
git revert <commit-hash>
npm run build
npm run deploy:production

# Monitor error rate
# Should return to normal within 5 minutes
```

### 2. Database Rollback (If Needed)
```bash
# Restore from backup
psql $PRODUCTION_DB_URL < backup_YYYYMMDD_HHMMSS.sql

# Verify restoration
supabase db list-tables
```

### 3. Notify Users
- Post status update
- Explain issue and resolution
- Provide ETA for fix

### 4. Post-Mortem
- Document what went wrong
- Identify root cause
- Implement preventive measures
- Update deployment process

---

## Success Criteria

Deployment is successful when:

✅ All pages load without errors
✅ Error rate < 0.1%
✅ Core Web Vitals optimized
✅ All features working correctly
✅ Email notifications sent
✅ Analytics tracking correctly
✅ No user complaints
✅ Conversion rate maintained or improved

---

## Support & Escalation

**During Deployment:**
- Deployment Lead: [Name]
- Database Admin: [Name]
- On-Call Engineer: [Name]

**If Issues Occur:**
1. Notify deployment lead
2. Assess severity
3. Decide: Continue or Rollback
4. Execute decision
5. Document incident

---

## Sign-off

- [ ] Deployment Lead: _________________ Date: _______
- [ ] QA Lead: _________________ Date: _______
- [ ] Product Manager: _________________ Date: _______

