# 🚀 ProInvoice - Complete Postman Setup

## 📋 What You're Getting

A complete API testing infrastructure for ProInvoice with:
- ✅ 15+ Edge Functions
- ✅ 4 Core Tables (Estimates, Invoices, Payments, Clients)
- ✅ Stripe Payment Integration
- ✅ JWT Authentication
- ✅ Webhook Testing
- ✅ CI/CD Ready

---

## 🔧 Step 1: Get Your Credentials

### From Supabase Dashboard
1. Go to https://app.supabase.com
2. Select project: **hkzrfqpnkvpmsaeluksh**
3. Settings → API
   - Copy **Project URL**: `https://hkzrfqpnkvpmsaeluksh.supabase.co`
   - Copy **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Copy **Service Role Key**: (for admin operations)

### From Stripe Dashboard
1. Go to https://dashboard.stripe.com
2. Developers → API Keys
   - Copy **Secret Key**: `sk_test_...`
   - Copy **Publishable Key**: `pk_test_...`
3. Webhooks
   - Copy **Webhook Secret**: `whsec_test_...`

### From Resend Dashboard
1. Go to https://resend.com
2. API Keys
   - Copy **API Key**: `re_...`

---

## 📱 Step 2: Create Postman Environments

### Development Environment
```json
{
  "name": "ProInvoice - Development",
  "values": [
    {
      "key": "base_url",
      "value": "http://localhost:54321",
      "enabled": true
    },
    {
      "key": "supabase_url",
      "value": "https://hkzrfqpnkvpmsaeluksh.supabase.co",
      "enabled": true
    },
    {
      "key": "supabase_anon_key",
      "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "enabled": true
    },
    {
      "key": "stripe_secret_key",
      "value": "sk_test_...",
      "enabled": true,
      "type": "secret"
    },
    {
      "key": "stripe_webhook_secret",
      "value": "whsec_test_...",
      "enabled": true,
      "type": "secret"
    },
    {
      "key": "jwt_token",
      "value": "",
      "enabled": true
    },
    {
      "key": "estimate_id",
      "value": "",
      "enabled": true
    }
  ]
}
```

### Production Environment
```json
{
  "name": "ProInvoice - Production",
  "values": [
    {
      "key": "base_url",
      "value": "https://proinvoice.app",
      "enabled": true
    },
    {
      "key": "supabase_url",
      "value": "https://hkzrfqpnkvpmsaeluksh.supabase.co",
      "enabled": true
    },
    {
      "key": "stripe_secret_key",
      "value": "sk_live_...",
      "enabled": true,
      "type": "secret"
    }
  ]
}
```

---

## 🔑 Step 3: Get JWT Token

### Option A: Manual (Quick)
1. Go to https://proinvoice.app
2. Sign up or login
3. Open DevTools (F12)
4. Go to Application → Local Storage
5. Find `sb-hkzrfqpnkvpmsaeluksh-auth-token`
6. Copy the `access_token` value
7. Paste in Postman environment as `jwt_token`

### Option B: Automated (Postman)
Create a request to get token:
```bash
POST https://hkzrfqpnkvpmsaeluksh.supabase.co/auth/v1/token?grant_type=password
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "YourPassword123!"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

Add to Tests tab:
```javascript
var jsonData = pm.response.json();
pm.environment.set("jwt_token", jsonData.access_token);
```

---

## 📊 Step 4: Import Collection

### Option A: Use Template
1. Copy content from `postman-collection-template.json`
2. In Postman: Import → Paste Raw Text
3. Select your environment

### Option B: Create Manually
Create folders:
- Authentication
- Estimates
- Invoices
- Payments
- Clients
- Webhooks

---

## 🧪 Step 5: Create Test Suites

### Test 1: Authentication Flow
```javascript
// Tests tab
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has access_token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('access_token');
});

pm.test("Save JWT token", function () {
    var jsonData = pm.response.json();
    pm.environment.set("jwt_token", jsonData.access_token);
});
```

### Test 2: Create Estimate
```javascript
pm.test("Estimate created successfully", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has estimate ID", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData[0]).to.have.property('id');
    pm.environment.set("estimate_id", jsonData[0].id);
});

pm.test("Total matches calculation", function () {
    var jsonData = pm.response.json();
    var subtotal = jsonData[0].subtotal;
    var tax = jsonData[0].tax_amount;
    var total = jsonData[0].total;
    pm.expect(total).to.equal(subtotal + tax);
});
```

### Test 3: Payment Webhook
```javascript
pm.test("Webhook processed successfully", function () {
    pm.response.to.have.status(200);
});

pm.test("Payment status updated", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.equal("succeeded");
});
```

---

## 🔄 Step 6: Set Up Monitors

1. In Postman: Monitors → Create Monitor
2. Select collection: ProInvoice API
3. Select environment: Production
4. Schedule: Every 1 hour
5. Add notifications for failures

---

## 🚀 Step 7: CI/CD Integration

### GitHub Actions Workflow
```yaml
name: API Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Newman
        run: npm install -g newman
      
      - name: Run Postman Collection
        run: |
          newman run postman-collection-template.json \
            -e postman-environment.json \
            --reporters cli,json \
            --reporter-json-export results.json
      
      - name: Upload Results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: postman-results
          path: results.json
```

---

## 📋 Core API Endpoints

### Estimates
```
POST   /rest/v1/estimates              Create
GET    /rest/v1/estimates              List
GET    /rest/v1/estimates?id=eq.UUID   Get One
PATCH  /rest/v1/estimates?id=eq.UUID   Update
DELETE /rest/v1/estimates?id=eq.UUID   Delete
```

### Invoices
```
POST   /rest/v1/invoices               Create
GET    /rest/v1/invoices               List
GET    /rest/v1/invoices?id=eq.UUID    Get One
```

### Payments
```
POST   /functions/v1/create-checkout   Create Session
POST   /functions/v1/create-payment    Process Payment
```

### Webhooks
```
POST   /functions/v1/stripe-webhook    Stripe Events
```

---

## ✅ Testing Checklist

- [ ] Authentication working
- [ ] Can create estimate
- [ ] Can list estimates
- [ ] Can create payment
- [ ] Webhook processes correctly
- [ ] JWT token auto-refreshes
- [ ] Error handling works
- [ ] Rate limiting respected
- [ ] All tests pass in CI/CD

---

## 🆘 Troubleshooting

**401 Unauthorized**
- JWT token expired → Get new token
- Wrong environment → Check active environment

**404 Not Found**
- Wrong base URL → Verify supabase_url
- Endpoint doesn't exist → Check function name

**500 Server Error**
- Check Supabase logs
- Verify environment variables
- Check function code

---

## 📚 Resources

- [Postman Docs](https://learning.postman.com)
- [Supabase API](https://supabase.com/docs/reference/api)
- [Stripe API](https://stripe.com/docs/api)
- [Newman CLI](https://learning.postman.com/docs/collections/using-newman-cli)

---

**Ready to test? Import the collection and let's go! 🎉**

