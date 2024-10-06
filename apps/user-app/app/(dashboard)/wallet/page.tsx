import prisma from "@repo/db/client";
import { BalanceCard } from "../../../src/components/custom/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { OnRampTransactions } from "../../../src/components/custom/OnRampTransactions";
import { createOnRampTransaction } from "../../lib/actions/createOnrampTransaction";
import { TransferMoney } from "@/components/custom/TransferMoneyCard";
import { createOffRampTransaction } from "../../lib/actions/createOffRampTransaction";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          {/* <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div> */}
        </div>
        <div className=""></div>
        <div className="mt-5">
          <p className="text-2xl font-bold text-purple-800 mb-3">
            Add to Wallet
          </p>
          <TransferMoney
            title="Add Money"
            callbackFunc={createOnRampTransaction}
            btnText="Add Money"
          />
        </div>
        <div className="mt-5">
          <p className="text-2xl font-bold text-purple-800 mb-3">
            Withdraw to Bank
          </p>
          <TransferMoney
            title="Withdraw Money"
            callbackFunc={createOffRampTransaction}
            btnText="Withdraw Money"
          />
        </div>
      </div>
    </div>
  );
}
