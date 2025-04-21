"use client";
import React, { useState } from "react";
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
import { Mail, KeyRound, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useLoading } from "@/contexts/LoadingContext";
import { Spinner } from "@/src/components/ui/spinner";
import Link from "next/link";
import { initiatePasswordReset } from "@/app/lib/actions/resetPassword";
import { forgotPasswordFormSchema } from "@/app/lib/form";

export default function ForgotPasswordForm() {
  const { isLoading, setIsLoading } = useLoading();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordFormSchema>) => {
    setIsLoading(true);

    try {
      const success = await initiatePasswordReset(values.email);

      if (success) {
        setIsSubmitted(true);
        toast.success("Password reset link sent to your email");
      } else {
        toast.error("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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
                <KeyRound className="h-8 w-8 text-swift-purple" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-swift-purple to-swift-blue bg-clip-text text-transparent">
              Forgot your password?
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your email address below and we'll send you a link to reset
              your password
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="you@example.com"
                          className="pl-10"
                          {...field}
                        />
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
                    Sending...
                  </div>
                ) : (
                  "Send Reset Link"
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
          <h2 className="text-2xl font-bold mb-2">Check your email</h2>
          <p className="text-muted-foreground mb-6">
            We've sent a password reset link to your email address. Please check
            your inbox.
          </p>
          <Link href="/signin">
            <Button variant="outline" className="w-full">
              Back to Sign In
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Didn't receive the email?{" "}
            <button
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
              className="text-swift-purple hover:text-swift-dark-purple font-medium"
            >
              Try again
            </button>
          </p>
        </div>
      )}
    </motion.div>
  );
}
