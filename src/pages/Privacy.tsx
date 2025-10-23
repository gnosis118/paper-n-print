import React from 'react';
import PageLayout from '@/components/PageLayout';

const Privacy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PageLayout
      title="Privacy Policy - ProInvoice"
      description="Learn how ProInvoice collects, uses, and protects your personal information. Comprehensive privacy policy covering GDPR, CCPA, and global privacy standards."
      canonical={`${window.location.origin}/privacy`}
    >
      <div className="container max-w-4xl py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            <strong>Last Updated:</strong> {lastUpdated}
          </p>

          <div className="space-y-8">
            <section id="introduction">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction and Scope</h2>
              <p className="mb-4">
                Welcome to ProInvoice ("we," "our," or "us"). This Privacy Policy explains how we collect,
                use, disclose, and safeguard your personal information when you visit our website, use our services,
                or interact with us in other ways.
              </p>
              <p className="mb-4">
                This policy applies to all users worldwide and complies with applicable privacy laws including 
                the General Data Protection Regulation (GDPR), UK GDPR, California Consumer Privacy Act (CCPA), 
                and California Privacy Rights Act (CPRA).
              </p>
              <p>
                By using our services, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </section>

            <section id="definitions">
              <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
              <ul className="space-y-2">
                <li><strong>Personal Information:</strong> Information that identifies, relates to, or could reasonably be linked with you.</li>
                <li><strong>Processing:</strong> Any operation performed on personal information, including collection, use, storage, and deletion.</li>
                <li><strong>Services:</strong> Our invoice generation platform, templates, and related digital products.</li>
                <li><strong>Controller:</strong> The entity that determines the purposes and means of processing personal information.</li>
              </ul>
            </section>

            <section id="data-collection">
              <h2 className="text-2xl font-semibold mb-4">3. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-3">3.1 Information You Provide</h3>
              <ul className="mb-4 space-y-1">
                <li>Account information (name, email address, password)</li>
                <li>Profile information (company details, billing address)</li>
                <li>Payment information (processed by third-party providers)</li>
                <li>Invoice and template data you create</li>
                <li>Communications with our support team</li>
                <li>Survey responses and feedback</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">3.2 Information Collected Automatically</h3>
              <ul className="mb-4 space-y-1">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>Log files and error reports</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Location data (approximate, based on IP address)</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">3.3 Information from Third Parties</h3>
              <ul className="space-y-1">
                <li>Payment processors (transaction status, not card details)</li>
                <li>Analytics providers (aggregate usage statistics)</li>
                <li>Social media platforms (if you connect accounts)</li>
                <li>Business partners and affiliates</li>
              </ul>
            </section>

            <section id="purposes">
              <h2 className="text-2xl font-semibold mb-4">4. How We Use Your Information</h2>
              <p className="mb-4">We process your personal information for the following purposes:</p>
              
              <h3 className="text-xl font-medium mb-3">4.1 Service Provision</h3>
              <ul className="mb-4 space-y-1">
                <li>Creating and managing your account</li>
                <li>Providing invoice generation and template services</li>
                <li>Processing payments and managing subscriptions</li>
                <li>Storing and syncing your data across devices</li>
                <li>Providing customer support</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">4.2 Service Improvement</h3>
              <ul className="mb-4 space-y-1">
                <li>Analyzing usage patterns to improve our platform</li>
                <li>Developing new features and services</li>
                <li>Conducting research and analytics</li>
                <li>Testing and optimization</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">4.3 Communications</h3>
              <ul className="mb-4 space-y-1">
                <li>Sending transactional emails (receipts, notifications)</li>
                <li>Providing customer support</li>
                <li>Sending marketing communications (with consent)</li>
                <li>Notifying you of policy changes</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">4.4 Legal and Security</h3>
              <ul className="space-y-1">
                <li>Complying with legal obligations</li>
                <li>Protecting against fraud and abuse</li>
                <li>Enforcing our terms of service</li>
                <li>Defending our legal rights</li>
              </ul>
            </section>

            <section id="legal-basis">
              <h2 className="text-2xl font-semibold mb-4">5. Legal Basis for Processing (GDPR)</h2>
              <p className="mb-4">For users in the EU/UK, we process your personal information based on:</p>
              <ul className="space-y-2">
                <li><strong>Contract:</strong> Processing necessary to provide our services and fulfill our contractual obligations</li>
                <li><strong>Legitimate Interests:</strong> Improving our services, fraud prevention, and business operations</li>
                <li><strong>Consent:</strong> Marketing communications and non-essential cookies (you may withdraw consent anytime)</li>
                <li><strong>Legal Obligation:</strong> Compliance with applicable laws and regulations</li>
              </ul>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your experience. For detailed information about 
                our cookie practices, please visit our <a href="/cookies" className="text-primary hover:underline">Cookie Preferences</a> page.
              </p>
              <p className="mb-4">Types of cookies we use:</p>
              <ul className="space-y-2">
                <li><strong>Strictly Necessary:</strong> Essential for basic website functionality</li>
                <li><strong>Functional:</strong> Remember your preferences and settings</li>
                <li><strong>Analytics:</strong> Help us understand how you use our services</li>
                <li><strong>Advertising:</strong> Deliver relevant ads and measure their effectiveness</li>
              </ul>
            </section>

            <section id="sharing">
              <h2 className="text-2xl font-semibold mb-4">7. Information Sharing and Disclosure</h2>
              <p className="mb-4">We may share your information in the following circumstances:</p>
              
              <h3 className="text-xl font-medium mb-3">7.1 Service Providers</h3>
              <p className="mb-4">
                We work with trusted third-party providers who assist us in operating our platform, 
                including hosting, analytics, payment processing, and customer support. These providers 
                are contractually bound to protect your information and use it only for specified purposes.
              </p>

              <h3 className="text-xl font-medium mb-3">7.2 Business Partners</h3>
              <p className="mb-4">
                With your consent, we may share information with business partners for joint marketing 
                initiatives or integrated services.
              </p>

              <h3 className="text-xl font-medium mb-3">7.3 Legal Requirements</h3>
              <p className="mb-4">
                We may disclose information when required by law, to protect our rights, or to investigate 
                potential violations of our terms of service.
              </p>

              <h3 className="text-xl font-medium mb-3">7.4 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, user information may be 
                transferred as part of the transaction.
              </p>
            </section>

            <section id="international-transfers">
              <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be processed in countries other than your country of residence. 
                When we transfer personal information internationally, we implement appropriate safeguards, 
                including Standard Contractual Clauses (SCCs) approved by the European Commission.
              </p>
              <p>
                We ensure that all international transfers comply with applicable data protection laws 
                and provide adequate protection for your personal information.
              </p>
            </section>

            <section id="retention">
              <h2 className="text-2xl font-semibold mb-4">9. Data Retention</h2>
              <p className="mb-4">We retain your personal information only as long as necessary for the purposes outlined in this policy:</p>
              <ul className="space-y-2">
                <li><strong>Account Data:</strong> Retained while your account is active and for 3 years after account deletion</li>
                <li><strong>Transaction Records:</strong> Retained for 7 years to comply with financial regulations</li>
                <li><strong>Usage Analytics:</strong> Retained in aggregated form for 2 years</li>
                <li><strong>Marketing Data:</strong> Retained until you withdraw consent or 3 years of inactivity</li>
                <li><strong>Legal Disputes:</strong> Retained until resolution plus applicable statute of limitations</li>
              </ul>
            </section>

            <section id="security">
              <h2 className="text-2xl font-semibold mb-4">10. Data Security</h2>
              <p className="mb-4">
                We implement reasonable technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="mb-4 space-y-1">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
                <li>Incident response procedures</li>
              </ul>
              <p>
                However, no method of transmission over the internet or electronic storage is 100% secure. 
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section id="your-rights">
              <h2 className="text-2xl font-semibold mb-4">11. Your Privacy Rights</h2>
              
              <h3 className="text-xl font-medium mb-3">11.1 California Residents (CCPA/CPRA)</h3>
              <p className="mb-4">If you are a California resident, you have the right to:</p>
              <ul className="mb-4 space-y-1">
                <li><strong>Know:</strong> What personal information we collect and how we use it</li>
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Delete:</strong> Request deletion of your personal information</li>
                <li><strong>Correct:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Opt-Out:</strong> Opt out of the sale or sharing of personal information</li>
                <li><strong>Limit:</strong> Limit the use of sensitive personal information</li>
                <li><strong>Non-Discrimination:</strong> Not be discriminated against for exercising these rights</li>
              </ul>
              <p className="mb-4">
                We honor Global Privacy Control (GPC) signals as opt-out requests for the sale/sharing of personal information.
              </p>

              <h3 className="text-xl font-medium mb-3">11.2 EU/UK Residents (GDPR/UK GDPR)</h3>
              <p className="mb-4">If you are in the EU or UK, you have the right to:</p>
              <ul className="mb-4 space-y-1">
                <li><strong>Access:</strong> Obtain confirmation of processing and access to your data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Restriction:</strong> Limit processing of your data in certain circumstances</li>
                <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for consent-based processing</li>
                <li><strong>Lodge Complaints:</strong> File complaints with supervisory authorities</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">11.3 Exercising Your Rights</h3>
              <p className="mb-4">
                To exercise your privacy rights, please contact us using the information in the Contact section below. 
                We will respond to your request within the timeframes required by applicable law (typically 30 days for GDPR, 45 days for CCPA).
              </p>
              <p>
                We may need to verify your identity before processing your request. For security purposes, 
                we may request additional information to confirm your identity.
              </p>
            </section>

            <section id="children">
              <h2 className="text-2xl font-semibold mb-4">12. Children's Privacy</h2>
              <p className="mb-4">
                Our services are not directed to children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If we become aware that we have collected personal 
                information from a child under 13, we will take steps to delete such information promptly.
              </p>
              <p>
                Parents or guardians who believe their child has provided personal information to us should 
                contact us immediately using the contact information below.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">13. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, 
                technology, legal requirements, or other factors. When we make changes, we will:
              </p>
              <ul className="mb-4 space-y-1">
                <li>Update the "Last Updated" date at the top of this policy</li>
                <li>Notify you via email if you have an account with us</li>
                <li>Post a notice on our website for material changes</li>
                <li>Obtain your consent if required by applicable law</li>
              </ul>
              <p>
                We encourage you to review this Privacy Policy periodically to stay informed about how 
                we protect your information.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or wish to exercise your privacy rights, 
                please contact us:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong>Data Controller:</strong> Gavin Clay</p>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:gavin@currencytocurrency.app" className="text-primary hover:underline">gavin@currencytocurrency.app</a></p>
                <p className="mb-2"><strong>Phone:</strong> <a href="tel:916-969-3705" className="text-primary hover:underline">916-969-3705</a></p>
                <p className="text-sm text-muted-foreground">
                  For GDPR-related inquiries, you may also contact your local data protection authority.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;