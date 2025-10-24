import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DepositCollectionGuide = () => {
  return (
    <PageLayout
      title="Deposit Collection Guide - ProInvoice"
      description="Complete guide to collecting deposits upfront. Learn best practices, deposit percentages by industry, and how to use ProInvoice for instant deposit collection."
      canonical="/deposit-collection-guide"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            The Complete Deposit Collection Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Collect deposits upfront, reduce financial risk, and improve cash flow. Learn the best practices used by successful contractors and service businesses.
          </p>
        </div>

        {/* Why Deposits Matter */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Why Deposits Matter</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <DollarSign className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Reduce Financial Risk</h3>
                <p className="text-blue-800">If a client cancels, you've already been paid for your time and materials.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Improve Cash Flow</h3>
                <p className="text-blue-800">Get paid before you start work. No waiting 30-60 days for payment.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Increase Commitment</h3>
                <p className="text-blue-800">Clients who pay deposits are more committed to the project.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Reduce Cancellations</h3>
                <p className="text-blue-800">Deposits reduce no-shows and last-minute cancellations by 70%.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deposit Percentages by Industry */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Recommended Deposit Percentages</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Construction & Trades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Small projects (&lt;$5k)</span>
                  <span className="font-bold text-primary">25-33%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Medium projects ($5-20k)</span>
                  <span className="font-bold text-primary">33-50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Large projects (&gt;$20k)</span>
                  <span className="font-bold text-primary">50%+</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Businesses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Consulting</span>
                  <span className="font-bold text-primary">50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Design/Creative</span>
                  <span className="font-bold text-primary">50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Maintenance</span>
                  <span className="font-bold text-primary">25-33%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Deposit Collection Best Practices</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. Be Clear & Professional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Include deposit requirements in your estimate. Make it clear, professional, and non-negotiable. Clients expect it.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. Make Payment Easy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Include a payment link in your estimate. One-click payment. The easier you make it, the faster you get paid.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3. Explain the Benefit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tell clients why you need a deposit: "This secures your project date and allows us to order materials immediately."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">4. Apply to Final Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Always apply the deposit to the final invoice. Show the calculation clearly: Total - Deposit = Amount Due.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">5. Use ProInvoice's Auto-Convert</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When estimate is accepted and deposit collected, auto-convert to invoice. The deposit is already applied. No confusion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Real Numbers */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-6">Real Impact: Deposits in Action</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">70%</div>
              <p className="text-green-800">Reduction in cancellations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">3x</div>
              <p className="text-green-800">Faster payment collection</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$50k+</div>
              <p className="text-green-800">Annual cash flow improvement</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Start Collecting Deposits Today</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            ProInvoice makes it easy to send estimates with payment links and collect deposits instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/get-started">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/why-estimates-matter">Learn About Estimates</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DepositCollectionGuide;

