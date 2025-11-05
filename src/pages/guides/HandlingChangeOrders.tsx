import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, DollarSign } from 'lucide-react';

const HandlingChangeOrdersPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>How to Handle Change Orders | ProInvoice Guide</title>
        <meta
          name="description"
          content="Learn best practices for managing change orders and scope changes in your contracting business."
        />
        <meta name="keywords" content="change orders, scope management, contractor guide" />
        <link rel="canonical" href="https://www.proinvoice.app/guides/handling-change-orders" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Handle Change Orders',
            description: 'Best practices for managing change orders in contracting',
            author: { '@type': 'Organization', name: 'ProInvoice' },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero */}
        <section className="px-4 py-16 md:py-24 max-w-4xl mx-auto">
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              How to Handle Change Orders
            </h1>
            <p className="text-xl text-slate-600">
              Best practices for managing scope changes and protecting your profit margins.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-16 max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">1. Document Everything in Writing</h2>
            <p className="text-slate-600">
              The most important step is to document every change in writing. This protects both you and your customer.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
              <p className="font-bold text-blue-900">What to include in a change order:</p>
              <ul className="space-y-2 text-blue-800">
                <li>✓ Description of the change</li>
                <li>✓ Reason for the change (customer request, unforeseen condition, etc.)</li>
                <li>✓ Items being added or removed</li>
                <li>✓ Cost of the change</li>
                <li>✓ Impact on timeline</li>
                <li>✓ Customer signature/approval</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">2. Get Approval Before Starting Work</h2>
            <p className="text-slate-600">
              Never start work on a change order without written approval from the customer. This prevents disputes later.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 space-y-3">
              <p className="font-bold text-yellow-900">Approval process:</p>
              <ol className="space-y-2 text-yellow-800 list-decimal list-inside">
                <li>Create change order with detailed description and cost</li>
                <li>Send to customer for review</li>
                <li>Wait for written approval (email is fine)</li>
                <li>Only then start the additional work</li>
              </ol>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">3. Price Changes Accurately</h2>
            <p className="text-slate-600">
              Don't underestimate the cost of changes. Include all materials, labor, and overhead.
            </p>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Example: Adding Electrical Outlets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Materials (outlets, wire, boxes)</span>
                    <span className="font-bold">$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labor (2 hours @ $75/hr)</span>
                    <span className="font-bold">$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overhead (10%)</span>
                    <span className="font-bold">$20</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Total Change Order</span>
                    <span>$220</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">4. Track Changes Throughout the Project</h2>
            <p className="text-slate-600">
              Keep a running list of all changes. This helps you remember what was approved and what wasn't.
            </p>
            <div className="bg-slate-50 border rounded-lg p-6">
              <p className="font-bold mb-4">Change Order Log Example:</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <p className="font-bold">CO #1: Additional Outlets</p>
                    <p className="text-slate-600">Approved 3/15</p>
                  </div>
                  <p className="font-bold">+$220</p>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <p className="font-bold">CO #2: Upgrade to Smart Switches</p>
                    <p className="text-slate-600">Approved 3/18</p>
                  </div>
                  <p className="font-bold">+$300</p>
                </div>
                <div className="flex justify-between pt-3">
                  <p className="font-bold">Total Changes</p>
                  <p className="font-bold">+$520</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">5. Update Invoices Accurately</h2>
            <p className="text-slate-600">
              Make sure your final invoice reflects all approved changes. This prevents payment disputes.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
              <p className="font-bold text-green-900">Invoice checklist:</p>
              <ul className="space-y-2 text-green-800">
                <li>✓ Original estimate amount</li>
                <li>✓ All approved change orders</li>
                <li>✓ Updated total</li>
                <li>✓ Reference to change order numbers</li>
                <li>✓ Clear breakdown of what was added/removed</li>
              </ul>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">6. Communicate Proactively</h2>
            <p className="text-slate-600">
              Keep customers informed about changes and their impact on cost and timeline.
            </p>
            <div className="space-y-3">
              <p className="text-slate-600">
                <strong>Good communication:</strong> "I found additional damage behind the wall. This will require extra work. I'm sending you a change order for $500 to cover the additional labor and materials. Once you approve, I'll proceed."
              </p>
              <p className="text-slate-600">
                <strong>Poor communication:</strong> Doing extra work without telling the customer, then adding it to the final invoice.
              </p>
            </div>
          </div>

          {/* Key Takeaways */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-slate-700">
              <p>✓ Always document changes in writing</p>
              <p>✓ Get customer approval before starting work</p>
              <p>✓ Price changes accurately (include all costs)</p>
              <p>✓ Track all changes throughout the project</p>
              <p>✓ Update invoices to reflect all changes</p>
              <p>✓ Communicate proactively with customers</p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
            <h2 className="text-3xl font-bold">Manage Change Orders Like a Pro</h2>
            <p className="text-lg text-slate-600">
              ProInvoice makes it easy to create, track, and apply change orders to your estimates.
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

export default HandlingChangeOrdersPage;

