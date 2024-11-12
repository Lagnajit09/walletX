"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
type Props = {
  user?: {
    name?: string | null;
  };
};

const Hero = ({ user }: Props) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 px-4 md:px-6"
      >
        <div className="flex flex-col h-[40vh] items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to <span className="text-[#4A9FF5]">SwiftPay</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-[#e0e0e0] md:text-xl">
              The fastest way to send and receive money. Secure, simple, and
              swift.
            </p>
          </div>
          <div className="space-x-4">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#4A9FF5] px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#3a8fe5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4A9FF5]"
              href={user ? "/dashboard" : "/auth"}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Button
              variant="outline"
              className="h-10 px-8 bg-transparent border-[#4A9FF5] text-[#4A9FF5] hover:bg-[#4A9FF5] hover:text-white"
            >
              Learn More
            </Button>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/12935076/pexels-photo-12935076.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center opacity-75 blur-[2px]"></div>
      </motion.div>
    </>
  );
};

export default Hero;
