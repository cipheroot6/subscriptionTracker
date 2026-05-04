import Router from "express";
import {
  signIn,
  signOut,
  signUp,
  forgotPassword,
  verifyEmail,
  resendVerification,
} from "../controllers/auth.controller.js";

const authRouter = Router();

// Path: /api/v1/auth
authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

authRouter.post("/forgot-password", forgotPassword);

authRouter.get("/verify-email", verifyEmail);

authRouter.post("/resend-verification", resendVerification);

export default authRouter;
