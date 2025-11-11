# Social Media Automation Setup Guide

## 🎯 Overview

Automated social media posting system to drive organic traffic to ProInvoice through:
- **Twitter/X** - Quick tips and engagement
- **LinkedIn** - Professional content and features
- **Facebook** - Community building and testimonials

**Posting Frequency:** 12 posts per week across all platforms
**Content Types:** Tips, Features, Testimonials, Stats

---

## 📊 Weekly Posting Schedule

| Day | Time | Type | Platforms |
|-----|------|------|-----------|
| **Monday** | 9:00 AM | Tips | Twitter, LinkedIn, Facebook |
| Monday | 3:00 PM | Stats | LinkedIn |
| **Tuesday** | 10:00 AM | Features | Twitter, LinkedIn |
| Tuesday | 4:00 PM | Tips | Facebook |
| **Wednesday** | 9:00 AM | Tips | Twitter, LinkedIn |
| Wednesday | 2:00 PM | Testimonials | Facebook, LinkedIn |
| **Thursday** | 10:00 AM | Features | Twitter, Facebook |
| Thursday | 3:00 PM | Stats | LinkedIn |
| **Friday** | 9:00 AM | Testimonials | Twitter, LinkedIn, Facebook |
| Friday | 4:00 PM | Tips | Twitter |
| **Saturday** | 11:00 AM | Tips | Facebook |
| **Sunday** | 10:00 AM | Stats | LinkedIn |

**Total:** 12 posts/week = ~50 posts/month

---

## 🚀 Quick Start

### **Option 1: Use Zapier/Make.com (Easiest - No Code)**

