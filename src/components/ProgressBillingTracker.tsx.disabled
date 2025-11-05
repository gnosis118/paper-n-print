import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  createProgressBillingEntry,
  getProgressBillingEntries,
  markProgressBillingAsBilled,
} from '@/lib/depositStagingService';
import { Plus, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProgressBillingTrackerProps {
  estimateId: string;
  userId: string;
  totalAmount: number;
  onProgressUpdated?: (totalBilled: number) => void;
}

interface ProgressEntry {
  id: string;
  entry_number: number;
  description: string;
  percentage_complete: number;
  amount_to_bill: number;
  billed_at?: string;
}

const ProgressBillingTracker: React.FC<ProgressBillingTrackerProps> = ({
  estimateId,
  userId,
  totalAmount,
  onProgressUpdated,
}) => {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [description, setDescription] = useState('');
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [amountToBill, setAmountToBill] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load entries on mount
  React.useEffect(() => {
    loadEntries();
  }, [estimateId]);

  const loadEntries = async () => {
    try {
      const loadedEntries = await getProgressBillingEntries(estimateId);
      setEntries(loadedEntries);
      calculateTotalBilled(loadedEntries);
    } catch (error) {
      console.error('Error loading progress billing entries:', error);
    }
  };

  const calculateTotalBilled = (entries: ProgressEntry[]) => {
    const totalBilled = entries
      .filter((e) => e.billed_at)
      .reduce((sum, e) => sum + e.amount_to_bill, 0);
    onProgressUpdated?.(totalBilled);
  };

  const handleAddEntry = async () => {
    if (!description || percentageComplete <= 0 || amountToBill <= 0) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const newEntry = await createProgressBillingEntry(estimateId, userId, {
        description,
        percentage_complete: percentageComplete,
        amount_to_bill: amountToBill,
      });

      setEntries([...entries, newEntry]);
      setDescription('');
      setPercentageComplete(0);
      setAmountToBill(0);
      setIsAdding(false);
    } catch (error) {
      console.error('Error creating progress billing entry:', error);
      alert('Failed to create progress entry');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsBilled = async (entryId: string) => {
    setLoading(true);
    try {
      const updatedEntry = await markProgressBillingAsBilled(entryId);
      const updatedEntries = entries.map((e) => (e.id === entryId ? updatedEntry : e));
      setEntries(updatedEntries);
      calculateTotalBilled(updatedEntries);
    } catch (error) {
      console.error('Error marking as billed:', error);
      alert('Failed to mark as billed');
    } finally {
      setLoading(false);
    }
  };

  const totalBilled = entries
    .filter((e) => e.billed_at)
    .reduce((sum, e) => sum + e.amount_to_bill, 0);
  const totalPending = entries
    .filter((e) => !e.billed_at)
    .reduce((sum, e) => sum + e.amount_to_bill, 0);
  const overallProgress = entries.length > 0
    ? entries.reduce((sum, e) => sum + e.percentage_complete, 0) / entries.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>Track work completion and billing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm font-bold">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Billed</p>
                  <p className="text-2xl font-bold text-green-600">${totalBilled.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">${totalPending.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Progress Entries */}
      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Progress Entries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{entry.description}</h4>
                    <p className="text-sm text-muted-foreground">Entry #{entry.entry_number}</p>
                  </div>
                  {entry.billed_at && (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      Billed
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-bold">{entry.percentage_complete}%</span>
                  </div>
                  <Progress value={entry.percentage_complete} className="h-2" />
                </div>

                <div className="bg-muted p-3 rounded flex justify-between items-center">
                  <span className="text-sm font-medium">Amount to Bill</span>
                  <span className="font-bold">${entry.amount_to_bill.toFixed(2)}</span>
                </div>

                {!entry.billed_at && (
                  <Button
                    onClick={() => handleMarkAsBilled(entry.id)}
                    disabled={loading}
                    className="w-full"
                    variant="outline"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Mark as Billed
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Add New Entry */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Add Progress Entry</CardTitle>
              <CardDescription>Record work completion and billing</CardDescription>
            </div>
            {!isAdding && (
              <Button onClick={() => setIsAdding(true)} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            )}
          </div>
        </CardHeader>

        {isAdding && (
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="progress-description">Work Description</Label>
              <Textarea
                id="progress-description"
                placeholder="e.g., Foundation completed, Framing in progress"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="progress-percentage">Completion %</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="progress-percentage"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={percentageComplete}
                    onChange={(e) => setPercentageComplete(parseFloat(e.target.value))}
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="progress-amount">Amount to Bill</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">$</span>
                  <Input
                    id="progress-amount"
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={amountToBill}
                    onChange={(e) => setAmountToBill(parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Validation */}
            {amountToBill > totalAmount - totalBilled && (
              <div className="flex gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                <p className="text-sm text-yellow-800">
                  Amount exceeds remaining balance (${(totalAmount - totalBilled).toFixed(2)})
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleAddEntry} disabled={loading} className="flex-1">
                Add Entry
              </Button>
              <Button onClick={() => setIsAdding(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ProgressBillingTracker;

