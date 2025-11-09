import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Briefcase, Users } from "lucide-react";

const TemplateGallery = () => {
  const categories = [
    {
      icon: Wrench,
      title: "Trades & Contractors",
      description: "Electricians, plumbers, HVAC, roofers, landscapers",
      templates: ["Electrician", "Plumber", "HVAC", "Roofer", "Landscaper"],
      color: "from-primary to-primary-dark"
    },
    {
      icon: Briefcase,
      title: "Service Freelancers",
      description: "Cleaners, handymen, mobile mechanics, pressure washing",
      templates: ["Cleaning", "Handyman", "Mobile Mechanic", "Pressure Washing"],
      color: "from-accent to-accent-dark"
    },
    {
      icon: Users,
      title: "Creative & Professional",
      description: "Consultants, designers, photographers, event planners",
      templates: ["Consulting", "Design", "Photography", "Event Planning"],
      color: "from-success to-success-light"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Invoice Templates Built for Your Industry
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Professional templates pre-filled with industry-standard line items
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className={`bg-gradient-to-br ${category.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.templates.map((template, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                      >
                        {template}
                      </span>
                    ))}
                  </div>
                  <Link to="/templates">
                    <Button variant="outline" className="w-full">
                      Browse Templates
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link to="/templates">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90">
              View All Templates
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TemplateGallery;