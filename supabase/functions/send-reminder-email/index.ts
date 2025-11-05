import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReminderRequest {
  estimateId: string;
  clientEmail: string;
  clientName: string;
  jobType: string;
  amountDue: number;
  daysOverdue: number;
  tone: "friendly" | "firm" | "professional";
  paymentLink: string;
  businessName: string;
}

const generateReminderEmail = (req: ReminderRequest) => {
  const templates = {
    friendly: {
      subject: `Hey ${req.clientName}! Quick reminder about your ${req.jobType} payment 😊`,
      body: `Hi ${req.clientName},

Hope you're loving the ${req.jobType} work we did for you!

We noticed that your payment of $${req.amountDue.toFixed(2)} is now ${req.daysOverdue} days overdue. No worries though – life happens! 

Could you help us out by settling this payment? It really helps us keep the lights on and continue delivering great work.

💳 Pay now: ${req.paymentLink}

Thanks so much!
${req.businessName}`,
    },
    professional: {
      subject: `Payment Reminder: ${req.jobType} Invoice - ${req.clientName}`,
      body: `Dear ${req.clientName},

This is a professional reminder regarding your outstanding payment for ${req.jobType} services.

Invoice Details:
- Amount Due: $${req.amountDue.toFixed(2)}
- Days Overdue: ${req.daysOverdue}

Please remit payment at your earliest convenience using the link below:
${req.paymentLink}

If you have already processed this payment, please disregard this notice.

Best regards,
${req.businessName}`,
    },
    firm: {
      subject: `URGENT: Payment Required - ${req.jobType} Invoice`,
      body: `${req.clientName},

Your payment of $${req.amountDue.toFixed(2)} for ${req.jobType} services is now ${req.daysOverdue} days overdue.

Immediate action is required. Please pay now:
${req.paymentLink}

Failure to remit payment may result in suspension of services and collection action.

${req.businessName}`,
    },
  };

  return templates[req.tone];
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

    const requestData: ReminderRequest = await req.json();

    // Generate email content
    const emailContent = generateReminderEmail(requestData);

    // Send email via Resend or similar service
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: `${requestData.businessName} <noreply@proinvoice.app>`,
        to: requestData.clientEmail,
        subject: emailContent.subject,
        html: `<p>${emailContent.body.replace(/\n/g, "<br>")}</p>`,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error(`Email service error: ${emailResponse.statusText}`);
    }

    const emailResult = await emailResponse.json();

    // Log the reminder in database
    const { error: logError } = await supabaseClient
      .from("estimate_reminders")
      .insert({
        estimate_id: requestData.estimateId,
        client_email: requestData.clientEmail,
        tone: requestData.tone,
        sent_at: new Date().toISOString(),
        email_id: emailResult.id,
      });

    if (logError) {
      console.error("Error logging reminder:", logError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Reminder email sent successfully",
        emailId: emailResult.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending reminder:", error);
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

