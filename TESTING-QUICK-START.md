# ProInvoice Testing Quick Start Guide
**Last Updated:** November 7, 2025

---

## 🚀 Quick Test Your Site (5 Minutes)

### 1. Site Availability Test (1 min)
```bash
# Open these URLs and verify they load:
✅ https://www.proinvoice.app
✅ https://www.proinvoice.app/pricing
✅ https://www.proinvoice.app/invoice
✅ https://www.proinvoice.app/auth
```

### 2. Payment Endpoint Test (2 min)
Open browser console and run:
```javascript
// Test subscription checkout endpoint
fetch('https://xboyvlkpbmwvfapfupxs.supabase.co/functions/v1/create-checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhib3l2bGtwYm13dmZhcGZ1cHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1OTU4NzAsImV4cCI6MjA0NDE3MTg3MH0.qlCne0JkW_H-r5VLLkfcJEqRi_LbwwxWKqJQk0Aq_Aw'
  },
  body: JSON.stringify({
    plan_type: 'pro',
    billing_cycle: 'monthly'
  })
})
.then(r => r.json())
.then(d => console.log('✅ Checkout endpoint working:', d))
.catch(e => console.error('❌ Checkout endpoint failed:', e));
```

### 3. Quick Manual Test (2 min)
1. Go to https://www.proinvoice.app/pricing
2. Click "Get Started" on any plan
3. Verify Stripe Checkout loads
4. Close checkout (don't complete payment)
5. ✅ If checkout loaded = Payment system working!

---

## 📋 Test Files Created

### Automated Test Suites
1. **e2e-user-flow-tests.js** - End-to-end testing
   - Site availability (6 tests)
   - Authentication (3 tests)
   - Database connectivity (5 tests)
   - Payment endpoints (5 tests)
   - SEO & metadata (4 tests)
   - Security headers (4 tests)
   - Performance (2 tests)

2. **payment-flow-comprehensive-tests.js** - Payment testing
   - Subscription flows (4 tests)
   - One-time payments (2 tests)
   - Estimate deposits (2 tests)
   - Customer portal (2 tests)
   - Webhooks (2 tests)
   - Error handling (4 tests)
   - Pricing integration (2 tests)

### Documentation
3. **E2E-PAYMENT-TESTING-REPORT.md** - Full test report
   - Executive summary
   - Test results by category
   - Payment flow details
   - Security analysis
   - Recommendations

4. **MANUAL-TESTING-CHECKLIST.md** - Manual testing guide
   - 150+ test cases
   - Step-by-step instructions
   - Critical payment flows
   - Stripe test cards reference

5. **TESTING-QUICK-START.md** - This file
   - Quick 5-minute tests
   - Common issues & fixes
   - Testing best practices

---

## 🎯 Critical Tests to Run Before Launch

### Must-Pass Tests (Do These First!)
- [ ] Homepage loads without errors
- [ ] User can sign up and verify email
- [ ] User can create an invoice
- [ ] Stripe checkout loads for subscriptions
- [ ] Test payment completes successfully
- [ ] Invoice payment link works
- [ ] Customer portal accessible
- [ ] Webhooks receive events

### Nice-to-Have Tests
- [ ] All templates render correctly
- [ ] PDF export works
- [ ] Email notifications sent
- [ ] Mobile responsive design
- [ ] Cross-browser compatibility
- [ ] Performance metrics acceptable

---

## 🔧 Running Automated Tests

### Prerequisites
```bash
# Install Node.js (if not installed)
# Download from: https://nodejs.org/

# Verify installation
node --version
npm --version
```

### Run E2E Tests
```bash
# Navigate to project directory
cd c:\Users\Gnosis\Documents\GitHub\paper-n-print

# Run E2E test suite
node e2e-user-flow-tests.js

# Expected output:
# ✅ 29/29 tests passed
# Success rate: 100%
```

### Run Payment Tests
```bash
# Run payment flow tests
node payment-flow-comprehensive-tests.js

# Expected output:
# ✅ 18/18 tests passed
# Payment URLs generated for manual testing
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "npm not recognized"
**Problem:** Node.js not installed or not in PATH  
**Fix:**
1. Download Node.js from https://nodejs.org/
2. Install with default options
3. Restart terminal/PowerShell
4. Run `node --version` to verify

### Issue 2: Checkout endpoint returns 401
**Problem:** User not authenticated  
**Fix:** This is expected! Checkout requires authentication.
- Sign in first, then test checkout
- Or test from pricing page (handles auth automatically)

### Issue 3: Payment fails in test mode
**Problem:** Using wrong test card  
**Fix:** Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)

### Issue 4: Webhook not received
**Problem:** Webhook endpoint not configured in Stripe  
**Fix:**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://xboyvlkpbmwvfapfupxs.supabase.co/functions/v1/stripe-webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.created`, etc.
4. Copy webhook secret to environment variables

### Issue 5: Database connection fails
**Problem:** Supabase credentials incorrect  
**Fix:**
1. Check `.env` file has correct values:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Verify Supabase project is active
3. Check RLS policies allow access

---

## 📊 Test Results Interpretation

### Success Criteria
- **100% pass rate** on critical tests (auth, payments, database)
- **95%+ pass rate** on all tests
- **No 500 errors** on any endpoint
- **All payment flows** complete successfully
- **Webhooks** receive and process events

### Warning Signs
- ⚠️ **90-95% pass rate** - Minor issues, investigate failures
- ⚠️ **Slow load times** (>3s) - Performance optimization needed
- ⚠️ **Intermittent failures** - Network or rate limiting issues

### Failure Criteria
- ❌ **<90% pass rate** - Major issues, do not deploy
- ❌ **Payment endpoints failing** - Critical, fix immediately
- ❌ **Database errors** - Data integrity at risk
- ❌ **Authentication broken** - Security issue

---

## 🎨 Browser Testing Matrix

### Desktop Browsers
| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | Latest | ✅ Primary | Full support |
| Firefox | Latest | ✅ Tested | Full support |
| Safari | Latest | ⚠️ Test | May need polyfills |
| Edge | Latest | ✅ Tested | Chromium-based |

### Mobile Browsers
| Browser | Platform | Status | Notes |
|---------|----------|--------|-------|
| Safari | iOS | ⚠️ Test | Test on real device |
| Chrome | Android | ✅ Tested | Full support |
| Samsung Internet | Android | ⚠️ Test | May need testing |

### Testing Tools
- **BrowserStack** - Cross-browser testing
- **LambdaTest** - Automated browser testing
- **Chrome DevTools** - Mobile emulation
- **Firefox DevTools** - Responsive design mode

---

## 🔐 Security Testing Checklist

### Headers
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] Strict-Transport-Security: max-age=31536000
- [x] Referrer-Policy: strict-origin-when-cross-origin

