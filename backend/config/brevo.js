import { BrevoClient } from "@getbrevo/brevo";

let client = null;

const getClient = () => {
  if (!client) {
    if (!process.env.BREVO_API_KEY) {
      console.warn("BREVO_API_KEY is not set. Email sending will be skipped.");
      return null;
    }
    client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });
  }
  return client;
};

export const sendEmail = async ({ to, subject, htmlContent }) => {
  const brevo = getClient();
  if (!brevo) {
    console.warn(`Email not sent (no BREVO_API_KEY): ${subject}`);
    return;
  }

  return brevo.transactionalEmails.sendTransacEmail({
    subject,
    htmlContent,
    sender: {
      name: process.env.BREVO_SENDER_NAME,
      email: process.env.BREVO_SENDER_EMAIL,
    },
    to: [{ email: to }],
  });
};
