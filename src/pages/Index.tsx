import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, FileText, Palette, Download, Star, ArrowRight, Zap, Shield, Users, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import PageLayout from "@/components/PageLayout";

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
      title="Professional Invoice Generator - Create Beautiful Invoices"
      description="Create professional invoices in minutes with our free invoice generator. Multiple templates, PDF export, and customizable branding for your business."
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-light to-accent-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <Star className="w-3 sm:w-4 h-3 sm:h-4 text-accent" />
              <span className="text-xs sm:text-sm font-medium">Independent Invoice Generator</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary mb-4 sm:mb-6">
              Create & Send Invoices in 30 Seconds
            </h1>
            
            <p className="text-base sm:text-xl text-primary/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Create compliant invoices with embedded payments and auto-reminders. 
              Get paid 3x faster with our Stripe-powered invoice system.
            </p>
            
            <div className="text-xs sm:text-sm text-primary/60 mb-4">
              <em>Not affiliated with ProInvoice (.co) or similarly named applications</em>
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

        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
            Why Choose Our Invoice Generator?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Built for speed, powered by Stripe, trusted by thousands of businesses worldwide.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-4 sm:p-6 bg-card border border-invoice-border rounded-lg shadow-soft">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">30-Second Creation</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Create professional invoices in 30 seconds with auto-fill and smart templates.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-card border border-invoice-border rounded-lg shadow-soft">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-accent-light rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">2-Click Payments</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Stripe-powered payment links embedded in every invoice. Customers pay instantly.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-card border border-invoice-border rounded-lg shadow-soft sm:col-span-2 md:col-span-1">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Download className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Auto Reminders</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Automated payment reminders and follow-ups. Never chase payments again.
            </p>
          </div>
        </div>
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