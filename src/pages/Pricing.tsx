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
    name: "Basic",
    description: "Perfect for freelancers getting started", 
    price: 7,
    yearlyPrice: 70,
    credits: 25,
    effectivePrice: 0.28,
    lookupKey: "basic",
    icon: Building,
    stripeMonthlyId: "price_1SCH0VGpz30x93KjiBeySJs6",
    stripeYearlyId: "price_1SCH2dGpz30x93KjB0D7HLle",
    features: [
      "25 invoices per month",
      "All professional templates", 
      "Custom branding & logo",
      "PDF export without watermark",
      "Priority email support",
      "Client management"
    ]
  },
  {
    name: "Professional",
    description: "Perfect for growing businesses",
    price: 14,
    yearlyPrice: 140,  
    credits: 100,
    effectivePrice: 0.14,
    lookupKey: "professional",
    icon: Crown,
    popular: true,
    stripeMonthlyId: "price_1SCH1IGpz30x93KjBDXYrvZC",
    stripeYearlyId: "price_1SCH3PGpz30x93KjDe2eeXcj",
    features: [
      "100 invoices per month",
      "All templates + premium designs",
      "Advanced customization",
      "White-label invoices",
      "Priority phone support",
      "Team collaboration (up to 3 users)",
      "Payment reminders"
    ]
  },
  {
    name: "Enterprise",
    description: "Perfect for agencies and large teams",
    price: 29,
    yearlyPrice: 290,
    credits: 500,
    effectivePrice: 0.06,
    lookupKey: "enterprise", 
    icon: Users,
    stripeMonthlyId: "price_1SCH2KGpz30x93KjW45WMMPs",
    stripeYearlyId: "price_1SCH69Gpz30x93Kj0MusZMkz",
    features: [
      "500 invoices per month",
      "Unlimited templates",
      "Complete white-label solution",
      "Unlimited team members",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced analytics"
    ]
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
      title="Pricing - Choose Your Plan"
      description="Create professional invoices that get you paid faster. Start free with 3 invoices per month, or choose a paid plan for unlimited invoices without watermarks."
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free with 3 invoices per month. Upgrade for unlimited invoices, no watermarks, and premium features.
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
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
                    {plan.credits} invoices {plan.isFree ? '' : `• $${plan.effectivePrice.toFixed(2)} per invoice`}
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

        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Invoice Pro?</h2>
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