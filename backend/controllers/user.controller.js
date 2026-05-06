import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js";
import { sendEmail } from "../config/brevo.js";
import { passwordChangedEmailTemplate } from "../config/emailTemplates.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Only allow users to update themselves (admins can update anyone)
    if (req.user._id.toString() !== id && req.user.role !== "admin") {
      const error = new Error("Not authorized to update this user");
      error.status = 403;
      throw error;
    }

    const { name, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(id);
    let passwordChanged = false;

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    // Handle password change
    if (newPassword) {
      if (!currentPassword) {
        const error = new Error(
          "Current password is required to set a new password",
        );
        error.status = 400;
        throw error;
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        const error = new Error("Current password is incorrect");
        error.status = 400;
        throw error;
      }
      if (newPassword.length < 6) {
        const error = new Error("New password must be at least 6 characters");
        error.status = 400;
        throw error;
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      passwordChanged = true;
    }

    if (name !== undefined) user.name = name.trim();
    if (email !== undefined) user.email = email.trim().toLowerCase();
    if (req.body.budget !== undefined) user.budget = req.body.budget;

    await user.save();

    if (passwordChanged) {
      sendEmail({
        to: user.email,
        subject: "Password Changed Successfully",
        htmlContent: passwordChangedEmailTemplate(user.name),
      }).catch((err) => console.error("Password change email failed:", err));
    }

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ success: true, data: userObj });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Only allow users to delete themselves (admins can delete anyone)
    if (req.user._id.toString() !== id && req.user.role !== "admin") {
      const error = new Error("Not authorized to delete this user");
      error.status = 403;
      throw error;
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    // Clean up their subscriptions
    await Subscription.deleteMany({ user: id });

    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      const error = new Error("Invalid role");
      error.status = 400;
      throw error;
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, select: "-password" },
    );

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
