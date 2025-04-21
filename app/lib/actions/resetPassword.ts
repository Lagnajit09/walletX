"use server";

import * as emailjs from "@emailjs/nodejs";
import crypto from "crypto";
import db from "../db";
import bcrypt from "bcrypt";

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
): Promise<boolean> => {
  // Initialize emailjs with your EmailJS credentials
  const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
  const RESET_TEMPLATE_ID = process.env.EMAILJS_PASSWORD_RESET_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_ID;
  const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_ID;

  try {
    // Get user's name from database
    const user = await db.user.findUnique({
      where: { email },
      select: { name: true },
    });

    if (!user) {
      // Don't reveal that the user doesn't exist for security reasons
      console.log("Password reset requested for non-existent user:", email);
      return true; // Still return true to not leak information
    }

    const templateParams = {
      email: email,
      name: user.name,
      reset_link: resetUrl,
      from_name: "SwiftPay",
    };

    emailjs.init({
      publicKey: PUBLIC_KEY,
      privateKey: PRIVATE_KEY,
    });

    const response = await emailjs.send(
      SERVICE_ID!,
      RESET_TEMPLATE_ID!,
      templateParams
    );

    if (response.status === 200) {
      console.log("Password reset email sent successfully to:", email);
      return true;
    } else {
      console.error("Failed to send password reset email:", response);
      return false;
    }
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};

export const initiatePasswordReset = async (
  email: string
): Promise<boolean> => {
  // Generate secure random token
  const resetToken = crypto.randomBytes(32).toString("hex");
  // Token expires in 1 hour
  const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  try {
    // Update user with reset token, or silently succeed if user doesn't exist (for security)
    const updatedUser = await db.user.updateMany({
      where: { email },
      data: {
        resetToken,
        resetTokenExpires,
      },
    });

    // If no user was found, still send a success response (security best practice)
    if (updatedUser.count === 0) {
      console.log("Reset password requested for non-existent user:", email);
      return true;
    }

    // Send email with reset link
    const response = await sendPasswordResetEmail(email, resetUrl);

    if (!response) {
      throw new Error("Failed to send password reset email");
    }

    console.log("Password reset process initiated successfully for:", email);
    return true;
  } catch (error) {
    console.error("Error updating user or sending email:", error);
    return false;
  }
};

export const validateResetToken = async (token: string): Promise<boolean> => {
  try {
    // Find user with this reset token that hasn't expired
    const user = await db.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    return !!user;
  } catch (error) {
    console.error("Error validating reset token:", error);
    return false;
  }
};

export const completePasswordReset = async (
  token: string,
  newPassword: string
): Promise<boolean> => {
  try {
    // Find user with this reset token that hasn't expired
    const user = await db.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return false;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user with new password and clear reset token
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return true;
  } catch (error) {
    console.error("Error completing password reset:", error);
    return false;
  }
};
