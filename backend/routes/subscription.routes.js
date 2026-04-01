import Router from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getUserSubscriptions,
  deleteSubscription,
  updateSubscription,
  cancelSubscription,
} from "../controllers/subscription.controller.js";
import { authorize, loggedInAsAdmin } from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.use(authorize);

// Admin routes
subscriptionRouter.get("/", loggedInAsAdmin, getAllSubscriptions);
subscriptionRouter.delete("/", loggedInAsAdmin, deleteSubscription);

// User routes
subscriptionRouter.post("/user/create", createSubscription);
subscriptionRouter.get("/user/:id", getUserSubscriptions);
subscriptionRouter.delete("/:id", deleteSubscription);
subscriptionRouter.put("/:id/cancel", cancelSubscription);
subscriptionRouter.put("/:id", updateSubscription);

export default subscriptionRouter;