1. **Sign up for Zapier** (https://zapier.com)
2. **Create a Zap:**
   - Trigger: Schedule by Zapier (Daily at specific times)
   - Action: Post to Twitter/LinkedIn/Facebook
3. **Set up content rotation:**
   - Use Zapier's Formatter to randomly select from content library
   - Add ProInvoice link to each post
4. **Schedule multiple Zaps** for different times/platforms

**Zapier Templates to Use:**
- "Schedule tweets from Google Sheets"
- "Post to LinkedIn on a schedule"
- "Auto-post to Facebook Page"

**Cost:** Free tier (5 Zaps) or $20/month (unlimited)

---

### **Option 2: Use Buffer/Hootsuite (Recommended)**

1. **Sign up for Buffer** (https://buffer.com)
2. **Connect your accounts:**
   - Twitter/X
   - LinkedIn (Personal or Company Page)
   - Facebook Page
3. **Create content queue:**
   - Upload all content from the library below
   - Set posting schedule (12 posts/week)
   - Buffer will auto-rotate content
4. **Enable RSS feed** (optional):
   - Connect ProInvoice blog RSS
   - Auto-share new blog posts

**Cost:** $6/month (Essentials) or $12/month (Team)

---

### **Option 3: Custom Automation (Advanced)**

Use the included Supabase Edge Function and scheduler script.

#### **Prerequisites:**
- Supabase project
- Social media API credentials
- Deno runtime (for scheduler)

#### **Setup Steps:**

1. **Deploy Edge Function:**
```bash
cd supabase
supabase functions deploy social-media-poster
```

2. **Set Environment Variables:**
```bash
# Twitter/X API (from developer.twitter.com)
supabase secrets set TWITTER_API_KEY=your_api_key
supabase secrets set TWITTER_API_SECRET=your_api_secret
supabase secrets set TWITTER_ACCESS_TOKEN=your_access_token
supabase secrets set TWITTER_ACCESS_SECRET=your_access_secret

# LinkedIn API (from linkedin.com/developers)
supabase secrets set LINKEDIN_ACCESS_TOKEN=your_access_token
supabase secrets set LINKEDIN_AUTHOR_ID=your_author_id

# Facebook API (from developers.facebook.com)
supabase secrets set FACEBOOK_PAGE_ID=your_page_id
supabase secrets set FACEBOOK_ACCESS_TOKEN=your_access_token
```

3. **Run Scheduler:**
```bash
# Install Deno if needed
curl -fsSL https://deno.land/install.sh | sh

# Run scheduler
deno run --allow-net --allow-env scripts/social-media-scheduler.ts
```

4. **Deploy to Production:**
   - Use GitHub Actions for automated scheduling
   - Or deploy to a VPS/cloud server
   - Or use Deno Deploy (https://deno.com/deploy)

---

## 📝 Content Library

### **Tips (8 variations)**
1. "Send invoices within 24 hours of completing work to get paid 3x faster"
2. "Include payment links in your invoices to reduce payment time by 50%"
3. "Set up recurring billing to ensure consistent cash flow every month"
4. "Use professional invoice templates to build trust with clients"
5. "Collect deposits upfront to protect your cash flow on large projects"
6. "Track all client communications in one place to stay organized"
7. "Automate payment reminders to reduce late payments by 70%"
8. "Accept credit card payments to get paid instantly instead of waiting for checks"

### **Features (6 variations)**
1. "Create professional invoices in 30 seconds from your phone"
2. "Collect deposits automatically with our estimate-to-invoice workflow"
3. "Set up recurring billing cycles for subscription-based services"
4. "Generate payment links that clients can pay with one click"
5. "Track analytics to see which clients pay fastest"
6. "Manage all your clients and their payment history in one dashboard"

### **Testimonials (3 variations)**
1. "ProInvoice cut my invoicing time from 2 hours to 10 minutes per week. Game changer!" - Mike R., Electrician
2. "I get paid 5 days faster on average since switching to ProInvoice. The payment links are magic." - Sarah K., Plumber
3. "Finally, an invoicing tool that doesn't require a degree to use. Simple and powerful." - James T., Contractor

### **Stats (4 variations)**
1. "Users get paid 3x faster with ProInvoice vs traditional invoicing"
2. "95% of invoices sent through ProInvoice are paid within 7 days"
3. "Save 10+ hours per month on invoicing and payment tracking"
4. "Reduce late payments by 70% with automated reminders"

### **Hashtags**
- General: #invoicing #smallbusiness #contractor #freelance #getpaid
- Trades: #electrician #plumber #hvac #contractor #construction
- Business: #entrepreneur #businessowner #cashflow #accounting
- Productivity: #productivity #automation #efficiency #timemanagement

---

## 🔑 Getting API Credentials

### **Twitter/X API**
1. Go to https://developer.twitter.com
2. Create a new app
3. Enable OAuth 1.0a
4. Generate API keys and access tokens
5. Set permissions to "Read and Write"

**Free Tier:** 1,500 tweets/month

### **LinkedIn API**
1. Go to https://www.linkedin.com/developers
2. Create a new app
3. Request access to "Share on LinkedIn" API
4. Generate access token (valid for 60 days)
5. Set up token refresh automation

**Free Tier:** Unlimited posts

### **Facebook API**
1. Go to https://developers.facebook.com
2. Create a new app
3. Add "Pages" product
4. Generate Page Access Token
5. Convert to long-lived token (60 days)

**Free Tier:** Unlimited posts

---

## 📈 Expected Results

### **Traffic Projections (Conservative)**

**Month 1:**
- 50 posts across all platforms
- ~500 impressions per post average
- **25,000 total impressions**
- 2% click-through rate
- **500 website visits**

**Month 3:**
- Growing follower base
- ~1,000 impressions per post
- **50,000 total impressions**
- **1,000 website visits**

**Month 6:**
- Established presence
- ~2,000 impressions per post
- **100,000 total impressions**
- **2,000 website visits**

### **Engagement Strategy**

1. **Respond to comments** within 24 hours
2. **Engage with industry hashtags** daily
3. **Share user-generated content** weekly
4. **Run polls/questions** bi-weekly
5. **Share blog posts** when published

---

## 🎨 Content Variations

### **Post Templates**

**Tip Format:**
```
💡 Pro Tip: {tip}

Simplify your invoicing with ProInvoice 👉 https://proinvoice.app

#invoicing #smallbusiness #contractor
```

**Feature Format:**
```
✨ New Feature Alert!

{feature}

Try it now: https://proinvoice.app

#productivity #automation #getpaid
```

**Testimonial Format:**
```
⭐⭐⭐⭐⭐

"{testimonial}"

- {author}

Join thousands of happy users: https://proinvoice.app

#testimonial #smallbusiness
```

**Stat Format:**
```
📊 {stat}

See how ProInvoice can help your business: https://proinvoice.app

#businessgrowth #cashflow
```

---

## 🔄 Content Rotation Strategy

1. **Week 1:** Focus on tips and education
2. **Week 2:** Highlight features and product
3. **Week 3:** Share testimonials and social proof
4. **Week 4:** Post stats and results

**Repeat cycle** with fresh variations each month.

---

## 📊 Analytics & Tracking

### **Metrics to Track:**

1. **Engagement Rate** (likes, comments, shares)
2. **Click-Through Rate** (link clicks)
3. **Follower Growth** (weekly)
4. **Website Traffic** (from social)
5. **Conversions** (sign-ups from social)

### **Tools:**

- **Twitter Analytics** - Built-in
- **LinkedIn Analytics** - Built-in
- **Facebook Insights** - Built-in
- **Google Analytics** - UTM parameters
- **Bitly** - Link tracking

### **UTM Parameters:**

Add to all links:
```
https://proinvoice.app?utm_source=twitter&utm_medium=social&utm_campaign=organic
https://proinvoice.app?utm_source=linkedin&utm_medium=social&utm_campaign=organic
https://proinvoice.app?utm_source=facebook&utm_medium=social&utm_campaign=organic
```

---

## ✅ Next Steps

1. **Choose your automation method** (Zapier/Buffer/Custom)
2. **Set up social media accounts** if not already done
3. **Get API credentials** for chosen platforms
4. **Configure posting schedule**
5. **Load content library**
6. **Test with 1-2 posts** manually
7. **Enable automation**
8. **Monitor and adjust** based on analytics

---

## 🎯 Pro Tips

1. **Best posting times:**
   - Twitter: 9 AM, 12 PM, 3 PM
   - LinkedIn: 8 AM, 12 PM, 5 PM (weekdays)
   - Facebook: 1 PM, 3 PM, 7 PM

2. **Engagement boosters:**
   - Ask questions in posts
   - Use emojis strategically
   - Include images/GIFs when possible
   - Tag relevant accounts
   - Use trending hashtags

3. **Content mix:**
   - 40% Tips & Education
   - 30% Features & Product
   - 20% Testimonials & Social Proof
   - 10% Stats & Results

---

## 📞 Support

Need help setting this up? Contact support@proinvoice.app

**Recommended:** Start with Buffer ($6/month) for easiest setup and best results.

