import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react';

const ChangeOrderManagementPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Change Order Management | ProInvoice</title>
        <meta
          name="description"
          content="Manage scope changes and modifications with ProInvoice's change order system. Track changes, get approvals, and auto-update estimates."
        />
        <meta name="keywords" content="change orders, scope management, estimate modifications" />
        <link rel="canonical" href="https://www.proinvoice.app/features/change-order-management" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ProInvoice - Change Order Management',
            description: 'Professional change order management for contractors',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: '0',
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero */}
        <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Change Order Management
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Handle scope changes professionally. Track modifications, get approvals, and automatically update estimates and invoices.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="min-h-[48px]">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </section>

        {/* Problem Section */}
        <section className="px-4 py-16 bg-red-50 border-y border-red-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-red-900 mb-6">The Problem with Scope Creep</h2>
            <div className="space-y-4 text-red-800">
              <p>
                • Customers request additional work mid-project without formal documentation
              </p>
              <p>
                • You manually update estimates and lose track of what was originally quoted
              </p>
              <p>
                • Disputes arise about what was included in the original estimate
              </p>
              <p>
                • You end up doing extra work without getting paid for it
              </p>
              <p>
                • Invoices don't reflect the actual work completed
              </p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How Change Orders Work</h2>

            {/* Step-by-Step */}
            <div className="space-y-6 mb-12">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Customer Requests Change</h3>
                  <p className="text-slate-600">
                    Customer asks for additional work or modifications during the project.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Create Change Order</h3>
                  <p className="text-slate-600">
                    Document the change with description, items, and cost. ProInvoice calculates the impact on the total.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Get Approval</h3>
                  <p className="text-slate-600">
                    Send change order to customer for approval. Track approval status and dates.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Apply to Estimate</h3>
                  <p className="text-slate-600">
                    Once approved, apply the change order. Estimate total, deposit amount, and invoice automatically update.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CheckCircle2 className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Protect Your Margins</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Document every change and get paid for additional work. No more free scope creep.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <AlertCircle className="h-8 w-8 text-yellow-600 mb-2" />
                  <CardTitle>Avoid Disputes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Clear documentation of what was originally quoted vs. what was added prevents disagreements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Accurate Invoicing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Invoices automatically reflect all approved changes. No manual updates needed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <ArrowRight className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Streamlined Workflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Track change order history and see exactly what was modified and when.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Example */}
        <section className="px-4 py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Real Example</h2>
            <div className="space-y-4 bg-white rounded-lg p-6 border">
              <div className="flex justify-between items-start pb-4 border-b">
                <div>
                  <p className="font-bold">Original Estimate</p>
                  <p className="text-sm text-slate-600">Electrical rewiring - 3 rooms</p>
                </div>
                <p className="font-bold">$2,500</p>
              </div>

              <div className="flex justify-between items-start pb-4 border-b">
                <div>
                  <p className="font-bold">Change Order #1</p>
                  <p className="text-sm text-slate-600">Add 2 additional outlets per room</p>
                </div>
                <p className="font-bold text-green-600">+$450</p>
              </div>

              <div className="flex justify-between items-start pb-4 border-b">
                <div>
                  <p className="font-bold">Change Order #2</p>
                  <p className="text-sm text-slate-600">Upgrade to smart switches</p>
                </div>
                <p className="font-bold text-green-600">+$300</p>
              </div>

              <div className="flex justify-between items-start pt-4 bg-blue-50 p-4 rounded">
                <p className="font-bold">New Total</p>
                <p className="font-bold text-lg">$3,250</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
            <h2 className="text-3xl font-bold">Stop Losing Money to Scope Creep</h2>
            <p className="text-lg text-slate-600">
              ProInvoice's change order system helps you document, approve, and get paid for every change.
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

export default ChangeOrderManagementPage;

