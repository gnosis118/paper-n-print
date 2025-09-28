import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Plus, Building, Mail, Phone, MapPin } from "lucide-react";

export default function AddingClients() {
  return (
    <>
      <Helmet>
        <title>Adding New Clients - Invoice Pro Documentation</title>
        <meta name="description" content="Learn how to add and manage client information for faster invoice creation and better client relationships." />
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
              <Users className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Adding New Clients</h1>
              <p className="text-xl text-muted-foreground">
                Build a comprehensive client database for efficient invoice management and better business relationships.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Why Manage Your Clients?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Proper client management provides numerous benefits:</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-2">Efficiency Benefits</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Create invoices faster with saved client data</li>
                        <li>Automatic address and contact population</li>
                        <li>Quick client selection from dropdown</li>
                        <li>Reduced data entry errors</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Business Benefits</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Track client payment history</li>
                        <li>Analyze client profitability</li>
                        <li>Maintain professional records</li>
                        <li>Improve client communication</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    How to Add a New Client
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Step-by-Step Process</h3>
                      <ol className="list-decimal list-inside space-y-2 ml-4 text-sm">
                        <li>Navigate to the "Clients" section in your dashboard</li>
                        <li>Click the "Add New Client" button</li>
                        <li>Fill in the client information form (details below)</li>
                        <li>Review the information for accuracy</li>
                        <li>Save the client to your database</li>
                        <li>The client will now appear in your client list</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Alternative Methods</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>During Invoice Creation:</strong> Add clients while creating invoices</li>
                        <li><strong>Quick Add:</strong> Use the quick add feature for basic information</li>
                        <li><strong>Import:</strong> Bulk import from spreadsheets or other systems</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Required Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1 flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            Basic Information
                          </h3>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>Client Name:</strong> Individual or company name</li>
                            <li><strong>Client Type:</strong> Individual or Business</li>
                            <li><strong>Display Name:</strong> How they appear in lists</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-1 flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            Contact Information
                          </h3>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>Email:</strong> Primary email for invoices</li>
                            <li><strong>Phone:</strong> Main contact number</li>
                            <li><strong>Website:</strong> Company website (optional)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1 flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            Address Information
                          </h3>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>Street Address:</strong> Physical location</li>
                            <li><strong>City, State, ZIP:</strong> Complete address</li>
                            <li><strong>Country:</strong> For international clients</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-1">Business Details</h3>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>Industry:</strong> Type of business</li>
                            <li><strong>Tax ID:</strong> For business clients</li>
                            <li><strong>Payment Terms:</strong> Custom terms if different</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Information Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Data Quality</h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Do:</strong> Use consistent naming conventions
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Do:</strong> Verify email addresses for accuracy
                          </p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Avoid:</strong> Abbreviations that might confuse
                          </p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Avoid:</strong> Incomplete contact information
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Organization Tips</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Naming Convention:</strong> Use "Company Name - Contact Person" format</li>
                        <li><strong>Categories:</strong> Group clients by industry or project type</li>
                        <li><strong>Tags:</strong> Use tags for easy filtering and organization</li>
                        <li><strong>Priority Levels:</strong> Mark VIP or high-value clients</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Data Verification</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Double-check email addresses to avoid bounced invoices</li>
                        <li>Verify phone numbers include area codes</li>
                        <li>Confirm mailing addresses are current and complete</li>
                        <li>Validate business names match official records</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Client Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Payment Preferences</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Payment Terms:</strong> Net 15, Net 30, or custom terms</li>
                        <li><strong>Preferred Methods:</strong> Credit card, ACH, check, etc.</li>
                        <li><strong>Currency:</strong> For international clients</li>
                        <li><strong>Special Instructions:</strong> PO numbers, approval processes</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibent mb-2">Communication Preferences</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Invoice Delivery:</strong> Email, postal mail, or both</li>
                        <li><strong>Reminders:</strong> How often to send payment reminders</li>
                        <li><strong>Language:</strong> Preferred communication language</li>
                        <li><strong>Best Contact Time:</strong> When to reach out</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Notes and History</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>General Notes:</strong> Important client information</li>
                        <li><strong>Project History:</strong> Previous work completed</li>
                        <li><strong>Payment History:</strong> Track payment patterns</li>
                        <li><strong>Special Requirements:</strong> Unique client needs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Managing Multiple Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">For Large Organizations</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        When working with larger companies, you may need multiple contacts:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Primary Contact:</strong> Main project or account manager</li>
                        <li><strong>Billing Contact:</strong> Accounts payable or finance team</li>
                        <li><strong>Technical Contact:</strong> IT or technical decision maker</li>
                        <li><strong>Executive Contact:</strong> C-level or department head</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Contact Management Tips</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Clearly define each contact's role and responsibilities</li>
                        <li>Set up separate client entries or use contact fields</li>
                        <li>Include department and job titles</li>
                        <li>Note who should receive invoices vs. project updates</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Pro Tip:</strong> For complex client organizations, create a client hierarchy or use tags to group related contacts together.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 pt-6">
                <Button asChild>
                  <Link to="/invoice">Add Your First Client</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/docs/editing-clients">Next: Editing Client Information</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}