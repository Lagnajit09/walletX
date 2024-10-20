"use client";
import Account from "@/components/custom/Account";
import ProfileData from "../../../src/components/custom/ProfileData";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const session = useSession();

  if (!session.data?.user) return;

  return (
    <div className="mb-8">
      <div className="text-4xl text-[#0077b6] pt-8 mb-8 font-bold">Profile</div>
      <div className="w-[30vw] mt-8 ml-5 flex flex-col gap-2">
        <ProfileData label="Name" value={session.data.user.name || ""} />
        <ProfileData label="Number" value={session.data.user.number || ""} />
        <ProfileData label="Email" value={session.data.user.email || " "} />
        <ProfileData label="Pin" value={session.data.user.pin || " "} />
      </div>
      <div className="">
        <p className="text-2xl text-[#0077b6] pt-8 mb-8 font-bold">
          Account Information
        </p>
        <Account />
      </div>
    </div>
  );
};

export default Profile;
