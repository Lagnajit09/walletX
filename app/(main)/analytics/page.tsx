import { Metadata } from "next";
import { Suspense } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import AnalyticsSummarySkeleton from "@/src/components/skeletons/AnalyticsSummarySkeleton";
import AnalyticsChartSkeleton from "@/src/components/skeletons/AnalyticsChartSkeleton";
import { getChartData } from "@/app/lib/actions/getChartData";
import { getP2PChartData } from "@/app/lib/actions/getP2PChartData";
import AnalyticsSummary from "@/src/components/analytics-page/AnalyticsSummary";
import WalletAnalyticsChart from "@/src/components/analytics-page/WalletAnalyticsChart";
import P2PAnalyticsChart from "@/src/components/analytics-page/P2PAnalyticsChart";

export const metadata: Metadata = {
  title: "Analytics | Swift Pay",
  description:
    "View your transaction analytics, wallet activities, and P2P transfers on SwiftPay",
  keywords:
    "payment analytics, transaction history, wallet activity, money transfers, financial dashboard",
};

export default async function AnalyticsPage() {
  return (
    <main className="px-4 md:px-6 pt-8">
      <h1 className="text-3xl font-bold mb-6 animate-fade-in">
        Transaction Analytics
      </h1>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Suspense
          fallback={<AnalyticsSummarySkeleton title="Analytics Summary" />}
        >
          <AnalyticsSummarySection />
        </Suspense>
      </div>

      {/* Charts Tabs */}
      <Tabs
        defaultValue="wallet"
        className="w-full animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="wallet">Wallet Activities</TabsTrigger>
          <TabsTrigger value="p2p">P2P Transfers</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet">
          <Suspense fallback={<AnalyticsChartSkeleton />}>
            <WalletChartSection />
          </Suspense>
        </TabsContent>

        <TabsContent value="p2p">
          <Suspense fallback={<AnalyticsChartSkeleton />}>
            <P2PChartSection />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  );
}

async function AnalyticsSummarySection() {
  // Fetch data for summary calculations
  const [walletChartData, p2pChartData] = await Promise.all([
    getChartData(),
    getP2PChartData(),
  ]);

  // Calculate total amounts for wallet activity
  const totalAdded = walletChartData.reduce(
    (sum, month) => sum + month.added,
    0
  );
  const totalWithdrawn = walletChartData.reduce(
    (sum, month) => sum + month.withdrawn,
    0
  );

  // Get P2P transfer amounts
  const totalSent =
    p2pChartData.find((item) => item.type === "transfer")?.amount || 0;
  const totalReceived =
    p2pChartData.find((item) => item.type === "receive")?.amount || 0;

  return (
    <>
      <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
        <AnalyticsSummary
          title="Total Added"
          value={totalAdded}
          type="positive"
        />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
        <AnalyticsSummary
          title="Total Withdrawn"
          value={totalWithdrawn}
          type="negative"
        />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
        <AnalyticsSummary title="P2P Sent" value={totalSent} type="negative" />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <AnalyticsSummary
          title="P2P Received"
          value={totalReceived}
          type="positive"
        />
      </div>
    </>
  );
}

async function WalletChartSection() {
  const walletChartData = await getChartData();

  // Calculate net change
  const totalAdded = walletChartData.reduce(
    (sum, month) => sum + month.added,
    0
  );
  const totalWithdrawn = walletChartData.reduce(
    (sum, month) => sum + month.withdrawn,
    0
  );
  const netWalletChange = totalAdded - totalWithdrawn;

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "250ms" }}>
      <CardHeader>
        <CardTitle>Wallet Activity (Last 6 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <WalletAnalyticsChart data={walletChartData} />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Net change:{" "}
            <span
              className={
                netWalletChange >= 0
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              ₹{netWalletChange.toFixed(2)}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

async function P2PChartSection() {
  const p2pChartData = await getP2PChartData();

  // Calculate net P2P change
  const totalSent =
    p2pChartData.find((item) => item.type === "transfer")?.amount || 0;
  const totalReceived =
    p2pChartData.find((item) => item.type === "receive")?.amount || 0;
  const netP2PChange = totalReceived - totalSent;

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "250ms" }}>
      <CardHeader>
        <CardTitle>P2P Transfer Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <P2PAnalyticsChart data={p2pChartData} />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Net P2P balance:{" "}
            <span
              className={
                netP2PChange >= 0
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              ₹{netP2PChange.toFixed(2)}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
