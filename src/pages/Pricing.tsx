import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Building, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const plans = [
  {
    name: "Starter",
    description: "Perfect for solos needing a few professional invoices",
    price: 15,
    yearlyPrice: 150,
    credits: 3,
    effectivePrice: 5.00,
    priceId: "price_1SCD33Gpz30x93KjxpV34FSG",
    icon: Zap,
    features: [
      "3 professional invoices per month",
      "Clean, modern templates",
      "PDF export",
      "Basic customization",
      "Email support"
    ]
  },
  {
    name: "Pro",
    description: "Perfect for freelancers and SMBs sending invoices weekly", 
    price: 29,
    yearlyPrice: 290,
    credits: 8,
    effectivePrice: 3.63,
    priceId: "price_1SCD3GGpz30x93Kj0R3vOBQd",
    icon: Building,
    popular: true,
    features: [
      "8 professional invoices per month",
      "All invoice templates",
      "Custom branding & logo",
      "Payment links integration",
      "Priority support",
      "Client management"
    ]
  },
  {
    name: "Agency", 
    description: "Perfect for agencies and bookkeepers with multiple clients",
    price: 59,
    yearlyPrice: 590,
    credits: 20,
    effectivePrice: 2.95,
    priceId: "price_1SCD3dGpz30x93KjcuQ58v2g",
    icon: Users,
    features: [
      "20 professional invoices per month",
      "White-label solutions",
      "Advanced customization",
      "Multi-client management",
      "API access",
      "Dedicated support"
    ]
  }
];

export default function Pricing() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useAuth();

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (!user) {
      toast.error("Please sign in to subscribe");
      return;
    }

    setIsLoading(priceId);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-16">
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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const displayPrice = isYearly ? plan.yearlyPrice : plan.price;
            const period = isYearly ? '/year' : '/month';
            
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
                    ${plan.effectivePrice.toFixed(2)} per invoice
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
                    onClick={() => handleSubscribe(plan.priceId, plan.name)}
                    disabled={isLoading === plan.priceId}
                  >
                    {isLoading === plan.priceId ? "Processing..." : "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
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