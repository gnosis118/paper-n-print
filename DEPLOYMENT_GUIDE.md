# ProInvoice Backend Intelligence - Deployment Guide

## Overview

This guide covers deploying the ProInvoice backend intelligence and automation features to production on Render.

## Prerequisites

- Node.js 18+
- npm or yarn
- Render account with API key
- Supabase project
- Stripe account
- Resend account (for email)
- Twilio account (for SMS)
- Sentry account
- Honeycomb account
- Google Search Console API key

## Environment Variables

Create a `.env.production` file with:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Email
RESEND_API_KEY=re_...

# SMS
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Observability
REACT_APP_SENTRY_DSN=https://...@sentry.io/...
REACT_APP_HONEYCOMB_API_KEY=...

# SEO
REACT_APP_GOOGLE_SEARCH_CONSOLE_API_KEY=...

# App
REACT_APP_BASE_URL=https://proinvoice.app
NODE_ENV=production
```

## Deployment Steps

### 1. Local Testing

```bash
# Install dependencies
npm install

# Run tests
npm test

# Type check
npm run type-check

# Build
npm run build

# Run Lighthouse audit
npm run lighthouse
```

### 2. Database Migration

```bash
# Create backup
supabase db pull

# Review migrations
cat supabase/migrations/latest.sql

# Apply migrations to staging
supabase db push --linked

# Verify migrations
supabase db pull
```

### 3. Deploy to Render

#### Option A: Using Render Dashboard

1. Go to https://dashboard.render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - Environment: Node
   - Plan: Standard
5. Add environment variables
6. Deploy

#### Option B: Using Render CLI

```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy
render deploy --service proinvoice-app
```

#### Option C: Using GitHub Actions

```bash
# Push to main branch
git push origin main

# GitHub Actions will:
# 1. Run tests
# 2. Build application
# 3. Deploy to Render
# 4. Run smoke tests
```

### 4. Deploy Supabase Edge Functions

```bash
# Deploy reminder email function
supabase functions deploy send-reminder-email

# Deploy SMS function
supabase functions deploy send-sms-notification

# Deploy notification handler
supabase functions deploy handle-notification-event

# Verify deployment
supabase functions list
```

### 5. Configure Cron Jobs

In `render.yaml`, cron jobs are configured to run:

- **Milestone Reminders**: Daily at 9 AM UTC
- **Overdue Payments**: Daily at 8 AM UTC
- **Sitemap Update**: Weekly on Sunday at 2 AM UTC

Verify in Render dashboard:
1. Go to Services
2. Select each cron job
3. Verify schedule and logs

### 6. Verify Deployment

```bash
# Check application health
curl https://proinvoice.app/health

# Check Sentry integration
# Go to https://sentry.io and verify events

# Check Honeycomb integration
# Go to https://ui.honeycomb.io and verify events

# Check email sending
# Send test reminder via dashboard

# Check SMS sending (if enabled)
# Send test SMS via dashboard
```

## Monitoring

### Sentry Setup

1. Go to https://sentry.io
2. Create new project
3. Add DSN to environment variables
4. Configure alerts:
   - Error rate > 1%
   - New issue
   - Regression

### Honeycomb Setup

1. Go to https://ui.honeycomb.io
2. Create new dataset
3. Add API key to environment variables
4. Create boards for:
   - API performance
   - Database queries
   - Error rates

### Render Monitoring

1. Go to Render dashboard
2. Set up alerts for:
   - High CPU usage
   - High memory usage
   - Deployment failures
   - Service crashes

## Troubleshooting

### Deployment Fails

```bash
# Check logs
render logs --service proinvoice-app

# Check build output
render build-logs --service proinvoice-app

# Rollback
git revert <commit>
git push origin main
```

### Emails Not Sending

1. Check Resend API key
2. Verify email address is verified in Resend
3. Check email logs in database
4. Check Sentry for errors

### SMS Not Sending

1. Check Twilio credentials
2. Verify phone number format (+1234567890)
3. Check SMS logs in database
4. Check Twilio console for errors

### Milestones Not Creating

1. Check database connection
2. Verify RLS policies
3. Check Sentry for errors
4. Verify user authentication

### Metrics Not Updating

1. Check database query performance
2. Verify user has data
3. Check Redis cache (if enabled)
4. Check Honeycomb for slow queries

## Rollback Procedure

If critical issues occur:

```bash
# Identify problematic commit
git log --oneline

# Revert to previous version
git revert <commit>

# Push to trigger redeployment
git push origin main

# Monitor deployment
render logs --service proinvoice-app

# Verify rollback successful
curl https://proinvoice.app/health
```

## Performance Optimization

### Caching

```typescript
// Enable Redis caching for metrics
const metrics = await getCashflowMetrics(userId, { cache: true });
```

### Database Optimization

```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_milestone_payments_status ON milestone_payments(status);
CREATE INDEX idx_milestone_payments_due_date ON milestone_payments(due_date);
CREATE INDEX idx_estimates_user_id ON estimates(user_id);
```

### CDN Configuration

1. Go to Render dashboard
2. Enable CDN for static assets
3. Configure cache headers
4. Verify in browser DevTools

## Security Checklist

- [ ] All secrets in environment variables
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] SSL/TLS enabled
- [ ] Security headers configured
- [ ] Regular security audits

## Support

For deployment issues:
1. Check logs: `render logs --service proinvoice-app`
2. Check Sentry: https://sentry.io
3. Check Honeycomb: https://ui.honeycomb.io
4. Contact DevOps team

## Next Steps

After successful deployment:
1. Monitor metrics for 24 hours
2. Gather user feedback
3. Optimize based on performance data
4. Plan next feature release

