import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Accessibility() {
  return (
    <>
      <Helmet>
        <title>Accessibility - Invoice Pro</title>
        <meta name="description" content="Invoice Pro's commitment to accessibility and inclusive design for all users." />
      </Helmet>
      
      <PageLayout>
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
              <p className="text-xl text-muted-foreground">
                We're committed to making Invoice Pro accessible to everyone
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Commitment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Invoice Pro is committed to ensuring digital accessibility for people with disabilities. 
                    We are continually improving the user experience for everyone, and applying the relevant 
                    accessibility standards.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accessibility Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Keyboard navigation support</li>
                    <li>Screen reader compatibility</li>
                    <li>High contrast color schemes</li>
                    <li>Scalable fonts and interface elements</li>
                    <li>Alternative text for images</li>
                    <li>Clear and consistent navigation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback and Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If you encounter any accessibility barriers while using Invoice Pro, please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> <a href="mailto:gavin@currencytocurrency.app" className="text-primary hover:underline">gavin@currencytocurrency.app</a></p>
                    <p><strong>Phone:</strong> <a href="tel:916-969-3705" className="text-primary hover:underline">916-969-3705</a></p>
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