import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Building, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Header from "@/components/Header";

const plans = [
  {
    name: "Lite",
    description: "Perfect for solopreneurs and small projects",
    price: 9,
    yearlyPrice: 90,
    credits: 2,
    effectivePrice: 4.50,
    lookupKey: "lite",
    icon: Zap,
    features: [
      "2 invoice credits per month",
      "3 professional templates",
      "Basic customization",
      "PDF export",
      "Email support"
    ]
  },
  {
    name: "Pro",
    description: "Perfect for freelancers and growing businesses", 
    price: 19,
    yearlyPrice: 190,
    credits: 6,
    effectivePrice: 3.17,
    lookupKey: "pro",
    icon: Building,
    popular: true,
    features: [
      "6 invoice credits per month",
      "All invoice templates",
      "Custom branding & logo",
      "Advanced customization",
      "Priority support",
      "Client management"
    ]
  },
  {
    name: "Agency", 
    description: "Perfect for agencies and teams with high volume",
    price: 39,
    yearlyPrice: 390,
    credits: 15,
    effectivePrice: 2.60,
    lookupKey: "agency",
    icon: Users,
    features: [
      "15 invoice credits per month",
      "Unlimited templates",
      "White-label solutions",
      "Team collaboration",
      "API access",
      "Dedicated support"
    ]
  }
];

const oneTimeProducts = [
  {
    name: "Single Template",
    description: "One-time template purchase",
    price: 10,
    lookupKey: "template_onetime",
    credits: 1,
    features: [
      "1 invoice credit",
      "Access to all templates",
      "PDF export",
      "No expiration"
    ]
  },
  {
    name: "Try One Template",
    description: "Trial template purchase",
    price: 5,
    lookupKey: "template_trial", 
    credits: 1,
    features: [
      "1 invoice credit",
      "Access to all templates", 
      "PDF export",
      "Perfect for testing"
    ]
  }
];

export default function Pricing() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useAuth();

  const handleSubscribe = async (plan: any, billingCycle: 'monthly' | 'annual') => {
    if (!user) {
      toast.error("Please sign in to subscribe");
      return;
    }

    const planKey = `${plan.lookupKey}_${billingCycle}`;
    setIsLoading(planKey);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          plan_type: plan.lookupKey,
          billing_cycle: billingCycle,
          product_type: 'subscription'
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error("Failed to start subscription process");
    } finally {
      setIsLoading(null);
    }
  };

  const handleOneTimePurchase = async (product: any) => {
    if (!user) {
      toast.error("Please sign in to purchase");
      return;
    }

    setIsLoading(product.lookupKey);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          plan_type: product.lookupKey === 'template_trial' ? 'trial' : 'standard',
          product_type: 'template'
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error("Failed to start purchase process");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-16 pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional invoices that get you paid faster. Start with our free trial or choose the plan that fits your business.
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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const displayPrice = isYearly ? plan.yearlyPrice : plan.price;
            const period = isYearly ? '/year' : '/month';
            const billingCycle = isYearly ? 'annual' : 'monthly';
            const planKey = `${plan.lookupKey}_${billingCycle}`;
            
            return (
              <Card 
                key={plan.name} 
                className={`relative ${
                  plan.popular 
                    ? 'border-primary shadow-lg scale-105' 
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
                      ${displayPrice}
                    </span>
                    <span className="text-muted-foreground">{period}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {plan.credits} credits • ${plan.effectivePrice.toFixed(2)} per invoice
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
                  </ul>
                </CardContent>
                
                <CardFooter className="px-6 pb-6">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan, billingCycle)}
                    disabled={isLoading === planKey}
                  >
                    {isLoading === planKey ? "Processing..." : "Subscribe Now"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* One-Time Products Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Subscription? No Problem!
            </h2>
            <p className="text-muted-foreground">
              Purchase individual templates as you need them
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {oneTimeProducts.map((product) => (
              <Card key={product.name} className="border-border hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {product.description}
                  </CardDescription>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-foreground">
                      ${product.price}
                    </span>
                    <span className="text-muted-foreground"> one-time</span>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-4">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="px-6 pb-6">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => handleOneTimePurchase(product)}
                    disabled={isLoading === product.lookupKey}
                  >
                    {isLoading === product.lookupKey ? "Processing..." : "Buy Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}