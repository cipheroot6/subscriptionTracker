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
  oauthCallback
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

// OAUTH ROUTES

// 1. Trigger Login
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

authRouter.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    session: false,
  })
);

authRouter.get(
  "/discord",
  passport.authenticate("discord", {
    scope: ["identify", "email"],
    session: false,
  })
);

// 2. Callbacks (Middleware handles Provider, Controller handles JWT/Redirect)
const oauthFailureRedirect =
  process.env.NODE_ENV === "production"
    ? `${process.env.CLIENT_URL}/login?error=oauth_failed`
    : "http://localhost:5173/login?error=oauth_failed";

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: oauthFailureRedirect,
  }),
  oauthCallback
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: oauthFailureRedirect,
  }),
  oauthCallback
);

authRouter.get(
  "/discord/callback",
  passport.authenticate("discord", {
    session: false,
    failureRedirect: oauthFailureRedirect,
  }),
  oauthCallback
);

export default authRouter;
