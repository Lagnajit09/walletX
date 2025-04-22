"use server";

import * as emailjs from "@emailjs/nodejs";
import crypto from "crypto";
import db from "../db";

export const sendVerificationEmail = async (
  name: string,
  email: string,
  verificationUrl: string
): Promise<boolean> => {
  // Initialize emailjs with your EmailJS credentials
  const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
  const VERIFICATION_TEMPLATE_ID = process.env.EMAILJS_VERIFICATION_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_ID;
  const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_ID;

  try {
    const templateParams = {
      emailID: email,
      name: name,
      verification_link: verificationUrl,
      from_name: "SwiftPay",
    };

    emailjs.init({
      publicKey: PUBLIC_KEY,
      privateKey: PRIVATE_KEY,
    });

    const response = await emailjs.send(
      SERVICE_ID!,
      VERIFICATION_TEMPLATE_ID!,
      templateParams
    );

    if (response.status === 200) {
      console.log("Verification email sent successfully to:", email);
      return true;
    } else {
      console.error("Failed to send verification email:", response);
      return false;
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

export const resendVerificationEmail = async (
  name: string,
  email: string
): Promise<boolean> => {
  // Generate secure random token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  // Token expires in 15 minutes
  const verificationTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${verificationToken}`;

  try {
    const user = await db.user.update({
      where: { email },
      data: {
        verificationToken,
        verificationTokenExpires,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Send email with verification link
    const response = await sendVerificationEmail(name, email, verificationUrl);

    if (!response) {
      throw new Error("Failed to send verification email");
    }
    console.log("Verification email resent successfully to:", email);
    return true;
  } catch (error) {
    console.error("Error updating user or sending email:", error);
    return false;
  }
};
