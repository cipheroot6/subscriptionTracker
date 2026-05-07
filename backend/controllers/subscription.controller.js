import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";
import dayjs from "dayjs";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";
import { sendEmail } from "../config/brevo.js";
import {
  subscriptionAddedEmailTemplate,
  budgetAlertEmailTemplate,
} from "../config/emailTemplates.js";

// Normalise any subscription to a monthly cost for budget calculations
const toMonthlyAmount = (price, frequency) => {
  switch (frequency) {
    case "daily":   return price * 30;
    case "weekly":  return price * 4.33;
    case "yearly":  return price / 12;
    default:        return price; // monthly
  }
};

// Check budget thresholds and fire an alert email if needed.
// Sends at most one email per threshold level (tracked via budgetAlertLevel).
async function checkBudgetAlert(userId) {
  try {
    const user = await User.findById(userId);
    if (!user || !user.budget) return;

    const activeSubs = await Subscription.find({
      user: userId,
      status: "active",
    });

    const monthlySpend = activeSubs.reduce(
      (sum, s) => sum + toMonthlyAmount(s.price, s.frequency),
      0,
    );

    const percentage = (monthlySpend / user.budget) * 100;

    // Build enriched list for the email template
    const subList = activeSubs.map((s) => ({
      name:          s.name,
      category:      s.category,
      monthlyAmount: toMonthlyAmount(s.price, s.frequency),
    }));

    if (percentage >= 100 && user.budgetAlertLevel !== "100") {
      user.budgetAlertLevel = "100";
      await user.save();
      sendEmail({
        to: user.email,
        subject: "⚠️ You've exceeded your Subscription Tracker budget",
        htmlContent: budgetAlertEmailTemplate(
          user.name,
          monthlySpend,
          user.budget,
          percentage,
          subList,
        ),
      }).catch((err) => console.error("Budget 100% alert email failed:", err));
    } else if (
      percentage >= 90 &&
      percentage < 100 &&
      user.budgetAlertLevel !== "90" &&
      user.budgetAlertLevel !== "100"
    ) {
      user.budgetAlertLevel = "90";
      await user.save();
      sendEmail({
        to: user.email,
        subject: "🔔 You're at 90% of your Subscription Tracker budget",
        htmlContent: budgetAlertEmailTemplate(
          user.name,
          monthlySpend,
          user.budget,
          percentage,
          subList,
        ),
      }).catch((err) => console.error("Budget 90% alert email failed:", err));
    } else if (percentage < 90) {
      // Reset so alerts fire again if spend drops and rises once more
      if (user.budgetAlertLevel !== null) {
        user.budgetAlertLevel = null;
        await user.save();
      }
    }
  } catch (err) {
    console.error("checkBudgetAlert error:", err);
  }
}

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const fullSubscription = await Subscription.findById(
      subscription._id,
    ).populate("user", "name email");
    const { user, name: subName, renewalDate } = fullSubscription;

    sendEmail({
      to: user.email,
      subject: `Subscription Added: ${subName}`,
      htmlContent: subscriptionAddedEmailTemplate(
        user.name,
        subName,
        dayjs(renewalDate).format("MMMM D, YYYY"),
      ),
    }).catch((err) => console.error("Subscription added email failed:", err));

    // Check budget thresholds after adding
    checkBudgetAlert(req.user._id);

    // Trigger workflow separately — don't let a trigger failure
    // kill the subscription creation or return an error to the client.
    try {
      await workflowClient.trigger({
        url: `${SERVER_URL}/api/v1/workflow/subscription/reminder`,
        body: { subscriptionId: subscription._id },
        headers: { "content-type": "application/json" },
        retries: 0,
      });
    } catch (triggerErr) {
      console.error(
        "Workflow trigger failed (subscription still created):",
        triggerErr?.message,
      );
    }

    res.status(201).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    // Allow if owner OR admin
    if (
      subscription.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      const error = new Error("Not authorized");
      error.status = 403;
      throw error;
    }

    await subscription.deleteOne();

    // Recalculate budget after removal (may drop below threshold → reset alert level)
    checkBudgetAlert(subscription.user);

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }
    if (
      subscription.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      const error = new Error("Not authorized");
      error.status = 403;
      throw error;
    }
    const updated = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    // Re-check budget when price/frequency may have changed
    checkBudgetAlert(req.user._id);

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }
    if (
      subscription.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      const error = new Error("Not authorized");
      error.status = 403;
      throw error;
    }
    subscription.status = "canceled";
    await subscription.save();

    // Re-check budget after cancellation removes cost from monthly total
    checkBudgetAlert(req.user._id);

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const allSubscriptions = await Subscription.find();

    res.status(200).json({
      status: true,
      data: allSubscriptions,
    });
  } catch (error) {
    next(error);
  }
};
