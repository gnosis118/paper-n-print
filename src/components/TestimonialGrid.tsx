import { Star } from "lucide-react";

const TestimonialGrid = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Freelance Designer",
      initials: "SC",
      text: "Switched from Zoho Invoice because this is so much faster. The 2-click payment feature alone saves me hours every month."
    },
    {
      name: "Mike Rodriguez", 
      role: "Small Business Owner",
      initials: "MR",
      text: "Getting paid 3x faster is not just marketing - it's real. Our cash flow improved dramatically since switching."
    },
    {
      name: "Jennifer Liu",
      role: "IT Consultant", 
      initials: "JL",
      text: "The auto-reminders feature means I never have to chase payments manually. Game changer for my consulting business."
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-card border border-invoice-border rounded-lg p-6 shadow-soft">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            "{testimonial.text}"
          </p>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">{testimonial.initials}</span>
            </div>
            <div>
              <p className="text-sm font-medium">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialGrid;