import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Copy, Check, Link as LinkIcon, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import type { Estimate } from "@/hooks/useEstimates";

interface EstimatePreviewProps {
  estimate: Estimate;
  showPaymentOptions?: boolean;
}

const EstimatePreview = ({ estimate, showPaymentOptions = false }: EstimatePreviewProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGeneratingPayment, setIsGeneratingPayment] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const generatePaymentLink = async () => {
    if (!estimate.total || estimate.total <= 0) {
      toast({
        title: "Cannot create payment link",
        description: "Estimate total must be greater than zero to create a payment link.",
        variant: "destructive",
      });
      return;
    }

    if (estimate.status !== 'sent') {
      toast({
        title: "Mark as sent first",
        description: "Please mark the estimate as sent before generating a payment link.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPayment(true);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('estimate-checkout', {
        body: { token: estimate.sharing_token },
      });

      if (error) throw error;

      if (response?.url) {
        setPaymentUrl(response.url);
        toast({
          title: "Payment link generated",
          description: "Payment link created successfully. You can now share it with your client.",
        });
      }
    } catch (error) {
      console.error('Error generating payment link:', error);
      toast({
        title: "Error generating payment link",
        description: error instanceof Error ? error.message : "Failed to create payment link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPayment(false);
    }
  };

  const copyPaymentLink = async () => {
    if (!paymentUrl) return;
    
    try {
      await navigator.clipboard.writeText(paymentUrl);
      setCopySuccess(true);
      toast({
        title: "Payment link copied",
        description: "Payment link has been copied to your clipboard.",
      });
      
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy payment link to clipboard.",
        variant: "destructive",
      });
    }
  };

  const openPaymentLink = () => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'sent':
        return <Badge variant="outline" className="gap-1"><Clock className="w-3 h-3" />Sent</Badge>;
      case 'accepted':
        return <Badge variant="default" className="gap-1 bg-green-600"><CheckCircle className="w-3 h-3" />Accepted</Badge>;
      case 'invoiced':
        return <Badge variant="default" className="gap-1 bg-blue-600"><CreditCard className="w-3 h-3" />Invoiced</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const depositAmount = estimate.deposit_type === 'percent'
    ? (estimate.total * estimate.deposit_value) / 100
    : estimate.deposit_value;

  return (
    <div className="space-y-4">
      {/* Payment Options */}
      {showPaymentOptions && user && estimate.status === 'sent' && (
        <Card>
          <div className="p-4 bg-secondary/50 border-b border-border">
            <h3 className="font-semibold text-lg flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-primary" />
              Payment Options
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Generate a secure payment link for your client to pay the deposit
            </p>
          </div>
          
          <div className="p-4 space-y-4">
            {!paymentUrl ? (
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <p>Create a secure Stripe payment link for this estimate deposit:</p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• Deposit Required: <span className="font-semibold">${depositAmount.toFixed(2)}</span></li>
                    <li>• Total Estimate: <span className="font-semibold">${estimate.total.toFixed(2)}</span></li>
                    <li>• Estimate: #{estimate.number}</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={generatePaymentLink}
                  disabled={isGeneratingPayment || !estimate.total || estimate.total <= 0}
                  className="w-full sm:w-auto"
                >
                  {isGeneratingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Generate Payment Link
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                    <Check className="w-3 h-3 mr-1" />
                    Payment Link Ready
                  </Badge>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-sm font-medium mb-2">Share this link with your client:</p>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 text-xs bg-background p-2 rounded border text-muted-foreground font-mono break-all">
                      {paymentUrl}
                    </code>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    onClick={copyPaymentLink}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    {copySuccess ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={openPaymentLink}
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Open Payment Page
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
      
      {/* Estimate Preview */}
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">Estimate #{estimate.number}</h2>
              <p className="text-muted-foreground mt-1">{estimate.title}</p>
            </div>
            {getStatusBadge(estimate.status)}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Items</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-3 font-medium">Description</th>
                      <th className="text-right p-3 font-medium">Qty</th>
                      <th className="text-right p-3 font-medium">Rate</th>
                      <th className="text-right p-3 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimate.items?.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">{item.description}</td>
                        <td className="text-right p-3">{item.quantity}</td>
                        <td className="text-right p-3">${item.rate.toFixed(2)}</td>
                        <td className="text-right p-3">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${estimate.subtotal.toFixed(2)}</span>
                </div>
                {estimate.tax_rate > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax ({estimate.tax_rate}%):</span>
                    <span>${estimate.tax_amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${estimate.total.toFixed(2)}</span>
                </div>
                {estimate.deposit_value > 0 && (
                  <div className="flex justify-between text-primary font-semibold">
                    <span>Deposit Required:</span>
                    <span>${depositAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            {estimate.terms && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-2">Terms & Conditions</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{estimate.terms}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EstimatePreview;
