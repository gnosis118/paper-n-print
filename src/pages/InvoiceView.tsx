import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, CreditCard, QrCode, Copy, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SEOHeaders } from '@/components/SEOHeaders';
import { useToast } from '@/hooks/use-toast';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  taxable: boolean;
}

interface Invoice {
  id: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount: number;
  shipping: number;
  total: number;
  status: string;
  notes: string;
  pay_link_url: string;
  pay_qr_svg: string;
  estimate_id: string;
}

const InvoiceView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const paid = searchParams.get('paid') === 'true';

  useEffect(() => {
    if (!id) return;

    const fetchInvoice = async () => {
      try {
        // Fetch invoice
        const { data: invoiceData, error: invoiceError } = await supabase
          .from('invoices')
          .select('*')
          .eq('id', id)
          .single();

        if (invoiceError) throw invoiceError;

        // Fetch invoice items
        const { data: itemsData, error: itemsError } = await supabase
          .from('invoice_items')
          .select('*')
          .eq('invoice_id', id)
          .order('sort_order');

        if (itemsError) throw itemsError;

        setInvoice(invoiceData);
        setItems(itemsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load invoice');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const copyPaymentLink = () => {
    if (!invoice?.pay_link_url) return;
    
    navigator.clipboard.writeText(invoice.pay_link_url);
    toast({
      title: "Payment link copied",
      description: "The payment link has been copied to your clipboard.",
    });
  };

  const downloadQRCode = () => {
    if (!invoice?.pay_qr_svg) return;
    
    const blob = new Blob([invoice.pay_qr_svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice.invoice_number}-qr.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="gap-1 bg-green-600"><CheckCircle className="w-3 h-3" />Paid</Badge>;
      case 'pending':
        return <Badge variant="outline" className="gap-1"><CreditCard className="w-3 h-3" />Payment Due</Badge>;
      case 'overdue':
        return <Badge variant="destructive" className="gap-1">Overdue</Badge>;
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

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold text-destructive mb-2">Invoice Not Found</h2>
            <p className="text-muted-foreground">{error || 'The invoice you are looking for does not exist or has been removed.'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPayable = invoice.status !== 'paid' && invoice.total > 0;

  return (
    <>
      <SEOHeaders
        title={`Invoice #${invoice.invoice_number}`}
        description={`View and pay invoice #${invoice.invoice_number}. Amount due: $${invoice.total.toFixed(2)}`}
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {paid && (
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Payment Received!</h3>
                    <p className="text-green-700">Thank you for your payment. A receipt has been sent to your email.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Invoice #{invoice.invoice_number}</CardTitle>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <p>Issue Date: {new Date(invoice.issue_date).toLocaleDateString()}</p>
                    <p>Due Date: {new Date(invoice.due_date).toLocaleDateString()}</p>
                  </div>
                </div>
                {getStatusBadge(invoice.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Items & Services</h3>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <div className="flex-1">
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${Math.abs(item.rate).toFixed(2)}
                          {item.rate < 0 && <span className="text-green-600 ml-1">(Credit)</span>}
                        </p>
                      </div>
                      <p className={`font-semibold ${item.amount < 0 ? 'text-green-600' : ''}`}>
                        {item.amount < 0 ? '-' : ''}${Math.abs(item.amount).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${invoice.discount.toFixed(2)}</span>
                  </div>
                )}
                {invoice.tax_rate > 0 && (
                  <div className="flex justify-between">
                    <span>Tax ({(invoice.tax_rate * 100).toFixed(2)}%)</span>
                    <span>${invoice.tax_amount.toFixed(2)}</span>
                  </div>
                )}
                {invoice.shipping > 0 && (
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${invoice.shipping.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total Due</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
              </div>

              {invoice.notes && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm whitespace-pre-wrap">{invoice.notes}</p>
                </div>
              )}

              {isPayable && invoice.pay_link_url && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Make Payment
                    </h4>
                    
                    <div className="flex gap-3 mb-4">
                      <Button
                        size="lg"
                        className="flex-1"
                        onClick={() => window.open(invoice.pay_link_url, '_blank')}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now (${invoice.total.toFixed(2)})
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={copyPaymentLink}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    {invoice.pay_qr_svg && (
                      <div className="flex items-center justify-between bg-white p-3 rounded border">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-16 h-16 border rounded"
                            dangerouslySetInnerHTML={{ __html: invoice.pay_qr_svg }}
                          />
                          <div>
                            <p className="font-medium">QR Code Payment</p>
                            <p className="text-sm text-muted-foreground">Scan to pay with mobile</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadQRCode}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground text-center mt-3">
                      Secure payment powered by Stripe • Card, ACH, Apple Pay & Google Pay accepted
                    </p>
                  </div>
                </div>
              )}

              {invoice.status === 'paid' && (
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 mb-1">Payment Received</h3>
                  <p className="text-green-700">This invoice has been paid in full. Thank you for your business!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default InvoiceView;