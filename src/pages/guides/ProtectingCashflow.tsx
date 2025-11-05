import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, AlertCircle } from 'lucide-react';

const ProtectingCashflow: React.FC = () => {
  return (
    <PageLayout
      title="Guide: Protecting Your Contractor Cashflow | ProInvoice"
      description="Learn how to protect your business cashflow as a contractor. Collect deposits, manage payment schedules, and avoid cash flow crises."
      canonical="/guides/protecting-cashflow"
    >
      <Helmet>
        <meta property="og:title" content="Guide: Protecting Your Contractor Cashflow | ProInvoice" />
        <meta property="og:description" content="Learn how to protect your business cashflow as a contractor." />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Guide: Protecting Your Contractor Cashflow',
            description: 'Learn how to protect your business cashflow as a contractor',
            url: 'https://www.proinvoice.app/guides/protecting-cashflow',
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Protecting Your Contractor Cashflow
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A practical guide to collecting deposits, managing payment schedules, and avoiding cash flow crises.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl space-y-12">
          {/* Problem */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">The Problem: Contractor Cashflow Crisis</h2>
            <Card className="border-l-4 border-l-accent">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  You complete a $10,000 roofing job on Monday. Your client says they'll pay in 30 days. But you need to pay your crew on Friday. You need materials for the next job. Your business credit card is maxed out.
                </p>
                <p className="text-muted-foreground">
                  This is the reality for many contractors. You're doing the work, but waiting 30-60 days for payment while your expenses are due immediately.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Solution 1 */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Solution 1: Collect Deposits Upfront</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                The simplest way to protect your cashflow is to collect a deposit before starting work.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why Deposits Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <p className="text-muted-foreground">You have cash before expenses</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <p className="text-muted-foreground">Clients are committed to the project</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <p className="text-muted-foreground">You're protected if they cancel</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <p className="text-muted-foreground">Industry standard (most clients expect it)</p>
                  </div>
                </CardContent>
              </Card>
              <p className="text-muted-foreground">
                <strong>Recommended deposit:</strong> 30-50% of the project total. This covers your materials and labor costs.
              </p>
            </div>
          </div>

          {/* Solution 2 */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Solution 2: Use Milestone Payments</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                For larger projects, break payments into milestones tied to project completion.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Example: $30,000 Kitchen Remodel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Deposit (materials)</span>
                    <span className="font-bold">$9,000 (30%)</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Midway (framing complete)</span>
                    <span className="font-bold">$12,000 (40%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Final (project complete)</span>
                    <span className="font-bold">$9,000 (30%)</span>
                  </div>
                </CardContent>
              </Card>
              <p className="text-muted-foreground">
                This way, you get paid as work progresses. You're never waiting 60 days for the full amount.
              </p>
            </div>
          </div>

          {/* Solution 3 */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Solution 3: Set Clear Payment Terms</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Be explicit about when payments are due. Include this in your estimate and contract.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Example Payment Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    "Payment is due as follows: 30% deposit due upon estimate approval, 40% due when framing is complete, 30% due upon project completion. Invoices are due within 7 days of receipt."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Solution 4 */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Solution 4: Send Payment Reminders</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Don't wait passively for payment. Send reminders automatically.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reminder Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-accent font-bold">Day 1:</span>
                    <p className="text-muted-foreground">Send invoice immediately after work completion</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent font-bold">Day 3:</span>
                    <p className="text-muted-foreground">Send friendly reminder</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent font-bold">Day 7:</span>
                    <p className="text-muted-foreground">Send second reminder with payment link</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent font-bold">Day 14:</span>
                    <p className="text-muted-foreground">Send final reminder (more firm tone)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Takeaways */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Key Takeaways</h2>
            <Card className="bg-accent/5 border-accent">
              <CardContent className="pt-6 space-y-3">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">
                    <strong>Collect deposits.</strong> 30-50% upfront is standard and protects your cashflow.
                  </p>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">
                    <strong>Use milestone payments.</strong> For large projects, break payments into stages.
                  </p>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">
                    <strong>Set clear terms.</strong> Include payment schedule in your estimate and contract.
                  </p>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">
                    <strong>Send reminders.</strong> Don't wait passively. Automate payment reminders.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4 pt-8">
            <h3 className="text-2xl font-bold text-foreground">
              Ready to Protect Your Cashflow?
            </h3>
            <p className="text-muted-foreground">
              ProInvoice makes it easy to collect deposits, set up milestone payments, and send automatic reminders.
            </p>
            <Link to="/auth">
              <Button size="lg" className="min-h-[48px] px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProtectingCashflow;

