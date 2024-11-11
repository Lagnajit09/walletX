import { BalanceCard } from "@/src/components/custom/BalanceCard";
import { SendCard } from "../../../src/components/custom/SendCard";
import { getBalance } from "../../lib/actions/getBalance";
import React, { Suspense } from "react";
import Loader from "@/src/components/custom/Loader";

export default function SendMoneyPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SendMoneyContent />
    </Suspense>
  );
}

// Fetch balance data
async function getBalanceData() {
  const balance = await getBalance();
  return balance;
}

async function SendMoneyContent() {
  const balance = await getBalanceData();

  return (
    <div className="w-full">
      <div className="text-4xl text-[#00b4d8] py-8 mb-0 font-bold">
        Send Money
      </div>
      <div className="w-[95%] md:w-[40%]">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
      <div className="w-[95%] md:w-[40%]">
        <SendCard />
      </div>
    </div>
  );
}
