import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Layout, Palette, Briefcase, Wrench } from "lucide-react";

export default function UnderstandingTemplates() {
  const templates = [
    {
      name: "Clean",
      icon: Layout,
      description: "A minimalist design perfect for professional services",
      bestFor: "Consultants, freelancers, agencies"
    },
    {
      name: "Modern",
      icon: Palette,
      description: "Contemporary styling with bold colors and typography",
      bestFor: "Creative professionals, tech companies"
    },
    {
      name: "Trades",
      icon: Wrench,
      description: "Designed specifically for trade professionals",
      bestFor: "Contractors, plumbers, electricians, HVAC"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Understanding Invoice Templates - Invoice Pro Documentation</title>
        <meta name="description" content="Learn about different invoice templates and how to choose the best one for your business." />
      </Helmet>
      
      <PageLayout>
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link to="/docs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Documentation
              </Link>
            </div>

            <div className="mb-8">
              <Layout className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Understanding Invoice Templates</h1>
              <p className="text-xl text-muted-foreground">
                Choose the perfect template to match your business style and industry.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>What Are Invoice Templates?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Invoice templates are pre-designed layouts that determine how your invoices look. 
                    They include the arrangement of elements, color schemes, fonts, and overall visual style.
                  </p>
                  <p>
                    Using professional templates ensures your invoices look polished and help build trust with your clients.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-1">
                    {templates.map((template, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <template.icon className="h-8 w-8 text-primary mt-1" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                            <p className="text-muted-foreground mb-2">{template.description}</p>
                            <p className="text-sm text-blue-600">
                              <strong>Best for:</strong> {template.bestFor}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How to Choose the Right Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Consider Your Industry</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Professional Services:</strong> Clean template for a professional look</li>
                        <li><strong>Creative Industries:</strong> Modern template to showcase creativity</li>
                        <li><strong>Trade Professionals:</strong> Trades template designed for contractors</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Think About Your Brand</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Does your business have a modern or traditional feel?</li>
                        <li>What colors represent your brand?</li>
                        <li>Do you prefer minimalist or detailed designs?</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Consider Your Clients</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Corporate clients often prefer clean, professional designs</li>
                        <li>Creative clients may appreciate more modern styling</li>
                        <li>Local clients might prefer familiar, traditional layouts</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customizing Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>All templates can be customized to match your brand:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Colors:</strong> Change accent colors to match your brand</li>
                    <li><strong>Logo:</strong> Add your business logo</li>
                    <li><strong>Fonts:</strong> Some templates offer font customization</li>
                    <li><strong>Layout:</strong> Adjust spacing and element positioning</li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-blue-800">
                      <strong>Remember:</strong> You can switch templates at any time. Try different ones to see which works best for your business.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Template Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Consistency:</strong> Use the same template for all your invoices</li>
                    <li><strong>Branding:</strong> Ensure colors and fonts align with your brand</li>
                    <li><strong>Readability:</strong> Choose templates that are easy to read and understand</li>
                    <li><strong>Professional:</strong> Always prioritize professionalism over flashy design</li>
                    <li><strong>Client Feedback:</strong> Ask clients for feedback on your invoice design</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-4 pt-6">
                <Button asChild>
                  <Link to="/templates">Browse Templates</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/docs/adding-line-items">Next: Adding Line Items</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}