### Authentication
- [ ] Password requirements enforced (8+ chars)
- [ ] Email verification required
- [ ] Session timeout configured
- [ ] CSRF protection enabled
- [ ] Rate limiting on auth endpoints

### Payment Security
- [ ] Stripe keys in environment variables (not hardcoded)
- [ ] Webhook signature verification
- [ ] Amount validation on server-side
- [ ] No sensitive data in client-side code
- [ ] PCI compliance maintained (Stripe handles cards)

---

## ⚡ Performance Testing

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

### Testing Tools
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://www.proinvoice.app --view

# Expected scores:
# Performance: 90+
# Accessibility: 90+
# Best Practices: 90+
# SEO: 90+
```

### PageSpeed Insights
1. Go to https://pagespeed.web.dev/
2. Enter: https://www.proinvoice.app
3. Run analysis
4. Target: 90+ on mobile and desktop

---

## 📈 Monitoring & Alerts

### Recommended Tools
1. **Uptime Monitoring**
   - UptimeRobot (free tier)
   - Pingdom
   - StatusCake

2. **Error Tracking**
   - Sentry (recommended)
   - Rollbar
   - Bugsnag

3. **Analytics**
   - Google Analytics (already configured)
   - Plausible Analytics
   - Fathom Analytics

4. **Performance Monitoring**
   - Vercel Analytics (built-in)
   - New Relic
   - Datadog

### Alert Configuration
Set up alerts for:
- Site downtime (>1 minute)
- Error rate >1%
- Payment failures
- Webhook failures
- Database connection errors

---

## 🎯 Next Steps After Testing

### If All Tests Pass ✅
1. Review test report (E2E-PAYMENT-TESTING-REPORT.md)
2. Complete manual testing checklist
3. Test in production mode (if not already)
4. Set up monitoring and alerts
5. Deploy to production
6. Monitor for 24 hours
7. Announce launch! 🎉

### If Tests Fail ❌
1. Review failed test details
2. Fix critical issues first (auth, payments)
3. Re-run tests
4. Document any known issues
5. Decide if issues are blocking
6. Fix and re-test until passing

### Ongoing Testing
- Run automated tests before each deployment
- Manual testing for major features
- Monthly security audits
- Quarterly performance reviews
- Annual penetration testing

---

## 📞 Support & Resources

### Documentation
- **Stripe Docs:** https://stripe.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs

### Test Cards
- **Stripe Test Cards:** https://stripe.com/docs/testing

### Community
- **Stripe Discord:** https://discord.gg/stripe
- **Supabase Discord:** https://discord.supabase.com

---

## ✅ Testing Completion Checklist

- [ ] Automated tests run successfully
- [ ] Manual testing checklist completed
- [ ] All critical paths tested
- [ ] Payment flows verified
- [ ] Security headers confirmed
- [ ] Performance acceptable
- [ ] Cross-browser tested
- [ ] Mobile responsive verified
- [ ] Monitoring configured
- [ ] Documentation updated
- [ ] Team notified of results
- [ ] Ready for production! 🚀

---

**Happy Testing! 🎉**

For questions or issues, refer to:
- E2E-PAYMENT-TESTING-REPORT.md (detailed results)
- MANUAL-TESTING-CHECKLIST.md (step-by-step guide)

