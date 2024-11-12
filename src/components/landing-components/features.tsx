"use client";
import React from "react";
import { motion } from "framer-motion";
import { Smartphone, CreditCard, Zap, Shield } from "lucide-react";

type Props = {};

const Features = (props: Props) => {
  return (
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
        Our Features
      </h2>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-center">
        {[
          {
            icon: Zap,
            title: "Instant Transfers",
            description: "Send money in seconds, not days.",
          },
          {
            icon: Shield,
            title: "Secure Payments",
            description: "Your security is our top priority.",
          },
          {
            icon: CreditCard,
            title: "Multiple Payment Options",
            description: "Pay with cards, bank transfers, and more.",
          },
          {
            icon: Smartphone,
            title: "Mobile-First Design",
            description: "Optimized for the best mobile experience.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-[#0b2545] hover:bg-[#13315c] transition-colors"
          >
            <div className="p-3 bg-[#4A9FF5] text-white rounded-full">
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-sm text-[#a3c2e3] text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
