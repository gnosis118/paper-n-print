import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "How to Get Paid Faster: 10 Invoice Best Practices for Small Businesses",
      excerpt: "Learn the proven strategies that help small businesses reduce payment delays by 60% and improve cash flow with better invoicing practices.",
      date: "2025-10-17",
      readTime: "8 min read",
      category: "Best Practices"
    },
    {
      title: "Construction Invoice Template Guide: What to Include & How to Get Paid",
      excerpt: "Complete guide to creating professional construction invoices that get paid on time. Includes free templates and industry-specific tips.",
      date: "2025-10-16",
      readTime: "10 min read",
      category: "Templates"
    },
    {
      title: "Stripe vs PayPal for Invoicing: Which Payment Processor is Better?",
      excerpt: "Detailed comparison of Stripe and PayPal for invoice payments. Learn which platform saves you more money and gets you paid faster.",
      date: "2025-10-15",
      readTime: "12 min read",
      category: "Payments"
    },
    {
      title: "Invoice Automation: Save 10 Hours Per Week with Smart Invoicing",
      excerpt: "Discover how automated invoicing can save your business 10+ hours per week while reducing errors and improving payment collection rates.",
      date: "2025-10-14",
      readTime: "7 min read",
      category: "Automation"
    },
    {
      title: "What to Do When Clients Don't Pay: A Step-by-Step Collection Guide",
      excerpt: "Professional strategies for collecting overdue payments without damaging client relationships. Includes email templates and legal tips.",
      date: "2025-10-13",
      readTime: "9 min read",
      category: "Collections"
    },
    {
      title: "Free Invoice Templates for Every Industry (2025 Updated)",
      excerpt: "Download free, professional invoice templates for construction, consulting, creative services, and 25+ other industries. Fully customizable.",
      date: "2025-10-12",
      readTime: "6 min read",
      category: "Templates"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Invoice & Payment Blog - Tips, Templates & Best Practices | ProInvoice</title>
        <meta name="description" content="Expert advice on invoicing, payment collection, and small business finance. Free templates, automation tips, and proven strategies to get paid faster." />
        <meta name="keywords" content="invoice tips, payment collection, small business finance, invoicing best practices, payment terms" />
      </Helmet>
      
      <PageLayout>
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">ProInvoice Blog</h1>
              <p className="text-xl text-muted-foreground">
                Expert tips on invoicing, payment collection, and growing your business.
                Learn from industry professionals and get paid faster.
              </p>
            </div>

            <div className="space-y-8">
              {posts.map((post, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl hover:text-primary cursor-pointer">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-blue-100 rounded-lg border border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Get Invoicing Tips in Your Inbox</h2>
              <p className="text-muted-foreground mb-6">
                Join 10,000+ business owners getting weekly tips on invoicing, payments, and cash flow management.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                />
                <button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No spam. Unsubscribe anytime. Free invoice templates included.
              </p>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}