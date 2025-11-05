import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, DollarSign, AlertCircle } from 'lucide-react';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import RelatedLinks from '@/components/RelatedLinks';

/**
 * How to Get Paid Faster Guide
 * Best practices for accelerating payment collection
 */
const HowToGetPaidFaster: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>How to Get Paid Faster | ProInvoice</title>
        <meta name="description" content="Proven strategies to get paid faster as a contractor. Reduce payment delays and improve cash flow with these actionable tips." />
        <meta name="keywords" content="get paid faster, payment collection, contractor cash flow, invoice payment" />
        <link rel="canonical" href="https://www.proinvoice.app/guides/how-to-get-paid-faster" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Get Paid Faster',
            description: 'Proven strategies to get paid faster as a contractor',
            author: { '@type': 'Organization', name: 'ProInvoice' },
            datePublished: new Date().toISOString(),
          })}
        </script>
      </Helmet>

      <BreadcrumbNav />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Get Paid Faster</h1>
            <p className="text-xl text-gray-600">
              Proven strategies to accelerate payment collection and improve your cash flow
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Average Payment Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">45 days</p>
                <p className="text-sm text-gray-600">Industry average for contractors</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Potential Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">$5,000+</p>
                <p className="text-sm text-gray-600">Per year with faster payments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">87%</p>
                <p className="text-sm text-gray-600">Contractors who use deposits</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Strategy 1 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Collect Deposits Upfront</h2>
              <p className="text-gray-700 mb-4">
                The most effective way to get paid faster is to collect a deposit before starting work.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>30% deposit:</strong> Covers materials and initial labor</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>50/50 split:</strong> Half upfront, half on completion</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Multi-phase:</strong> 30% deposit, 40% midway, 30% completion</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded">
                💡 <strong>Pro Tip:</strong> Use ProInvoice's deposit collection feature to make it easy for clients to pay online.
              </p>
            </section>

            {/* Strategy 2 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Set Clear Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                Ambiguous payment terms lead to delays. Be explicit about when payment is due.
              </p>
              <div className="bg-gray-50 p-4 rounded mb-4 font-mono text-sm">
                <p>✓ "Payment due within 7 days of invoice"</p>
                <p>✓ "50% due upon signing, 50% upon completion"</p>
                <p>✗ "Payment due soon"</p>
                <p>✗ "Net 30" (too vague for contractors)</p>
              </div>
            </section>

            {/* Strategy 3 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Send Invoices Immediately</h2>
              <p className="text-gray-700 mb-4">
                The faster you invoice, the faster you get paid. Send invoices the same day work is completed.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Invoice on completion day</li>
                <li>✓ Include payment link for easy online payment</li>
                <li>✓ Send reminder after 7 days if unpaid</li>
                <li>✓ Follow up after 14 days with phone call</li>
              </ul>
            </section>

            {/* Strategy 4 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Offer Payment Incentives</h2>
              <p className="text-gray-700 mb-4">
                Small discounts can motivate faster payment.
              </p>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-semibold text-gray-900 mb-2">Example:</p>
                <p className="text-gray-700">Invoice total: $5,000</p>
                <p className="text-gray-700">Pay within 7 days: $4,900 (2% discount)</p>
                <p className="text-gray-700">Pay within 30 days: $5,000</p>
              </div>
            </section>

            {/* Strategy 5 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Use Online Payment Methods</h2>
              <p className="text-gray-700 mb-4">
                Make it easy for clients to pay. Offer multiple payment options.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Credit/debit card (Stripe)</li>
                <li>✓ Bank transfer (ACH)</li>
                <li>✓ Digital wallets (Apple Pay, Google Pay)</li>
                <li>✓ Payment links (send via email/text)</li>
              </ul>
            </section>

            {/* Action Items */}
            <section className="bg-blue-50 rounded-lg p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Action Items This Week</h2>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <span className="text-gray-700">Review your current payment terms and update to be more specific</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <span className="text-gray-700">Start collecting 30% deposits on all new projects</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span className="text-gray-700">Set up automatic payment reminders for unpaid invoices</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">4.</span>
                  <span className="text-gray-700">Test your online payment system with a test invoice</span>
                </li>
              </ol>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Paid Faster?</h3>
              <p className="mb-6 text-blue-100">
                ProInvoice makes it easy to collect deposits and send payment reminders automatically.
              </p>
              <Link
                to="/get-started"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>

      <RelatedLinks currentPage="/guides/how-to-get-paid-faster" />
    </>
  );
};

export default HowToGetPaidFaster;

