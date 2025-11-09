import { FileText, Send, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      number: "1",
      title: "Create",
      description: "Fill out your invoice in 30 seconds from your phone"
    },
    {
      icon: Send,
      number: "2",
      title: "Send",
      description: "Client gets a text with payment link — no app download needed"
    },
    {
      icon: DollarSign,
      number: "3",
      title: "Get Paid",
      description: "Money hits your account instantly via Stripe"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Three simple steps to get paid faster
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="border-2 hover:border-primary transition-colors h-full">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-br from-primary to-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="inline-block bg-accent text-white text-sm font-bold px-3 py-1 rounded-full mb-3">
                      Step {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-foreground/70">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="text-primary text-2xl font-bold">→</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;