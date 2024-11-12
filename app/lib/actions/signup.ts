"use server";
import bcrypt from "bcrypt";
import db from "../db";

export default async function signup(
  name: string,
  number: string,
  password: string
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        number,
        name,
        password: hashedPassword,
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
