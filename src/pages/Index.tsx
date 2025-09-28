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
      title="InvoicePro - Create & Get Paid in 2 Clicks | Free Invoice Generator"
      description="Create professional invoices in 30 seconds with embedded Stripe checkout. Get paid 3x faster with smart dunning and auto-reminders. Free plan: 3 invoices/month."
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

        {/* Comparison Table */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-card border border-invoice-border rounded-lg overflow-hidden shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-light">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Feature</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Invoice Generator</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground">Zoho Invoice</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground">Wave</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground">Invoice Simple</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">Invoice Creation Speed</td>
                    <td className="px-4 py-3 text-center text-sm"><span className="text-primary font-semibold">30 seconds</span></td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">2-3 minutes</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">2-3 minutes</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">1-2 minutes</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="px-4 py-3 text-sm font-medium">Payment Integration</td>
                    <td className="px-4 py-3 text-center text-sm"><span className="text-primary font-semibold">Stripe Native</span></td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">External setup</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">Limited</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">Basic</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">Customer Payment Clicks</td>
                    <td className="px-4 py-3 text-center text-sm"><span className="text-primary font-semibold">2 clicks</span></td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">5+ clicks</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">4+ clicks</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">Manual setup</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="px-4 py-3 text-sm font-medium">Auto Payment Reminders</td>
                    <td className="px-4 py-3 text-center text-sm"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">Premium only</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">Limited</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">No</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium">Free Plan Invoices</td>
                    <td className="px-4 py-3 text-center text-sm"><span className="text-primary font-semibold">3/month</span></td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">Unlimited*</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">Unlimited*</td>
                    <td className="px-4 py-3 text-center text-sm text-muted-foreground">5/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-muted/10 text-xs text-muted-foreground">
              * Free competitors require complex setup and lack embedded payment features
            </div>
          </div>
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

        {/* Customer Testimonials */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              Trusted by 10,000+ Businesses
            </h2>
            <p className="text-lg text-muted-foreground">
              See why businesses choose us over free alternatives
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-invoice-border rounded-lg p-6 shadow-soft">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                "Switched from Zoho Invoice because this is so much faster. The 2-click payment feature alone saves me hours every month."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">SC</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">Freelance Designer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-invoice-border rounded-lg p-6 shadow-soft">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                "Getting paid 3x faster is not just marketing - it's real. Our cash flow improved dramatically since switching."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">MR</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Mike Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Small Business Owner</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-invoice-border rounded-lg p-6 shadow-soft">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                "The auto-reminders feature means I never have to chase payments manually. Game changer for my consulting business."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">JL</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Jennifer Liu</p>
                  <p className="text-xs text-muted-foreground">IT Consultant</p>
                </div>
              </div>
            </div>
          </div>
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