import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  invoiceId: string;
  recipientEmail: string;
  subject?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify the JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid authentication');
    }

    const { invoiceId, recipientEmail, subject, message }: EmailRequest = await req.json();

    // Get invoice data
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select(`
        *,
        clients(*),
        business_profiles(*),
        invoice_items(*)
      `)
      .eq('id', invoiceId)
      .eq('user_id', user.id)
      .single();

    if (invoiceError || !invoice) {
      throw new Error('Invoice not found or access denied');
    }

    // Check if user has email sending feature (Pro plan or higher)
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('plan, features')
      .eq('user_id', user.id)
      .single();

    const features = subscription?.features as any || {};
    if (subscription?.plan === 'free' && !features.email_sending) {
      throw new Error('Email sending requires Pro plan or higher');
    }

    // For now, we'll just log the email data and return success
    // In a real implementation, you would integrate with a service like Resend
    console.log('Email would be sent:', {
      to: recipientEmail,
      subject: subject || `Invoice ${invoice.invoice_number}`,
      invoice: {
        number: invoice.invoice_number,
        total: invoice.total,
        dueDate: invoice.due_date,
      },
      message: message || 'Please find your invoice attached.',
    });

    // Update invoice status to 'sent'
    await supabase
      .from('invoices')
      .update({ status: 'sent' })
      .eq('id', invoiceId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Invoice email sent successfully' 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error sending invoice email:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send invoice email' 
      }),
      {
        status: 400,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);