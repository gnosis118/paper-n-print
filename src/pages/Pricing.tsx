import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHeaders } from "@/components/SEOHeaders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      description: "For solo tradesmen — quick bids & payments",
      price: "$19",
      period: "/month",
      features: [
        "Unlimited job bids",
        "Deposit collection",
        "Mobile-optimized",
        "Basic templates",
        "Email support",
        "Up to 25 jobs/month"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Pro Crew",
      description: "For small crews managing multiple jobs",
      price: "$49",
      period: "/month",
      features: [
        "Everything in Starter",
        "Progress payments",
        "Change order management",
        "Custom branding",
        "Priority support",
        "Unlimited jobs",
        "Compliance doc tracking",
        "Job pipeline dashboard"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Contractor Plus",
      description: "For GCs managing subs & docs",
      price: "$99",
      period: "/month",
      features: [
        "Everything in Pro Crew",
        "Multi-user accounts",
        "Subcontractor management",
        "Advanced reporting",
        "API access",
        "White-label option",
        "Dedicated support",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHeaders
        title="Pricing - ProInvoice for Contractors"
        description="Simple, transparent pricing for contractors. From solo tradesmen to GCs managing crews. Start free, no credit card required."
      />
      <Header />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple Pricing for Every Trade
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-primary border-2 shadow-lg' : 'border-border'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => plan.cta === "Contact Sales" ? navigate("/contact") : navigate("/get-started")}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Do I need a credit card to start?</h3>
                <p className="text-muted-foreground">
                  Nope. Start with a free trial — send your first bid in 60 seconds. No credit card required.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Can I change plans later?</h3>
                <p className="text-muted-foreground">
                  Absolutely. Upgrade or downgrade anytime. Changes take effect immediately.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We support all major credit cards, debit cards, and ACH transfers for larger contracts.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Is there a setup fee?</h3>
                <p className="text-muted-foreground">
                  No setup fees, no hidden costs. Just straightforward monthly pricing.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">What if I need to cancel?</h3>
                <p className="text-muted-foreground">
                  Cancel anytime — no questions asked, no penalties. We'll miss you though.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold mb-4">Ready to get paid faster?</h2>
            <p className="text-muted-foreground mb-8">Join hundreds of contractors who've stopped waiting 30+ days for payment.</p>
            <Button size="lg" onClick={() => navigate("/get-started")}>
              Start Free — Send Your First Bid in 60 Seconds
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
