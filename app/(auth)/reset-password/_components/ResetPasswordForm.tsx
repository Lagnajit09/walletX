"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { LockKeyhole, CheckCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useLoading } from "@/contexts/LoadingContext";
import { Spinner } from "@/src/components/ui/spinner";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  validateResetToken,
  completePasswordReset,
} from "@/app/lib/actions/resetPassword";
import { resetPasswordFormSchema } from "@/app/lib/form";

export default function ResetPasswordForm() {
  const { isLoading, setIsLoading } = useLoading();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsTokenValid(false);
        return;
      }

      setIsLoading(true);
      try {
        const isValid = await validateResetToken(token);
        setIsTokenValid(isValid);
      } catch (error) {
        console.error("Error validating token:", error);
        setIsTokenValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token, setIsLoading]);

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    if (!token) return;

    setIsLoading(true);
    try {
      const success = await completePasswordReset(token, values.password);

      if (success) {
        setIsSubmitted(true);
        toast.success("Password has been reset successfully");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isTokenValid === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isTokenValid === false) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-red-100">
            <LockKeyhole className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Invalid or Expired Link</h2>
        <p className="text-muted-foreground mb-6">
          This password reset link is invalid or has expired. Please request a
          new one.
        </p>
        <Link href="/forgot-password">
          <Button className="w-full primary-gradient">
            Request New Reset Link
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isSubmitted ? (
        <>
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-swift-purple/10">
                <LockKeyhole className="h-8 w-8 text-swift-purple" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-swift-purple to-swift-blue bg-clip-text text-transparent">
              Reset Your Password
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Please enter your new password below
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          className="pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          className="pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full primary-gradient"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Spinner size="sm" variant="white" className="mr-2" />
                    Resetting...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Password Reset Successful</h2>
          <p className="text-muted-foreground mb-6">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
          <Link href="/signin">
            <Button className="w-full primary-gradient">Sign In</Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
