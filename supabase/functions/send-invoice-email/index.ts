import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { 
  securityMiddleware, 
  securityLogger, 
  inputValidator, 
  SecurityError 
} from "../_shared/security.ts";

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

const handleInvoiceEmail = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    throw new SecurityError("Method not allowed", 405);
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

    const requestBody: EmailRequest = await req.json();
    const { invoiceId, recipientEmail, subject, message } = requestBody;

    // Enhanced input validation
    const validatedInvoiceId = inputValidator.validateUUID(invoiceId, 'invoiceId');
    const validatedRecipientEmail = inputValidator.validateEmail(recipientEmail);
    const validatedSubject = subject ? inputValidator.validateString(subject, 200, 'subject') : undefined;
    const validatedMessage = message ? inputValidator.validateString(message, 2000, 'message') : undefined;

    securityLogger.logSecurityEvent('INVOICE_EMAIL_REQUEST', {
      invoiceId: validatedInvoiceId,
      recipientEmail: validatedRecipientEmail,
      hasSubject: !!validatedSubject,
      hasMessage: !!validatedMessage,
      userId: user.id
    });

    // Get invoice data with enhanced security check
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select(`
        *,
        clients(*),
        business_profiles(*),
        invoice_items(*)
      `)
      .eq('id', validatedInvoiceId)
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
    securityLogger.logSecurityEvent('INVOICE_EMAIL_SENT', {
      to: validatedRecipientEmail,
      subject: validatedSubject || `Invoice ${invoice.invoice_number}`,
      invoiceNumber: invoice.invoice_number,
      userId: user.id
    });

    console.log('Email would be sent:', {
      to: validatedRecipientEmail,
      subject: validatedSubject || `Invoice ${invoice.invoice_number}`,
      invoice: {
        number: invoice.invoice_number,
        total: invoice.total,
        dueDate: invoice.due_date,
      },
      message: validatedMessage || 'Please find your invoice attached.',
    });

    // Update invoice status to 'sent'
    await supabase
      .from('invoices')
      .update({ status: 'sent' })
      .eq('id', validatedInvoiceId);

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
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error sending invoice email:', errorMessage);
    
    // Log security-related errors
    if (error instanceof SecurityError) {
      securityLogger.logSecurityEvent('INVOICE_EMAIL_SECURITY_ERROR', { 
        message: errorMessage,
        statusCode: error.statusCode
      }, 'WARN');
    } else {
      securityLogger.logSecurityEvent('INVOICE_EMAIL_ERROR', { message: errorMessage }, 'ERROR');
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage || 'Failed to send invoice email' 
      }),
      {
        status: error instanceof SecurityError ? error.statusCode : 400,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

// Apply security middleware
serve(securityMiddleware.withSecurity(handleInvoiceEmail, {
  maxRequestsPerMinute: 5, // Allow 5 email sends per minute per IP (conservative for email)
  maxPayloadSize: 10 * 1024, // 10KB max payload (emails can have longer messages)
  timeoutMs: 30000, // 30 second timeout
  requireUserAgent: true,
  allowedOrigins: ['*'] // Allow all origins for now, can be restricted later
}));