import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, FileText, Palette, Download, Star, ArrowRight, Zap, Shield, Users, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <FileText className="w-8 h-8 text-invoice-brand" />
          <span className="text-2xl font-bold">Invoice Pro</span>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
          )}
          <Link to="/templates">
            <Button variant="ghost">Templates</Button>
          </Link>
          <Link to="/invoice">
            <Button>Create Invoice</Button>
          </Link>
          <Button onClick={handleSignOut} variant="ghost" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-light to-accent-light">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Professional Invoice Generator</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              Create Beautiful Invoices in Minutes
            </h1>
            
            <p className="text-xl text-primary/80 mb-8 max-w-2xl mx-auto">
              Professional invoicing made simple. Choose from multiple templates, 
              customize your branding, and generate PDF invoices instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/invoice">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
                  <FileText className="w-5 h-5 mr-2" />
                  Create Invoice
                </Button>
              </Link>
              
              <Link to="/templates">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Everything You Need for Professional Invoicing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From small businesses to freelancers, our invoice generator has all the features you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card border border-invoice-border rounded-lg shadow-soft">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Create professional invoices in under 2 minutes with our intuitive form and live preview.
            </p>
          </div>

          <div className="text-center p-6 bg-card border border-invoice-border rounded-lg shadow-soft">
            <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Multiple Templates</h3>
            <p className="text-muted-foreground">
              Choose from Clean, Modern, or Trades templates. Each designed for different business needs.
            </p>
          </div>

          <div className="text-center p-6 bg-card border border-invoice-border rounded-lg shadow-soft">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">PDF Export</h3>
            <p className="text-muted-foreground">
              Generate high-quality PDF invoices instantly. Perfect formatting for printing or emailing.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your First Invoice?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses creating professional invoices every day.
          </p>
          
          <Link to="/invoice">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              <FileText className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;