"use server";
import bcrypt from "bcrypt";
import db from "../db";
import crypto from "crypto";

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

    const user = await db.user.create({
      data: {
        number,
        email,
        name,
        password: hashedPassword,
        walletID,
      },
    });

    await db.balance.create({
      data: {
        amount: 0,
        userId: user.id,
        locked: 0,
      },
    });

    return {
      ok: true,
      message: "Account created successfully!",
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
