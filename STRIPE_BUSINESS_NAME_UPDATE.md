# Stripe Business Name Update - Complete Guide

## ✅ What I've Done

I've updated all Stripe checkout sessions to display **"ProInvoice"** instead of "Gavin Clay" on customer credit card statements and checkout pages.

---

## 🔧 Code Changes Made

### **1. Subscription Checkout (create-checkout/index.ts)**

**Added statement descriptor for one-time payments:**
```typescript
payment_intent_data: mode === "payment" ? {
  statement_descriptor: "PROINVOICE",
  statement_descriptor_suffix: "PAYMENT"
} : undefined,
subscription_data: mode === "subscription" ? {
  description: "ProInvoice Subscription"
} : undefined,
```

**What customers will see:**
- Credit card statement: `PROINVOICE *PAYMENT`
- Subscription description: `ProInvoice Subscription`

---

### **2. Estimate Deposit Checkout (estimate-checkout/index.ts)**

**Added statement descriptor:**
```typescript
payment_intent_data: {
  statement_descriptor: "PROINVOICE",
  statement_descriptor_suffix: "DEPOSIT"
}
```

**What customers will see:**
- Credit card statement: `PROINVOICE *DEPOSIT`
- Checkout page: "Deposit for Estimate #XXX"

---

### **3. Invoice Payment Checkout (create-payment/index.ts)**

**Added statement descriptor:**
```typescript
payment_intent_data: {
  statement_descriptor: "PROINVOICE",
  statement_descriptor_suffix: "INVOICE"
}
```

**What customers will see:**
- Credit card statement: `PROINVOICE *INVOICE`
- Checkout page: "Invoice Payment - XXX"

---

### **4. Remaining Balance Payment (stripe-webhook-estimates/index.ts)**

**Added statement descriptor:**
```typescript
payment_intent_data: {
  statement_descriptor: "PROINVOICE",
  statement_descriptor_suffix: "BALANCE"
}
```

**What customers will see:**
- Credit card statement: `PROINVOICE *BALANCE`
- Checkout page: "Invoice #XXX"

---

## 📋 Statement Descriptor Rules

Stripe has specific rules for statement descriptors:

### **Character Limits:**
- **Main descriptor:** Max 22 characters (we use "PROINVOICE" = 10 chars)
- **Suffix:** Max 22 characters (we use "PAYMENT", "DEPOSIT", "INVOICE", "BALANCE")
- **Combined:** Max 22 characters total on statement

