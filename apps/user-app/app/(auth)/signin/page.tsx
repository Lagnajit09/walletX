"use client";
import { Button } from "@repo/ui/button";
import React from "react";
import AuthForm from "../../../src/components/custom/AuthForm";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="max-w-[100vw] m-20 flex border-2 rounded-lg">
      <div className="bg-[#456d86] flex flex-col items-center justify-center text-white flex-1 gap-7 rounded-tl-lg rounded-bl-lg">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl">Welcome to SwiftPay!</h1>
          <p className="text-base">Effortless Payments, Anytime, Anywhere.</p>
        </div>
        <Button
          children="Continue with Google"
          classname="border-2 border-white"
          onClick={async () => {
            await signIn("google");
          }}
        />
      </div>
      <div className="flex-1 p-10 gap-8 flex flex-col items-center">
        <h1 className="text-3xl text-center font-bold">Sign In to SwiftPay</h1>
        <AuthForm />
      </div>
    </div>
  );
};

export default SignIn;
