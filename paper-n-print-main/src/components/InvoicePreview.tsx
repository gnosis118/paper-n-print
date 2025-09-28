import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Copy, Check, Link as LinkIcon } from "lucide-react";
import { InvoiceData } from "@/hooks/useInvoiceData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import CleanTemplate from "@/components/templates/CleanTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import TradesTemplate from "@/components/templates/TradesTemplate";

interface InvoicePreviewProps {
  data: InvoiceData;
  showPaymentOptions?: boolean;
}

const InvoicePreview = ({ data, showPaymentOptions = false }: InvoicePreviewProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGeneratingPayment, setIsGeneratingPayment] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const generatePaymentLink = async () => {
    if (!data.totals?.total || data.totals.total <= 0) {
      toast({
        title: "Cannot create payment link",
        description: "Invoice total must be greater than zero to create a payment link.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPayment(true);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('create-payment', {
        body: {
          invoiceId: data.meta?.number || 'N/A',
          amount: data.totals.total,
          description: `Payment for Invoice ${data.meta?.number || 'N/A'}`,
          clientEmail: data.client?.email || '',
        }
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
  const renderTemplate = () => {
    switch (data.template) {
      case "Modern":
        return <ModernTemplate data={data} />;
      case "Trades":
        return <TradesTemplate data={data} />;
      default:
        return <CleanTemplate data={data} />;
    }
  };

  return (
    <div className="relative">
      {/* Print styles */}
      <style>
        {`
          @media print {
            .no-print { display: none !important; }
            .print-page { 
              min-height: 100vh; 
              page-break-after: always;
              margin: 0;
              padding: 20px;
              background: white !important;
            }
            body { margin: 0; padding: 0; }
          }
        `}
      </style>
      
      {/* Payment Options */}
      {showPaymentOptions && user && (
        <Card className="mb-6 no-print">
          <div className="p-4 bg-secondary/50 border-b border-border">
            <h3 className="font-semibold text-lg flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-invoice-brand" />
              Payment Options
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Generate a secure payment link for your client
            </p>
          </div>
          
          <div className="p-4 space-y-4">
            {!paymentUrl ? (
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <p>Create a secure Stripe payment link for this invoice:</p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• Total: <span className="font-semibold">${data.totals?.total?.toFixed(2) || '0.00'}</span></li>
                    <li>• Client: {data.client?.name || 'No client specified'}</li>
                    <li>• Invoice: #{data.meta?.number || 'N/A'}</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={generatePaymentLink}
                  disabled={isGeneratingPayment || !data.totals?.total || data.totals.total <= 0}
                  className="w-full sm:w-auto bg-invoice-brand hover:bg-invoice-brand/90"
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
                  <Badge variant="secondary" className="bg-invoice-success/10 text-invoice-success border-invoice-success/20">
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
                        <Check className="w-4 h-4 mr-2 text-invoice-success" />
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
                    className="flex-1 sm:flex-none bg-invoice-brand hover:bg-invoice-brand/90"
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
      
      <div className="print-page bg-invoice-paper border border-invoice-border rounded-lg shadow-medium overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default InvoicePreview;