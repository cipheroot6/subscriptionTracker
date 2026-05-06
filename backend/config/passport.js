import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://subscription-tracker-with-admin-panel.vercel.app/api/v1/auth/google/callback"
          : "http://localhost:3000/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          // Generate a random 32-character secure string
          const randomPassword = crypto.randomBytes(32).toString("hex");
          // Hash it just like your auth.controller.js does
          const hashedPassword = await bcrypt.hash(randomPassword, 10);

          user = await User.create({
            name: profile.displayName,
            email: email,
            password: hashedPassword,
            isVerified: true,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;
