import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Building, Users, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import { analytics } from "@/lib/analytics";

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out our service",
    price: 0,
    yearlyPrice: 0,
    credits: 3,
    effectivePrice: 0,
    lookupKey: "free",
    icon: Zap,
    features: [
      "3 invoices per month",
      "All professional templates",
      "Basic customization",
      "PDF export with watermark",
      "Email support"
    ],
    limitations: [
      "Watermark on invoices",
      "Limited to 3 invoices/month"
    ],
    isFree: true
  },
  {
    name: "Starter",
    description: "Perfect for freelancers and small businesses", 
    price: 7,
    yearlyPrice: 70,
    credits: 25,
    effectivePrice: 0.28,
    lookupKey: "starter",
    icon: Building,
    stripeMonthlyId: "price_1SCH0VGpz30x93KjiBeySJs6",
    stripeYearlyId: "price_1SCH2dGpz30x93KjB0D7HLle",
    features: [
      "25 invoices per month",
      "All professional templates", 
      "Custom branding & logo",
      "PDF export without watermark",
      "Priority email support",
      "Client management",
      "Payment tracking"
    ],
    comparison: "vs Zoho Invoice ($10/mo), Wave (limited features)"
  },
  {
    name: "Pro",
    description: "Perfect for growing businesses and agencies",
    price: 14,
    yearlyPrice: 140,  
    credits: -1, // Unlimited
    effectivePrice: 0,
    lookupKey: "pro",
    icon: Crown,
    popular: true,
    stripeMonthlyId: "price_1SCH1IGpz30x93KjBDXYrvZC",
    stripeYearlyId: "price_1SCH3PGpz30x93KjDe2eeXcj",
    features: [
      "Unlimited invoices",
      "All templates + premium designs",
      "Advanced customization",
      "White-label invoices",
      "Priority phone support",
      "Team collaboration (up to 5 users)",
      "Payment reminders",
      "Advanced analytics"
    ],
    comparison: "vs Invoice Simple ($15/mo), competitors charge $20+"
  }
];

