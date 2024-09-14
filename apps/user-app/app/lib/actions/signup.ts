"use server";
import bcrypt from "bcrypt";
import db from "@repo/db/client";

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
    return { status: true, message: "Account created successfully!", user };
  } catch (e) {
    console.error(e);
    return { status: false, message: "Error in signing up!" };
  }
}
