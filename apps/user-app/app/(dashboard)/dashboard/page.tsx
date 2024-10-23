import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "@/components/custom/BalanceCard";
import { getBalance } from "../../lib/actions/getBalance";
import { getChartData } from "../../lib/actions/getChartData";
import WalletTransactionChart from "@/components/custom/WalletTransactionChart";

export default async function DashbordPage() {
  const session = await getServerSession(authOptions);
  const balance = await getBalance();
  const chartData = await getChartData();

  if (!session.user) return <p>Unauthorized Access!</p>;

  return (
    <div className="my-8">
      <h1 className="text-4xl font-bold">Welcome, {session.user.name}!</h1>
      <div className="mt-8">
        <div className="w-[35%]">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>
        <div className="w-[45%] mt-5">
          <WalletTransactionChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
