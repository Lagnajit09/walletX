import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Suspense } from "react";
import Loader from "@/components/custom/Loader";
import { BalanceCard } from "@/components/custom/BalanceCard";
import WalletTransactionChart from "@/components/custom/WalletTransactionChart";
import P2PTransfersChart from "@/components/custom/P2PTransferChart";
import { getBalance } from "../../lib/actions/getBalance";
import { getChartData } from "../../lib/actions/getChartData";
import { getP2PChartData } from "../../lib/actions/getP2PChartData";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return <p>Unauthorized Access!</p>;

  return (
    <div className="my-8">
      <h1 className="text-2xl md:text-4xl font-bold">
        Welcome, {session.user.name}!
      </h1>
      <div className="mt-8 w-full">
        <div className="w-[95%] md:w-[35%]">
          <Suspense fallback={<Loader />}>
            <BalanceContent />
          </Suspense>
        </div>
        <div className="mt-5 md:flex gap-10">
          <div className="w-[95%] md:w-[45%] mb-5 md:mb-0">
            <Suspense fallback={<Loader />}>
              <WalletTransactionContent />
            </Suspense>
          </div>
          <div className="w-[95%] md:w-[45%]">
            <Suspense fallback={<Loader />}>
              <P2PTransfersContent />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate component for rendering balance card
const BalanceContent = async () => {
  const balance = await getBalance();
  return <BalanceCard amount={balance.amount} locked={balance.locked} />;
};

// Separate component for rendering wallet transaction chart
const WalletTransactionContent = async () => {
  const walletTxnData = await getChartData();
  return <WalletTransactionChart chartData={walletTxnData} />;
};

// Separate component for rendering P2P transfers chart
const P2PTransfersContent = async () => {
  const p2pTransferData = await getP2PChartData();
  return <P2PTransfersChart chartData={p2pTransferData} />;
};
