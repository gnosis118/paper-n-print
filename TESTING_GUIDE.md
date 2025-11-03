# ProInvoice Estimate System - Testing Guide

## Prerequisites

1. **Database Migration Applied**
   - Run SQL from `supabase/migrations/20251103_create_estimates_table.sql` in Supabase SQL Editor
   - Verify all 3 tables created: `estimate_reminders`, `estimate_templates`, `estimate_revisions`

2. **Environment Variables Set**
   - `RESEND_API_KEY` configured in Supabase for email sending
   - Stripe API keys configured
   - Supabase URL and keys configured

3. **Dev Server Running**
   ```bash
   npm install
   npm run dev
   ```

---

## Feature 1: Analytics Dashboard

### Test Case 1.1: Dashboard Displays Correctly
**Steps:**
1. Navigate to `/estimates`
2. Click "Analytics" tab
3. Verify all 6 metric cards display:
   - Total Estimates
   - Conversion Rate (%)
   - Total Value ($)
   - Deposits Collected ($)
   - Avg Time to Accept (days)
   - Accepted Estimates

**Expected Result:** All cards show data or "0" if no estimates exist

### Test Case 1.2: Real-Time Updates
**Steps:**
1. Open Analytics tab
2. In another tab, create a new estimate
3. Return to Analytics tab
4. Verify "Total Estimates" count increased

**Expected Result:** Analytics update automatically without page refresh

### Test Case 1.3: Status Breakdown
**Steps:**
1. Create 3 estimates with different statuses
2. View Analytics tab
3. Check status breakdown section

**Expected Result:** Shows count for each status (sent, accepted, invoiced)

### Test Case 1.4: Recent Estimates List
**Steps:**
1. Create 5+ estimates
2. View Analytics tab
3. Scroll to "Recent Estimates" section

**Expected Result:** Shows last 5 estimates with status badges

---

## Feature 2: Bulk Estimate Creation

### Test Case 2.1: Create Template
**Steps:**
1. Create an estimate with:
   - Title: "Web Design Package"
   - 3 line items
   - Tax rate: 8%
   - Deposit: 50%
2. Click "Save as Template" (if available)
3. Name it "Web Design"

**Expected Result:** Template saved and appears in template list

### Test Case 2.2: Bulk Create from Template
**Steps:**
1. Click "Bulk Create" button
2. Select "Web Design" template
3. Add 3 clients:
   - Client 1: john@example.com
   - Client 2: jane@example.com
   - Client 3: bob@example.com
4. Click "Create 3 Estimates"

**Expected Result:**
- 3 new estimates created
- All have same items, tax, deposit %
- Emails sent to all 3 clients
- Estimates appear in list

### Test Case 2.3: Template Management
**Steps:**
1. Click "Bulk Create"
2. View template list
3. Verify can see:
   - Template name
   - Item count
   - Tax rate
   - Deposit percentage

**Expected Result:** All template info displays correctly

### Test Case 2.4: Add Multiple Clients
**Steps:**
1. Click "Bulk Create"
2. Select template
3. Click "Add Client" button 5 times
4. Fill in all client info

**Expected Result:** Can add unlimited clients, all rows display

---

## Feature 3: Estimate Versioning

### Test Case 3.1: Automatic Revision Creation
**Steps:**
1. Create an estimate
2. Edit it (change title or items)
3. Save changes
4. View estimate details
5. Check revision history

**Expected Result:**
- Revision v1 created on initial save
- Revision v2 created on edit
- Both show in history

### Test Case 3.2: Revision Details
**Steps:**
1. Create and edit an estimate
2. View revision history
3. Click on a revision to expand

**Expected Result:** Shows:
- Version number
- Total amount
- Subtotal, tax, deposit
- Item count
- Timestamp

### Test Case 3.3: Restore Previous Version
**Steps:**
1. Create estimate with Title "v1"
2. Edit to Title "v2"
3. Edit to Title "v3"
4. In revision history, click restore on v1
5. Confirm restore

**Expected Result:**
- Estimate reverted to v1 title
- New revision v4 created documenting restore
- Confirmation message shown

### Test Case 3.4: Version Numbers Increment
**Steps:**
1. Create estimate
2. Make 5 edits
3. View revision history

**Expected Result:** Versions numbered 1-6 in descending order

---

## Feature 4: Scheduled Reminders

