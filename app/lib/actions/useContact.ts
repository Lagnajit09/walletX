"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "../db";
import { Contact } from "@/types/contact";

export async function addContact({
  name,
  phone,
  walletId,
}: {
  name: string;
  phone: string;
  walletId: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { ok: false, status: 400, message: "Unauthorized" };
    }

    const userId = session.user.id;

    const isValidContact = await prisma.user.findUnique({
      where: {
        number: phone,
        walletID: walletId,
      },
    });

    if (!isValidContact) {
      return {
        ok: false,
        status: 404,
        message: "Invalid number or wallet ID!",
      };
    }

    // Create new contact
    const contact = await prisma.contact.create({
      data: {
        name,
        phone,
        userId,
        walletID: walletId,
      },
    });

    return { ok: true, status: 200, message: "Contact added.", contact };
  } catch (error: any) {
    console.error("Error creating contact:", error);
    if (error.name === "PrismaClientKnownRequestError") {
      return { ok: false, message: "Contact already exists!", status: 405 };
    }
    return { ok: false, status: 500, message: "Error creating contact!" };
  }
}

export async function getContacts(): Promise<{
  ok: boolean;
  status: number;
  message: string;
  contacts: Contact[];
}> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { ok: false, status: 400, message: "Unauthorized", contacts: [] };
    }
    const contacts = await prisma.contact.findMany({
      where: {
        userId: session.user.id,
      },
    });
    return { ok: true, status: 200, message: "Contacts found.", contacts };
  } catch (error) {
    console.error("Error finding contact:", error);
    return {
      ok: false,
      status: 500,
      message: "Error finding contacts!",
      contacts: [],
    };
  }
}

export async function deleteUserContact({
  id,
  phone,
}: {
  id: number;
  phone: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { ok: false, status: 400, message: "Unauthorized" };
    }

    const userId = session.user.id;

    // Delete contact
    const response = await prisma.contact.delete({
      where: {
        id,
        userId: session.user.id,
        phone,
      },
    });

    return { ok: true, status: 200, message: "Contact deleted." };
  } catch (error: any) {
    console.error("Error creating contact:", error);
    return { ok: false, status: 500, message: "Error deleting contact!" };
  }
}
