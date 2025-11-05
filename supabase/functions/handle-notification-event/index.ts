import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationEvent {
  type: "deposit_received" | "payment_overdue" | "invoice_paid" | "milestone_reached";
  userId: string;
  estimateId: string;
  clientEmail: string;
  clientName: string;
  amount?: number;
  invoiceNumber?: string;
  jobType?: string;
  daysOverdue?: number;
  paymentLink?: string;
  businessName: string;
  sendSMS?: boolean;
  clientPhone?: string;
}

const generateNotificationEmail = (event: NotificationEvent) => {
  const templates: Record<string, { subject: string; body: string }> = {
    deposit_received: {
      subject: `Deposit Received - ${event.businessName}`,
      body: `Dear ${event.clientName},

Thank you for your deposit of $${event.amount?.toFixed(2)} for your ${event.jobType} project.

Invoice: ${event.invoiceNumber}

We've received your payment and will begin work shortly.

Best regards,
${event.businessName}`,
    },
    payment_overdue: {
      subject: `Payment Reminder: Invoice ${event.invoiceNumber}`,
      body: `Dear ${event.clientName},

This is a reminder that your payment of $${event.amount?.toFixed(2)} is now ${event.daysOverdue} days overdue.

Please remit payment at your earliest convenience:
${event.paymentLink}

Thank you,
${event.businessName}`,
    },
    invoice_paid: {
      subject: `Payment Received - Thank You!`,
      body: `Dear ${event.clientName},

Thank you for your payment of $${event.amount?.toFixed(2)} for invoice ${event.invoiceNumber}.

Your payment has been processed and we appreciate your business.

Best regards,
${event.businessName}`,
    },
    milestone_reached: {
      subject: `Milestone Reached - ${event.jobType}`,
      body: `Dear ${event.clientName},

Great news! We've reached a milestone on your ${event.jobType} project.

Amount: $${event.amount?.toFixed(2)}

Thank you for your continued partnership.

Best regards,
${event.businessName}`,
    },
  };

  return templates[event.type] || { subject: "Notification", body: "No template found" };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const event: NotificationEvent = await req.json();

    // Generate email content
    const emailContent = generateNotificationEmail(event);

    // Send email
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: `${event.businessName} <noreply@proinvoice.app>`,
        to: event.clientEmail,
        subject: emailContent.subject,
        html: `<p>${emailContent.body.replace(/\n/g, "<br>")}</p>`,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error(`Email service error: ${emailResponse.statusText}`);
    }

    const emailResult = await emailResponse.json();

    // Log notification
    const { error: logError } = await supabaseClient
      .from("notification_logs")
      .insert({
        user_id: event.userId,
        estimate_id: event.estimateId,
        type: event.type,
        recipient: event.clientEmail,
        channel: "email",
        sent_at: new Date().toISOString(),
        external_id: emailResult.id,
        status: "sent",
      });

    if (logError) {
      console.error("Error logging notification:", logError);
    }

    // Send SMS if requested
    if (event.sendSMS && event.clientPhone) {
      try {
        const smsMessage = `${event.businessName}: ${emailContent.subject}. ${event.paymentLink || ""}`;
        
        const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
        const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
        const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");

        if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
          const auth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
          await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
            {
              method: "POST",
              headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                From: twilioPhoneNumber,
                To: event.clientPhone,
                Body: smsMessage.substring(0, 160),
              }).toString(),
            }
          );
        }
      } catch (smsError) {
        console.error("Error sending SMS:", smsError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification sent successfully",
        emailId: emailResult.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error handling notification:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});

