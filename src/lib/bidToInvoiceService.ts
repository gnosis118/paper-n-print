import { supabase } from '@/integrations/supabase/client';

export interface BidToInvoiceOptions {
  estimateId: string;
  userId: string;
  sendEmail?: boolean;
  clientEmail?: string;
}

/**
 * Converts a bid (estimate) to an invoice after deposit is paid
 * This is the core automation for the contractor pivot
 */
export const convertBidToInvoice = async (options: BidToInvoiceOptions) => {
  const { estimateId, userId, sendEmail = true, clientEmail } = options;

  try {
    // 1. Fetch the estimate/bid
    const { data: estimate, error: estimateError } = await supabase
      .from('estimates')
      .select('*')
      .eq('id', estimateId)
      .eq('user_id', userId)
      .single();

    if (estimateError) throw estimateError;
    if (!estimate) throw new Error('Estimate not found');

    // 2. Create invoice from estimate
    const invoiceData = {
      user_id: userId,
      estimate_id: estimateId,
      client_id: estimate.client_id,
      client_name: estimate.client_name,
      client_email: estimate.client_email,
      number: `INV-${estimate.number.replace('EST-', '')}`,
      items: estimate.items,
      subtotal: estimate.subtotal,
      tax_rate: estimate.tax_rate,
      tax_amount: estimate.tax_amount,
      total: estimate.total,
      status: 'sent',
      terms: estimate.terms,
      notes: estimate.notes,
      created_at: new Date().toISOString(),
    };

    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert(invoiceData)
      .select()
      .single();

    if (invoiceError) throw invoiceError;

    // 3. Update estimate status to invoiced
    const { error: updateError } = await supabase
      .from('estimates')
      .update({
        status: 'invoiced',
        updated_at: new Date().toISOString(),
      })
      .eq('id', estimateId);

    if (updateError) throw updateError;

    // 4. Send email notification if enabled
    if (sendEmail && clientEmail) {
      await sendInvoiceCreatedEmail({
        clientEmail,
        clientName: estimate.client_name,
        invoiceNumber: invoice.number,
        invoiceTotal: invoice.total,
        userId,
      });
    }

    return {
      success: true,
      invoice,
      message: 'Bid successfully converted to invoice',
    };
  } catch (error) {
    console.error('Error converting bid to invoice:', error);
    throw error;
  }
};

/**
 * Send email notification when invoice is created from bid
 */
export const sendInvoiceCreatedEmail = async (options: {
  clientEmail: string;
  clientName: string;
  invoiceNumber: string;
  invoiceTotal: number;
  userId: string;
}) => {
  const { clientEmail, clientName, invoiceNumber, invoiceTotal, userId } = options;

  try {
    // Call edge function to send email
    const { error } = await supabase.functions.invoke('send-invoice-email', {
      body: {
        to: clientEmail,
        clientName,
        invoiceNumber,
        invoiceTotal,
        userId,
        emailType: 'invoice_created',
      },
    });

    if (error) throw error;

    // Log email sent
    await supabase
      .from('email_logs')
      .insert({
        user_id: userId,
        email_type: 'invoice_created',
        recipient: clientEmail,
        status: 'sent',
        sent_at: new Date().toISOString(),
      });

    return { success: true };
  } catch (error) {
    console.error('Error sending invoice created email:', error);
    // Don't throw - email failure shouldn't block invoice creation
    return { success: false, error };
  }
};

/**
 * Send deposit received notification email
 */
export const sendDepositReceivedEmail = async (options: {
  clientEmail: string;
  clientName: string;
  estimateNumber: string;
  depositAmount: number;
  userId: string;
}) => {
  const { clientEmail, clientName, estimateNumber, depositAmount, userId } = options;

  try {
    const { error } = await supabase.functions.invoke('send-estimate-email', {
      body: {
        to: clientEmail,
        clientName,
        estimateNumber,
        depositAmount,
        userId,
        emailType: 'deposit_received',
      },
    });

    if (error) throw error;

    // Log email sent
    await supabase
      .from('email_logs')
      .insert({
        user_id: userId,
        email_type: 'deposit_received',
        recipient: clientEmail,
        status: 'sent',
        sent_at: new Date().toISOString(),
      });

    return { success: true };
  } catch (error) {
    console.error('Error sending deposit received email:', error);
    return { success: false, error };
  }
};

/**
 * Auto-convert bid to invoice when deposit is paid (webhook handler)
 */
export const handleDepositPaidWebhook = async (options: {
  estimateId: string;
  userId: string;
  depositAmount: number;
  clientEmail: string;
  clientName: string;
}) => {
  const { estimateId, userId, depositAmount, clientEmail, clientName } = options;

  try {
    // 1. Send deposit received notification
    await sendDepositReceivedEmail({
      clientEmail,
      clientName,
      estimateNumber: estimateId,
      depositAmount,
      userId,
    });

    // 2. Convert bid to invoice
    const result = await convertBidToInvoice({
      estimateId,
      userId,
      sendEmail: true,
      clientEmail,
    });

    return result;
  } catch (error) {
    console.error('Error handling deposit paid webhook:', error);
    throw error;
  }
};

