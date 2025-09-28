import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Download, MapPin } from "lucide-react";

export default function FreelanceCATemplate() {
  return (
    <>
      <Helmet>
        <title>Freelance Invoice Template for California - CA Tax Compliant Invoicing</title>
        <meta name="description" content="Free freelance invoice template for California freelancers. Includes CA state tax requirements, sales tax calculations, and AB5 compliance notes." />
        <meta name="keywords" content="California freelance invoice, CA invoice template, freelance invoice California, CA tax compliant invoice, AB5 invoice" />
        <link rel="canonical" href="https://paper-n-print.lovable.app/templates/freelance-california" />
        
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Freelance Invoice Template for California",
          "description": "California-compliant freelance invoice template with tax requirements",
          "url": "https://paper-n-print.lovable.app/templates/freelance-california",
          "geo": {
            "@type": "Place",
            "name": "California, USA"
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
                "name": "California Freelance Invoice Template"
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
                <span className="text-sm font-medium">California</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">California Freelance Invoice Template</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Compliant freelance invoice template for California independent contractors. Includes CA state tax requirements and AB5 compliance considerations.
              </p>
            </div>

            {/* CA Compliance Notice */}
            <div className="mb-8">
              <Card className="border-l-4 border-l-primary bg-primary-light/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">California AB5 & Tax Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    This template helps demonstrate independent contractor status under California's AB5 law and includes proper tax documentation for CA state requirements.
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
                    <span>California Freelance Invoice Template Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">[Your Business Name]</h2>
                      <p className="text-gray-600">[Your Address]</p>
                      <p className="text-gray-600">[City], CA [ZIP Code]</p>
                      <p className="text-gray-600">CA Seller's Permit: [Permit Number]</p>
                      <p className="text-gray-600">Federal EIN: [EIN Number]</p>
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
                          <p>Invoice #: [CA-001]</p>
                          <p>Date: [Date]</p>
                          <p>Due Date: [Due Date]</p>
                          <p>Service Period: [Date Range]</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left">Description of Services</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Qty/Hours</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Rate</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Digital Marketing Strategy</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">20.0</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$120.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$2,400.00</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Social Media Content Creation</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">15.0</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$85.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$1,275.00</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Analytics & Reporting</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">5.0</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$100.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$500.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="text-right mb-6">
                      <div className="space-y-1">
                        <p>Subtotal: $4,175.00</p>
                        <p>CA Sales Tax (varies by location): $334.00</p>
                        <p className="text-xl font-bold">Total: $4,509.00</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p><strong>Payment Terms:</strong> Net 30 days</p>
                          <p><strong>Late Fee:</strong> 1.5% per month</p>
                          <p><strong>Service Classification:</strong> Professional Services</p>
                        </div>
                        <div>
                          <p><strong>Independent Contractor Notice:</strong></p>
                          <p className="text-xs">Services provided as independent contractor in compliance with CA employment laws. Client retains right to control only the result of work, not the means and methods.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CA-Specific Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-8">California Compliance Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">AB5 Compliance</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Independent contractor language</li>
                    <li>• Work control documentation</li>
                    <li>• Professional service classification</li>
                    <li>• Business-to-business indicators</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tax Compliance</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• CA sales tax calculation</li>
                    <li>• Seller's permit display</li>
                    <li>• EIN documentation</li>
                    <li>• 1099-NEC preparation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CA Resources */}
            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>California Freelancer Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">CA Department of Industrial Relations</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Get information about AB5 and independent contractor status
                      </p>
                      <a href="https://www.dir.ca.gov/dlse/ab5.htm" className="text-primary hover:underline text-sm">
                        Visit DIR.ca.gov →
                      </a>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">CA Tax & Fee Administration</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Sales tax rates and seller's permit information
                      </p>
                      <a href="https://www.cdtfa.ca.gov/" className="text-primary hover:underline text-sm">
                        View Tax Info →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-primary-light rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Invoice with California Confidence</h2>
              <p className="text-muted-foreground mb-6">
                Stay compliant with CA law while getting paid faster
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/invoice">
                  <Button size="lg" className="w-full sm:w-auto">
                    <FileText className="w-4 h-4 mr-2" />
                    Create CA Invoice
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