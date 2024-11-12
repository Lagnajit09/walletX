import { DataTable } from "@/src/components/ui/data-table";
import { getP2PTransfers } from "../../lib/actions/p2pTransfer";
import { TransferColumns } from "@/src/components/custom/TransferColumns";
import React, { Suspense } from "react";
import Loader from "@/src/components/custom/Loader";

export default function P2PTransfersPage() {
  return (
    <Suspense fallback={<Loader />}>
      <P2PTransfers />
    </Suspense>
  );
}

async function P2PTransfers() {
  const transactions = await getP2PTransfers();
  if (typeof transactions === "string") {
    return <p>{transactions}</p>;
  }

  return (
    <div className="h-[92vh]">
      <div className="text-4xl text-[#00b4d8] pt-8 mb-8 font-bold">
        P2P Transfers
      </div>

      <DataTable columns={TransferColumns} data={transactions} />
    </div>
  );
}
