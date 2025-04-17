import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Suspense } from "react";
import { BalanceCard } from "@/src/components/custom/BalanceCard";
import { DashboardSkeleton } from "@/src/components/skeletons/DashboardSkeleton";
import QuickActions from "@/src/components/custom/QuickActions";
import RecentTransactions from "@/src/components/custom/RecentTransactions";
import BankAccounts from "@/src/components/custom/BankAccounts";
import { redirect } from "next/navigation";

import { getBalance } from "../../lib/actions/getBalance";
import { getP2PTransfers } from "@/app/lib/actions/p2pTransfer";

const BalanceSection = async () => {
  try {
    const balance = await getBalance();
    return <BalanceCard amount={balance.amount} locked={balance.locked} />;
  } catch (error) {
    console.error("Failed to load balance:", error);
    return (
      <div className="p-4 text-red-500">Unable to load balance information</div>
    );
  }
};

const RecentTransactionsSection = async () => {
  try {
    const recents = await getP2PTransfers(3);
    return <RecentTransactions recentTransactions={recents} />;
  } catch (error) {
    console.error("Failed to load transactions:", error);
    return (
      <div className="p-4 text-red-500">Unable to load recent transactions</div>
    );
  }
};

const StaticQuickActions = () => <QuickActions />;
const StaticBankAccounts = () => <BankAccounts />;

export default async function DashboardPage() {
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
          <StaticQuickActions />
        </div>

        <div className="lg:col-span-1">
          <Suspense fallback={<DashboardSkeleton type="balance" />}>
            <RecentTransactionsSection />
          </Suspense>
          <StaticBankAccounts />
        </div>
      </main>
    </div>
  );
}
