import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, FileText, Palette, Download, Star, ArrowRight, Zap, Shield, Users, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import PageLayout from "@/components/PageLayout";
import { LazyFeatureGrid, LazyTestimonialGrid, LazyComparisonTable } from "@/components/LazyIndex";
import proInvoiceLogo from '@/assets/proinvoice-logo-new.png';
import proInvoiceLogoFull from '@/assets/proinvoice-logo-new.png';

const Index = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <PageLayout
      title="ProInvoice - Create & Get Paid in 2 Clicks | Free Invoice Generator"
      description="Create professional invoices in 30 seconds with embedded Stripe checkout. Get paid 3x faster with smart dunning and auto-reminders. Free plan: 3 invoices/month."
    >
      {/* Hero Section - Problem-Focused */}
      <div className="bg-gradient-to-br from-primary-light to-accent-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <Star className="w-3 sm:w-4 h-3 sm:h-4 text-accent" />
              <span className="text-xs sm:text-sm font-medium">The Only Platform with Estimates + Deposits</span>
            </div>

            {/* Main Headline - Problem-Focused */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary mb-4 sm:mb-6">
              Stop Chasing Payments.<br />Start Getting Paid Faster.
            </h1>

            {/* Subheadline - Solution-Focused */}
            <p className="text-base sm:text-xl text-primary/80 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Send estimates, collect deposits upfront, auto-convert to invoices, and get paid in 2 clicks.
              <strong> Get paid 3x faster than Wave</strong> with embedded Stripe checkout.
            </p>

            {/* Key Differentiators */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8 sm:mb-12 max-w-3xl mx-auto">
              <div className="bg-white/60 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary mb-1">3x</div>
                <div className="text-sm font-medium">Faster Payments</div>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary mb-1">30 sec</div>
                <div className="text-sm font-medium">Create Invoice</div>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary mb-1">25+</div>
                <div className="text-sm font-medium">Industry Templates</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 mb-8">
              <Link to="/invoice">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                  <FileText className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Create Your First Invoice
                </Button>
              </Link>

              <Link to="/get-started">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="text-xs sm:text-sm text-primary/70">
              ✓ No credit card required • ✓ 7-day free trial • ✓ Trusted by 10,000+ users
            </div>
          </div>
        </div>
      </div>

      {/* Problems We Solve Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-4">
            The Problems You Face
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            And how ProInvoice solves them better than anyone else
          </p>
        </div>

        {/* Problem-Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 sm:mb-16">
          {/* Problem 1: Late Payments */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">💰 Late Payments Killing Cash Flow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Waiting 30-60 days for payment? Chasing clients for money you've already earned?
              </p>
              <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                <p className="font-semibold text-sm mb-2">ProInvoice Solution:</p>
                <ul className="text-sm space-y-1">
                  <li>✓ Embedded payment links - get paid in 2 clicks</li>
                  <li>✓ Auto-reminders for overdue invoices</li>
                  <li>✓ Deposits collected upfront via estimates</li>
                  <li>✓ Get paid 3x faster than Wave</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Problem 2: Estimates to Invoices */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">📋 Estimates Don't Convert to Invoices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Manually recreating estimates as invoices? Losing track of what was quoted vs. what was invoiced?
              </p>
              <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                <p className="font-semibold text-sm mb-2">ProInvoice Solution:</p>
                <ul className="text-sm space-y-1">
                  <li>✓ Auto-convert estimates to invoices</li>
                  <li>✓ Collect deposits when estimate is accepted</li>
                  <li>✓ One-click invoice creation from estimate</li>
                  <li>✓ Wave doesn't have this feature</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Problem 3: Mobile Invoicing */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">📱 Can't Invoice on the Job Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Need to create invoices while on-site? Contractors and trades need mobile-first solutions.
              </p>
              <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                <p className="font-semibold text-sm mb-2">ProInvoice Solution:</p>
                <ul className="text-sm space-y-1">
                  <li>✓ Fully mobile-optimized interface</li>
                  <li>✓ QR code payments for instant collection</li>
                  <li>✓ 25+ industry-specific templates</li>
                  <li>✓ Works offline, syncs when online</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Problem 4: Industry-Specific Needs */}
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">🏗️ Generic Templates Don't Fit Your Business</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Construction, HVAC, plumbing, cleaning - each industry has unique invoicing needs.
              </p>
              <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                <p className="font-semibold text-sm mb-2">ProInvoice Solution:</p>
                <ul className="text-sm space-y-1">
                  <li>✓ 25+ industry-specific templates</li>
                  <li>✓ Pre-built for contractors, trades, services</li>
                  <li>✓ Customizable for your exact workflow</li>
                  <li>✓ Includes estimates + deposits</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Status */}
        <div className="mb-8 sm:mb-12">
          <SubscriptionStatus />
        </div>

        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
            Why ProInvoice Beats Wave
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Wave is great for accounting, but ProInvoice is built specifically for getting paid faster.
          </p>
        </div>

        {/* ProInvoice vs Wave Comparison */}
        <div className="mb-12 sm:mb-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-primary mb-6">Wave</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>No estimates or deposit collection</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Manual estimate-to-invoice conversion</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Generic templates (not industry-specific)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Focused on accounting, not payment speed</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Free accounting features</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-6">ProInvoice</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="font-semibold">Estimates + Deposit Collection</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="font-semibold">Auto-Convert Estimates to Invoices</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="font-semibold">25+ Industry-Specific Templates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="font-semibold">Built for Payment Speed (3x faster)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="font-semibold">QR Code Payments</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link to="/compare/WaveVsProInvoice">
              <Button variant="outline" size="lg">
                See Full Comparison <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Comparison Table - Lazy Loaded */}
        <div className="mb-12 sm:mb-16">
          <LazyComparisonTable />
        </div>

        {/* Live Demo Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              See It In Action - Live Demo
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Watch how fast you can create a professional invoice
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-primary-light to-accent-light rounded-lg p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Try Our Demo</h3>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Fill business details in 10 seconds</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Add line items with auto-calculations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Generate PDF instantly</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Send with payment link embedded</span>
                  </li>
                </ul>
                <Link to="/invoice">
                  <Button size="lg" className="w-full sm:w-auto">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Try Live Demo
                  </Button>
                </Link>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-medium">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive demo preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials - Lazy Loaded */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              Trusted by 10,000+ Businesses
            </h2>
            <p className="text-lg text-muted-foreground">
              See why businesses choose us over free alternatives
            </p>
          </div>
          
          <LazyTestimonialGrid />
        </div>

        <LazyFeatureGrid />
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Join 10,000+ Businesses Getting Paid Faster
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 px-4">
            Powered by Stripe. Trusted by freelancers and enterprises worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link to="/invoice">
              <Button size="lg" variant="secondary" className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                <FileText className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Create Invoice Free
              </Button>
            </Link>
            <div className="flex items-center space-x-2 text-primary-foreground/80">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;