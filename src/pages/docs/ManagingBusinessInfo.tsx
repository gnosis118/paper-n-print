import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Edit, Save, Info } from "lucide-react";

export default function ManagingBusinessInfo() {
  return (
    <>
      <Helmet>
        <title>Managing Business Information - Invoice Pro Documentation</title>
        <meta name="description" content="Learn how to manage and update your business information for invoices." />
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
              <Building2 className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Managing Business Information</h1>
              <p className="text-xl text-muted-foreground">
                Keep your business details up-to-date for accurate invoicing.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Business Information Fields
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Your business profile includes the following information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Business Name:</strong> Your official company or trading name</li>
                    <li><strong>Business Address:</strong> Your registered business address</li>
                    <li><strong>Phone Number:</strong> Primary contact number</li>
                    <li><strong>Email Address:</strong> Business email for correspondence</li>
                    <li><strong>Website:</strong> Your company website URL</li>
                    <li><strong>Tax ID/VAT Number:</strong> Your tax identification number</li>
                    <li><strong>Registration Number:</strong> Company registration number (if applicable)</li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">💡 Important</p>
                    <p className="text-sm text-blue-800 mt-1">
                      This information appears on all your invoices, so ensure it's accurate and professional.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Updating Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>To update your business information:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Go to Settings from the main navigation</li>
                    <li>Select "Business Profile"</li>
                    <li>Click "Edit" next to the section you want to update</li>
                    <li>Make your changes in the form fields</li>
                    <li>Click "Save Changes" to apply updates</li>
                  </ol>
                  <div className="bg-amber-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-amber-900">⚠️ Note</p>
                    <p className="text-sm text-amber-800 mt-1">
                      Changes to your business information will only affect new invoices. Existing invoices remain unchanged.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Save className="h-5 w-5" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Keep your contact information current to ensure clients can reach you</li>
                    <li>Use your official business name as it appears on legal documents</li>
                    <li>Include all required tax information for your jurisdiction</li>
                    <li>Double-check spelling and formatting for professionalism</li>
                    <li>Update your address promptly if you relocate</li>
                    <li>Use a professional email address (avoid personal emails)</li>
                  </ul>
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-green-900">✓ Pro Tip</p>
                    <p className="text-sm text-green-800 mt-1">
                      Review your business information quarterly to ensure everything is up-to-date.
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
                      <Link to="/docs/setting-up-your-business-profile" className="text-primary hover:underline">
                        Setting Up Your Business Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/uploading-your-business-logo" className="text-primary hover:underline">
                        Uploading Your Business Logo
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/customizing-brand-colors" className="text-primary hover:underline">
                        Customizing Brand Colors
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

