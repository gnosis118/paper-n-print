import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

const Pricing = () => {
  const [invoicesPerMonth, setInvoicesPerMonth] = useState(50);
  const [avgInvoiceValue, setAvgInvoiceValue] = useState(1000);

  // ROI Calculations
  const monthlyRevenue = invoicesPerMonth * avgInvoiceValue;
  const paymentDelayDays = 30; // Average payment delay
  const dailyRevenue = monthlyRevenue / 30;
  const cashFlowLoss = dailyRevenue * paymentDelayDays;
  const paymentSpeedImprovement = cashFlowLoss * 0.66; // 3x faster = 66% improvement
  const annualSavings = paymentSpeedImprovement * 12;
  const proinvoiceCost = 19 * 12; // $19/month * 12 months
  const netROI = annualSavings - proinvoiceCost;
  const roiPercentage = ((netROI / proinvoiceCost) * 100).toFixed(0);

  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ProInvoice",
    "description": "Professional invoice and estimate software for contractors and service businesses",
    "brand": {
      "@type": "Brand",
      "name": "ProInvoice"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Plan",
        "price": "0",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://www.proinvoice.app/pricing"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "19",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://www.proinvoice.app/pricing",
        "billingIncrement": "P1M"
      }
    ]
  };

  return (
    <PageLayout
      title="Pricing - ProInvoice"
      description="Simple, transparent pricing for contractors and service businesses. 7-day free trial, no credit card required. Get paid faster with estimates and invoices."
      canonical="/pricing"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(pricingStructuredData)}
        </script>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get paid faster with professional estimates and invoices. Start your 7-day free trial today—no credit card required.
          </p>
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Calculate Your ROI</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div>
              <label className="block text-sm font-semibold mb-2">Invoices per month</label>
              <input
                type="range"
                min="10"
                max="500"
                value={invoicesPerMonth}
                onChange={(e) => setInvoicesPerMonth(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-2 text-lg font-bold text-primary">{invoicesPerMonth}</div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Average invoice value</label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={avgInvoiceValue}
                onChange={(e) => setAvgInvoiceValue(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-2 text-lg font-bold text-primary">${avgInvoiceValue.toLocaleString()}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">${(annualSavings / 1000).toFixed(1)}k</div>
                <div className="text-sm text-muted-foreground">Annual cash flow improvement</div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">20 days</div>
                <div className="text-sm text-muted-foreground">Faster payment collection</div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{roiPercentage}%</div>
                <div className="text-sm text-muted-foreground">Annual ROI</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* First Invoice Guarantee */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="font-semibold text-primary">First Invoice Guarantee</span>
            <Star className="w-5 h-5 text-primary fill-primary" />
          </div>
          <p className="text-foreground font-medium">
            If your first invoice doesn't send in 60 seconds, we'll comp your entire first month.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Free Plan */}
          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Free</CardTitle>
              <div className="text-4xl font-bold text-foreground">
                $0
                <span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">Perfect for trying out</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full" size="lg" variant="outline">
                <Link to="/get-started">Get Started Free</Link>
              </Button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>3 invoices per month</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Basic templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>PDF export with watermark</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Email support</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paid Plan */}
          <Card className="border-2 border-primary relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-4 py-1">
                MOST POPULAR
              </Badge>
            </div>
            <CardHeader className="text-center pb-4 pt-6">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="text-4xl font-bold text-foreground">
                $19
                <span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">Everything you need</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full" size="lg">
                <Link to="/get-started">Start 7-Day Free Trial</Link>
              </Button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Unlimited invoices & estimates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>No watermark</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Payment links (Stripe integration)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Online deposit collection</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Custom branding & logo</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>All industry templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Priority support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Program - Removed */}

        {/* ProInvoice vs Wave Value Comparison */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why ProInvoice Delivers Better Value</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-red-200">
              <CardHeader>
                <CardTitle className="text-lg">Wave</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg">✗</span>
                  <span className="text-sm">No estimates or deposit collection</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg">✗</span>
                  <span className="text-sm">Manual estimate-to-invoice workflow</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg">✗</span>
                  <span className="text-sm">Generic templates only</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg">✗</span>
                  <span className="text-sm">Focused on accounting, not payment speed</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-sm">Free accounting features</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50/30">
              <CardHeader>
                <CardTitle className="text-lg">ProInvoice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-sm font-semibold">Estimates + Deposit Collection</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-sm font-semibold">Auto-Convert Estimates to Invoices</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-sm font-semibold">25+ Industry-Specific Templates</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-sm font-semibold">Built for Payment Speed (3x faster)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-sm font-semibold">QR Code Payments</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is the 7-day free trial really free?</h3>
                <p className="text-muted-foreground">
                  Yes, absolutely. No credit card required to start your trial. You can create unlimited estimates and invoices during your trial period.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What payment methods do you accept for my subscription?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards through our secure Stripe payment system.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees. You'll retain access until the end of your current billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not satisfied within your first 30 days, we'll provide a full refund, no questions asked.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is my data secure?</h3>
                <p className="text-muted-foreground">
                  Absolutely. We use bank-level encryption, secure servers, and follow industry best practices. Your data is regularly backed up and never shared with third parties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Paid Faster?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of contractors and service businesses who use ProInvoice to streamline their billing and get paid faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/get-started">Start 7-Day Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/invoice-templates">View Templates</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Pricing;