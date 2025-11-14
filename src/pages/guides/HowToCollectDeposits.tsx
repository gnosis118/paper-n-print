import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CheckCircle, TrendingUp, Shield } from 'lucide-react';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import RelatedLinks from '@/components/RelatedLinks';

/**
 * How to Collect Deposits Guide
 * Best practices for deposit collection
 */
const HowToCollectDeposits: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>How to Collect Deposits | ProInvoice</title>
        <meta name="description" content="Master deposit collection as a contractor. Learn deposit percentages, timing, and strategies to improve cash flow." />
        <meta name="keywords" content="collect deposits, contractor deposits, payment collection, cash flow" />
        <link rel="canonical" href="https://www.proinvoice.app/guides/how-to-collect-deposits" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Collect Deposits',
            description: 'Best practices for deposit collection and cash flow management',
            author: { '@type': 'Organization', name: 'ProInvoice' },
            datePublished: new Date().toISOString(),
          })}
        </script>
      </Helmet>

      <BreadcrumbNav />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Collect Deposits</h1>
            <p className="text-xl text-gray-600">
              Master deposit collection to improve cash flow and reduce financial risk
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Cash Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">+40%</p>
                <p className="text-sm text-gray-600">Improvement with deposits</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Risk Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">-75%</p>
                <p className="text-sm text-gray-600">Bad debt exposure</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Commitment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">+85%</p>
                <p className="text-sm text-gray-600">Project completion rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Deposit Percentages */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Deposit Percentages</h2>
              <p className="text-gray-700 mb-6">
                The right deposit percentage depends on your project size and industry. Here are industry standards:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-semibold text-gray-900">Small Projects ($500-$2,000)</h3>
                  <p className="text-gray-700">50% deposit recommended</p>
                  <p className="text-sm text-gray-600">Covers materials and initial labor</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-gray-900">Medium Projects ($2,000-$10,000)</h3>
                  <p className="text-gray-700">30-40% deposit recommended</p>
                  <p className="text-sm text-gray-600">Balances cash flow with client comfort</p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="font-semibold text-gray-900">Large Projects ($10,000+)</h3>
                  <p className="text-gray-700">25-30% deposit + milestone payments</p>
                  <p className="text-sm text-gray-600">Multi-phase approach for long projects</p>
                </div>
              </div>
            </section>

            {/* Deposit Strategies */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Deposit Collection Strategies</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-900 mb-2">Strategy 1: Single Deposit</h3>
                  <p className="text-gray-700 text-sm">Collect 30-50% upfront, remainder on completion</p>
                  <p className="text-gray-600 text-sm mt-2">Best for: Quick projects (1-3 days)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-900 mb-2">Strategy 2: 50/50 Split</h3>
                  <p className="text-gray-700 text-sm">50% upfront, 50% on completion</p>
                  <p className="text-gray-600 text-sm mt-2">Best for: Medium projects (3-7 days)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-gray-900 mb-2">Strategy 3: Multi-Phase (30/40/30)</h3>
                  <p className="text-gray-700 text-sm">30% deposit, 40% midway, 30% completion</p>
                  <p className="text-gray-600 text-sm mt-2">Best for: Long projects (1-4 weeks)</p>
                </div>
              </div>
            </section>

            {/* How to Ask */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Ask for a Deposit</h2>
              <p className="text-gray-700 mb-4">
                Many contractors worry about asking for deposits. Here's how to do it professionally:
              </p>
              <div className="bg-blue-50 p-4 rounded space-y-3">
                <p className="font-semibold text-gray-900">Sample Deposit Request:</p>
                <p className="text-sm text-gray-700">
                  "To get started on your project, I require a 30% deposit to cover materials and scheduling. This is standard in the industry and ensures we can begin work promptly. The remaining balance is due upon completion."
                </p>
              </div>
            </section>

            {/* Making it Easy */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Make Deposits Easy to Pay</h2>
              <p className="text-gray-700 mb-4">
                The easier you make it to pay, the faster you'll collect deposits.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Send payment link via email</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Accept credit cards (not just checks)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Offer ACH/bank transfer option</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Include deposit amount in estimate</span>
                </li>
              </ul>
            </section>

            {/* Action Items */}
            <section className="bg-green-50 rounded-lg p-8 border border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Action Items This Week</h2>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-green-600">1.</span>
                  <span className="text-gray-700">Decide on your deposit percentage (30%, 50%, or multi-phase)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-green-600">2.</span>
                  <span className="text-gray-700">Update your estimate template to include deposit amount</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-green-600">3.</span>
                  <span className="text-gray-700">Set up online payment method (Stripe for cards and bank transfers)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-green-600">4.</span>
                  <span className="text-gray-700">Send deposit request to your next 3 clients</span>
                </li>
              </ol>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Start Collecting Deposits Today</h3>
              <p className="mb-6 text-green-100">
                ProInvoice makes it easy to request and collect deposits with professional estimates.
              </p>
              <Link
                to="/get-started"
                className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>

      <RelatedLinks currentPage="/guides/how-to-collect-deposits" />
    </>
  );
};

export default HowToCollectDeposits;

