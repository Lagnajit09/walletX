"use client";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import signup from "../../../app/lib/actions/signup";
import { signIn } from "next-auth/react";
import NavigateButton from "./NavigateButton";

const AuthForm = ({ newUser }: { newUser?: boolean }) => {
  const [phnNo, setPhnNo] = useState("");
  const [name, setName] = useState("");
  const [passwd, setPasswd] = useState("");
  // const [otpInputs, setOtpInputs] = useState(["", "", "", ""]);
  const router = useRouter();

  // const handleInputChange = (index: number, value: string) => {
  //   if (value.length > 1) return; // Only allow one character
  //   const newOtpInputs = [...otpInputs];
  //   newOtpInputs[index] = value;
  //   setOtpInputs(newOtpInputs);
  // };

  const signinHandler = async () => {
    const user = await signIn("credentials", {
      phone: phnNo,
      password: passwd,
      redirect: false,
    });
    console.log(user);
    router.push("/dashboard");
  };

  const signupHandler = async () => {
    try {
      const res = await signup(name, phnNo, passwd);
      if (res?.status) {
        signinHandler();
      } else {
        throw new Error("SignUp Error!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-[70%] m-auto">
        {newUser && (
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
        <TextInput
          inputType="password"
          placeholder="Password"
          onChange={(value) => {
            setPasswd(value);
          }}
        />
        {/* {newUser && (
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
        )} */}
      </div>
      <Button
        children="Get Started"
        classname="bg-gray-800 text-white"
        onClick={async () => {
          newUser ? signupHandler() : signinHandler();
        }}
      />
      <div className="">
        {newUser ? (
          <div className="flex flex-col items-center gap-3">
            <p>Already have an account?</p>
            <NavigateButton
              title="Sign In"
              page="signin"
              classname=" w-full py-2 bg-gray-800 rounded-lg text-white"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <p>Don't have an account?</p>
            <NavigateButton
              title="Sign Up"
              page="signup"
              classname=" w-full py-2 bg-gray-800 rounded-lg text-white"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AuthForm;
