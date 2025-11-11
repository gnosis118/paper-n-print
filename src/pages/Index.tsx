import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, DollarSign, FileCheck, Smartphone, Shield, Check, Zap, Wrench, Phone } from "lucide-react";
import HowItWorks from "@/components/HowItWorks";
import TemplateGallery from "@/components/TemplateGallery";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import TrustBadges from "@/components/TrustBadges";
import PricingComparison from "@/components/PricingComparison";
import WhyProInvoice from "@/components/WhyProInvoice";
import SocialProof from "@/components/SocialProof";
import ValueCalculator from "@/components/ValueCalculator";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import Dashboard from "./Dashboard";

const Index = () => {
  const { user, loading } = useAuth();

  const scrollToHowItWorks = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
      title="ProInvoice - Get Paid in 30 Seconds | Invoice & Payment App for Contractors"
      description="The fastest way for service pros to invoice clients and get paid. Create, send, and get paid instantly from your phone. Built for plumbers, electricians, cleaners, and all trades."
      canonical="https://proinvoice.lovable.app/"
    >
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white py-20 md:py-28 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-block animate-fadeIn">
                <span className="bg-gradient-to-r from-accent to-accent-dark text-white px-5 py-2 rounded-full text-sm font-bold inline-flex items-center gap-2 shadow-lg">
                  <Wrench className="h-4 w-4" />
                  Built for Service Pros
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight animate-slideInUp">
                Get Paid in 30 Seconds
              </h1>
              
              <p className="text-2xl md:text-3xl font-semibold text-white/95">
                The Fastest Way for Service Pros to Invoice Clients
              </p>
              
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Create, send, and get paid instantly from your phone. No accounting headaches — just cash flow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-accent to-accent-dark hover:opacity-90 text-white min-h-[56px] text-lg font-bold shadow-xl hover:shadow-2xl transition-all">
                  <Link to="/get-started">Create Your First Invoice</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-white/10 backdrop-blur text-white hover:bg-white hover:text-primary min-h-[56px] text-lg font-semibold"
                  onClick={scrollToHowItWorks}
                >
                  See How It Works
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90 pt-4">
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" /> Free to start
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" /> Works on any phone
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" /> Get paid instantly
                </span>
              </div>

              {/* Mobile Screenshot Mockup */}
              <div className="pt-8 pb-4">
                <div className="relative max-w-sm mx-auto">
                  <div className="bg-white rounded-3xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-foreground">Payment Received</div>
                            <div className="text-sm text-foreground/60">2 minutes ago</div>
                          </div>
                        </div>
                        <div className="bg-success/20 p-2 rounded-full">
                          <Check className="h-5 w-5 text-success" />
                        </div>
                      </div>
                      <div className="text-left space-y-1">
                        <div className="text-sm text-foreground/60">Amount</div>
                        <div className="text-4xl font-bold text-foreground">$2,450</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-primary/10 text-primary rounded-lg py-3 px-4 text-center font-semibold">
                          View Receipt
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Features Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-accent/10 text-accent-dark px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Get Paid Before You Drive Home
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Get Paid Fast</h2>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                From job site to bank account — no paperwork, no hassle.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-accent to-accent-dark w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Send Job Bids in Seconds</h3>
                  <p className="text-foreground/70">
                    Create professional estimates on-site in 30 seconds. No computer needed. Win more jobs faster.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-primary to-primary-dark w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Collect Deposits Instantly</h3>
                  <p className="text-foreground/70">
                    Get 50% upfront before you start. No more buying materials out of pocket. Money hits your account instantly.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-success transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-success to-success-light w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <FileCheck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Auto-Invoice After Completion</h3>
                  <p className="text-foreground/70">
                    Tap "Complete Job". Invoice sent. Get paid the same day. No chasing, no awkward conversations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Proof Stats */}
        <SocialProof />

        {/* How It Works */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* Why ProInvoice - Differentiation */}
        <WhyProInvoice />

        {/* Template Gallery */}
        <TemplateGallery />

        {/* Testimonials */}
        <TestimonialCarousel />

        {/* Value Calculator - ROI */}
        <ValueCalculator />

        {/* Pricing Comparison */}
        <PricingComparison />

        {/* Built for the Field */}
        <section className="py-16 md:py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Mobile-First
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Works Where You Work</h2>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                Because you're on job sites, not in an office. Built for life in the field.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-primary to-primary-dark w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">100% Mobile</h3>
                  <p className="text-foreground/70">
                    Create invoices from your truck, ladder, or job site. No laptop required.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-accent to-accent-dark w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-foreground/70">
                    Create and send invoices in under 30 seconds. Get back to work faster.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-success transition-all hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-success to-success-light w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Works Offline</h3>
                  <p className="text-foreground/70">
                    No signal? No problem. Start invoices offline, sync when you're back.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Get Paid in 30 Seconds?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of service pros who stopped chasing checks and started getting paid instantly.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-accent to-accent-dark hover:opacity-90 text-white min-h-[56px] text-lg font-bold shadow-xl">
              <Link to="/get-started">Start Free — No Credit Card Required</Link>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80 mt-8">
              <span className="flex items-center gap-2">
                <Check className="h-5 w-5 text-accent" /> Free forever plan
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-5 w-5 text-accent" /> No setup fees
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-5 w-5 text-accent" /> Cancel anytime
              </span>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
