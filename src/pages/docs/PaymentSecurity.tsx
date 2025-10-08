import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, CheckCircle, AlertTriangle } from "lucide-react";

export default function PaymentSecurity() {
  return (
    <>
      <Helmet>
        <title>Payment Security & Compliance - Invoice Pro Documentation</title>
        <meta name="description" content="Learn about payment security measures and compliance standards." />
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
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Payment Security & Compliance</h1>
              <p className="text-xl text-muted-foreground">
                Understanding how we protect your payments and maintain compliance.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Measures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Invoice Pro implements industry-leading security measures:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>SSL/TLS Encryption:</strong> All data transmitted is encrypted using 256-bit SSL</li>
                    <li><strong>PCI DSS Compliance:</strong> We never store credit card information on our servers</li>
                    <li><strong>Secure Payment Processors:</strong> Integration with trusted payment gateways</li>
                    <li><strong>Two-Factor Authentication:</strong> Optional 2FA for account access</li>
                    <li><strong>Regular Security Audits:</strong> Third-party security assessments</li>
                    <li><strong>Data Encryption:</strong> All sensitive data encrypted at rest</li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">🔒 Your Data is Safe</p>
                    <p className="text-sm text-blue-800 mt-1">
                      We use bank-level security to protect your financial information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    PCI DSS Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Payment Card Industry Data Security Standard (PCI DSS) is a set of security standards designed 
                    to ensure that all companies that accept, process, store, or transmit credit card information 
                    maintain a secure environment.
                  </p>
                  <p><strong>How We Maintain Compliance:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We never store credit card numbers on our servers</li>
                    <li>Payment data is tokenized by our payment processors</li>
                    <li>All payment forms use secure, PCI-compliant iframes</li>
                    <li>Regular vulnerability scans and penetration testing</li>
                    <li>Strict access controls and monitoring</li>
                  </ul>
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-green-900">✓ Certified Secure</p>
                    <p className="text-sm text-green-800 mt-1">
                      Our payment processing partners are Level 1 PCI DSS certified.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Data Privacy & GDPR
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>We are committed to protecting your privacy and complying with data protection regulations:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>GDPR Compliant:</strong> Full compliance with EU data protection regulations</li>
                    <li><strong>Data Minimization:</strong> We only collect necessary information</li>
                    <li><strong>Right to Access:</strong> You can request all data we have about you</li>
                    <li><strong>Right to Deletion:</strong> Request deletion of your data at any time</li>
                    <li><strong>Data Portability:</strong> Export your data in standard formats</li>
                    <li><strong>Consent Management:</strong> Clear opt-in for data processing</li>
                  </ul>
                  <div className="bg-purple-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-purple-900">🌍 Global Compliance</p>
                    <p className="text-sm text-purple-800 mt-1">
                      We comply with GDPR, CCPA, and other major privacy regulations worldwide.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Fraud Prevention
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Multiple layers of fraud protection:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Real-time Fraud Detection:</strong> AI-powered fraud screening</li>
                    <li><strong>3D Secure:</strong> Additional authentication for card payments</li>
                    <li><strong>Address Verification:</strong> AVS checks for card transactions</li>
                    <li><strong>CVV Verification:</strong> Card security code validation</li>
                    <li><strong>Velocity Checks:</strong> Monitoring for suspicious activity patterns</li>
                    <li><strong>IP Geolocation:</strong> Flagging unusual geographic patterns</li>
                  </ul>
                  <div className="bg-amber-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-amber-900">⚠️ Stay Vigilant</p>
                    <p className="text-sm text-amber-800 mt-1">
                      Report any suspicious activity immediately to our security team.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices for Users</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Protect your account and payments:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use a strong, unique password for your account</li>
                    <li>Enable two-factor authentication (2FA)</li>
                    <li>Never share your login credentials</li>
                    <li>Review your account activity regularly</li>
                    <li>Keep your contact information up-to-date</li>
                    <li>Log out when using shared computers</li>
                    <li>Be cautious of phishing emails</li>
                    <li>Report suspicious activity immediately</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supported Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>We support secure payment processing through:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Credit Cards:</strong> Visa, Mastercard, American Express, Discover</li>
                    <li><strong>Debit Cards:</strong> All major debit card networks</li>
                    <li><strong>ACH/Bank Transfers:</strong> Direct bank account payments</li>
                    <li><strong>Digital Wallets:</strong> Apple Pay, Google Pay</li>
                    <li><strong>International Payments:</strong> Multi-currency support</li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <p className="text-sm font-medium text-blue-900">💳 Flexible Options</p>
                    <p className="text-sm text-blue-800 mt-1">
                      All payment methods are processed through secure, PCI-compliant gateways.
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
                      <Link to="/docs/setting-up-payment-links" className="text-primary hover:underline">
                        Setting Up Payment Links
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs/managing-subscriptions" className="text-primary hover:underline">
                        Managing Subscriptions
                      </Link>
                    </li>
                    <li>
                      <Link to="/security" className="text-primary hover:underline">
                        Security Policy
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

