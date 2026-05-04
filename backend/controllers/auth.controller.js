import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import { sendEmail } from "../config/brevo.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("An account with this email already exists.");
      error.status = 409;
      throw error;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generate verification token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // create user
    const newUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
          role: "user",
          isVerified: false,
          verificationToken: hashedToken,
          verificationTokenExpiry: tokenExpiry,
        },
      ],
      { session },
    );

    // build verification URL
    const verificationURL = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;

    // send verification email
    await sendEmail({
      to: email,
      subject: "Verify your SubTracker account",
      htmlContent: `
        <h2>Welcome to SubTracker!</h2>
        <p>Click the button below to verify your email address.</p>
        <a href="${verificationURL}" style="display:inline-block;padding:10px 20px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:6px;">Verify Email</a>
        <p>This link expires in 24 hours.</p>
        <p>Or paste this link: ${verificationURL}</p>
      `,
    });

    console.log("Verification URL (dev):", verificationURL);

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Verification email sent. Please check your inbox.",
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // fetch user — exclude password from result after comparison
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("No account found with that email address.");
      error.status = 404;
      throw error;
    }

    // compare password before excluding it
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      const error = new Error("Wrong password. Please try again.");
      error.status = 401;
      throw error;
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    // block unverified users 
    if (!user.isVerified) {
      const error = new Error(
        "Please verify your email address before signing in.",
      );
      error.status = 403;
      throw error;
    }

    const token = jwt.sign({ userid: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: { token, user: userObj },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Signed out successfully" });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    // TODO: implement in Step 3
    res.status(200).json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      const error = new Error("Verification token is required.");
      error.status = 400;
      throw error;
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      const error = new Error("This link is invalid or has expired.");
      error.status = 400;
      throw error;
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();

    const jwtToken = jwt.sign(
      { userid: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: { token: jwtToken, user: userObj },
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Email address is required.");
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // Don't reveal if the email exists or not (security best practice)
    if (!user || user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "If that email exists, a new verification link has been sent.",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verificationToken = hashedToken;
    user.verificationTokenExpiry = tokenExpiry;
    await user.save();

    const verificationURL = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify your SubTracker account",
      htmlContent: `
        <h2>Verify your email address</h2>
        <p>Click the button below to verify your email address.</p>
        <a href="${verificationURL}" style="display:inline-block;padding:10px 20px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:6px;">Verify Email</a>
        <p>This link expires in 24 hours.</p>
        <p>Or paste this link: ${verificationURL}</p>
      `,
    });

    console.log("Resend verification URL (dev):", verificationURL);

    return res.status(200).json({
      success: true,
      message: "Verification email resent. Please check your inbox.",
    });
  } catch (error) {
    next(error);
  }
};
