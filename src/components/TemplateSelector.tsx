import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { estimateTemplates } from '@/data/estimateTemplates';
import { Check, ChevronRight } from 'lucide-react';

interface TemplateSelectorProps {
  onSelectTemplate?: (template: any) => void;
  onClose?: () => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'beauty' | 'trades'>('all');

  const beautyTemplates = ['Hair Styling', 'Nail Services', 'Lash Services', 'Massage Therapy', 'Tattoo Services', 'Esthetics'];
  const tradesTemplates = ['HVAC', 'Plumbing', 'Construction', 'Landscaping', 'Roofing', 'Cleaning'];

  const filteredTemplates = estimateTemplates.filter(template => {
    if (filter === 'beauty') return beautyTemplates.includes(template.title);
    if (filter === 'trades') return tradesTemplates.includes(template.title);
    return true;
  });

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template.title);
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            filter === 'all'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          All Templates
        </button>
        <button
          onClick={() => setFilter('beauty')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            filter === 'beauty'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Beauty & Personal Care
        </button>
        <button
          onClick={() => setFilter('trades')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            filter === 'trades'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Trades & Services
        </button>
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card
            key={template.slug}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate === template.title
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border'
            }`}
            onClick={() => handleSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{template.averageAmount}</p>
                </div>
                {selectedTemplate === template.title && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{template.description}</p>
              
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Key Features:</p>
                <div className="flex flex-wrap gap-1">
                  {template.benefits.slice(0, 3).map((benefit, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Payment Terms:</span> {template.paymentTerms}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      {selectedTemplate && (
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button
            onClick={() => {
              if (onClose) onClose();
            }}
            className="flex-1"
          >
            Use This Template
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedTemplate(null);
              if (onClose) onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;

