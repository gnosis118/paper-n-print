import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Palette, Image, Type, Eye } from "lucide-react";

export default function CustomizingAppearance() {
  return (
    <>
      <Helmet>
        <title>Customizing Invoice Appearance - Invoice Pro Documentation</title>
        <meta name="description" content="Learn how to customize your invoice appearance with colors, logos, fonts, and branding to match your business style." />
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
              <h1 className="text-4xl font-bold mb-4">Customizing Invoice Appearance</h1>
              <p className="text-xl text-muted-foreground">
                Make your invoices reflect your brand with custom colors, logos, and styling options.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Why Customize Your Invoices?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Customizing your invoice appearance helps you:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Build Brand Recognition:</strong> Consistent branding across all documents</li>
                    <li><strong>Look Professional:</strong> Stand out from generic invoice templates</li>
                    <li><strong>Build Trust:</strong> Professional appearance increases client confidence</li>
                    <li><strong>Improve Recognition:</strong> Clients easily identify your invoices</li>
                    <li><strong>Match Your Style:</strong> Reflect your business personality and values</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Color Customization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Accent Colors</h3>
                      <p className="text-sm mb-2">Choose colors that represent your brand:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Header backgrounds and borders</li>
                        <li>Button and link colors</li>
                        <li>Highlight elements and dividers</li>
                        <li>Table headers and important sections</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Color Best Practices</h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Do:</strong> Use colors from your existing brand palette
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Do:</strong> Ensure good contrast for readability
                          </p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Avoid:</strong> Using too many different colors
                          </p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Avoid:</strong> Bright colors that are hard to read
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Adding Your Logo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Logo Requirements</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Format:</strong> PNG, JPG, or SVG files</li>
                        <li><strong>Size:</strong> Recommended maximum 300x100 pixels</li>
                        <li><strong>Quality:</strong> High resolution for crisp printing</li>
                        <li><strong>Background:</strong> Transparent PNG works best</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">How to Upload Your Logo</h3>
                      <ol className="list-decimal list-inside space-y-2 ml-4 text-sm">
                        <li>Go to Business Settings in your dashboard</li>
                        <li>Click on "Upload Logo" or the logo placeholder</li>
                        <li>Select your logo file from your computer</li>
                        <li>Adjust the size and position if needed</li>
                        <li>Save your settings</li>
                      </ol>
                      <div className="bg-blue-50 p-3 rounded-lg mt-3">
                        <p className="text-sm text-blue-800">
                          <strong>Tip:</strong> Your logo will automatically appear on all future invoices once uploaded.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Logo Placement Options</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Top Left:</strong> Traditional placement, works with most layouts</li>
                        <li><strong>Top Center:</strong> Emphasizes your brand, good for wide logos</li>
                        <li><strong>Top Right:</strong> Balanced with business info on the left</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Typography and Fonts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Font Selection</h3>
                      <p className="text-sm mb-2">Different templates offer various font options:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Professional Fonts:</strong> Times New Roman, Arial, Helvetica</li>
                        <li><strong>Modern Fonts:</strong> Montserrat, Roboto, Open Sans</li>
                        <li><strong>Traditional Fonts:</strong> Georgia, Garamond, Minion Pro</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Font Size Guidelines</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li><strong>Business Name:</strong> 18-24pt (largest)</li>
                          <li><strong>Headings:</strong> 14-16pt (medium)</li>
                          <li><strong>Body Text:</strong> 10-12pt (standard)</li>
                          <li><strong>Fine Print:</strong> 8-9pt (smallest)</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Readability Tips</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Keep font sizes consistent throughout the invoice</li>
                        <li>Use bold text sparingly for emphasis</li>
                        <li>Ensure sufficient contrast between text and background</li>
                        <li>Test how your invoice looks when printed</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Layout and Spacing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">White Space</h3>
                      <p className="text-sm mb-2">Proper spacing makes invoices easier to read:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Leave adequate margins around the edges</li>
                        <li>Space between sections for clarity</li>
                        <li>Proper line height for text readability</li>
                        <li>Balance between content and empty space</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Section Organization</h3>
                      <p className="text-sm mb-2">Well-organized sections improve invoice flow:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Header:</strong> Business info and logo at the top</li>
                        <li><strong>Client Info:</strong> Clear billing address section</li>
                        <li><strong>Invoice Details:</strong> Number, date, and terms</li>
                        <li><strong>Line Items:</strong> Clear table with descriptions and amounts</li>
                        <li><strong>Totals:</strong> Prominent subtotal, tax, and total</li>
                        <li><strong>Payment Info:</strong> Instructions and terms at bottom</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Preview and Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Before Finalizing</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Preview Mode:</strong> Use the preview feature to see how it looks</li>
                        <li><strong>Print Test:</strong> Print a sample to check formatting</li>
                        <li><strong>Mobile View:</strong> Ensure it looks good on mobile devices</li>
                        <li><strong>Email Test:</strong> Send a test invoice to yourself</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Common Issues to Check</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Logo appears clearly and isn't pixelated</li>
                        <li>Colors display correctly in print and digital</li>
                        <li>Text is readable and properly aligned</li>
                        <li>All information fits on the page</li>
                        <li>Professional appearance across different devices</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Remember:</strong> Once you're happy with your customization, it will apply to all future invoices. You can always make changes later.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 pt-6">
                <Button asChild>
                  <Link to="/business-settings">Customize Your Invoices</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/docs/business-profile">Next: Business Settings</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}