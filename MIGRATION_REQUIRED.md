# ⚠️ MIGRATION REQUIRED - Apply Database Schema

## Current Status

The codebase has TypeScript errors because the migration file `supabase/migrations/20251103_create_estimates_table.sql` defines new tables that haven't been applied to your Supabase database yet.

**Affected Tables:**
- `estimate_revisions` - For version tracking
- `estimate_templates` - For bulk creation
- `estimate_reminders` - For reminder tracking

**Current Schema vs. Migration Schema:**

| Field | Current Schema | Migration Schema |
|-------|---|---|
| `deposit_*` | `deposit_type`, `deposit_value` | `deposit_percentage`, `deposit_amount` |
| `client_name` | ❌ Not in current schema | ✅ In migration |
| `sharing_token` | ✅ Exists | ✅ Exists |
| `public_slug` | ✅ Exists | ✅ Exists |

## How to Fix

### Option 1: Apply the Migration (Recommended)

1. **Go to Supabase Dashboard**
   - Navigate to your project
   - Go to SQL Editor

2. **Copy and paste the migration:**
   ```bash
   # File: supabase/migrations/20251103_create_estimates_table.sql
   ```

3. **Run the migration**
   - Click "Run" button
   - Verify all tables are created

4. **Regenerate TypeScript types**
   ```bash
   # In your project root:
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts
   ```

5. **Restart your dev server**
   ```bash
   npm run dev
   ```

### Option 2: Disable New Features (Temporary)

If you want to keep the current schema and disable the new features:

1. Comment out these imports in `src/pages/Estimates.tsx`:
   ```typescript
   // import { BulkEstimateCreator } from '@/components/BulkEstimateCreator';
   // import { EstimateAnalyticsDashboard } from '@/components/EstimateAnalyticsDashboard';
   ```

2. Remove these hooks from components:
   - `useEstimateRevisions`
   - `useEstimateTemplates`
   - `useEstimateAnalytics` (partially - fix field names)

## What Happens After Migration

Once you apply the migration:

✅ **New Features Enabled:**
- Estimate versioning with revision history
- Bulk estimate creation from templates
- Analytics dashboard with conversion tracking
- Automated reminders for unpaid estimates
- Reminder settings UI

✅ **Field Updates:**
- `deposit_percentage` (0-100) instead of `deposit_type`
- `deposit_amount` (calculated) instead of `deposit_value`
- `client_name` field for better tracking

✅ **New Tables:**
- `estimate_reminders` - Tracks sent reminders
- `estimate_templates` - Stores reusable templates
- `estimate_revisions` - Stores version history

## Verification Checklist

After applying the migration, verify:

- [ ] All 3 new tables exist in Supabase
- [ ] RLS policies are enabled on all tables
- [ ] Indexes are created for performance
- [ ] TypeScript types are regenerated
- [ ] No TypeScript errors in IDE
- [ ] `npm run build` completes successfully
- [ ] Dev server starts without errors

## Rollback Plan

If you need to rollback:

1. Go to Supabase SQL Editor
2. Run the rollback SQL:
   ```sql
   DROP TABLE IF EXISTS public.estimate_revisions CASCADE;
   DROP TABLE IF EXISTS public.estimate_templates CASCADE;
   DROP TABLE IF EXISTS public.estimate_reminders CASCADE;
   ```

3. Regenerate types:
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts
   ```

## Next Steps

1. **Apply the migration** (Option 1 recommended)
2. **Regenerate types**
3. **Restart dev server**
4. **Run tests**: `npm run test`
5. **Build**: `npm run build`

---

**Questions?** Check the migration file at: `supabase/migrations/20251103_create_estimates_table.sql`

