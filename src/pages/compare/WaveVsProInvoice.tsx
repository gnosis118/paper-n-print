import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const WaveVsProInvoice = () => {
  const features = [
    {
      feature: "Estimate-to-Invoice Conversion",
      wave: false,
      proinvoice: true,
      description: "Automatically convert accepted estimates to invoices"
    },
    {
      feature: "Online Deposit Collection", 
      wave: false,
      proinvoice: true,
      description: "Collect deposits when estimates are accepted"
    },
    {
      feature: "QR Code Payments",
      wave: false,
      proinvoice: true,
      description: "Generate QR codes for easy mobile payments"
    },
    {
      feature: "Free Plan Available",
      wave: true,
      proinvoice: true,
      description: "Get started without payment"
    },
    {
      feature: "Basic Invoicing",
      wave: true,
      proinvoice: true,
      description: "Create and send professional invoices"
    },
    {
      feature: "Accounting Integration",
      wave: true,
      proinvoice: false,
      description: "Connect to QuickBooks and other accounting software"
    },
    {
      feature: "Bank Connections",
      wave: true,
      proinvoice: false,
      description: "Automatically import bank transactions"
    },
    {
      feature: "Payroll Features",
      wave: true,
      proinvoice: false,
      description: "Manage employee payroll and benefits"
    },
    {
      feature: "Niche Template Focus",
      wave: false,
      proinvoice: true,
      description: "Industry-specific invoice and estimate templates"
    },
    {
      feature: "Mobile-Optimized Payments",
      wave: false,
      proinvoice: true,
      description: "Apple Pay, Google Pay, and ACH payments"
    }
  ];

  return (
    <PageLayout
      title="Wave vs ProInvoice Comparison 2024"
      description="Compare Wave Accounting vs ProInvoice for invoicing and estimates. See which platform is better for contractors, freelancers, and service businesses."
      canonical="/compare/wave-vs-proinvoice"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Wave vs ProInvoice: Which is Better for Your Business?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A detailed comparison of Wave Accounting and ProInvoice to help you choose the right invoicing solution for contractors, freelancers, and service businesses.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">W</div>
                Wave Accounting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Best for small businesses needing full accounting features with basic invoicing capabilities.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Full accounting suite</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-red-600" />
                  <span>No estimate-to-invoice conversion</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-red-600" />
                  <span>Limited payment options</span>
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
                Best for contractors and service businesses needing streamlined estimate-to-invoice workflows.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>7-day free trial</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Estimate-to-invoice automation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Online deposit collection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>QR code payments</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Feature-by-Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-2">Feature</th>
                    <th className="text-center py-4 px-2">Wave</th>
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
                        {item.wave ? (
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

        {/* When to Choose Each */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Choose Wave If...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>• You need full accounting features (expenses, bank reconciliation, reports)</p>
              <p>• You're a small business with simple invoicing needs</p>
              <p>• You want a completely free solution</p>
              <p>• You don't need estimate functionality</p>
              <p>• You prefer a more comprehensive business management tool</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Choose ProInvoice If...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>• You're a contractor, tradesperson, or service provider</p>
              <p>• You need to send estimates and collect deposits</p>
              <p>• You want automated estimate-to-invoice conversion</p>
              <p>• You need modern payment options (QR codes, Apple Pay)</p>
              <p>• You prioritize getting paid faster</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Try ProInvoice?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get started with our 7-day free trial. No credit card required. Create your first estimate in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/get-started">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/templates">View Templates</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default WaveVsProInvoice;