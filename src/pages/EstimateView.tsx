import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, CreditCard, QrCode } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SEOHeaders } from '@/components/SEOHeaders';

interface EstimateItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Estimate {
  id: string;
  number: string;
  title: string;
  items: EstimateItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  deposit_type: 'percent' | 'fixed';
  deposit_value: number;
  status: 'draft' | 'sent' | 'accepted' | 'invoiced';
  terms: string;
  created_at: string;
}

const EstimateView: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';

  useEffect(() => {
    if (!token) return;

    const fetchEstimate = async () => {
      try {
        const { data, error } = await supabase
          .from('estimates')
          .select('*')
          .eq('sharing_token', token)
          .single();

        if (error) throw error;
        
        // Type cast the data properly
        const estimate: Estimate = {
          ...data,
          items: (data.items as unknown as EstimateItem[]) || [],
          deposit_type: data.deposit_type as 'percent' | 'fixed',
          status: data.status as 'draft' | 'sent' | 'accepted' | 'invoiced'
        };
        setEstimate(estimate);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load estimate');
      } finally {
        setLoading(false);
      }
    };

    fetchEstimate();
  }, [token]);

  const handleAcceptAndPay = async () => {
    if (!estimate || !termsAccepted) return;

    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('estimate-checkout', {
        body: { token },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create checkout session');
    } finally {
      setProcessing(false);
    }
  };

  const calculateDepositAmount = () => {
    if (!estimate) return 0;
    
    if (estimate.deposit_type === 'percent') {
      return (estimate.total * estimate.deposit_value) / 100;
    }
    return estimate.deposit_value;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="outline" className="gap-1"><Clock className="w-3 h-3" />Awaiting Response</Badge>;
      case 'accepted':
        return <Badge variant="default" className="gap-1 bg-green-600"><CheckCircle className="w-3 h-3" />Deposit Received</Badge>;
      case 'invoiced':
        return <Badge variant="default" className="gap-1 bg-blue-600"><CreditCard className="w-3 h-3" />Converted to Invoice</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !estimate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold text-destructive mb-2">Estimate Not Found</h2>
            <p className="text-muted-foreground">{error || 'The estimate you are looking for does not exist or has been removed.'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const depositAmount = calculateDepositAmount();
  const isPayable = estimate.status === 'sent';

  return (
    <>
      <SEOHeaders
        title={`Estimate #${estimate.number} - ${estimate.title}`}
        description={`View and accept estimate #${estimate.number} for ${estimate.title}. Deposit required: $${depositAmount.toFixed(2)}`}
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {success && (
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Deposit Received!</h3>
                    <p className="text-green-700">Thank you for your payment. An invoice will be created automatically and sent to you shortly.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {canceled && (
            <Card className="mb-6 border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-yellow-600" />
                  <div>
                    <h3 className="font-semibold text-yellow-800">Payment Canceled</h3>
                    <p className="text-yellow-700">No worries! You can try again when you're ready.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Estimate #{estimate.number}</CardTitle>
                  <p className="text-muted-foreground mt-1">{estimate.title}</p>
                </div>
                {getStatusBadge(estimate.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Items & Services</h3>
                <div className="space-y-2">
                  {estimate.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <div className="flex-1">
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity} × ${item.rate.toFixed(2)}</p>
                      </div>
                      <p className="font-semibold">${item.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${estimate.subtotal.toFixed(2)}</span>
                </div>
                {estimate.tax_rate > 0 && (
                  <div className="flex justify-between">
                    <span>Tax ({(estimate.tax_rate * 100).toFixed(2)}%)</span>
                    <span>${estimate.tax_amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${estimate.total.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Deposit Required
                </h4>
                <p className="text-2xl font-bold text-primary">
                  ${depositAmount.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({estimate.deposit_type === 'percent' ? `${estimate.deposit_value}%` : 'Fixed amount'})
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Remaining balance: ${(estimate.total - depositAmount).toFixed(2)}
                </p>
              </div>

              {estimate.terms && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Terms & Conditions</h4>
                  <p className="text-sm whitespace-pre-wrap">{estimate.terms}</p>
                </div>
              )}

              {isPayable && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions above
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={handleAcceptAndPay}
                      disabled={!termsAccepted || processing}
                    >
                      {processing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Accept & Pay Deposit (${depositAmount.toFixed(2)})
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleAcceptAndPay}
                      disabled={!termsAccepted || processing}
                    >
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Secure payment powered by Stripe • Card, ACH, Apple Pay & Google Pay accepted
                  </p>
                </div>
              )}

              {estimate.status === 'accepted' && (
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 mb-1">Deposit Received</h3>
                  <p className="text-green-700">Your deposit has been processed. An invoice for the remaining balance will be sent to you shortly.</p>
                </div>
              )}

              {estimate.status === 'invoiced' && (
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800 mb-1">Converted to Invoice</h3>
                  <p className="text-blue-700">This estimate has been converted to an invoice. Check your email for payment details.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EstimateView;