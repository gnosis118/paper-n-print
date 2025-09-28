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
      title="InvoicePro - Create & Get Paid in 2 Clicks | Free Invoice Generator"
      description="Create professional invoices in 30 seconds with embedded Stripe checkout. Get paid 3x faster with smart dunning and auto-reminders. Free plan: 3 invoices/month."
    >
      {/* Hero Section with Logo */}
      <div className="bg-gradient-to-br from-primary-light to-accent-light">
        {/* Logo Section */}
        <div className="w-full px-4 sm:px-6 text-center py-8 sm:py-12">
          <img 
            src={proInvoiceLogoFull} 
            alt="ProInvoice.app - Professional Invoice Generator" 
            className="w-full h-16 sm:h-24 md:h-32 object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <Star className="w-3 sm:w-4 h-3 sm:h-4 text-accent" />
              <span className="text-xs sm:text-sm font-medium">Independent Invoice Generator</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary mb-4 sm:mb-6">
              Create & Get Paid in 2 Clicks
            </h1>
            
            <p className="text-base sm:text-xl text-primary/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Embedded checkout, smart dunning, milestone billing. Generate invoices in 30 seconds, get paid in 2 clicks with our Stripe-powered system.
            </p>
            
            <div className="text-xs sm:text-sm text-primary/60 mb-4 bg-white/20 rounded-full px-4 py-2 inline-block">
              <strong>Independent Platform:</strong> Not affiliated with ProInvoice (.co), Google Play apps, or similarly named services
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to="/invoice">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                  <FileText className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Create Invoice
                </Button>
              </Link>
              
              <Link to="/templates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                  <Download className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Subscription Status */}
        <div className="mb-8 sm:mb-12">
          <SubscriptionStatus />
        </div>

        {/* Trust Signals */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-6 bg-white/80 rounded-lg px-6 py-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Powered by Stripe</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">10,000+ Happy Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Get Paid 3x Faster</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
            Why We're Different from Free Competitors
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            While others offer basic invoicing, we focus on getting you paid faster with embedded payments.
          </p>
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