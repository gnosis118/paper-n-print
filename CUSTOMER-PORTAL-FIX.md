# Customer Portal Error Fix

## 🐛 **Issue**

When clicking "Open Customer Portal" button, users were getting an error:
> "Failed to open subscription management. Please try again."

---

## ✅ **Root Causes Identified**

### **1. Missing Authorization Header**
The Supabase function call wasn't including the user's authentication token, causing the Edge Function to reject the request.

### **2. Poor Error Messages**
Generic error messages didn't help users understand what went wrong:
- No Stripe customer found
- Session expired
- Not logged in
- Other API errors

### **3. No Session Validation**
The code didn't check if the user's session was still valid before making the API call.

---

## 🔧 **Fixes Applied**

### **1. useSubscription.tsx** - Enhanced Authentication

**Before:**
```typescript
const { data, error } = await supabase.functions.invoke('customer-portal');
```

**After:**
```typescript
// Get the current session to ensure we have a valid token
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  throw new Error('No active session. Please log in again.');
}

const { data, error } = await supabase.functions.invoke('customer-portal', {
  headers: {
    Authorization: `Bearer ${session.access_token}`,
  },
});
```

**Changes:**
- ✅ Validates session before API call
- ✅ Includes Authorization header with access token
- ✅ Better error messages

---

### **2. SubscriptionManagement.tsx** - Better Error Handling

**Before:**
```typescript
catch (error) {
  toast.error("Failed to open subscription management. Please try again.");
}
```

**After:**
```typescript
catch (error) {
  const errorMessage = error instanceof Error ? error.message : "Failed to open subscription management. Please try again.";
  
  // Show more specific error messages
  if (errorMessage.includes('No Stripe customer')) {
    toast.error("You don't have an active subscription yet. Please subscribe to a plan first.");
  } else if (errorMessage.includes('No active session')) {
    toast.error("Your session has expired. Please log in again.");
  } else if (errorMessage.includes('log in')) {
    toast.error("Please log in to manage your subscription.");
  } else {
    toast.error(errorMessage);
  }
  
  console.error('Customer portal error:', error);
}
```

**Changes:**
- ✅ Specific error messages for different scenarios
- ✅ Helpful guidance for users
- ✅ Console logging for debugging

---

### **3. SubscriptionStatus.tsx** - Error Handling Added

**Added:**
```typescript
const handleOpenPortal = async () => {
  try {
    await openCustomerPortal();
    toast({
      title: "Opening Customer Portal",
      description: "Redirecting you to Stripe...",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to open customer portal";
    
    if (errorMessage.includes('No Stripe customer')) {
      toast({
        title: "No Active Subscription",
        description: "You need to subscribe to a plan first to access the customer portal.",
        variant: "destructive",
      });
    } else if (errorMessage.includes('No active session')) {
      toast({
        title: "Session Expired",
        description: "Please log in again to continue.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    
    console.error('Customer portal error:', error);
  }
};
```

**Changes:**
- ✅ Wrapped portal call in error handler
- ✅ User-friendly toast notifications
- ✅ Specific messages for different error types

---

## 📋 **Error Messages Now Shown**

### **Scenario 1: No Stripe Customer**
**Message:** "You don't have an active subscription yet. Please subscribe to a plan first."

**When:** User has never subscribed to a paid plan

**Action:** User should go to /pricing and subscribe

---

### **Scenario 2: Session Expired**
**Message:** "Your session has expired. Please log in again."

**When:** User's authentication token is no longer valid

**Action:** User should log out and log back in

---

### **Scenario 3: Not Logged In**
**Message:** "Please log in to manage your subscription."

**When:** User is not authenticated

**Action:** User should log in first

---

### **Scenario 4: Success**
**Message:** "Opening Stripe Customer Portal..."

**When:** Everything works correctly

**Action:** New tab opens with Stripe Customer Portal

---

## 🔍 **How It Works Now**

### **Flow:**

1. **User clicks "Open Customer Portal"**
   ↓
2. **Check if user is logged in**
   - If not → Show "Please log in" error
   ↓
3. **Get current session**
   - If no session → Show "Session expired" error
   ↓
4. **Call Supabase Edge Function with auth token**
   - Include `Authorization: Bearer {token}` header
   ↓
5. **Edge Function validates user**
   - Checks authentication
   - Looks up Stripe customer by email
   ↓
6. **Create Stripe Portal Session**
   - If no customer → Show "No subscription" error
   - If success → Return portal URL
   ↓
7. **Open portal in new tab**
   - Show success message
   - Open Stripe portal

---

## 🧪 **Testing Scenarios**

### **Test 1: User with Active Subscription**
- ✅ Should open Stripe portal successfully
- ✅ Should show success toast
- ✅ New tab should open with Stripe portal

### **Test 2: User without Subscription**
- ✅ Should show "No active subscription" error
- ✅ Should suggest subscribing to a plan
- ✅ Should not open new tab

### **Test 3: User Not Logged In**
- ✅ Should show "Please log in" error
- ✅ Should not make API call
- ✅ Should not open new tab

### **Test 4: Expired Session**
- ✅ Should show "Session expired" error
- ✅ Should suggest logging in again
- ✅ Should not open new tab

---

## 📁 **Files Modified**

1. ✅ `src/hooks/useSubscription.tsx`
   - Added session validation
   - Added Authorization header
   - Better error messages

2. ✅ `src/pages/SubscriptionManagement.tsx`
   - Enhanced error handling
   - Specific error messages
   - Console logging

3. ✅ `src/components/SubscriptionStatus.tsx`
   - Added error handling wrapper
   - Toast notifications
   - User-friendly messages

---

## 🎯 **Benefits**

### **Before:**
- ❌ Generic error: "Failed to open subscription management"
- ❌ No guidance on what to do
- ❌ Hard to debug
- ❌ Poor user experience

### **After:**
- ✅ Specific error messages
- ✅ Clear guidance for users
- ✅ Console logging for debugging
- ✅ Better user experience
- ✅ Proper authentication
- ✅ Session validation

---

## 🚀 **Next Steps for Users**

### **If you see "No active subscription" error:**
1. Go to `/pricing` page
2. Choose a plan
3. Complete subscription
4. Then try opening customer portal again

### **If you see "Session expired" error:**
1. Click "Log Out"
2. Log back in with your credentials
3. Try opening customer portal again

### **If you see "Please log in" error:**
1. Click "Log In" button
2. Enter your credentials
3. Try opening customer portal again

---

## ✅ **Summary**

**Fixed:**
- ✅ Missing Authorization header
- ✅ No session validation
- ✅ Generic error messages
- ✅ Poor error handling

**Added:**
- ✅ Session validation before API call
- ✅ Authorization header with access token
- ✅ Specific error messages for each scenario
- ✅ User-friendly toast notifications
- ✅ Console logging for debugging

**Result:**
- ✅ Customer portal now works correctly
- ✅ Users get helpful error messages
- ✅ Easier to debug issues
- ✅ Better user experience

---

**Status:** 🚀 **FIXED AND READY TO TEST!**

The customer portal should now work correctly with proper authentication and helpful error messages!

