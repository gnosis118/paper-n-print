import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Plus, Edit, Eye, Send, Copy, Trash2, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { useEstimates, type Estimate } from '@/hooks/useEstimates';
import { useToast } from '@/hooks/use-toast';
import { useFreeUsageTracking } from '@/hooks/useFreeUsageTracking';
import { useSubscription } from '@/hooks/useSubscription';
import { Watermark } from '@/components/Watermark';
import { useNavigate } from 'react-router-dom';
import { AnonymousUserBanner } from '@/components/AnonymousUserBanner';
import EstimatePreview from '@/components/EstimatePreview';
import { EstimateAnalyticsDashboard } from '@/components/EstimateAnalyticsDashboard';
import { BulkEstimateCreator } from '@/components/BulkEstimateCreator';
import EstimateProgressIndicator from '@/components/EstimateProgressIndicator';
import EstimateTimeline from '@/components/EstimateTimeline';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Estimates: React.FC = () => {
  const { estimates, loading, createEstimate, updateEstimate, deleteEstimate } = useEstimates();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEstimate, setEditingEstimate] = useState<Estimate | null>(null);
  const [previewEstimate, setPreviewEstimate] = useState<Estimate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { hasUsedFree, canUseFree, recordFreeUsage, isAnonymous } = useFreeUsageTracking();
  const { subscribed, hasWatermark } = useSubscription();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');

  // Form state for new/edit estimate
  const [formData, setFormData] = useState({
    title: '',
    number: '',
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    tax_rate: 0,
    tax_amount: 0,
    total: 0,
    deposit_type: 'percent' as 'percent' | 'fixed',
    deposit_value: 25,
    terms: 'This estimate is valid for 30 days. A deposit is required to begin work. Deposit is non-refundable and will be applied to the final invoice.',
    collectDeposit: true,
  });

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0);
    const tax_amount = subtotal * formData.tax_rate / 100;
    const total = subtotal + tax_amount;
    
    setFormData(prev => ({
      ...prev,
      subtotal,
      tax_amount,
      total
    }));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setFormData(prev => ({ ...prev, items: newItems }));
    setTimeout(calculateTotals, 0);
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
      setTimeout(calculateTotals, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const estimateData = {
        ...formData,
        number: formData.number || `EST-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
        deposit_value: formData.collectDeposit ? formData.deposit_value : 0,
      };

      if (editingEstimate) {
        await updateEstimate(editingEstimate.id, estimateData);
        toast({ title: "Estimate updated successfully" });
      } else {
        await createEstimate(estimateData);
        toast({ title: "Estimate created successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save estimate",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      number: '',
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      subtotal: 0,
      tax_rate: 0,
      tax_amount: 0,
      total: 0,
      deposit_type: 'percent',
      deposit_value: 25,
      terms: 'This estimate is valid for 30 days. A deposit is required to begin work. Deposit is non-refundable and will be applied to the final invoice.',
      collectDeposit: true,
    });
    setEditingEstimate(null);
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

  const copyEstimateLink = (token: string) => {
    const url = `${window.location.origin}/e/${token}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Estimate link copied to clipboard" });
  };

  const markAsSent = async (estimate: Estimate) => {
    try {
      await updateEstimate(estimate.id, { status: 'sent' });
      toast({ title: "Estimate marked as sent" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update estimate status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Estimates - Loading...">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Estimates" description="Create, manage and send estimates with deposit collection">
      <div className="container mx-auto px-4 py-8 relative">
        {/* Watermark for non-paid users */}
        {(hasWatermark || isAnonymous) && <Watermark />}

        {/* Anonymous user banner */}
        {isAnonymous && (
          <div className="mb-6">
            <AnonymousUserBanner hasUsedFree={hasUsedFree} canUseFree={canUseFree} />
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Estimates</h1>
            <p className="text-muted-foreground mt-2">Create estimates that convert to invoices automatically</p>
          </div>
          
          <div className="flex gap-2">
            <BulkEstimateCreator />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Estimate
                </Button>
              </DialogTrigger>
            
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingEstimate ? 'Edit Estimate' : 'Create New Estimate'}</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., HVAC System Installation"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="number">Estimate Number</Label>
                    <Input
                      id="number"
                      value={formData.number}
                      onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                      placeholder="Auto-generated if empty"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label>Items & Services</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                      <Plus className="w-3 h-3 mr-1" />Add Item
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 items-end">
                        <div className="col-span-5">
                          <Input
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="Rate"
                            value={item.rate}
                            onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            value={`$${item.amount.toFixed(2)}`}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                        <div className="col-span-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                            disabled={formData.items.length === 1}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                    <Input
                      id="tax_rate"
                      type="number"
                      value={formData.tax_rate}
                      onChange={(e) => {
                        const rate = parseFloat(e.target.value) || 0;
                        setFormData(prev => ({ ...prev, tax_rate: rate }));
                        setTimeout(calculateTotals, 0);
                      }}
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Subtotal: ${formData.subtotal.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Tax: ${formData.tax_amount.toFixed(2)}</p>
                      <p className="font-semibold">Total: ${formData.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="collect-deposit"
                      checked={formData.collectDeposit}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, collectDeposit: checked }))}
                    />
                    <Label htmlFor="collect-deposit">Collect deposit?</Label>
                  </div>

                  {formData.collectDeposit && (
                    <div className="grid grid-cols-3 gap-4 pl-6">
                      <div>
                        <Label>Deposit Type</Label>
                        <Select
                          value={formData.deposit_type}
                          onValueChange={(value: 'percent' | 'fixed') => setFormData(prev => ({ ...prev, deposit_type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percent">Percentage</SelectItem>
                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Deposit Value</Label>
                        <Input
                          type="number"
                          value={formData.deposit_value}
                          onChange={(e) => setFormData(prev => ({ ...prev, deposit_value: parseFloat(e.target.value) || 0 }))}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="flex items-end">
                        <p className="text-sm">
                          Deposit Amount: <span className="font-semibold">
                            ${formData.deposit_type === 'percent' 
                              ? ((formData.total * formData.deposit_value) / 100).toFixed(2)
                              : formData.deposit_value.toFixed(2)
                            }
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Textarea
                    id="terms"
                    value={formData.terms}
                    onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingEstimate ? 'Update Estimate' : 'Create Estimate'}
                  </Button>
                </div>
              </form>
            </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Estimates List</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            <div className="grid gap-6">
              {estimates.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <h3 className="text-lg font-semibold mb-2">No estimates yet</h3>
                <p className="text-muted-foreground mb-4">Create your first estimate to get started</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Estimate
                </Button>
              </CardContent>
            </Card>
          ) : (
            estimates.map((estimate) => (
              <Card key={estimate.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Estimate #{estimate.number}
                        {getStatusBadge(estimate.status)}
                      </CardTitle>
                      <p className="text-muted-foreground">{estimate.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${estimate.total.toFixed(2)}</p>
                      {estimate.deposit_value > 0 && (
                        <p className="text-sm text-muted-foreground">
                          Deposit: ${estimate.deposit_type === 'percent'
                            ? ((estimate.total * estimate.deposit_value) / 100).toFixed(2)
                            : estimate.deposit_value.toFixed(2)
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Indicator */}
                  <div className="py-3 px-3 bg-gray-50 rounded-lg border border-gray-200">
                    <EstimateProgressIndicator
                      status={estimate.status as any}
                      compact={true}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Created: {new Date(estimate.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyEstimateLink(estimate.sharing_token)}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy Link
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPreviewEstimate(estimate);
                          setIsPreviewOpen(true);
                        }}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      
                      {estimate.status === 'draft' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsSent(estimate)}
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Mark as Sent
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingEstimate(estimate);
                          setFormData({
                            title: estimate.title,
                            number: estimate.number,
                            items: estimate.items,
                            subtotal: estimate.subtotal,
                            tax_rate: estimate.tax_rate * 100,
                            tax_amount: estimate.tax_amount,
                            total: estimate.total,
                            deposit_type: estimate.deposit_type,
                            deposit_value: estimate.deposit_value,
                            terms: estimate.terms || '',
                            collectDeposit: estimate.deposit_value > 0,
                          });
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            {estimates.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <h3 className="text-lg font-semibold mb-2">No estimates yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first estimate to view timeline</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {estimates.map((estimate) => {
                  const depositAmount = estimate.deposit_type === 'percent'
                    ? (estimate.total * estimate.deposit_value) / 100
                    : estimate.deposit_value;

                  const timelineEvents = [
                    {
                      stage: 'draft' as const,
                      label: 'Draft',
                      timestamp: new Date(estimate.created_at),
                      status: 'completed' as const,
                      description: 'Estimate created',
                    },
                    {
                      stage: 'sent' as const,
                      label: 'Sent',
                      timestamp: undefined,
                      status: estimate.status !== 'draft' ? 'completed' as const : 'pending' as const,
                      description: 'Sent to client',
                    },
                    {
                      stage: 'deposit_paid' as const,
                      label: 'Deposit Paid',
                      timestamp: undefined,
                      amount: depositAmount,
                      status: estimate.status === 'invoiced'
                        ? 'completed' as const
                        : 'pending' as const,
                      description: 'Deposit received',
                    },
                    {
                      stage: 'invoiced' as const,
                      label: 'Invoiced',
                      timestamp: undefined,
                      status: estimate.status === 'invoiced'
                        ? 'completed' as const
                        : 'pending' as const,
                      description: 'Invoice created',
                    },
                  ];

                  return (
                    <Card key={estimate.id}>
                      <CardHeader>
                        <CardTitle>Estimate #{estimate.number} - {estimate.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <EstimateTimeline
                          events={timelineEvents}
                          currentStage={estimate.status as any}
                          estimateTotal={estimate.total}
                          depositAmount={depositAmount}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <EstimateAnalyticsDashboard />
          </TabsContent>
        </Tabs>

        {/* Preview Dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Estimate Preview</DialogTitle>
            </DialogHeader>
            {previewEstimate && (
              <EstimatePreview 
                estimate={previewEstimate} 
                showPaymentOptions={true}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Estimates;