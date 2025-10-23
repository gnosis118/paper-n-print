import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react";

export default function PaymentTerms() {
  return (
    <>
      <Helmet>
        <title>Understanding Payment Terms - ProInvoice Documentation</title>
        <meta name="description" content="Learn about payment terms and how to set them for your invoices." />
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
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Understanding Payment Terms</h1>
              <p className="text-xl text-muted-foreground">
                Set clear payment expectations with proper payment terms.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    What Are Payment Terms?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Payment terms specify when payment is due and under what conditions. They set clear expectations 
                    between you and your clients about payment deadlines.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">💡 Why They Matter</p>
                    <p className="text-sm text-blue-800 mt-1">
                      Clear payment terms help you get paid faster and reduce payment disputes.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Common Payment Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Here are the most commonly used payment terms:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Due on Receipt:</strong> Payment expected immediately upon receiving the invoice</li>
                    <li><strong>Net 7:</strong> Payment due within 7 days of invoice date</li>
                    <li><strong>Net 15:</strong> Payment due within 15 days of invoice date</li>
                    <li><strong>Net 30:</strong> Payment due within 30 days (most common)</li>
                    <li><strong>Net 60:</strong> Payment due within 60 days</li>
                    <li><strong>Net 90:</strong> Payment due within 90 days</li>
                    <li><strong>End of Month (EOM):</strong> Payment due at the end of the month</li>
                    <li><strong>2/10 Net 30:</strong> 2% discount if paid within 10 days, otherwise due in 30 days</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Setting Payment Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>Default Payment Terms</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Set default payment terms in Settings → Business Profile. These will apply to all new invoices automatically.
                  </p>
                  
                  <p><strong>Client-Specific Terms</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Override default terms for specific clients in their client profile. Useful for long-term clients or special agreements.
                  </p>
                  
                  <p><strong>Invoice-Specific Terms</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Change payment terms for individual invoices when creating or editing them.
                  </p>
                  
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-green-900">✓ Best Practice</p>
                    <p className="text-sm text-green-800 mt-1">
                      Net 30 is the industry standard for most B2B transactions. Use shorter terms for new clients.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Late Payment Policies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Consider adding late payment terms to protect your business:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Late Fees:</strong> Charge a percentage or flat fee for overdue payments</li>
                    <li><strong>Interest Charges:</strong> Apply interest on outstanding balances</li>
                    <li><strong>Grace Period:</strong> Allow a few days before late fees apply</li>
                    <li><strong>Payment Reminders:</strong> Automatic reminders before and after due date</li>
                  </ul>
                  <div className="bg-amber-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-amber-900">⚠️ Legal Note</p>
                    <p className="text-sm text-amber-800 mt-1">
                      Check local regulations regarding late fees and interest charges. Some jurisdictions have limits on what you can charge.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Early Payment Discounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Encourage faster payment with early payment discounts:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>2/10 Net 30:</strong> 2% discount if paid within 10 days</li>
                    <li><strong>1/15 Net 30:</strong> 1% discount if paid within 15 days</li>
                    <li><strong>Custom Discounts:</strong> Set your own discount percentages and timeframes</li>
                  </ul>
                  <div className="bg-purple-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-purple-900">✨ Pro Tip</p>
                    <p className="text-sm text-purple-800 mt-1">
                      Early payment discounts can significantly improve your cash flow, even though you receive slightly less.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/docs/setting-up-payment-links" className="text-primary hover:underline">
                        Setting Up Payment Links
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/managing-subscriptions" className="text-primary hover:underline">
                        Managing Subscriptions
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/payment-security-compliance" className="text-primary hover:underline">
                        Payment Security & Compliance
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

