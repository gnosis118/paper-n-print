import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useEstimateRevisions, type EstimateRevision } from '@/hooks/useEstimateRevisions';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface EstimateRevisionHistoryProps {
  estimateId: string;
}

export const EstimateRevisionHistory: React.FC<EstimateRevisionHistoryProps> = ({ estimateId }) => {
  const { revisions, loading, restoreRevision } = useEstimateRevisions(estimateId);
  const [expandedRevision, setExpandedRevision] = useState<string | null>(null);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState<EstimateRevision | null>(null);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revision History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (revisions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revision History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No revisions yet. Changes will be tracked here.</p>
        </CardContent>
      </Card>
    );
  }

  const handleRestore = async () => {
    if (!selectedRevision) return;
    try {
      await restoreRevision(selectedRevision);
      setRestoreDialogOpen(false);
      setSelectedRevision(null);
    } catch (err) {
      console.error('Error restoring revision:', err);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Revision History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {revisions.map((revision, index) => (
            <div key={revision.id}>
              <div
                className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => setExpandedRevision(expandedRevision === revision.id ? null : revision.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">v{revision.version_number}</Badge>
                    <span className="font-medium">{revision.title || 'Untitled'}</span>
                  </div>
                  {revision.change_description && (
                    <p className="text-sm text-muted-foreground mt-1">{revision.change_description}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(revision.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRevision(revision);
                      setRestoreDialogOpen(true);
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  {expandedRevision === revision.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>

              {expandedRevision === revision.id && (
                <>
                  <Separator className="my-3" />
                  <div className="pl-4 space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Total Amount</p>
                      <p className="text-lg font-bold">${revision.total.toFixed(2)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-muted-foreground">Subtotal</p>
                        <p>${revision.subtotal.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Tax ({revision.tax_rate}%)</p>
                        <p>${revision.tax_amount.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-muted-foreground">Deposit ({revision.deposit_percentage}%)</p>
                        <p>${revision.deposit_amount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Items</p>
                        <p>{revision.items?.length || 0} items</p>
                      </div>
                    </div>

                    {revision.notes && (
                      <div>
                        <p className="font-medium text-muted-foreground">Notes</p>
                        <p className="text-muted-foreground">{revision.notes}</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {index < revisions.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore Revision?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore the estimate to version {selectedRevision?.version_number}. A new revision will be created documenting this restore.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-muted p-3 rounded-lg my-4">
            <p className="text-sm font-medium">{selectedRevision?.title || 'Untitled'}</p>
            <p className="text-sm text-muted-foreground">${selectedRevision?.total.toFixed(2)}</p>
          </div>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestore}>Restore</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

