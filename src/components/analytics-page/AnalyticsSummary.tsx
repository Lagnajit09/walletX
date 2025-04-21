import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/src/components/ui/card";
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react";

interface AnalyticsSummaryProps {
  title: string;
  value: number;
  type: "positive" | "negative" | "neutral";
}

export default function AnalyticsSummary({
  title,
  value,
  type,
}: AnalyticsSummaryProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{title}</span>
          <div
            className={`rounded-full p-2 ${
              type === "positive"
                ? "bg-green-100"
                : type === "negative"
                ? "bg-red-100"
                : "bg-gray-100"
            }`}
          >
            {type === "positive" ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : type === "negative" ? (
              <TrendingDown className="h-4 w-4 text-red-500" />
            ) : (
              <DollarSign className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </div>
        <div className="mt-4">
          <p
            className={`text-2xl font-bold ${
              type === "positive"
                ? "text-green-600"
                : type === "negative"
                ? "text-red-600"
                : "text-gray-900"
            }`}
          >
            {formatCurrency(value)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
