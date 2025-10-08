import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Repeat, CreditCard, Calendar, Settings } from "lucide-react";

export default function ManagingSubscriptions() {
  return (
    <>
      <Helmet>
        <title>Managing Subscriptions - Invoice Pro Documentation</title>
        <meta name="description" content="Learn how to set up and manage recurring invoices and subscriptions." />
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
              <Repeat className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Managing Subscriptions</h1>
              <p className="text-xl text-muted-foreground">
                Automate recurring invoices and manage subscription billing.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Repeat className="h-5 w-5" />
                    Creating Recurring Invoices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Set up automatic recurring invoices for subscription-based services:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Create a new invoice or open an existing one</li>
                    <li>Click "Make Recurring" or "Set up Subscription"</li>
                    <li>Choose the billing frequency (weekly, monthly, quarterly, yearly)</li>
                    <li>Set the start date and end date (or leave open-ended)</li>
                    <li>Configure automatic sending and payment collection</li>
                    <li>Save the recurring invoice template</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">💡 Automation</p>
                    <p className="text-sm text-blue-800 mt-1">
                      Recurring invoices are automatically generated and sent based on your schedule.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Billing Frequencies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Choose from various billing frequencies:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Weekly:</strong> Every 7 days</li>
                    <li><strong>Bi-weekly:</strong> Every 14 days</li>
                    <li><strong>Monthly:</strong> Same day each month</li>
                    <li><strong>Quarterly:</strong> Every 3 months</li>
                    <li><strong>Semi-annually:</strong> Every 6 months</li>
                    <li><strong>Annually:</strong> Once per year</li>
                    <li><strong>Custom:</strong> Set your own interval</li>
                  </ul>
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-green-900">✓ Flexibility</p>
                    <p className="text-sm text-green-800 mt-1">
                      You can set different billing frequencies for different clients based on their needs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Automatic Payment Collection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Enable automatic payment collection for subscriptions:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Client saves payment method on file</li>
                    <li>Automatic charge when invoice is generated</li>
                    <li>Retry failed payments automatically</li>
                    <li>Send payment receipts automatically</li>
                    <li>Handle payment method updates seamlessly</li>
                  </ul>
                  <div className="bg-purple-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-purple-900">✨ Pro Feature</p>
                    <p className="text-sm text-purple-800 mt-1">
                      Automatic payment collection significantly reduces late payments and improves cash flow.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Managing Active Subscriptions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>View All Subscriptions</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Access the Subscriptions dashboard to see all active, paused, and cancelled subscriptions.
                  </p>
                  
                  <p><strong>Pause a Subscription</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Temporarily stop billing without cancelling. Useful for seasonal clients or temporary holds.
                  </p>
                  
                  <p><strong>Update Subscription Details</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Change pricing, billing frequency, or line items. Updates apply to future invoices only.
                  </p>
                  
                  <p><strong>Cancel a Subscription</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    End recurring billing. You can choose to cancel immediately or at the end of the current billing period.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Configure automatic notifications for subscription events:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Upcoming Renewal:</strong> Remind clients before next billing</li>
                    <li><strong>Payment Success:</strong> Confirm successful payment</li>
                    <li><strong>Payment Failed:</strong> Alert when payment fails</li>
                    <li><strong>Subscription Expiring:</strong> Notify before subscription ends</li>
                    <li><strong>Payment Method Expiring:</strong> Alert when card is about to expire</li>
                  </ul>
                  <div className="bg-amber-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-amber-900">⚠️ Best Practice</p>
                    <p className="text-sm text-amber-800 mt-1">
                      Always notify clients a few days before charging their payment method to avoid surprises.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Handling Failed Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>When a subscription payment fails:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>System automatically retries the payment (configurable)</li>
                    <li>Client receives notification to update payment method</li>
                    <li>Subscription is paused after maximum retry attempts</li>
                    <li>You receive notification of failed payment</li>
                    <li>Client can update payment method to resume subscription</li>
                  </ol>
                  <div className="bg-red-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-red-900">⚠️ Important</p>
                    <p className="text-sm text-red-800 mt-1">
                      Configure your retry schedule and dunning management in Settings to optimize payment recovery.
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
                      <Link to="/docs/understanding-payment-terms" className="text-primary hover:underline">
                        Understanding Payment Terms
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

