import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import MainHeader from "@/src/components/custom/MainHeader";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-md md:max-w-6xl px-6">
        <MainHeader />
        <div>{children}</div>
      </div>
    </div>
  );
}
