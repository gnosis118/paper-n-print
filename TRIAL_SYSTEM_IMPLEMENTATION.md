# 7-Day Free Trial System Implementation

## Overview
Implemented a complete 7-day free trial system that automatically gives new users access to all features with limited usage (3 templates/invoices), then converts them to a free plan after the trial expires.

## What Was Implemented

### 1. Database Migration (`supabase/migrations/20251026_add_trial_system.sql`)
- Added trial-related columns to `user_subscriptions` table:
  - `is_trial` (boolean) - Whether user is on trial
  - `trial_start_date` (timestamp) - When trial started
  - `trial_end_date` (timestamp) - When trial expires (7 days from signup)
  - `trial_status` (text) - Status: 'active', 'expired', 'converted'

- Updated `handle_new_user_subscription()` trigger to:
  - Set `is_trial = true` for new users
  - Set trial dates (now + 7 days)
  - Set features to: 3 templates, no watermark, 3 export limit

- Created `check_trial_expiration()` function to check if trial is expired
- Created `expire_trial()` function to convert trial to free plan
- Created `trial_expiration_notifications` table to track notifications

### 2. Frontend Hook (`src/hooks/useTrialStatus.ts`)
- `useTrialStatus()` hook that:
  - Fetches subscription info from database
  - Calculates days remaining
  - Checks if trial is expired
  - Automatically converts expired trials to free plan
  - Tracks if user has seen expiration notification
  - Real-time updates via Supabase subscriptions

### 3. Trial Expiration Popup (`src/components/TrialExpirationPopup.tsx`)
- Shows warning when trial has 2 days or less remaining
- Shows expiration notice when trial has ended
- Displays free plan limitations:
  - 3 invoices/estimates per month
  - Watermark on documents
  - Limited templates
  - No online payments
  - No deposit collection
- Two buttons:
  - "Upgrade Now" - Takes user to pricing page
  - "Remind Me Later" / "Continue with Free Plan" - Dismisses popup

### 4. App Integration (`src/App.tsx`)
- Created `AppContent` wrapper component
- Integrates `useTrialStatus()` hook
- Shows `TrialExpirationPopup` when:
  - Trial is expired
  - Trial has 2 days or less remaining
- Popup state management to avoid showing multiple times

### 5. Edge Function (`supabase/functions/check-trial-expiration/index.ts`)
- Endpoint: `/functions/v1/check-trial-expiration`
- Verifies JWT token
- Fetches user subscription
- Checks if trial is expired
- Automatically converts expired trials to free plan
- Returns trial status and days remaining

### 6. Configuration (`supabase/config.toml`)
- Added `check-trial-expiration` function configuration

## Trial Flow

### New User Signup
1. User creates account via `/get-started`
2. `handle_new_user_subscription()` trigger fires
3. User gets:
   - 7-day trial (now + 7 days)
   - All features enabled
   - 3 templates/invoices limit
   - No watermark
   - 3 export limit

### During Trial (Days 1-5)
- User can create up to 3 invoices/estimates
- All features available
- No watermark on documents
- No popup shown

### Trial Ending Soon (Days 6-7)
- Popup appears: "Your Trial Ends Soon!"
- Shows days remaining
- Offers to upgrade or remind later
- User can dismiss and continue

### Trial Expired
- Popup appears: "Your Trial Has Ended"
- Shows free plan limitations
- Offers to upgrade or continue with free plan
- User automatically converted to free plan:
  - 3 invoices/estimates per month
  - Watermark enabled
  - Limited templates
  - No online payments

## Features Included in Trial
✓ Unlimited estimates & invoices (up to 3)
✓ Online deposit collection
✓ QR code payments
✓ Industry-specific templates (25+)
✓ Mobile optimization
✓ All payment methods
✓ Professional branding

## Free Plan After Trial
✓ 3 invoices/estimates per month
✓ Watermark on documents
✓ Limited templates
✗ No online payments
✗ No deposit collection
✗ No QR codes

## Next Steps

### To Deploy:
1. Run migration: `supabase db push`
2. Deploy edge function: `supabase functions deploy check-trial-expiration`
3. Disable email verification in Supabase (optional, for better UX)

### To Test:
1. Create new account at `/get-started`
2. Check database: `SELECT * FROM user_subscriptions WHERE user_id = '<your-id>'`
3. Verify trial dates are set correctly
4. Manually update `trial_end_date` to test expiration popup

### Future Enhancements:
- Add cron job to batch process expired trials
- Send email notification before trial expires
- Add trial extension option
- Track trial conversion metrics
- A/B test different trial lengths

