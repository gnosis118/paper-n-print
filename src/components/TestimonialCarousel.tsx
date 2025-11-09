import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Mike Torres",
      role: "Electrician",
      location: "Austin, TX",
      text: "I used to wait 2 weeks for checks. Now I get paid the same day I finish the job. This thing pays for itself 10x over.",
      rating: 5
    },
    {
      name: "Lisa Chen",
      role: "House Cleaner",
      location: "San Diego, CA",
      text: "My clients love how easy it is. They just tap and pay. I don't have to chase anyone anymore.",
      rating: 5
    },
    {
      name: "James Rodriguez",
      role: "Plumber",
      location: "Miami, FL",
      text: "The deposit feature saved my business. No more buying materials out of pocket. Get 50% upfront, every single job.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-primary-dark to-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands of Service Pros
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Real contractors, real results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/70">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;