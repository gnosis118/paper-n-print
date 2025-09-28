import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Download, Users } from "lucide-react";

export default function ConsultingInvoiceTemplate() {
  return (
    <>
      <Helmet>
        <title>Consulting Invoice Template - Professional Services Billing</title>
        <meta name="description" content="Free consulting invoice template for business consultants, IT consultants, and professional service providers. Track hours, projects, and deliverables." />
        <meta name="keywords" content="consulting invoice template, professional services invoice, consultant billing, hourly invoice template" />
        <link rel="canonical" href="https://www.proinvoice.app/templates/consulting" />
        
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Consulting Invoice Template",
          "description": "Professional consulting invoice template for service providers",
          "url": "https://www.proinvoice.app/templates/consulting",
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
                "name": "Consulting Invoice Template"
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
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Professional Services</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Consulting Invoice Template</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional invoice templates for consultants, advisors, and service providers. Perfect for tracking hours, projects, and deliverables with clear project breakdowns.
              </p>
            </div>

            {/* Template Preview */}
            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Consulting Invoice Template Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">[Your Consulting Firm]</h2>
                      <p className="text-gray-600">Strategic Business Consulting</p>
                      <p className="text-gray-600">[Your Address, City, State ZIP]</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold mb-2">Bill To:</h3>
                        <div className="text-gray-600">
                          <p>[Client Company]</p>
                          <p>[Contact Person]</p>
                          <p>[Address]</p>
                          <p>[City, State ZIP]</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <h3 className="font-semibold mb-2">Invoice Details:</h3>
                        <div className="text-gray-600">
                          <p>Invoice #: [CONS-001]</p>
                          <p>Date: [Date]</p>
                          <p>Project: [Project Name]</p>
                          <p>Period: [Date Range]</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left">Service Description</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Hours</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Rate</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Strategic Planning Session</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">8.0</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$150.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$1,200.00</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Market Analysis & Research</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">12.0</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$125.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$1,500.00</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Implementation Roadmap</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">6.0</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$150.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$900.00</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">Client Meetings & Presentations</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">4.0</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$175.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">$700.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="text-right">
                      <div className="space-y-1">
                        <p>Subtotal: $4,300.00</p>
                        <p>Total: $4,300.00</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Payment Terms:</strong> Net 30 days<br/>
                        <strong>Next Phase:</strong> Implementation begins upon approval
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features for Consulting */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-8">Designed for Professional Consultants</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Project Management</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Clear project phase breakdown</li>
                    <li>• Time tracking by activity type</li>
                    <li>• Milestone-based billing</li>
                    <li>• Deliverable documentation</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Professional Presentation</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Clean, corporate-friendly design</li>
                    <li>• Multiple rate structures</li>
                    <li>• Expense reimbursement tracking</li>
                    <li>• Payment terms customization</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-primary-light rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Start Billing Like a Pro</h2>
              <p className="text-muted-foreground mb-6">
                Create professional consulting invoices that get paid faster
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