import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, TrendingUp, Clock, Shield } from 'lucide-react';

const DepositCollectionPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Deposit Collection for Contractors | ProInvoice</title>
        <meta
          name="description"
          content="Collect deposits before starting work. Improve cash flow with ProInvoice's secure deposit collection system."
        />
        <meta name="keywords" content="deposit collection, advance payment, contractor payments" />
        <link rel="canonical" href="https://www.proinvoice.app/features/deposit-collection" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ProInvoice - Deposit Collection',
            description: 'Secure deposit collection for contractors',
            applicationCategory: 'BusinessApplication',
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero */}
        <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Collect Deposits Before You Start
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get paid upfront with secure deposit collection. Improve cash flow and reduce payment risk.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="min-h-[48px]">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </section>

        {/* Problem */}
        <section className="px-4 py-16 bg-red-50 border-y border-red-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-red-900 mb-6">The Cash Flow Problem</h2>
            <div className="space-y-4 text-red-800">
              <p>
                • You buy materials and pay labor before the customer pays you
              </p>
              <p>
                • Some customers disappear after work is done
              </p>
              <p>
                • You're financing your customers' projects
              </p>
              <p>
                • Late payments disrupt your ability to take on new jobs
              </p>
              <p>
                • You're stressed about cash flow every month
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How Deposit Collection Works</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Flexible Deposit Options</h3>
                <p className="text-slate-600">
                  Choose the deposit percentage that works for your business:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>✓ 30% deposit (standard)</li>
                  <li>✓ 50/50 split (deposit + final)</li>
                  <li>✓ 30/40/30 split (3-phase projects)</li>
                  <li>✓ 25/25/25/25 split (4-phase projects)</li>
                  <li>✓ Custom percentages</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Secure Payment Processing</h3>
                <p className="text-slate-600">
                  Powered by Stripe, the most trusted payment processor:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>✓ PCI-DSS compliant</li>
                  <li>✓ Fraud protection</li>
                  <li>✓ Multiple payment methods</li>
                  <li>✓ Instant settlement</li>
                  <li>✓ Transparent fees</li>
                </ul>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Improve Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Get paid before you start work. Use deposits to buy materials and pay labor.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Reduce Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Deposits reduce the risk of customers not paying after work is complete.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Save Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Automated payment processing and invoicing saves hours of admin work.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CreditCard className="h-8 w-8 text-yellow-600 mb-2" />
                  <CardTitle>Professional Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Professional estimates with secure payment links look more credible to customers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ROI */}
        <section className="px-4 py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Real Impact</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border">
                <p className="font-bold mb-2">Example: $10,000 Kitchen Remodel</p>
                <div className="space-y-3 text-slate-600">
                  <div className="flex justify-between">
                    <span>Without Deposit Collection:</span>
                    <span className="font-bold">You finance $10,000 for 30 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>With 30% Deposit:</span>
                    <span className="font-bold">You finance only $7,000 for 30 days</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-bold">
                    <span>Savings:</span>
                    <span>$3,000 less financing needed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border">
                <p className="font-bold mb-2">Monthly Impact (5 jobs/month at $10,000 each)</p>
                <div className="space-y-3 text-slate-600">
                  <div className="flex justify-between">
                    <span>Total Project Value:</span>
                    <span className="font-bold">$50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deposits Collected (30%):</span>
                    <span className="font-bold text-green-600">$15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount You Finance:</span>
                    <span className="font-bold">$35,000 (vs $50,000)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
            <h2 className="text-3xl font-bold">Stop Financing Your Customers</h2>
            <p className="text-lg text-slate-600">
              Start collecting deposits today and improve your cash flow immediately.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="min-h-[48px]">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default DepositCollectionPage;

