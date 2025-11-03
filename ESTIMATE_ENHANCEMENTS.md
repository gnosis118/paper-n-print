# ProInvoice Estimate System - Advanced Enhancements

## Overview
This document outlines the advanced features added to the ProInvoice estimate-to-invoice automation system.

## 1. Scheduled Reminders for Unpaid Estimates

### Feature Description
Automatically send reminder emails to clients who haven't paid their estimate deposits after a configurable number of days.

### Implementation
- **Edge Function**: `supabase/functions/send-estimate-reminders/index.ts`
- **Database Table**: `estimate_reminders` - Tracks sent reminders per estimate
- **Configuration**: Customizable reminder timing and max reminders per estimate

### How It Works
1. Function queries estimates in "sent" status created more than X days ago
2. Checks if max reminders haven't been exceeded
3. Sends personalized reminder email to client
4. Records reminder in database to prevent duplicates

### Usage
```typescript
// Call the edge function
const { data, error } = await supabase.functions.invoke('send-estimate-reminders', {
  body: {
    daysUntilReminder: 3,  // Send reminder 3 days after creation
    maxReminders: 3,        // Max 3 reminders per estimate
  },
});
```

### Default Configuration
- **Days Until Reminder**: 3 days
- **Max Reminders**: 3 per estimate
- **Email Template**: Friendly reminder with payment link

---

## 2. Dashboard Analytics for Conversion Rates

### Feature Description
Real-time analytics dashboard showing estimate performance metrics and conversion rates.

### Implementation
- **Hook**: `src/hooks/useEstimateAnalytics.ts`
- **Component**: `src/components/EstimateAnalyticsDashboard.tsx`
- **Location**: Analytics tab in Estimates page

### Key Metrics
- **Total Estimates**: Count of all estimates created
- **Conversion Rate**: Percentage of sent estimates that became invoices
- **Total Value**: Sum of all estimate amounts
- **Deposits Collected**: Total deposits from accepted estimates
- **Average Time to Accept**: Days from creation to payment
- **Status Breakdown**: Visual breakdown of estimate statuses

### Features
- Real-time updates via Supabase subscriptions
- Status distribution visualization
- Recent estimates list
- Mobile-responsive design
- Automatic recalculation on data changes

### Metrics Calculated
```typescript
interface EstimateAnalytics {
  totalEstimates: number;
  sentEstimates: number;
  acceptedEstimates: number;
  invoicedEstimates: number;
  conversionRate: number;        // (invoiced / sent) * 100
  averageTimeToAccept: number;   // Days
  totalEstimateValue: number;
  totalDepositCollected: number;
  estimatesByStatus: {
    sent: number;
    accepted: number;
    invoiced: number;
  };
  recentEstimates: EstimateData[];
}
```

---

## 3. Bulk Estimate Creation from Templates

### Feature Description
Create multiple estimates quickly using saved templates, perfect for recurring projects or standardized services.

### Implementation
- **Hook**: `src/hooks/useEstimateTemplates.ts`
- **Component**: `src/components/BulkEstimateCreator.tsx`
- **Database Table**: `estimate_templates`

### How It Works
1. Save estimate as template (name, items, tax rate, deposit %)
2. Select template from list
3. Add multiple clients (name, email)
4. Create all estimates at once
5. Clients receive estimate emails automatically

### Template Features
- Store line items, tax rates, and deposit percentages
- Add descriptions for easy identification
- Edit or delete templates anytime
- View template details before bulk creation

### Database Schema
```sql
CREATE TABLE estimate_templates (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  items JSONB,
  tax_rate NUMERIC,
  deposit_percentage INTEGER,
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Usage
```typescript
// Save a template
const template = await saveTemplate({
  name: 'Standard Web Design',
  items: [...],
  tax_rate: 8,
  deposit_percentage: 50,
});

