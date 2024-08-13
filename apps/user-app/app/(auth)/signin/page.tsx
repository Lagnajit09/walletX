"use client";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import React from "react";

const SignIn = () => {
  return (
    <div className="max-w-[100vw] m-20 flex border-2 rounded-lg">
      <div className="bg-gray-800 flex flex-col items-center justify-center text-white flex-1 gap-7 rounded-tl-lg rounded-bl-lg">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl">Welcome to SwiftPay!</h1>
          <p className="text-base">Effortless Payments, Anytime, Anywhere.</p>
        </div>
        <Button
          children="Continue with Google"
          classname="border-2 border-white"
          onClick={() => {}}
        />
      </div>
      <div className="flex-1 p-10 gap-8 flex flex-col items-center">
        <h1 className="text-3xl text-center font-bold">
          Get Started with SwiftPay
        </h1>
        <div className="w-[70%] m-auto">
          <TextInput placeholder="Name" onChange={() => {}} />
          <TextInput
            inputType="tel"
            placeholder="Phone Number"
            onChange={() => {}}
          />
          <div className="flex w-[100%] justify-between items-center">
            <div className="flex w-[40%] gap-2">
              <TextInput
                placeholder="0"
                onChange={() => {}}
                autoComplete="off"
              />
              <TextInput
                placeholder="0"
                onChange={() => {}}
                autoComplete="off"
              />
              <TextInput
                placeholder="0"
                onChange={() => {}}
                autoComplete="off"
              />
              <TextInput
                placeholder="0"
                onChange={() => {}}
                autoComplete="off"
              />
            </div>
            <div className="hover:border-b hover:border-black">
              <button>Send OTP</button>
            </div>
          </div>
        </div>
        <Button children="Get Started" onClick={() => {}} />
      </div>
    </div>
  );
};

export default SignIn;
