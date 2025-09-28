import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "10 Essential Invoice Best Practices for Small Businesses",
      excerpt: "Learn the key strategies to improve your invoicing process and get paid faster.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Best Practices"
    },
    {
      title: "Understanding Payment Terms: Net 30, Net 15, and More",
      excerpt: "A comprehensive guide to payment terms and how to choose the right one for your business.",
      date: "2024-01-10", 
      readTime: "7 min read",
      category: "Finance"
    },
    {
      title: "How to Handle Late Payments Professionally",
      excerpt: "Strategies and templates for following up on overdue invoices while maintaining client relationships.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Customer Relations"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Blog - Invoice Pro</title>
        <meta name="description" content="Read the latest insights, tips, and best practices for invoicing, payment processing, and business finance." />
      </Helmet>
      
      <PageLayout>
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Invoice Pro Blog</h1>
              <p className="text-xl text-muted-foreground">
                Insights, tips, and best practices for better invoicing
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

            <div className="text-center mt-12 p-8 bg-muted/50 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground">
                More blog posts coming soon! Subscribe to our newsletter for updates on new content, 
                features, and invoicing best practices.
              </p>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}