import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createDepositStages, DEPOSIT_STAGING_TEMPLATES } from '@/lib/depositStagingService';
import { DollarSign, Plus, Trash2 } from 'lucide-react';

interface DepositStagingFormProps {
  estimateId: string;
  userId: string;
  totalAmount: number;
  onStagingCreated?: (stages: any[]) => void;
}

interface CustomStage {
  description: string;
  percentage: number;
  daysUntilDue?: number;
}

const DepositStagingForm: React.FC<DepositStagingFormProps> = ({
  estimateId,
  userId,
  totalAmount,
  onStagingCreated,
}) => {
  const [stagingType, setStagingType] = useState<string>('standard');
  const [customStages, setCustomStages] = useState<CustomStage[]>([
    { description: 'Deposit', percentage: 30, daysUntilDue: 0 },
  ]);
  const [loading, setLoading] = useState(false);

  const getTemplateStages = (type: string): CustomStage[] => {
    const templates = DEPOSIT_STAGING_TEMPLATES as Record<string, any[]>;
    return (templates[type] || []).map((stage) => ({
      ...stage,
      daysUntilDue: 0,
    }));
  };

  const handleTemplateChange = (type: string) => {
    setStagingType(type);
    if (type !== 'custom') {
      setCustomStages(getTemplateStages(type));
    }
  };

  const handleAddStage = () => {
    setCustomStages([
      ...customStages,
      { description: '', percentage: 0, daysUntilDue: 0 },
    ]);
  };

  const handleRemoveStage = (index: number) => {
    setCustomStages(customStages.filter((_, i) => i !== index));
  };

  const handleStageChange = (index: number, field: string, value: any) => {
    const newStages = [...customStages];
    newStages[index] = { ...newStages[index], [field]: value };
    setCustomStages(newStages);
  };

  const handleCreateStaging = async () => {
    const totalPercentage = customStages.reduce((sum, stage) => sum + stage.percentage, 0);

    if (totalPercentage !== 100) {
      alert(`Percentages must total 100%. Current total: ${totalPercentage}%`);
      return;
    }

    setLoading(true);
    try {
      const stages = await createDepositStages(
        estimateId,
        userId,
        totalAmount,
        customStages
      );
      onStagingCreated?.(stages);
    } catch (error) {
      console.error('Error creating deposit stages:', error);
      alert('Failed to create deposit stages');
    } finally {
      setLoading(false);
    }
  };

  const totalPercentage = customStages.reduce((sum, stage) => sum + stage.percentage, 0);
  const isValid = totalPercentage === 100 && customStages.every((s) => s.description);

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Deposit Staging Templates</CardTitle>
          <CardDescription>Choose a preset or create a custom split</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={stagingType} onValueChange={handleTemplateChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="cursor-pointer flex-1">
                <div className="font-medium">Single Deposit (30%)</div>
                <p className="text-sm text-muted-foreground">Collect 30% deposit upfront</p>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="split_50_50" id="split_50_50" />
              <Label htmlFor="split_50_50" className="cursor-pointer flex-1">
                <div className="font-medium">50/50 Split</div>
                <p className="text-sm text-muted-foreground">50% deposit, 50% final</p>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="split_30_40_30" id="split_30_40_30" />
              <Label htmlFor="split_30_40_30" className="cursor-pointer flex-1">
                <div className="font-medium">30/40/30 Split</div>
                <p className="text-sm text-muted-foreground">30% deposit, 40% midway, 30% final</p>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="split_25_25_25_25" id="split_25_25_25_25" />
              <Label htmlFor="split_25_25_25_25" className="cursor-pointer flex-1">
                <div className="font-medium">25/25/25/25 Split</div>
                <p className="text-sm text-muted-foreground">4 equal payments</p>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom" className="cursor-pointer flex-1">
                <div className="font-medium">Custom Split</div>
                <p className="text-sm text-muted-foreground">Create your own payment schedule</p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Custom Stages Editor */}
      {stagingType === 'custom' && (
        <Card>
          <CardHeader>
            <CardTitle>Custom Payment Stages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customStages.map((stage, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Stage Description</Label>
                    <Input
                      placeholder="e.g., Initial Deposit"
                      value={stage.description}
                      onChange={(e) => handleStageChange(index, 'description', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Percentage (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      value={stage.percentage}
                      onChange={(e) => handleStageChange(index, 'percentage', parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Days Until Due</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={stage.daysUntilDue || 0}
                      onChange={(e) => handleStageChange(index, 'daysUntilDue', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <div className="flex items-center gap-2 bg-muted p-2 rounded">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-bold">
                        {((totalAmount * stage.percentage) / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {customStages.length > 1 && (
                  <Button
                    onClick={() => handleRemoveStage(index)}
                    variant="ghost"
                    size="sm"
                    className="w-full text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove Stage
                  </Button>
                )}
              </div>
            ))}

            <Button onClick={handleAddStage} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Stage
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Payment Schedule Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {customStages.map((stage, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-muted-foreground">{stage.description}</span>
              <div className="text-right">
                <div className="font-bold">${((totalAmount * stage.percentage) / 100).toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">{stage.percentage}%</div>
              </div>
            </div>
          ))}

          <div className="border-t pt-3 flex justify-between items-center font-bold">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <div className={`text-sm font-medium ${totalPercentage === 100 ? 'text-green-600' : 'text-red-600'}`}>
            {totalPercentage === 100 ? '✓ Valid split' : `⚠ Total: ${totalPercentage}% (must be 100%)`}
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <Button
        onClick={handleCreateStaging}
        disabled={loading || !isValid}
        className="w-full min-h-[48px]"
        size="lg"
      >
        Create Deposit Stages
      </Button>
    </div>
  );
};

export default DepositStagingForm;

