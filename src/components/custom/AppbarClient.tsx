"use client";
import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import Loader from "./Loader";
import AppbarWrapper from "@/src/custom-ui/Appbar";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  if (!session) return <Loader />;

  return (
    <AppbarWrapper
      onSignin={() => router.push("/auth")}
      onSignout={async () => {
        await signOut({ callbackUrl: "/auth" });
      }}
      user={session.data?.user}
    />
  );
}
