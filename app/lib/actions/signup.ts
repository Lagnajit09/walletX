"use server";
import bcrypt from "bcrypt";
import db from "../db";
import crypto from "crypto";
import { sendVerificationEmail } from "./emailVerification";

function generateWalletID(
  email: string,
  phoneNumber: string,
  salt = Date.now().toString()
) {
  const uniqueString = `${email}-${phoneNumber}-${salt}`;
  const hash = crypto.createHash("sha256").update(uniqueString).digest("hex");
  return `SP_${hash.substring(0, 16)}`;
}

export default async function signup(
  name: string,
  email: string,
  number: string,
  password: string
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const walletID = generateWalletID(email, number);

    // Generate secure random token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    // Token expires in 15 minutes
    const verificationTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

    const user = await db.user.create({
      data: {
        number,
        email,
        name,
        password: hashedPassword,
        walletID,
        emailVerified: false,
        verificationToken,
        verificationTokenExpires,
      },
    });

    await db.balance.create({
      data: {
        amount: 0,
        userId: user.id,
        locked: 0,
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${verificationToken}`;

    // Send email with verification link
    await sendVerificationEmail(name, email, verificationUrl);

    return {
      ok: true,
      message:
        "Account created successfully! Please check your email for verification link.",
      user,
      status: 200,
    };
  } catch (e: any) {
    console.error(e);
    if (e.name === "PrismaClientKnownRequestError") {
      return { ok: false, message: "Account already exists!", status: 400 };
    }
    return { ok: false, message: "Error in signing up!", status: 500 };
  }
}
