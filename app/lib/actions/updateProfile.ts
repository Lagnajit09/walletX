"use server";

import db from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function updateProfile(updatedData: any) {
  const session = await getServerSession(authOptions);

  try {
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const data = {
      name: updatedData.name,
      number: updatedData.number,
      email: updatedData.email,
      address: updatedData.address,
      state: updatedData.state,
      country: updatedData.country,
    };

    await db.user.update({
      where: { id: Number(session?.user?.id) },
      data,
    });

    return { success: true, message: `User updated successfully!` };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

export async function setPIN(pin: string) {
  const session = await getServerSession(authOptions);

  try {
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    await db.user.update({
      where: { id: Number(session?.user?.id) },
      data: {
        pin,
      },
    });

    return { success: true, message: `PIN updated successfully!` };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}
