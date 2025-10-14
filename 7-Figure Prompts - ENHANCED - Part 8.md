# 7-FIGURE PROMPTS LIBRARY - ENHANCED VERSION

## PART 8: IMPLEMENTER PROMPTS (FINAL)

---

### 22. A/B TEST PLAN

**Enhanced Prompt:**

You are a conversion optimization scientist who has run 5,000+ A/B tests generating $50M+ in incremental revenue. Draft a comprehensive A/B test plan for [PAGE/AD] with clear hypotheses based on conversion psychology, 3 test variants that isolate single variables, sample size calculations using statistical significance formulas, success metrics tied to [KPI], and rollout rules for declaring winners.

**A/B TESTING FRAMEWORK:**

**THE SCIENTIFIC METHOD FOR TESTING:**

**Step 1: HYPOTHESIS FORMATION**

**Hypothesis Structure:**
"If we [CHANGE], then [METRIC] will [INCREASE/DECREASE] by [%] because [PSYCHOLOGICAL PRINCIPLE]."

**Example:**
"If we change the headline from 'Transform Your Business' to 'Get Your First 10 Clients in 60 Days', then conversion rate will increase by 25% because specificity reduces uncertainty and creates a clear mental picture of the outcome."

**Good Hypothesis Criteria:**
- Specific change identified
- Measurable outcome predicted
- Percentage improvement estimated
- Psychological reason stated
- Testable within 2-4 weeks

**Step 2: VARIABLE ISOLATION**

**The One-Variable Rule:**
Test ONE thing at a time or you won't know what caused the change.

**Common Variables to Test:**

**Headlines:**
- Specificity (vague vs. specific)
- Length (short vs. long)
- Format (question vs. statement)
- Angle (benefit vs. curiosity vs. proof)

**CTAs:**
- Button text ("Learn More" vs. "Get Started")
- Button color (green vs. orange vs. red)
- Button size (small vs. large)
- Button placement (above vs. below fold)

**Images:**
- People vs. product
- Faces vs. no faces
- Action vs. static
- Professional vs. casual

**Copy:**
- Length (short vs. long)
- Format (bullets vs. paragraphs)
- Tone (formal vs. casual)
- Focus (features vs. benefits)

**Pricing:**
- Display format ($97/mo vs. $1,164/year)
- Anchor pricing (show original price)
- Payment options (one-time vs. payment plan)
- Guarantee prominence

**Step 3: SAMPLE SIZE CALCULATION**

**Statistical Significance Formula:**

Required Sample Size = (Z-score² × p × (1-p)) / (margin of error²)

**Simplified Calculator:**
- Baseline conversion rate: 5%
- Minimum detectable effect: 20% (1% absolute lift)
- Statistical significance: 95%
- Statistical power: 80%
- Required sample per variant: ~15,000 visitors

**Practical Guidelines:**
- Minimum 100 conversions per variant
- Run for at least 2 full weeks (capture weekly patterns)
- Don't stop test early even if "winning"
- Account for traffic fluctuations

**Step 4: SUCCESS METRICS**

**Primary Metric:**
The ONE metric that determines winner
- Conversion rate
- Revenue per visitor
- Cost per acquisition
- Customer lifetime value

**Secondary Metrics:**
Supporting metrics to watch
- Click-through rate
- Time on page
- Bounce rate
- Form completion rate

**Guardrail Metrics:**
Metrics that shouldn't get worse
- Customer quality
- Refund rate
- Support tickets
- Brand perception

**Step 5: ROLLOUT RULES**

**When to Declare a Winner:**
- ✅ Statistical significance reached (95%+)
- ✅ Minimum sample size achieved
- ✅ Test ran for full duration
- ✅ Results are consistent (not fluctuating)
- ✅ Secondary metrics look good
- ✅ Guardrail metrics haven't degraded

**When to Keep Testing:**
- ⏸️ Results are inconclusive
- ⏸️ Variants are performing similarly
- ⏸️ Sample size not reached
- ⏸️ High variance in results

