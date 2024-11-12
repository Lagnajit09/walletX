"use client";

import { memo, Suspense } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Dynamically import the chart components with no SSR
const WalletTransactionChart = dynamic(
  () => import("./WalletTransactionChart"),
  { ssr: false, loading: () => <ChartSkeleton title="Wallet Transactions" /> }
);

const P2PTransfersChart = dynamic(() => import("./P2PTransferChart"), {
  ssr: false,
  loading: () => <ChartSkeleton title="P2P Transfers" />,
});

// Skeleton component for loading state
function ChartSkeleton({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center bg-gray-50">
          <div className="animate-pulse">Loading chart...</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Error boundary component
function ErrorCard({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-red-500">Error loading chart: {message}</div>
      </CardContent>
    </Card>
  );
}

export const ClientWalletChart = memo(function ClientWalletChart({
  data,
}: {
  data: any;
}) {
  if (!data) return <ErrorCard message="No data available" />;

  try {
    return (
      <Suspense fallback={<ChartSkeleton title="Wallet Transactions" />}>
        <WalletTransactionChart chartData={data} />
      </Suspense>
    );
  } catch (error) {
    console.error("Wallet Chart Error:", error);
    return <ErrorCard message="Failed to load chart" />;
  }
});

export const ClientP2PChart = memo(function ClientP2PChart({
  data,
}: {
  data: any;
}) {
  if (!data) return <ErrorCard message="No data available" />;

  try {
    return (
      <Suspense fallback={<ChartSkeleton title="P2P Transfers" />}>
        <P2PTransfersChart chartData={data} />
      </Suspense>
    );
  } catch (error) {
    console.error("P2P Chart Error:", error);
    return <ErrorCard message="Failed to load chart" />;
  }
});
