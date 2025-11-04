# 💅 ProInvoice — AI Cashflow Assistant for Beauty Professionals

[![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)]()
[![React](https://img.shields.io/badge/React-18.3.1-61dafb)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

> Get Paid Without Chasing — Smart invoicing and payment reminders for beauty professionals

**URL**: https://www.proinvoice.app

## 🎯 What is ProInvoice?

ProInvoice is a modern invoicing platform built specifically for beauty and personal care professionals. It combines beautiful estimate templates, intelligent payment reminders, lead management, and actionable business insights to help you manage cash flow effortlessly.

### ✨ Key Features

- 💅 **Service-Specific Templates** — Pre-built templates for hair, nails, lashes, massage, tattoo, and esthetics
- 🤖 **AI Payment Reminders** — Smart, personalized payment reminders with customizable templates
- 📱 **Mobile-First Design** — Fully responsive, optimized for phones and tablets
- 📊 **Analytics Dashboard** — Real-time metrics on conversion rates, revenue, and deposits
- 💡 **Smart Suggestions** — AI-powered recommendations for follow-ups, upsells, and timing
- 📈 **Revenue Trends** — Visual charts showing revenue patterns and opportunities
- 👥 **Lead Management** — Simple CRM to track and manage leads
- 💳 **Stripe Integration** — Secure payment processing with deposit tracking
- ⚡ **Real-Time Updates** — Live data synchronization across all devices
- 🔒 **Enterprise Security** — Row-level security, encrypted payments, secure authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

```bash
# Clone the repository
git clone https://github.com/gnosis118/paper-n-print.git
cd paper-n-print

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# Stripe
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** — UI framework
- **TypeScript 5.8.3** — Type safety
- **Vite 5.4.19** — Build tool
- **Tailwind CSS** — Styling
- **shadcn/ui** — Component library
- **Recharts 2.15.4** — Data visualization

### Backend
- **Supabase** — Database & Auth
- **PostgreSQL** — Data storage
- **Stripe API** — Payment processing

## 📚 Documentation

- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** — Complete project overview
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** — API endpoints
- **[USER_GUIDE.md](./USER_GUIDE.md)** — Feature guide
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** — Deployment guide

## 🚀 Deployment

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed deployment steps.

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| Phases Completed | 9/9 ✅ |
| Components | 15+ |
| Features | 50+ |
| TypeScript Errors | 0 |

**Status:** ✅ Production Ready | **Version:** 1.0.0-phase9
