import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { ArrowLeft, Building, User, MapPin, Mail, Phone, Globe, Crown } from "lucide-react";

export default function BusinessProfile() {
  return (
    <>
      <Helmet>
        <title>Setting Up Your Business Profile - ProInvoice Documentation</title>
        <meta name="description" content="Learn how to set up and configure your business profile for professional invoicing with ProInvoice." />
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
              <Building className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Setting Up Your Business Profile</h1>
              <p className="text-xl text-muted-foreground">
                Configure your business information to create professional, branded invoices automatically.
              </p>
            </div>

            <Alert className="mb-8 border-amber-200 bg-amber-50">
              <Crown className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-amber-900">
                <strong className="font-semibold">Pro Plan Required:</strong> Business profile management, logo upload, and brand customization features require a Pro or Agency plan.
                <Link to="/pricing" className="underline ml-1 font-medium">Upgrade to unlock these features</Link>
              </AlertDescription>
            </Alert>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Why Set Up Your Business Profile?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Your business profile is the foundation of professional invoicing:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Automatic Population:</strong> Information appears on all invoices automatically</li>
                    <li><strong>Professional Appearance:</strong> Complete business details build client trust</li>
                    <li><strong>Legal Compliance:</strong> Proper business information meets legal requirements</li>
                    <li><strong>Brand Consistency:</strong> Maintain consistent branding across all documents</li>
                    <li><strong>Time Saving:</strong> Set up once, use everywhere</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Business Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold mb-1">Business Name</h3>
                        <p className="text-sm text-muted-foreground">
                          Your legal business name or DBA (Doing Business As) name
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Business Type</h3>
                        <p className="text-sm text-muted-foreground">
                          LLC, Corporation, Sole Proprietorship, Partnership, etc.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Tax ID/EIN</h3>
                        <p className="text-sm text-muted-foreground">
                          Federal Employer Identification Number (if applicable)
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold mb-1">Industry</h3>
                        <p className="text-sm text-muted-foreground">
                          Type of business you operate (consulting, retail, etc.)
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Founded Date</h3>
                        <p className="text-sm text-muted-foreground">
                          When your business was established
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Business License</h3>
                        <p className="text-sm text-muted-foreground">
                          License number (if required in your industry)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Business Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Physical Address</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your business location where you operate from:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Street address with suite/unit number</li>
                        <li>City, state, and ZIP/postal code</li>
                        <li>Country (if serving international clients)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Mailing Address</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        If different from your physical address (optional):
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>P.O. Box or alternative mailing address</li>
                        <li>Use for receiving payments and correspondence</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Tip:</strong> For home-based businesses, consider using a P.O. Box or virtual business address for privacy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email Addresses
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li><strong>Primary Email:</strong> Main business email</li>
                        <li><strong>Billing Email:</strong> For invoice-related communication</li>
                        <li><strong>Support Email:</strong> Customer service contact</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        Phone Numbers
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li><strong>Main Phone:</strong> Primary business number</li>
                        <li><strong>Mobile:</strong> Direct contact number</li>
                        <li><strong>Fax:</strong> If still used in your industry</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      Online Presence
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li><strong>Website:</strong> Your business website URL</li>
                      <li><strong>Social Media:</strong> Professional social media profiles</li>
                      <li><strong>Portfolio:</strong> Online portfolio or showcase site</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment and Banking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Bank Account Details</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Set up where you want to receive payments:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Bank name and routing number</li>
                        <li>Account number for direct deposits</li>
                        <li>Account type (checking or savings)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Payment Terms</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Default payment terms for your invoices:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Net 15:</strong> Payment due in 15 days</li>
                        <li><strong>Net 30:</strong> Payment due in 30 days (most common)</li>
                        <li><strong>Due on Receipt:</strong> Payment due immediately</li>
                        <li><strong>Custom:</strong> Set your own terms</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Late Fee Policy</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Percentage fee for late payments</li>
                        <li>Grace period before fees apply</li>
                        <li>Maximum late fee amount</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Completing Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Step-by-Step Setup</h3>
                      <ol className="list-decimal list-inside space-y-2 ml-4 text-sm">
                        <li>Navigate to "Business Settings" in your dashboard</li>
                        <li>Fill in all required business information fields</li>
                        <li>Upload your business logo (optional but recommended)</li>
                        <li>Set your default payment terms and policies</li>
                        <li>Review and save your profile</li>
                        <li>Test by creating a sample invoice to see how it looks</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Profile Completion Tips</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Complete all fields for the most professional appearance</li>
                        <li>Use consistent formatting for addresses and phone numbers</li>
                        <li>Keep information current and update when changes occur</li>
                        <li>Review how your information appears on invoice previews</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Pro Tip:</strong> A complete business profile makes your invoices look more professional and can help you get paid faster by building client trust.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 pt-6">
                <Button asChild>
                  <Link to="/business-settings">Set Up Your Profile</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/docs/uploading-logo">Next: Uploading Your Logo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}