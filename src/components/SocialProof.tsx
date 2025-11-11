import { Users, DollarSign, FileText, TrendingUp, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SocialProof = () => {
  const stats = [
    {
      icon: Users,
      value: "15,000+",
      label: "Service Professionals",
      description: "Trust ProInvoice daily",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: DollarSign,
      value: "$12M+",
      label: "Processed This Month",
      description: "In invoice payments",
      color: "from-success to-success-light"
    },
    {
      icon: FileText,
      value: "250,000+",
      label: "Invoices Sent",
      description: "Last 30 days",
      color: "from-primary to-primary-dark"
    },
    {
      icon: Clock,
      value: "2.3 hrs",
      label: "Saved Per Week",
      description: "Average time saved",
      color: "from-accent to-accent-dark"
    }
  ];

  const reviews = [
    {
      platform: "Google",
      rating: 4.9,
      count: "2,400+ reviews",
      quote: "Best invoicing app for contractors"
    },
    {
      platform: "Trustpilot",
      rating: 4.8,
      count: "1,800+ reviews",
      quote: "Simple and gets the job done"
    },
    {
      platform: "App Store",
      rating: 4.9,
      count: "3,200+ reviews",
      quote: "Finally, an app that works on-site"
    }
  ];

  const industries = [
    { name: "Plumbers", icon: "🔧" },
    { name: "Electricians", icon: "⚡" },
    { name: "HVAC Techs", icon: "❄️" },
    { name: "Cleaners", icon: "🧹" },
    { name: "Landscapers", icon: "🌱" },
    { name: "Painters", icon: "🎨" },
    { name: "Carpenters", icon: "🔨" },
    { name: "Roofers", icon: "🏠" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-all text-center">
                <CardContent className="p-6">
                  <div className={`bg-gradient-to-br ${stat.color} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Reviews Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Rated Excellent by Service Pros
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="font-bold text-lg mb-2">{review.platform}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(review.rating)
                            ? "fill-accent text-accent"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-bold">{review.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">{review.count}</div>
                  <p className="text-sm italic">"{review.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industries Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Trusted Across All Trades
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white border-2 rounded-lg p-4 text-center hover:border-primary hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-2">{industry.icon}</div>
                <div className="font-semibold text-sm">{industry.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm font-semibold mb-1">Uptime</div>
                <div className="text-xs text-muted-foreground">Always available when you need it</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm font-semibold mb-1">Support</div>
                <div className="text-xs text-muted-foreground">Real humans, not bots</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">256-bit</div>
                <div className="text-sm font-semibold mb-1">SSL Encryption</div>
                <div className="text-xs text-muted-foreground">Bank-level security</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <blockquote className="text-xl md:text-2xl font-medium italic text-muted-foreground">
            "I tried Wave, FreshBooks, and QuickBooks. ProInvoice is the only one that actually works 
            the way I work. I'm on job sites, not behind a desk."
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">TR</span>
            </div>
            <div className="text-left">
              <div className="font-semibold">Tom Rodriguez</div>
              <div className="text-sm text-muted-foreground">Licensed Electrician, Phoenix AZ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

