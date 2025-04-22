"use client";

import React from "react";
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
import { Checkbox } from "@/src/components/ui/checkbox";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SigninFormSchema } from "@/app/lib/form";
import { signIn } from "next-auth/react";
import { useLoading } from "@/contexts/LoadingContext";
import { Spinner } from "@/src/components/ui/spinner";
import { toast } from "@/hooks/use-toast";

// Create a TypeScript type from the schema
type FormValues = z.infer<typeof SigninFormSchema>;

export function SignInForm() {
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();

  // Initialize form with proper typing
  const form = useForm<FormValues>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      phone: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    // Handle authentication
    setIsLoading(true);
    try {
      const user = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (!user?.ok) throw new Error("Incorrect phone or password!");
      toast({
        title: `Welcome!`,
        description: "Signed in successfully.",
        variant: "default",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to Sign In!",
        description: "Incorrect phone or password.",
        variant: "destructive",
      });
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="********"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="text-sm text-swift-purple hover:text-swift-dark-purple"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full primary-gradient"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner size="sm" variant="white" className="mr-2" />
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
