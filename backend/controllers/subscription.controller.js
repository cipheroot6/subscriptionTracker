import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription._id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserSubscription = async (req, res, next) => {
  try {
    const SubscriptionIs = await Subscription.findByIdAndDelete(req.params.id);

    if(!SubscriptionIs){
      const error = new Error("Subscription not found");
      error.status = 404
      throw error;
    }

    res.status(200).json({
      status: true,
      message: "Subscription deleted sucessfully",
      data: SubscriptionIs,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
    next(error);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // check if the user is the owner
    if(req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    next(error);
  }
}

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const allSubscriptions = await Subscription.find();

    res.status(200).json({
    status: true,
    data: allSubscriptions
    });
  } catch (error) {
    next(error);
  }
}