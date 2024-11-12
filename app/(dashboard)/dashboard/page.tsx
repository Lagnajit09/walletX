import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Suspense } from "react";
import { BalanceCard } from "@/src/components/custom/BalanceCard";
import {
  ClientP2PChart,
  ClientWalletChart,
} from "@/src/components/custom/ClientCharts";
import { DashboardSkeleton } from "@/src/components/custom/DashboardSkeleton";
import { unstable_noStore as noStore } from "next/cache";

export default async function DashboardPage() {
  noStore(); // Disable caching for this route
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <p>Unauthorized Access!</p>;
  }

  return (
    <div className="my-8">
      <h1 className="text-2xl md:text-4xl font-bold">
        Welcome, {session.user.name}!
      </h1>
      <div className="mt-8 w-full">
        <div className="w-[95%] md:w-[35%]">
          <Suspense fallback={<DashboardSkeleton type="balance" />}>
            <BalanceSection />
          </Suspense>
        </div>
        <div className="mt-5 md:flex gap-10">
          <div className="w-[95%] md:w-[45%] mb-5 md:mb-0">
            <Suspense fallback={<DashboardSkeleton type="chart" />}>
              <WalletChartSection />
            </Suspense>
          </div>
          <div className="w-[95%] md:w-[45%]">
            <Suspense fallback={<DashboardSkeleton type="chart" />}>
              <P2PChartSection />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate components for each section
async function BalanceSection() {
  const { getBalance } = await import("../../lib/actions/getBalance");
  const balance = await getBalance();
  return <BalanceCard amount={balance.amount} locked={balance.locked} />;
}

async function WalletChartSection() {
  const { getChartData } = await import("../../lib/actions/getChartData");
  const data = await getChartData();
  return <ClientWalletChart data={JSON.parse(JSON.stringify(data))} />;
}

async function P2PChartSection() {
  const { getP2PChartData } = await import("../../lib/actions/getP2PChartData");
  const data = await getP2PChartData();
  return <ClientP2PChart data={JSON.parse(JSON.stringify(data))} />;
}
