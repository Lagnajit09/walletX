"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import WalletAnalyticsChart from "./WalletAnalyticsChart";
import P2PAnalyticsChart from "./P2PAnalyticsChart";
import AnalyticsSummary from "./AnalyticsSummary";
import { chartDataProps } from "@/src/components/custom/WalletTransactionChart";

interface AnalyticsClientProps {
  walletChartData: chartDataProps[];
  p2pChartData: {
    type: string;
    amount: number;
    fill: string;
  }[];
}

export default function AnalyticsClient({
  walletChartData,
  p2pChartData,
}: AnalyticsClientProps) {
  const [activeTab, setActiveTab] = useState("wallet");

  // Calculate total amounts for wallet activity
  const totalAdded = walletChartData.reduce(
    (sum, month) => sum + month.added,
    0
  );
  const totalWithdrawn = walletChartData.reduce(
    (sum, month) => sum + month.withdrawn,
    0
  );
  const netWalletChange = totalAdded - totalWithdrawn;

  // Get P2P transfer amounts
  const totalSent =
    p2pChartData.find((item) => item.type === "transfer")?.amount || 0;
  const totalReceived =
    p2pChartData.find((item) => item.type === "receive")?.amount || 0;
  const netP2PChange = totalReceived - totalSent;

  return (
    <div className="space-y-8">
      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsSummary
          title="Total Added"
          value={totalAdded}
          type="positive"
        />
        <AnalyticsSummary
          title="Total Withdrawn"
          value={totalWithdrawn}
          type="negative"
        />
        <AnalyticsSummary title="P2P Sent" value={totalSent} type="negative" />
        <AnalyticsSummary
          title="P2P Received"
          value={totalReceived}
          type="positive"
        />
      </div>

      {/* Charts */}
      <Tabs
        defaultValue="wallet"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="wallet">Wallet Activities</TabsTrigger>
          <TabsTrigger value="p2p">P2P Transfers</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet">
          <Card>
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
                    ${netWalletChange.toFixed(2)}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="p2p">
          <Card>
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
                    ${netP2PChange.toFixed(2)}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
