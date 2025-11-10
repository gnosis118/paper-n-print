import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClientForm } from '@/components/ClientForm';
import { useClients, Client, ClientWithStats } from '@/hooks/useClients';
import {
  Users,
  Plus,
  Search,
  Mail,
  Building2,
  MapPin,
  Edit,
  Trash2,
  FileText,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Clients() {
  const { clients, loading, createClient, updateClient, deleteClient, getClientHistory } = useClients();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientWithStats | null>(null);
  const [clientHistory, setClientHistory] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Filter clients based on search query
  const filteredClients = clients.filter((client) => {
    const query = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      (client.company && client.company.toLowerCase().includes(query))
    );
  });

  const handleCreateClient = () => {
    setSelectedClient(null);
    setIsDialogOpen(true);
  };

  const handleEditClient = (client: ClientWithStats) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (client: ClientWithStats) => {
    setSelectedClient(client);
    setIsDeleteDialogOpen(true);
  };

  const handleViewHistory = async (client: ClientWithStats) => {
    setSelectedClient(client);
    const history = await getClientHistory(client.id);
    setClientHistory(history);
    setIsHistoryDialogOpen(true);
  };

  const handleFormSubmit = async (data: Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    setFormLoading(true);
    try {
      if (selectedClient) {
        await updateClient(selectedClient.id, data);
      } else {
        await createClient(data);
      }
      setIsDialogOpen(false);
      setSelectedClient(null);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedClient) {
      await deleteClient(selectedClient.id);
      setIsDeleteDialogOpen(false);
      setSelectedClient(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Client Management - ProInvoice</title>
        <meta name="description" content="Manage your clients and view their invoice history" />
      </Helmet>

      <DashboardLayout>
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Users className="h-8 w-8" />
                  Client Management
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your clients and track their invoice history
                </p>
              </div>
              <Button onClick={handleCreateClient}>
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clients.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clients.reduce((sum, c) => sum + (c.invoice_count || 0), 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(clients.reduce((sum, c) => sum + (c.total_revenue || 0), 0))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Client Table */}
          <Card>
            <CardHeader>
              <CardTitle>Clients</CardTitle>
              <CardDescription>
                {filteredClients.length} {filteredClients.length === 1 ? 'client' : 'clients'} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading clients...</div>
              ) : filteredClients.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No clients found matching your search' : 'No clients yet. Add your first client to get started!'}
                  </p>
                  {!searchQuery && (
                    <Button onClick={handleCreateClient} className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Client
                    </Button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-center">Invoices</TableHead>
                        <TableHead className="text-center">Estimates</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              {client.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            {client.company ? (
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                {client.company}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary">{client.invoice_count || 0}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary">{client.estimate_count || 0}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(client.total_revenue || 0)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewHistory(client)}
                                title="View History"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditClient(client)}
                                title="Edit Client"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClick(client)}
                                title="Delete Client"
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

        {/* Add/Edit Client Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedClient ? 'Edit Client' : 'Add New Client'}
              </DialogTitle>
              <DialogDescription>
                {selectedClient
                  ? 'Update client information below'
                  : 'Enter client information to add them to your list'}
              </DialogDescription>
            </DialogHeader>
            <ClientForm
              client={selectedClient}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsDialogOpen(false)}
              loading={formLoading}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <strong>{selectedClient?.name}</strong> from your client list.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
                Delete Client
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Client History Dialog */}
        <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Client History: {selectedClient?.name}
              </DialogTitle>
              <DialogDescription>
                View all invoices and estimates for this client
              </DialogDescription>
            </DialogHeader>

            {clientHistory && (
              <div className="space-y-6 mt-4">
                {/* Client Info Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Client Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClient?.email}</span>
                    </div>
                    {selectedClient?.company && (
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.company}</span>
                      </div>
                    )}
                    {selectedClient?.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.address}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Client since {formatDistanceToNow(new Date(selectedClient?.created_at || ''), { addSuffix: true })}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Invoices */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Invoices ({clientHistory.invoices.length})
                  </h3>
                  {clientHistory.invoices.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No invoices yet</p>
                  ) : (
                    <div className="space-y-2">
                      {clientHistory.invoices.map((invoice: any) => (
                        <Card key={invoice.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{invoice.invoice_number}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(invoice.issue_date).toLocaleDateString()} • Due: {new Date(invoice.due_date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{formatCurrency(invoice.total)}</p>
                                <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                                  {invoice.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Estimates */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Estimates ({clientHistory.estimates.length})
                  </h3>
                  {clientHistory.estimates.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No estimates yet</p>
                  ) : (
                    <div className="space-y-2">
                      {clientHistory.estimates.map((estimate: any) => (
                        <Card key={estimate.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{estimate.number}</p>
                                <p className="text-sm text-muted-foreground">{estimate.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(estimate.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{formatCurrency(estimate.total)}</p>
                                <Badge variant={estimate.status === 'accepted' ? 'default' : 'secondary'}>
                                  {estimate.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
}

