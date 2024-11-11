"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart";

export const description = "A pie chart with a label list";

const chartConfig = {
  amount: {
    label: "Amount ",
  },
  transfer: {
    label: "Transferred",
    color: "hsl(var(--chart-1))",
  },
  receive: {
    label: "Received",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function P2PTransfersChart({ chartData }: any) {
  return (
    <Card className="flex flex-col bg-[#1e3a5f]">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-white">P2P Transactions</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="amount" hideLabel />}
            />
            <Pie data={chartData} dataKey="amount">
              <LabelList
                dataKey="type"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-gray-300">
          Showing total P2P transactions
        </div>
      </CardFooter>
    </Card>
  );
}
