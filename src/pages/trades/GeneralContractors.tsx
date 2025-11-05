import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const GeneralContractors: React.FC = () => {
  return (
    <PageLayout
      title="General Contractor Invoicing & Estimates | ProInvoice"
      description="Professional estimate and invoice software for general contractors. Manage multi-phase projects, collect deposits, and track progress billing. Free to start."
      canonical="/general-contractors"
    >
      <Helmet>
        <meta property="og:title" content="General Contractor Invoicing & Estimates | ProInvoice" />
        <meta property="og:description" content="Professional estimate and invoice software for general contractors. Manage multi-phase projects and get paid faster." />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'ProInvoice - General Contractor Software',
            description: 'Professional invoicing and estimate software for general contractors',
            url: 'https://www.proinvoice.app/general-contractors',
            areaServed: 'US',
            serviceType: 'General Contractor Software',
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              General Contractor Invoicing & Project Management
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage multi-phase projects, collect deposits, track progress billing, and handle change orders with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button size="lg" className="min-h-[48px] px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="min-h-[48px] px-8">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Built for General Contractors
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Multi-Phase Project Billing</h3>
                <p className="text-muted-foreground">
                  Split payments across project phases: 30% deposit, 40% midway, 30% final. Get paid as work progresses.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Change Order Management</h3>
                <p className="text-muted-foreground">
                  Clone estimates, add scope changes, and automatically update project totals. Get client approval before proceeding.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Track project progress and bill based on completion percentage. Transparent billing builds client trust.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Deposit Collection</h3>
                <p className="text-muted-foreground">
                  Collect deposits before work starts. Clients pay directly from the estimate with Stripe.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Mobile-First Design</h3>
                <p className="text-muted-foreground">
                  Send estimates and collect payments from the job site. No office needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Challenges */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Challenges We Solve
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Scope Creep</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage change orders professionally. Clone estimates, add changes, and get client approval before updating totals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Collect deposits upfront and progress payments as work completes. Stop waiting 60+ days for final payment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manual Invoicing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automate invoice generation. When deposits are paid, invoices are created automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See all project phases, payments, and outstanding balances at a glance. Know exactly what's owed.
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
            Manage Projects Like a Pro
          </h2>
          <p className="text-lg opacity-90">
            Join general contractors who are collecting deposits upfront and managing projects more efficiently.
          </p>
          <Link to="/auth">
            <Button size="lg" className="min-h-[48px] px-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default GeneralContractors;

