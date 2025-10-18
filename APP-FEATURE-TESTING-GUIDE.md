# 🧪 APP FEATURE TESTING GUIDE

**Date:** October 17, 2025  
**Status:** Ready for Testing

---

## ✅ FEATURES TO TEST

### **1. ACCOUNT CREATION & AUTHENTICATION**

**Test Steps:**
1. Go to: https://www.proinvoice.app/auth
2. Click "Sign Up" tab
3. Enter:
   - Email: `test-user-$(date +%s)@example.com`
   - Password: `TestPassword123!`
   - Confirm Password: `TestPassword123!`
4. Click "Create Account"

**Expected Results:**
- ✅ Account created successfully
- ✅ Confirmation email sent
- ✅ User redirected to home page
- ✅ Stripe customer created automatically
- ✅ `user_subscriptions` table has entry with `stripe_customer_id`

**What to Check:**
- [ ] No error messages
- [ ] Email confirmation works
- [ ] User can sign in after confirming email
- [ ] Stripe customer ID is populated

---

### **2. SIGN IN**

**Test Steps:**
1. Go to: https://www.proinvoice.app/auth
2. Click "Sign In" tab
3. Enter email and password from Test 1
4. Click "Sign In"

**Expected Results:**
- ✅ User signed in successfully
- ✅ Redirected to home page
- ✅ User profile visible in top right

**What to Check:**
- [ ] No error messages
- [ ] Session persists on page reload
- [ ] Can access protected pages

---

### **3. CREATE INVOICE (FREE PLAN)**

**Test Steps:**
1. Sign in with test account
2. Go to: https://www.proinvoice.app/invoice
3. Fill in invoice details:
   - Client Name: "Test Client"
   - Amount: $100.00
   - Description: "Test Invoice"
4. Click "Create Invoice"

**Expected Results:**
- ✅ Invoice created successfully
- ✅ Invoice appears in list
- ✅ Can view invoice details
- ✅ Can download PDF

**What to Check:**
- [ ] Invoice saves to database
- [ ] Invoice number is generated
- [ ] Can edit invoice
- [ ] Can delete invoice

---

### **4. PURCHASE SUBSCRIPTION (LITE PLAN)**

**Test Steps:**
1. Go to: https://www.proinvoice.app/pricing
2. Click "Get Started" on Lite plan ($9/month)
3. Review checkout details
4. Use Stripe test card: `4242 4242 4242 4242`
5. Expiry: `12/25`
6. CVC: `123`
7. Click "Subscribe"

**Expected Results:**
- ✅ Checkout session created
- ✅ Stripe payment processed
- ✅ Webhook receives `checkout.session.completed`
- ✅ Webhook receives `customer.subscription.created`
- ✅ `user_subscriptions` updated with subscription details
- ✅ User profile shows "Lite" plan
- ✅ Redirected to success page

**What to Check:**
- [ ] Payment processed successfully
- [ ] Subscription status is "active"
- [ ] Credits are granted (2 for Lite)
- [ ] User can access paid features
- [ ] Can manage subscription in portal

---

### **5. UPGRADE SUBSCRIPTION (PRO PLAN)**

**Test Steps:**
1. Go to: https://www.proinvoice.app/subscription
2. Click "Manage Subscription"
3. Click "Upgrade to Pro"
4. Complete payment with test card
5. Confirm upgrade

**Expected Results:**
- ✅ Subscription upgraded
- ✅ Webhook receives `customer.subscription.updated`
- ✅ Plan changes to "Pro"
- ✅ Credits updated (6 for Pro)
- ✅ New billing cycle starts

**What to Check:**
- [ ] Upgrade completes without errors
- [ ] Billing amount updates
- [ ] Credits increase
- [ ] Can downgrade back to Lite

---

### **6. CREATE INVOICE PAYMENT LINK**

**Test Steps:**
1. Create an invoice (Test 3)
2. Click "Send Payment Link"
3. Copy payment link
4. Open in new incognito window
5. Click "Pay Now"
6. Use test card: `4242 4242 4242 4242`
7. Complete payment

**Expected Results:**
- ✅ Payment link generated
- ✅ Client can access payment page
- ✅ Payment processed
- ✅ Webhook receives `checkout.session.completed`
- ✅ Invoice marked as paid
- ✅ Confirmation email sent

