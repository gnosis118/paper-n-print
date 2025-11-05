import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, FileText, BarChart3 } from 'lucide-react';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import RelatedLinks from '@/components/RelatedLinks';

/**
 * How to Manage Multiple Clients Guide
 * Best practices for scaling your contractor business
 */
const HowToManageMultipleClients: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>How to Manage Multiple Clients | ProInvoice</title>
        <meta name="description" content="Scale your contractor business by managing multiple clients efficiently. Learn scheduling, invoicing, and communication strategies." />
        <meta name="keywords" content="manage multiple clients, contractor scheduling, client management, business scaling" />
        <link rel="canonical" href="https://www.proinvoice.app/guides/how-to-manage-multiple-clients" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Manage Multiple Clients',
            description: 'Best practices for managing multiple clients as a contractor',
            author: { '@type': 'Organization', name: 'ProInvoice' },
            datePublished: new Date().toISOString(),
          })}
        </script>
      </Helmet>

      <BreadcrumbNav />

      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Manage Multiple Clients</h1>
            <p className="text-xl text-gray-600">
              Scale your contractor business by managing multiple clients efficiently
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>Average Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">8-12</p>
                <p className="text-sm text-gray-600">Per contractor annually</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Time Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">10+ hrs</p>
                <p className="text-sm text-gray-600">Per week with systems</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Revenue Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">+35%</p>
                <p className="text-sm text-gray-600">With better management</p>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Challenge */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
              <p className="text-gray-700 mb-4">
                Managing multiple clients is one of the biggest challenges contractors face:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✗ Keeping track of different project timelines</li>
                <li>✗ Managing separate invoices and payments</li>
                <li>✗ Remembering client preferences and requirements</li>
                <li>✗ Scheduling work across multiple projects</li>
                <li>✗ Following up on unpaid invoices</li>
              </ul>
            </section>

            {/* Solution 1 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use a Client Management System</h2>
              <p className="text-gray-700 mb-4">
                Keep all client information in one place. This includes contact info, project history, and preferences.
              </p>
              <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
                <p><strong>Store for each client:</strong></p>
                <ul className="space-y-1 text-gray-700">
                  <li>• Contact information (phone, email, address)</li>
                  <li>• Project history and dates</li>
                  <li>• Payment history and preferences</li>
                  <li>• Special requirements or preferences</li>
                  <li>• Referral source</li>
                </ul>
              </div>
            </section>

            {/* Solution 2 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Create a Master Schedule</h2>
              <p className="text-gray-700 mb-4">
                Use a calendar or scheduling tool to manage all projects and deadlines.
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <p className="font-semibold text-gray-900 mb-2">Schedule includes:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Project start and end dates</li>
                  <li>• Milestone dates (deposits due, inspections, etc.)</li>
                  <li>• Invoice due dates</li>
                  <li>• Follow-up reminders</li>
                </ul>
              </div>
            </section>

            {/* Solution 3 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Standardize Your Processes</h2>
              <p className="text-gray-700 mb-4">
                Create templates and standard processes for common tasks.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Estimate template (same format for all clients)</li>
                <li>✓ Invoice template (consistent branding)</li>
                <li>✓ Contract template (standard terms)</li>
                <li>✓ Follow-up email templates</li>
                <li>✓ Project checklist (same steps for all projects)</li>
              </ul>
            </section>

            {/* Solution 4 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Automate Invoicing & Reminders</h2>
              <p className="text-gray-700 mb-4">
                Don't manually track invoices. Use software to automate invoicing and payment reminders.
              </p>
              <div className="bg-green-50 p-4 rounded space-y-2 text-sm">
                <p className="font-semibold text-gray-900">Automate:</p>
                <ul className="space-y-1 text-gray-700">
                  <li>• Invoice generation and sending</li>
                  <li>• Payment reminders (7, 14, 21 days)</li>
                  <li>• Late payment notifications</li>
                  <li>• Receipt confirmations</li>
                </ul>
              </div>
            </section>

            {/* Solution 5 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prioritize Communication</h2>
              <p className="text-gray-700 mb-4">
                Regular communication prevents misunderstandings and keeps clients happy.
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-indigo-600 pl-4">
                  <p className="font-semibold text-gray-900">Before Project</p>
                  <p className="text-sm text-gray-700">Send estimate with timeline and deposit info</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold text-gray-900">During Project</p>
                  <p className="text-sm text-gray-700">Weekly updates on progress and any issues</p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <p className="font-semibold text-gray-900">After Project</p>
                  <p className="text-sm text-gray-700">Final invoice and follow-up for feedback</p>
                </div>
              </div>
            </section>

            {/* Solution 6 */}
            <section className="bg-white rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Track Key Metrics</h2>
              <p className="text-gray-700 mb-4">
                Monitor metrics to identify trends and opportunities.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Average project value</li>
                <li>✓ Time from estimate to invoice</li>
                <li>✓ Payment collection time</li>
                <li>✓ Client satisfaction (repeat business rate)</li>
                <li>✓ Revenue per client</li>
              </ul>
            </section>

            {/* Action Items */}
            <section className="bg-indigo-50 rounded-lg p-8 border border-indigo-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Action Items This Week</h2>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">1.</span>
                  <span className="text-gray-700">List all your current clients and their project status</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">2.</span>
                  <span className="text-gray-700">Create a master schedule with all project deadlines</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">3.</span>
                  <span className="text-gray-700">Standardize your estimate and invoice templates</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">4.</span>
                  <span className="text-gray-700">Set up automatic payment reminders for unpaid invoices</span>
                </li>
              </ol>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Manage Multiple Clients Effortlessly</h3>
              <p className="mb-6 text-indigo-100">
                ProInvoice helps you organize clients, track projects, and automate invoicing.
              </p>
              <Link
                to="/get-started"
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>

      <RelatedLinks currentPage="/guides/how-to-manage-multiple-clients" />
    </>
  );
};

export default HowToManageMultipleClients;

