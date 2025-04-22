// app/lib/actions/getP2PChartData.ts
import prisma from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { unstable_noStore as noStore } from "next/cache";

export async function getP2PChartData() {
  noStore(); // Disable caching

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized access");
    }

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
        amount: Number(((totalTransferred._sum?.amount ?? 0) / 100).toFixed(2)), // Use nullish coalescing to handle null values
        fill: "#ef4444", // Use red color for transfers
      },
      {
        type: "receive",
        amount: Number(((totalReceived._sum?.amount ?? 0) / 100).toFixed(2)), // Use nullish coalescing to handle null values
        fill: "#10b981", // Use green color for receives
      },
    ];

    return chartData;
  } catch (error) {
    console.error("Error fetching P2P chart data:", error);

    // Return empty data if there's an error
    return [
      { type: "transfer", amount: 0, fill: "#ef4444" },
      { type: "receive", amount: 0, fill: "#10b981" },
    ];
  }
}
