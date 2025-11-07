# ProInvoice Manual Testing Checklist
**Site:** https://www.proinvoice.app  
**Purpose:** Manual verification of E2E user flows and payment processing  
**Date:** November 7, 2025

---

## 🎯 How to Use This Checklist

1. Open https://www.proinvoice.app in your browser
2. Work through each section sequentially
3. Check ✅ for PASS, ❌ for FAIL, ⚠️ for issues
4. Document any issues in the "Notes" column
5. Test in multiple browsers (Chrome, Firefox, Safari, Edge)

---

## 1️⃣ User Registration & Onboarding Flow

### Sign Up Process
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 1.1 | Navigate to /auth | Auth page loads | ☐ | |
| 1.2 | Click "Sign Up" tab | Sign up form appears | ☐ | |
| 1.3 | Enter email address | Email field accepts input | ☐ | |
| 1.4 | Enter password (8+ chars) | Password field accepts input | ☐ | |
| 1.5 | Click "Sign Up" button | Account created, email sent | ☐ | |
| 1.6 | Check email inbox | Verification email received | ☐ | |
| 1.7 | Click verification link | Email verified, redirected | ☐ | |
| 1.8 | Redirected to dashboard | Dashboard loads successfully | ☐ | |

### Sign In Process
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 2.1 | Navigate to /auth | Auth page loads | ☐ | |
| 2.2 | Enter registered email | Email field accepts input | ☐ | |
| 2.3 | Enter password | Password field accepts input | ☐ | |
| 2.4 | Click "Sign In" button | Logged in, redirected to dashboard | ☐ | |
| 2.5 | Check session persistence | Refresh page, still logged in | ☐ | |

### Password Reset
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 3.1 | Click "Forgot Password?" | Reset form appears | ☐ | |
| 3.2 | Enter email address | Email field accepts input | ☐ | |
| 3.3 | Click "Send Reset Link" | Reset email sent | ☐ | |
| 3.4 | Check email inbox | Reset email received | ☐ | |
| 3.5 | Click reset link | Password reset page loads | ☐ | |
| 3.6 | Enter new password | Password updated successfully | ☐ | |
| 3.7 | Sign in with new password | Login successful | ☐ | |

---

## 2️⃣ Invoice Creation Flow

### Create Basic Invoice
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 4.1 | Navigate to /invoice | Invoice creation page loads | ☐ | |
| 4.2 | Select template | Template preview appears | ☐ | |
| 4.3 | Enter business name | Field accepts input | ☐ | |
| 4.4 | Enter business address | Field accepts input | ☐ | |
| 4.5 | Enter business email | Field accepts input | ☐ | |
| 4.6 | Enter client name | Field accepts input | ☐ | |
| 4.7 | Enter client email | Field accepts input | ☐ | |
| 4.8 | Add line item (description) | Line item added | ☐ | |
| 4.9 | Add line item (quantity) | Quantity field accepts number | ☐ | |
| 4.10 | Add line item (rate) | Rate field accepts number | ☐ | |
| 4.11 | Verify total calculation | Total = quantity × rate | ☐ | |
| 4.12 | Add second line item | Multiple items supported | ☐ | |
| 4.13 | Add tax (if applicable) | Tax calculated correctly | ☐ | |
| 4.14 | Add discount (if applicable) | Discount applied correctly | ☐ | |
| 4.15 | Preview invoice | Preview modal opens | ☐ | |
| 4.16 | Click "Save Invoice" | Invoice saved to database | ☐ | |

### Invoice Templates
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 5.1 | Try "Modern" template | Template applied | ☐ | |
| 5.2 | Try "Classic" template | Template applied | ☐ | |
| 5.3 | Try "Professional" template | Template applied | ☐ | |
| 5.4 | Try "Minimal" template | Template applied | ☐ | |
| 5.5 | Switch between templates | Changes reflected in preview | ☐ | |

### Invoice Export
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 6.1 | Click "Download PDF" | PDF generated | ☐ | |
| 6.2 | Open downloaded PDF | PDF opens correctly | ☐ | |
| 6.3 | Verify PDF content | All data present and formatted | ☐ | |
| 6.4 | Verify PDF branding | Logo and colors correct | ☐ | |

---

## 3️⃣ Estimate Creation Flow

### Create Basic Estimate
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 7.1 | Navigate to /estimate | Estimate creation page loads | ☐ | |
| 7.2 | Select estimate template | Template preview appears | ☐ | |
| 7.3 | Enter business details | Fields accept input | ☐ | |
| 7.4 | Enter client details | Fields accept input | ☐ | |
| 7.5 | Add estimate line items | Items added successfully | ☐ | |
| 7.6 | Set deposit percentage | Deposit calculated correctly | ☐ | |
| 7.7 | Set expiration date | Date picker works | ☐ | |
| 7.8 | Preview estimate | Preview modal opens | ☐ | |
| 7.9 | Save estimate | Estimate saved to database | ☐ | |

