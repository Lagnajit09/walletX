"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@lm.swiftpay/db";

type TransactionStatus = "Sent" | "Received";

export interface Transaction {
  id: number;
  amount: string;
  date: string;
  fromUser: string;
  toUser: string;
  status: TransactionStatus; // Status will strictly be "Sent" or "Received"
}

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error while sending",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }
  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(from) },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });

    await tx.p2pTransfer.create({
      data: {
        amount,
        timestamp: new Date(),
        fromUserId: Number(from),
        toUserId: toUser.id,
      },
    });
  });
}

export const getP2PTransfers = async (): Promise<Transaction[] | string> => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return "Not authorized!";
  }

  const userId = session.user?.id;
  const userNumber = session.user?.number; // assuming number is available in session

  // Fetch transactions along with user details
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
    include: {
      fromUser: true, // Include 'fromUser' relation (get user details)
      toUser: true, // Include 'toUser' relation
    },
    orderBy: {
      timestamp: "desc",
    },
  });

  // Format the transactions
  const formattedTransactions: Transaction[] = transactions.map((txn) => {
    // Determine the status: 'Sent' if the current user is the sender, otherwise 'Received'
    const status: TransactionStatus =
      txn.fromUserId === userId ? "Sent" : "Received"; // Ensure it's strictly "Sent" or "Received"

    const date = new Date(txn.timestamp);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }); // Output: 19 Oct 2024

    const formattedTime = date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }); // Output: 11:50 AM or 11:50 am

    return {
      id: txn.id,
      amount: String(txn.amount / 100),
      date: `${formattedTime} on ${formattedDate}`,
      fromUser:
        txn.fromUser.number === userNumber ? "You" : txn.fromUser.number,
      toUser: txn.toUser.number === userNumber ? "You" : txn.toUser.number,
      status,
    };
  });

  return formattedTransactions;
};
