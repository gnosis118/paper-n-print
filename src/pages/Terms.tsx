import React from 'react';
import PageLayout from '@/components/PageLayout';

const Terms = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PageLayout
      title="Terms of Service"
      description="Read our Terms of Service to understand the rules and regulations governing the use of Invoice Generator platform and services."
      canonical={`${window.location.origin}/terms`}
    >
      <div className="container max-w-4xl py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            <strong>Last Updated:</strong> {lastUpdated}
          </p>

          <div className="space-y-8">
            <section id="acceptance">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                Welcome to Invoice Generator. These Terms of Service ("Terms") constitute a legally binding 
                agreement between you ("you," "your," or "User") and Invoice Generator ("we," "our," or "us") 
                regarding your use of our website, platform, and services.
              </p>
              <p className="mb-4">
                By accessing or using our services, you acknowledge that you have read, understood, and agree 
                to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, 
                please do not use our services.
              </p>
              <p>
                We reserve the right to modify these Terms at any time. Your continued use of our services 
                following any changes constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section id="eligibility">
              <h2 className="text-2xl font-semibold mb-4">2. Eligibility and Account Requirements</h2>
              
              <h3 className="text-xl font-medium mb-3">2.1 Age and Capacity</h3>
              <p className="mb-4">
                You must be at least 18 years old and have the legal capacity to enter into binding contracts 
                in your jurisdiction to use our services. If you are using our services on behalf of an 
                organization, you represent that you have the authority to bind that organization to these Terms.
              </p>

              <h3 className="text-xl font-medium mb-3">2.2 Account Registration</h3>
              <p className="mb-4">
                To access certain features, you must create an account by providing accurate, current, and 
                complete information. You are responsible for:
              </p>
              <ul className="mb-4 space-y-1">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Promptly notifying us of any unauthorized use</li>
                <li>Ensuring your account information remains accurate and up-to-date</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">2.3 Account Security</h3>
              <p>
                You must use a strong password and keep your login credentials secure. We recommend enabling 
                two-factor authentication where available. You agree to immediately notify us of any suspected 
                unauthorized access to your account.
              </p>
            </section>

            <section id="services">
              <h2 className="text-2xl font-semibold mb-4">3. Description of Services</h2>
              <p className="mb-4">
                Invoice Generator provides digital tools and templates for creating professional invoices 
                and managing billing processes. Our services include:
              </p>
              <ul className="mb-4 space-y-1">
                <li>Invoice creation and customization tools</li>
                <li>Professional invoice templates</li>
                <li>Payment processing integration</li>
                <li>Data storage and synchronization</li>
                <li>Customer support and documentation</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, 
                with or without notice, though we will make reasonable efforts to provide advance notice of 
                material changes.
              </p>
            </section>

            <section id="acceptable-use">
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>
              
              <h3 className="text-xl font-medium mb-3">4.1 Permitted Uses</h3>
              <p className="mb-4">
                You may use our services for lawful business and personal purposes in accordance with these Terms 
                and applicable laws.
              </p>

              <h3 className="text-xl font-medium mb-3">4.2 Prohibited Activities</h3>
              <p className="mb-4">You agree not to:</p>
              <ul className="mb-4 space-y-1">
                <li>Use our services for any illegal, fraudulent, or harmful activities</li>
                <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                <li>Upload or transmit malware, viruses, or other harmful code</li>
                <li>Scrape, spider, or crawl our services using automated means</li>
                <li>Reverse engineer, decompile, or disassemble our software</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the intellectual property rights of others</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Create fake or misleading invoices for fraudulent purposes</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">4.3 Compliance with Laws</h3>
              <p>
                You are responsible for ensuring your use of our services complies with all applicable 
                local, state, national, and international laws and regulations, including tax laws, 
                data protection regulations, and business licensing requirements.
              </p>
            </section>

            <section id="payments">
              <h2 className="text-2xl font-semibold mb-4">5. Payments and Billing</h2>
              
              <h3 className="text-xl font-medium mb-3">5.1 Subscription Plans</h3>
              <p className="mb-4">
                We offer various subscription plans with different features and pricing. Current pricing 
                is available on our pricing page. Subscription fees are billed in advance on a recurring basis.
              </p>

              <h3 className="text-xl font-medium mb-3">5.2 Payment Processing</h3>
              <p className="mb-4">
                Payments are processed by third-party payment processors. We do not store your complete 
                payment card information. By providing payment information, you authorize us to charge 
                the applicable fees to your chosen payment method.
              </p>

              <h3 className="text-xl font-medium mb-3">5.3 Automatic Renewal</h3>
              <p className="mb-4">
                Subscriptions automatically renew at the end of each billing period unless cancelled. 
                You may cancel your subscription at any time through your account settings or by contacting 
                customer support.
              </p>

              <h3 className="text-xl font-medium mb-3">5.4 Refunds</h3>
              <p className="mb-4">
                We offer refunds in accordance with our refund policy. Generally, subscription fees are 
                non-refundable, but we may provide refunds at our discretion for unused portions of 
                subscriptions cancelled within 30 days of initial purchase.
              </p>

              <h3 className="text-xl font-medium mb-3">5.5 Taxes</h3>
              <p>
                You are responsible for any applicable taxes, duties, or fees related to your use of our 
                services. Prices displayed may not include applicable taxes, which will be added at checkout 
                where required by law.
              </p>
            </section>

            <section id="intellectual-property">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-medium mb-3">6.1 Our Intellectual Property</h3>
              <p className="mb-4">
                Invoice Generator and all related materials, including but not limited to software, templates, 
                designs, text, graphics, logos, and trademarks, are owned by us or our licensors and are 
                protected by intellectual property laws.
              </p>

              <h3 className="text-xl font-medium mb-3">6.2 Limited License</h3>
              <p className="mb-4">
                We grant you a limited, non-exclusive, non-transferable, revocable license to use our services 
                for their intended purpose in accordance with these Terms. This license does not grant you 
                any rights to our underlying software or intellectual property.
              </p>

              <h3 className="text-xl font-medium mb-3">6.3 User-Generated Content</h3>
              <p className="mb-4">
                You retain ownership of the content you create using our services. However, by using our 
                services, you grant us a non-exclusive, worldwide, royalty-free license to use, store, 
                and process your content solely for the purpose of providing our services to you.
              </p>

              <h3 className="text-xl font-medium mb-3">6.4 Feedback</h3>
              <p>
                Any feedback, suggestions, or ideas you provide to us become our property and may be used 
                to improve our services without any obligation to compensate you.
              </p>
            </section>

            <section id="dmca">
              <h2 className="text-2xl font-semibold mb-4">7. DMCA Copyright Policy</h2>
              <p className="mb-4">
                We respect intellectual property rights and respond to valid notices of alleged copyright 
                infringement in accordance with the Digital Millennium Copyright Act (DMCA).
              </p>
              <p className="mb-4">
                If you believe your copyrighted work has been infringed, please send a DMCA notice to:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p><strong>DMCA Agent:</strong> [PLACEHOLDER EMAIL]</p>
                <p><strong>Subject Line:</strong> DMCA Takedown Notice</p>
              </div>
              <p>
                Your notice must include all information required by the DMCA, including a description of 
                the copyrighted work, identification of the infringing material, your contact information, 
                and a statement of good faith belief that the use is not authorized.
              </p>
            </section>

            <section id="disclaimers">
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimers and Warranties</h2>
              
              <h3 className="text-xl font-medium mb-3">8.1 Service Availability</h3>
              <p className="mb-4">
                Our services are provided "as is" and "as available." We do not guarantee continuous, 
                uninterrupted, or error-free operation of our services. We may experience downtime for 
                maintenance, updates, or due to factors beyond our control.
              </p>

              <h3 className="text-xl font-medium mb-3">8.2 Disclaimer of Warranties</h3>
              <p className="mb-4">
                TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                NON-INFRINGEMENT, AND TITLE. WE DO NOT WARRANT THAT OUR SERVICES WILL MEET YOUR REQUIREMENTS 
                OR BE FREE FROM ERRORS, VIRUSES, OR OTHER HARMFUL COMPONENTS.
              </p>

              <h3 className="text-xl font-medium mb-3">8.3 Third-Party Services</h3>
              <p>
                Our platform may integrate with third-party services (such as payment processors). 
                We are not responsible for the availability, accuracy, or functionality of these third-party 
                services, and your use of such services is subject to their respective terms and policies.
              </p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL INVOICE GENERATOR, ITS OFFICERS, 
                DIRECTORS, EMPLOYEES, AGENTS, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, 
                USE, OR GOODWILL, ARISING OUT OF OR RELATING TO YOUR USE OF OUR SERVICES.
              </p>
              <p className="mb-4">
                OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR 
                OUR SERVICES SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE TWELVE 
                MONTHS PRECEDING THE CLAIM OR (B) $100.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion or limitation of liability for consequential 
                or incidental damages, so the above limitations may not apply to you.
              </p>
            </section>

            <section id="indemnification">
              <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Invoice Generator and its officers, 
                directors, employees, agents, and suppliers from and against any claims, liabilities, 
                damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of 
                or relating to: (a) your use of our services, (b) your violation of these Terms, 
                (c) your violation of any applicable laws or rights of third parties, or (d) any content 
                you submit or transmit through our services.
              </p>
            </section>

            <section id="governing-law">
              <h2 className="text-2xl font-semibold mb-4">11. Governing Law and Dispute Resolution</h2>
              
              <h3 className="text-xl font-medium mb-3">11.1 Governing Law</h3>
              <p className="mb-4">
                These Terms are governed by and construed in accordance with the laws of the State of 
                California, without regard to its conflict of law provisions.
              </p>

              <h3 className="text-xl font-medium mb-3">11.2 Informal Dispute Resolution</h3>
              <p className="mb-4">
                Before initiating any formal dispute resolution, you agree to first contact us to attempt 
                to resolve the dispute informally. Please send a detailed description of your dispute to 
                <a href="mailto:gavin@currencytocurrency.app" className="text-primary hover:underline ml-1">gavin@currencytocurrency.app</a>.
              </p>

              <h3 className="text-xl font-medium mb-3">11.3 Binding Arbitration</h3>
              <p className="mb-4">
                If we cannot resolve a dispute informally within 60 days, any dispute arising out of or 
                relating to these Terms or our services shall be resolved through binding arbitration 
                administered by the American Arbitration Association (AAA) under its Commercial Arbitration 
                Rules. The arbitration shall take place in California, and judgment on the arbitration 
                award may be entered in any court having jurisdiction.
              </p>

              <h3 className="text-xl font-medium mb-3">11.4 Arbitration Opt-Out</h3>
              <p className="mb-4">
                You may opt out of binding arbitration by sending written notice to us within 30 days of 
                first accepting these Terms. Your opt-out notice must include your name, address, and a 
                clear statement that you wish to opt out of binding arbitration.
              </p>

              <h3 className="text-xl font-medium mb-3">11.5 Class Action Waiver</h3>
              <p>
                You agree that any arbitration or court proceeding shall be limited to the dispute between 
                you and us individually. You waive any right to participate in class action lawsuits or 
                class-wide arbitrations.
              </p>
            </section>

            <section id="termination">
              <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
              
              <h3 className="text-xl font-medium mb-3">12.1 Termination by You</h3>
              <p className="mb-4">
                You may terminate your account at any time by canceling your subscription and deleting 
                your account through your account settings or by contacting customer support.
              </p>

              <h3 className="text-xl font-medium mb-3">12.2 Termination by Us</h3>
              <p className="mb-4">
                We may terminate or suspend your account immediately, without prior notice, if you violate 
                these Terms or engage in conduct that we determine, in our sole discretion, to be harmful 
                to us, other users, or third parties.
              </p>

              <h3 className="text-xl font-medium mb-3">12.3 Effect of Termination</h3>
              <p>
                Upon termination, your right to use our services will cease immediately. We will make 
                reasonable efforts to provide you with access to your data for a limited time following 
                termination, but we are not obligated to retain your data indefinitely.
              </p>
            </section>

            <section id="general">
              <h2 className="text-2xl font-semibold mb-4">13. General Provisions</h2>
              
              <h3 className="text-xl font-medium mb-3">13.1 Entire Agreement</h3>
              <p className="mb-4">
                These Terms, together with our Privacy Policy and any other policies referenced herein, 
                constitute the entire agreement between you and us regarding your use of our services.
              </p>

              <h3 className="text-xl font-medium mb-3">13.2 Severability</h3>
              <p className="mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions 
                will remain in full force and effect.
              </p>

              <h3 className="text-xl font-medium mb-3">13.3 Waiver</h3>
              <p className="mb-4">
                Our failure to enforce any provision of these Terms shall not constitute a waiver of that 
                provision or any other provision.
              </p>

              <h3 className="text-xl font-medium mb-3">13.4 Assignment</h3>
              <p>
                You may not assign or transfer these Terms or your account without our prior written consent. 
                We may assign these Terms without restriction.
              </p>
            </section>

            <section id="changes-to-terms">
              <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. When we make changes, we will:
              </p>
              <ul className="mb-4 space-y-1">
                <li>Update the "Last Updated" date at the top of these Terms</li>
                <li>Notify you via email if you have an account with us</li>
                <li>Post a notice on our website for material changes</li>
                <li>Provide at least 30 days' notice for changes that materially reduce your rights</li>
              </ul>
              <p>
                Your continued use of our services after the effective date of revised Terms constitutes 
                acceptance of the changes.
              </p>
            </section>

            <section id="contact-terms">
              <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
              <p className="mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong>Contact:</strong> Gavin Clay</p>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:gavin@currencytocurrency.app" className="text-primary hover:underline">gavin@currencytocurrency.app</a></p>
                <p className="mb-2"><strong>Phone:</strong> <a href="tel:916-969-3705" className="text-primary hover:underline">916-969-3705</a></p>
                <p>
                  <strong>Mailing Address:</strong><br />
                  [PLACEHOLDER - TO BE FILLED BY SITE OWNER]<br />
                  [Street Address]<br />
                  [City, State ZIP Code]<br />
                  [Country]
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;