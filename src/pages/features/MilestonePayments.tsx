import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react';

const MilestonePayments: React.FC = () => {
  return (
    <PageLayout
      title="Milestone Payments for Contractors | ProInvoice"
      description="Collect payments in stages as work progresses. Split invoices into deposit, midway, and final payments. Get paid faster with milestone-based billing."
      canonical="/features/milestone-payments"
    >
      <Helmet>
        <meta property="og:title" content="Milestone Payments for Contractors | ProInvoice" />
        <meta property="og:description" content="Collect payments in stages as work progresses. Get paid faster with milestone-based billing." />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ProInvoice - Milestone Payments',
            description: 'Milestone payment tracking for contractors',
            url: 'https://www.proinvoice.app/features/milestone-payments',
            applicationCategory: 'BusinessApplication',
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Get Paid in Stages, Not at the End
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Split payments across project milestones. Collect deposits upfront, progress payments as work completes, and final payment when done.
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

      {/* How It Works */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            How Milestone Payments Work
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent text-accent-foreground font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Create Estimate with Milestones</h3>
                <p className="text-muted-foreground">
                  Set up your estimate with milestone stages: 30% deposit, 40% midway, 30% final. Or customize your own split.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent text-accent-foreground font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Send to Client</h3>
                <p className="text-muted-foreground">
                  Share the estimate with your client. They see the milestone breakdown and payment schedule upfront.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent text-accent-foreground font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Collect Deposit</h3>
                <p className="text-muted-foreground">
                  Client pays the deposit directly from the estimate. You get paid before work starts.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent text-accent-foreground font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  As work progresses, mark milestones complete. Automatic reminders are sent for upcoming payments.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent text-accent-foreground font-bold">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Collect Final Payment</h3>
                <p className="text-muted-foreground">
                  When work is complete, collect the final payment. Your cash flow is protected throughout the project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Benefits of Milestone Payments
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Improved Cash Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get paid throughout the project instead of waiting until completion. Reduce financial stress and pay your team on time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  Reduced Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Collect deposits before starting work. If a project is abandoned, you're protected.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  Client Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Deposits create commitment. Clients are less likely to cancel or delay projects they've already paid for.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  Transparency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Clients see the payment schedule upfront. No surprises. Clear expectations build trust.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preset Templates */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Preset Milestone Templates
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>30/40/30 Split</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Deposit</span>
                    <span className="font-bold">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Midway</span>
                    <span className="font-bold">40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Final</span>
                    <span className="font-bold">30%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>50/50 Split</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Deposit</span>
                    <span className="font-bold">50%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Final</span>
                    <span className="font-bold">50%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>25/25/25/25 Split</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Phase 1</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Phase 2</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Phase 3</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Final</span>
                    <span className="font-bold">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Split</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create your own milestone split. Set any percentages and payment schedule that works for your business.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Start Collecting Milestone Payments Today
          </h2>
          <p className="text-lg opacity-90">
            Get paid throughout your projects, not just at the end.
          </p>
          <Link to="/auth">
            <Button size="lg" className="min-h-[48px] px-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default MilestonePayments;

