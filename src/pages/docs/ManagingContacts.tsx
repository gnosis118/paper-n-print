import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Users2, UserPlus, Mail, Phone } from "lucide-react";

export default function ManagingContacts() {
  return (
    <>
      <Helmet>
        <title>Managing Multiple Contacts - ProInvoice Documentation</title>
        <meta name="description" content="Learn how to manage multiple contacts for a single client organization." />
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
              <Users2 className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Managing Multiple Contacts</h1>
              <p className="text-xl text-muted-foreground">
                Handle multiple contact persons within a single client organization.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Adding Multiple Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>To add additional contacts to a client:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Open the client's profile page</li>
                    <li>Navigate to the "Contacts" tab</li>
                    <li>Click "Add New Contact"</li>
                    <li>Enter the contact's details (name, email, phone, role)</li>
                    <li>Set the contact as primary if needed</li>
                    <li>Click "Save Contact"</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">💡 Use Case</p>
                    <p className="text-sm text-blue-800 mt-1">
                      Perfect for managing different departments or decision-makers within the same company.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information Fields
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Each contact can have the following information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Full Name:</strong> Contact person's name</li>
                    <li><strong>Email Address:</strong> Individual email for correspondence</li>
                    <li><strong>Phone Number:</strong> Direct contact number</li>
                    <li><strong>Job Title/Role:</strong> Position within the organization</li>
                    <li><strong>Department:</strong> Which department they work in</li>
                    <li><strong>Primary Contact:</strong> Designate as main point of contact</li>
                    <li><strong>Invoice Recipient:</strong> Should receive invoice copies</li>
                    <li><strong>Notes:</strong> Additional information about the contact</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Managing Contact Roles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>Primary Contact</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    The main point of contact for the client. This person receives all standard communications by default.
                  </p>
                  
                  <p><strong>Billing Contact</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Receives invoices and payment-related communications. Can be different from the primary contact.
                  </p>
                  
                  <p><strong>Additional Contacts</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Other stakeholders who may need to receive copies of invoices or project updates.
                  </p>
                  
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-green-900">✓ Best Practice</p>
                    <p className="text-sm text-green-800 mt-1">
                      Always have at least one primary contact and one billing contact for each client.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sending Invoices to Multiple Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>When creating an invoice, you can:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Select which contacts should receive the invoice</li>
                    <li>Send to primary contact only</li>
                    <li>Send to all billing contacts</li>
                    <li>CC additional stakeholders</li>
                    <li>Set default recipients for future invoices</li>
                  </ul>
                  <div className="bg-amber-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-amber-900">⚠️ Note</p>
                    <p className="text-sm text-amber-800 mt-1">
                      You can customize recipient lists for each invoice, overriding the default settings when needed.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Editing and Removing Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>To Edit a Contact:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-4 text-sm">
                    <li>Go to the client's Contacts tab</li>
                    <li>Click the edit icon next to the contact</li>
                    <li>Update the information</li>
                    <li>Save changes</li>
                  </ol>
                  
                  <p className="mt-4"><strong>To Remove a Contact:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-4 text-sm">
                    <li>Click the delete icon next to the contact</li>
                    <li>Confirm the removal</li>
                  </ol>
                  
                  <div className="bg-red-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-red-900">⚠️ Warning</p>
                    <p className="text-sm text-red-800 mt-1">
                      You must have at least one contact per client. You cannot delete the last remaining contact.
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
                      <Link to="/docs/client-history-and-records" className="text-primary hover:underline">
                        Client History and Records
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

