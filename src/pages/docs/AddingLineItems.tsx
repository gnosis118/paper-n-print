import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, Plus, DollarSign, Hash } from "lucide-react";

export default function AddingLineItems() {
  return (
    <>
      <Helmet>
        <title>Adding Line Items and Calculations - ProInvoice Documentation</title>
        <meta name="description" content="Learn how to add line items, set quantities and rates, and understand automatic calculations in your invoices." />
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
              <Calculator className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Adding Line Items and Calculations</h1>
              <p className="text-xl text-muted-foreground">
                Master the art of itemizing your services and products with accurate calculations.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Understanding Line Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Line items are individual entries on your invoice that describe what you're charging for. 
                    Each line item consists of four main components:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground">
                        Clear explanation of the product or service provided
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-1">
                        <Hash className="h-4 w-4" />
                        Quantity
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Number of units, hours, or items provided
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Rate
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Price per unit, hourly rate, or fixed price
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-1">
                        <Calculator className="h-4 w-4" />
                        Amount
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Automatically calculated (Quantity × Rate)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How to Add Line Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-3 ml-4">
                    <li>
                      <strong>Click "Add Line Item"</strong>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        This creates a new row in your invoice for another product or service.
                      </p>
                    </li>
                    <li>
                      <strong>Enter Description</strong>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Be specific about what you're providing. Examples: "Website Design", "Plumbing Repair", "Consulting Hours"
                      </p>
                    </li>
                    <li>
                      <strong>Set Quantity</strong>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Enter the number of units or hours. Use decimals for partial quantities (e.g., 2.5 hours).
                      </p>
                    </li>
                    <li>
                      <strong>Enter Rate</strong>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        Your price per unit. This could be hourly rate, per-item cost, or fixed project price.
                      </p>
                    </li>
                    <li>
                      <strong>Amount Calculates Automatically</strong>
                      <p className="text-sm text-muted-foreground ml-6 mt-1">
                        The system multiplies quantity by rate to show the line total.
                      </p>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices for Line Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Be Descriptive</h3>
                      <div className="bg-green-50 p-3 rounded-lg mb-2">
                        <p className="text-sm text-green-800">
                          <strong>Good:</strong> "Website homepage design and development - 40 hours"
                        </p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-red-800">
                          <strong>Avoid:</strong> "Work done"
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Group Related Items</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Combine similar tasks into one line item when appropriate</li>
                        <li>Separate different types of work or products</li>
                        <li>Use separate lines for different rates or billing periods</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Use Consistent Units</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Hours for time-based work</li>
                        <li>Units/pieces for products</li>
                        <li>Square feet for area-based pricing</li>
                        <li>Fixed amount (quantity of 1) for project-based work</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Understanding Calculations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Automatic Calculations</h3>
                      <p className="text-sm mb-2">ProInvoice automatically calculates:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>Line Total:</strong> Quantity × Rate</li>
                        <li><strong>Subtotal:</strong> Sum of all line items</li>
                        <li><strong>Tax Amount:</strong> Subtotal × Tax Rate (if applicable)</li>
                        <li><strong>Invoice Total:</strong> Subtotal + Tax + Other Charges</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Adding Discounts</h3>
                      <p className="text-sm mb-2">You can add discounts in several ways:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Create a line item with a negative amount</li>
                        <li>Use the discount field (if available in your template)</li>
                        <li>Apply percentage discounts to the subtotal</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Tax Calculations</h3>
                      <p className="text-sm mb-2">Set your tax rate once, and it applies to all taxable items:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Enter your local tax rate as a percentage</li>
                        <li>Mark items as taxable or non-taxable</li>
                        <li>Tax is calculated on the subtotal of taxable items only</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Line Item Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-3">Service-Based Examples</h3>
                      <div className="space-y-2 text-sm">
                        <div className="border-l-4 border-blue-500 pl-3">
                          <p><strong>Consulting Services</strong></p>
                          <p className="text-muted-foreground">Qty: 8 hours | Rate: $150/hr</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-3">
                          <p><strong>Website Maintenance</strong></p>
                          <p className="text-muted-foreground">Qty: 1 month | Rate: $500</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-3">
                          <p><strong>Plumbing Repair</strong></p>
                          <p className="text-muted-foreground">Qty: 3 hours | Rate: $95/hr</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Product-Based Examples</h3>
                      <div className="space-y-2 text-sm">
                        <div className="border-l-4 border-orange-500 pl-3">
                          <p><strong>Business Cards (Premium)</strong></p>
                          <p className="text-muted-foreground">Qty: 500 cards | Rate: $0.50/ea</p>
                        </div>
                        <div className="border-l-4 border-red-500 pl-3">
                          <p><strong>Software License</strong></p>
                          <p className="text-muted-foreground">Qty: 1 license | Rate: $299</p>
                        </div>
                        <div className="border-l-4 border-teal-500 pl-3">
                          <p><strong>Pipe Fittings</strong></p>
                          <p className="text-muted-foreground">Qty: 12 units | Rate: $15/ea</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 pt-6">
                <Button asChild>
                  <Link to="/invoice">Practice Adding Line Items</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/docs/customizing-appearance">Next: Customizing Appearance</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}