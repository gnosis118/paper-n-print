/**
 * Reminder Preferences Form Component
 * Allows users to configure payment reminder settings
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle } from 'lucide-react';

type ReminderTone = 'friendly' | 'firm' | 'professional';

interface ReminderPreferences {
  tone: ReminderTone;
  schedule_days: number[];
  auto_send: boolean;
  max_reminders_per_estimate: number;
}

export const ReminderPreferencesForm: React.FC = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<ReminderPreferences>({
    tone: 'professional',
    schedule_days: [3, 7, 14],
    auto_send: false,
    max_reminders_per_estimate: 3,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadPreferences = async () => {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('reminder_preferences')
          .select('tone, schedule_days, auto_send, max_reminders_per_estimate')
          .eq('user_id', user.id)
          .single();

        if (err && err.code !== 'PGRST116') throw err;

        if (data) {
          setPreferences({
            tone: (data.tone || 'professional') as ReminderTone,
            schedule_days: data.schedule_days || [3, 7, 14],
            auto_send: data.auto_send || false,
            max_reminders_per_estimate: data.max_reminders_per_estimate || 3,
          });
        }
      } catch (err) {
        console.error('Error loading preferences:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      if (!user) throw new Error('User not authenticated');

      const { error: err } = await supabase
        .from('reminder_preferences')
        .upsert({
          user_id: user.id,
          tone: preferences.tone,
          schedule_days: preferences.schedule_days,
          auto_send: preferences.auto_send,
          max_reminders_per_estimate: preferences.max_reminders_per_estimate,
        })
        .eq('user_id', user.id);

      if (err) throw err;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save preferences';
      setError(message);
      console.error('Error saving preferences:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleScheduleDayChange = (index: number, value: string) => {
    const newDays = [...preferences.schedule_days];
    newDays[index] = parseInt(value) || 0;
    setPreferences({ ...preferences, schedule_days: newDays });
  };

  const addScheduleDay = () => {
    setPreferences({
      ...preferences,
      schedule_days: [...preferences.schedule_days, 21],
    });
  };

  const removeScheduleDay = (index: number) => {
    setPreferences({
      ...preferences,
      schedule_days: preferences.schedule_days.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preferences...</p>
        </div>
      </div>
    );
  }

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

      {success && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <p>Preferences saved successfully!</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Payment Reminder Settings</CardTitle>
          <CardDescription>Configure how you want to be reminded about pending payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tone Selection */}
          <div>
            <label className="text-sm font-semibold mb-3 block">Reminder Tone</label>
            <div className="space-y-2">
              {(['friendly', 'professional', 'firm'] as const).map((tone) => (
                <label key={tone} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="tone"
                    value={tone}
                    checked={preferences.tone === tone}
                    onChange={(e) => setPreferences({ ...preferences, tone: e.target.value as ReminderTone })}
                    className="w-4 h-4"
                  />
                  <span className="capitalize font-medium">{tone}</span>
                  <span className="text-sm text-gray-600">
                    {tone === 'friendly' && '😊 Casual and approachable'}
                    {tone === 'professional' && '💼 Business-like and formal'}
                    {tone === 'firm' && '⚠️ Direct and assertive'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Schedule Days */}
          <div>
            <label className="text-sm font-semibold mb-3 block">Reminder Schedule (days after due date)</label>
            <div className="space-y-2">
              {preferences.schedule_days.map((day, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={day}
                    onChange={(e) => handleScheduleDayChange(index, e.target.value)}
                    min="1"
                    max="30"
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">days</span>
                  {preferences.schedule_days.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeScheduleDay(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={addScheduleDay}
              className="mt-2"
            >
              Add Another Reminder
            </Button>
          </div>

          {/* Max Reminders */}
          <div>
            <label className="text-sm font-semibold mb-3 block">Maximum Reminders Per Estimate</label>
            <Input
              type="number"
              value={preferences.max_reminders_per_estimate}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  max_reminders_per_estimate: parseInt(e.target.value) || 1,
                })
              }
              min="1"
              max="10"
              className="w-24"
            />
            <p className="text-sm text-gray-600 mt-2">
              Stop sending reminders after this many have been sent
            </p>
          </div>

          {/* Auto-Send Toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.auto_send}
                onChange={(e) => setPreferences({ ...preferences, auto_send: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="font-medium">Auto-send reminders</span>
            </label>
            <p className="text-sm text-gray-600 mt-2">
              Automatically send reminders on the schedule above
            </p>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full"
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReminderPreferencesForm;

