"use client";
import { signOut, useSession } from "next-auth/react";
import Appbar from "@repo/ui/appbar";
import { usePathname, useRouter } from "next/navigation";
import Loader from "./Loader";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  const path = usePathname();
  console.log(path);

  if (!session) return <Loader />;

  return (
    <Appbar
      onSignin={() => router.push("/signin")}
      onSignout={async () => {
        await signOut({ callbackUrl: "/signin" });
      }}
      user={session.data?.user}
      path={path}
    />
  );
}
