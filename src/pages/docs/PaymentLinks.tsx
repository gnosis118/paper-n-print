import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Link as LinkIcon, Shield, Smartphone, QrCode } from "lucide-react";

export default function PaymentLinks() {
  return (
    <>
      <Helmet>
        <title>Setting Up Payment Links - ProInvoice Documentation</title>
        <meta name="description" content="Learn how to set up secure payment links for your invoices to get paid faster with multiple payment options." />
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
              <CreditCard className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Setting Up Payment Links</h1>
              <p className="text-xl text-muted-foreground">
                Make it easy for clients to pay you with secure, professional payment links.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>What Are Payment Links?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Payment links are secure URLs that allow your clients to pay invoices online with just a few clicks. 
                    They're automatically generated for each invoice and provide a seamless payment experience.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Benefits for You</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                        <li>Get paid faster (average 65% reduction in payment time)</li>
                        <li>Reduce manual payment processing</li>
                        <li>Automatic payment confirmations</li>
                        <li>Real-time payment tracking</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Benefits for Clients</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                        <li>Pay from any device, anywhere</li>
                        <li>Multiple payment method options</li>
                        <li>Secure, encrypted transactions</li>
                        <li>Instant payment confirmation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    How Payment Links Work
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h3 className="font-semibold">Create Invoice</h3>
                        <p className="text-sm text-muted-foreground">When you create an invoice, a payment link is automatically generated</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h3 className="font-semibold">Send to Client</h3>
                        <p className="text-sm text-muted-foreground">The payment link is included in the invoice email or can be shared separately</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h3 className="font-semibold">Client Pays</h3>
                        <p className="text-sm text-muted-foreground">Client clicks the link and completes payment using their preferred method</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                      <div>
                        <h3 className="font-semibold">Automatic Updates</h3>
                        <p className="text-sm text-muted-foreground">Invoice status updates automatically and you receive payment confirmation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supported Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-3">Credit & Debit Cards</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Visa, MasterCard, American Express</li>
                        <li>Discover, Diners Club, JCB</li>
                        <li>International cards accepted</li>
                        <li>Secure tokenization for saved cards</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Digital Wallets</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Apple Pay (iPhone, iPad, Mac)</li>
                        <li>Google Pay (Android, Chrome)</li>
                        <li>Samsung Pay</li>
                        <li>One-click payment experience</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Bank Transfers (ACH)</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Direct bank account payments</li>
                        <li>Lower processing fees</li>
                        <li>Ideal for larger amounts</li>
                        <li>Secure bank-level encryption</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Buy Now, Pay Later</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Afterpay, Klarna integration</li>
                        <li>Split payments into installments</li>
                        <li>No additional fees for merchants</li>
                        <li>Increases conversion rates</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Payment Security</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>PCI DSS Compliant:</strong> Highest level of payment security standards</li>
                        <li><strong>SSL Encryption:</strong> All payment data encrypted in transit</li>
                        <li><strong>Tokenization:</strong> Card details never stored on our servers</li>
                        <li><strong>Fraud Detection:</strong> Advanced AI-powered fraud prevention</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Data Protection</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li><strong>GDPR Compliant:</strong> European data protection standards</li>
                        <li><strong>SOC 2 Type II:</strong> Audited security controls</li>
                        <li><strong>Data Encryption:</strong> All data encrypted at rest and in transit</li>
                        <li><strong>Regular Security Audits:</strong> Third-party security assessments</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Trust Badge:</strong> Display security badges on payment pages to increase client confidence and conversion rates.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Mobile-Friendly Payments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Responsive Design</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Optimized for all screen sizes</li>
                        <li>Touch-friendly interface</li>
                        <li>Fast loading on mobile networks</li>
                        <li>Works on all modern browsers</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-1">
                        <QrCode className="h-4 w-4" />
                        QR Code Payments
                      </h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Automatic QR code generation for each invoice</li>
                        <li>Scan with any smartphone camera</li>
                        <li>Perfect for in-person payments</li>
                        <li>Include QR codes on printed invoices</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Mobile Wallet Integration</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Apple Pay with Touch ID/Face ID</li>
                        <li>Google Pay with biometric authentication</li>
                        <li>Samsung Pay with Samsung Knox security</li>
                        <li>One-tap payment completion</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Link Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Email Communication</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Include a clear call-to-action button</li>
                        <li>Explain the payment process briefly</li>
                        <li>Mention accepted payment methods</li>
                        <li>Include payment deadline information</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Follow-Up Strategy</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Send payment reminders before due dates</li>
                        <li>Include payment links in all communications</li>
                        <li>Offer multiple ways to access payment options</li>
                        <li>Provide customer support contact information</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Conversion Optimization</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Keep payment forms simple and short</li>
                        <li>Display security badges prominently</li>
                        <li>Offer multiple payment method options</li>
                        <li>Provide clear pricing and fee information</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Troubleshooting Payment Issues</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Common Issues & Solutions</h3>
                      <div className="space-y-3">
                        <div className="border-l-4 border-yellow-500 pl-3">
                          <p className="font-medium text-sm">Payment link not working</p>
                          <p className="text-sm text-muted-foreground">Check if invoice is still in draft status or payment link has expired</p>
                        </div>
                        <div className="border-l-4 border-yellow-500 pl-3">
                          <p className="font-medium text-sm">Card declined</p>
                          <p className="text-sm text-muted-foreground">Advise client to check with their bank or try alternative payment method</p>
                        </div>
                        <div className="border-l-4 border-yellow-500 pl-3">
                          <p className="font-medium text-sm">Payment not showing as received</p>
                          <p className="text-sm text-muted-foreground">Check payment processor dashboard or contact support for transaction status</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Client Support</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Provide clear instructions for payment process</li>
                        <li>Include troubleshooting tips in payment emails</li>
                        <li>Offer alternative payment methods</li>
                        <li>Have contact information readily available</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 pt-6">
                <Button asChild>
                  <Link to="/invoice">Create Invoice with Payment Link</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/docs/payment-terms">Next: Understanding Payment Terms</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}