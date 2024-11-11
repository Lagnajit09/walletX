import db from "@lm.swiftpay/db";

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
