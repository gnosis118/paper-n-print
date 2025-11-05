import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';
import TrustSection from '@/components/TrustSection';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2, Zap, DollarSign, Clock } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <PageLayout
      title="ProInvoice - Finish the Job. Get Paid. No More Chasing Checks."
      description="Create estimates, collect deposits, and get paid automatically when the work's done — all from your phone. Perfect for contractors, electricians, plumbers, and trades."
      canonical="/"
    >
      <Helmet>
        <meta property="og:title" content="ProInvoice - Finish the Job. Get Paid. No More Chasing Checks." />
        <meta property="og:description" content="Create estimates, collect deposits, and get paid automatically when the work's done — all from your phone." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.proinvoice.app/" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6 md:space-y-8">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Finish the job.
              <br />
              <span className="text-accent">Get paid.</span>
              <br />
              No more chasing checks.
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create estimates, collect deposits, and get paid automatically when the work's done — all from your phone.
            </p>

            {/* CTA Buttons - Mobile First */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto min-h-[48px] px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto min-h-[48px] px-8 border-2 border-primary text-primary hover:bg-primary/5"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="pt-4 text-sm text-muted-foreground">
              ✓ Free to start • No credit card required • 1000+ contractors trust us
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Get Paid Faster
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for contractors who want to stop chasing payments and start growing their business.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Feature 1 */}
            <Card className="border-2 border-border hover:border-accent transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Professional Estimates in Minutes
                    </h3>
                    <p className="text-muted-foreground">
                      Create beautiful, branded estimates on your phone. Send them instantly and start collecting deposits before you even start the job.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 border-border hover:border-accent transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <DollarSign className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Collect Deposits Instantly
                    </h3>
                    <p className="text-muted-foreground">
                      Get paid deposits before you start work. Clients pay directly from the estimate with Stripe. No more waiting or chasing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 border-border hover:border-accent transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Auto-Generate Invoices
                    </h3>
                    <p className="text-muted-foreground">
                      When the deposit is paid, we automatically create your invoice. One less thing to worry about. Focus on the work.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 border-border hover:border-accent transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Smart Payment Reminders
                    </h3>
                    <p className="text-muted-foreground">
                      Automatic reminders for unpaid invoices. Personalized, professional, and proven to increase collection rates by 3x.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Contractors Choose Us */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Contractors Choose ProInvoice
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Mobile-First Design</h3>
                  <p className="text-muted-foreground text-sm">
                    Send estimates and collect payments from your phone. No laptop needed.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Bank-Level Security</h3>
                  <p className="text-muted-foreground text-sm">
                    Your data is encrypted and protected. Stripe handles all payments securely.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Get Paid 3x Faster</h3>
                  <p className="text-muted-foreground text-sm">
                    Deposits before work, invoices auto-generated, reminders sent automatically.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-bold text-foreground mb-1">See Your Numbers</h3>
                  <p className="text-muted-foreground text-sm">
                    Dashboard shows collected, pending, and overdue payments at a glance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Stop Chasing Payments?
          </h2>
          <p className="text-lg opacity-90">
            Join 1000+ contractors who are getting paid faster with ProInvoice.
          </p>
          <Link to="/auth">
            <Button 
              size="lg" 
              className="min-h-[48px] px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;

