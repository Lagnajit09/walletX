import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";
import LandingPage from "@/src/components/landing-components/landing-page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    // Redirect to dashboard if user is already logged in
    redirect("/dashboard");
  }

  return (
    <>
      <LandingPage />
    </>
  );
}