### Estimate Sharing
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 8.1 | Click "Share Estimate" | Share options appear | ☐ | |
| 8.2 | Copy shareable link | Link copied to clipboard | ☐ | |
| 8.3 | Open link in new tab | Estimate view page loads | ☐ | |
| 8.4 | Verify estimate details | All data displayed correctly | ☐ | |

---

## 4️⃣ Client Management Flow

### Add New Client
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 9.1 | Navigate to /clients | Clients page loads | ☐ | |
| 9.2 | Click "Add Client" | Add client form appears | ☐ | |
| 9.3 | Enter client name | Field accepts input | ☐ | |
| 9.4 | Enter client email | Field accepts input | ☐ | |
| 9.5 | Enter client phone | Field accepts input | ☐ | |
| 9.6 | Enter client address | Field accepts input | ☐ | |
| 9.7 | Click "Save Client" | Client saved to database | ☐ | |
| 9.8 | Verify client in list | Client appears in clients list | ☐ | |

### Edit Existing Client
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 10.1 | Click on client name | Client details page opens | ☐ | |
| 10.2 | Click "Edit" button | Edit form appears | ☐ | |
| 10.3 | Modify client details | Changes accepted | ☐ | |
| 10.4 | Click "Save Changes" | Client updated in database | ☐ | |
| 10.5 | Verify changes | Updated data displayed | ☐ | |

### Delete Client
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 11.1 | Click "Delete" button | Confirmation dialog appears | ☐ | |
| 11.2 | Confirm deletion | Client removed from database | ☐ | |
| 11.3 | Verify deletion | Client no longer in list | ☐ | |

---

## 5️⃣ Subscription Payment Flow (CRITICAL)

### Pro Monthly Subscription
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 12.1 | Navigate to /pricing | Pricing page loads | ☐ | |
| 12.2 | Click "Get Started" on Pro Monthly | Redirected to checkout | ☐ | |
| 12.3 | Verify Stripe checkout loads | Stripe Checkout page appears | ☐ | |
| 12.4 | Enter test card: 4242 4242 4242 4242 | Card number accepted | ☐ | |
| 12.5 | Enter expiry: 12/34 | Expiry accepted | ☐ | |
| 12.6 | Enter CVC: 123 | CVC accepted | ☐ | |
| 12.7 | Enter ZIP: 12345 | ZIP accepted | ☐ | |
| 12.8 | Click "Subscribe" | Payment processed | ☐ | |
| 12.9 | Redirected to success page | Success page loads | ☐ | |
| 12.10 | Check subscription status | Status shows "Active" | ☐ | |
| 12.11 | Verify database record | Subscription in database | ☐ | |

### Pro Annual Subscription
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 13.1 | Click "Get Started" on Pro Annual | Redirected to checkout | ☐ | |
| 13.2 | Verify annual pricing displayed | Correct amount shown | ☐ | |
| 13.3 | Complete payment with test card | Payment processed | ☐ | |
| 13.4 | Verify subscription created | Annual subscription active | ☐ | |

### Subscription Upgrade
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 14.1 | Start with Lite plan | Lite subscription active | ☐ | |
| 14.2 | Click "Upgrade to Pro" | Upgrade flow initiated | ☐ | |
| 14.3 | Complete upgrade payment | Subscription upgraded | ☐ | |
| 14.4 | Verify new plan active | Pro features unlocked | ☐ | |

---

## 6️⃣ Invoice Payment Flow (CRITICAL)

### Pay Invoice as Client
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 15.1 | Create invoice with payment link | Invoice created | ☐ | |
| 15.2 | Copy invoice payment link | Link copied | ☐ | |
| 15.3 | Open link in incognito window | Invoice view page loads | ☐ | |
| 15.4 | Click "Pay Now" button | Stripe Checkout opens | ☐ | |
| 15.5 | Enter test card details | Card accepted | ☐ | |
| 15.6 | Complete payment | Payment processed | ☐ | |
| 15.7 | Verify payment confirmation | Confirmation page shown | ☐ | |
| 15.8 | Check invoice status | Status updated to "Paid" | ☐ | |
| 15.9 | Verify payment in Stripe | Payment appears in Stripe dashboard | ☐ | |
| 15.10 | Verify payment in database | Payment record created | ☐ | |

### Partial Payment
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 16.1 | Create invoice for $1000 | Invoice created | ☐ | |
| 16.2 | Enable partial payments | Option enabled | ☐ | |
| 16.3 | Client pays $500 | Partial payment processed | ☐ | |
| 16.4 | Verify remaining balance | Balance shows $500 | ☐ | |
| 16.5 | Client pays remaining $500 | Final payment processed | ☐ | |
| 16.6 | Verify invoice fully paid | Status updated to "Paid" | ☐ | |

---

## 7️⃣ Estimate Deposit Payment Flow (CRITICAL)

