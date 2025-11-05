import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SMSRequest {
  estimateId: string;
  clientPhone: string;
  clientName: string;
  jobType: string;
  amountDue: number;
  daysOverdue: number;
  paymentLink: string;
  businessName: string;
}

const generateSMSMessage = (req: SMSRequest): string => {
  const amount = req.amountDue.toFixed(2);
  const message = `Hi ${req.clientName}, your ${req.jobType} payment of $${amount} is ${req.daysOverdue} days overdue. Please pay now: ${req.paymentLink} - ${req.businessName}`;
  
  // SMS has character limit, truncate if needed
  return message.length > 160 ? message.substring(0, 157) + "..." : message;
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

    const requestData: SMSRequest = await req.json();

    // Validate phone number
    if (!requestData.clientPhone || !requestData.clientPhone.startsWith("+")) {
      throw new Error("Invalid phone number format. Must start with +");
    }

    // Generate SMS message
    const smsMessage = generateSMSMessage(requestData);

    // Send SMS via Twilio
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      throw new Error("Twilio credentials not configured");
    }

    const auth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
    const smsResponse = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: twilioPhoneNumber,
          To: requestData.clientPhone,
          Body: smsMessage,
        }).toString(),
      }
    );

    if (!smsResponse.ok) {
      const error = await smsResponse.text();
      throw new Error(`Twilio error: ${error}`);
    }

    const smsResult = await smsResponse.json();

    // Log the SMS in database
    const { error: logError } = await supabaseClient
      .from("notification_logs")
      .insert({
        estimate_id: requestData.estimateId,
        type: "sms",
        recipient: requestData.clientPhone,
        message: smsMessage,
        sent_at: new Date().toISOString(),
        external_id: smsResult.sid,
        status: "sent",
      });

    if (logError) {
      console.error("Error logging SMS:", logError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "SMS sent successfully",
        smsId: smsResult.sid,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending SMS:", error);
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

