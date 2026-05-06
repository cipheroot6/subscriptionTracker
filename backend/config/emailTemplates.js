// ─────────────────────────────────────────────
// SubTracker — Premium Email Templates
// Design system: dark header · card blocks · clean footer
// ─────────────────────────────────────────────

const BRAND         = "#3b82f6";
const BRAND_DARK    = "#1d4ed8";
const BRAND_BG      = "#eff6ff";
const SUCCESS       = "#10b981";
const SUCCESS_BG    = "#ecfdf5";
const WARNING       = "#f59e0b";
const WARNING_BG    = "#fffbeb";
const DANGER        = "#ef4444";
const DANGER_BG     = "#fef2f2";
const TEXT_PRIMARY  = "#111827";
const TEXT_MUTED    = "#6b7280";
const SURFACE       = "#ffffff";
const BACKGROUND    = "#f4f6f9";
const BORDER        = "#e5e7eb";

// ─── Shared helpers ───────────────────────────────────────────────────────────

const infoCard = (accentColor, accentBg, rows) => `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;border-radius:10px;overflow:hidden;border:1px solid ${BORDER};background:${accentBg};">
    <tr><td style="padding:0;line-height:0;font-size:0;"><div style="height:3px;background:linear-gradient(90deg,${accentColor},${accentColor}cc);"></div></td></tr>
    <tr><td style="padding:20px 24px;">
      ${rows}
    </td></tr>
  </table>`;

const infoRow = (label, value, valueColor = TEXT_PRIMARY) =>
  `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
    <tr>
      <td style="font-size:11px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:${TEXT_MUTED};width:130px;padding-right:12px;vertical-align:top;">${label}</td>
      <td style="font-size:15px;font-weight:600;color:${valueColor};vertical-align:top;">${value}</td>
    </tr>
  </table>`;

const pill = (text, color, bg) =>
  `<span style="display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${color};background:${bg};">${text}</span>`;

const featureItem = (icon, text) =>
  `<tr>
    <td width="28" valign="top" style="padding-top:1px;"><span style="font-size:16px;line-height:1.4;">${icon}</span></td>
    <td style="font-size:14px;color:${TEXT_MUTED};line-height:1.6;padding-bottom:10px;">${text}</td>
  </tr>`;

const stepItem = (number, text) =>
  `<tr>
    <td width="32" valign="top" style="padding-bottom:12px;">
      <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${BRAND};color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:22px;">${number}</span>
    </td>
    <td style="font-size:14px;color:${TEXT_MUTED};line-height:1.6;padding-bottom:12px;vertical-align:top;">${text}</td>
  </tr>`;

const ctaButton = (url, label, color = BRAND) =>
  `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px auto;">
    <tr>
      <td align="center" style="border-radius:8px;background:${color};">
        <a href="${url}" target="_blank"
          style="display:inline-block;padding:14px 36px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Inter',sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;letter-spacing:0.02em;"
        >${label}</a>
      </td>
    </tr>
  </table>`;

const fallbackLink = (url) =>
  `<p style="font-size:12px;color:${TEXT_MUTED};margin:0 0 4px;text-align:center;">Button not working? Copy &amp; paste this link into your browser:</p>
  <p style="word-break:break-all;font-size:11.5px;color:${BRAND};font-family:'Courier New',monospace;text-align:center;margin:0;">${url}</p>`;

const securityNote = (color, bg, text) =>
  `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;border-radius:8px;background:${bg};overflow:hidden;">
    <tr><td style="padding:14px 18px;font-size:13px;color:${color};line-height:1.6;">${text}</td></tr>
  </table>`;

// ─── Base template ─────────────────────────────────────────────────────────

const baseTemplate = (bodyContent) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>SubTracker</title>
</head>
<body style="margin:0;padding:0;background-color:${BACKGROUND};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Inter','Roboto',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BACKGROUND};padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Wrapper -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

          <!-- Logo bar -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <a href="https://subtracker.vercel.app" target="_blank" style="text-decoration:none;">
                <span style="font-size:22px;font-weight:800;letter-spacing:-0.5px;color:${TEXT_PRIMARY};">Sub<span style="color:${BRAND};">Tracker</span></span>
              </a>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:${SURFACE};border-radius:16px;border:1px solid ${BORDER};overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
              ${bodyContent}

              <!-- Footer inside card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="padding:0 32px;"><div style="height:1px;background:${BORDER};"></div></td></tr>
                <tr>
                  <td style="padding:24px 32px;text-align:center;">
                    <p style="margin:0 0 6px;font-size:13px;color:${TEXT_MUTED};">© 2026 SubTracker · Smart Subscription Management</p>
                    <p style="margin:0;font-size:12px;color:#9ca3af;">
                      You received this email because you have an account at SubTracker.<br/>
                      If you have questions, reply to this email.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Space below card -->
          <tr><td style="height:32px;"></td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Verification Email (Signup)
