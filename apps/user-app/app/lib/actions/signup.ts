"use server";

import db from "@repo/db/client";

export default async function signup(name: string, number: string) {
  try {
    const user = await db.user.create({
      data: {
        number,
        name,
        password: "",
      },
    });
    return { status: true, message: "Account created successfully!", user };
  } catch (e) {
    console.error(e);
    return { status: false, message: "Error in signing up!" };
  }
}
