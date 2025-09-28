import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvoiceSimpleVsProInvoice = () => {
  const features = [
    {
      feature: "Estimate Functionality",
      invoicesimple: false,
      proinvoice: true,
      description: "Create and send professional estimates"
    },
    {
      feature: "Online Deposit Collection", 
      invoicesimple: false,
      proinvoice: true,
      description: "Collect deposits when estimates are accepted"
    },
    {
      feature: "Auto-Convert Estimates to Invoices",
      invoicesimple: false,
      proinvoice: true,
      description: "Seamlessly convert accepted estimates to invoices"
    },
    {
      feature: "QR Code Payments",
      invoicesimple: false,
      proinvoice: true,
      description: "Generate QR codes for easy mobile payments"
    },
    {
      feature: "Basic Invoicing",
      invoicesimple: true,
      proinvoice: true,
      description: "Create and send professional invoices"
    },
    {
      feature: "Recurring Invoices",
      invoicesimple: true,
      proinvoice: true,
      description: "Set up automatic recurring billing"
    },
    {
      feature: "Time Tracking",
      invoicesimple: true,
      proinvoice: false,
      description: "Track billable hours for projects"
    },
    {
      feature: "Expense Tracking",
      invoicesimple: true,
      proinvoice: false,
      description: "Track and categorize business expenses"
    },
    {
      feature: "Client Portal",
      invoicesimple: true,
      proinvoice: false,
      description: "Give clients access to invoices and payments"
    },
    {
      feature: "Industry-Specific Templates",
      invoicesimple: false,
      proinvoice: true,
      description: "Templates designed for contractors and trades"
    },
    {
      feature: "Mobile-First Design",
      invoicesimple: false,
      proinvoice: true,
      description: "Optimized for mobile use by field workers"
    },
    {
      feature: "Free Plan",
      invoicesimple: true,
      proinvoice: true,
      description: "Get started without payment"
    }
  ];

  return (
    <PageLayout
      title="Invoice Simple vs ProInvoice Comparison 2024"
      description="Compare Invoice Simple vs ProInvoice for invoicing and estimates. See which platform is better for contractors, freelancers, and service businesses."
      canonical="/compare/invoice-simple-vs-proinvoice"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Invoice Simple vs ProInvoice: Which Platform Wins in 2024?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            An honest comparison of Invoice Simple and ProInvoice to help contractors, freelancers, and service businesses choose the right invoicing solution.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">IS</div>
                Invoice Simple
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Best for freelancers and consultants who need time tracking and expense management alongside basic invoicing.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Comprehensive freelancer features</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Time tracking included</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-red-600" />
                  <span>No estimate functionality</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-red-600" />
                  <span>Not optimized for trades</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-bold">P</div>
                ProInvoice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Best for contractors and service businesses who need estimates, deposit collection, and streamlined payment workflows.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Full estimate-to-invoice workflow</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Online deposit collection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Industry-specific templates</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Mobile-optimized for field work</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Detailed Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-2">Feature</th>
                    <th className="text-center py-4 px-2">Invoice Simple</th>
                    <th className="text-center py-4 px-2">ProInvoice</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-medium">{item.feature}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        {item.invoicesimple ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-600 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-2">
                        {item.proinvoice ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Comparison */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Pricing Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Invoice Simple</h3>
                <div className="space-y-2 text-sm">
                  <p>• Free: Up to 3 clients</p>
                  <p>• Pro ($15/month): Unlimited clients</p>
                  <p>• Premium ($25/month): Advanced features</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">ProInvoice</h3>
                <div className="space-y-2 text-sm">
                  <p>• 7-day free trial (no card required)</p>
                  <p>• Monthly: $19/month</p>
                  <p>• Annual: $15/month (2 months free)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Use Case Recommendations */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Choose Invoice Simple If...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>• You're a freelancer or consultant</p>
              <p>• You need detailed time tracking</p>
              <p>• You want expense management features</p>
              <p>• You only need basic invoicing (no estimates)</p>
              <p>• You work primarily from an office/computer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Choose ProInvoice If...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>• You're in construction, HVAC, plumbing, or similar trades</p>
              <p>• You need to send estimates before invoicing</p>
              <p>• You want to collect deposits online</p>
              <p>• You work in the field and need mobile optimization</p>
              <p>• You want faster payment collection</p>
            </CardContent>
          </Card>
        </div>

        {/* The Winner Section */}
        <Card className="mb-12 border-primary">
          <CardHeader>
            <CardTitle>The Verdict</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <strong>For contractors and service businesses:</strong> ProInvoice wins with its estimate-to-invoice workflow, 
              deposit collection, and industry-specific features that help you get paid faster.
            </p>
            <p>
              <strong>For freelancers and consultants:</strong> Invoice Simple is better if you prioritize time tracking 
              and expense management over estimate functionality.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Paid Faster?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Try ProInvoice free for 7 days. No credit card required. Create your first estimate and start collecting deposits in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/get-started">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/estimates">View Estimate Templates</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InvoiceSimpleVsProInvoice;