**What to Check:**
- [ ] Payment link is unique
- [ ] Payment link expires after use
- [ ] Invoice status updates to "Paid"
- [ ] Payment recorded in database

---

### **7. CREATE ESTIMATE & DEPOSIT PAYMENT**

**Test Steps:**
1. Go to: https://www.proinvoice.app/estimates
2. Click "Create Estimate"
3. Fill in estimate details:
   - Client: "Test Client"
   - Items: Add line items
   - Total: $500.00
   - Deposit: 50% ($250.00)
4. Click "Create Estimate"
5. Click "Request Deposit"
6. Share link with client
7. Client pays deposit with test card

**Expected Results:**
- ✅ Estimate created
- ✅ Deposit payment link generated
- ✅ Client can pay deposit
- ✅ Webhook receives `checkout.session.completed`
- ✅ Invoice created from estimate
- ✅ Remaining balance calculated
- ✅ Payment link for balance generated

**What to Check:**
- [ ] Estimate saves correctly
- [ ] Deposit amount calculated correctly
- [ ] Invoice created with deposit credit
- [ ] Remaining balance is correct
- [ ] Can pay remaining balance

---

### **8. CANCEL SUBSCRIPTION**

**Test Steps:**
1. Go to: https://www.proinvoice.app/subscription
2. Click "Manage Subscription"
3. Click "Cancel Subscription"
4. Confirm cancellation

**Expected Results:**
- ✅ Subscription cancelled
- ✅ Webhook receives `customer.subscription.deleted`
- ✅ User profile shows "Free" plan
- ✅ User reverts to free plan limits

**What to Check:**
- [ ] Cancellation completes
- [ ] Plan reverts to free
- [ ] Can resubscribe later
- [ ] No errors in logs

---

## 🔍 WEBHOOK VERIFICATION

### **Check Webhook Logs:**

**In Supabase Dashboard:**
1. Go to: Functions → stripe-webhook
2. Click "Logs" tab
3. Look for recent webhook events

**Expected Logs:**
```
[STRIPE-WEBHOOK] Webhook received - Method: POST
[STRIPE-WEBHOOK] Event received - type: checkout.session.completed
[STRIPE-WEBHOOK] Checkout completed - sessionId: cs_...
[STRIPE-WEBHOOK] Processing subscription - subscriptionId: sub_...
[STRIPE-WEBHOOK] Subscription upserted - subscriptionId: sub_...
```

---

## 🚨 ERROR SCENARIOS TO TEST

### **Test: Invalid Payment Card**
- Use card: `4000 0000 0000 0002` (declined)
- Expected: Payment fails, error message shown

### **Test: Expired Card**
- Use card: `4000 0000 0000 0069` (expired)
- Expected: Payment fails, error message shown

### **Test: Insufficient Funds**
- Use card: `4000 0000 0000 9995` (insufficient funds)
- Expected: Payment fails, error message shown

---

## 📊 DATABASE VERIFICATION

### **Check User Created:**
```sql
SELECT id, email, created_at FROM auth.users 
WHERE email LIKE 'test-user-%' 
ORDER BY created_at DESC LIMIT 1;
```

### **Check Stripe Customer:**
```sql
SELECT user_id, stripe_customer_id, plan, status, created_at 
FROM user_subscriptions 
WHERE user_id = 'USER_ID_FROM_ABOVE'
ORDER BY created_at DESC;
```

### **Check Subscription:**
```sql
SELECT stripe_subscription_id, plan, status, current_period_start, current_period_end 
FROM user_subscriptions 
WHERE stripe_customer_id = 'CUSTOMER_ID_FROM_ABOVE';
```

### **Check Invoices:**
```sql
SELECT id, number, total, status, created_at 
FROM invoices 
WHERE user_id = 'USER_ID_FROM_ABOVE'
ORDER BY created_at DESC;
```

---

## ✅ SUCCESS CRITERIA

All tests pass when:
- ✅ Users can create accounts
- ✅ Users can sign in
- ✅ Users can create invoices
- ✅ Users can purchase subscriptions
- ✅ Webhooks process correctly
- ✅ Database updates correctly
- ✅ No errors in logs
- ✅ Payments process successfully


