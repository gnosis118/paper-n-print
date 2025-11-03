import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bell, Save, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ReminderConfig {
  daysUntilReminder: number;
  maxReminders: number;
  enabled: boolean;
}

export const ReminderSettings: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ReminderConfig>({
    daysUntilReminder: 3,
    maxReminders: 3,
    enabled: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage for now (can be extended to save to Supabase)
      localStorage.setItem('reminderConfig', JSON.stringify(config));
      
      toast({
        title: 'Success',
        description: 'Reminder settings saved successfully',
      });
      setIsOpen(false);
    } catch (err) {
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
      daysUntilReminder: 3,
      maxReminders: 3,
      enabled: true,
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
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Automatic Reminders</p>
              <p>Clients will receive reminder emails for unpaid estimates based on these settings.</p>
            </div>
          </div>

          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="enabled" className="font-medium">
              Enable Reminders
            </Label>
            <div className="flex items-center gap-2">
              <input
                id="enabled"
                type="checkbox"
                checked={config.enabled}
                onChange={(e) => setConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Badge variant={config.enabled ? 'default' : 'secondary'}>
                {config.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>

          {config.enabled && (
            <>
              {/* Days Until Reminder */}
              <div>
                <Label htmlFor="daysUntilReminder" className="font-medium">
                  Days Until First Reminder
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  How many days after estimate creation to send first reminder
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    id="daysUntilReminder"
                    type="number"
                    min="1"
                    max="30"
                    value={config.daysUntilReminder}
                    onChange={(e) =>
                      setConfig(prev => ({
                        ...prev,
                        daysUntilReminder: Math.max(1, parseInt(e.target.value) || 1),
                      }))
                    }
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">days</span>
                </div>
              </div>

              {/* Max Reminders */}
              <div>
                <Label htmlFor="maxReminders" className="font-medium">
                  Maximum Reminders Per Estimate
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Stop sending reminders after this many attempts
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    id="maxReminders"
                    type="number"
                    min="1"
                    max="10"
                    value={config.maxReminders}
                    onChange={(e) =>
                      setConfig(prev => ({
                        ...prev,
                        maxReminders: Math.max(1, parseInt(e.target.value) || 1),
                      }))
                    }
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">reminders</span>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Preview</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• First reminder: {config.daysUntilReminder} days after creation</li>
                  <li>• Subsequent reminders: Every {config.daysUntilReminder} days</li>
                  <li>• Stop after: {config.maxReminders} reminders sent</li>
                </ul>
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

