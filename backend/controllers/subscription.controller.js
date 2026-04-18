import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

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
    if (subscription.user.toString() !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Not authorized");
      error.status = 403;
      throw error;
    }
    const updated = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
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
    if (subscription.user.toString() !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Not authorized");
      error.status = 403;
      throw error;
    }
    subscription.status = "canceled";
    await subscription.save();
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
