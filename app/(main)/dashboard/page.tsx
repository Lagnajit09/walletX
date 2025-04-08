import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Suspense } from "react";
import { BalanceCard } from "@/src/components/custom/BalanceCard";
import { DashboardSkeleton } from "@/src/components/skeletons/DashboardSkeleton";
import { unstable_noStore as noStore } from "next/cache";
import QuickActions from "@/src/components/custom/QuickActions";
import RecentTransactions from "@/src/components/custom/RecentTransactions";
import BankAccounts from "@/src/components/custom/BankAccounts";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  noStore(); // Disable caching for this route
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/signin");
  }

  return (
    <div className="my-3">
      <main className="px-4 pt-2 md:px-6 md:pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<DashboardSkeleton type="balance" />}>
            <BalanceSection />
          </Suspense>
          <QuickActions />
        </div>

        <div className="lg:col-span-1">
          <Suspense fallback={<DashboardSkeleton type="balance" />}>
            <RecentTransactionsSection />
          </Suspense>
          <BankAccounts />
        </div>
      </main>
    </div>
  );
}

// Separate components for each section
async function BalanceSection() {
  const { getBalance } = await import("../../lib/actions/getBalance");
  const balance = await getBalance();
  return <BalanceCard amount={balance.amount} locked={balance.locked} />;
}

async function RecentTransactionsSection() {
  const { getP2PTransfers } = await import("@/app/lib/actions/p2pTransfer");
  const recents = await getP2PTransfers(3);
  return <RecentTransactions recentTransactions={recents} />;
}

// async function WalletChartSection() {
//   const { getChartData } = await import("../../lib/actions/getChartData");
//   const data = await getChartData();
//   console.log(data);
//   return <ClientWalletChart data={JSON.parse(JSON.stringify(data))} />;
// }

// async function P2PChartSection() {
//   const { getP2PChartData } = await import("../../lib/actions/getP2PChartData");
//   const data = await getP2PChartData();
//   console.log(data);
//   if (data[0].amount === 0 && data[1].amount === 0) return <></>;
//   return <ClientP2PChart data={JSON.parse(JSON.stringify(data))} />;
// }
