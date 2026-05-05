// Professional email templates for SubTracker
// All templates use consistent styling and branding

const BRAND_COLOR = "#3b82f6"; // Brand blue
const SECONDARY_COLOR = "#6b7280"; // Gray for secondary text
const BUTTON_HOVER = "#2563eb"; // Darker blue for hover state

/**
 * Base email wrapper with consistent styling
 */
const baseTemplate = (bodyContent) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, ${BRAND_COLOR} 0%, ${BUTTON_HOVER} 100%);
      color: white;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      padding: 40px 30px;
      color: #1f2937;
      line-height: 1.6;
    }
    .content p {
      margin: 15px 0;
      font-size: 15px;
    }
    .content strong {
      color: #111827;
    }
    .button {
      display: inline-block;
      background-color: ${BRAND_COLOR};
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin: 20px 0;
      border: none;
      font-size: 15px;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: ${BUTTON_HOVER};
    }
    .button-container {
      text-align: center;
    }
    .cta-box {
      background-color: #eff6ff;
      border-left: 4px solid ${BRAND_COLOR};
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .cta-box p {
      margin: 5px 0;
      font-size: 14px;
    }
    .link-alternative {
      word-break: break-all;
      font-size: 12px;
      color: ${SECONDARY_COLOR};
      font-family: 'Courier New', monospace;
    }
    .expiry-notice {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 4px;
      font-size: 14px;
      color: #92400e;
    }
    .footer {
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 5px 0;
      font-size: 13px;
      color: ${SECONDARY_COLOR};
    }
    .footer-link {
      color: ${BRAND_COLOR};
      text-decoration: none;
    }
    .footer-link:hover {
      text-decoration: underline;
    }
    .divider {
      border: 0;
      border-top: 1px solid #e5e7eb;
      margin: 30px 0;
    }
    .highlight {
      background-color: #fef3c7;
      padding: 2px 6px;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    ${bodyContent}
    <div class="footer">
      <p>SubTracker — Smart Subscription Management</p>
      <p>© 2026 SubTracker. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

/**
 * Email verification (signup confirmation)
 */
export const verificationEmailTemplate = (userName, verificationUrl) => {
  const content = `
    <div class="header">
      <h1>🎉 Welcome to SubTracker!</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${userName}</strong>,</p>
      <p>Thanks for signing up! We're excited to help you track and manage all your subscriptions in one place.</p>
      
      <p>To get started, please verify your email address by clicking the button below:</p>
      
      <div class="button-container">
        <a href="${verificationUrl}" class="button">Verify Email Address</a>
      </div>
      
      <div class="cta-box">
        <p><strong>Link not working?</strong></p>
        <p>Copy and paste this URL into your browser:</p>
        <p class="link-alternative">${verificationUrl}</p>
      </div>
      
      <div class="expiry-notice">
        ⏱️ This verification link will expire in <strong>24 hours</strong>. Verify your email soon!
      </div>
      
      <p>Questions? We're here to help. Just reply to this email.</p>
      <p>Best regards,<br><strong>The SubTracker Team</strong></p>
    </div>
  `;
  return baseTemplate(content);
};

/**
 * Password reset request
 */
export const passwordResetEmailTemplate = (userName, resetUrl) => {
  const content = `
    <div class="header">
      <h1>🔐 Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${userName}</strong>,</p>
      <p>We received a request to reset your SubTracker password. If this wasn't you, you can safely ignore this email.</p>
      
      <p>To reset your password, click the button below:</p>
      
      <div class="button-container">
        <a href="${resetUrl}" class="button">Reset Password</a>
      </div>
      
      <div class="cta-box">
        <p><strong>Or use this link:</strong></p>
        <p class="link-alternative">${resetUrl}</p>
      </div>
      
      <div class="expiry-notice">
        ⏱️ This reset link will expire in <strong>15 minutes</strong>. Act quickly!
      </div>
      
      <p><strong>Didn't request a password reset?</strong></p>
      <p>If you didn't request this, your account is still secure. Someone may have entered your email by mistake, or it could be an attempt to access your account. Please <a href="mailto:support@subtracker.com" class="footer-link">contact support</a> if you're concerned.</p>
      
      <p>Best regards,<br><strong>The SubTracker Team</strong></p>
    </div>
  `;
  return baseTemplate(content);
};

/**
 * Welcome email (sent after email verification)
 */
export const welcomeEmailTemplate = (userName) => {
  const content = `
    <div class="header">
      <h1>✅ Email Verified!</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${userName}</strong>,</p>
      <p>Your email has been verified, and your SubTracker account is now fully activated! 🚀</p>
      
      <div class="cta-box">
        <p><strong>You're all set!</strong></p>
        <p>Log in to your dashboard to start adding your subscriptions and take control of your spending.</p>
      </div>
      
      <p><strong>Here's what you can do with SubTracker:</strong></p>
      <ul style="margin: 15px 0; padding-left: 20px;">
        <li>📊 Track all your subscriptions in one dashboard</li>
        <li>💰 See your total spending and budget insights</li>
        <li>🔔 Get renewal reminders before payment dates</li>
        <li>📈 Analyze spending patterns by category and frequency</li>
        <li>🎯 Set budgets and receive alerts</li>
      </ul>
      
      <p><strong>Next steps:</strong></p>
      <ol style="margin: 15px 0; padding-left: 20px;">
        <li>Sign in to your account</li>
        <li>Add your first subscription</li>
        <li>Explore your analytics dashboard</li>
      </ol>
      
      <p>Need help getting started? Check out our <a href="#" class="footer-link">getting started guide</a> or <a href="mailto:support@subtracker.com" class="footer-link">reach out to support</a>.</p>
      
      <p>Happy tracking!<br><strong>The SubTracker Team</strong></p>
    </div>
  `;
  return baseTemplate(content);
};

/**
 * Resend verification email
 */
export const resendVerificationEmailTemplate = (userName, verificationUrl) => {
  const content = `
    <div class="header">
      <h1>📧 Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${userName}</strong>,</p>
      <p>Here's a fresh verification link to complete your SubTracker setup.</p>
      
      <p>Click the button below to verify your email:</p>
      
      <div class="button-container">
        <a href="${verificationUrl}" class="button">Verify Email Address</a>
      </div>
      
      <div class="cta-box">
        <p><strong>Link not working?</strong></p>
        <p>Copy and paste this URL into your browser:</p>
        <p class="link-alternative">${verificationUrl}</p>
      </div>
      
      <div class="expiry-notice">
        ⏱️ This link expires in <strong>24 hours</strong>
      </div>
      
      <p>If you didn't request this email, you can safely ignore it.</p>
      <p>Best regards,<br><strong>The SubTracker Team</strong></p>
    </div>
  `;
  return baseTemplate(content);
};

/**
 * Password change confirmation
 */
export const passwordChangedEmailTemplate = (userName) => {
  const content = `
    <div class="header">
      <h1>🔐 Password Updated</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${userName}</strong>,</p>
      <p>Your SubTracker password has been successfully changed.</p>
      
      <div class="cta-box">
        <p><strong>✓ Security Update</strong></p>
        <p>Your account is now protected with your new password.</p>
      </div>
      
      <p><strong>Didn't make this change?</strong></p>
      <p>If you didn't change your password, please <a href="mailto:support@subtracker.com" class="footer-link">contact support immediately</a>. We recommend changing your password again from your account settings.</p>
      
      <p><strong>Need help?</strong></p>
      <p>If you have any questions about your account security, please don't hesitate to reach out.</p>
      
      <p>Best regards,<br><strong>The SubTracker Team</strong></p>
    </div>
  `;
  return baseTemplate(content);
};

/**
 * Subscription added confirmation
 */
export const subscriptionAddedEmailTemplate = (
  userName,
  subscriptionName,
  renewalDate,
) => {
  const content = `
    <div class="header">
      <h1>✅ Subscription Added</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${userName}</strong>,</p>
      <p>Great! Your subscription has been added to SubTracker.</p>
      
      <div class="cta-box">
        <p><strong>📌 ${subscriptionName}</strong></p>
        <p>Renewal Date: <span class="highlight"><strong>${renewalDate}</strong></span></p>
      </div>
      
      <p><strong>What happens next?</strong></p>
      <ul style="margin: 15px 0; padding-left: 20px;">
        <li>✓ We'll track this subscription for you</li>
        <li>🔔 You'll get reminders before renewal (7, 5, 2, and 1 day before)</li>
        <li>📊 This will be included in your spending analytics</li>
      </ul>
      
      <p><strong>Want to see it in action?</strong></p>
      <p>Log in to your dashboard to:</p>
      <ul style="margin: 15px 0; padding-left: 20px;">
        <li>View all your subscriptions</li>
        <li>See your total monthly/yearly spending</li>
        <li>Analyze spending by category</li>
        <li>Add more subscriptions</li>
      </ul>
      
      <p>Best regards,<br><strong>The SubTracker Team</strong></p>
    </div>
  `;
  return baseTemplate(content);
};

/**
 * Subscription renewal reminder
 */
export const renewalReminderEmailTemplate = (
  userName,
  subscriptionName,
  renewalDate,
  daysUntil,
) => {
  const content = `
    <div class="header">
      <h1>🔔 Renewal Reminder</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${userName}</strong>,</p>
      <p>A friendly reminder that your subscription is renewing soon!</p>
      
      <div class="cta-box">
        <p><strong>📌 ${subscriptionName}</strong></p>
        <p>Renews in: <span class="highlight"><strong>${daysUntil} day${daysUntil === 1 ? "" : "s"}</strong></span></p>
        <p>Renewal Date: <strong>${renewalDate}</strong></p>
      </div>
      
      <p><strong>Before renewal:</strong></p>
      <ul style="margin: 15px 0; padding-left: 20px;">
        <li>✓ Ensure your payment method is up to date</li>
        <li>✓ Confirm you still want this subscription</li>
        <li>✓ Check for any plan changes</li>
      </ul>
      
      <p>If you have any concerns about this renewal or need to cancel the subscription, please log in to your SubTracker dashboard.</p>
      
      <p><strong>Stay in control of your subscriptions!</strong></p>
      <p>Best regards,<br><strong>The SubTracker Team</strong></p>
    </div>
  `;
  return baseTemplate(content);
};

export default {
  verificationEmailTemplate,
  passwordResetEmailTemplate,
  welcomeEmailTemplate,
  resendVerificationEmailTemplate,
  passwordChangedEmailTemplate,
  subscriptionAddedEmailTemplate,
  renewalReminderEmailTemplate,
};