// ─────────────────────────────────────────────────────────────────────────────

export const verificationEmailTemplate = (userName, verificationUrl) => {
  const body = `
    <!-- Header -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:40px 32px 32px;background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);border-radius:14px 14px 0 0;">
          <p style="margin:0 0 10px;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Account Activation</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.3;">Confirm your email address</h1>
        </td>
      </tr>
    </table>

    <!-- Body -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:32px 32px 24px;">

          <p style="margin:0 0 20px;font-size:16px;color:${TEXT_PRIMARY};">Hi <strong>${userName}</strong>,</p>
          <p style="margin:0 0 20px;font-size:15px;color:${TEXT_MUTED};line-height:1.7;">
            Thanks for creating your SubTracker account. To get started, we just need to confirm this is really you.
            Click the button below to verify your email address.
          </p>

          ${ctaButton(verificationUrl, "Verify Email Address")}

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
            <tr><td>${fallbackLink(verificationUrl)}</td></tr>
          </table>

          ${securityNote(
            "#92400e", WARNING_BG,
            `⏱ <strong>This link expires in 24 hours.</strong> If it expires, you can request a new one from the sign-in page.`
          )}

          <p style="margin:24px 0 0;font-size:15px;color:${TEXT_MUTED};line-height:1.7;">
            Didn't create an account? You can safely ignore this email — no account will be activated.
          </p>

        </td>
      </tr>
    </table>`;
  return baseTemplate(body);
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Password Reset
// ─────────────────────────────────────────────────────────────────────────────

export const passwordResetEmailTemplate = (userName, resetUrl) => {
  const body = `
    <!-- Header -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:40px 32px 32px;background:linear-gradient(135deg,#1a0a2e 0%,#3b1a6e 100%);border-radius:14px 14px 0 0;">
          <p style="margin:0 0 10px;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Security</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.3;">Reset your password</h1>
        </td>
      </tr>
    </table>

    <!-- Body -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:32px 32px 24px;">

          <p style="margin:0 0 20px;font-size:16px;color:${TEXT_PRIMARY};">Hi <strong>${userName}</strong>,</p>
          <p style="margin:0 0 20px;font-size:15px;color:${TEXT_MUTED};line-height:1.7;">
            We received a request to reset the password for your SubTracker account.
            Click the button below to choose a new password.
          </p>

          ${ctaButton(resetUrl, "Reset Password", BRAND_DARK)}

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
            <tr><td>${fallbackLink(resetUrl)}</td></tr>
          </table>

          ${securityNote(
            "#7f1d1d", DANGER_BG,
            `⏱ <strong>This link expires in 15 minutes</strong> for your security. After that, you'll need to request a new one.`
          )}

          ${securityNote(
            "#374151", "#f9fafb",
            `🔒 <strong>Didn't request this?</strong> Your password has <em>not</em> been changed. You can safely ignore this email. If you're concerned about your account's security, please <a href="mailto:support@subtracker.com" style="color:${BRAND};text-decoration:none;">contact support</a>.`
          )}

        </td>
      </tr>
    </table>`;
  return baseTemplate(body);
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Welcome (post email-verification)
// ─────────────────────────────────────────────────────────────────────────────

export const welcomeEmailTemplate = (userName) => {
  const body = `
    <!-- Header -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:40px 32px 32px;background:linear-gradient(135deg,#064e3b 0%,#065f46 100%);border-radius:14px 14px 0 0;">
          <p style="margin:0 0 10px;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Account Verified</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.3;">You're in, ${userName}!</h1>
        </td>
      </tr>
    </table>

    <!-- Body -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:32px 32px 24px;">

          <p style="margin:0 0 20px;font-size:15px;color:${TEXT_MUTED};line-height:1.7;">
            Your email is verified and your SubTracker account is fully activated.
            Here's a quick look at what you can do:
          </p>

          <!-- Feature list -->
          <table cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 24px;width:100%;">
            ${featureItem("📊", "Track all your subscriptions in one clean dashboard")}
            ${featureItem("💰", "See your exact monthly and yearly spend at a glance")}
            ${featureItem("🔔", "Get renewal reminders 7, 5, 2 and 1 day before charge")}
            ${featureItem("📈", "Analyze spending by category, frequency, and trend")}
            ${featureItem("🎯", "Set a monthly budget and get notified when you're close")}
          </table>

          <!-- Steps -->
          <p style="margin:0 0 14px;font-size:14px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${TEXT_PRIMARY};">Get started in 3 steps</p>
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:24px;">
            ${stepItem(1, "Sign in to your dashboard")}
            ${stepItem(2, "Add your first subscription")}
            ${stepItem(3, "Explore your analytics and set your monthly budget")}
          </table>

          ${ctaButton("https://subscription-tracker-with-admin-panel.vercel.app/sign-in", "Go to Dashboard", SUCCESS)}

          <p style="margin:20px 0 0;font-size:14px;color:${TEXT_MUTED};text-align:center;line-height:1.6;">
            Questions? Just reply to this email — we're always happy to help.
          </p>

        </td>
      </tr>
    </table>`;
  return baseTemplate(body);
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Resend Verification
// ─────────────────────────────────────────────────────────────────────────────

export const resendVerificationEmailTemplate = (userName, verificationUrl) => {
  const body = `
    <!-- Header -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:40px 32px 32px;background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);border-radius:14px 14px 0 0;">
          <p style="margin:0 0 10px;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Email Verification</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.3;">Your new verification link</h1>
        </td>
      </tr>
    </table>

    <!-- Body -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:32px 32px 24px;">

          <p style="margin:0 0 20px;font-size:16px;color:${TEXT_PRIMARY};">Hi <strong>${userName}</strong>,</p>
          <p style="margin:0 0 20px;font-size:15px;color:${TEXT_MUTED};line-height:1.7;">
            Here's your fresh verification link. Click the button below to verify your email address and activate your SubTracker account.
          </p>

          ${ctaButton(verificationUrl, "Verify Email Address")}

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
            <tr><td>${fallbackLink(verificationUrl)}</td></tr>
          </table>

          ${securityNote(
            "#92400e", WARNING_BG,
            `⏱ <strong>This link expires in 24 hours.</strong> If it expires again, you can request another from the sign-in page.`
          )}

          <p style="margin:24px 0 0;font-size:14px;color:${TEXT_MUTED};line-height:1.7;">
            Didn't request this? You can safely ignore this email.
          </p>

        </td>
      </tr>
    </table>`;
  return baseTemplate(body);
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Password Changed Confirmation
// ─────────────────────────────────────────────────────────────────────────────

export const passwordChangedEmailTemplate = (userName) => {
  const body = `
    <!-- Header -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:40px 32px 32px;background:linear-gradient(135deg,#1a0a2e 0%,#3b1a6e 100%);border-radius:14px 14px 0 0;">
          <p style="margin:0 0 10px;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Security Alert</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.3;">Password changed successfully</h1>
        </td>
      </tr>
    </table>

    <!-- Body -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:32px 32px 24px;">

          <p style="margin:0 0 20px;font-size:16px;color:${TEXT_PRIMARY};">Hi <strong>${userName}</strong>,</p>
          <p style="margin:0 0 20px;font-size:15px;color:${TEXT_MUTED};line-height:1.7;">
            This is a confirmation that the password for your SubTracker account was changed on
            <strong>${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>.
          </p>

          ${infoCard(SUCCESS, SUCCESS_BG,
            infoRow("Status", `${pill("Password Updated", "#065f46", "#d1fae5")}`)
          )}

          ${securityNote(
            "#7f1d1d", DANGER_BG,
            `🔒 <strong>Didn't make this change?</strong> Your account may be compromised. Please <a href="mailto:support@subtracker.com" style="color:${DANGER};font-weight:600;text-decoration:none;">contact support immediately</a> and change your password from a trusted device.`
          )}

          <p style="margin:20px 0 0;font-size:14px;color:${TEXT_MUTED};line-height:1.7;">
            For your security, we recommend using a strong, unique password and not reusing passwords across sites.
          </p>

        </td>
      </tr>
    </table>`;
  return baseTemplate(body);
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Subscription Added
// ─────────────────────────────────────────────────────────────────────────────

export const subscriptionAddedEmailTemplate = (
  userName,
  subscriptionName,
  renewalDate,
) => {
  const body = `
    <!-- Header -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:40px 32px 32px;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);border-radius:14px 14px 0 0;">
          <p style="margin:0 0 10px;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);">New Subscription</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.3;">${subscriptionName} is being tracked</h1>
        </td>
      </tr>
    </table>

    <!-- Body -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:32px 32px 24px;">

          <p style="margin:0 0 20px;font-size:16px;color:${TEXT_PRIMARY};">Hi <strong>${userName}</strong>,</p>
          <p style="margin:0 0 8px;font-size:15px;color:${TEXT_MUTED};line-height:1.7;">
            Your subscription has been added to SubTracker. Here's a summary:
          </p>

          ${infoCard(BRAND, BRAND_BG,
            infoRow("Subscription", `<strong style="font-size:17px;">${subscriptionName}</strong>`) +
            infoRow("Next Renewal", renewalDate, BRAND_DARK) +
            infoRow("Reminders", "7, 5, 2 &amp; 1 day before renewal")
          )}

          <p style="margin:0 0 14px;font-size:14px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${TEXT_PRIMARY};">What happens next</p>
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:24px;">
            ${featureItem("✅", "SubTracker will monitor this subscription for you")}
            ${featureItem("🔔", "You'll receive email reminders before each renewal")}
            ${featureItem("📊", "It'll appear in your spending analytics immediately")}
          </table>

          ${ctaButton("https://subtracker.vercel.app/dashboard", "View Dashboard")}

        </td>
      </tr>
    </table>`;
  return baseTemplate(body);
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Renewal Reminder
// ─────────────────────────────────────────────────────────────────────────────

export const renewalReminderEmailTemplate = (
  userName,
  subscriptionName,
  renewalDate,
  daysUntil,
) => {
  const isUrgent    = daysUntil <= 2;
  const accentColor = isUrgent ? WARNING  : BRAND;
  const accentBg    = isUrgent ? WARNING_BG : BRAND_BG;
  const urgencyText = daysUntil === 1 ? "tomorrow" : `in ${daysUntil} days`;
  const headerBg    = isUrgent
    ? "linear-gradient(135deg,#451a03 0%,#78350f 100%)"
    : "linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)";

  const body = `
    <!-- Header -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:40px 32px 32px;background:${headerBg};border-radius:14px 14px 0 0;">
          <p style="margin:0 0 10px;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Renewal Reminder</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.3;">${subscriptionName} renews ${urgencyText}</h1>
        </td>
      </tr>
    </table>

    <!-- Body -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:32px 32px 24px;">

          <p style="margin:0 0 20px;font-size:16px;color:${TEXT_PRIMARY};">Hi <strong>${userName}</strong>,</p>
          <p style="margin:0 0 8px;font-size:15px;color:${TEXT_MUTED};line-height:1.7;">
            Just a heads-up — your ${subscriptionName} subscription is coming up for renewal:
          </p>

          ${infoCard(accentColor, accentBg,
            infoRow("Subscription", `<strong style="font-size:17px;">${subscriptionName}</strong>`) +
            infoRow("Renewal Date", `<strong>${renewalDate}</strong>`, accentColor) +
            infoRow("Days Until", `${pill(
              daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`,
              isUrgent ? "#78350f" : "#1d4ed8",
              isUrgent ? "#fde68a" : "#bfdbfe"
            )}`)
          )}

          <p style="margin:0 0 14px;font-size:14px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${TEXT_PRIMARY};">Before your renewal</p>
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:24px;">
            ${featureItem("💳", "Make sure your payment method is up to date")}
            ${featureItem("🔍", "Confirm you still want to continue this subscription")}
            ${featureItem("📋", "Check for any plan changes or price adjustments")}
          </table>

          ${ctaButton("https://subtracker.vercel.app/dashboard", "Manage Subscriptions", isUrgent ? WARNING : BRAND)}

          <p style="margin:20px 0 0;font-size:14px;color:${TEXT_MUTED};text-align:center;line-height:1.6;">
            To stop receiving reminders for this subscription, update or cancel it from your dashboard.
          </p>

        </td>
      </tr>
    </table>`;
  return baseTemplate(body);
};

// ─── Default export ────────────────────────────────────────────────────────

export default {
  verificationEmailTemplate,
  passwordResetEmailTemplate,
  welcomeEmailTemplate,
  resendVerificationEmailTemplate,
  passwordChangedEmailTemplate,
  subscriptionAddedEmailTemplate,
  renewalReminderEmailTemplate,
};
