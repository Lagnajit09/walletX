"use server";

import db from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function updateProfile(field: string, value: string) {
  const session = await getServerSession(authOptions);

  try {
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    // Validate the field to ensure only allowed fields are updated
    const validFields = ["name", "number", "pin", "email"];
    if (!validFields.includes(field)) {
      throw new Error(`Invalid field: ${field}`);
    }

    // Dynamically construct the update object
    const updateData: { [key: string]: any } = {};
    updateData[field] = value;

    console.log(updateData);

    await db.user.update({
      where: { id: Number(session?.user?.id) },
      data: updateData,
    });

    return { success: true, message: `${field} updated successfully!` };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}
