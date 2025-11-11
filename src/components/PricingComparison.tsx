import { Check, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const PricingComparison = () => {
  const features = [
    {
      category: "Core Features",
      items: [
        { name: "Unlimited Invoices", free: true, pro: true },
        { name: "Unlimited Clients", free: true, pro: true },
        { name: "Mobile App Access", free: true, pro: true },
        { name: "Email Invoice Delivery", free: true, pro: true },
        { name: "Payment Links", free: true, pro: true },
        { name: "Basic Templates", free: true, pro: true },
      ]
    },
    {
      category: "Advanced Features",
      items: [
        { name: "Estimates/Quotes", free: false, pro: true },
        { name: "Recurring Billing", free: false, pro: true },
        { name: "Custom Branding", free: false, pro: true },
        { name: "Premium Templates", free: false, pro: true },
        { name: "Client Portal", free: false, pro: true },
        { name: "Advanced Analytics", free: false, pro: true },
      ]
    },
    {
      category: "Business Tools",
      items: [
        { name: "Expense Tracking", free: false, pro: true },
        { name: "Time Tracking", free: false, pro: true },
        { name: "Multi-Business Management", free: false, pro: true },
        { name: "Team Collaboration", free: false, pro: true },
        { name: "Priority Support", free: false, pro: true },
        { name: "API Access", free: false, pro: true },
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Simple, Transparent Pricing
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Start Free, Upgrade When You're Ready
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            No credit card required. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Free Plan */}
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">Free</CardTitle>
              <CardDescription className="text-base">Perfect for getting started</CardDescription>
              <div className="mt-4">
                <div className="text-5xl font-bold">$0</div>
                <div className="text-muted-foreground mt-2">Forever free</div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full mb-6" variant="outline" size="lg">
                <Link to="/get-started">Start Free</Link>
              </Button>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Unlimited invoices & clients</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Mobile & web access</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Email invoice delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Payment links (Stripe)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Basic templates</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <X className="h-5 w-5 flex-shrink-0" />
                  <span>Estimates & quotes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <X className="h-5 w-5 flex-shrink-0" />
                  <span>Recurring billing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <X className="h-5 w-5 flex-shrink-0" />
                  <span>Custom branding</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-primary shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-br from-accent to-accent-dark text-white px-4 py-1 text-sm font-bold">
              MOST POPULAR
            </div>
            <CardHeader className="text-center pb-8 pt-10">
              <CardTitle className="text-2xl mb-2">Pro</CardTitle>
              <CardDescription className="text-base">For serious professionals</CardDescription>
              <div className="mt-4">
                <div className="text-5xl font-bold">$12</div>
                <div className="text-muted-foreground mt-2">per month</div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full mb-6 bg-gradient-to-r from-primary to-primary-dark" size="lg">
                <Link to="/get-started">Start 14-Day Free Trial</Link>
              </Button>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Everything in Free, plus:</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Unlimited estimates & quotes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Recurring billing automation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Custom branding & logo</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Premium templates</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Client portal access</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Advanced analytics & reports</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Expense & time tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Multi-business management</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Priority support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Feature Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Detailed Feature Comparison</h3>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Features</th>
                    <th className="text-center p-4 font-semibold w-32">Free</th>
                    <th className="text-center p-4 font-semibold w-32 bg-primary/5">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, categoryIndex) => (
                    <>
                      <tr key={`category-${categoryIndex}`} className="bg-muted/50">
                        <td colSpan={3} className="p-3 font-bold text-sm">
                          {category.category}
                        </td>
                      </tr>
                      {category.items.map((feature, featureIndex) => (
                        <tr key={`feature-${categoryIndex}-${featureIndex}`} className="border-t">
                          <td className="p-4 text-sm">{feature.name}</td>
                          <td className="p-4 text-center">
                            {feature.free ? (
                              <Check className="h-5 w-5 text-success mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )}
                          </td>
                          <td className="p-4 text-center bg-primary/5">
                            {feature.pro ? (
                              <Check className="h-5 w-5 text-success mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Pricing FAQs</h3>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h4 className="font-semibold mb-2">Do I need a credit card to start?</h4>
              <p className="text-muted-foreground">No! The free plan is completely free forever. No credit card required.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-muted-foreground">Yes! Cancel your Pro subscription anytime. You'll keep access until the end of your billing period.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-muted-foreground">We accept all major credit cards, debit cards, and digital wallets through Stripe.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h4 className="font-semibold mb-2">Is there a free trial for Pro?</h4>
              <p className="text-muted-foreground">Yes! Get 14 days free when you upgrade to Pro. No credit card required for the trial.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;

