import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found - ProInvoice</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to ProInvoice and create your first invoice." />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <PageLayout
        title="Page Not Found - ProInvoice"
        description="The page you're looking for doesn't exist. Return to ProInvoice and create your first invoice."
        noIndex={true}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
              <p className="text-2xl font-semibold text-foreground mb-2">Page Not Found</p>
              <p className="text-lg text-muted-foreground mb-8">
                Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Home
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>

            <div className="mt-12 p-6 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Helpful Links:</strong>
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <Link to="/invoice" className="text-primary hover:underline block">
                  Create an Invoice
                </Link>
                <Link to="/templates" className="text-primary hover:underline block">
                  Browse Templates
                </Link>
                <Link to="/pricing" className="text-primary hover:underline block">
                  View Pricing
                </Link>
                <Link to="/docs" className="text-primary hover:underline block">
                  Help & Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default NotFound;
