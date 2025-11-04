import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, AlertCircle } from 'lucide-react';
import { useReminderPreferences } from '@/hooks/useReminderPreferences';

export const AIUsageDisplay: React.FC = () => {
  const { preferences, isLoading, canUseAI, getAIBudgetRemaining, getAIBudgetPercentage } = useReminderPreferences();

  if (isLoading || !preferences?.ai_personalization_enabled) {
    return null;
  }

  const budgetRemaining = getAIBudgetRemaining();
  const budgetPercentage = getAIBudgetPercentage();
  const budgetTotal = preferences.ai_monthly_budget_cents / 100;
  const budgetUsed = preferences.ai_usage_this_month_cents / 100;

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-base">AI Personalization Budget</CardTitle>
          </div>
          <Badge variant={canUseAI() ? 'default' : 'destructive'}>
            {canUseAI() ? 'Active' : 'Limit Reached'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Budget Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Monthly Usage</span>
            <span className="text-sm text-muted-foreground">
              ${budgetUsed.toFixed(2)} / ${budgetTotal.toFixed(2)}
            </span>
          </div>
          <Progress value={budgetPercentage} className="h-2" />
        </div>

        {/* Budget Remaining */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <p className="text-xs text-muted-foreground mb-1">Remaining</p>
            <p className="text-lg font-semibold text-purple-600">
              ${(budgetRemaining / 100).toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <p className="text-xs text-muted-foreground mb-1">Used This Month</p>
            <p className="text-lg font-semibold text-pink-600">
              {budgetPercentage.toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Warning if near limit */}
        {budgetPercentage > 80 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Budget Warning</p>
              <p className="text-xs">You're using {budgetPercentage.toFixed(0)}% of your monthly AI budget.</p>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-white rounded-lg p-3 border border-purple-200">
          <p className="text-xs text-muted-foreground">
            💡 AI personalization helps create unique, friendly reminder messages for each client. 
            Typical cost: $0.01-0.05 per personalized reminder.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

