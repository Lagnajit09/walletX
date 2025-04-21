"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

interface P2PAnalyticsChartProps {
  data: {
    type: string;
    amount: number;
    fill: string;
  }[];
}

export default function P2PAnalyticsChart({ data }: P2PAnalyticsChartProps) {
  if (
    !data ||
    data.length === 0 ||
    (data[0].amount === 0 && data[1].amount === 0)
  ) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-muted-foreground">No P2P transfer data available</p>
      </div>
    );
  }

  const COLORS = ["#ef4444", "#10b981"];
  const RADIAN = Math.PI / 180;

  // Custom label for the pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background p-4 rounded-md border shadow-sm">
          <p className="font-medium capitalize">{`${payload[0].name}`}</p>
          <p className="text-foreground">{`Amount: ₹${payload[0].value.toFixed(
            2
          )}`}</p>
        </div>
      );
    }
    return null;
  };

  // Format data for better display
  const formattedData = data.map((item) => ({
    name: item.type === "transfer" ? "Sent" : "Received",
    value: item.amount,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
