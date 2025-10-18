# 🚨 STRIPE WEBHOOK ISSUES - ANALYSIS & FIXES

**Date:** October 17, 2025  
**Status:** Issues Found & Being Fixed

---

## 🔴 CRITICAL ISSUES FOUND

### **1. ❌ OUTDATED STRIPE API VERSION IN create-stripe-customer**

**Problem:**
- File: `supabase/functions/create-stripe-customer/index.ts`
- Using: `apiVersion: '2023-10-16'` (2 years old!)
- Should be: `apiVersion: '2025-08-27.basil'` (current)
- Also using old Stripe SDK: `stripe@14.21.0` (should be `stripe@18.5.0`)

**Impact:**
- ❌ Stripe API compatibility issues
- ❌ Missing new features and security patches
- ❌ Potential webhook failures
- ❌ Customer creation might fail silently

**Fix Applied:** ✅
```typescript
// BEFORE (WRONG)
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

// AFTER (CORRECT)
import Stripe from 'https://esm.sh/stripe@18.5.0';
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2025-08-27.basil',
});
```

---

### **2. ⚠️ POTENTIAL WEBHOOK SIGNATURE VERIFICATION ISSUE**

**Problem:**
- Both webhook handlers verify signatures correctly
- BUT: If `STRIPE_WEBHOOK_SECRET` is not set, webhook fails silently
- No fallback or clear error message

**Current Code:**
```typescript
const signature = req.headers.get("stripe-signature");
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

if (!signature || !webhookSecret) {
  throw new Error("Missing webhook signature or secret");
}
```

**Status:** ✅ Already has proper error handling

---

### **3. ⚠️ MISSING WEBHOOK EVENT HANDLERS**

**Problem:**
- Webhook only handles specific events:
  - ✅ `checkout.session.completed`
  - ✅ `customer.subscription.created`
  - ✅ `customer.subscription.updated`
  - ✅ `invoice.payment_succeeded`
  - ✅ `invoice.payment_failed`
  - ✅ `customer.subscription.deleted`
  - ❌ `charge.refunded` - NOT HANDLED
  - ❌ `payment_intent.payment_failed` - NOT HANDLED
  - ❌ `customer.updated` - NOT HANDLED

**Impact:**
- Refunds won't be processed
- Failed payments might not update status
- Customer updates won't sync

**Status:** ⚠️ Needs investigation

---

### **4. ⚠️ POTENTIAL RACE CONDITION IN SUBSCRIPTION LOOKUP**

**Problem:**
- When subscription webhook fires, it looks up user by `stripe_customer_id`
- If customer creation webhook hasn't completed yet, lookup fails
- Falls back to email lookup, which might fail

**Current Code (Line 150-172):**
```typescript
const { data: userSub } = await supabase
  .from('user_subscriptions')
  .select('user_id')
  .eq('stripe_customer_id', customerId)
  .single();

let userId = userSub?.user_id;

// If no user found, try to find by customer email
if (!userId) {
  const customer = await stripe.customers.retrieve(customerId as string);
  if ('email' in customer && customer.email) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', customer.email)
      .single();
    
    userId = profile?.id;
  }
}
```

**Status:** ✅ Has fallback, but could be improved

---

### **5. ⚠️ MISSING IDEMPOTENCY FOR SUBSCRIPTION UPDATES**

**Problem:**
- `customer.subscription.updated` event can fire multiple times
- No idempotency check - could update subscription multiple times
- Might cause duplicate credit grants

**Current Code (Line 198-203):**
```typescript
const { error } = await supabase
  .from('user_subscriptions')
  .upsert(subscriptionData, { 
    onConflict: 'stripe_subscription_id',
    ignoreDuplicates: false 
  });
```

**Status:** ✅ Uses `upsert` which is idempotent

---

## 🔧 FIXES APPLIED

### **Fix 1: Update Stripe SDK & API Version** ✅
- **File:** `supabase/functions/create-stripe-customer/index.ts`
- **Change:** Updated from `stripe@14.21.0` to `stripe@18.5.0`
- **Change:** Updated API version from `2023-10-16` to `2025-08-27.basil`
- **Status:** DEPLOYED

---

## 📋 REMAINING ISSUES TO CHECK

### **Issue 1: Webhook Endpoint Configuration**
- [ ] Verify webhook endpoints are registered in Stripe Dashboard
- [ ] Check webhook signing secret is correct
- [ ] Verify webhook is receiving events

### **Issue 2: Missing Event Handlers**
- [ ] Add `charge.refunded` handler
- [ ] Add `payment_intent.payment_failed` handler
- [ ] Add `customer.updated` handler

### **Issue 3: Database Constraints**
- [ ] Verify `user_subscriptions` table has proper constraints
- [ ] Check `stripe_subscription_id` is unique
- [ ] Verify `stripe_customer_id` is indexed

### **Issue 4: Error Logging**
- [ ] Check Supabase function logs for errors
- [ ] Monitor webhook delivery in Stripe Dashboard
- [ ] Set up alerts for webhook failures

---

## 🧪 TESTING CHECKLIST

### **Test 1: Account Creation**
- [ ] Create new account
- [ ] Verify Stripe customer is created
- [ ] Check `user_subscriptions` table has `stripe_customer_id`

### **Test 2: Subscription Purchase**
- [ ] Purchase a plan
- [ ] Verify webhook receives `checkout.session.completed`
- [ ] Verify webhook receives `customer.subscription.created`
- [ ] Check `user_subscriptions` table is updated
- [ ] Verify user profile shows paid plan

### **Test 3: Invoice Payment**
- [ ] Create invoice
- [ ] Process payment
- [ ] Verify webhook receives `checkout.session.completed`
- [ ] Check payment is recorded

### **Test 4: Estimate Payment**
- [ ] Create estimate
- [ ] Process deposit payment
- [ ] Verify webhook receives event
- [ ] Check invoice is created

---

## 📞 STRIPE WEBHOOK ENDPOINTS

**Main Webhook:**
```
https://hkzrfqpnkvpmsaeluksh.supabase.co/functions/v1/stripe-webhook
```

**Estimate Webhook:**
```
https://hkzrfqpnkvpmsaeluksh.supabase.co/functions/v1/stripe-webhook-estimates
```

**Events to Subscribe To:**
- ✅ `checkout.session.completed`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`
- ✅ `customer.subscription.deleted`
- ⚠️ `charge.refunded` (missing handler)
- ⚠️ `payment_intent.payment_failed` (missing handler)

---

## 🚀 NEXT STEPS

1. **Deploy the fix** - Update create-stripe-customer function
2. **Test account creation** - Verify Stripe customer is created
3. **Test subscription purchase** - Verify webhook processes correctly
4. **Monitor logs** - Check Supabase function logs for errors
5. **Add missing handlers** - Implement refund and payment failure handlers


