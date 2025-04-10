import { Suspense } from "react";
import Loader from "@/src/components/custom/Loader";
import { getP2PTransfers } from "@/app/lib/actions/p2pTransfer";
import { getWalletTransactions } from "@/app/lib/actions/getWalletTransactions";
import { redirect } from "next/navigation";
import { TransactionHeader } from "@/src/components/transactions-page/TransactionHeader";
import { TransactionStats } from "@/src/components/transactions-page/TransactionStats";
import TransactionHistory from "@/src/components/transactions-page/TransactionHistory";

export default async function TransactionsPage() {
  const p2pTransfers = await getP2PTransfers();
  const walletTransactions = await getWalletTransactions();

  // If not authorized, redirect to sign in
  if (
    typeof p2pTransfers === "string" ||
    typeof walletTransactions === "string"
  ) {
    redirect("/signin");
  }

  return (
    <main className="px-4 pt-2 md:px-6 md:pt-8 space-y-8">
      <TransactionHeader />

      <Suspense fallback={<Loader />}>
        <TransactionStats
          p2pTransactions={p2pTransfers}
          walletTransactions={walletTransactions}
        />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <TransactionHistory
          p2pTransactions={p2pTransfers}
          walletTransactions={walletTransactions}
        />
      </Suspense>
    </main>
  );
}

// import { DataTable } from "@/src/components/ui/data-table";
// import { getP2PTransfers } from "../../lib/actions/p2pTransfer";
// import { TransferColumns } from "@/src/components/custom/TransferColumns";
// import React, { Suspense } from "react";
// import Loader from "@/src/components/custom/Loader";

// export default function P2PTransfersPage() {
//   return (
//     <Suspense fallback={<Loader />}>
//       <P2PTransfers />
//     </Suspense>
//   );
// }

// async function P2PTransfers() {
//   const transactions = await getP2PTransfers();
//   if (typeof transactions === "string") {
//     return <p>{transactions}</p>;
//   }

//   return (
//     <div className="w-full">
//       <div className="text-4xl text-[#00b4d8] pb-6 pt-2 font-bold">
//         P2P Transfers
//       </div>
//       <div className="w-full overflow-x-auto">
//         <DataTable columns={TransferColumns} data={transactions} />
//       </div>
//     </div>
//   );
// }