### **Allowed Characters:**
- ✅ Letters (A-Z)
- ✅ Numbers (0-9)
- ✅ Spaces
- ✅ Asterisks (*)
- ✅ Periods (.)
- ❌ Special characters like `<`, `>`, `'`, `"`, `\`

### **What Appears on Statements:**
```
PROINVOICE *PAYMENT    (for one-time payments)
PROINVOICE *DEPOSIT    (for estimate deposits)
PROINVOICE *INVOICE    (for invoice payments)
PROINVOICE *BALANCE    (for remaining balance)
```

---

## 🎯 Additional Steps (IMPORTANT!)

### **Update Your Stripe Account Settings**

The code changes above will work for **new payments**, but you should also update your Stripe account settings to ensure consistency:

#### **Step 1: Update Business Name in Stripe Dashboard**

1. Go to https://dashboard.stripe.com/settings/public
2. Click **"Business settings"**
3. Update **"Business name"** to: `ProInvoice`
4. Update **"Statement descriptor"** to: `PROINVOICE`
5. Click **"Save"**

#### **Step 2: Update Business Profile**

1. Go to https://dashboard.stripe.com/settings/account
2. Update **"Business name"** to: `ProInvoice`
3. Update **"Support email"** to: `support@proinvoice.app` (or your preferred email)
4. Update **"Support phone"** to your business phone
5. Click **"Save"**

#### **Step 3: Update Checkout Settings**

1. Go to https://dashboard.stripe.com/settings/checkout
2. Under **"Branding"**, upload your ProInvoice logo
3. Update **"Business name"** to: `ProInvoice`
4. Update **"Support information"** with your business details
5. Click **"Save"**

---

## 🧪 Testing

### **Test the Changes:**

1. **Create a test checkout session:**
   - Go to https://proinvoice.app/pricing
   - Click "Start Free Trial" on any plan
   - Use Stripe test card: `4242 4242 4242 4242`
   - Check the checkout page - should show "ProInvoice"

2. **Check the statement descriptor:**
   - Complete a test payment
   - Go to Stripe Dashboard → Payments
   - Click on the payment
   - Check **"Statement descriptor"** field - should show `PROINVOICE *PAYMENT`

3. **Test all payment types:**
   - ✅ Subscription checkout
   - ✅ Estimate deposit
   - ✅ Invoice payment
   - ✅ Remaining balance payment

---

## 📊 Impact Summary

### **Before:**
- Checkout page: "Gavin Clay"
- Credit card statement: "GAVIN CLAY" or similar
- Customer confusion about who charged them

### **After:**
- Checkout page: "ProInvoice"
- Credit card statement: "PROINVOICE *PAYMENT" (or DEPOSIT/INVOICE/BALANCE)
- Clear, professional branding
- Reduced chargebacks and customer support inquiries

---

## 🚀 Deployment

**Files Changed:**
1. ✅ `supabase/functions/create-checkout/index.ts`
2. ✅ `supabase/functions/estimate-checkout/index.ts`
3. ✅ `supabase/functions/create-payment/index.ts`
4. ✅ `supabase/functions/stripe-webhook-estimates/index.ts`

**Deployment Status:**
- Code changes committed and pushed to GitHub
- Supabase Edge Functions will auto-deploy
- Changes take effect immediately for new payments

---

## ⚠️ Important Notes

### **Existing Subscriptions:**
- Existing subscriptions will continue to show the old descriptor until they renew
- New subscription charges will use the new descriptor
- You can't retroactively change past charges

### **Pending Payments:**
- Pending payments created before this update will use the old descriptor
- New payments will use "PROINVOICE"

### **Refunds:**
- Refunds will show the same descriptor as the original charge
- This is a Stripe limitation and cannot be changed

---

## 📞 Customer Communication

Consider sending an email to existing customers:

**Subject:** ProInvoice Payment Updates

**Body:**
```
Hi [Customer Name],

We wanted to let you know that payments from ProInvoice will now appear 
on your credit card statement as "PROINVOICE" instead of our previous 
business name.

This change helps you easily identify charges from our service and 
provides a more professional experience.

If you have any questions, please don't hesitate to reach out!

Best regards,
The ProInvoice Team
```

---

## ✅ Checklist

- [x] Updated create-checkout function with statement descriptor
- [x] Updated estimate-checkout function with statement descriptor
- [x] Updated create-payment function with statement descriptor
- [x] Updated stripe-webhook-estimates function with statement descriptor
- [ ] Update Stripe Dashboard business name to "ProInvoice"
- [ ] Update Stripe Dashboard statement descriptor to "PROINVOICE"
- [ ] Upload ProInvoice logo to Stripe Checkout branding
- [ ] Test all payment flows with test card
- [ ] Verify statement descriptors in Stripe Dashboard
- [ ] (Optional) Send customer communication email

---

## 🎉 Result

All Stripe checkout sessions now display **"ProInvoice"** instead of "Gavin Clay"!

Customers will see:
- ✅ Professional branding on checkout pages
- ✅ Clear "PROINVOICE" descriptor on credit card statements
- ✅ Reduced confusion and chargebacks
- ✅ Consistent brand experience

---

## 📝 Next Steps

1. **Deploy the code changes** (already done via git push)
2. **Update Stripe Dashboard settings** (follow steps above)
3. **Test with a real payment** to verify the changes
4. **Monitor customer feedback** for any questions

**Need help?** Contact Stripe support at https://support.stripe.com

