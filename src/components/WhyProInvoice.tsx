import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Zap, DollarSign, Users, TrendingUp, Shield } from "lucide-react";

const WhyProInvoice = () => {
  const competitors = [
    {
      name: "Wave",
      cons: "Complicated accounting features you don't need. Slow on mobile."
    },
    {
      name: "FreshBooks",
      cons: "$17-$30/month. Built for accountants, not contractors."
    },
    {
      name: "Invoice Ninja",
      cons: "Clunky interface. Requires tech knowledge to set up."
    },
    {
      name: "QuickBooks",
      cons: "$30-$200/month. Overwhelming features. Steep learning curve."
    }
  ];

  const advantages = [
    {
      icon: Smartphone,
      title: "Built for Your Phone",
      description: "Other apps are desktop-first. ProInvoice is designed for contractors who work on-site. Create invoices in 30 seconds from your phone.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Stupid Simple",
      description: "No accounting degree needed. No 50-page manual. Just tap, send, get paid. Your grandma could use it.",
      color: "from-accent to-accent-dark"
    },
    {
      icon: DollarSign,
      title: "Get Paid Instantly",
      description: "Payment links built-in. Clients tap and pay. Money hits your account same day. No waiting 2 weeks for checks.",
      color: "from-success to-success-light"
    },
    {
      icon: Users,
      title: "Made for Service Pros",
      description: "Not for agencies or freelancers. Built specifically for plumbers, electricians, cleaners, and trades. We speak your language.",
      color: "from-primary to-primary-dark"
    },
    {
      icon: TrendingUp,
      title: "Affordable Pricing",
      description: "Free forever plan. Pro is $12/month. Not $30, not $200. Just $12. That's one coffee per week.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is encrypted and secure. Powered by Stripe. Same security as your bank. PCI compliant.",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why ProInvoice Beats the Competition
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not trying to be QuickBooks. We're not trying to be FreshBooks. 
            We're built for one thing: <span className="font-bold text-foreground">getting service pros paid fast.</span>
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-all hover:border-primary/50">
                <CardContent className="p-6">
                  <div className={`bg-gradient-to-br ${advantage.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            How We Compare to Other Tools
          </h3>
          
          <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-8 border-2">
            <div className="grid md:grid-cols-2 gap-6">
              {competitors.map((competitor, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">✗</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{competitor.name}</h4>
                      <p className="text-muted-foreground text-sm">{competitor.cons}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg p-6 text-white">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">ProInvoice</h4>
                  <p className="text-white/90 leading-relaxed">
                    <strong>Mobile-first.</strong> Simple. Fast. Affordable. Built specifically for service professionals. 
                    Get paid in 30 seconds, not 30 days. Free forever plan. Pro is just $12/month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-xl font-semibold mb-4">
            Stop overpaying for features you don't need.
          </p>
          <p className="text-muted-foreground mb-6">
            Join thousands of service pros who switched to ProInvoice and never looked back.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyProInvoice;

