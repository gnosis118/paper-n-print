import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Invoice Pro</title>
        <meta name="description" content="Learn about Invoice Pro, the professional invoice generation platform trusted by businesses worldwide." />
      </Helmet>
      
      <PageLayout>
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">About Invoice Pro</h1>
              <p className="text-xl text-muted-foreground">
                Professional invoice generation made simple for businesses worldwide
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground">
                    To simplify invoice creation and management for businesses of all sizes, 
                    providing professional templates and seamless payment integration.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Professional invoice templates</li>
                    <li>• Secure payment processing</li>
                    <li>• Custom branding options</li>
                    <li>• Easy client management</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <strong>Contact Person:</strong> Gavin Clay
                    </div>
                    <div>
                      <strong>Email:</strong> 
                      <a href="mailto:gavin@proinvoice.app" className="ml-2 text-primary hover:underline">
                        gavin@proinvoice.app
                      </a>
                    </div>
                    <div>
                      <strong>Phone:</strong> 
                      <a href="tel:916-969-3705" className="ml-2 text-primary hover:underline">
                        916-969-3705
                      </a>
                    </div>
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