### 25% Deposit Payment
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 17.1 | Create estimate for $10,000 | Estimate created | ☐ | |
| 17.2 | Set 25% deposit required | Deposit = $2,500 | ☐ | |
| 17.3 | Share estimate with client | Link generated | ☐ | |
| 17.4 | Client opens estimate link | Estimate view loads | ☐ | |
| 17.5 | Click "Pay Deposit" button | Stripe Checkout opens | ☐ | |
| 17.6 | Verify deposit amount | Shows $2,500 | ☐ | |
| 17.7 | Complete deposit payment | Payment processed | ☐ | |
| 17.8 | Verify deposit recorded | Deposit status updated | ☐ | |
| 17.9 | Convert estimate to invoice | Invoice created | ☐ | |
| 17.10 | Verify remaining balance | Balance = $7,500 | ☐ | |

### 50% Deposit Payment
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 18.1 | Create estimate for $5,000 | Estimate created | ☐ | |
| 18.2 | Set 50% deposit required | Deposit = $2,500 | ☐ | |
| 18.3 | Client pays deposit | Payment processed | ☐ | |
| 18.4 | Verify deposit amount correct | $2,500 recorded | ☐ | |

---

## 8️⃣ Customer Portal Flow (CRITICAL)

### Access Customer Portal
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 19.1 | Navigate to /dashboard | Dashboard loads | ☐ | |
| 19.2 | Click "Manage Subscription" | Portal link generated | ☐ | |
| 19.3 | Redirected to Stripe Portal | Stripe Customer Portal loads | ☐ | |
| 19.4 | View subscription details | Current plan displayed | ☐ | |
| 19.5 | View payment history | Past payments listed | ☐ | |
| 19.6 | View invoices | Stripe invoices shown | ☐ | |

### Update Payment Method
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 20.1 | Click "Update Payment Method" | Card update form appears | ☐ | |
| 20.2 | Enter new test card | Card accepted | ☐ | |
| 20.3 | Save new card | Card updated successfully | ☐ | |
| 20.4 | Verify new card is default | New card marked as default | ☐ | |

### Cancel Subscription
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 21.1 | Click "Cancel Subscription" | Confirmation dialog appears | ☐ | |
| 21.2 | Confirm cancellation | Subscription cancelled | ☐ | |
| 21.3 | Verify cancellation | Status shows "Cancelled" | ☐ | |
| 21.4 | Verify access until period end | Features still accessible | ☐ | |

---

## 9️⃣ Payment Error Handling

### Declined Card
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 22.1 | Use test card: 4000 0000 0000 0002 | Card declined | ☐ | |
| 22.2 | Verify error message | Clear error shown | ☐ | |
| 22.3 | Retry with valid card | Payment succeeds | ☐ | |

### Insufficient Funds
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 23.1 | Use test card: 4000 0000 0000 9995 | Insufficient funds error | ☐ | |
| 23.2 | Verify error message | Clear error shown | ☐ | |

### Expired Card
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 24.1 | Use test card: 4000 0000 0000 0069 | Expired card error | ☐ | |
| 24.2 | Verify error message | Clear error shown | ☐ | |

---

## 🔟 Webhook Testing

### Subscription Created Webhook
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 25.1 | Complete subscription payment | Webhook received | ☐ | |
| 25.2 | Check database | Subscription record created | ☐ | |
| 25.3 | Check user access | Pro features unlocked | ☐ | |

### Payment Succeeded Webhook
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 26.1 | Complete invoice payment | Webhook received | ☐ | |
| 26.2 | Check database | Payment record created | ☐ | |
| 26.3 | Check invoice status | Status updated to "Paid" | ☐ | |

### Subscription Cancelled Webhook
| Step | Action | Expected Result | Status | Notes |
|------|--------|-----------------|--------|-------|
| 27.1 | Cancel subscription | Webhook received | ☐ | |
| 27.2 | Check database | Subscription status updated | ☐ | |
| 27.3 | Check user access | Features locked at period end | ☐ | |

---

## 📊 Test Summary

### Overall Results
- **Total Tests:** _____ / 150+
- **Passed:** _____
- **Failed:** _____
- **Warnings:** _____
- **Success Rate:** _____%

### Critical Path Status
- ☐ User Registration: PASS / FAIL
- ☐ Invoice Creation: PASS / FAIL
- ☐ Subscription Payments: PASS / FAIL
- ☐ Invoice Payments: PASS / FAIL
- ☐ Estimate Deposits: PASS / FAIL
- ☐ Customer Portal: PASS / FAIL

### Production Readiness
- ☐ All critical tests passed
- ☐ No blocking issues found
- ☐ Payment flows verified
- ☐ Error handling tested
- ☐ Webhooks functional

### Sign-Off
- **Tester Name:** _________________
- **Date:** _________________
- **Approved for Production:** YES / NO
- **Notes:** _________________

---

## 🔗 Stripe Test Cards Reference

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Declined |
| 4000 0000 0000 9995 | Insufficient funds |
| 4000 0000 0000 0069 | Expired card |
| 4000 0000 0000 0127 | Incorrect CVC |
| 4000 0000 0000 0341 | Processing error |

**Expiry:** Any future date (e.g., 12/34)  
**CVC:** Any 3 digits (e.g., 123)  
**ZIP:** Any 5 digits (e.g., 12345)

---

**End of Manual Testing Checklist**