export default function Pricing() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useAuth();

  const handleSubscribe = async (plan: any, billingCycle: 'monthly' | 'annual') => {
    if (plan.isFree) {
      // Handle free plan signup
      if (!user) {
        toast.error("Please sign in to start with our free plan");
        return;
      }
      toast.success("You're already on our free plan! Start creating invoices.");
      return;
    }

    if (!user) {
      toast.error("Please sign in to subscribe");
      return;
    }

    const planKey = `${plan.lookupKey}_${billingCycle}`;
    setIsLoading(planKey);
    
    try {
      const priceId = billingCycle === 'annual' ? plan.stripeYearlyId : plan.stripeMonthlyId;
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          price_id: priceId,
          plan_type: plan.lookupKey,
          billing_cycle: billingCycle
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Track subscription attempt
        analytics.trackButtonClick('subscribe', `${plan.name}_${billingCycle}`);
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error("Failed to start subscription process");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <PageLayout
      title="Pricing Plans - Free & Premium Invoice Generator | InvoicePro"
      description="Start free with 3 invoices/month. Upgrade to Starter (25 invoices, $7/mo) or Pro (unlimited invoices, $14/mo) for no watermarks. Benchmarked against Zoho Invoice, Wave, and Invoice Simple."
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free with 3 invoices per month. Upgrade to Starter (25 invoices) or Pro (unlimited invoices), no watermarks, and premium features.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            <Badge variant="secondary" className="ml-2">
              Save 2 months
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const displayPrice = isYearly ? plan.yearlyPrice : plan.price;
            const period = isYearly ? '/year' : (plan.isFree ? '' : '/month');
            const billingCycle = isYearly ? 'annual' : 'monthly';
            const planKey = `${plan.lookupKey}_${billingCycle}`;
            
            return (
              <Card 
                key={plan.name} 
                className={`relative ${
                  plan.popular 
                    ? 'border-primary shadow-lg scale-105' 
                    : plan.isFree
                    ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20'
                    : 'border-border'
                } hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                {plan.isFree && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white">
                      Start Free
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.isFree ? 'Free' : `$${displayPrice}`}
                    </span>
                    <span className="text-muted-foreground">{period}</span>
                  </div>
                   <div className="text-sm text-muted-foreground">
                     {plan.credits === -1 ? 'Unlimited invoices' : `${plan.credits} invoices`} 
                     {plan.isFree || plan.credits === -1 ? '' : ` • $${plan.effectivePrice.toFixed(2)} per invoice`}
                     {plan.comparison && (
                       <div className="text-xs mt-1 text-green-600 dark:text-green-400">
                         💰 {plan.comparison}
                       </div>
                     )}
                   </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations?.map((limitation, index) => (
                      <li key={`limit-${index}`} className="flex items-start gap-3">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                          <span className="text-xs text-amber-600">!</span>
                        </div>
                        <span className="text-sm text-amber-600 dark:text-amber-400">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="px-6 pb-6">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : plan.isFree ? "secondary" : "outline"}
                    onClick={() => handleSubscribe(plan, billingCycle)}
                    disabled={isLoading === planKey}
                  >
                    {isLoading === planKey ? "Processing..." : 
                     plan.isFree ? "Get Started Free" : "Subscribe Now"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Competitor Comparison */}
        <div className="bg-muted/30 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">How We Compare</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-primary">InvoicePro</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Zoho Invoice</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Wave</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Invoice Simple</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-4 font-medium">Starter Plan Price</td>
                  <td className="py-3 px-4 text-center text-primary font-bold">$7/mo</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">$10/mo</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">Free*</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">$15/mo</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="py-3 px-4 font-medium">2-Click Payments</td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                  <td className="py-3 px-4 text-center text-muted-foreground">Manual setup</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">Limited</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">No</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">White-label Invoices</td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                  <td className="py-3 px-4 text-center text-muted-foreground">Premium only</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">No</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">Pro only</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="py-3 px-4 font-medium">Invoice Creation Speed</td>
                  <td className="py-3 px-4 text-center text-primary font-bold">30 seconds</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">2-3 minutes</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">2-3 minutes</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">1-2 minutes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Team Collaboration</td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-primary mx-auto" /></td>
                  <td className="py-3 px-4 text-center text-muted-foreground">$20+/mo</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">No</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">$25+/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-center">
            * Wave is free but lacks advanced payment features and requires complex setup
          </div>
        </div>

        {/* Template Pack Add-ons */}
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Template Pack Add-ons</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Construction Pack</h3>
                <p className="text-sm text-muted-foreground mb-4">5 specialized templates for contractors, builders, and trades</p>
                <div className="text-2xl font-bold text-accent mb-4">$9.99</div>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Plan
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Creative Pack</h3>
                <p className="text-sm text-muted-foreground mb-4">5 designer templates for agencies, photographers, and creatives</p>
                <div className="text-2xl font-bold text-accent mb-4">$9.99</div>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Plan
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Service Pack</h3>
                <p className="text-sm text-muted-foreground mb-4">5 templates for consultants, lawyers, and service providers</p>
                <div className="text-2xl font-bold text-accent mb-4">$9.99</div>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust & Security */}
        <div className="bg-primary/5 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Trusted & Secure</h2>
            <p className="text-muted-foreground">Your data and payments are protected by industry-leading security</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="https://stripe.com/img/v3/home/twitter.png" alt="Stripe" className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-sm">Powered by Stripe</h3>
              <p className="text-xs text-muted-foreground mt-1">Industry-leading payment processing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-sm">SSL Encrypted</h3>
              <p className="text-xs text-muted-foreground mt-1">256-bit SSL encryption</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-sm">SOC 2 Compliant</h3>
              <p className="text-xs text-muted-foreground mt-1">Enterprise-grade security</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold text-sm">99.9% Uptime</h3>
              <p className="text-xs text-muted-foreground mt-1">Reliable service guarantee</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose InvoicePro?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">30-Second Setup</h3>
              <p className="text-sm text-muted-foreground">Create professional invoices in seconds, not minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Get Paid 3x Faster</h3>
              <p className="text-sm text-muted-foreground">Stripe integration with 2-click payments</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Professional Templates</h3>
              <p className="text-sm text-muted-foreground">Industry-specific designs that impress clients</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            All paid plans include a 14-day free trial. Cancel anytime. No contracts.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}