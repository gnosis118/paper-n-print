import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Copy } from 'lucide-react';
import { useEstimateTemplates, type EstimateTemplate } from '@/hooks/useEstimateTemplates';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface BulkEstimateData {
  templateId: string;
  clients: Array<{
    name: string;
    email: string;
  }>;
}

export const BulkEstimateCreator: React.FC = () => {
  const { templates, saveTemplate } = useEstimateTemplates();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EstimateTemplate | null>(null);
  const [bulkData, setBulkData] = useState<BulkEstimateData>({
    templateId: '',
    clients: [{ name: '', email: '' }],
  });
  const [newTemplateName, setNewTemplateName] = useState('');
  const [showNewTemplate, setShowNewTemplate] = useState(false);

  const addClientRow = () => {
    setBulkData(prev => ({
      ...prev,
      clients: [...prev.clients, { name: '', email: '' }],
    }));
  };

  const removeClientRow = (index: number) => {
    setBulkData(prev => ({
      ...prev,
      clients: prev.clients.filter((_, i) => i !== index),
    }));
  };

  const updateClient = (index: number, field: 'name' | 'email', value: string) => {
    setBulkData(prev => ({
      ...prev,
      clients: prev.clients.map((client, i) =>
        i === index ? { ...client, [field]: value } : client
      ),
    }));
  };

  const handleCreateBulkEstimates = async () => {
    if (!selectedTemplate) {
      toast({
        title: 'Error',
        description: 'Please select a template',
        variant: 'destructive',
      });
      return;
    }

    const validClients = bulkData.clients.filter(c => c.name && c.email);
    if (validClients.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one client',
        variant: 'destructive',
      });
      return;
    }

    try {
      // This would typically call an edge function to create multiple estimates
      // For now, we'll show a success message
      toast({
        title: 'Success',
        description: `Creating ${validClients.length} estimates from template...`,
      });

      // Reset form
      setBulkData({
        templateId: '',
        clients: [{ name: '', email: '' }],
      });
      setSelectedTemplate(null);
      setIsOpen(false);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create bulk estimates',
        variant: 'destructive',
      });
    }
  };

  const handleSaveAsTemplate = async () => {
    if (!newTemplateName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a template name',
        variant: 'destructive',
      });
      return;
    }

    try {
      await saveTemplate({
        name: newTemplateName,
        items: selectedTemplate?.items || [],
        tax_rate: selectedTemplate?.tax_rate || 0,
        deposit_percentage: selectedTemplate?.deposit_percentage || 30,
        notes: selectedTemplate?.notes,
      });

      setNewTemplateName('');
      setShowNewTemplate(false);
    } catch (err) {
      console.error('Error saving template:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Copy className="w-4 h-4 mr-2" />
          Bulk Create
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Create Estimates from Template</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Selection */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Select Template</Label>
            {templates.length === 0 ? (
              <p className="text-sm text-muted-foreground">No templates available. Create one first.</p>
            ) : (
              <div className="grid gap-2">
                {templates.map(template => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-colors ${
                      selectedTemplate?.id === template.id
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{template.name}</p>
                          {template.description && (
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          )}
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{template.items.length} items</Badge>
                            <Badge variant="outline">{template.tax_rate}% tax</Badge>
                            <Badge variant="outline">{template.deposit_percentage}% deposit</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {selectedTemplate && (
            <>
              {/* Clients List */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Add Clients</Label>
                <div className="space-y-2">
                  {bulkData.clients.map((client, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Client Name"
                        value={client.name}
                        onChange={(e) => updateClient(index, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={client.email}
                        onChange={(e) => updateClient(index, 'email', e.target.value)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeClientRow(index)}
                        disabled={bulkData.clients.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={addClientRow}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateBulkEstimates}
                >
                  Create {bulkData.clients.filter(c => c.name && c.email).length} Estimates
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

