"use client";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AuthForm = ({ page }: { page?: string }) => {
  const [phnNo, setPhnNo] = useState("");
  const [name, setName] = useState("");
  const [otpInputs, setOtpInputs] = useState(["", "", "", ""]);
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow one character
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);
  };

  return (
    <>
      <div className="w-[70%] m-auto">
        {page && (
          <TextInput
            placeholder="Name"
            onChange={(value) => {
              setName(value);
            }}
          />
        )}
        <TextInput
          inputType="tel"
          placeholder="Phone Number"
          onChange={(value) => {
            setPhnNo(value);
          }}
        />
        <div className="flex w-[100%] justify-between items-center">
          <div className="flex w-[40%] gap-2">
            {otpInputs.map((input, index) => (
              <TextInput
                key={index}
                placeholder="0"
                value={input}
                onChange={(value) => handleInputChange(index, value)}
                autoComplete="off"
              />
            ))}
          </div>
          <div className="hover:border-b hover:border-black">
            <button>Send OTP</button>
          </div>
        </div>
      </div>
      <Button children="Get Started" onClick={() => {}} />
      <div className="">
        {page ? (
          <div className="flex flex-col items-center gap-3">
            <p>Already have an account?</p>
            <Button
              children="Sign In"
              onClick={() => {
                router.push("/signin");
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <p>Don't have an account?</p>
            <Button
              children="Sign Up"
              onClick={() => {
                router.push("/signup");
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AuthForm;
