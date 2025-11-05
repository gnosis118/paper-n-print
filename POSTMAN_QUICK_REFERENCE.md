# 🚀 ProInvoice Postman - Quick Reference

## 📋 What You Have

**3 Complete Guides:**
1. `POSTMAN_SETUP_GUIDE.md` - Base URLs, auth, tables, functions
2. `POSTMAN_COMPLETE_SETUP.md` - Step-by-step setup with examples
3. `postman-collection-template.json` - Ready-to-import collection

---

## ⚡ 5-Minute Setup

### 1. Get Credentials
```
Supabase URL: https://hkzrfqpnkvpmsaeluksh.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Stripe Secret: sk_test_...
```

### 2. Create Postman Environment
```json
{
  "supabase_url": "https://hkzrfqpnkvpmsaeluksh.supabase.co",
  "supabase_anon_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "stripe_secret_key": "sk_test_...",
  "jwt_token": ""
}
```

### 3. Import Collection
- Copy `postman-collection-template.json`
- Postman → Import → Paste Raw Text
- Select environment

### 4. Get JWT Token
- Go to https://proinvoice.app
- Login
- DevTools → Application → Local Storage
- Copy `sb-hkzrfqpnkvpmsaeluksh-auth-token` → `access_token`
- Paste in Postman as `jwt_token`

### 5. Start Testing
- Click "Create Estimate" request
- Send
- Done! ✅

---

## 🔌 Core Endpoints

### Estimates
```
POST   /rest/v1/estimates              Create
GET    /rest/v1/estimates              List
GET    /rest/v1/estimates?id=eq.UUID   Get
PATCH  /rest/v1/estimates?id=eq.UUID   Update
DELETE /rest/v1/estimates?id=eq.UUID   Delete
```

### Payments
```
POST   /functions/v1/create-checkout   Create Session
POST   /functions/v1/create-payment    Process
```

### Webhooks
```
POST   /functions/v1/stripe-webhook    Stripe Events
```

---

## 🧪 Test Scenarios

### 1. Authentication
- [ ] Sign up
- [ ] Login
- [ ] Get JWT token
- [ ] Verify claims

### 2. Estimates
- [ ] Create estimate
- [ ] List estimates
- [ ] Get estimate by ID
- [ ] Update estimate
- [ ] Delete estimate

### 3. Payments
- [ ] Create checkout
- [ ] Process payment
- [ ] Verify success
- [ ] Handle failure

### 4. Webhooks
- [ ] Payment succeeded
- [ ] Refund processed
- [ ] Subscription updated

---

## 📊 Key Tables

### Estimates
```json
{
  "id": "uuid",
  "client_name": "string",
  "total": "numeric",
  "status": "pending_payment|deposit_paid|completed",
  "deposit_percentage": 30,
  "created_at": "timestamp"
}
```

### Invoices
```json
{
  "id": "uuid",
  "estimate_id": "uuid",
  "invoice_number": "string",
  "status": "draft|sent|paid|overdue",
  "total": "numeric"
}
```

### Payments
```json
{
  "id": "uuid",
  "estimate_id": "uuid",
  "stripe_payment_intent_id": "string",
  "amount": "numeric",
  "status": "pending|succeeded|failed"
}
```

---

## 🔐 Authentication

### JWT Token
```
Authorization: Bearer {{jwt_token}}
```

### Get Token
```bash
POST https://hkzrfqpnkvpmsaeluksh.supabase.co/auth/v1/token?grant_type=password
Content-Type: application/json

{
  "email": "contractor@example.com",
  "password": "SecurePassword123!"
}
```

---

## 🧪 Example: Create Estimate

### Request
```bash
POST https://hkzrfqpnkvpmsaeluksh.supabase.co/rest/v1/estimates
Authorization: Bearer {{jwt_token}}
Content-Type: application/json

{
  "client_name": "ABC Construction",
  "client_email": "contact@abc.com",
  "number": "EST-001",
  "title": "Electrical Work",
  "items": [
    {
      "description": "Labor",
      "quantity": 8,
      "rate": 75,
      "amount": 600
    }
  ],
  "subtotal": 600,
  "tax_rate": 0.08,
  "tax_amount": 48,
  "total": 648,
  "deposit_percentage": 30,
  "status": "pending_payment"
}
```

### Response
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "client_name": "ABC Construction",
    "total": 648,
    "status": "pending_payment",
    "created_at": "2025-11-05T10:00:00Z"
  }
]
```

---

## 🚀 Next Steps

1. **Read** `POSTMAN_COMPLETE_SETUP.md` for detailed instructions
2. **Import** `postman-collection-template.json`
3. **Set up** environments (dev/prod)
4. **Create** test suites
5. **Add** monitors for production
6. **Integrate** with GitHub Actions

---

## 📚 Full Guides

- **Setup Guide:** `POSTMAN_SETUP_GUIDE.md`
- **Complete Setup:** `POSTMAN_COMPLETE_SETUP.md`
- **Collection:** `postman-collection-template.json`

---

## 🆘 Troubleshooting

**401 Unauthorized**
→ JWT token expired, get new one

**404 Not Found**
→ Check base URL and endpoint path

**500 Server Error**
→ Check Supabase logs and function code

---

**Ready? Let's test! 🎉**