// Create bulk estimates
const bulkCreator = <BulkEstimateCreator />;
```

---

## 4. Estimate Versioning/Revisions

### Feature Description
Track all changes to estimates with full revision history and ability to restore previous versions.

### Implementation
- **Hook**: `src/hooks/useEstimateRevisions.ts`
- **Component**: `src/components/EstimateRevisionHistory.tsx`
- **Database Table**: `estimate_revisions`

### How It Works
1. Every estimate change creates a new revision
2. Each revision stores complete estimate snapshot
3. View full revision history with timestamps
4. Restore any previous version with one click
5. Restoring creates a new revision documenting the restore

### Revision Information Stored
- Version number (auto-incrementing)
- Complete estimate data (items, totals, deposit %)
- Change description (what changed)
- Timestamp of change
- User who made the change

### Features
- Expandable revision cards showing details
- Quick restore button for each version
- Confirmation dialog before restore
- Automatic version numbering
- Change descriptions for context

### Database Schema
```sql
CREATE TABLE estimate_revisions (
  id UUID PRIMARY KEY,
  estimate_id UUID REFERENCES estimates(id),
  user_id UUID REFERENCES auth.users(id),
  version_number INTEGER,
  title TEXT,
  items JSONB,
  subtotal NUMERIC,
  tax_rate NUMERIC,
  tax_amount NUMERIC,
  total NUMERIC,
  deposit_percentage INTEGER,
  deposit_amount NUMERIC,
  notes TEXT,
  change_description TEXT,
  created_at TIMESTAMP
);
```

### Usage
```typescript
const { revisions, createRevision, restoreRevision } = useEstimateRevisions(estimateId);

// Create a revision when estimate changes
await createRevision(estimateData, 'Updated line items and tax rate');

// Restore a previous version
await restoreRevision(revisions[2]);
```

---

## Database Changes Summary

### New Tables
1. **estimate_reminders** - Tracks sent reminder emails
2. **estimate_templates** - Stores reusable estimate templates
3. **estimate_revisions** - Stores version history

### Indexes Added
- `idx_estimate_reminders_estimate_id`
- `idx_estimate_reminders_user_id`
- `idx_estimate_reminders_sent_at`
- `idx_estimate_templates_user_id`
- `idx_estimate_templates_created_at`
- `idx_estimate_revisions_estimate_id`
- `idx_estimate_revisions_user_id`
- `idx_estimate_revisions_version`

### Row Level Security (RLS)
All new tables have RLS policies ensuring users can only access their own data.

---

## Integration Points

### Estimates Page
- New "Analytics" tab showing dashboard
- "Bulk Create" button for template-based creation
- Revision history accessible from estimate details

### Email Automation
- Reminders integrated with send-estimate-email function
- Automatic email on bulk creation
- Reminder emails use same template system

### Stripe Integration
- Reminders sent only for "sent" status estimates
- Bulk creation respects subscription limits
- Revisions don't affect payment processing

---

## Performance Considerations

### Indexes
All frequently queried fields have indexes for fast lookups:
- User ID (all tables)
- Estimate ID (revisions, reminders)
- Status (estimates)
- Timestamps (for sorting)

### Subscriptions
Real-time updates use Supabase subscriptions:
- Analytics dashboard updates on estimate changes
- Revision history updates when new versions created
- Template list updates when templates added/deleted

### Pagination
- Analytics shows recent 5 estimates
- Revision history shows all versions (typically < 10)
- Template list loads all templates (typically < 50)

---

## Future Enhancements

1. **Scheduled Reminders**: Set up automatic reminder scheduling
2. **Template Sharing**: Share templates with team members
3. **Revision Comparison**: Side-by-side comparison of revisions
4. **Analytics Export**: Export analytics as PDF/CSV
5. **Bulk Actions**: Bulk delete, bulk send reminders
6. **Custom Reminder Timing**: Per-estimate reminder schedules
7. **Template Categories**: Organize templates by type
8. **Revision Comments**: Add notes to revisions

---

## Testing Checklist

- [ ] Create estimate and verify revision v1 created
- [ ] Edit estimate and verify new revision created
- [ ] Restore previous revision and verify data restored
- [ ] Save estimate as template
- [ ] Create bulk estimates from template
- [ ] Verify analytics dashboard shows correct metrics
- [ ] Run send-estimate-reminders function
- [ ] Verify reminder emails sent to clients
- [ ] Verify reminder count tracked correctly
- [ ] Test max reminders limit
- [ ] Verify RLS policies prevent unauthorized access

