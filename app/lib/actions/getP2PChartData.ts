import prisma from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function getP2PChartData() {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  // Total amount transferred by the user
  const totalTransferred = await prisma.p2pTransfer.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      fromUserId: userId, // Condition to find transfers made by the user
    },
  });

  // Total amount received by the user
  const totalReceived = await prisma.p2pTransfer.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      toUserId: userId, // Condition to find transfers received by the user
    },
  });

  // Format the data to match the required chartData structure
  const chartData = [
    {
      type: "transfer",
      amount: (totalTransferred._sum.amount ?? 0) / 100, // Use nullish coalescing to handle null values
      fill: "var(--color-transfer)", // Use the appropriate color for this type
    },
    {
      type: "receive",
      amount: (totalReceived._sum.amount ?? 0) / 100, // Use nullish coalescing to handle null values
      fill: "var(--color-receive)", // Use the appropriate color for this type
    },
  ];

  return chartData;
}
