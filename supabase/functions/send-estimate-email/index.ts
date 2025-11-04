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
  const depositAmount = estimate.deposit_amount || 0;
  const remainingBalance = invoice.total || 0;
  const totalAmount = depositAmount + remainingBalance;

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #f973a7 0%, #c77dff 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">✓ Deposit Received</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Thank you for your payment!</p>
      </div>

      <!-- Main Content -->
      <div style="background: #fff; padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="margin: 0 0 20px 0; font-size: 16px;">Hi ${estimate.client_name},</p>

        <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
          We've successfully received your deposit payment of <strong style="color: #f973a7; font-size: 18px;">$${depositAmount.toFixed(2)}</strong>.
          Your project is now confirmed and we're ready to get started!
        </p>

        <!-- Payment Summary -->
        <div style="background: #f9fafb; border-left: 4px solid #f973a7; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">Payment Summary</h3>

          <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <span style="color: #666;">Deposit Paid:</span>
            <strong style="color: #059669;">$${depositAmount.toFixed(2)}</strong>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <span style="color: #666;">Remaining Balance:</span>
            <strong style="color: #d97706;">$${remainingBalance.toFixed(2)}</strong>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 16px;">
            <span style="color: #1f2937; font-weight: 600;">Total Project Amount:</span>
            <strong style="color: #1f2937; font-size: 18px;">$${totalAmount.toFixed(2)}</strong>
          </div>
        </div>

        <!-- Invoice Details -->
        <div style="background: #f0f9ff; border: 1px solid #bfdbfe; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 16px;">Invoice Created</h3>
          <p style="margin: 0 0 10px 0; color: #333;">
            <strong>Invoice #:</strong> ${invoice.invoice_number || 'N/A'}
          </p>
          <p style="margin: 0 0 10px 0; color: #333;">
            <strong>Due Date:</strong> ${invoice.due_date || 'N/A'}
          </p>
          <p style="margin: 0; color: #666; font-size: 14px;">
            Your invoice has been created and is ready for the remaining balance payment.
          </p>
        </div>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://proinvoice.app/i/${invoice.id}" style="background: linear-gradient(135deg, #f973a7 0%, #c77dff 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            View Invoice & Pay Balance
          </a>
        </div>

        <!-- Next Steps -->
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 15px;">What's Next?</h3>
          <ul style="margin: 0; padding-left: 20px; color: #78350f;">
            <li style="margin-bottom: 8px;">We'll begin work on your project right away</li>
            <li style="margin-bottom: 8px;">You'll receive updates on your project progress</li>
            <li>Pay the remaining balance by the due date to complete your project</li>
          </ul>
        </div>

        <!-- Footer -->
        <p style="color: #999; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          If you have any questions about your invoice or project, please don't hesitate to reach out. We're here to help!
        </p>
      </div>

      <!-- Footer Brand -->
      <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="margin: 0; color: #999; font-size: 12px;">
          ProInvoice — Professional Invoicing for Beauty & Service Professionals
        </p>
      </div>
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

