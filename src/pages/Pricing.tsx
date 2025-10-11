import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Pricing = () => {
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