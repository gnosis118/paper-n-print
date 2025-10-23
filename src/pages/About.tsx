import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About ProInvoice - Professional Invoice Generator</title>
        <meta name="description" content="Learn about ProInvoice, the professional invoice generation platform trusted by thousands of businesses worldwide. Create invoices in 30 seconds with embedded Stripe payments." />
      </Helmet>

      <PageLayout
        title="About ProInvoice - Professional Invoice Generator"
        description="Learn about ProInvoice, the professional invoice generation platform trusted by thousands of businesses worldwide. Create invoices in 30 seconds with embedded Stripe payments."
        canonical="/about"
      >
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">About ProInvoice</h1>
              <p className="text-xl text-muted-foreground">
                Professional invoice generation made simple for businesses worldwide
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground">
                    To simplify invoice creation and management for businesses of all sizes,
                    providing professional templates and seamless payment integration with Stripe.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Why Choose ProInvoice</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 30-second invoice creation</li>
                    <li>• Embedded Stripe payment processing</li>
                    <li>• Custom branding with logo upload</li>
                    <li>• Smart client management</li>
                    <li>• Auto-payment reminders</li>
                    <li>• Industry-specific templates</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold mb-6">Get Started Today</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Join thousands of businesses using ProInvoice to streamline their invoicing process.
                  </p>
                  <a href="/get-started" className="text-primary font-semibold hover:underline">
                    Start your 7-day free trial →
                  </a>
                </CardContent>
              </Card>
            </div>
      </PageLayout>
    </>
  );
}