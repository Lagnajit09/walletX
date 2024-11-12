"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import signup from "@/app/lib/actions/signup";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";

type Props = {};

const AuthForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phnNo, setPhnNo] = useState("");
  const [err, setErr] = useState("");
  const [name, setName] = useState("");
  const [passwd, setPasswd] = useState("");
  const router = useRouter();

  const signinHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const user = await signIn("credentials", {
        phone: phnNo,
        password: passwd,
        redirect: false,
      });
      console.log(user);
      if (!user?.ok) throw new Error("Incorrect phone or password!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      setErr(error.message);
      router.refresh();
    } finally {
      setIsLoading(false);
      setName("");
      setPhnNo("");
      setPasswd("");
    }
  };

  const signupHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await signup(name, phnNo, passwd);
      if (res?.ok) {
        signinHandler(event);
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.error(error);
      setErr(error.message);
      router.refresh();
    } finally {
      setIsLoading(false);
      setName("");
      setPhnNo("");
      setPasswd("");
    }
  };

  return (
    <div className="w-[450px] m-auto">
      {err && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{err}</AlertDescription>
        </Alert>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-[#0d2d54] border-[#1c3a5e]">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              Welcome to SwiftPay
            </CardTitle>
            <CardDescription className="text-center text-[#a3c2e3]">
              Sign up or sign in to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="signup"
              className="w-full"
              onValueChange={() => setErr("")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="signin">Sign In</TabsTrigger>
              </TabsList>
              <TabsContent value="signup">
                <form onSubmit={signupHandler}>
                  <div className="space-y-4">
                    <div className="space-y-2 text-gray-100">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        required
                        className="bg-[#0b2545] border-[#1c3a5e] text-white"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2 text-gray-100">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="1234 567 890"
                        required
                        className="bg-[#0b2545] border-[#1c3a5e] text-white"
                        onChange={(e) => {
                          setPhnNo(e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2 text-gray-100">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        className="bg-[#0b2545] border-[#1c3a5e] text-white"
                        onChange={(e) => {
                          setPasswd(e.target.value);
                        }}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#4A9FF5] hover:bg-[#3a8fe5]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing up..." : "Sign Up"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="signin">
                <form onSubmit={signinHandler}>
                  <div className="space-y-4">
                    <div className="space-y-2 text-gray-100">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="1234 567 890"
                        required
                        className="bg-[#0b2545] border-[#1c3a5e] text-white"
                        onChange={(e) => {
                          setPhnNo(e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2 text-gray-100">
                      <Label htmlFor="signinPassword">Password</Label>
                      <Input
                        id="signinPassword"
                        type="password"
                        required
                        className="bg-[#0b2545] border-[#1c3a5e] text-white"
                        onChange={(e) => {
                          setPasswd(e.target.value);
                        }}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#4A9FF5] hover:bg-[#3a8fe5]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#1c3a5e]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0d2d54] px-2 text-[#a3c2e3]">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent border-[#1c3a5e] text-white hover:bg-[#1c3a5e]"
                onClick={() => alert("Google Sign-In")}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthForm;
