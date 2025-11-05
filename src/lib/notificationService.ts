/**
 * Notification Service
 * Handles email and SMS notifications for key events
 */

import { supabase } from '@/integrations/supabase/client';

export type NotificationType = 
  | 'deposit_received'
  | 'payment_overdue'
  | 'invoice_paid'
  | 'milestone_reached'
  | 'payment_reminder';

export interface NotificationOptions {
  type: NotificationType;
  userId: string;
  clientEmail: string;
  clientName: string;
  clientPhone?: string;
  amount?: number;
  invoiceNumber?: string;
  estimateNumber?: string;
  daysOverdue?: number;
  milestoneNumber?: number;
  sendSMS?: boolean;
}

/**
 * Send email notification
 */
export const sendEmailNotification = async (options: NotificationOptions) => {
  const {
    type,
    userId,
    clientEmail,
    clientName,
    amount,
    invoiceNumber,
    estimateNumber,
    daysOverdue,
    milestoneNumber,
  } = options;

  try {
    let subject = '';
    let body = '';

    switch (type) {
      case 'deposit_received':
        subject = `Deposit Received - Thank You!`;
        body = `Hi ${clientName},\n\nWe've received your deposit of $${amount?.toFixed(2)}. We're excited to get started on your project!\n\nEstimate #${estimateNumber}\n\nThank you!`;
        break;

      case 'payment_overdue':
        subject = `Payment Reminder: Invoice #${invoiceNumber} is Overdue`;
        body = `Hi ${clientName},\n\nThis is a reminder that invoice #${invoiceNumber} for $${amount?.toFixed(2)} is now ${daysOverdue} days overdue.\n\nPlease remit payment at your earliest convenience.\n\nThank you!`;
        break;

      case 'invoice_paid':
        subject = `Payment Received - Invoice #${invoiceNumber}`;
        body = `Hi ${clientName},\n\nThank you! We've received your payment of $${amount?.toFixed(2)} for invoice #${invoiceNumber}.\n\nWe appreciate your business!`;
        break;

      case 'milestone_reached':
        subject = `Milestone ${milestoneNumber} Complete!`;
        body = `Hi ${clientName},\n\nGreat news! We've completed milestone ${milestoneNumber} of your project.\n\nAmount: $${amount?.toFixed(2)}\n\nNext steps coming soon!`;
        break;

      case 'payment_reminder':
        subject = `Payment Reminder: Invoice #${invoiceNumber}`;
        body = `Hi ${clientName},\n\nJust a friendly reminder that invoice #${invoiceNumber} for $${amount?.toFixed(2)} is due soon.\n\nPlease let us know if you have any questions.\n\nThank you!`;
        break;
    }

    // Send via edge function
    const { error } = await supabase.functions.invoke('send-notification-email', {
      body: {
        to: clientEmail,
        subject,
        body,
        userId,
        notificationType: type,
      },
    });

    if (error) throw error;

    // Log notification
    await logNotification({
      type,
      userId,
      recipient: clientEmail,
      channel: 'email',
      status: 'sent',
    });

    return { success: true, message: 'Email notification sent' };
  } catch (error) {
    console.error('Error sending email notification:', error);
    await logNotification({
      type,
      userId,
      recipient: clientEmail,
      channel: 'email',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
};

/**
 * Send SMS notification (optional via Twilio)
 */
export const sendSMSNotification = async (options: NotificationOptions) => {
  const { type, userId, clientPhone, clientName, amount, invoiceNumber } = options;

  if (!clientPhone) {
    console.warn('No phone number provided for SMS notification');
    return { success: false, message: 'No phone number provided' };
  }

  try {
    let message = '';

    switch (type) {
      case 'deposit_received':
        message = `Hi ${clientName}, we received your deposit of $${amount?.toFixed(2)}. Thanks!`;
        break;
      case 'payment_overdue':
        message = `Hi ${clientName}, invoice #${invoiceNumber} for $${amount?.toFixed(2)} is overdue. Please pay ASAP.`;
        break;
      case 'invoice_paid':
        message = `Hi ${clientName}, thank you for paying invoice #${invoiceNumber}. We appreciate your business!`;
        break;
      case 'milestone_reached':
        message = `Hi ${clientName}, milestone complete! Next steps coming soon.`;
        break;
      case 'payment_reminder':
        message = `Hi ${clientName}, reminder: invoice #${invoiceNumber} for $${amount?.toFixed(2)} is due soon.`;
        break;
    }

    // Send via Twilio edge function
    const { error } = await supabase.functions.invoke('send-sms-notification', {
      body: {
        to: clientPhone,
        message,
        userId,
        notificationType: type,
      },
    });

    if (error) throw error;

    // Log notification
    await logNotification({
      type,
      userId,
      recipient: clientPhone,
      channel: 'sms',
      status: 'sent',
    });

    return { success: true, message: 'SMS notification sent' };
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    await logNotification({
      type,
      userId,
      recipient: clientPhone,
      channel: 'sms',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
};

/**
 * Send both email and SMS notifications
 */
export const sendNotification = async (options: NotificationOptions) => {
  const results = {
    email: null as any,
    sms: null as any,
  };

  try {
    // Always send email
    results.email = await sendEmailNotification(options);

    // Send SMS if requested and phone provided
    if (options.sendSMS && options.clientPhone) {
      results.sms = await sendSMSNotification(options);
    }

    return { success: true, results };
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw error;
  }
};

/**
 * Log notification for audit trail
 */
export const logNotification = async (options: {
  type: NotificationType;
  userId: string;
  recipient: string;
  channel: 'email' | 'sms';
  status: 'sent' | 'failed';
  error?: string;
}) => {
  try {
    await supabase
      .from('email_logs')
      .insert({
        user_id: options.userId,
        email_type: options.type,
        recipient: options.recipient,
        status: options.status,
        sent_at: new Date().toISOString(),
        metadata: {
          channel: options.channel,
          error: options.error,
        },
      });
  } catch (error) {
    console.error('Error logging notification:', error);
  }
};

