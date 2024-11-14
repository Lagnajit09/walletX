import { BalanceCard } from "@/src/components/custom/BalanceCard";
import { SendCard } from "../../../src/components/custom/SendCard";
import { getBalance } from "../../lib/actions/getBalance";
import React, { Suspense } from "react";
import Loader from "@/src/components/custom/Loader";
import Contacts from "@/src/components/custom/Contacts";
import { getContacts } from "@/app/lib/actions/useContact";

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
  const contacts = await getContacts();

  return (
    <main className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Transfer Money</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
            <SendCard />
          </div>
          <div className="h-fit">
            <Contacts userContacts={contacts} />
          </div>
        </div>
      </div>
    </main>
  );
}
