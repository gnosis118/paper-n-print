import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Save, AlertCircle, Zap, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ReminderConfig {
  enabled: boolean;
  daysUntilFirstReminder: number;
  maxRemindersPerEstimate: number;
  reminderFrequencyDays: number;
  aiPersonalizationEnabled: boolean;
  aiMonthlyBudgetCents: number;
}

export const ReminderSettings: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState<ReminderConfig>({
    enabled: true,
    daysUntilFirstReminder: 3,
    maxRemindersPerEstimate: 3,
    reminderFrequencyDays: 3,
    aiPersonalizationEnabled: false,
    aiMonthlyBudgetCents: 500,
  });

  // Load preferences from database
  useEffect(() => {
    if (isOpen && user) {
      loadPreferences();
    }
  }, [isOpen, user]);

  const loadPreferences = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('reminder_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setConfig({
          enabled: data.enabled,
          daysUntilFirstReminder: data.days_until_first_reminder,
          maxRemindersPerEstimate: data.max_reminders_per_estimate,
          reminderFrequencyDays: data.reminder_frequency_days,
          aiPersonalizationEnabled: data.ai_personalization_enabled,
          aiMonthlyBudgetCents: data.ai_monthly_budget_cents,
        });
      }
    } catch (err) {
      console.error('Failed to load preferences:', err);
      toast({
        title: 'Error',
        description: 'Failed to load reminder settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('reminder_preferences')
        .upsert({
          user_id: user.id,
          enabled: config.enabled,
          days_until_first_reminder: config.daysUntilFirstReminder,
          max_reminders_per_estimate: config.maxRemindersPerEstimate,
          reminder_frequency_days: config.reminderFrequencyDays,
          ai_personalization_enabled: config.aiPersonalizationEnabled,
          ai_monthly_budget_cents: config.aiMonthlyBudgetCents,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Reminder settings saved successfully',
      });
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to save settings:', err);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setConfig({
      enabled: true,
      daysUntilFirstReminder: 3,
      maxRemindersPerEstimate: 3,
      reminderFrequencyDays: 3,
      aiPersonalizationEnabled: false,
      aiMonthlyBudgetCents: 500,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Bell className="w-4 h-4 mr-2" />
          Reminder Settings
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Configure Automatic Reminders</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Automatic Reminders</p>
                  <p>Clients will receive reminder emails for unpaid estimates based on these settings.</p>
                </div>
              </div>

              {/* Enable/Disable Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Enable Reminders</p>
                  <p className="text-sm text-muted-foreground">Turn automatic reminders on or off</p>
                </div>
                <Switch
                  checked={config.enabled}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enabled: checked }))}
                />
              </div>

              {config.enabled && (
                <>
                  {/* Days Until First Reminder */}
                  <div>
                    <Label htmlFor="daysUntilFirstReminder" className="font-medium">
                      Days Until First Reminder
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      How many days after estimate creation to send first reminder
                    </p>
                    <div className="flex items-center gap-2">
                      <Input
                        id="daysUntilFirstReminder"
                        type="number"
                        min="1"
                        max="30"
                        value={config.daysUntilFirstReminder}
                        onChange={(e) =>
                          setConfig(prev => ({
                            ...prev,
                            daysUntilFirstReminder: Math.max(1, parseInt(e.target.value) || 1),
                          }))
                        }
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>

                  {/* Max Reminders */}
                  <div>
                    <Label htmlFor="maxRemindersPerEstimate" className="font-medium">
                      Maximum Reminders Per Estimate
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Stop sending reminders after this many attempts
                    </p>
                    <div className="flex items-center gap-2">
                      <Input
                        id="maxRemindersPerEstimate"
                        type="number"
                        min="1"
                        max="10"
                        value={config.maxRemindersPerEstimate}
                        onChange={(e) =>
                          setConfig(prev => ({
                            ...prev,
                            maxRemindersPerEstimate: Math.max(1, parseInt(e.target.value) || 1),
                          }))
                        }
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">reminders</span>
                    </div>
                  </div>

                  {/* Reminder Frequency */}
                  <div>
                    <Label htmlFor="reminderFrequencyDays" className="font-medium">
                      Reminder Frequency
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Days between subsequent reminders
                    </p>
                    <div className="flex items-center gap-2">
                      <Input
                        id="reminderFrequencyDays"
                        type="number"
                        min="1"
                        max="30"
                        value={config.reminderFrequencyDays}
                        onChange={(e) =>
                          setConfig(prev => ({
                            ...prev,
                            reminderFrequencyDays: Math.max(1, parseInt(e.target.value) || 1),
                          }))
                        }
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Preview</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• First reminder: {config.daysUntilFirstReminder} days after creation</li>
                      <li>• Subsequent reminders: Every {config.reminderFrequencyDays} days</li>
                      <li>• Stop after: {config.maxRemindersPerEstimate} reminders sent</li>
                    </ul>
                  </div>
                </>
              )}

              {/* AI Personalization Section */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">AI Personalization</p>
                      <p className="text-sm text-muted-foreground">Use AI to personalize reminder messages</p>
                    </div>
                  </div>
                  <Switch
                    checked={config.aiPersonalizationEnabled}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, aiPersonalizationEnabled: checked }))}
                  />
                </div>

                {config.aiPersonalizationEnabled && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <Label htmlFor="aiMonthlyBudget" className="font-medium">
                      Monthly AI Budget
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Maximum amount to spend on AI personalization per month
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        id="aiMonthlyBudget"
                        type="number"
                        min="1"
                        max="100"
                        step="0.50"
                        value={(config.aiMonthlyBudgetCents / 100).toFixed(2)}
                        onChange={(e) =>
                          setConfig(prev => ({
                            ...prev,
                            aiMonthlyBudgetCents: Math.max(50, Math.round(parseFloat(e.target.value) * 100)),
                          }))
                        }
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Minimum: $0.50 | Typical cost: $0.01-0.05 per personalized reminder
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleReset}
            >
              Reset to Default
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

