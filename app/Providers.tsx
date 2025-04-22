"use client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { Toaster } from "@/src/components/ui/toaster";
import { Toaster as Sonner } from "@/src/components/ui/sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <LoadingProvider>
        <Toaster />
        <Sonner />
        <SessionProvider>{children}</SessionProvider>
      </LoadingProvider>
    </RecoilRoot>
  );
};
