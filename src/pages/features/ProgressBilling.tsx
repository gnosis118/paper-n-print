import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, CheckCircle2, DollarSign, Zap } from 'lucide-react';

const ProgressBillingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Progress Billing for Multi-Day Projects | ProInvoice</title>
        <meta
          name="description"
          content="Bill customers as work progresses. Track project completion and send invoices automatically with ProInvoice's progress billing."
        />
        <meta name="keywords" content="progress billing, milestone billing, project tracking" />
        <link rel="canonical" href="https://www.proinvoice.app/features/progress-billing" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ProInvoice - Progress Billing',
            description: 'Progress billing for multi-day projects',
            applicationCategory: 'BusinessApplication',
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero */}
        <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Progress Billing for Multi-Day Projects
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Bill customers as work progresses. Track completion and collect payment throughout the project.
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
            <h2 className="text-2xl font-bold text-red-900 mb-6">Multi-Day Project Challenges</h2>
            <div className="space-y-4 text-red-800">
              <p>
                • You complete work over multiple days but don't get paid until the end
              </p>
              <p>
                • Customers see the full invoice amount and may dispute it
              </p>
              <p>
                • You can't track daily progress or completion percentage
              </p>
              <p>
                • No way to bill for work completed on Day 1 before Day 5 is done
              </p>
              <p>
                • If a project gets cancelled mid-way, you lose payment for completed work
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How Progress Billing Works</h2>

            {/* Step-by-Step */}
            <div className="space-y-6 mb-12">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Daily Progress</h3>
                  <p className="text-slate-600">
                    Log work completion percentage each day. Describe what was accomplished.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Calculate Billable Amount</h3>
                  <p className="text-slate-600">
                    ProInvoice calculates how much to bill based on completion percentage.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Send Progress Invoice</h3>
                  <p className="text-slate-600">
                    Send invoice for completed work. Customer pays for what's done so far.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Continue Until Complete</h3>
                  <p className="text-slate-600">
                    Repeat daily or weekly until project is 100% complete. Final invoice covers remaining balance.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Improve Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Get paid throughout the project instead of waiting until completion.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle2 className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Reduce Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    If a project gets cancelled, you've already been paid for completed work.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Track Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Visual progress tracking shows customers exactly what's been completed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-yellow-600 mb-2" />
                  <CardTitle>Reduce Disputes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Clear documentation of daily progress prevents disagreements about what was done.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Example */}
        <section className="px-4 py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Real Example: 5-Day Renovation</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 border">
                <div className="flex justify-between items-start pb-4 border-b">
                  <div>
                    <p className="font-bold">Day 1: Demolition & Prep</p>
                    <p className="text-sm text-slate-600">20% complete</p>
                  </div>
                  <p className="font-bold">$2,000</p>
                </div>

                <div className="flex justify-between items-start pb-4 border-b">
                  <div>
                    <p className="font-bold">Day 2: Framing</p>
                    <p className="text-sm text-slate-600">40% complete</p>
                  </div>
                  <p className="font-bold">$2,000</p>
                </div>

                <div className="flex justify-between items-start pb-4 border-b">
                  <div>
                    <p className="font-bold">Day 3: Electrical & Plumbing</p>
                    <p className="text-sm text-slate-600">60% complete</p>
                  </div>
                  <p className="font-bold">$2,000</p>
                </div>

                <div className="flex justify-between items-start pb-4 border-b">
                  <div>
                    <p className="font-bold">Day 4: Drywall & Finishing</p>
                    <p className="text-sm text-slate-600">80% complete</p>
                  </div>
                  <p className="font-bold">$2,000</p>
                </div>

                <div className="flex justify-between items-start pt-4 bg-green-50 p-4 rounded">
                  <div>
                    <p className="font-bold">Day 5: Final Touches</p>
                    <p className="text-sm text-slate-600">100% complete</p>
                  </div>
                  <p className="font-bold">$2,000</p>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-slate-600">
                    Total Project: $10,000 | Paid throughout project instead of waiting until end
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
            <h2 className="text-3xl font-bold">Get Paid Throughout Your Projects</h2>
            <p className="text-lg text-slate-600">
              Stop waiting until project completion. Start collecting progress payments today.
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

export default ProgressBillingPage;

