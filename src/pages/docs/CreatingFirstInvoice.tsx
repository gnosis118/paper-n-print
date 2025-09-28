import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Plus, Save, Send } from "lucide-react";

export default function CreatingFirstInvoice() {
  return (
    <>
      <Helmet>
        <title>Creating Your First Invoice - Invoice Pro Documentation</title>
        <meta name="description" content="Step-by-step guide to creating your first professional invoice with Invoice Pro." />
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
              <FileText className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Creating Your First Invoice</h1>
              <p className="text-xl text-muted-foreground">
                Learn how to create professional invoices in just a few simple steps.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Step 1: Start a New Invoice
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>To create your first invoice:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Navigate to the main dashboard</li>
                    <li>Click the "Create Invoice" button</li>
                    <li>Choose from our professional templates</li>
                    <li>Select the template that best fits your business style</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> You can always change templates later, so don't worry about making the perfect choice right away.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Add Your Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Fill in your business details:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Business Name:</strong> Your company or personal name</li>
                    <li><strong>Address:</strong> Your business address</li>
                    <li><strong>Contact Info:</strong> Email, phone, and website</li>
                    <li><strong>Logo:</strong> Upload your business logo (optional)</li>
                  </ul>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Pro Tip:</strong> Set up your business profile once, and it will automatically populate future invoices.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Add Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Enter your client's details:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Client Name:</strong> Individual or company name</li>
                    <li><strong>Billing Address:</strong> Where to send the invoice</li>
                    <li><strong>Email:</strong> For sending the invoice electronically</li>
                  </ul>
                  <p>You can also select from previously saved clients if you've worked with them before.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 4: Add Line Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>List your products or services:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Description:</strong> What you're charging for</li>
                    <li><strong>Quantity:</strong> How many units or hours</li>
                    <li><strong>Rate:</strong> Price per unit or hourly rate</li>
                    <li><strong>Amount:</strong> Automatically calculated (Quantity × Rate)</li>
                  </ul>
                  <p>Click "Add Line Item" to include multiple products or services on the same invoice.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Save className="h-5 w-5" />
                    Step 5: Review and Save
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Before finalizing your invoice:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Review all information for accuracy</li>
                    <li>Check calculations and totals</li>
                    <li>Add any special terms or notes</li>
                    <li>Set payment terms (Net 30, Due on Receipt, etc.)</li>
                  </ul>
                  <p>Click "Save as Draft" to save your work, or proceed to send the invoice.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Step 6: Send Your Invoice
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>You have several options to send your invoice:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Email:</strong> Send directly to your client's email</li>
                    <li><strong>Download PDF:</strong> Save to your computer and send manually</li>
                    <li><strong>Print:</strong> Create a physical copy</li>
                    <li><strong>Share Link:</strong> Generate a shareable link for online viewing</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-4 pt-6">
                <Button asChild>
                  <Link to="/invoice">Create Your First Invoice</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/docs/understanding-templates">Next: Understanding Templates</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}