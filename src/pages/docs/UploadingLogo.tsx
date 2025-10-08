import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Image, Upload, CheckCircle, AlertCircle } from "lucide-react";

export default function UploadingLogo() {
  return (
    <>
      <Helmet>
        <title>Uploading Your Business Logo - Invoice Pro Documentation</title>
        <meta name="description" content="Learn how to upload and customize your business logo for professional invoices." />
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
              <Image className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Uploading Your Business Logo</h1>
              <p className="text-xl text-muted-foreground">
                Add your business logo to create professional, branded invoices.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    How to Upload Your Logo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Follow these steps to add your business logo:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Navigate to Settings from the main menu</li>
                    <li>Click on "Business Profile"</li>
                    <li>Find the "Business Logo" section</li>
                    <li>Click "Upload Logo" or drag and drop your image file</li>
                    <li>Adjust the positioning if needed</li>
                    <li>Click "Save" to apply your logo</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">💡 Pro Tip</p>
                    <p className="text-sm text-blue-800 mt-1">
                      Your logo will automatically appear on all new invoices you create.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Logo Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>For best results, your logo should meet these specifications:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>File Format:</strong> PNG, JPG, or SVG</li>
                    <li><strong>Recommended Size:</strong> 500x500 pixels minimum</li>
                    <li><strong>Maximum File Size:</strong> 5MB</li>
                    <li><strong>Background:</strong> Transparent PNG recommended for best results</li>
                    <li><strong>Aspect Ratio:</strong> Square or horizontal logos work best</li>
                  </ul>
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-green-900">✓ Best Practice</p>
                    <p className="text-sm text-green-800 mt-1">
                      Use a high-resolution logo with a transparent background for the most professional appearance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Troubleshooting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>Logo appears blurry or pixelated?</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Upload a higher resolution version of your logo. We recommend at least 500x500 pixels.
                  </p>
                  
                  <p><strong>Logo is too large or too small?</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Use the size adjustment controls in the logo upload section to scale your logo appropriately.
                  </p>
                  
                  <p><strong>Can't upload my logo?</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Ensure your file is under 5MB and in a supported format (PNG, JPG, or SVG). Try converting your file if needed.
                  </p>
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
                      <Link to="/docs/customizing-brand-colors" className="text-primary hover:underline">
                        Customizing Brand Colors
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/managing-business-information" className="text-primary hover:underline">
                        Managing Business Information
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

