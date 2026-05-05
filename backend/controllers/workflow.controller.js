import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import { sendEmail } from "../config/brevo.js";
import { renewalReminderEmailTemplate } from "../config/emailTemplates.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date for subscription ${subscriptionId} has passed. Stopping workflow`,
    );
    return;
  }
  for (const daysBefore of REMINDERS) {
    const reminderDATE = renewalDate.subtract(daysBefore, "day");

    if (reminderDATE.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `reminder-${daysBefore} days before`,
        reminderDATE,
      );
      await triggerReminder(
        context,
        `reminder-${daysBefore} days before`,
        subscription,
        daysBefore,
      );
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription, daysUntil) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);
    const { user, name: subName, renewalDate } = subscription;
    await sendEmail({
      to: user.email,
      subject: `Subscription Renewal Reminder: ${subName}`,
      htmlContent: renewalReminderEmailTemplate(
        user.name,
        subName,
        dayjs(renewalDate).format("MMMM D, YYYY"),
        daysUntil,
      ),
    });
  });
};
