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
                    <li>Go to the Clients page (navigate to /clients)</li>
                    <li>Find the client you want to edit using the search bar</li>
                    <li>Click the Edit icon (pencil) in the Actions column</li>
                    <li>Update the necessary fields in the dialog</li>
                    <li>Click "Update Client" to save changes</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">💡 Quick Edit</p>
                    <p className="text-sm text-blue-800 mt-1">
                      The edit dialog opens instantly - no need to navigate to a separate page.
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
                    <li><strong>Client Name:</strong> Full name or business name (required)</li>
                    <li><strong>Email Address:</strong> Primary contact email (required)</li>
                    <li><strong>Company:</strong> Company or organization name (optional)</li>
                    <li><strong>Address:</strong> Complete mailing address (optional)</li>
                  </ul>
                  <div className="bg-amber-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-amber-900">⚠️ Important</p>
                    <p className="text-sm text-amber-800 mt-1">
                      Changes to client information will only affect new invoices and estimates. Existing documents remain unchanged.
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
                  <p><strong>Deleting Clients</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    To delete a client, click the trash icon in the Actions column. You'll be asked to confirm before the client is permanently removed.
                  </p>

                  <div className="bg-red-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-red-900">⚠️ Warning</p>
                    <p className="text-sm text-red-800 mt-1">
                      Deleting a client is permanent and cannot be undone. However, any invoices or estimates associated with the client will remain in your system.
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
                    <li>Use the search feature to quickly find clients</li>
                    <li>View client history to track invoices and estimates</li>
                    <li>Keep client data current for accurate reporting</li>
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

