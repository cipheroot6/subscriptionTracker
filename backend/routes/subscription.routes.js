import Router from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getUserSubscriptions,
  deleteSubscription,
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

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET upcoming renewals" });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "CANCEL subscription" });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE subscription" });
});

export default subscriptionRouter;
