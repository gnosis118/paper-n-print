import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  
  // Track page views
  useGoogleAnalytics();

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-12" style={{paddingTop: '5rem'}}>
        <Card className="text-center shadow-medium">
          <CardHeader className="pb-4">
            <div className="w-16 h-16 bg-invoice-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-invoice-success" />
            </div>
            <CardTitle className="text-2xl text-invoice-success">Payment Successful!</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-muted-foreground space-y-2">
              <p className="text-lg">Your payment has been processed successfully.</p>
              {sessionId && (
                <p className="text-sm">
                  Payment ID: <span className="font-mono text-foreground">{sessionId}</span>
                </p>
              )}
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <h3 className="font-medium">What happens next?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You'll receive a payment confirmation email</li>
                <li>• The invoice creator will be notified of the payment</li>
                <li>• A receipt will be available in your email</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <Link to="/invoice">
                <Button size="lg" className="bg-invoice-brand hover:bg-invoice-brand/90">
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Invoice
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;