// page.tsx (Server Component)
import { Metadata } from "next";
import TransferPageClient from "@/src/components/transfer-page/TransferPageClient";
import { getContacts } from "@/app/lib/actions/useContact";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Send & Request Money | Swift Pay",
  description: "Transfer money to contacts or request payments easily",
};

export default async function TransferPage() {
  // Fetch data on the server
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/transfer");
  }

  const res = await getContacts();
  const contacts = res.ok ? res.contacts : [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <main className="px-6 pt-8">
          <h1 className="text-2xl font-bold mb-6">Send & Request Money</h1>

          {/* Pass fetched data to client component */}
          <TransferPageClient initialContacts={contacts} />
        </main>
      </div>
    </div>
  );
}
