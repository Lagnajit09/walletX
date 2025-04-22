import { Transaction, WalletTransactionHistory } from "@/types/transaction";
import db from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

// This function fetches the 10 most recent transactions (onRamp + offRamp combined)
// for the logged-in user, sorted by startTime.
export async function getRecentTransactions(userId: number) {
  // Fetch latest 10 onRamp transactions
  const onRampTransactions = await db.onRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
    take: 10,
  });

  // Fetch latest 10 offRamp transactions
  const offRampTransactions = await db.offRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
    take: 10,
  });

  // Tag each transaction with its type
  const combinedTransactions = [
    ...onRampTransactions.map((txn) => ({ ...txn, type: "onRamp" })),
    ...offRampTransactions.map((txn) => ({ ...txn, type: "offRamp" })),
  ];

  // Sort by startTime and return only the most recent 10
  const sortedTransactions = combinedTransactions
    .sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    )
    .slice(0, 10); // Final 10 most recent

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
