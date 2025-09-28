import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, FileText, ArrowLeft, RefreshCw } from "lucide-react";
import Header from "@/components/Header";

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-12 pt-20">
        <Card className="text-center shadow-medium">
          <CardHeader className="pb-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-destructive">Payment Canceled</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-muted-foreground space-y-2">
              <p className="text-lg">Your payment was canceled and no charges were made.</p>
              <p className="text-sm">You can try again or contact the invoice sender if you need assistance.</p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <h3 className="font-medium">Need help?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check that your payment method is working correctly</li>
                <li>• Verify the payment amount and details</li>
                <li>• Contact the invoice sender for assistance</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                className="bg-invoice-brand hover:bg-invoice-brand/90"
                onClick={() => window.history.back()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Payment Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCanceled;