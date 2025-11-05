import { Shield, Lock, Star } from "lucide-react";

const TrustSection = () => {
  const testimonials = [
    {
      name: "Joe R.",
      role: "Electrician",
      quote: "Finally, I don't have to chase payments!"
    },
    {
      name: "Maria S.",
      role: "Plumber",
      quote: "Got my deposit before I even left the job site. Game changer."
    },
    {
      name: "Tom K.",
      role: "Roofer",
      quote: "No more waiting 60 days. I get paid when the work's done."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Security Badges */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Secure & Trusted
          </h2>
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
              <Star className="w-6 h-6 text-accent" />
              <span className="font-medium">Trusted by 1000+ Contractors</span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What Contractors Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-medium border border-border">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
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
