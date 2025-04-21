// app/lib/actions/getChartData.ts
import prisma from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { chartDataProps } from "@/src/components/custom/WalletTransactionChart";
import { unstable_noStore as noStore } from "next/cache";

const MONTHS = [
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
] as const;

function normalizeMonth(
  year: number,
  month: number
): { year: number; month: number } {
  let normalizedYear = year;
  let normalizedMonth = month;

  if (month < 0) {
    const yearsToSubtract = Math.floor(Math.abs(month) / 12) + 1;
    normalizedYear -= yearsToSubtract;
    normalizedMonth = 12 + (month % 12);
  } else if (month > 11) {
    normalizedYear += Math.floor(month / 12);
    normalizedMonth = month % 12;
  }

  return { year: normalizedYear, month: normalizedMonth };
}

function getMonthRange(year: number, month: number) {
  const { year: normalizedYear, month: normalizedMonth } = normalizeMonth(
    year,
    month
  );

  const startDate = new Date(normalizedYear, normalizedMonth, 1);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(normalizedYear, normalizedMonth + 1, 0);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
}

export async function getChartData(): Promise<chartDataProps[]> {
  noStore(); // Disable caching

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized access");
    }

    const userId = session.user.id;
    const currentDate = new Date();
    const chartData: chartDataProps[] = [];

    // Generate data for the last 6 months
    for (let i = 5; i >= 0; i--) {
      const targetMonth = currentDate.getMonth() - i;
      const targetYear = currentDate.getFullYear();

      const { startDate, endDate } = getMonthRange(targetYear, targetMonth);

      const [onRampData, offRampData] = await Promise.all([
        // OnRampTransaction (Add to Wallet)
        prisma.onRampTransaction.aggregate({
          _sum: { amount: true },
          where: {
            userId,
            startTime: {
              gte: startDate,
              lte: endDate,
            },
            status: "Success", // Add status check if applicable
          },
        }),

        // OffRampTransaction (Withdraw from Wallet)
        prisma.offRampTransaction.aggregate({
          _sum: { amount: true },
          where: {
            userId,
            startTime: {
              gte: startDate,
              lte: endDate,
            },
            status: "Success", // Add status check if applicable
          },
        }),
      ]);

      const { month } = normalizeMonth(targetYear, targetMonth);

      chartData.push({
        month: MONTHS[month],
        added: Number(((onRampData._sum?.amount || 0) / 100).toFixed(2)) || 0,
        withdrawn:
          Number(((offRampData._sum?.amount || 0) / 100).toFixed(2)) || 0,
      });
    }

    // Ensure we have data for all months
    if (chartData.length !== 6) {
      const missingMonthCount = 6 - chartData.length;
      const currentMonth = currentDate.getMonth();

      for (let i = 0; i < missingMonthCount; i++) {
        const monthIndex = (currentMonth - (5 - i) + 12) % 12;
        chartData.unshift({
          month: MONTHS[monthIndex],
          added: 0,
          withdrawn: 0,
        });
      }
    }

    return chartData;
  } catch (error) {
    console.error("Error fetching chart data:", error);

    // Return empty data for all months if there's an error
    const currentMonth = new Date().getMonth();
    return Array.from({ length: 6 }, (_, i) => ({
      month: MONTHS[(currentMonth - 5 + i + 12) % 12],
      added: 0,
      withdrawn: 0,
    }));
  }
}
