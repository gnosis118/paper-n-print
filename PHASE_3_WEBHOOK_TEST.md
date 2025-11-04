# Phase 3 — Webhook Testing Guide

## 🎯 Overview

This guide walks through testing the enhanced webhook with idempotency tracking and email confirmations.

---

## ✅ Prerequisites

1. **Database Migration Applied**
   ```sql
   -- Run in Supabase SQL Editor:
   -- supabase/migrations/20251104_add_idempotency_tracking.sql
   ```

2. **Environment Variables Set**
   - `STRIPE_SECRET_KEY` - Stripe secret key
   - `STRIPE_WEBHOOK_SECRET` - Webhook signing secret
   - `RESEND_API_KEY` - Resend email API key
   - `SUPABASE_URL` - Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` - Service role key

3. **Stripe CLI Installed**
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows (Chocolatey)
   choco install stripe-cli
   
   # Or download from: https://github.com/stripe/stripe-cli/releases
   ```

---

## 🧪 Test Scenarios

### Test 1: Basic Deposit Payment Flow

**Objective:** Verify estimate→invoice conversion and email sending

**Steps:**

1. **Create an estimate in the app**
   - Go to `/estimate`
   - Fill in client details
   - Add line items
   - Set deposit percentage (e.g., 30%)
   - Submit

2. **Get the checkout session ID**
   - Check browser console for `checkout_session_id`
   - Or query Supabase: `SELECT checkout_session_id FROM estimates WHERE id = 'YOUR_ESTIMATE_ID'`

3. **Simulate Stripe webhook locally**
   ```bash
   # Terminal 1: Start Stripe CLI listener
   stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook-estimates
   
   # Terminal 2: Trigger test event
   stripe trigger checkout.session.completed
   ```

4. **Verify results**
   - ✅ Estimate status changed to "invoiced"
   - ✅ Invoice created with remaining balance
   - ✅ Payment link generated for balance
   - ✅ Email sent to client
   - ✅ Webhook event recorded in `webhook_events` table
   - ✅ Email logged in `email_logs` table

---

### Test 2: Idempotency - Duplicate Webhook

**Objective:** Verify webhook doesn't create duplicate payments/invoices

**Steps:**

1. **Send the same webhook event twice**
   ```bash
   # Get the event ID from first test
   STRIPE_EVENT_ID="evt_xxxxx"
   
   # Send it again
   stripe trigger checkout.session.completed
   ```

2. **Verify idempotency**
   - ✅ Second webhook returns 200 OK
   - ✅ No duplicate payment created
   - ✅ No duplicate invoice created
   - ✅ Webhook event marked as already processed
   - ✅ Check logs: "Event already processed"

**SQL to verify:**
```sql
-- Check webhook events
SELECT stripe_event_id, status, processed_at 
FROM webhook_events 
ORDER BY created_at DESC 
LIMIT 5;

-- Check payments (should only have 1 for this estimate)
SELECT * FROM payments 
WHERE estimate_id = 'YOUR_ESTIMATE_ID' 
ORDER BY created_at DESC;

-- Check invoices (should only have 1 for this estimate)
SELECT * FROM invoices 
WHERE estimate_id = 'YOUR_ESTIMATE_ID' 
ORDER BY created_at DESC;
```

---

### Test 3: Email Confirmation

**Objective:** Verify deposit confirmation email is sent and logged

**Steps:**

1. **Complete a deposit payment**
   - Follow Test 1 steps

2. **Check email logs**
   ```sql
   SELECT * FROM email_logs 
   WHERE email_type = 'deposit_paid' 
   ORDER BY sent_at DESC 
   LIMIT 1;
   ```

3. **Verify email content**
   - ✅ Email received at client email
   - ✅ Subject: "Deposit Received - Invoice #INV-..."
   - ✅ Contains payment summary
   - ✅ Shows remaining balance
   - ✅ Includes invoice link
   - ✅ Professional formatting with gradient header

4. **Check Resend dashboard**
   - Go to https://resend.com/emails
   - Verify email appears in sent list
   - Check delivery status

---

### Test 4: Error Handling

**Objective:** Verify webhook handles errors gracefully

**Steps:**

1. **Test missing estimate ID**
   - Manually trigger webhook with no `estimate_id` in metadata
   - ✅ Webhook returns 200 OK
   - ✅ No error thrown
   - ✅ Logs show "No estimate ID in metadata"

2. **Test invalid estimate ID**
   - Trigger webhook with fake `estimate_id`
   - ✅ Webhook event recorded as failed
   - ✅ Error message logged
   - ✅ Webhook returns 500 (expected)
   - ✅ Check `webhook_events` table for error

3. **Test email failure**
   - Temporarily disable `RESEND_API_KEY`
   - Complete a deposit payment
   - ✅ Webhook still succeeds (email failure doesn't fail webhook)
   - ✅ Email logged as failed
   - ✅ Error message captured

---

## 📊 Database Verification

### Check Webhook Events
```sql
SELECT 
  stripe_event_id,
  event_type,
  estimate_id,
  invoice_id,
  status,
  error_message,
  processed_at
FROM webhook_events
ORDER BY created_at DESC
LIMIT 10;
```

### Check Email Logs
```sql
SELECT 
  recipient_email,
  email_type,
  subject,
  status,
  error_message,
  sent_at
FROM email_logs
ORDER BY sent_at DESC
LIMIT 10;
```

### Check Payment Idempotency
```sql
SELECT 
  stripe_event_id,
  estimate_id,
  amount,
  status,
  created_at
FROM payments
WHERE stripe_event_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🔍 Debugging

### View Webhook Logs
```bash
# In Supabase Dashboard → Edge Functions → stripe-webhook-estimates
# Click "Logs" tab to see real-time logs
```

### Check Function Errors
```bash
# Terminal with Stripe CLI
stripe logs tail
```

### Test Email Sending
```bash
# Manually invoke send-estimate-email function
curl -X POST http://localhost:54321/functions/v1/send-estimate-email \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "estimateId": "YOUR_ESTIMATE_ID",
    "type": "deposit_paid",
    "recipientEmail": "test@example.com"
  }'
```

---

## ✅ Acceptance Criteria

- [x] Webhook processes checkout.session.completed events
- [x] Idempotency tracking prevents duplicate payments
- [x] Idempotency tracking prevents duplicate invoices
- [x] Webhook events recorded in database
- [x] Email confirmations sent and logged
- [x] Enhanced email template with professional styling
- [x] Error handling graceful (doesn't fail on email errors)
- [x] All errors logged for debugging
- [x] Webhook returns 200 OK for all scenarios

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Run all test scenarios locally
- [ ] Verify database migration applied
- [ ] Verify environment variables set
- [ ] Test with real Stripe account (test mode)
- [ ] Monitor webhook logs for 24 hours
- [ ] Verify emails delivered to real email addresses
- [ ] Check database for any failed events
- [ ] Review error logs for any issues

---

**Created:** 2025-11-04  
**Status:** Ready for Testing

