# ProInvoice Quick Start Guide - New Features

## 🚀 Getting Started with New Features

### 1. Change Order Management

**Create a Change Order:**
```typescript
import { createChangeOrder } from '@/lib/changeOrderService';

const changeOrder = await createChangeOrder(
  estimateId,
  userId,
  {
    title: 'Additional Electrical Work',
    description: 'Extra outlets in master bedroom',
    items: [
      { description: 'Outlet installation', quantity: 3, rate: 150 }
    ],
    reason: 'Client request'
  }
);
```

**Apply Change Order:**
```typescript
import { applyChangeOrder } from '@/lib/changeOrderService';

const result = await applyChangeOrder(changeOrderId, estimateId);
// Automatically updates estimate total
```

---

### 2. Deposit Staging

**Create Multi-Phase Deposits:**
```typescript
import { createDepositStages } from '@/lib/depositStagingService';

const stages = await createDepositStages(
  estimateId,
  userId,
  'split_30_40_30' // or 'split_50_50', 'split_25_25_25_25'
);
```

**Mark Deposit Paid:**
```typescript
import { markDepositStagePaid } from '@/lib/depositStagingService';

await markDepositStagePaid(depositStageId);
```

---

### 3. Progress Billing

**Create Progress Entry:**
```typescript
import { createProgressBillingEntry } from '@/lib/depositStagingService';

const entry = await createProgressBillingEntry(
  estimateId,
  userId,
  {
    description: 'Foundation and framing complete',
    percentageComplete: 40,
    amountToBill: 4000
  }
);
```

---

### 4. Onboarding Flow

**Initialize Onboarding:**
```typescript
import { initializeOnboarding } from '@/lib/onboardingService';

await initializeOnboarding(userId);
```

**Complete Onboarding Step:**
```typescript
import { completeOnboardingStep } from '@/lib/onboardingService';

await completeOnboardingStep(userId, stepId);
```

---

### 5. Analytics Tracking

**Track Estimate Creation:**
```typescript
import { trackEstimateCreated } from '@/lib/analyticsService';

await trackEstimateCreated(userId, {
  estimateId,
  amount: 5000,
  depositPercentage: 30,
  industry: 'HVAC'
});
```

**Get Conversion Metrics:**
```typescript
import { getConversionMetrics } from '@/lib/analyticsService';

const metrics = await getConversionMetrics(userId);
// Returns: estimateToInvoiceConversion, invoicePaymentRate
```

---

### 6. Sitemap Generation

**Generate Sitemap:**
```typescript
import { generateSitemap } from '@/lib/sitemapService';

const sitemapXml = generateSitemap('https://www.proinvoice.app');
// Returns XML string ready to serve
```

**Get Sitemap Stats:**
```typescript
import { getSitemapStats } from '@/lib/sitemapService';

const stats = getSitemapStats();
// Returns: totalUrls, lastUpdated, byChangeFreq, byPriority
```

---

### 7. Performance Monitoring

**Measure Core Web Vitals:**
```typescript
import { measureCoreWebVitals, reportCoreWebVitals } from '@/lib/performanceService';

const vitals = measureCoreWebVitals();
reportCoreWebVitals(vitals);
```

**Get Performance Score:**
```typescript
import { getPerformanceScore } from '@/lib/performanceService';

const score = getPerformanceScore(vitals);
// Returns 0-100 score
```

---

### 8. API Integration

**Convert Estimate to Invoice:**
```typescript
import { convertEstimateToInvoice } from '@/lib/apiIntegrationService';

const invoice = await convertEstimateToInvoice(
  estimateId,
  userId,
  {
    includeDeposit: true,
    depositPaid: true,
    dueDate: '2025-12-05'
  }
);
```

**Capture CRM Lead:**
```typescript
import { captureLead } from '@/lib/apiIntegrationService';

const lead = await captureLead(userId, {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '555-1234',
  company: 'ABC Construction',
  source: 'website'
});
```

**Register Webhook:**
```typescript
import { registerWebhook } from '@/lib/apiIntegrationService';

const webhook = await registerWebhook(userId, {
  url: 'https://example.com/webhooks',
  events: ['estimate_created', 'invoice_paid']
});
```

---

### 9. UI Components

**Add Related Links:**
```tsx
import RelatedLinks from '@/components/RelatedLinks';

<RelatedLinks 
  currentPage="/features/deposit-collection"
  maxLinks={6}
/>
```

**Add Breadcrumb Navigation:**
```tsx
import BreadcrumbNav from '@/components/BreadcrumbNav';

<BreadcrumbNav showHome={true} />
```

**Add Onboarding Wizard:**
```tsx
import OnboardingWizard from '@/components/OnboardingWizard';

<OnboardingWizard userId={userId} />
```

---

## 📊 New Routes

**Feature Pages:**
- `/features/milestone-payments`
- `/features/change-order-management`
- `/features/deposit-collection`
- `/features/progress-billing`

**Guide Pages:**
- `/guides/protecting-cashflow`
- `/guides/handling-change-orders`
- `/guides/multi-day-projects`

**Trade Pages:**
- `/hvac-contractors`
- `/general-contractors`
- `/plumbers`
- `/electricians`
- `/roofers`
- `/painters`
- `/landscapers`

**Utility Pages:**
- `/sitemap.xml` - Dynamic sitemap

---

## 🔧 Configuration

**Environment Variables:**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

**Database Setup:**
Run migrations:
```bash
supabase migration up
```

---

## 📚 Documentation

- **Change Orders:** See `src/lib/changeOrderService.ts`
- **Deposits:** See `src/lib/depositStagingService.ts`
- **Analytics:** See `src/lib/analyticsService.ts`
- **Performance:** See `src/lib/performanceService.ts`
- **API Integration:** See `src/lib/apiIntegrationService.ts`

---

## ✅ Testing Checklist

- [ ] Test change order creation and application
- [ ] Test deposit staging with different templates
- [ ] Test progress billing entries
- [ ] Test onboarding flow completion
- [ ] Test analytics event tracking
- [ ] Test sitemap generation
- [ ] Test Core Web Vitals measurement
- [ ] Test API endpoints
- [ ] Test webhook registration
- [ ] Test related links display
- [ ] Test breadcrumb navigation

---

## 🐛 Troubleshooting

**Issue:** Change order not applying
- Check estimate exists and belongs to user
- Verify change order status is 'pending'

**Issue:** Deposits not calculating correctly
- Ensure percentages total 100%
- Check deposit_stages table for duplicates

**Issue:** Analytics not tracking
- Verify analytics_events table exists
- Check user_id is valid

**Issue:** Sitemap not generating
- Verify sitemapService is imported
- Check base URL is correct

---

**Last Updated:** November 5, 2025

