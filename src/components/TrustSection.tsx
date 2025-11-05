import { Shield, Lock, Star, TrendingUp, FileCheck } from "lucide-react";

const TrustSection = () => {
  const testimonials = [
    {
      name: "Joe R.",
      role: "Electrician",
      quote: "Finally, I don't have to chase payments!",
      detail: "Collecting deposits upfront changed my business. No more fronting money for materials."
    },
    {
      name: "Maria S.",
      role: "Plumber",
      quote: "Got my deposit before I even left the job site. Game changer.",
      detail: "Used to wait 30-45 days. Now I'm paid before I drive home. Cash flow is completely different."
    },
    {
      name: "Tom K.",
      role: "Roofer",
      quote: "No more waiting 60 days. I get paid when the work's done.",
      detail: "Milestone billing means I get paid as I complete each phase. Stopped fronting $15K on materials."
    },
    {
      name: "Mike D.",
      role: "Plumber",
      quote: "Stopped fronting money for materials.",
      detail: "50% deposit covers all my materials costs. I start every job with positive cash flow now."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Contractor Stats */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Contractors Who Get Paid Faster
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Real results from real tradespeople across the country.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-card p-6 rounded-lg border border-border shadow-soft">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-4xl font-bold text-primary">3.2×</span>
              </div>
              <p className="text-sm text-muted-foreground">Average payment received faster</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border shadow-soft">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileCheck className="w-6 h-6 text-accent" />
                <span className="text-4xl font-bold text-accent-dark">87%</span>
              </div>
              <p className="text-sm text-muted-foreground">Of contractors collect full deposit upfront</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border shadow-soft">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 text-accent" />
                <span className="text-4xl font-bold text-primary">1000+</span>
              </div>
              <p className="text-sm text-muted-foreground">Active contractors using ProInvoice</p>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Secure & Trusted
          </h3>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-lg border border-border shadow-soft">
              <Lock className="w-6 h-6 text-primary" />
              <span className="font-medium">SSL Secure</span>
            </div>
            <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-lg border border-border shadow-soft">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-medium">Stripe Partner</span>
            </div>
            <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-lg border border-border shadow-soft">
              <FileCheck className="w-6 h-6 text-primary" />
              <span className="font-medium">Track Licenses & Insurance</span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What Contractors Say
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-medium border border-border hover:border-primary transition-colors">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-2 font-semibold text-sm">
                  "{testimonial.quote}"
                </p>
                <p className="text-muted-foreground mb-4 text-xs italic">
                  {testimonial.detail}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
