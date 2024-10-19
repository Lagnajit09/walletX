import prisma from "@repo/db/client";
import { BalanceCard } from "../../../src/components/custom/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { OnRampTransactions } from "../../../src/components/custom/OnRampTransactions";
import { createOnRampTransaction } from "../../lib/actions/createOnrampTransaction";
import { TransferMoney } from "@/components/custom/TransferMoneyCard";
import { createOffRampTransaction } from "../../lib/actions/createOffRampTransaction";
import { getRecentTransactions } from "../../lib/actions/getRecentTransactions";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/custom/Columns";

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

async function getTransactions() {
  const session = await getServerSession(authOptions);

  const txns = await getRecentTransactions(Number(session?.user?.id));
  return txns.map((t) => {
    const date = new Date(t.startTime);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }); // Output: 19 Oct 2024

    const formattedTime = date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }); // Output: 11:50 AM or 11:50 am

    return {
      date: `${formattedTime} on ${formattedDate}`, // 11:50 am on 19 Oct 2024
      amount: t.type == "onRamp" ? `+${t.amount / 100}` : `-${t.amount / 100}`,
      status: t.status,
      provider: t.provider,
      type: t.type,
    };
  });
}

export default async function () {
  const balance = await getBalance();
  const transactions = await getTransactions();

  return (
    <div className="w-full pb-10">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-0 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
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
      <div className="mt-5 mx-4">
        <p className="text-2xl font-bold text-purple-800 mb-3">
          Recent Transactions
        </p>
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}
