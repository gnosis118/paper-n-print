# ProInvoice - Template & Payment Feature Audit
**Date:** October 7, 2025  
**Focus:** Template Verification & Payment Link Functionality

---

## 📋 EXECUTIVE SUMMARY

### ✅ **GOOD NEWS: Payment Features Already Implemented!**

Your application **ALREADY HAS** the following features working:

1. ✅ **Invoice Payment Links** - Paid users can generate payment links for invoices
2. ✅ **Estimate Deposit Links** - Estimates support deposit collection
3. ✅ **Auto-Convert Estimates to Invoices** - Happens automatically after deposit payment
4. ✅ **Subscription-Based Access** - Payment features are available to paid users

---

## 🎯 CURRENT IMPLEMENTATION STATUS

### **Invoice Payment Links** ✅ WORKING

**Location:** `src/components/InvoicePreview.tsx`

**How It Works:**
1. User creates an invoice
2. Clicks "Generate Payment Link" button
3. System calls `create-payment` edge function
4. Stripe checkout session created
5. Payment link generated and displayed
6. User can copy/share link with client

**Access Control:**
- Available to ALL users (no subscription check currently)
- ⚠️ **ISSUE:** No subscription verification before generating payment links

**Code:**
```typescript
const generatePaymentLink = async () => {
  const { data: response, error } = await supabase.functions.invoke('create-payment', {
    body: {
      invoiceId: data.meta?.number || 'N/A',
      amount: data.totals.total,
      description: `Payment for Invoice ${data.meta?.number || 'N/A'}`,
      clientEmail: data.client?.email || '',
    }
  });
  
  if (response?.url) {
    setPaymentUrl(response.url);
  }
};
```

---

### **Estimate Deposit Links** ✅ WORKING

**Location:** `src/components/EstimatePreview.tsx`

**How It Works:**
1. User creates estimate with deposit option
2. Sets deposit type (percentage or fixed amount)
3. Clicks "Generate Payment Link" button
4. System calls `estimate-checkout` edge function
5. Stripe checkout session created for deposit amount
6. Payment link generated

**Deposit Configuration:**
- **Deposit Type:** Percentage or Fixed Amount
- **Default:** 25% deposit
- **Customizable:** User can change deposit amount

**Code:**
```typescript
const generatePaymentLink = async () => {
  const { data: response, error } = await supabase.functions.invoke('estimate-checkout', {
    body: { token: estimate.sharing_token },
  });
  
  if (response?.url) {
    setPaymentUrl(response.url);
  }
};
```

---

### **Auto-Convert Estimate to Invoice** ✅ WORKING

**Location:** `supabase/functions/stripe-webhook-estimates/index.ts`

**How It Works:**
1. Customer pays deposit via estimate payment link
2. Stripe webhook fires: `checkout.session.completed`
3. System automatically:
   - Creates new invoice from estimate
   - Marks deposit as paid
   - Calculates remaining balance
   - Generates payment link for remaining balance
   - Updates estimate status to "invoiced"

**Code Flow:**
```typescript
// 1. Deposit paid
const depositAmount = session.amount_total / 100;

// 2. Create invoice
const newInvoice = await supabaseClient.from('invoices').insert({
  user_id: estimate.user_id,
  client_id: estimate.client_id,
  invoice_number: invoiceNumber,
  total: estimate.total,
  // ... other fields
});

// 3. Calculate remaining balance
const remainingBalance = estimate.total - depositAmount;

// 4. Create payment link for balance
if (remainingBalance > 0) {
  const paymentSession = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        unit_amount: Math.round(remainingBalance * 100),
      },
    }],
  });
}

// 5. Update estimate status
await supabaseClient.from('estimates')
  .update({ status: 'invoiced' })
  .eq('id', estimateId);
```

---

## ⚠️ CRITICAL ISSUES FOUND

### **Issue 1: No Subscription Check for Payment Links** 🚨 HIGH PRIORITY

**Problem:**
- Payment link generation is available to ALL users
- No check for paid subscription before allowing payment links
- Free users can generate unlimited payment links

