import prisma from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { chartDataProps } from "@/src/components/custom/WalletTransactionChart";

// Helper function to get month name
function getMonthName(monthIndex: number) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthIndex]; // 0-based index for months
}

// Helper function to get the start and end of a month
function getMonthRange(year: number, month: number) {
  const startDate = new Date(year, month, 1); // First day of the month
  const endDate = new Date(year, month + 1, 0); // Last day of the month (0th day of the next month is the last day of this month)
  endDate.setHours(23, 59, 59, 999); // Set end of day time for last day of the month
  return { startDate, endDate };
}

// Fetch chart data for Add and Withdraw transactions
export const getChartData = async (): Promise<chartDataProps[]> => {
  const currentDate = new Date();
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  // Generate data for the last 6 months
  const chartData = [];

  for (let i = 5; i >= 0; i--) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() - i;

    const { startDate, endDate } = getMonthRange(year, month);

    // OnRampTransaction (Add to Wallet)
    const onRamp = await prisma.onRampTransaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // OffRampTransaction (Withdraw from Wallet)
    const offRamp = await prisma.offRampTransaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Create a data point for each month
    chartData.push({
      month: getMonthName(startDate.getMonth()), // Convert month index to name
      added: (onRamp._sum.amount || 0) / 100, // Add to Wallet, assuming amounts are stored in cents
      withdrawn: (offRamp._sum.amount || 0) / 100, // Withdraw from Wallet
    });
  }

  return chartData;
  //   return [
  //     { month: "January", desktop: 186, mobile: 80 },
  //     { month: "February", desktop: 305, mobile: 200 },
  //     { month: "March", desktop: 237, mobile: 120 },
  //     { month: "April", desktop: 73, mobile: 190 },
  //     { month: "May", desktop: 209, mobile: 130 },
  //     { month: "June", desktop: 214, mobile: 140 },
  //   ];
};
