# 📡 ProInvoice API Documentation

**Version:** 1.0.0  
**Status:** Production Ready  
**Last Updated:** 2025-11-04

---

## 🔑 Authentication

All API requests require authentication via Supabase Auth.

### Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### Getting a Token
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

const token = data.session.access_token
```

---

## 📊 Estimates API

### Get All Estimates
```
GET /api/estimates
```

**Response:**
```json
{
  "data": [
    {
      "id": "est_123",
      "user_id": "user_456",
      "title": "Hair Styling",
      "status": "sent",
      "total": 15000,
      "deposit_amount": 5000,
      "created_at": "2025-11-04T10:00:00Z",
      "sent_at": "2025-11-04T10:30:00Z"
    }
  ]
}
```

### Create Estimate
```
POST /api/estimates
```

**Request:**
```json
{
  "title": "Hair Styling",
  "client_name": "Jane Doe",
  "client_email": "jane@example.com",
  "items": [
    {
      "description": "Haircut",
      "quantity": 1,
      "unit_price": 10000
    }
  ],
  "deposit_type": "percent",
  "deposit_value": 33
}
```

**Response:** `201 Created`
```json
{
  "id": "est_123",
  "status": "draft",
  "total": 10000
}
```

### Update Estimate
```
PATCH /api/estimates/:id
```

**Request:**
```json
{
  "status": "sent",
  "items": [...]
}
```

### Delete Estimate
```
DELETE /api/estimates/:id
```

---

## 💳 Payments API

### Get Payment Status
```
GET /api/payments/:estimate_id
```

**Response:**
```json
{
  "data": {
    "id": "pay_123",
    "estimate_id": "est_123",
    "amount": 5000,
    "status": "succeeded",
    "created_at": "2025-11-04T11:00:00Z"
  }
}
```

### Create Payment Intent
```
POST /api/payments/intent
```

**Request:**
```json
{
  "estimate_id": "est_123",
  "amount": 5000,
  "currency": "usd"
}
```

**Response:**
```json
{
  "client_secret": "pi_123_secret_456",
  "payment_intent_id": "pi_123"
}
```

---

## 📧 Reminders API

### Get Reminder Preferences
```
GET /api/reminders/preferences
```

**Response:**
```json
{
  "data": {
    "enabled": true,
    "frequency": "weekly",
    "max_reminders": 3,
    "ai_personalization": false
  }
}
```

### Update Reminder Preferences
```
PATCH /api/reminders/preferences
```

**Request:**
```json
{
  "enabled": true,
  "frequency": "weekly",
  "ai_personalization": true
}
```

### Send Reminder
```
POST /api/reminders/send
```

**Request:**
```json
{
  "estimate_id": "est_123",
  "template_id": "tpl_123"
}
```

---

## 📊 Analytics API

### Get Analytics Metrics
```
GET /api/analytics/metrics
```

**Response:**
```json
{
  "data": {
    "conversion_rate": 65.5,
    "average_time_to_accept": 3.2,
    "total_revenue": 150000,
    "total_deposits": 50000,
    "total_estimates": 25,
    "accepted_estimates": 16
  }
}
```

### Get Revenue Trends
```
GET /api/analytics/trends?range=30d
```

**Query Parameters:**
- `range`: `7d`, `30d`, `90d`

**Response:**
```json
{
  "data": [
    {
      "date": "Nov 1",
      "revenue": 5000,
      "deposits": 1500,
      "estimates": 3
    }
  ]
}
```

### Get Smart Suggestions
```
GET /api/analytics/suggestions
```

**Response:**
```json
{
  "data": [
    {
      "id": "sug_123",
      "type": "follow_up",
      "title": "Follow up on pending estimates",
      "description": "You have 3 estimates pending for 7+ days",
      "priority": "high",
      "impact": "+$2,500 potential revenue"
    }
  ]
}
```

---

## 👥 Leads API

### Get All Leads
```
GET /api/leads
```

**Response:**
```json
{
  "data": [
    {
      "id": "lead_123",
      "name": "John Smith",
      "email": "john@example.com",
      "status": "new",
      "lead_score": 85,
      "created_at": "2025-11-04T09:00:00Z"
    }
  ]
}
```

### Create Lead
```
POST /api/leads
```

**Request:**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+1234567890",
  "source": "website"
}
```

### Update Lead
```
PATCH /api/leads/:id
```

**Request:**
```json
{
  "status": "contacted",
  "lead_score": 90
}
```

### Log Lead Interaction
```
POST /api/leads/:id/interactions
```

**Request:**
```json
{
  "interaction_type": "email_sent",
  "notes": "Sent follow-up email"
}
```

---

## 🔔 Webhooks

### Stripe Webhook
```
POST /api/webhooks/stripe
```

**Events:**
- `payment_intent.succeeded` — Payment completed
- `payment_intent.payment_failed` — Payment failed
- `charge.refunded` — Refund processed

**Headers:**
```
Stripe-Signature: <signature>
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "message": "Missing required field: email"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Estimate not found"
}
```

### 500 Server Error
```json
{
  "error": "Server error",
  "message": "An unexpected error occurred"
}
```

---

## 🔄 Rate Limiting

- **Requests per minute:** 60
- **Requests per hour:** 1000
- **Burst limit:** 10 requests per second

**Headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1699099200
```

---

## 📝 Examples

### JavaScript/TypeScript
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)

// Get estimates
const { data, error } = await supabase
  .from('estimates')
  .select('*')
  .eq('status', 'sent')

// Create estimate
const { data: newEstimate } = await supabase
  .from('estimates')
  .insert([{
    title: 'Hair Styling',
    total: 10000,
    status: 'draft'
  }])
```

### cURL
```bash
# Get estimates
curl -H "Authorization: Bearer TOKEN" \
  https://api.proinvoice.app/api/estimates

# Create estimate
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hair Styling","total":10000}' \
  https://api.proinvoice.app/api/estimates
```

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [React Documentation](https://react.dev)

---

**Status:** ✅ Production Ready  
**Last Updated:** 2025-11-04