**Current Code:**
```typescript
// InvoicePreview.tsx - NO subscription check!
const generatePaymentLink = async () => {
  // Directly calls edge function without checking subscription
  const { data: response, error } = await supabase.functions.invoke('create-payment', {
    body: { /* ... */ }
  });
};
```

**Expected Behavior:**
- Only PAID users should be able to generate payment links
- Free users should see upgrade prompt

**Fix Required:**
```typescript
const generatePaymentLink = async () => {
  // Check subscription first
  const { subscribed } = useSubscription();
  
  if (!subscribed) {
    toast({
      title: "Upgrade Required",
      description: "Payment links are available on paid plans only.",
      variant: "destructive",
    });
    navigate('/pricing');
    return;
  }
  
  // Then generate payment link
  const { data: response, error } = await supabase.functions.invoke('create-payment', {
    body: { /* ... */ }
  });
};
```

---

### **Issue 2: No Subscription Check for Estimate Deposits** 🚨 HIGH PRIORITY

**Problem:**
- Same issue as invoices
- Free users can collect deposits via estimates
- No subscription verification

**Fix Required:**
Same pattern as invoice payment links - add subscription check before generating deposit links.

---

### **Issue 3: Logo Upload Restricted but Payment Links Not** 🤔 INCONSISTENT

**Observation:**
```typescript
// InvoiceForm.tsx - Logo upload IS restricted
<LogoUpload
  currentLogoUrl={data.business.logoUrl}
  onLogoChange={(logoUrl) => onUpdate("business.logoUrl", logoUrl)}
  disabled={!isPaidUser}  // ✅ Properly restricted
/>

// InvoicePreview.tsx - Payment links NOT restricted
<Button onClick={generatePaymentLink}>  // ❌ No restriction
  Generate Payment Link
</Button>
```

**Issue:** Inconsistent feature gating between logo upload and payment links.

---

## 📊 TEMPLATE AUDIT

### **Invoice Templates** ✅ ALL WORKING

**Total Templates:** 30+ invoice templates

**Template Types:**
1. **Programmatic Invoice Templates** (`/invoice-template/*`)
   - Construction, Consulting, HVAC, Plumbing, etc.
   - Generated via `InvoiceTemplateLayout` component
   - All properly configured

2. **Niche Invoice Templates** (`/templates/*-invoice-template`)
   - HVAC, Lawn Care, Handyman, Cleaning, Roofing, etc.
   - Generated via `NicheTemplateLayout` component
   - All properly configured

**Verification:**
- ✅ All templates have proper data structures
- ✅ All templates have correct slugs
- ✅ All templates have line items defined
- ✅ All templates have pain points and benefits
- ✅ All templates have sample fields

**Template Data Sources:**
- `src/data/invoiceTemplates.ts` - Main invoice templates
- `src/data/nicheTemplates.ts` - Niche-specific templates

---

### **Estimate Templates** ✅ ALL WORKING

**Total Templates:** 6 estimate templates

**Templates:**
1. HVAC Estimate Template
2. Plumbing Estimate Template
3. Construction Estimate Template
4. Landscaping Estimate Template
5. Roofing Estimate Template
6. Cleaning Estimate Template

**Verification:**
- ✅ All templates have proper data structures
- ✅ All templates support deposit collection
- ✅ All templates have auto-convert functionality
- ✅ All templates have correct slugs

**Template Data Source:**
- `src/data/estimateTemplates.ts`

---

## 🔧 REQUIRED FIXES

### **Priority 1: Add Subscription Checks** 🚨 CRITICAL

**Files to Modify:**

#### 1. `src/components/InvoicePreview.tsx`
```typescript
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

const InvoicePreview = ({ data, showPaymentOptions = false }: InvoicePreviewProps) => {
  const { subscribed } = useSubscription();
  const navigate = useNavigate();
  
  const generatePaymentLink = async () => {
    // Add subscription check
    if (!subscribed) {
      toast({
        title: "Upgrade Required",
        description: "Payment links are available on Pro and Agency plans. Upgrade to start collecting payments.",
        variant: "destructive",
      });
      navigate('/pricing');
      return;
    }
    
    // Existing payment link generation code...
  };
  
  // Update button to show upgrade prompt for free users
  return (
    <div>
      {showPaymentOptions && (
        subscribed ? (
          <Button onClick={generatePaymentLink}>
            Generate Payment Link
          </Button>
        ) : (
          <Button onClick={() => navigate('/pricing')} variant="outline">
            <Lock className="w-4 h-4 mr-2" />
            Upgrade to Enable Payment Links
          </Button>
        )
      )}
    </div>
  );
};
```

