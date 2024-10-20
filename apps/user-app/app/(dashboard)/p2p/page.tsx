import { BalanceCard } from "@/components/custom/BalanceCard";
import { SendCard } from "../../../src/components/custom/SendCard";
import { getBalance } from "../../lib/actions/getBalance";

export default async function () {
  const balance = await getBalance();

  return (
    <div className="w-full">
      <div className="text-4xl text-[#00b4d8] py-8 mb-0 font-bold">
        Send Money
      </div>
      <div className="w-[40%]">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
      <SendCard />
    </div>
  );
}
