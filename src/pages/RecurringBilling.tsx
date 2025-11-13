import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash2, 
  Pause, 
  Play,
  Calendar,
  DollarSign,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RecurringBilling {
  id: string;
  client_name: string;
  client_email: string;
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
  start_date: string;
  next_billing_date: string;
  status: 'active' | 'paused' | 'cancelled';
  description: string;
  created_at: string;
}

export default function RecurringBilling() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<RecurringBilling | null>(null);
  const [billingToDelete, setBillingToDelete] = useState<RecurringBilling | null>(null);
  const [recurringBillings, setRecurringBillings] = useState<RecurringBilling[]>([]);

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    amount: '',
    frequency: 'monthly' as RecurringBilling['frequency'],
    start_date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleCreateBilling = () => {
    setSelectedBilling(null);
    setFormData({
      client_name: '',
      client_email: '',
      amount: '',
      frequency: 'monthly',
      start_date: new Date().toISOString().split('T')[0],
      description: '',
    });
    setIsDialogOpen(true);
  };

  const handleEditBilling = (billing: RecurringBilling) => {
    setSelectedBilling(billing);
    setFormData({
      client_name: billing.client_name,
      client_email: billing.client_email,
      amount: billing.amount.toString(),
      frequency: billing.frequency,
      start_date: billing.start_date,
      description: billing.description,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement actual API call to create/update recurring billing
    toast({
      title: selectedBilling ? "Recurring billing updated" : "Recurring billing created",
      description: `Successfully ${selectedBilling ? 'updated' : 'created'} recurring billing for ${formData.client_name}`,
    });
    
    setIsDialogOpen(false);
  };

  const handleToggleStatus = (billing: RecurringBilling) => {
    const newStatus = billing.status === 'active' ? 'paused' : 'active';
    toast({
      title: `Billing ${newStatus}`,
      description: `Recurring billing for ${billing.client_name} has been ${newStatus}`,
    });
  };

  const handleDeleteClick = (billing: RecurringBilling) => {
    setBillingToDelete(billing);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (billingToDelete) {
      toast({
        title: "Billing cancelled",
        description: `Recurring billing for ${billingToDelete.client_name} has been cancelled`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      setBillingToDelete(null);
    }
  };

  const getFrequencyLabel = (frequency: RecurringBilling['frequency']) => {
    const labels = {
      weekly: 'Weekly',
      biweekly: 'Bi-weekly',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly',
    };
    return labels[frequency];
  };

  const getStatusBadge = (status: RecurringBilling['status']) => {
    const variants = {
      active: 'default',
      paused: 'secondary',
      cancelled: 'destructive',
    } as const;
    
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <>
      <Helmet>
        <title>Recurring Billing - ProInvoice</title>
        <meta name="description" content="Manage recurring billing cycles and subscriptions" />
      </Helmet>

      <DashboardLayout 
        title="Recurring Billing" 
        description="Set up and manage recurring billing cycles for your clients"
      >
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Recurring Billing</h1>
                <p className="text-muted-foreground mt-2">
                  Automate your invoicing with recurring billing cycles
                </p>
              </div>
              <Button onClick={handleCreateBilling} size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Recurring Billing
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Billings</CardTitle>
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recurringBillings.filter(b => b.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently active cycles
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${recurringBillings
                    .filter(b => b.status === 'active' && b.frequency === 'monthly')
                    .reduce((sum, b) => sum + b.amount, 0)
                    .toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  From monthly billings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recurringBillings.length}</div>
                <p className="text-xs text-muted-foreground">
                  On recurring billing
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recurring Billings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recurring Billings</CardTitle>
              <CardDescription>
                Manage all your recurring billing cycles in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recurringBillings.length === 0 ? (
                <div className="text-center py-12">
                  <RefreshCw className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No recurring billings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Set up your first recurring billing to automate your invoicing
                  </p>
                  <Button onClick={handleCreateBilling}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Recurring Billing
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Next Billing</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recurringBillings.map((billing) => (
                        <TableRow key={billing.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{billing.client_name}</div>
                              <div className="text-sm text-muted-foreground">
                                {billing.client_email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${billing.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>{getFrequencyLabel(billing.frequency)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {new Date(billing.next_billing_date).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(billing.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleStatus(billing)}
                                title={billing.status === 'active' ? 'Pause' : 'Resume'}
                              >
                                {billing.status === 'active' ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditBilling(billing)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClick(billing)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedBilling ? 'Edit Recurring Billing' : 'Add Recurring Billing'}
              </DialogTitle>
              <DialogDescription>
                {selectedBilling
                  ? 'Update recurring billing information'
                  : 'Set up a new recurring billing cycle'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client_name">Client Name *</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client_email">Client Email *</Label>
                <Input
                  id="client_email"
                  type="email"
                  value={formData.client_email}
                  onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="100.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Billing Frequency *</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => setFormData({ ...formData, frequency: value as RecurringBilling['frequency'] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Monthly retainer for services"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedBilling ? 'Update' : 'Create'} Billing
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently cancel the recurring billing for <strong>{billingToDelete?.client_name}</strong>.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
                Delete Billing
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DashboardLayout>
    </>
  );
}

