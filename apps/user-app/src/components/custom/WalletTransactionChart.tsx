"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export interface chartDataProps {
  month?: string;
  added: number;
  withdrawn: number;
}

const chartConfig = {
  added: {
    label: "Added",
    color: "hsl(var(--chart-1))",
  },
  withdrawn: {
    label: "Withdrawn",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function WalletTransactionChart({ chartData }: any) {
  return (
    <Card className="bg-[#1e3a5f]">
      <CardHeader>
        <CardTitle className="text-white">Wallet Transactions</CardTitle>
        <CardDescription className="text-gray-300">
          {chartData[0].month} - {chartData[chartData.length - 1].month}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="added"
              type="monotone"
              stroke="var(--color-added)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="withdrawn"
              type="monotone"
              stroke="var(--color-withdrawn)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-gray-300">
              Showing total transactions for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
