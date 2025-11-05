/**
 * Milestone Reminders Cron Job
 * Runs daily at 9 AM to send payment reminders for upcoming milestones
 */

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function sendMilestoneReminders() {
  try {
    console.log("Starting milestone reminder job...");

    // Get all milestones due in the next 3 days
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    const { data: upcomingMilestones, error: fetchError } = await supabase
      .from("milestone_payments")
      .select(
        `
        id,
        estimate_id,
        amount,
        due_date,
        description,
        estimates (
          id,
          client_email,
          client_name,
          bid_type,
          total_amount
        ),
        users (
          id,
          email,
          reminder_preferences (
            tone,
            auto_send,
            schedule_days
          )
        )
      `
      )
      .eq("status", "pending")
      .lte("due_date", threeDaysFromNow.toISOString())
      .gte("due_date", new Date().toISOString());

    if (fetchError) throw fetchError;

    console.log(`Found ${upcomingMilestones?.length || 0} upcoming milestones`);

    // Send reminders for each milestone
    for (const milestone of upcomingMilestones || []) {
      try {
        const estimate = milestone.estimates;
        const preferences = milestone.users?.reminder_preferences?.[0];

        if (!estimate || !preferences?.auto_send) {
          console.log(`Skipping milestone ${milestone.id} - auto_send disabled`);
          continue;
        }

        // Call the reminder email function
        const response = await fetch(
          `${process.env.SUPABASE_URL}/functions/v1/send-reminder-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            },
            body: JSON.stringify({
              estimateId: estimate.id,
              clientEmail: estimate.client_email,
              clientName: estimate.client_name,
              jobType: estimate.bid_type,
              amountDue: milestone.amount,
              daysOverdue: 0,
              tone: preferences.tone || "professional",
              paymentLink: `${process.env.REACT_APP_BASE_URL}/pay/${estimate.id}`,
              businessName: "ProInvoice",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to send reminder: ${response.statusText}`);
        }

        console.log(`Sent reminder for milestone ${milestone.id}`);
      } catch (error) {
        console.error(`Error sending reminder for milestone ${milestone.id}:`, error);
      }
    }

    console.log("Milestone reminder job completed successfully");
  } catch (error) {
    console.error("Error in milestone reminder job:", error);
    process.exit(1);
  }
}

// Run the job
sendMilestoneReminders();

