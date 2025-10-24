import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { FileText, CreditCard, Palette, Users, Shield, Zap, Check, ArrowRight, QrCode, Zap as Lightning } from "lucide-react";

export default function Products() {
  const features = [
    {
      icon: FileText,
      title: "25+ Industry-Specific Templates",
      description: "Not generic templates. Built for construction, HVAC, plumbing, cleaning, and 20+ other industries",
      problem: "Generic templates don't fit your business",
      solution: "Industry-specific templates with pre-built fields for your exact workflow"
    },
    {
      icon: CreditCard,
      title: "Embedded Payment Links",
      description: "Get paid in 2 clicks with Stripe integration. No separate payment page needed",
      problem: "Clients don't pay invoices they have to click through to pay",
      solution: "Payment link embedded in invoice. One-click payment. 3x faster collection"
    },
    {
      icon: QrCode,
      title: "QR Code Payments",
      description: "Generate QR codes for instant mobile payments. Perfect for on-site invoicing",
      problem: "Can't collect payment while on the job site",
      solution: "QR code payment links. Scan and pay. Instant confirmation"
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Add your logo, colors, and business information. Look professional",
      problem: "Generic invoices don't build trust",
      solution: "Fully branded invoices that look like your business"
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Store client info once. Auto-populate on future invoices. Save time",
      problem: "Manually entering client info on every invoice",
      solution: "One-click client selection. Auto-populate all fields"
    },
    {
      icon: Lightning,
      title: "Auto-Convert Estimates to Invoices",
      description: "Estimate accepted? One-click conversion to invoice. No manual data entry",
      problem: "Manually recreating estimates as invoices (Wave doesn't have this)",
      solution: "Automatic conversion. Deposit already applied. Ready to send"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with automatic backups. Your data is safe",
      problem: "Worried about losing important financial data",
      solution: "Bank-level encryption. Daily backups. 99.9% uptime"
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description: "Create professional invoices in 30 seconds. Not 30 minutes",
      problem: "Invoicing takes too much time",
      solution: "30-second invoice creation. Auto-calculations. Ready to send"
    }
  ];

  return (
    <>
      <Helmet>
        <title>ProInvoice Features - Professional Invoice Generation Tools</title>
        <meta name="description" content="Explore ProInvoice's professional invoice generation features, templates, and Stripe payment solutions. Create invoices in 30 seconds with embedded payments." />
      </Helmet>

      <PageLayout
        title="ProInvoice Features - Professional Invoice Generation Tools"
        description="Explore ProInvoice's professional invoice generation features, templates, and Stripe payment solutions. Create invoices in 30 seconds with embedded payments."
        canonical="/products"
      >
        <div className="container py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Features</Badge>
              <h1 className="text-4xl font-bold mb-4">ProInvoice Features</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, send, and manage professional invoices with embedded payments
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {features.map((feature, index) => (
                <Card key={index} className="h-full border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <feature.icon className="h-10 w-10 text-primary" />
                      {feature.problem && <Badge variant="outline" className="text-xs">Wave doesn't have this</Badge>}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{feature.description}</p>

                    {feature.problem && (
                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex gap-2">
                          <span className="text-red-500 font-bold">✗</span>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground">The Problem:</p>
                            <p className="text-sm">{feature.problem}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground">ProInvoice Solution:</p>
                            <p className="text-sm font-medium">{feature.solution}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center bg-muted/50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of businesses using ProInvoice to streamline their invoicing process
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