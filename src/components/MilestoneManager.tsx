/**
 * Milestone Manager Component
 * Allows users to create and manage milestone-based payments
 */

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMilestonePayments } from '@/hooks/useMilestonePayments';
import { createMilestonePayments, markMilestoneAsPaid } from '@/lib/milestoneAutomationService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, Clock, Plus, Trash2 } from 'lucide-react';

interface MilestoneStage {
  percentage: number;
  description: string;
  daysUntilDue?: number;
}

interface MilestoneManagerProps {
  estimateId: string;
  totalAmount: number;
  clientName: string;
  clientEmail: string;
  jobDescription: string;
}

export const MilestoneManager: React.FC<MilestoneManagerProps> = ({
  estimateId,
  totalAmount,
  clientName,
  clientEmail,
  jobDescription,
}) => {
  const { user } = useAuth();
  const { milestones, createMilestone, markAsPaid, deleteMilestone } = useMilestonePayments(estimateId);
  const [stages, setStages] = useState<MilestoneStage[]>([
    { percentage: 30, description: 'Deposit', daysUntilDue: 0 },
    { percentage: 50, description: 'Midway', daysUntilDue: 14 },
    { percentage: 20, description: 'Final', daysUntilDue: 30 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddStage = () => {
    setStages([...stages, { percentage: 0, description: '', daysUntilDue: 0 }]);
  };

  const handleRemoveStage = (index: number) => {
    setStages(stages.filter((_, i) => i !== index));
  };

  const handleStageChange = (index: number, field: keyof MilestoneStage, value: any) => {
    const newStages = [...stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setStages(newStages);
  };

  const handleCreateMilestones = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) throw new Error('User not authenticated');

      // Validate stages
      const totalPercentage = stages.reduce((sum, s) => sum + s.percentage, 0);
      if (totalPercentage !== 100) {
        throw new Error(`Milestone percentages must total 100% (currently ${totalPercentage}%)`);
      }

      await createMilestonePayments({
        estimateId,
        userId: user.id,
        stages,
        totalAmount,
        clientEmail,
        clientName,
        jobDescription,
      });

      // Refresh milestones
      window.location.reload();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create milestones';
      setError(message);
      console.error('Error creating milestones:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (milestoneId: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!user) throw new Error('User not authenticated');

      await markMilestoneAsPaid(milestoneId, user.id, estimateId);
      window.location.reload();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to mark milestone as paid';
      setError(message);
      console.error('Error marking milestone as paid:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {milestones.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Create Milestone Payments</CardTitle>
            <CardDescription>Split this project into payment stages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {stages.map((stage, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={stage.description}
                      onChange={(e) => handleStageChange(index, 'description', e.target.value)}
                      placeholder="e.g., Deposit, Midway, Final"
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-sm font-medium">%</label>
                    <Input
                      type="number"
                      value={stage.percentage}
                      onChange={(e) => handleStageChange(index, 'percentage', parseInt(e.target.value))}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="w-32">
                    <label className="text-sm font-medium">Days Until Due</label>
                    <Input
                      type="number"
                      value={stage.daysUntilDue || 0}
                      onChange={(e) => handleStageChange(index, 'daysUntilDue', parseInt(e.target.value))}
                      min="0"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveStage(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={handleAddStage}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Stage
            </Button>

            <div className="bg-gray-50 p-3 rounded text-sm">
              <p className="font-semibold mb-2">Milestone Breakdown:</p>
              {stages.map((stage, index) => (
                <p key={index} className="text-gray-700">
                  {stage.description}: {stage.percentage}% = ${((totalAmount * stage.percentage) / 100).toFixed(2)}
                </p>
              ))}
            </div>

            <Button
              onClick={handleCreateMilestones}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating...' : 'Create Milestones'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Milestone Payments</CardTitle>
            <CardDescription>Track payment stages for this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {milestone.status === 'paid' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : milestone.status === 'overdue' ? (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-600" />
                      )}
                      <div>
                        <p className="font-semibold">
                          Milestone {milestone.milestone_number}: {milestone.description}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${milestone.amount.toFixed(2)} • {milestone.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  {milestone.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => handleMarkAsPaid(milestone.id)}
                      disabled={loading}
                    >
                      Mark Paid
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MilestoneManager;

