import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, UserCog, Edit3, Save, Trash2 } from "lucide-react";

export default function EditingClientInfo() {
  return (
    <>
      <Helmet>
        <title>Editing Client Information - Invoice Pro Documentation</title>
        <meta name="description" content="Learn how to update and manage your client information effectively." />
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
              <UserCog className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Editing Client Information</h1>
              <p className="text-xl text-muted-foreground">
                Keep your client records accurate and up-to-date.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="h-5 w-5" />
                    How to Edit Client Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>To update a client's information:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Navigate to the Clients section from the main menu</li>
                    <li>Find the client you want to edit using the search or list view</li>
                    <li>Click on the client's name to open their profile</li>
                    <li>Click the "Edit" button in the top right corner</li>
                    <li>Update the necessary fields</li>
                    <li>Click "Save Changes" to apply updates</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">💡 Quick Edit</p>
                    <p className="text-sm text-blue-800 mt-1">
                      You can also click the edit icon next to any client in the list view for quick access.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Save className="h-5 w-5" />
                    Editable Client Fields
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>You can update the following client information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Client Name:</strong> Individual or company name</li>
                    <li><strong>Email Address:</strong> Primary contact email</li>
                    <li><strong>Phone Number:</strong> Contact phone number</li>
                    <li><strong>Billing Address:</strong> Complete billing address</li>
                    <li><strong>Shipping Address:</strong> Delivery address (if different)</li>
                    <li><strong>Tax ID:</strong> Client's tax identification number</li>
                    <li><strong>Payment Terms:</strong> Default payment terms for this client</li>
                    <li><strong>Notes:</strong> Internal notes about the client</li>
                  </ul>
                  <div className="bg-amber-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-amber-900">⚠️ Important</p>
                    <p className="text-sm text-amber-800 mt-1">
                      Changes to client information will only affect new invoices. Existing invoices remain unchanged.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trash2 className="h-5 w-5" />
                    Archiving or Deleting Clients
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>Archiving Clients</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Archive inactive clients to keep your list organized while preserving their history. Archived clients can be restored at any time.
                  </p>
                  
                  <p><strong>Deleting Clients</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Permanently delete clients who have no associated invoices. This action cannot be undone.
                  </p>
                  
                  <div className="bg-red-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-red-900">⚠️ Warning</p>
                    <p className="text-sm text-red-800 mt-1">
                      You cannot delete clients who have existing invoices. Archive them instead to maintain your records.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Review and update client information regularly</li>
                    <li>Verify email addresses to ensure invoices are delivered</li>
                    <li>Keep notes about client preferences or special requirements</li>
                    <li>Update payment terms based on client payment history</li>
                    <li>Archive inactive clients rather than deleting them</li>
                    <li>Use the notes field to track important client details</li>
                  </ul>
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
                      <Link to="/docs/client-history-and-records" className="text-primary hover:underline">
                        Client History and Records
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

