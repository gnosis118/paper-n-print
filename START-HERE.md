# 🚀 START HERE - ProInvoice Stripe Setup

## ✅ What I've Done

I've updated all your code to support your pricing page ($19/$49/$99). Everything is ready except for one thing: **I need your Stripe price IDs**.

---

## 🎯 What You Need To Do (3 Simple Steps)

### **STEP 1: Get Your Stripe Secret Key**

1. Go to https://dashboard.stripe.com
2. **Toggle to TEST MODE** (top right corner)
3. Click **Developers** → **API Keys**
4. Copy your **Secret key** (starts with `sk_test_...`)

---

### **STEP 2: Run This Command**

Open PowerShell in this folder and run:

```powershell
.\setup-stripe-prices.ps1 -StripeSecretKey "PASTE_YOUR_KEY_HERE"
```

**Example:**
```powershell
.\setup-stripe-prices.ps1 -StripeSecretKey "sk_test_51ABC123xyz..."
```

This will create 6 prices in Stripe and show you the price IDs.

---

### **STEP 3: Give Me the Price IDs**

The script will output something like this:

```
starter_monthly: price_1ABC123xyz
starter_annual: price_1DEF456xyz
pro_crew_monthly: price_1GHI789xyz
pro_crew_annual: price_1JKL012xyz
contractor_plus_monthly: price_1MNO345xyz
contractor_plus_annual: price_1PQR678xyz
```

**Copy all 6 price IDs and paste them in the chat.**

I'll then:
- ✅ Update your code with the real price IDs
- ✅ Show you how to deploy
- ✅ Help you test the payment flow

---

## 🔄 Alternative: Create Prices Manually

If the PowerShell script doesn't work, create them manually:

### In Stripe Dashboard (https://dashboard.stripe.com/test/products):

**1. Create "Starter" Product:**
- Click **Add product**
- Name: `Starter`
- Add price: `$19.00 USD` / `Monthly`
- Add another price: `$190.00 USD` / `Yearly`
- Save and copy both price IDs

**2. Create "Pro Crew" Product:**
- Click **Add product**
- Name: `Pro Crew`
- Add price: `$49.00 USD` / `Monthly`
- Add another price: `$490.00 USD` / `Yearly`
- Save and copy both price IDs

**3. Create "Contractor Plus" Product:**
- Click **Add product**
- Name: `Contractor Plus`
- Add price: `$99.00 USD` / `Monthly`
- Add another price: `$990.00 USD` / `Yearly`
- Save and copy both price IDs

Then give me all 6 price IDs!

---

## 💡 What Happens Next

Once you give me the price IDs:

1. **I'll update your code** with the real IDs
2. **You'll deploy** to Supabase (I'll show you how)
3. **You'll test** with a test card
4. **You'll start accepting real payments!** 💰

---

## 📞 Need Help?

If you get stuck:
- Check `RUN-THIS-NOW.md` for detailed instructions
- Check `CHANGES-MADE.md` to see what I've updated
- Check `SETUP-INSTRUCTIONS.md` for the complete guide

---

## ⚡ Quick Summary

**Your pricing page shows:** $19, $49, $99  
**Your Stripe currently has:** $9, $19, $39 ❌ MISMATCH  
**What we're doing:** Creating new Stripe prices to match your page  
**What I need:** 6 price IDs from Stripe  
**What you'll get:** Working payment system that matches your pricing! ✅

---

**Ready? Run the PowerShell script and give me the price IDs!** 🚀