**When to Stop and Iterate:**
- ❌ All variants underperform control
- ❌ Guardrail metrics degraded
- ❌ Test revealed bigger issues
- ❌ Business priorities changed

**INPUTS REQUIRED:**
- [PAGE/AD]: What you're testing
- [HYPOTHESES]: What you think will improve performance
- [KPI]: Primary success metric

**OUTPUT STRUCTURE:**

**TEST PLAN DOCUMENT:**

1. **Test Name & ID**
2. **Hypothesis** (full statement)
3. **Variable Being Tested** (one thing)
4. **Control (A)** (current version)
5. **Variant B** (first alternative)
6. **Variant C** (second alternative)
7. **Sample Size Required** (per variant)
8. **Test Duration** (days/weeks)
9. **Primary Metric** (what determines winner)
10. **Secondary Metrics** (supporting data)
11. **Guardrail Metrics** (what can't get worse)
12. **Rollout Rules** (when to declare winner)
13. **Implementation Notes** (how to set up)
14. **Analysis Plan** (how to interpret results)

**EXAMPLE A/B TEST PLAN:**

**TEST #1: LANDING PAGE HEADLINE**

**Test ID:** LP-001-Headline
**Page:** Main landing page (www.example.com)
**Traffic:** Paid ads (Facebook/Instagram)

**HYPOTHESIS:**
"If we change the headline from 'Transform Your Business' (vague) to 'Get Your First 10 Coaching Clients in 60 Days Without Paid Ads' (specific), then conversion rate will increase by 25-35% because specificity reduces uncertainty, creates a clear mental picture, and addresses the primary objection (cost of ads)."

**PSYCHOLOGICAL PRINCIPLES:**
- Specificity bias (concrete > abstract)
- Mental simulation (can visualize outcome)
- Objection pre-emption (addresses "no ads" concern)
- Social proof (implies others have done it)

**VARIABLE BEING TESTED:**
Headline only (everything else stays the same)

**CONTROL (A) - Current:**
Headline: "Transform Your Business"
Subheadline: "Join thousands of successful entrepreneurs"

**VARIANT B - Specific Outcome:**
Headline: "Get Your First 10 Coaching Clients in 60 Days"
Subheadline: "Without spending $1 on paid ads"

**VARIANT C - Proof-Led:**
Headline: "The System That Helped 312 Coaches Land Their First 10 Clients"
Subheadline: "Average time to first client: 18 days"

**SAMPLE SIZE CALCULATION:**
- Current conversion rate: 5%
- Minimum detectable effect: 25% (1.25% absolute)
- Confidence level: 95%
- Statistical power: 80%
- Required per variant: 12,500 visitors
- Total required: 37,500 visitors (3 variants)

**TEST DURATION:**
- Current traffic: 2,500 visitors/day
- Days to reach sample: 15 days
- Add buffer for weekly patterns: 21 days (3 weeks)

**PRIMARY METRIC:**
Conversion rate (form submission)
- Control baseline: 5%
- Target for winner: 6.25%+ (25% lift)

**SECONDARY METRICS:**
- Click-through rate on CTA button
- Time on page (should increase if more engaging)
- Scroll depth (are they reading more?)
- Form start rate (how many begin form)

**GUARDRAIL METRICS:**
- Lead quality score (from sales team)
- Show-up rate for strategy calls
- Close rate (shouldn't decrease)
- Cost per lead (shouldn't increase >10%)

**ROLLOUT RULES:**

**Declare Winner If:**
- ✅ One variant achieves 95%+ statistical significance
- ✅ Lift is 20%+ over control
- ✅ Test ran for full 21 days
- ✅ Results stable for final 7 days
- ✅ Secondary metrics positive or neutral
- ✅ Guardrail metrics maintained

**Keep Testing If:**
- ⏸️ No variant reaches significance by day 21
- ⏸️ Results are within 10% of each other
- ⏸️ High day-to-day variance

**Stop & Iterate If:**
- ❌ All variants underperform control by >10%
- ❌ Lead quality drops significantly
- ❌ Cost per lead increases >20%

**IMPLEMENTATION NOTES:**
- Use Google Optimize or VWO
- Split traffic evenly (33/33/33)
- Track in Google Analytics as events
- Set up conversion goals
- Create dashboard for daily monitoring

**ANALYSIS PLAN:**

**Daily Monitoring:**
- Check for technical issues
- Ensure even traffic split
- Watch for anomalies

**Weekly Review:**
- Calculate current significance
- Review secondary metrics
- Check guardrail metrics
- Adjust if needed

**Final Analysis:**
- Calculate statistical significance
- Analyze by traffic source
- Segment by device (mobile/desktop)
- Review qualitative feedback
- Document learnings

**EXPECTED OUTCOMES:**

**If Variant B Wins (Specific Outcome):**
- Proves specificity > vagueness
- Apply to all marketing copy
- Test even more specific angles

**If Variant C Wins (Proof-Led):**
- Proves social proof > promises
- Add more proof throughout funnel
- Test different proof formats

**If Control Wins:**
- Current headline is strong OR
- Need to test different variable OR
- Traffic quality issue

**NEXT TESTS (If This Wins):**
1. Test CTA button text
2. Test hero image
3. Test social proof format
4. Test pricing display

---

### 23. CHECKOUT UX FIXES

**Enhanced Prompt:**

You are a checkout optimization specialist who has audited 1,000+ checkout flows and recovered $100M+ in abandoned cart revenue. List the top 10 checkout UX fixes for [PLATFORM] based on [ANALYTICS] data and UX [HEURISTICS], provide a brief rationale for each fix explaining the psychological friction it removes, and estimate the expected impact on completion rate.

**CHECKOUT OPTIMIZATION FRAMEWORK:**

**THE 5 FRICTION TYPES IN CHECKOUT:**

**1. COGNITIVE FRICTION (Mental Effort)**
- Too many form fields
- Confusing labels
- Unclear instructions
- Complex calculations
- Decision fatigue

**2. TRUST FRICTION (Security Concerns)**
- No security badges
- Unfamiliar payment processor
- No return policy
- Hidden fees
- Suspicious design

**3. TECHNICAL FRICTION (Usability Issues)**
- Slow loading
- Mobile not optimized
- Form validation errors
- Payment failures
- Browser compatibility

**4. COMMITMENT FRICTION (Too Much Too Soon)**
- Forced account creation
- Asking for unnecessary info
- No guest checkout
- Unclear total cost
- Surprise shipping fees

**5. URGENCY FRICTION (Easy to Abandon)**
- No cart persistence
- No exit-intent offer
- No urgency messaging
- Easy to leave
- No recovery email

**CHECKOUT BEST PRACTICES:**

**Form Optimization:**
- ✅ Single column layout
- ✅ Autofill enabled
- ✅ Inline validation
- ✅ Progress indicator
- ✅ Mobile-optimized inputs

**Trust Building:**
- ✅ Security badges visible
- ✅ Money-back guarantee
- ✅ Customer testimonials
- ✅ Live chat support
- ✅ Clear refund policy

**Payment Options:**
- ✅ Multiple payment methods
- ✅ Payment plans available
- ✅ One-click checkout
- ✅ Save payment info
- ✅ Digital wallets (Apple Pay, Google Pay)

**Transparency:**
- ✅ Show total upfront
- ✅ No hidden fees
- ✅ Clear shipping costs
- ✅ Delivery timeline
- ✅ What happens next

**INPUTS REQUIRED:**
- [PLATFORM]: Shopify, WooCommerce, Custom, etc.
- [ANALYTICS]: Abandonment rate, drop-off points
- [HEURISTICS]: UX audit findings

**OUTPUT STRUCTURE:**

For each of 10 fixes:

1. **Fix #** (priority order)
2. **Issue** (what's wrong)
3. **Friction Type** (which of 5 types)
4. **Current Impact** (% of users affected)
5. **Fix Recommendation** (specific solution)
6. **Rationale** (psychological principle)
7. **Implementation Effort** (hours)
8. **Expected Impact** (% improvement)
9. **Priority Score** (impact/effort)

**EXAMPLE CHECKOUT FIXES:**

**FIX #1: Reduce Form Fields from 12 to 5**

**Issue:**
Checkout form asks for 12 fields including unnecessary information like "How did you hear about us?" and "Company name"

**Friction Type:** Cognitive Friction + Commitment Friction

**Current Impact:** 65% of users (most people)

**Fix Recommendation:**
Reduce to essential 5 fields only:
- Email
- Name
- Payment info (handled by Stripe)
- Billing address (auto-filled from payment)
- Optional: Phone (for delivery updates)

Move "How did you hear about us?" to post-purchase survey

**Rationale:**
Every additional form field reduces completion rate by 5-10%. Users experience decision fatigue and question why you need this information. Removing unnecessary fields reduces cognitive load and commitment friction.

**Implementation Effort:** 2 hours

**Expected Impact:** +15-25% completion rate

**Priority Score:** 20 / 2 = 10 (HIGHEST PRIORITY)

---

**FIX #2: Add Trust Badges Above Payment Button**

**Issue:**
No security badges or trust signals visible during checkout

**Friction Type:** Trust Friction

**Current Impact:** 40% of users (security-conscious buyers)

**Fix Recommendation:**
Add trust badge row above "Complete Purchase" button:
- SSL/Security badge
- Money-back guarantee (30 days)
- Payment processor logos (Stripe, PayPal)
- "Secure Checkout" text
- Customer count ("Join 10,000+ customers")

**Rationale:**
Trust friction is highest at the moment of payment. Visible security signals reduce anxiety and increase confidence. The "wisdom of the crowd" effect (10,000+ customers) provides social proof.

**Implementation Effort:** 1 hour

**Expected Impact:** +8-12% completion rate

**Priority Score:** 10 / 1 = 10 (HIGHEST PRIORITY)

---

**FIX #3: Show Total Cost Upfront (No Surprises)**

**Issue:**
Shipping cost and taxes only shown on final step, causing sticker shock

**Friction Type:** Trust Friction + Commitment Friction

**Current Impact:** 55% of users (price-sensitive buyers)

**Fix Recommendation:**
Show estimated total on EVERY step:
- Subtotal
- Estimated shipping
- Estimated tax
- **TOTAL**

Update in real-time as they enter zip code

**Rationale:**
Surprise costs are the #1 reason for cart abandonment (28% of users). Showing total upfront sets expectations and eliminates sticker shock. Transparency builds trust.

**Implementation Effort:** 4 hours

**Expected Impact:** +20-30% completion rate

**Priority Score:** 25 / 4 = 6.25 (HIGH PRIORITY)

---

**FIX #4: Enable Guest Checkout (No Forced Account)**

**Issue:**
Users must create an account to checkout

**Friction Type:** Commitment Friction

**Current Impact:** 35% of users (first-time buyers)

**Fix Recommendation:**
Add "Checkout as Guest" option
- Collect email only
- Offer account creation AFTER purchase
- "Save your info for faster checkout next time"

**Rationale:**
Forced account creation increases abandonment by 25%. Users don't want another password to remember. Let them buy first, create account later.

**Implementation Effort:** 3 hours

**Expected Impact:** +15-20% completion rate

**Priority Score:** 17.5 / 3 = 5.8 (HIGH PRIORITY)

---

**FIX #5: Add Mobile-Optimized Payment Buttons**

**Issue:**
Payment buttons are small and hard to tap on mobile (60% of traffic)

**Friction Type:** Technical Friction

**Current Impact:** 60% of users (mobile shoppers)

**Fix Recommendation:**
- Increase button size to 60px height minimum
- Full-width buttons on mobile
- Add Apple Pay / Google Pay buttons
- Larger tap targets (44px minimum)
- Thumb-friendly placement

**Rationale:**
Mobile users have fat fingers and small screens. Small buttons cause mis-taps and frustration. Apple Pay/Google Pay reduce friction to one tap.

**Implementation Effort:** 2 hours

**Expected Impact:** +25-35% mobile completion rate

**Priority Score:** 30 / 2 = 15 (HIGHEST PRIORITY)

---

**FIX #6: Add Progress Indicator**

**Issue:**
Multi-step checkout with no indication of progress

**Friction Type:** Cognitive Friction

**Current Impact:** 45% of users (impatient buyers)

**Fix Recommendation:**
Add progress bar showing:
- Step 1: Information
- Step 2: Shipping
- Step 3: Payment
- Step 4: Confirmation

Show "Step 2 of 4" clearly

**Rationale:**
Unknown duration creates anxiety. Progress indicators reduce abandonment by showing "almost done." Zeigarnik effect makes people want to complete started tasks.

**Implementation Effort:** 2 hours

**Expected Impact:** +5-10% completion rate

**Priority Score:** 7.5 / 2 = 3.75 (MEDIUM PRIORITY)

---

**FIX #7: Add Exit-Intent Popup with Discount**

**Issue:**
No recovery mechanism when users try to leave

**Friction Type:** Urgency Friction

**Current Impact:** 70% of users (cart abandoners)

**Fix Recommendation:**
Trigger exit-intent popup when mouse moves to close tab:
- "Wait! Don't leave empty-handed"
- Offer 10% discount code
- "This offer expires in 15 minutes"
- One-click apply to cart

**Rationale:**
Recovers 10-15% of abandoners. Discount reduces price friction. Urgency (15 min) creates FOMO. Low effort (one click) removes barriers.

**Implementation Effort:** 3 hours

**Expected Impact:** +10-15% recovery rate

**Priority Score:** 12.5 / 3 = 4.2 (MEDIUM PRIORITY)

---

**FIX #8: Add Live Chat Support**

**Issue:**
No way to get help during checkout

**Friction Type:** Trust Friction

**Current Impact:** 25% of users (question-havers)

**Fix Recommendation:**
Add live chat widget:
- Visible on checkout pages
- "Questions? Chat with us"
- Fast response time (<2 min)
- Can complete purchase in chat

**Rationale:**
Questions kill conversions. Live chat answers questions in real-time, removing barriers. Increases trust and reduces abandonment by 15-20%.

**Implementation Effort:** 4 hours (setup + training)

**Expected Impact:** +8-12% completion rate

**Priority Score:** 10 / 4 = 2.5 (MEDIUM PRIORITY)

---

**FIX #9: Optimize Page Load Speed**

**Issue:**
Checkout pages load in 4.5 seconds (should be <2 seconds)

**Friction Type:** Technical Friction

**Current Impact:** 100% of users

**Fix Recommendation:**
- Compress images
- Minify CSS/JS
- Enable caching
- Use CDN
- Lazy load non-critical elements

Target: <2 second load time

**Rationale:**
Every 1-second delay reduces conversions by 7%. 4.5 seconds = 17.5% loss. Speed builds trust and reduces frustration.

**Implementation Effort:** 6 hours

**Expected Impact:** +15-20% completion rate

**Priority Score:** 17.5 / 6 = 2.9 (MEDIUM PRIORITY)

---

**FIX #10: Add Payment Plan Option**

**Issue:**
Only one-time payment available for $497 offer

**Friction Type:** Commitment Friction (price)

**Current Impact:** 40% of users (price-sensitive)

**Fix Recommendation:**
Add payment plan option:
- 3 payments of $179 ($537 total)
- Clearly show both options
- Default to payment plan
- "Or pay in full and save $40"

**Rationale:**
Payment plans reduce perceived commitment. $179 feels more affordable than $497. Increases conversions by 30-40% for high-ticket offers.

**Implementation Effort:** 5 hours

**Expected Impact:** +30-40% completion rate

**Priority Score:** 35 / 5 = 7 (HIGH PRIORITY)

---

*Continue to Part 9 for additional pillars...*

