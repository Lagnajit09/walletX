import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Suspense } from "react";
import Loader from "@/src/components/custom/Loader";
import { BalanceCard } from "@/src/components/custom/BalanceCard";
import { getBalance } from "../../lib/actions/getBalance";
import { getChartData } from "../../lib/actions/getChartData";
import { getP2PChartData } from "../../lib/actions/getP2PChartData";
import {
  ClientP2PChart,
  ClientWalletChart,
} from "@/src/components/custom/ClientCharts";

// Add this at the top level to ensure proper serialization
const serializeData = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return <p>Unauthorized Access!</p>;

  // Fetch all data at the parent level
  const balance = serializeData(await getBalance());
  const walletTxnData = serializeData(await getChartData());
  const p2pTransferData = serializeData(await getP2PChartData());

  return (
    <div className="my-8">
      <h1 className="text-2xl md:text-4xl font-bold">
        Welcome, {session.user.name}!
      </h1>
      <div className="mt-8 w-full">
        <div className="w-[95%] md:w-[35%]">
          <Suspense fallback={<Loader />}>
            <BalanceCard amount={balance.amount} locked={balance.locked} />
          </Suspense>
        </div>
        <div className="mt-5 md:flex gap-10">
          <div className="w-[95%] md:w-[45%] mb-5 md:mb-0">
            <Suspense fallback={<Loader />}>
              <ClientWalletChart data={walletTxnData} />
            </Suspense>
          </div>
          <div className="w-[95%] md:w-[45%]">
            <Suspense fallback={<Loader />}>
              <ClientP2PChart data={p2pTransferData} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
