import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const HVACContractors: React.FC = () => {
  return (
    <PageLayout
      title="HVAC Contractor Invoicing & Estimates | ProInvoice"
      description="Professional estimate and invoice software for HVAC contractors. Collect deposits, track milestones, and get paid faster. Free to start."
      canonical="/hvac-contractors"
    >
      <Helmet>
        <meta property="og:title" content="HVAC Contractor Invoicing & Estimates | ProInvoice" />
        <meta property="og:description" content="Professional estimate and invoice software for HVAC contractors. Collect deposits, track milestones, and get paid faster." />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'ProInvoice - HVAC Contractor Software',
            description: 'Professional invoicing and estimate software for HVAC contractors',
            url: 'https://www.proinvoice.app/hvac-contractors',
            areaServed: 'US',
            serviceType: 'HVAC Contractor Software',
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              HVAC Contractor Invoicing Made Simple
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Create professional estimates, collect deposits before work starts, and get paid faster with ProInvoice.
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
                  View HVAC Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Common HVAC Problems */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            HVAC Contractor Challenges
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Late Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Waiting 30-60 days for payment after completing HVAC work disrupts cash flow and makes it hard to pay your team.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  Manual Invoicing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Creating invoices manually for each job is time-consuming and error-prone, especially with seasonal workload spikes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  Scope Creep
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Clients often request changes mid-project. Managing change orders and updating estimates is complicated.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  Mobile Invoicing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You need to send estimates and collect payments from the job site, not from an office.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How ProInvoice Solves It */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            How ProInvoice Helps HVAC Contractors
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Collect Deposits Upfront</h3>
                <p className="text-muted-foreground">
                  Send estimates with embedded payment links. Clients pay deposits directly from the estimate before you start work.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Manage Change Orders</h3>
                <p className="text-muted-foreground">
                  Clone estimates, add change orders, and automatically update totals. Clients approve changes before you proceed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Progress Billing</h3>
                <p className="text-muted-foreground">
                  For multi-day jobs, bill in stages: 30% deposit, 40% midway, 30% final. Get paid as work progresses.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Mobile-First Design</h3>
                <p className="text-muted-foreground">
                  Send estimates and collect payments from your phone. No laptop needed. Perfect for job site visits.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Auto-Generated Invoices</h3>
                <p className="text-muted-foreground">
                  When a deposit is paid, we automatically create the invoice. One less thing to worry about.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HVAC-Specific Features */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            HVAC-Specific Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>HVAC Estimate Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">Pre-built templates for common HVAC services:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> AC Installation & Replacement
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Furnace Repair & Maintenance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Ductwork Installation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Thermostat Installation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seasonal Workload Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">Handle peak seasons efficiently:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Bulk estimate creation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Team member access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Automated reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Analytics dashboard
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Get Paid Faster?
          </h2>
          <p className="text-lg opacity-90">
            Join HVAC contractors who are collecting deposits upfront and getting paid 3x faster.
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

export default HVACContractors;

