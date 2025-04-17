import { Suspense } from "react";
import { getP2PTransfers } from "@/app/lib/actions/p2pTransfer";
import { getWalletTransactions } from "@/app/lib/actions/getWalletTransactions";
import { redirect } from "next/navigation";
import { TransactionHeader } from "@/src/components/transactions-page/TransactionHeader";
import { TransactionStats } from "@/src/components/transactions-page/TransactionStats";
import TransactionHistory from "@/src/components/transactions-page/TransactionHistory";
import {
  TransactionHeaderSkeleton,
  TransactionTableSkeleton,
} from "@/src/components/skeletons/TransactionSkeleton";

const TransactionStatsWrapper = async () => {
  const [p2pTransfers, walletTransactions] = await Promise.all([
    getP2PTransfers(),
    getWalletTransactions(),
  ]);

  if (
    typeof p2pTransfers === "string" ||
    typeof walletTransactions === "string"
  ) {
    redirect("/signin");
  }

  return (
    <TransactionStats
      p2pTransactions={p2pTransfers}
      walletTransactions={walletTransactions}
    />
  );
};

const TransactionHistoryWrapper = async () => {
  const [p2pTransfers, walletTransactions] = await Promise.all([
    getP2PTransfers(),
    getWalletTransactions(),
  ]);

  if (
    typeof p2pTransfers === "string" ||
    typeof walletTransactions === "string"
  ) {
    redirect("/signin");
  }

  return (
    <TransactionHistory
      p2pTransactions={p2pTransfers}
      walletTransactions={walletTransactions}
    />
  );
};

export default function TransactionsPage() {
  return (
    <main className="px-4 pt-2 md:px-6 md:pt-8 space-y-8">
      <TransactionHeader />

      <Suspense fallback={<TransactionHeaderSkeleton />}>
        <TransactionStatsWrapper />
      </Suspense>

      <Suspense fallback={<TransactionTableSkeleton />}>
        <TransactionHistoryWrapper />
      </Suspense>
    </main>
  );
}
