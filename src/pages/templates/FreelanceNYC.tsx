import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Download, MapPin } from "lucide-react";

export default function FreelanceNYCTemplate() {
  return (
    <>
      <Helmet>
        <title>Freelance Invoice Template for New York City - NYC Compliant Invoicing</title>
        <meta name="description" content="Free freelance invoice template for NYC freelancers. Compliant with New York City tax requirements and freelance protection laws." />
        <meta name="keywords" content="NYC freelance invoice, New York City invoice template, freelance invoice NYC, NYC tax compliant invoice" />
        <link rel="canonical" href="https://paper-n-print.lovable.app/templates/freelance-nyc" />
        
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Freelance Invoice Template for New York City",
          "description": "NYC-compliant freelance invoice template with tax requirements",
          "url": "https://paper-n-print.lovable.app/templates/freelance-nyc",
          "geo": {
            "@type": "Place",
            "name": "New York City, NY"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.proinvoice.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Templates",
                "item": "https://www.proinvoice.app/templates"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "NYC Freelance Invoice Template"
              }
            ]
          }
        })}
        </script>
      </Helmet>
      
      <PageLayout>
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-primary-light rounded-full px-4 py-2 mb-4">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">New York City</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">NYC Freelance Invoice Template</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Compliant freelance invoice template designed for New York City freelancers. Includes NYC tax requirements and freelance protection law compliance.
              </p>
            </div>

            {/* NYC Compliance Notice */}
            <div className="mb-8">
              <Card className="border-l-4 border-l-primary bg-primary-light/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">NYC Freelance Protection Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    This template includes fields required by NYC's Freelance Isn't Free Act, including written contract references, payment terms, and late fee calculations as mandated by NYC law.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Template Preview */}
            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>NYC Freelance Invoice Template Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">[Your Business Name]</h2>
                      <p className="text-gray-600">[Your NYC Address]</p>
                      <p className="text-gray-600">New York, NY [ZIP Code]</p>
                      <p className="text-gray-600">EIN/SSN: [Tax ID Number]</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold mb-2">Bill To:</h3>
                        <div className="text-gray-600">
                          <p>[Client Company]</p>
                          <p>[Client Address]</p>
                          <p>[City, State ZIP]</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <h3 className="font-semibold mb-2">Invoice Details:</h3>
                        <div className="text-gray-600">
                          <p>Invoice #: [NYC-001]</p>
                          <p>Date: [Date]</p>
                          <p>Due Date: [Due Date]</p>
                          <p>Contract Ref: [Contract #]</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left">Description of Services</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Hours</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Rate</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Web Design & Development</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">25.0</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$85.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$2,125.00</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Content Creation & Copywriting</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">8.0</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$75.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$600.00</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Client Consultations</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">3.0</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$95.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$285.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="text-right mb-6">
                      <div className="space-y-1">
                        <p>Subtotal: $3,010.00</p>
                        <p>NYC Sales Tax (8.25%): $248.33</p>
                        <p className="text-xl font-bold">Total: $3,258.33</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p><strong>Payment Terms:</strong> Net 30 days</p>
                          <p><strong>Late Fee:</strong> 1.5% per month after due date</p>
                          <p><strong>Contract Reference:</strong> [Contract Date & Number]</p>
                        </div>
                        <div>
                          <p><strong>NYC Freelance Act Notice:</strong></p>
                          <p className="text-xs">This invoice is protected under NYC's Freelance Isn't Free Act. Late payments may incur penalties as outlined in our contract.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* NYC-Specific Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-8">NYC Compliance Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Legal Protection</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Freelance Isn't Free Act compliance</li>
                    <li>• Required contract reference fields</li>
                    <li>• Late fee calculation per NYC law</li>
                    <li>• Double damage protection notices</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tax Compliance</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• NYC sales tax calculation (8.25%)</li>
                    <li>• Proper tax ID display</li>
                    <li>• Service tax classifications</li>
                    <li>• 1099 preparation support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Local Resources */}
            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>NYC Freelancer Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">NYC Department of Consumer Affairs</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        File complaints and get help with unpaid invoices
                      </p>
                      <a href="https://www1.nyc.gov/site/dca/about/freelance-isnt-free-act.page" className="text-primary hover:underline text-sm">
                        Visit NYC.gov →
                      </a>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">NYC Tax Information</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Get current tax rates and filing requirements
                      </p>
                      <a href="https://www1.nyc.gov/site/finance/taxes/business-taxes.page" className="text-primary hover:underline text-sm">
                        View Tax Info →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-primary-light rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Start Invoicing with NYC Compliance</h2>
              <p className="text-muted-foreground mb-6">
                Protect your freelance business with our NYC-compliant invoice template
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/invoice">
                  <Button size="lg" className="w-full sm:w-auto">
                    <FileText className="w-4 h-4 mr-2" />
                    Create NYC Invoice
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    View All Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}