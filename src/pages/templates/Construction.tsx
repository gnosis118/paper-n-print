import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Download, Wrench } from "lucide-react";

export default function ConstructionInvoiceTemplate() {
  return (
    <>
      <Helmet>
        <title>Construction Invoice Template - Professional Contractor Invoicing</title>
        <meta name="description" content="Free construction invoice template for contractors, builders, and construction companies. Professional templates with labor, materials, and equipment tracking." />
        <meta name="keywords" content="construction invoice template, contractor invoice, builder invoice, construction billing, trades invoice" />
        <link rel="canonical" href="https://www.proinvoice.app/templates/construction" />
        
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Construction Invoice Template",
          "description": "Professional construction invoice template for contractors and builders",
          "url": "https://www.proinvoice.app/templates/construction",
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
                "name": "Construction Invoice Template"
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
                <Wrench className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Construction Industry</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Construction Invoice Template</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional invoice templates designed specifically for contractors, builders, and construction companies. Track labor, materials, and equipment costs with ease.
              </p>
            </div>

            {/* Template Preview */}
            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Construction Invoice Template Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">[Your Company Name]</h2>
                      <p className="text-gray-600">Licensed General Contractor</p>
                      <p className="text-gray-600">License #: [License Number]</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold mb-2">Bill To:</h3>
                        <div className="text-gray-600">
                          <p>[Client Name]</p>
                          <p>[Project Address]</p>
                          <p>[City, State ZIP]</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <h3 className="font-semibold mb-2">Invoice Details:</h3>
                        <div className="text-gray-600">
                          <p>Invoice #: [INV-001]</p>
                          <p>Date: [Date]</p>
                          <p>Project #: [Project ID]</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Hours/Qty</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Rate</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Labor - Framing</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">40 hrs</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$45.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$1,800.00</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Materials - Lumber & Hardware</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">1</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$850.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$850.00</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Equipment Rental - Crane</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">2 days</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$200.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$400.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="text-right">
                      <div className="space-y-1">
                        <p>Subtotal: $3,050.00</p>
                        <p>Tax (8.25%): $251.63</p>
                        <p className="text-xl font-bold">Total: $3,301.63</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features for Construction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-8">Perfect for Construction Professionals</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Labor Tracking</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Separate line items for different trades</li>
                    <li>• Hourly rate calculations</li>
                    <li>• Overtime and premium rate support</li>
                    <li>• Worker classification tracking</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Materials & Equipment</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Detailed material cost breakdown</li>
                    <li>• Equipment rental charges</li>
                    <li>• Subcontractor expense tracking</li>
                    <li>• Permit and inspection fees</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-primary-light rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Create Your Construction Invoice?</h2>
              <p className="text-muted-foreground mb-6">
                Get paid faster with our professional construction invoice template
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/invoice">
                  <Button size="lg" className="w-full sm:w-auto">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Invoice Now
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