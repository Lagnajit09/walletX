import { BalanceCard } from "@/components/custom/BalanceCard";
import { SendCard } from "../../../src/components/custom/SendCard";
import { getBalance } from "../../lib/actions/getBalance";
import React, { Suspense } from "react";
import Loader from "@/components/custom/Loader";

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
      <div className="w-[40%]">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
      <SendCard />
    </div>
  );
}
