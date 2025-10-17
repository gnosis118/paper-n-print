import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK-ESTIMATES] ${step}${detailsStr}`);
};

// QR code generation utility with sanitization
const generateQRCodeSVG = (text: string): string => {
  // Sanitize input to prevent XSS attacks
  const sanitizedText = text
    .replace(/[<>'"&]/g, (char) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        "'": '&apos;',
        '"': '&quot;',
        '&': '&amp;'
      };
      return entities[char] || char;
    })
    .substring(0, 100); // Limit length

  const size = 200;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="white"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="monospace" font-size="8">QR: ${sanitizedText.substring(0, 30)}...</text>
  </svg>`;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey || !webhookSecret) {
      throw new Error("Missing Stripe configuration");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    // Get raw body text for signature verification
    const body = await req.text();

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logStep("Webhook signature verification failed", { error: errorMessage });
      return new Response(`Webhook signature verification failed: ${errorMessage}`, { 
        status: 400,
        headers: corsHeaders 
      });
    }
    logStep("Event verified", { type: event.type });

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const estimateId = session.metadata?.estimate_id;

      if (!estimateId) {
        logStep("No estimate ID in metadata, skipping");
        return new Response("OK", { status: 200 });
      }

      logStep("Processing deposit payment", { estimateId, sessionId: session.id });

      // Get the estimate
      const { data: estimate, error: estimateError } = await supabaseClient
        .from('estimates')
        .select('*')
        .eq('id', estimateId)
        .single();

      if (estimateError || !estimate) {
        throw new Error(`Estimate not found: ${estimateError?.message}`);
      }

      // Get client IP from session (if available)
      const clientIP = session.customer_details?.address || null;

      // Update estimate status to accepted
      await supabaseClient
        .from('estimates')
        .update({
          status: 'accepted',
          accepted_at: new Date().toISOString(),
          accepted_ip: clientIP,
          payment_intent_id: session.payment_intent as string,
        })
        .eq('id', estimateId);

      logStep("Estimate marked as accepted");

      // Create payment record
      let depositAmount: number;
      if (estimate.deposit_type === 'percent') {
        depositAmount = (estimate.total * estimate.deposit_value) / 100;
      } else {
        depositAmount = estimate.deposit_value;
      }

      await supabaseClient
        .from('payments')
        .insert({
          estimate_id: estimateId,
          amount: depositAmount,
          method: 'stripe',
          stripe_payment_intent: session.payment_intent as string,
          status: 'completed',
        });

      logStep("Payment record created");

      // Create invoice from estimate
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      
      // Calculate remaining balance
      const remainingBalance = estimate.total - depositAmount;

      // Create invoice items from estimate items + deposit credit
      const invoiceItems = [
        ...estimate.items,
        {
          description: `Deposit Credit (Applied from Estimate #${estimate.number})`,
          quantity: 1,
          rate: -depositAmount,
          amount: -depositAmount,
          taxable: false
        }
      ];

      const { data: newInvoice, error: invoiceError } = await supabaseClient
        .from('invoices')
        .insert({
          user_id: estimate.user_id,
          client_id: estimate.client_id,
          estimate_id: estimateId,
          invoice_number: invoiceNumber,
          issue_date: new Date().toISOString().split('T')[0],
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
          subtotal: estimate.subtotal,
          tax_rate: estimate.tax_rate,
          tax_amount: estimate.tax_amount,
          total: remainingBalance,
          status: remainingBalance > 0 ? 'pending' : 'paid',
          template: 'Clean',
          notes: `Generated from Estimate #${estimate.number}. Deposit of $${depositAmount.toFixed(2)} has been applied.`,
        })
        .select()
        .single();

      if (invoiceError || !newInvoice) {
        throw new Error(`Failed to create invoice: ${invoiceError?.message}`);
      }

      logStep("Invoice created", { invoiceId: newInvoice.id });

      // Create invoice items
      for (const item of invoiceItems) {
        await supabaseClient
          .from('invoice_items')
          .insert({
            invoice_id: newInvoice.id,
            description: item.description,
            quantity: item.quantity || 1,
            rate: item.rate || item.amount,
            amount: item.amount,
            taxable: item.taxable !== false,
          });
      }

      // Create payment link for remaining balance if needed
      if (remainingBalance > 0) {
        const paymentSession = await stripe.checkout.sessions.create({
          payment_method_types: ['card', 'us_bank_account'],
          payment_method_options: {
            us_bank_account: {
              financial_connections: {
                permissions: ['payment_method'],
              },
            },
          },
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `Invoice #${invoiceNumber}`,
                  description: estimate.title,
                },
                unit_amount: Math.round(remainingBalance * 100),
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `https://proinvoice.app/invoice/${newInvoice.id}?paid=true`,
          cancel_url: `https://proinvoice.app/invoice/${newInvoice.id}`,
          metadata: {
            invoice_id: newInvoice.id,
          },
        });

        // Generate QR code for payment link
        const qrSvg = generateQRCodeSVG(paymentSession.url || '');

        // Update invoice with payment link and QR code
        await supabaseClient
          .from('invoices')
          .update({
            pay_link_url: paymentSession.url,
            pay_qr_svg: qrSvg,
          })
          .eq('id', newInvoice.id);

        logStep("Payment link created for invoice");
      }

      // Update estimate status to invoiced
      await supabaseClient
        .from('estimates')
        .update({ status: 'invoiced' })
        .eq('id', estimateId);

      logStep("Process completed successfully");
    }

    return new Response("OK", { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    // Return generic error for webhooks (Stripe doesn't need detailed errors)
    return new Response("Webhook processing error", { status: 500 });
  }
});