### Test Case 4.1: Reminder Function Deployment
**Steps:**
1. Deploy `send-estimate-reminders` edge function
2. Set up daily cron job
3. Configure `RESEND_API_KEY`

**Expected Result:** Function deployed and callable

### Test Case 4.2: Reminder Sending
**Steps:**
1. Create estimate with status "sent"
2. Wait 3+ days (or manually adjust created_at in DB)
3. Run reminder function
4. Check estimate_reminders table

**Expected Result:**
- Reminder record created
- Email sent to client
- reminder_number = 1

### Test Case 4.3: Max Reminders Limit
**Steps:**
1. Create estimate
2. Run reminder function 3 times
3. Run function 4th time

**Expected Result:**
- First 3 reminders sent
- 4th run doesn't send (max reached)
- estimate_reminders shows 3 records

### Test Case 4.4: No Duplicate Reminders
**Steps:**
1. Create estimate
2. Run reminder function
3. Run function again immediately

**Expected Result:**
- Only 1 reminder sent
- No duplicate emails

---

## Mobile Testing

### Test Case 5.1: Analytics on Mobile
**Steps:**
1. Open `/estimates` on mobile device
2. Click Analytics tab
3. Scroll through all metrics

**Expected Result:**
- All cards stack vertically
- Text readable
- No horizontal scroll needed

### Test Case 5.2: Bulk Create on Mobile
**Steps:**
1. Click "Bulk Create" on mobile
2. Select template
3. Add clients
4. Create estimates

**Expected Result:**
- Dialog responsive
- Input fields accessible
- Buttons clickable

### Test Case 5.3: Revision History on Mobile
**Steps:**
1. View estimate on mobile
2. Scroll to revision history
3. Expand revisions
4. Try to restore

**Expected Result:**
- History readable
- Expand/collapse works
- Restore button accessible

---

## Error Handling

### Test Case 6.1: Invalid Email in Bulk Create
**Steps:**
1. Click "Bulk Create"
2. Select template
3. Enter invalid email "notanemail"
4. Try to create

**Expected Result:** Error message shown, creation prevented

### Test Case 6.2: No Template Selected
**Steps:**
1. Click "Bulk Create"
2. Try to create without selecting template

**Expected Result:** Error message: "Please select a template"

### Test Case 6.3: No Clients Added
**Steps:**
1. Click "Bulk Create"
2. Select template
3. Remove all client rows
4. Try to create

**Expected Result:** Error message: "Please add at least one client"

---

## Performance Testing

### Test Case 7.1: Analytics with 100+ Estimates
**Steps:**
1. Create 100+ estimates
2. Open Analytics tab
3. Measure load time

**Expected Result:** Loads in < 2 seconds

### Test Case 7.2: Revision History with 20+ Versions
**Steps:**
1. Create estimate
2. Make 20 edits
3. View revision history

**Expected Result:** All versions load and display correctly

### Test Case 7.3: Bulk Create 50 Estimates
**Steps:**
1. Create template
2. Add 50 clients
3. Create all estimates

**Expected Result:** All 50 created successfully

---

## Checklist

- [ ] Database migration applied
- [ ] All 3 tables created in Supabase
- [ ] No TypeScript errors
- [ ] Analytics dashboard displays
- [ ] Real-time updates work
- [ ] Bulk create works
- [ ] Templates save/load
- [ ] Revisions track changes
- [ ] Restore works correctly
- [ ] Reminders deploy successfully
- [ ] Mobile responsive
- [ ] Error handling works
- [ ] Performance acceptable

---

## Troubleshooting

### Analytics Not Loading
- Check Supabase connection
- Verify user is authenticated
- Check browser console for errors
- Verify estimates table has data

### Bulk Create Not Working
- Verify templates table created
- Check email addresses are valid
- Verify RESEND_API_KEY configured
- Check browser console for errors

### Revisions Not Tracking
- Verify estimate_revisions table created
- Check RLS policies enabled
- Verify user_id matches authenticated user
- Check browser console for errors

### Reminders Not Sending
- Verify edge function deployed
- Check RESEND_API_KEY configured
- Verify cron job running
- Check Supabase logs for errors
- Verify estimate status is "sent"

---

## Support

For issues or questions:
1. Check browser console for errors
2. Check Supabase logs
3. Verify all prerequisites met
4. Review IMPLEMENTATION_SUMMARY.md
5. Check individual component files for JSDoc comments

