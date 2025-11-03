import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EstimateEmailRequest {
  estimateId: string;
  type: 'created' | 'deposit_paid' | 'reminder';
  recipientEmail?: string;
}

const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
  // Using Resend API for email sending
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

const generateEstimateCreatedEmail = (estimate: any, estimateLink: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Estimate from ProInvoice</h2>
      <p>Hi ${estimate.client_name},</p>
      <p>We've created an estimate for you. Please review the details below and pay the deposit to get started.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Estimate #${estimate.number}</h3>
        ${estimate.title ? `<p><strong>Project:</strong> ${estimate.title}</p>` : ''}
        <p><strong>Total Amount:</strong> $${(estimate.total).toFixed(2)}</p>
        <p><strong>Deposit Required:</strong> $${(estimate.deposit_amount).toFixed(2)} (${estimate.deposit_percentage}%)</p>
      </div>

      <p>
        <a href="${estimateLink}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View & Pay Deposit
        </a>
      </p>

      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        This estimate is valid for 30 days. Once you pay the deposit, we'll create an invoice for the remaining balance.
      </p>
    </div>
  `;
};

const generateDepositPaidEmail = (estimate: any, invoice: any): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Deposit Received - Invoice Created</h2>
      <p>Hi ${estimate.client_name},</p>
      <p>Thank you! We've received your deposit payment of $${(estimate.deposit_amount).toFixed(2)}.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Invoice #${invoice.invoice_number}</h3>
        <p><strong>Remaining Balance:</strong> $${(invoice.total).toFixed(2)}</p>
        <p><strong>Due Date:</strong> ${invoice.due_date}</p>
      </div>

      <p>Your invoice has been created and is ready for payment. You can view and pay it using the link below:</p>
      
      <p>
        <a href="https://proinvoice.app/i/${invoice.id}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View Invoice
        </a>
      </p>

      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        Thank you for your business!
      </p>
    </div>
  `;
};

const generateReminderEmail = (estimate: any, estimateLink: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Reminder: Estimate Payment Due Soon</h2>
      <p>Hi ${estimate.client_name},</p>
      <p>This is a friendly reminder that the deposit for your estimate is due soon.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Estimate #${estimate.number}</h3>
        <p><strong>Deposit Amount:</strong> $${(estimate.deposit_amount).toFixed(2)}</p>
      </div>

      <p>
        <a href="${estimateLink}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Pay Deposit Now
        </a>
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

    const body = await req.json() as EstimateEmailRequest;
    const { estimateId, type, recipientEmail } = body;

    if (!estimateId || !type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch estimate
    const { data: estimate, error: estimateError } = await supabase
      .from('estimates')
      .select('*')
      .eq('id', estimateId)
      .single();

    if (estimateError || !estimate) {
      throw new Error(`Estimate not found: ${estimateError?.message}`);
    }

    const email = recipientEmail || estimate.client_email;
    const estimateLink = `https://proinvoice.app/e/${estimate.sharing_token || estimate.public_slug}`;

    let subject = '';
    let html = '';

    switch (type) {
      case 'created':
        subject = `New Estimate #${estimate.number} from ProInvoice`;
        html = generateEstimateCreatedEmail(estimate, estimateLink);
        break;

      case 'deposit_paid':
        // Fetch the created invoice
        const { data: invoice } = await supabase
          .from('invoices')
          .select('*')
          .eq('estimate_id', estimateId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        subject = `Deposit Received - Invoice #${invoice?.invoice_number || 'N/A'} Created`;
        html = generateDepositPaidEmail(estimate, invoice || {});
        break;

      case 'reminder':
        subject = `Reminder: Estimate #${estimate.number} Payment Due`;
        html = generateReminderEmail(estimate, estimateLink);
        break;

      default:
        throw new Error(`Unknown email type: ${type}`);
    }

    await sendEmail(email, subject, html);

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error sending estimate email:', errorMessage);

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

