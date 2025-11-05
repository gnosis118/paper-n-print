/**
 * Overdue Payments Check Cron Job
 * Runs daily at 8 AM to identify and notify about overdue payments
 */

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkOverduePayments() {
  try {
    console.log("Starting overdue payment check job...");

    // Get all overdue milestones
    const { data: overduePayments, error: fetchError } = await supabase
      .from("milestone_payments")
      .select(
        `
        id,
        estimate_id,
        amount,
        due_date,
        description,
        milestone_number,
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
      .lt("due_date", new Date().toISOString());

    if (fetchError) throw fetchError;

    console.log(`Found ${overduePayments?.length || 0} overdue payments`);

    // Process each overdue payment
    for (const payment of overduePayments || []) {
      try {
        const estimate = payment.estimates;
        const preferences = payment.users?.reminder_preferences?.[0];

        if (!estimate) {
          console.log(`Skipping payment ${payment.id} - no estimate found`);
          continue;
        }

        // Calculate days overdue
        const dueDate = new Date(payment.due_date);
        const today = new Date();
        const daysOverdue = Math.floor(
          (today - dueDate) / (1000 * 60 * 60 * 24)
        );

        // Check if we should send a reminder based on schedule
        const shouldSendReminder = preferences?.schedule_days?.some(
          (day) => daysOverdue === day
        );

        if (!shouldSendReminder || !preferences?.auto_send) {
          console.log(
            `Skipping payment ${payment.id} - not scheduled for today`
          );
          continue;
        }

        // Check if we've already sent max reminders
        const { data: sentReminders, error: countError } = await supabase
          .from("estimate_reminders")
          .select("id")
          .eq("estimate_id", estimate.id);

        if (countError) throw countError;

        const maxReminders = preferences.max_reminders_per_estimate || 3;
        if (sentReminders && sentReminders.length >= maxReminders) {
          console.log(
            `Skipping payment ${payment.id} - max reminders reached`
          );
          continue;
        }

        // Send overdue reminder
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
              amountDue: payment.amount,
              daysOverdue,
              tone: preferences.tone || "professional",
              paymentLink: `${process.env.REACT_APP_BASE_URL}/pay/${estimate.id}`,
              businessName: "ProInvoice",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to send reminder: ${response.statusText}`);
        }

        console.log(
          `Sent overdue reminder for payment ${payment.id} (${daysOverdue} days overdue)`
        );
      } catch (error) {
        console.error(`Error processing payment ${payment.id}:`, error);
      }
    }

    console.log("Overdue payment check job completed successfully");
  } catch (error) {
    console.error("Error in overdue payment check job:", error);
    process.exit(1);
  }
}

// Run the job
checkOverduePayments();

