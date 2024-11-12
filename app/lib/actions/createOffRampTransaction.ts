"use server";

import prisma from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import axios from "axios";

export async function createOffRampTransaction(
  provider: string,
  amount: number
) {
  // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(authOptions);
  const userId = session.user?.id;
  if (!session?.user || !userId) {
    return {
      message: "Unauthenticated request",
    };
  }
  const token = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  await prisma.offRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(userId),
      amount: amount * 100,
    },
  });

  const res = await axios.post(
    "https://swiftpay-webhook.vercel.app/hdfcWebhook",
    {
      token: token,
      user_identifier: Number(userId),
      amount: amount * 100,
      type: "debit",
    }
  );

  return {
    message: res.data,
  };
}
