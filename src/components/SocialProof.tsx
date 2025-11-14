import { Users, DollarSign, FileText, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SocialProof = () => {
  const stats = [
    {
      icon: Users,
      value: "Built for",
      label: "Service Professionals",
      description: "Designed specifically for trades and field service businesses",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: DollarSign,
      value: "Faster",
      label: "Payments",
      description: "Collect deposits online instead of waiting for checks",
      color: "from-success to-success-light"
    },
    {
      icon: FileText,
      value: "Less",
      label: "Paperwork",
      description: "Turn approved estimates into invoices in a couple of taps",
      color: "from-primary to-primary-dark"
    },
    {
      icon: Clock,
      value: "More",
      label: "Time On-Site",
      description: "Spend less time chasing admin and more time on paid work",
      color: "from-accent to-accent-dark"
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
                <div className="text-3xl font-bold text-primary mb-2">M–F</div>
                <div className="text-sm font-semibold mb-1">Support Hours</div>
                <div className="text-xs text-muted-foreground">Real humans, 9 AM – 5 PM PST</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">256-bit</div>
                <div className="text-sm font-semibold mb-1">SSL Encryption</div>
                <div className="text-xs text-muted-foreground">Bank-level security</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-xl md:text-2xl font-medium text-muted-foreground">
            ProInvoice is built for busy service pros who spend more time on job sites than behind a desk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

