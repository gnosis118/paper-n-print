import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Book, FileText, HelpCircle, MessageSquare, Settings, Users } from "lucide-react";

export default function Docs() {
  return (
    <>
      <Helmet>
        <title>Documentation - Invoice Pro</title>
        <meta name="description" content="Complete documentation and help guides for Invoice Pro. Learn how to create invoices, manage clients, and set up payments." />
      </Helmet>
      
      <PageLayout>
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Book className="h-16 w-16 mx-auto text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Documentation & Help</h1>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about using Invoice Pro
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Getting Started</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn the basics of creating professional invoices.
                  </p>
                  <Link 
                    to="/docs/getting-started" 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View Guide →
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Settings className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Business Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure your business profile and preferences.
                  </p>
                  <Link 
                    to="/business-settings" 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Go to Settings →
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Client Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Organize and manage your client information.
                  </p>
                  <Link 
                    to="/docs/client-management" 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Learn More →
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <HelpCircle className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>FAQ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Frequently asked questions and answers.
                  </p>
                  <Link 
                    to="/docs/faq" 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View FAQ →
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MessageSquare className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Need help? Get in touch with our support team.
                  </p>
                  <Link 
                    to="/contact" 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Contact Us →
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse our collection of invoice templates.
                  </p>
                  <Link 
                    to="/invoice-templates" 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View Templates →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}