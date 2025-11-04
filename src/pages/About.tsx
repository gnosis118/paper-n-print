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
        title="About ProInvoice - Cashflow Automation for Contractors"
        description="Learn about ProInvoice's mission to help contractors and subcontractors get paid on time without the paperwork hassle."
        canonical="/about"
      >
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">About ProInvoice</h1>
              <p className="text-xl text-muted-foreground mb-2">
                Cashflow automation for contractors and subcontractors
              </p>
              <p className="text-lg text-muted-foreground">
                Perfect for: Electricians, plumbers, HVAC, roofing, painting, general contractors, and all trades
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground">
                    We believe contractors shouldn't have to wait 30, 60, or 90 days to get paid for their hard work.
                    ProInvoice automates the paperwork side of the trades—job bids, deposits, progress invoices—so you can
                    focus on what you do best: building, fixing, and delivering quality work.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Why Choose ProInvoice</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Get deposits before starting work</li>
                    <li>• Auto-convert bids to invoices</li>
                    <li>• Progress payment milestones</li>
                    <li>• Track compliance docs & licenses</li>
                    <li>• Contractor-specific templates</li>
                    <li>• Mobile-first job site access</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold mb-6">Get Started Today</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Join hundreds of contractors using ProInvoice to get paid faster and manage cashflow.
                  </p>
                  <a href="/get-started" className="text-primary font-semibold hover:underline">
                    Start your free trial →
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}