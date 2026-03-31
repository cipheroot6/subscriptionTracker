import Router from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getUserSubscriptions,
  deleteUserSubscription
} from "../controllers/subscription.controller.js";
import { authorize, loggedInAsAdmin } from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.use(authorize);

// Admin routes
subscriptionRouter.get("/", loggedInAsAdmin, getAllSubscriptions);

subscriptionRouter.delete("/", loggedInAsAdmin, (req, res) => {
  res.status(501).json({ success: false, message: "Not implemented" });
});

// User routes

subscriptionRouter.post("/user/create", createSubscription);

subscriptionRouter.get("/user/:id", getUserSubscriptions);

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET upcoming renewals" });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "CANCEL subscription" });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "GET subscription details" });
});

subscriptionRouter.delete("/:id", deleteUserSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE subscription" });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "GET subscription details" });
});

export default subscriptionRouter;
