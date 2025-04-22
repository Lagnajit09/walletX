"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "../db";
import { Transaction, TransactionStatus } from "@/types/transaction";

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
      return {
        status: 401,
        message: "User not authenticated",
      };
    }

    const toUser = await prisma.user.findFirst({
      where: {
        walletID: to,
      },
    });

    if (!toUser) {
      return {
        status: 404,
        message: "Provided Wallet-ID doesn't exist.",
      };
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(
        from
      )} FOR UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        return {
          status: 400,
          message: "Insufficient funds",
        };
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

      return {
        status: 200,
        message: "Transfer Successful!",
      };
    });

    return result || { status: 500, message: "Unknown error occurred" };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Server error",
    };
  }
}

export const getP2PTransfers = async (
  limit: number = 0
): Promise<Transaction[] | string> => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return "Not authorized!";
  }

  const userId = session.user?.id;
  const userNumber = session.user?.number;

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
    take: limit > 0 ? limit : undefined, // Apply limit if provided
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
      amount: String(txn.amount),
      date: `${formattedTime} on ${formattedDate}`,
      fromUser:
        txn.fromUser.number === userNumber ? "You" : txn.fromUser.number,
      toUser: txn.toUser.number === userNumber ? "You" : txn.toUser.number,
      status,
    };
  });

  return formattedTransactions;
};
