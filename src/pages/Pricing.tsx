import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <PageLayout
      title="Pricing - ProInvoice"
      description="Simple, transparent pricing for contractors and service businesses. 7-day free trial, no credit card required. Get paid faster with estimates and invoices."
      canonical="/pricing"
    >
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
          {/* Monthly Plan */}
          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Monthly</CardTitle>
              <div className="text-4xl font-bold text-foreground">
                $19
                <span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">Perfect for getting started</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full" size="lg">
                <Link to="/get-started">Start 7-Day Free Trial</Link>
              </Button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Unlimited estimates & invoices</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Online deposit collection</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Auto-convert estimates to invoices</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>QR code payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Stripe, ACH, Apple Pay, Google Pay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Industry-specific templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Mobile-optimized</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Email support</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Annual Plan */}
          <Card className="border-2 border-primary relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-4 py-1">
                2 MONTHS FREE
              </Badge>
            </div>
            <CardHeader className="text-center pb-4 pt-6">
              <CardTitle className="text-2xl">Annual</CardTitle>
              <div className="text-4xl font-bold text-foreground">
                $15
                <span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Billed annually ($180/year)
              </div>
              <div className="text-sm text-green-600 font-medium">
                Save $68 vs monthly
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full" size="lg">
                <Link to="/get-started">Start 7-Day Free Trial</Link>
              </Button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Everything in Monthly</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Advanced analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Custom branding</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Program */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="text-center p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Referral Rewards</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              Refer 3 friends who sign up and get 1 month completely free!
            </p>
            <p className="text-sm text-muted-foreground">
              Available in your account dashboard after signup. Track referrals and claim rewards easily.
            </p>
          </CardContent>
        </Card>

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
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We support all major credit cards, ACH bank transfers, Apple Pay, and Google Pay through our Stripe integration. Your customers can pay however they prefer.
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
              <Link to="/templates">View Templates</Link>
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