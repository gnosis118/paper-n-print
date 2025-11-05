# 🚀 ProInvoice - Postman API Testing Setup

## 📋 Quick Reference

### Base URLs

**Development (Local)**
```
Supabase REST API: http://localhost:54321
Supabase Functions: http://localhost:54321/functions/v1
```

**Production**
```
Supabase URL: https://hkzrfqpnkvpmsaeluksh.supabase.co
REST API: https://hkzrfqpnkvpmsaeluksh.supabase.co/rest/v1
Functions: https://hkzrfqpnkvpmsaeluksh.supabase.co/functions/v1
App URL: https://proinvoice.app
```

---

## 🔐 Environment Variables to Set in Postman

### Development Environment
```
supabase_url: http://localhost:54321
supabase_anon_key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrenJmcXBua3ZwbXNhZWx1a3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDY5NzcsImV4cCI6MjA3MTI4Mjk3N30.ztGQNMLht4Gmo-PEgBlwXmuPjWdqsLOQSyfkwF04N7c
supabase_service_role_key: [Get from Supabase Dashboard → Settings → API]
stripe_secret_key: sk_test_... [Get from Stripe Dashboard]
stripe_webhook_secret: whsec_test_... [Get from Stripe Dashboard]
stripe_publishable_key: pk_test_...
resend_api_key: re_... [Get from Resend Dashboard]
twilio_account_sid: AC... [Get from Twilio]
twilio_auth_token: [Get from Twilio]
```

### Production Environment
```
supabase_url: https://hkzrfqpnkvpmsaeluksh.supabase.co
supabase_anon_key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrenJmcXBua3ZwbXNhZWx1a3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDY5NzcsImV4cCI6MjA3MTI4Mjk3N30.ztGQNMLht4Gmo-PEgBlwXmuPjWdqsLOQSyfkwF04N7c
supabase_service_role_key: [Stored in Vault]
stripe_secret_key: sk_live_... [Stored in Vault]
stripe_webhook_secret: whsec_live_... [Stored in Vault]
```

---

## 🔑 Authentication

### JWT Token Claims
```json
{
  "iss": "supabase",
  "sub": "user-uuid",
  "aud": "authenticated",
  "exp": 1234567890,
  "iat": 1234567800,
  "email": "contractor@example.com",
  "email_verified": true,
  "phone_verified": false,
  "app_metadata": {
    "provider": "email",
    "providers": ["email"]
  },
  "user_metadata": {
    "business_name": "John's Electrical",
    "full_name": "John Doe"
  },
  "role": "authenticated",
  "aal": "aal1",
  "amr": [
    {
      "method": "password",
      "timestamp": 1234567800
    }
  ],
  "session_id": "session-uuid"
}
```

### How to Get JWT Token
1. Sign up/login at https://proinvoice.app
2. Open DevTools → Application → Local Storage
3. Find `sb-hkzrfqpnkvpmsaeluksh-auth-token`
4. Copy the `access_token` value
5. Paste in Postman as Bearer token

---

## 📊 Core Tables & Schemas

### Estimates Table
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "client_id": "uuid",
  "client_name": "string",
  "client_email": "string",
  "number": "string",
  "title": "string",
  "items": "jsonb[]",
  "subtotal": "numeric",
  "tax_rate": "numeric",
  "tax_amount": "numeric",
  "total": "numeric",
  "deposit_percentage": "integer",
  "deposit_amount": "numeric",
  "status": "pending_payment|deposit_paid|completed|cancelled",
  "terms": "text",
  "notes": "text",
  "public_slug": "uuid",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Invoices Table
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "estimate_id": "uuid",
  "client_id": "uuid",
  "invoice_number": "string",
  "status": "draft|sent|paid|overdue|cancelled",
  "total": "numeric",
  "paid_amount": "numeric",
  "due_date": "date",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Payments Table
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "estimate_id": "uuid",
  "invoice_id": "uuid",
  "stripe_payment_intent_id": "string",
  "amount": "numeric",
  "status": "pending|succeeded|failed|cancelled",
  "payment_method": "card|bank_account",
  "created_at": "timestamp"
}
```

### Clients Table
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "text",
  "city": "string",
  "state": "string",
  "zip": "string",
  "created_at": "timestamp"
}
```

---

## 🔌 Edge Functions

### Available Functions
```
POST /functions/v1/create-checkout
POST /functions/v1/estimate-checkout
POST /functions/v1/create-payment
POST /functions/v1/send-estimate-email
POST /functions/v1/send-invoice-email
POST /functions/v1/send-estimate-reminders
POST /functions/v1/send-sms-notification
POST /functions/v1/check-subscription
POST /functions/v1/customer-portal
POST /functions/v1/create-stripe-customer
GET  /functions/v1/get-estimate
POST /functions/v1/stripe-webhook
POST /functions/v1/stripe-webhook-estimates
```

### Example: Create Checkout
```bash
POST https://hkzrfqpnkvpmsaeluksh.supabase.co/functions/v1/create-checkout
Authorization: Bearer {{jwt_token}}
Content-Type: application/json

{
  "estimateId": "uuid",
  "amount": 5000,
  "currency": "usd",
  "depositPercentage": 30
}
```

---

## 🧪 Test Scenarios to Create

### 1. Authentication Flow
- [ ] Sign up new contractor
- [ ] Login with email/password
- [ ] Get JWT token
- [ ] Verify token claims

### 2. Estimate Workflow
- [ ] Create estimate
- [ ] Get estimate by ID
- [ ] Update estimate
- [ ] Create estimate revision
- [ ] Get estimate revisions
- [ ] Delete estimate

### 3. Payment Flow
- [ ] Create checkout session
- [ ] Process payment
- [ ] Verify payment succeeded
- [ ] Handle payment failure
- [ ] Process refund

### 4. Invoice Workflow
- [ ] Create invoice from estimate
- [ ] Send invoice email
- [ ] Update invoice status
- [ ] Get invoice by ID

### 5. Client Management
- [ ] Create client
- [ ] Get all clients
- [ ] Update client
- [ ] Delete client

### 6. Webhook Testing
- [ ] Stripe payment_intent.succeeded
- [ ] Stripe charge.refunded
- [ ] Stripe customer.subscription.updated

---

## 📝 JSON Schemas for Validation

### Estimate Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "total": { "type": "number", "minimum": 0 },
    "status": { "enum": ["pending_payment", "deposit_paid", "completed"] },
    "items": { "type": "array", "minItems": 1 }
  },
  "required": ["id", "total", "status"]
}
```

---

## 🔄 CI/CD Integration

### GitHub Actions Workflow
```yaml
name: API Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g newman
      - run: newman run postman_collection.json \
          -e postman_environment.json \
          --reporters cli,json
```

---

## 🚀 Next Steps

1. **Export Postman Collection** from this guide
2. **Set up Environments** (dev, staging, prod)
3. **Create Test Suites** for each workflow
4. **Add Monitors** for production endpoints
5. **Integrate with CI/CD** via GitHub Actions
6. **Document API** with auto-generated docs

---

**Ready to test? Let's go! 🎉**

