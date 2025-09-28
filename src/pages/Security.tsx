import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Database } from "lucide-react";

export default function Security() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Data Protection",
      description: "All data is encrypted in transit and at rest using industry-standard encryption protocols."
    },
    {
      icon: Lock,
      title: "Secure Authentication",
      description: "Multi-factor authentication and secure login processes protect your account."
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "We never sell your data and follow strict privacy policies to protect your information."
    },
    {
      icon: Database,
      title: "Secure Storage",
      description: "Your invoices and business data are stored in secure, backed-up databases."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Security - Invoice Pro</title>
        <meta name="description" content="Learn about Invoice Pro's security measures and data protection policies for your business information." />
      </Helmet>
      
      <PageLayout>
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Security & Data Protection</h1>
              <p className="text-xl text-muted-foreground">
                Your business data security is our top priority
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {securityFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All payment processing is handled by Stripe, a PCI DSS Level 1 compliant payment processor. 
                    We never store credit card information on our servers. All transactions are encrypted and 
                    processed securely through Stripe's infrastructure.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Backup & Recovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your data is automatically backed up multiple times daily to ensure no data loss. 
                    Our infrastructure includes redundancy and disaster recovery procedures to maintain 
                    service availability and data integrity.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Questions?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If you have questions about our security practices or need to report a security concern, 
                    please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Security Email:</strong> <a href="mailto:gavin@currencytocurrency.app" className="text-primary hover:underline">gavin@currencytocurrency.app</a></p>
                    <p><strong>Phone:</strong> <a href="tel:916-969-3705" className="text-primary hover:underline">916-969-3705</a></p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}