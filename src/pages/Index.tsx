import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, Navigate } from "react-router-dom";
import { FileText, DollarSign, FileCheck, Smartphone, Shield, Check, Zap, Wrench, Users, Home, TrendingUp } from "lucide-react";
import { LazyTestimonialGrid } from "@/components/LazyIndex";
import TrustSection from "@/components/TrustSection";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import Dashboard from "./Dashboard";

const Index = () => {
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
        </div>
      </PageLayout>
    );
  }

  // If user is logged in, show dashboard
  if (user) {
    return <Dashboard />;
  }

  // Otherwise show marketing homepage
  return (
    <PageLayout
      title="ProInvoice - Professional Invoicing for Contractors & Tradespeople"
      description="Create estimates, collect deposits, and get paid automatically when the work's done — all from your phone. Built for contractors, electricians, plumbers, and all trades."
      canonical="https://proinvoice.lovable.app/"
    >
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--primary-dark))] text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    Built for the Trades
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Finish the job. Get paid. No more chasing checks.
                </h1>
                
                <p className="text-xl text-white/90">
                  Create estimates, collect deposits, and get paid automatically when the work's done — all from your phone.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] hover:bg-[hsl(var(--accent))]/90 min-h-[48px] text-lg font-semibold">
                    <Link to="/auth">Start Free</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/80 bg-transparent text-white hover:bg-white/10 hover:border-white min-h-[48px] text-lg">
                    <Link to="/docs">See How It Works</Link>
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> No credit card
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> Works on your phone
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> Get deposit before you start
                  </span>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <Card className="bg-white shadow-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-[hsl(var(--accent))]/10 p-3 rounded-full">
                        <DollarSign className="h-6 w-6 text-[hsl(var(--accent))]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--primary-dark))]">Deposit Received</h3>
                        <p className="text-sm text-muted-foreground">Johnson Kitchen Remodel</p>
                      </div>
                      <div className="ml-auto">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">Payment Amount</p>
                      <p className="text-3xl font-bold text-[hsl(var(--primary-dark))]">$4,250.00</p>
                      <p className="text-sm text-muted-foreground">50% deposit • Balance due on completion</p>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-[hsl(var(--primary-dark))] hover:bg-[hsl(var(--primary-dark))]/90">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Start Job
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        View Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent-dark))] px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Get Paid Before You Drive Home
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Get Paid Fast</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From job site to bank account — no paperwork, no hassle.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-[hsl(var(--accent))] transition-colors">
                <CardContent className="p-6">
                  <div className="bg-[hsl(var(--accent))]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-[hsl(var(--accent))]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Send Job Bids in Seconds</h3>
                  <p className="text-muted-foreground">
                    Create professional estimates on-site in 30 seconds. No computer needed. Win more jobs faster.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-[hsl(var(--accent))] transition-colors">
                <CardContent className="p-6">
                  <div className="bg-gray-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Collect Deposits Instantly</h3>
                  <p className="text-muted-foreground">
                    Get 50% upfront before you start. No more buying materials out of pocket. Money hits your account instantly.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-[hsl(var(--accent))] transition-colors">
                <CardContent className="p-6">
                  <div className="bg-gray-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <FileCheck className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Auto-Invoice After Completion</h3>
                  <p className="text-muted-foreground">
                    Tap "Complete Job". Invoice sent. Get paid the same day. No chasing, no awkward conversations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Built for the Field */}
        <section className="py-16 bg-[hsl(var(--primary-dark))] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Mobile-First Design
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for the Field</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Because you're on job sites, not in an office. ProInvoice works where you work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 border-white/20 backdrop-blur text-white">
                <CardContent className="p-6">
                  <div className="bg-[hsl(var(--accent))] w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-8 w-8 text-[hsl(var(--primary-dark))]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mobile-First</h3>
                  <p className="text-white/80">
                    Works perfectly on your phone — even on the job site. Create bids, send invoices, track payments from your truck, ladder, or anywhere you work.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 border-white/20 backdrop-blur text-white">
                <CardContent className="p-6">
                  <div className="bg-[hsl(var(--accent))] w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-[hsl(var(--primary-dark))]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Deposit Tracking</h3>
                  <p className="text-white/80">
                    See exactly what's been paid, what's pending, and what's overdue. Know your cashflow at a glance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 border-white/20 backdrop-blur text-white">
                <CardContent className="p-6">
                  <div className="bg-[hsl(var(--accent))] w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-[hsl(var(--primary-dark))]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Offline Ready</h3>
                  <p className="text-white/80">
                    Start bids even without signal. Everything syncs when you're back online. Never miss a beat.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Real Contractor Workflows */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Real Contractor Workflows
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for How You Actually Work</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Not just invoices — complete job management from bid to final payment.
              </p>
            </div>

            {/* Workflow Diagram */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-wrap justify-center items-center gap-3 text-sm md:text-base">
                <div className="bg-[hsl(var(--primary-light))] text-white px-4 py-2 rounded-lg font-semibold">
                  Estimate
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="bg-[hsl(var(--accent-light))] text-[hsl(var(--accent-dark))] px-4 py-2 rounded-lg font-semibold">
                  Deposit
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="bg-[hsl(var(--primary-light))] text-white px-4 py-2 rounded-lg font-semibold">
                  Start Job
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="bg-[hsl(var(--accent-light))] text-[hsl(var(--accent-dark))] px-4 py-2 rounded-lg font-semibold">
                  Milestones
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="bg-[hsl(var(--primary-light))] text-white px-4 py-2 rounded-lg font-semibold">
                  Final Invoice
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                  Paid
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:border-[hsl(var(--primary))] transition-colors">
                <CardContent className="p-6">
                  <div className="bg-[hsl(var(--primary))]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <FileCheck className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Milestone Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Break big jobs into stages — excavation, framing, completion — and get paid at each phase.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-[hsl(var(--accent))] transition-colors">
                <CardContent className="p-6">
                  <div className="bg-[hsl(var(--accent))]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-[hsl(var(--accent-dark))]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Change Order Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Customer wants an upgrade? Send a change order and collect payment instantly — all from your phone.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-[hsl(var(--primary))] transition-colors">
                <CardContent className="p-6">
                  <div className="bg-[hsl(var(--primary))]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Deposit Staging</h3>
                  <p className="text-sm text-muted-foreground">
                    Protect cashflow with smart deposits: 30% booking, 40% materials ordered, 30% completion.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-[hsl(var(--accent))] transition-colors">
                <CardContent className="p-6">
                  <div className="bg-[hsl(var(--accent))]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-[hsl(var(--accent-dark))]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Progress Billing</h3>
                  <p className="text-sm text-muted-foreground">
                    Bill clients as you hit project milestones — no chasing checks, no waiting 30+ days.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Built for the Pros */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for the Pros</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Whether you're solo or running a crew, ProInvoice keeps your cashflow moving.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Independent Contractors</h3>
                  <p className="text-sm text-muted-foreground">
                    Stop chasing checks. Track every job, every dollar.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Subcontractors</h3>
                  <p className="text-sm text-muted-foreground">
                    Protect your cashflow — turn change orders into instant payments.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Home Service Pros</h3>
                  <p className="text-sm text-muted-foreground">
                    Keep your hands on the tools, not on the keyboard.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Small GC Firms</h3>
                  <p className="text-sm text-muted-foreground">
                    Track multiple jobs, deposits, and team invoices in one dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Built for Your Workflow
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">From Job Site to Bank Account in 3 Steps</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                No office. No laptop. Just your phone and a few taps.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[hsl(var(--primary-dark))] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <CardContent className="p-6 pt-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Send Job Bid On-Site</h3>
                  <p className="text-muted-foreground">
                    Customer asks for a quote? Pull out your phone. Fill in the work details. Send professional bid in 60 seconds.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <CardContent className="p-6 pt-8">
                  <div className="w-16 h-16 bg-[hsl(var(--accent))]/10 rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-[hsl(var(--accent))]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Collect Deposit Before You Start</h3>
                  <p className="text-muted-foreground">
                    Customer approves? Boom. They pay deposit right there (50% typical). Money hits your account before you pick up tools.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[hsl(var(--primary-dark))] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <CardContent className="p-6 pt-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FileCheck className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Invoice & Get Paid Same Day</h3>
                  <p className="text-muted-foreground">
                    Job done? Tap "Invoice". Send from your phone. Customer pays the balance. You drive home paid.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] hover:bg-[hsl(var(--accent))]/90 min-h-[48px] text-lg">
                <Link to="/auth">Try It Right Now — On Your Phone</Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Works in your truck, on the ladder, anywhere you have signal
              </p>
            </div>
          </div>
        </section>

        {/* Your First Week */}
        <section className="py-16 bg-[hsl(var(--primary-dark))] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Get Started Fast
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your First Week With ProInvoice</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                From setup to getting paid — here's what your first week looks like.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="bg-white/10 border-white/20 backdrop-blur text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      1-2
                    </div>
                    <h3 className="text-lg font-semibold">Setup & Practice</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Set up business profile & upload logo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Create your first estimate (practice run)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      3-4
                    </div>
                    <h3 className="text-lg font-semibold">First Real Job</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Send estimate to a real customer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Collect your first deposit before starting</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      5-6
                    </div>
                    <h3 className="text-lg font-semibold">Track & Complete</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Mark milestones as you complete work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Send final invoice & get paid same day</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      7
                    </div>
                    <h3 className="text-lg font-semibold">Grow & Scale</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Review cashflow analytics dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>See what's pending, paid, and overdue</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] hover:bg-[hsl(var(--accent))]/90 min-h-[48px] text-lg">
                <Link to="/auth">Start Your First Week Free</Link>
              </Button>
              <p className="text-sm text-white/60 mt-4">
                No credit card required • Works on any device • Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Contractors Are Saying</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real feedback from tradespeople who stopped waiting 30+ days to get paid.
              </p>
            </div>
            
            <LazyTestimonialGrid />
          </div>
        </section>

        {/* Trust Section */}
        <TrustSection />

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--primary-dark))] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Stop Chasing Checks?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of contractors who get paid faster with ProInvoice.
            </p>
            <Button asChild size="lg" className="bg-[hsl(var(--accent))] text-[hsl(var(--primary-dark))] hover:bg-[hsl(var(--accent))]/90 min-h-[48px] text-lg">
              <Link to="/auth">Start Free — No Credit Card Required</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
