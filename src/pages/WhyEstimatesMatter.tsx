import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ArrowRight, TrendingUp, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyEstimatesMatter = () => {
  return (
    <PageLayout
      title="Why Estimates Matter - ProInvoice"
      description="Learn how professional estimates help you win more business, collect deposits upfront, and get paid faster. The complete guide to estimate-based billing."
      canonical="/why-estimates-matter"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Why Estimates Are Your Secret Weapon
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional estimates aren't just paperwork—they're your most powerful tool for winning business, collecting deposits, and getting paid faster.
          </p>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Win More Business</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Professional estimates show clients you're serious and organized. They increase close rates by 40% compared to verbal quotes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Collect Deposits Upfront</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Send an estimate with a payment link. Collect 25-50% deposits before you start work. Reduce financial risk immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Get Paid Faster</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Auto-convert accepted estimates to invoices. Clients already know the price. Payment happens 3x faster.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* The Problem Section */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-12">
          <div className="flex gap-4 items-start">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-4">The Problem Without Estimates</h2>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start gap-3">
                  <span className="font-bold">✗</span>
                  <span>Clients shop around after you quote verbally</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">✗</span>
                  <span>No deposit collected = you finance the work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">✗</span>
                  <span>Scope creep when there's no written agreement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">✗</span>
                  <span>Clients dispute invoice amounts later</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">✗</span>
                  <span>Manual conversion to invoice = delays and errors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Solution Section */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-6">The ProInvoice Solution</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Professional Estimates</h3>
                <p className="text-green-800">Send beautiful, branded estimates that look like you mean business. Clients take you seriously.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Embedded Payment Links</h3>
                <p className="text-green-800">Collect deposits directly from the estimate. No separate invoice needed. Get paid in 2 clicks.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Auto-Convert to Invoice</h3>
                <p className="text-green-800">When estimate is accepted, one-click conversion to invoice. No manual data entry. No delays.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Scope Protection</h3>
                <p className="text-green-800">Written estimate = clear scope. Reduces disputes and scope creep. Protects your margins.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Industry-Specific Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Estimates by Industry</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Construction & Trades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Collect deposits before materials purchase</p>
                <p>• Protect against scope creep on large projects</p>
                <p>• Get paid for change orders immediately</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Businesses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Win more clients with professional quotes</p>
                <p>• Collect deposits before service delivery</p>
                <p>• Reduce payment disputes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consulting & Design</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Set clear project scope upfront</p>
                <p>• Collect retainers before starting work</p>
                <p>• Track project profitability accurately</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance & Repairs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Send estimates on-site via mobile</p>
                <p>• Collect payment immediately with QR codes</p>
                <p>• Reduce follow-up calls</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Start Using Estimates Today</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            ProInvoice makes it easy to create professional estimates, collect deposits, and get paid faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/get-started">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/estimate-templates">View Estimate Templates</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default WhyEstimatesMatter;

