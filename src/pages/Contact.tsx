import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact ProInvoice - Get Support & Business Inquiries</title>
        <meta name="description" content="Get in touch with ProInvoice. Contact us for support, questions, or business inquiries. We're here to help you get paid faster." />
      </Helmet>

      <PageLayout
        title="Contact ProInvoice - Get Support & Business Inquiries"
        description="Get in touch with ProInvoice. Contact us for support, questions, or business inquiries. We're here to help you get paid faster."
        canonical="/contact"
      >
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Contact ProInvoice</h1>
              <p className="text-xl text-muted-foreground">
                We're here to help with any questions or support you need. Reach out anytime.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader className="text-center">
                  <Mail className="h-12 w-12 mx-auto text-primary mb-2" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a
                    href="mailto:support@proinvoice.app"
                    className="text-primary hover:underline"
                  >
                    support@proinvoice.app
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Send us an email anytime
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Phone className="h-12 w-12 mx-auto text-primary mb-2" />
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a 
                    href="tel:916-969-3705"
                    className="text-primary hover:underline"
                  >
                    916-969-3705
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Call us during business hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <MapPin className="h-12 w-12 mx-auto text-primary mb-2" />
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    United States
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Serving customers worldwide
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Card>
                <CardHeader>
                  <CardTitle>Get Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    For technical support, billing questions, or general inquiries, 
                    reach out to us via email or phone. We typically respond within 24 hours.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Contact:</strong> ProInvoice Support Team</p>
                    <p><strong>Response Time:</strong> Within 24 hours</p>
                    <p><strong>Support Hours:</strong> Monday - Friday, 9 AM - 5 PM PST</p>
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