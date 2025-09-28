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
              <span className="text-xs sm:text-sm font-medium">Professional Invoice Generator</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary mb-4 sm:mb-6">
              Create Beautiful Invoices in Minutes
            </h1>
            
            <p className="text-base sm:text-xl text-primary/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Professional invoicing made simple. Choose from multiple templates, 
              customize your branding, and generate PDF invoices instantly.
            </p>
            
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
            Everything You Need for Professional Invoicing
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            From small businesses to freelancers, our invoice generator has all the features you need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-4 sm:p-6 bg-card border border-invoice-border rounded-lg shadow-soft">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Lightning Fast</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Create professional invoices in under 2 minutes with our intuitive form and live preview.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-card border border-invoice-border rounded-lg shadow-soft">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-accent-light rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Multiple Templates</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Choose from Clean, Modern, or Trades templates. Each designed for different business needs.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-card border border-invoice-border rounded-lg shadow-soft sm:col-span-2 md:col-span-1">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Download className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">PDF Export</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Generate high-quality PDF invoices instantly. Perfect formatting for printing or emailing.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Ready to Create Your First Invoice?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 px-4">
            Join thousands of businesses creating professional invoices every day.
          </p>
          
          <Link to="/invoice">
            <Button size="lg" variant="secondary" className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
              <FileText className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;