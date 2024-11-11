"use client";
import { signOut, useSession } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";
import Loader from "./Loader";
import AppbarWrapper from "@/src/custom-ui/Appbar";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  const path = usePathname();
  console.log(path);

  if (!session) return <Loader />;

  return (
    <AppbarWrapper
      onSignin={() => router.push("/signin")}
      onSignout={async () => {
        await signOut({ callbackUrl: "/signin" });
      }}
      user={session.data?.user}
    />
  );
}
