import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import { useEstimateRevisions, type EstimateRevision } from '@/hooks/useEstimateRevisions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RevisionComparisonProps {
  estimateId: string;
}

export const RevisionComparison: React.FC<RevisionComparisonProps> = ({ estimateId }) => {
  const { revisions } = useEstimateRevisions(estimateId);
  const [isOpen, setIsOpen] = useState(false);
  const [fromVersion, setFromVersion] = useState<string>('');
  const [toVersion, setToVersion] = useState<string>('');

  const fromRev = revisions.find(r => r.id === fromVersion);
  const toRev = revisions.find(r => r.id === toVersion);

  const getChangeColor = (oldVal: any, newVal: any) => {
    if (oldVal === newVal) return 'text-muted-foreground';
    return 'text-orange-600 font-medium';
  };

  const renderComparison = () => {
    if (!fromRev || !toRev) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Select two versions to compare
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Title */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Title</p>
            <p className={getChangeColor(fromRev.title, toRev.title)}>
              {fromRev.title || '(untitled)'}
            </p>
          </div>
          <div className="flex justify-center">
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Title</p>
            <p className={getChangeColor(fromRev.title, toRev.title)}>
              {toRev.title || '(untitled)'}
            </p>
          </div>
        </div>

        <Separator />

        {/* Amounts */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Subtotal</p>
            <p className={getChangeColor(fromRev.subtotal, toRev.subtotal)}>
              ${fromRev.subtotal.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-center pt-6">
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Subtotal</p>
            <p className={getChangeColor(fromRev.subtotal, toRev.subtotal)}>
              ${toRev.subtotal.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Tax */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Tax ({fromRev.tax_rate}%)</p>
            <p className={getChangeColor(fromRev.tax_amount, toRev.tax_amount)}>
              ${fromRev.tax_amount.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-center pt-6">
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Tax ({toRev.tax_rate}%)</p>
            <p className={getChangeColor(fromRev.tax_amount, toRev.tax_amount)}>
              ${toRev.tax_amount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="grid grid-cols-3 gap-4 bg-muted p-4 rounded-lg">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Total</p>
            <p className={`text-lg font-bold ${getChangeColor(fromRev.total, toRev.total)}`}>
              ${fromRev.total.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-center pt-6">
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Total</p>
            <p className={`text-lg font-bold ${getChangeColor(fromRev.total, toRev.total)}`}>
              ${toRev.total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Deposit */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Deposit ({fromRev.deposit_percentage}%)
            </p>
            <p className={getChangeColor(fromRev.deposit_amount, toRev.deposit_amount)}>
              ${fromRev.deposit_amount.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-center pt-6">
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Deposit ({toRev.deposit_percentage}%)
            </p>
            <p className={getChangeColor(fromRev.deposit_amount, toRev.deposit_amount)}>
              ${toRev.deposit_amount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Items Count */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Items</p>
            <p className={getChangeColor(fromRev.items?.length, toRev.items?.length)}>
              {fromRev.items?.length || 0} items
            </p>
          </div>
          <div className="flex justify-center pt-6">
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Items</p>
            <p className={getChangeColor(fromRev.items?.length, toRev.items?.length)}>
              {toRev.items?.length || 0} items
            </p>
          </div>
        </div>

        {/* Change Description */}
        {toRev.change_description && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Change Description</p>
              <p className="text-sm bg-muted p-3 rounded">{toRev.change_description}</p>
            </div>
          </>
        )}
      </div>
    );
  };

  if (revisions.length < 2) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Compare Versions
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compare Revisions</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Version Selectors */}
          <div className="grid grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm font-medium">From Version</label>
              <Select value={fromVersion} onValueChange={setFromVersion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  {revisions.map(rev => (
                    <SelectItem key={rev.id} value={rev.id}>
                      v{rev.version_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center pb-2">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <div>
              <label className="text-sm font-medium">To Version</label>
              <Select value={toVersion} onValueChange={setToVersion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  {revisions.map(rev => (
                    <SelectItem key={rev.id} value={rev.id}>
                      v{rev.version_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Comparison */}
          {renderComparison()}

          {/* Legend */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-900">
              <span className="font-medium">Orange text</span> indicates values that changed between versions
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

