import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { ArrowLeft, Palette, Eye, Sparkles, Crown } from "lucide-react";

export default function CustomizingBrandColors() {
  return (
    <>
      <Helmet>
        <title>Customizing Brand Colors - ProInvoice Documentation</title>
        <meta name="description" content="Learn how to customize your invoice colors to match your brand identity." />
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
              <Palette className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Customizing Brand Colors</h1>
              <p className="text-xl text-muted-foreground">
                Make your invoices stand out with your brand's unique color scheme.
              </p>
            </div>

            <Alert className="mb-8 border-amber-200 bg-amber-50">
              <Crown className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-amber-900">
                <strong className="font-semibold">Pro Plan Required:</strong> Brand color customization is a premium feature available on Pro and Agency plans.
                <Link to="/pricing" className="underline ml-1 font-medium">Upgrade to customize your colors</Link>
              </AlertDescription>
            </Alert>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Setting Your Brand Colors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Customize your invoice colors to match your brand:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Navigate to Settings → Business Profile</li>
                    <li>Scroll to the "Brand Colors" section</li>
                    <li>Click on the color picker for each element</li>
                    <li>Choose your desired colors or enter hex codes</li>
                    <li>Preview your changes in real-time</li>
                    <li>Click "Save" to apply your color scheme</li>
                  </ol>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">💡 Quick Tip</p>
                    <p className="text-sm text-blue-800 mt-1">
                      You can customize colors for headers, accents, text, and backgrounds.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Customizable Elements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>You can customize colors for the following invoice elements:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Primary Color:</strong> Used for headers and main accents</li>
                    <li><strong>Secondary Color:</strong> Used for subtotals and highlights</li>
                    <li><strong>Text Color:</strong> Main body text color</li>
                    <li><strong>Background Color:</strong> Invoice background</li>
                    <li><strong>Border Color:</strong> Lines and separators</li>
                    <li><strong>Button Color:</strong> Call-to-action buttons</li>
                  </ul>
                  <div className="bg-purple-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-purple-900">✨ Pro Feature</p>
                    <p className="text-sm text-purple-800 mt-1">
                      Save multiple color schemes and switch between them for different clients or projects.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Color Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>Ensure Readability</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Choose colors with sufficient contrast between text and background for easy reading.
                  </p>
                  
                  <p><strong>Stay Professional</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    While bright colors can be eye-catching, ensure they maintain a professional appearance.
                  </p>
                  
                  <p><strong>Brand Consistency</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Use the same colors as your website and marketing materials for brand recognition.
                  </p>
                  
                  <p><strong>Test Printing</strong></p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Preview how your colors look when printed, as they may appear different on paper.
                  </p>
                  
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-green-900">✓ Accessibility Tip</p>
                    <p className="text-sm text-green-800 mt-1">
                      Use our built-in contrast checker to ensure your colors are accessible to all users.
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
                      <Link to="/docs/customizing-invoice-appearance" className="text-primary hover:underline">
                        Customizing Invoice Appearance
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/uploading-your-business-logo" className="text-primary hover:underline">
                        Uploading Your Business Logo
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/understanding-invoice-templates" className="text-primary hover:underline">
                        Understanding Invoice Templates
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

