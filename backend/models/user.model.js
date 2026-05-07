import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
      minLength: 5,
      maxLength: 255,
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: 6,
      maxLength: 1024,
    },
    role: {
      type: String,
      required: [true, "User role is required"],
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpiry: {
      type: Date,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    budget: {
      type: Number,
      default: 100,
      min: [1, "Budget must be at least 1"],
    },
    budgetAlertLevel: {
      type: String,
      enum: [null, "90", "100"],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
