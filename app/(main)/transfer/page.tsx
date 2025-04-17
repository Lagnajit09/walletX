import { Metadata } from "next";
import { Suspense } from "react";
import TransferPageClient from "@/src/components/transfer-page/TransferPageClient";
import { getContacts } from "@/app/lib/actions/useContact";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TransferPageSkeleton from "@/src/components/skeletons/TransferSkeleton";

export const metadata: Metadata = {
  title: "Send & Request Money | Swift Pay",
  description: "Transfer money to contacts or request payments easily",
};

const ContactsContainer = async () => {
  const res = await getContacts();
  const contacts = res.ok ? res.contacts : [];

  return <TransferPageClient initialContacts={contacts} />;
};

export default async function TransferPage() {
  // Authentication check
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/transfer");
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <main className="px-6 pt-8">
          <h1 className="text-2xl font-bold mb-6">Send & Request Money</h1>
          <Suspense fallback={<TransferPageSkeleton />}>
            <ContactsContainer />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
