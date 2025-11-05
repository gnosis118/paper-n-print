/**
 * AI Payment Reminder Agent
 * Generates personalized payment reminders with tone options
 */

import { supabase } from '@/integrations/supabase/client';

export type ReminderTone = 'friendly' | 'firm' | 'professional';

export interface ReminderContext {
  clientName: string;
  jobType: string;
  amountDue: number;
  daysOverdue: number;
  businessName: string;
  paymentLink?: string;
  reminderNumber: number;
}

export interface ReminderPreferences {
  tone: ReminderTone;
  schedule_days: number[];
  auto_send: boolean;
  max_reminders_per_estimate: number;
}

/**
 * Generate personalized reminder message based on tone and context
 */
export const generateReminderMessage = (
  context: ReminderContext,
  tone: ReminderTone
): { subject: string; body: string } => {
  const { clientName, jobType, amountDue, daysOverdue, businessName, paymentLink, reminderNumber } = context;

  const templates: Record<ReminderTone, (ctx: ReminderContext) => { subject: string; body: string }> = {
    friendly: (ctx) => ({
      subject: `Hey ${ctx.clientName}! Quick reminder about your ${ctx.jobType} payment 😊`,
      body: `Hi ${ctx.clientName},

Hope you're loving the ${ctx.jobType} work we did for you! Just a friendly reminder that we have an outstanding payment of $${ctx.amountDue.toFixed(2)} that's been pending for ${ctx.daysOverdue} days.

No rush, but we'd love to get this wrapped up so we can move on to the next project! 

${ctx.paymentLink ? `You can pay here: ${ctx.paymentLink}` : 'Please let us know if you have any questions!'}

Thanks so much!
${ctx.businessName}`,
    }),
    firm: (ctx) => ({
      subject: `Payment Due: ${ctx.jobType} - $${ctx.amountDue.toFixed(2)}`,
      body: `Dear ${ctx.clientName},

This is a reminder that payment of $${ctx.amountDue.toFixed(2)} for the ${ctx.jobType} is now ${ctx.daysOverdue} days overdue.

Please remit payment immediately to avoid any service interruptions or additional fees.

${ctx.paymentLink ? `Payment link: ${ctx.paymentLink}` : 'Contact us for payment options.'}

${ctx.businessName}`,
    }),
    professional: (ctx) => ({
      subject: `Payment Reminder: ${ctx.jobType} Invoice - $${ctx.amountDue.toFixed(2)}`,
      body: `Dear ${ctx.clientName},

We are writing to remind you of an outstanding payment of $${ctx.amountDue.toFixed(2)} for the ${ctx.jobType} services provided. This payment is now ${ctx.daysOverdue} days past due.

We value our business relationship and would appreciate your prompt attention to this matter.

${ctx.paymentLink ? `Please use this link to complete payment: ${ctx.paymentLink}` : 'Please contact us to arrange payment.'}

Best regards,
${ctx.businessName}`,
    }),
  };

  return templates[tone](context);
};

/**
 * Get user's reminder preferences
 */
export const getReminderPreferences = async (userId: string): Promise<ReminderPreferences> => {
  try {
    const { data, error } = await supabase
      .from('reminder_preferences')
      .select('tone, schedule_days, auto_send, max_reminders_per_estimate')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    return {
      tone: (data?.tone || 'professional') as ReminderTone,
      schedule_days: data?.schedule_days || [3, 7, 14],
      auto_send: data?.auto_send || false,
      max_reminders_per_estimate: data?.max_reminders_per_estimate || 3,
    };
  } catch (error) {
    console.error('Error getting reminder preferences:', error);
    // Return defaults if not found
    return {
      tone: 'professional',
      schedule_days: [3, 7, 14],
      auto_send: false,
      max_reminders_per_estimate: 3,
    };
  }
};

/**
 * Send personalized reminder email
 */
export const sendPersonalizedReminder = async (
  estimateId: string,
  userId: string,
  context: ReminderContext,
  preferences: ReminderPreferences
) => {
  try {
    const { subject, body } = generateReminderMessage(context, preferences.tone);

    // Get estimate details for email
    const { data: estimate, error: estimateError } = await supabase
      .from('estimates')
      .select('client_email')
      .eq('id', estimateId)
      .eq('user_id', userId)
      .single();

    if (estimateError) throw estimateError;

    // Send email via edge function
    const { error: emailError } = await supabase.functions.invoke('send-reminder-email', {
      body: {
        to: estimate.client_email,
        subject,
        body,
        userId,
        estimateId,
        reminderNumber: context.reminderNumber,
      },
    });

    if (emailError) throw emailError;

    // Log reminder sent
    const { error: logError } = await supabase
      .from('estimate_reminders')
      .insert({
        estimate_id: estimateId,
        user_id: userId,
        reminder_number: context.reminderNumber,
        sent_at: new Date().toISOString(),
      });

    if (logError) throw logError;

    return {
      success: true,
      message: `Reminder ${context.reminderNumber} sent to ${estimate.client_email}`,
    };
  } catch (error) {
    console.error('Error sending personalized reminder:', error);
    throw error;
  }
};

/**
 * Schedule reminders based on user preferences
 */
export const scheduleReminders = async (
  estimateId: string,
  userId: string,
  context: ReminderContext,
  preferences: ReminderPreferences
) => {
  try {
    const reminders = [];

    for (let i = 0; i < Math.min(preferences.schedule_days.length, preferences.max_reminders_per_estimate); i++) {
      const daysUntilReminder = preferences.schedule_days[i];
      const reminderTime = new Date(Date.now() + daysUntilReminder * 24 * 60 * 60 * 1000);

      reminders.push({
        estimateId,
        userId,
        reminderNumber: i + 1,
        scheduledFor: reminderTime.toISOString(),
        context,
      });
    }

    return {
      success: true,
      reminders,
      message: `${reminders.length} reminders scheduled`,
    };
  } catch (error) {
    console.error('Error scheduling reminders:', error);
    throw error;
  }
};

