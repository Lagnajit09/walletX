import Account from "@/components/custom/Account";
import ProfileData from "../../../src/components/custom/ProfileData";
import React, { Suspense } from "react";
import Loader from "@/components/custom/Loader";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <Suspense fallback={<Loader />}>
      <ProfileContent session={session} />
    </Suspense>
  );
}

function ProfileContent({ session }: { session: any }) {
  if (!session || !session.user) return <p>No session found.</p>;

  return (
    <div className="mb-8">
      <div className="text-4xl text-[#0077b6] pt-8 mb-8 font-bold">Profile</div>
      <div className="w-[30vw] mt-8 ml-5 flex flex-col gap-2">
        <ProfileData label="Name" value={session.user.name || ""} />
        <ProfileData label="Number" value={session.user.number || ""} />
        <ProfileData label="Email" value={session.user.email || " "} />
        <ProfileData label="Pin" value={session.user.pin || " "} />
      </div>
      <div className="">
        <p className="text-2xl text-[#0077b6] pt-8 mb-8 font-bold">
          Account Information
        </p>
        <Account />
      </div>
    </div>
  );
}
