import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, History, FileText, DollarSign, TrendingUp } from "lucide-react";

export default function ClientHistory() {
  return (
    <>
      <Helmet>
        <title>Client History and Records - ProInvoice Documentation</title>
        <meta name="description" content="Learn how to view and manage client history and transaction records." />
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
              <History className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Client History and Records</h1>
              <p className="text-xl text-muted-foreground">
                Track and analyze your client relationships and transaction history.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Viewing Client History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>To access a client's complete history:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Go to the Clients page (/clients)</li>
                    <li>Find the client in the list</li>
                    <li>Click the "View History" icon (document icon) in the Actions column</li>
                    <li>A dialog will open showing all invoices and estimates for that client</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">💡 Quick Access</p>
                    <p className="text-sm text-blue-800 mt-1">
                      The history dialog shows client information, all invoices with their status, and all estimates with their status.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    What's Included in Client History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Client history includes comprehensive records of:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Client Information:</strong> Name, email, company, address, and when they became a client</li>
                    <li><strong>All Invoices:</strong> Complete list of invoices with invoice number, dates, amounts, and status</li>
                    <li><strong>All Estimates:</strong> Complete list of estimates with number, title, amounts, and status</li>
                    <li><strong>Total Statistics:</strong> Invoice count, estimate count, and total revenue from the client</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Client Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>View important metrics for each client:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Total Revenue:</strong> Lifetime value from the client</li>
                    <li><strong>Average Invoice Amount:</strong> Mean invoice value</li>
                    <li><strong>Payment Behavior:</strong> Average days to payment</li>
                    <li><strong>Outstanding Amount:</strong> Current unpaid balance</li>
                    <li><strong>Invoice Count:</strong> Total number of invoices issued</li>
                    <li><strong>Last Activity:</strong> Most recent transaction date</li>
                  </ul>
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-green-900">✓ Pro Insight</p>
                    <p className="text-sm text-green-800 mt-1">
                      Use client analytics to identify your most valuable clients and optimize your business relationships.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Filtering and Searching History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Find specific records quickly using filters:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Date Range:</strong> Filter by specific time periods</li>
                    <li><strong>Status:</strong> View only paid, unpaid, or overdue invoices</li>
                    <li><strong>Amount Range:</strong> Filter by invoice value</li>
                    <li><strong>Search:</strong> Find specific invoice numbers or descriptions</li>
                  </ul>
                  <div className="bg-purple-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-purple-900">✨ Export Feature</p>
                    <p className="text-sm text-purple-800 mt-1">
                      Export client history to CSV or PDF for accounting or tax purposes.
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
                      <Link to="/docs/adding-new-clients" className="text-primary hover:underline">
                        Adding New Clients
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/editing-client-information" className="text-primary hover:underline">
                        Editing Client Information
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/managing-multiple-contacts" className="text-primary hover:underline">
                        Managing Multiple Contacts
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

