import Router from "express";
import passport from "passport";
import {
  signIn,
  signOut,
  signUp,
  forgotPassword,
  verifyEmail,
  resendVerification,
  resetPassword,
  googleOAuthCallback
} from "../controllers/auth.controller.js";

const authRouter = Router();

// Path: /api/v1/auth
authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

authRouter.post("/forgot-password", forgotPassword);

authRouter.get("/verify-email", verifyEmail);

authRouter.post("/resend-verification", resendVerification);

authRouter.post("/reset-password", resetPassword);

// GOOGLE OAUTH ROUTES

// 1. Trigger Google Login
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// 2. Google Callback (Middleware handles Google, Controller handles JWT/Redirect)
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      process.env.NODE_ENV === "production"
        ? `${process.env.CLIENT_URL}/login?error=oauth_failed`
        : "http://localhost:5173/login?error=oauth_failed",
  }),
  googleOAuthCallback // <-- Hands off to the controller
);

export default authRouter;
