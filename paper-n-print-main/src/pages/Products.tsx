import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { FileText, CreditCard, Palette, Users, Shield, Zap } from "lucide-react";

export default function Products() {
  const features = [
    {
      icon: FileText,
      title: "Professional Templates",
      description: "Choose from multiple professional invoice templates to match your brand"
    },
    {
      icon: CreditCard,
      title: "Payment Integration",
      description: "Secure payment links for easy client payments via Stripe"
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Add your logo, colors, and business information"
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Store and manage client information for repeat invoicing"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with automatic backups"
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description: "Generate professional invoices in seconds"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Products - Invoice Pro</title>
        <meta name="description" content="Explore Invoice Pro's professional invoice generation features, templates, and payment solutions for your business." />
      </Helmet>
      
      <PageLayout>
        <div className="container py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Products</Badge>
              <h1 className="text-4xl font-bold mb-4">Invoice Pro Features</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, send, and manage professional invoices
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {features.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center bg-muted/50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of businesses using Invoice Pro to streamline their invoicing process
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="lg">Start Free Trial</Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg">View Pricing</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}