import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReminderConfig {
  daysUntilReminder: number; // Send reminder X days after estimate creation
  maxReminders: number; // Max reminders to send per estimate
}

const DEFAULT_CONFIG: ReminderConfig = {
  daysUntilReminder: 3, // Send reminder 3 days after estimate creation
  maxReminders: 3, // Send up to 3 reminders
};

const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured, skipping email');
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'noreply@proinvoice.app',
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }
};

const generateReminderEmail = (estimate: any, estimateLink: string, daysOverdue: number): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Friendly Reminder: Estimate Payment Due</h2>
      <p>Hi ${estimate.client_name},</p>
      <p>We wanted to remind you about the estimate we sent ${daysOverdue} days ago. We're still waiting for your deposit payment to get started on your project.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Estimate #${estimate.number}</h3>
        ${estimate.title ? `<p><strong>Project:</strong> ${estimate.title}</p>` : ''}
        <p><strong>Total Amount:</strong> $${(estimate.total).toFixed(2)}</p>
        <p><strong>Deposit Required:</strong> $${(estimate.deposit_amount).toFixed(2)} (${estimate.deposit_percentage}%)</p>
      </div>

      <p>
        <a href="${estimateLink}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Pay Deposit Now
        </a>
      </p>

      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        If you have any questions or need to discuss the estimate, please don't hesitate to reach out.
      </p>
    </div>
  `;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const body = await req.json() as Partial<ReminderConfig>;
    const config = { ...DEFAULT_CONFIG, ...body };

    console.log('Starting estimate reminder process', { config });

    // Find estimates that:
    // 1. Are in 'sent' status (not yet paid)
    // 2. Were created more than X days ago
    // 3. Haven't exceeded max reminders
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - config.daysUntilReminder);

    const { data: estimates, error: estimatesError } = await supabase
      .from('estimates')
      .select('*')
      .eq('status', 'sent')
      .lt('created_at', cutoffDate.toISOString())
      .order('created_at', { ascending: true });

    if (estimatesError) {
      throw new Error(`Failed to fetch estimates: ${estimatesError.message}`);
    }

    console.log(`Found ${estimates?.length || 0} estimates eligible for reminders`);

    let sentCount = 0;
    let errorCount = 0;

    for (const estimate of estimates || []) {
      try {
        // Check if we've already sent max reminders
        const { data: reminders, error: remindersError } = await supabase
          .from('estimate_reminders')
          .select('id')
          .eq('estimate_id', estimate.id);

        if (remindersError && remindersError.code !== 'PGRST116') {
          throw remindersError;
        }

        const reminderCount = reminders?.length || 0;
        if (reminderCount >= config.maxReminders) {
          console.log(`Estimate ${estimate.id} has reached max reminders (${reminderCount})`);
          continue;
        }

        // Calculate days overdue
        const createdDate = new Date(estimate.created_at);
        const daysOverdue = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

        const estimateLink = `https://proinvoice.app/e/${estimate.sharing_token || estimate.public_slug}`;
        const subject = `Reminder: Estimate #${estimate.number} - Payment Due`;
        const html = generateReminderEmail(estimate, estimateLink, daysOverdue);

        await sendEmail(estimate.client_email, subject, html);

        // Record the reminder
        await supabase
          .from('estimate_reminders')
          .insert({
            estimate_id: estimate.id,
            user_id: estimate.user_id,
            reminder_number: reminderCount + 1,
            sent_at: new Date().toISOString(),
          });

        sentCount++;
        console.log(`Sent reminder for estimate ${estimate.id}`);
      } catch (error) {
        errorCount++;
        console.error(`Error processing estimate ${estimate.id}:`, error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Reminders sent: ${sentCount}, Errors: ${errorCount}`,
        stats: { sentCount, errorCount, totalProcessed: estimates?.length || 0 },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in send-estimate-reminders:', errorMessage);

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

