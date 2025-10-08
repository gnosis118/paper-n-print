import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, CreditCard, Settings, Users, HelpCircle, Book } from "lucide-react";

export default function Docs() {
  const docSections = [
    {
      icon: FileText,
      title: "Getting Started",
      description: "Learn the basics of creating your first invoice",
      articles: [
        "Creating Your First Invoice",
        "Understanding Invoice Templates", 
        "Adding Line Items and Calculations",
        "Customizing Invoice Appearance"
      ]
    },
    {
      icon: Settings,
      title: "Business Settings",
      description: "Configure your business profile and preferences",
      articles: [
        "Setting Up Your Business Profile",
        "Uploading Your Business Logo",
        "Managing Business Information",
        "Customizing Brand Colors"
      ]
    },
    {
      icon: Users,
      title: "Client Management", 
      description: "Organize and manage your client information",
      articles: [
        "Adding New Clients",
        "Editing Client Information",
        "Client History and Records",
        "Managing Multiple Contacts"
      ]
    },
    {
      icon: CreditCard,
      title: "Payments & Billing",
      description: "Payment processing and subscription management",
      articles: [
        "Setting Up Payment Links",
        "Understanding Payment Terms",
        "Managing Subscriptions",
        "Payment Security & Compliance"
      ]
    }
  ];

  const quickLinks = [
    { title: "Frequently Asked Questions", href: "/docs/faq" },
    { title: "Contact Support", href: "/contact" },
    { title: "Feature Requests", href: "/docs/feature-requests" },
    { title: "System Status", href: "/docs/system-status" }
  ];

  return (
    <>
      <Helmet>
        <title>Documentation - Invoice Pro</title>
        <meta name="description" content="Complete documentation and help guides for Invoice Pro. Learn how to create invoices, manage clients, and set up payments." />
      </Helmet>
      
      <PageLayout>
        <div className="container py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Book className="h-16 w-16 mx-auto text-primary mb-4" />
              <h1 className="text-4xl font-bold mb-4">Documentation & Help</h1>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about using Invoice Pro
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-12">
              {docSections.map((section, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <section.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{section.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <Link
                            to={`/docs/${article.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').replace(/-+/g, '-')}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {article}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {quickLinks.map((link, index) => (
                      <li key={index}>
                        <Link 
                          to={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need More Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="space-y-2">
                    <Link 
                      to="/contact"
                      className="block text-sm text-primary hover:underline"
                    >
                      Contact Support →
                    </Link>
                    <a 
                      href="mailto:gavin@currencytocurrency.app"
                      className="block text-sm text-primary hover:underline"
                    >
                      Email Us Directly →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}