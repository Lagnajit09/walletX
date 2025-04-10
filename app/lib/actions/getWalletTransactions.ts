import { Transaction, WalletTransactionHistory } from "@/lib/types";
import db from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

// This function fetches recent transactions for the logged-in user
// within the last 30 days. It returns an array of transactions sorted by date.
export async function getRecentTransactions(userId: number) {
  const today = new Date();
  const last30Days = new Date(today.setDate(today.getDate() - 30)); // 30 days ago

  // Fetch onRamp transactions
  const onRampTransactions = await db.onRampTransaction.findMany({
    where: {
      userId,
      startTime: {
        gte: last30Days, // fetch records where startTime is greater than or equal to 30 days ago
      },
    },
    orderBy: {
      startTime: "desc",
    },
  });

  // Fetch offRamp transactions
  const offRampTransactions = await db.offRampTransaction.findMany({
    where: {
      userId,
      startTime: {
        gte: last30Days, // fetch records where startTime is greater than or equal to 30 days ago
      },
    },
    orderBy: {
      startTime: "desc",
    },
  });

  // Combine the two arrays
  const combinedTransactions = [
    ...onRampTransactions.map((txn) => ({
      ...txn,
      type: "onRamp",
    })),
    ...offRampTransactions.map((txn) => ({
      ...txn,
      type: "offRamp",
    })),
  ];

  // Sort by startTime in reverse order (most recent first)
  const sortedTransactions = combinedTransactions.sort((a, b) => {
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  return sortedTransactions;
}

// This function fetches all transactions for the logged-in user
export const getWalletTransactions = async (): Promise<
  WalletTransactionHistory[] | string
> => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return "Not authorized!";
  }

  const userId = session.user?.id;

  // Fetch onRamp transactions
  const onRampTransactions = await db.onRampTransaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  // Fetch offRamp transactions
  const offRampTransactions = await db.offRampTransaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  // Combine the two arrays
  const combinedTransactions = [
    ...onRampTransactions.map((txn, index) => ({
      ...txn,
      txn_id: txn.id, // preserve original id
      id: index, // assign new id based on array index
      type: "onRamp",
    })),
    ...offRampTransactions.map((txn, index) => ({
      ...txn,
      txn_id: txn.id,
      id: index + onRampTransactions.length, // continue index from previous length
      type: "offRamp",
    })),
  ];

  // Sort by startTime in reverse order (most recent first)
  const sortedTransactions = combinedTransactions.sort((a, b) => {
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  return sortedTransactions;
};
