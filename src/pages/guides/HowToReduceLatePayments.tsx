import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, TrendingDown, Clock, MessageSquare } from 'lucide-react';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import RelatedLinks from '@/components/RelatedLinks';

/**
 * How to Reduce Late Payments Guide
 * Strategies to minimize overdue invoices
 */
const HowToReduceLatePayments: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>How to Reduce Late Payments | ProInvoice</title>
        <meta name="description" content="Reduce late payments and overdue invoices with proven strategies. Improve cash flow and client relationships." />
        <meta name="keywords" content="late payments, overdue invoices, payment collection, contractor cash flow" />
        <link rel="canonical" href="https://www.proinvoice.app/guides/how-to-reduce-late-payments" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Reduce Late Payments',
            description: 'Strategies to minimize overdue invoices and improve cash flow',
            author: { '@type': 'Organization', name: 'ProInvoice' },
            datePublished: new Date().toISOString(),
          })}
        </script>
      </Helmet>

      <BreadcrumbNav />

      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Reduce Late Payments</h1>
            <p className="text-xl text-gray-600">
              Proven strategies to minimize overdue invoices and improve your cash flow
            </p>
          </div>

          {/* Problem Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <AlertCircle className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Late Payment Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">43%</p>
                <p className="text-sm text-gray-600">Of invoices paid late</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Average Delay</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">23 days</p>
                <p className="text-sm text-gray-600">Beyond due date</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingDown className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">$8,000+</p>
                <p className="text-sm text-gray-600">Lost annually per contractor</p>
              </CardContent>
            </Card>
          </div>

          {/* Strategies */}
          <div className="space-y-8">
            {/* Strategy 1 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Send Reminders Automatically</h2>
              <p className="text-gray-700 mb-4">
                Don't wait for clients to remember. Send automatic reminders at key intervals.
              </p>
              <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
                <p><strong>Day 1:</strong> Invoice sent</p>
                <p><strong>Day 7:</strong> Friendly reminder (if unpaid)</p>
                <p><strong>Day 14:</strong> Second reminder with payment link</p>
                <p><strong>Day 21:</strong> Final notice before late fees</p>
              </div>
            </section>

            {/* Strategy 2 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Implement Late Fees</h2>
              <p className="text-gray-700 mb-4">
                A small late fee incentivizes on-time payment and compensates for delays.
              </p>
              <div className="bg-yellow-50 p-4 rounded">
                <p className="font-semibold text-gray-900 mb-2">Example Late Fee Structure:</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• 1.5% monthly interest on overdue balance</li>
                  <li>• $25 late fee after 30 days</li>
                  <li>• 2% late fee after 45 days</li>
                </ul>
              </div>
            </section>

            {/* Strategy 3 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Make Payment Easy</h2>
              <p className="text-gray-700 mb-4">
                Friction in the payment process leads to delays. Remove barriers.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Include payment link in invoice</li>
                <li>✓ Accept credit cards (not just checks)</li>
                <li>✓ Offer ACH/bank transfer option</li>
                <li>✓ Send payment reminders via text/email</li>
              </ul>
            </section>

            {/* Strategy 4 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Communicate Proactively</h2>
              <p className="text-gray-700 mb-4">
                Don't be shy about following up. Most late payments are due to forgetfulness, not inability to pay.
              </p>
              <div className="bg-blue-50 p-4 rounded space-y-3">
                <p className="font-semibold text-gray-900">Sample Follow-Up Messages:</p>
                <p className="text-sm text-gray-700">
                  <strong>Day 7:</strong> "Hi [Client], just checking in on invoice #123. Let me know if you have any questions!"
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Day 14:</strong> "Hi [Client], invoice #123 is now 2 weeks overdue. Can we schedule a payment?"
                </p>
              </div>
            </section>

            {/* Strategy 5 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Screen Clients Upfront</h2>
              <p className="text-gray-700 mb-4">
                Identify high-risk clients before they become problems.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Check references from previous contractors</li>
                <li>✓ Require deposits for first-time clients</li>
                <li>✓ Ask about payment history upfront</li>
                <li>✓ Require signed contract with payment terms</li>
              </ul>
            </section>

            {/* Action Items */}
            <section className="bg-red-50 rounded-lg p-8 border border-red-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Action Items This Week</h2>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">1.</span>
                  <span className="text-gray-700">Set up automatic payment reminders for all unpaid invoices</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">2.</span>
                  <span className="text-gray-700">Add late fee policy to your invoice template</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">3.</span>
                  <span className="text-gray-700">Review your top 5 overdue invoices and follow up today</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-red-600">4.</span>
                  <span className="text-gray-700">Update your contract template with clear payment terms</span>
                </li>
              </ol>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Stop Chasing Late Payments</h3>
              <p className="mb-6 text-red-100">
                ProInvoice automates reminders and makes it easy for clients to pay on time.
              </p>
              <Link
                to="/get-started"
                className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>

      <RelatedLinks currentPage="/guides/how-to-reduce-late-payments" />
    </>
  );
};

export default HowToReduceLatePayments;

