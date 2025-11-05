import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, CheckCircle2 } from 'lucide-react';

const MultiDayProjectsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Managing Multi-Day Projects | ProInvoice Guide</title>
        <meta
          name="description"
          content="Best practices for managing, tracking, and billing multi-day construction and contractor projects."
        />
        <meta name="keywords" content="multi-day projects, project management, progress billing" />
        <link rel="canonical" href="https://www.proinvoice.app/guides/multi-day-projects" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Managing Multi-Day Projects',
            description: 'Best practices for managing multi-day contractor projects',
            author: { '@type': 'Organization', name: 'ProInvoice' },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero */}
        <section className="px-4 py-16 md:py-24 max-w-4xl mx-auto">
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Managing Multi-Day Projects
            </h1>
            <p className="text-xl text-slate-600">
              Best practices for tracking progress, managing cash flow, and billing customers on multi-day projects.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-16 max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">1. Break Projects Into Phases</h2>
            <p className="text-slate-600">
              Divide your project into clear phases. This makes it easier to track progress and bill customers.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
              <p className="font-bold text-blue-900">Example: Kitchen Remodel</p>
              <ul className="space-y-2 text-blue-800">
                <li>✓ Phase 1: Demolition & Prep (Day 1)</li>
                <li>✓ Phase 2: Framing & Rough-In (Days 2-3)</li>
                <li>✓ Phase 3: Electrical & Plumbing (Days 4-5)</li>
                <li>✓ Phase 4: Drywall & Finishing (Days 6-7)</li>
                <li>✓ Phase 5: Final Touches & Cleanup (Day 8)</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">2. Set Clear Expectations Upfront</h2>
            <p className="text-slate-600">
              Communicate the project timeline, daily schedule, and payment terms before starting work.
            </p>
            <div className="space-y-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What to Communicate</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>✓ Project start and end dates</p>
                  <p>✓ Daily work hours (e.g., 7am-4pm)</p>
                  <p>✓ Expected weather delays</p>
                  <p>✓ Payment schedule (deposit, progress payments, final)</p>
                  <p>✓ What happens if project gets delayed</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">3. Collect Deposits Before Starting</h2>
            <p className="text-slate-600">
              Always collect a deposit before starting work. This protects your cash flow and shows the customer is committed.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
              <p className="font-bold text-green-900">Recommended deposit amounts:</p>
              <ul className="space-y-2 text-green-800">
                <li>✓ 30% for standard projects</li>
                <li>✓ 50% for projects over $10,000</li>
                <li>✓ 50% for projects with uncertain scope</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">4. Track Daily Progress</h2>
            <p className="text-slate-600">
              Document what was completed each day. This helps you track progress and bill accurately.
            </p>
            <div className="bg-slate-50 border rounded-lg p-6">
              <p className="font-bold mb-4">Daily Progress Log Example:</p>
              <div className="space-y-4 text-sm">
                <div className="pb-4 border-b">
                  <p className="font-bold">Day 1 - Demolition & Prep</p>
                  <p className="text-slate-600">Removed old cabinets, flooring, and fixtures. Prepped walls for new work. 20% complete.</p>
                </div>
                <div className="pb-4 border-b">
                  <p className="font-bold">Day 2 - Framing</p>
                  <p className="text-slate-600">Built new wall frames and installed support beams. 40% complete.</p>
                </div>
                <div className="pb-4 border-b">
                  <p className="font-bold">Day 3 - Electrical & Plumbing</p>
                  <p className="text-slate-600">Ran electrical wiring and plumbing lines. 60% complete.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">5. Use Progress Billing</h2>
            <p className="text-slate-600">
              Bill customers as work progresses. This improves your cash flow and reduces risk.
            </p>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress Billing Example: $10,000 Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between pb-3 border-b">
                    <span>Deposit (30%)</span>
                    <span className="font-bold">$3,000</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b">
                    <span>Progress Invoice #1 (20% complete)</span>
                    <span className="font-bold">$2,000</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b">
                    <span>Progress Invoice #2 (40% complete)</span>
                    <span className="font-bold">$2,000</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b">
                    <span>Progress Invoice #3 (60% complete)</span>
                    <span className="font-bold">$2,000</span>
                  </div>
                  <div className="flex justify-between pt-3 bg-green-50 p-3 rounded">
                    <span className="font-bold">Total Collected Before Completion</span>
                    <span className="font-bold">$9,000</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">6. Handle Delays Professionally</h2>
            <p className="text-slate-600">
              Projects often get delayed. Have a plan for how you'll handle delays and communicate with customers.
            </p>
            <div className="space-y-3">
              <p className="text-slate-600">
                <strong>Common delays:</strong> Weather, material delays, unforeseen conditions, customer unavailability
              </p>
              <p className="text-slate-600">
                <strong>How to handle:</strong> Communicate immediately, provide updated timeline, adjust payment schedule if needed
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">7. Document Everything</h2>
            <p className="text-slate-600">
              Keep detailed records of all work completed, changes made, and payments received.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 space-y-3">
              <p className="font-bold text-yellow-900">What to document:</p>
              <ul className="space-y-2 text-yellow-800">
                <li>✓ Daily progress photos</li>
                <li>✓ Time logs for labor</li>
                <li>✓ Material receipts</li>
                <li>✓ Change orders</li>
                <li>✓ Customer communications</li>
                <li>✓ Payment receipts</li>
              </ul>
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
              <p>✓ Break projects into clear phases</p>
              <p>✓ Set expectations upfront</p>
              <p>✓ Collect deposits before starting</p>
              <p>✓ Track daily progress</p>
              <p>✓ Use progress billing to improve cash flow</p>
              <p>✓ Handle delays professionally</p>
              <p>✓ Document everything</p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
            <h2 className="text-3xl font-bold">Manage Multi-Day Projects Better</h2>
            <p className="text-lg text-slate-600">
              ProInvoice helps you track progress, manage deposits, and bill customers accurately.
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

export default MultiDayProjectsPage;

