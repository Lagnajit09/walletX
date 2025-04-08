"use client";

import { Card, CardContent, CardHeader } from "../ui/card";

interface DashboardSkeletonProps {
  type: "balance" | "chart";
}

export function DashboardSkeleton({ type }: DashboardSkeletonProps) {
  if (type === "balance") {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="h-5 w-[30%] bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-[60%] bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1E3A5F]">
      <CardHeader>
        <div className="h-6 w-[40%] bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px] bg-[#1E3A5F] rounded animate-pulse">
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            Loading chart data...
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
