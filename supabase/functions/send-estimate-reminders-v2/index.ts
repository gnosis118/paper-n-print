import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

const generateReminderEmail = (estimate: any, estimateLink: string, daysOverdue: number, personalized: boolean = false): string => {
  const friendlyTone = personalized ? 'We noticed' : 'We wanted to remind you';
  
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #f973a7 0%, #c77dff 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Friendly Reminder</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0;">Estimate #${estimate.number}</p>
      </div>

      <div style="background: #fff; padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="margin: 0 0 20px 0; font-size: 16px;">Hi ${estimate.client_name},</p>
        
        <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
          ${friendlyTone} that your estimate is still pending. ${daysOverdue > 7 ? `It's been ${daysOverdue} days since we sent it.` : ''}
        </p>

        <div style="background: #f9fafb; border-left: 4px solid #f973a7; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">Estimate Details</h3>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="color: #666;">Estimate Amount:</span>
            <strong>$${(estimate.total || 0).toFixed(2)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">Deposit Required:</span>
            <strong style="color: #f973a7;">$${(estimate.deposit_value || 0).toFixed(2)}</strong>
          </div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${estimateLink}" style="background: linear-gradient(135deg, #f973a7 0%, #c77dff 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px;">
            Review & Pay Estimate
          </a>
        </div>

        <p style="color: #999; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          Questions? We're here to help! Just reply to this email.
        </p>
      </div>

      <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="margin: 0; color: #999; font-size: 12px;">
          ProInvoice — Professional Invoicing for Beauty & Service Professionals
        </p>
      </div>
    </div>
  `;
};

const checkAIBudget = async (supabase: any, userId: string): Promise<boolean> => {
  const { data: prefs } = await supabase
    .from('reminder_preferences')
    .select('ai_monthly_budget_cents, ai_usage_this_month_cents, ai_usage_reset_date')
    .eq('user_id', userId)
    .single();

  if (!prefs) return false;

  // Check if budget period has reset
  const today = new Date().toISOString().split('T')[0];
  if (prefs.ai_usage_reset_date && prefs.ai_usage_reset_date < today) {
    // Reset monthly usage
    await supabase
      .from('reminder_preferences')
      .update({
        ai_usage_this_month_cents: 0,
        ai_usage_reset_date: today,
      })
      .eq('user_id', userId);
    return true;
  }

  return prefs.ai_usage_this_month_cents < prefs.ai_monthly_budget_cents;
};

const logAIUsage = async (supabase: any, userId: string, estimateId: string, reminderId: string, tokensCost: number) => {
  await supabase
    .from('ai_usage_logs')
    .insert({
      user_id: userId,
      estimate_id: estimateId,
      reminder_id: reminderId,
      usage_type: 'personalization',
      tokens_used: Math.round(tokensCost / 0.0015), // Rough estimate
      cost_cents: tokensCost,
      status: 'success',
    });

  // Update user's monthly usage
  await supabase.rpc('increment_ai_usage', {
    user_id: userId,
    amount_cents: tokensCost,
  });
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const body = await req.json();
    const { daysUntilReminder = 3, maxReminders = 3, enableAI = false } = body;

    console.log('Starting enhanced reminder process', { daysUntilReminder, maxReminders, enableAI });

    // Find estimates that need reminders
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysUntilReminder);

    const { data: estimates, error: estimatesError } = await supabase
      .from('estimates')
      .select('*, reminder_preferences:user_id(ai_personalization_enabled)')
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
        // Check max reminders
        const { data: reminders } = await supabase
          .from('estimate_reminders')
          .select('id')
          .eq('estimate_id', estimate.id);

        const reminderCount = reminders?.length || 0;
        if (reminderCount >= maxReminders) {
          console.log(`Estimate ${estimate.id} reached max reminders`);
          continue;
        }

        // Check AI budget if enabled
        let useAI = enableAI && estimate.reminder_preferences?.ai_personalization_enabled;
        if (useAI) {
          useAI = await checkAIBudget(supabase, estimate.user_id);
        }

        const daysOverdue = Math.floor((Date.now() - new Date(estimate.created_at).getTime()) / (1000 * 60 * 60 * 24));
        const estimateLink = `https://proinvoice.app/e/${estimate.sharing_token || estimate.public_slug}`;
        const subject = `Reminder: Estimate #${estimate.number} - Payment Due`;
        const html = generateReminderEmail(estimate, estimateLink, daysOverdue, useAI);

        await sendEmail(estimate.client_email, subject, html);

        // Record reminder
        const { data: reminder } = await supabase
          .from('estimate_reminders')
          .insert({
            estimate_id: estimate.id,
            user_id: estimate.user_id,
            reminder_number: reminderCount + 1,
            sent_at: new Date().toISOString(),
          })
          .select()
          .single();

        // Log AI usage if applicable
        if (useAI && reminder) {
          await logAIUsage(supabase, estimate.user_id, estimate.id, reminder.id, 15); // ~$0.015 per reminder
        }

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
    console.error('Error in send-estimate-reminders-v2:', errorMessage);

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

