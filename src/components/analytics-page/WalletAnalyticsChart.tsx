"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { chartDataProps } from "@/src/components/custom/WalletTransactionChart";

interface WalletAnalyticsChartProps {
  data: chartDataProps[];
}

export default function WalletAnalyticsChart({
  data,
}: WalletAnalyticsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-muted-foreground">
          No wallet activity data available
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background p-4 rounded-md border shadow-sm">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-green-500">{`Added: ₹${payload[0].value.toFixed(
            2
          )}`}</p>
          <p className="text-red-500">{`Withdrawn: ₹${payload[1].value.toFixed(
            2
          )}`}</p>
          <p className="text-blue-500">{`Net: ₹${(
            payload[0].value - payload[1].value
          ).toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="added" name="Added" fill="#10b981" />
          <Bar dataKey="withdrawn" name="Withdrawn" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