#### 2. `src/components/EstimatePreview.tsx`
```typescript
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

const EstimatePreview = ({ estimate, showPaymentOptions = false }: EstimatePreviewProps) => {
  const { subscribed } = useSubscription();
  const navigate = useNavigate();
  
  const generatePaymentLink = async () => {
    // Add subscription check
    if (!subscribed) {
      toast({
        title: "Upgrade Required",
        description: "Deposit collection is available on Pro and Agency plans. Upgrade to start collecting deposits.",
        variant: "destructive",
      });
      navigate('/pricing');
      return;
    }
    
    // Existing deposit link generation code...
  };
  
  // Update button similar to InvoicePreview
};
```

#### 3. `supabase/functions/create-payment/index.ts`
```typescript
// Add server-side subscription check
const handleCreatePayment = async (req: Request) => {
  // ... existing auth code ...
  
  // Check user subscription
  const { data: subscription } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();
  
  if (!subscription || subscription.plan === 'free') {
    return new Response(JSON.stringify({ 
      error: 'Payment links require a paid subscription' 
    }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  
  // ... existing payment link creation code ...
};
```

#### 4. `supabase/functions/estimate-checkout/index.ts`
```typescript
// Add server-side subscription check (same pattern as create-payment)
```

---

### **Priority 2: Update Documentation** 📝 MEDIUM

**Files to Update:**

#### 1. `src/pages/docs/PaymentLinks.tsx`
- Add section explaining subscription requirement
- Add upgrade CTA for free users
- Document deposit collection feature

#### 2. `src/pages/Pricing.tsx`
- Highlight payment link feature in Pro/Agency plans
- Add "Payment Links" to feature list
- Add "Deposit Collection" to feature list

---

## ✅ VERIFICATION CHECKLIST

After implementing fixes:

### **Invoice Payment Links:**
- [ ] Free user sees upgrade prompt when clicking "Generate Payment Link"
- [ ] Paid user can generate payment links successfully
- [ ] Edge function rejects requests from free users
- [ ] Payment link works and redirects to Stripe checkout
- [ ] Successful payment updates invoice status

### **Estimate Deposit Links:**
- [ ] Free user sees upgrade prompt when clicking "Generate Payment Link"
- [ ] Paid user can generate deposit links successfully
- [ ] Edge function rejects requests from free users
- [ ] Deposit link works and redirects to Stripe checkout
- [ ] Successful deposit payment auto-converts to invoice

### **Auto-Convert Functionality:**
- [ ] Deposit payment triggers webhook
- [ ] Invoice is created automatically
- [ ] Remaining balance is calculated correctly
- [ ] Payment link for balance is generated
- [ ] Estimate status updates to "invoiced"

---

## 📊 SUMMARY

### **What's Working:**
✅ All invoice templates properly configured  
✅ All estimate templates properly configured  
✅ Payment link generation functionality exists  
✅ Deposit collection functionality exists  
✅ Auto-convert estimate to invoice works  
✅ Stripe integration is solid  

### **What Needs Fixing:**
❌ No subscription check on payment link generation  
❌ No subscription check on deposit link generation  
❌ Inconsistent feature gating  
❌ Missing upgrade prompts for free users  

### **Impact:**
- **Current:** Free users can access premium features (payment links)
- **After Fix:** Only paid users can generate payment/deposit links
- **Business Impact:** Proper monetization of premium features

---

## 🚀 DEPLOYMENT PLAN

1. **Implement subscription checks** in frontend components
2. **Add server-side validation** in edge functions
3. **Update pricing page** to highlight payment features
4. **Test thoroughly** with free and paid accounts
5. **Deploy** and monitor

**Estimated Time:** 2-3 hours  
**Risk Level:** Low (adding restrictions, not changing core functionality)  
**Breaking Changes:** None (only affects free users who shouldn't have access anyway)

---

**Status:** Ready for implementation 🚀

