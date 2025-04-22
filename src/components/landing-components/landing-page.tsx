"use client";

import React from "react";
import { ArrowRight, CreditCard, Send, Wallet, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import FeatureCard from "./feature-card";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 md:px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-swift-purple to-swift-blue bg-clip-text text-transparent mb-4">
            SwiftPay
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Seamless, secure, and swift payments for everyday transactions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="primary-gradient rounded-full">
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 text-swift-dark-gray border-swift-dark-gray"
              >
                Log In
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* App Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative max-w-xs mx-auto"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-swift-purple/10">
            <div className="bg-gradient-to-b from-swift-purple to-swift-blue p-3 rounded-t-2xl">
              <div className="h-6 flex justify-between items-center px-2">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
                </div>
                <div className="text-xs text-white/70">SwiftPay</div>
                <div className="w-8"></div>
              </div>
            </div>
            <img
              src="https://res.cloudinary.com/dp4cwxvld/image/upload/v1743580337/swiftpay-landing-1.png"
              alt="SwiftPay App"
              className="w-full "
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 w-64 h-64 rounded-full bg-swift-purple/5 blur-3xl -top-10 -left-10"></div>
          <div className="absolute -z-10 w-64 h-64 rounded-full bg-swift-blue/5 blur-3xl -bottom-10 -right-10"></div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-12 text-swift-light-purple"
        >
          Everything you need for modern payments
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Connect Banks"
            description="Securely link your bank accounts to transfer money instantly"
            icon={<CreditCard className="h-6 w-6 text-swift-purple" />}
            delay={0.1}
          />
          <FeatureCard
            title="Digital Wallet"
            description="Store funds securely in your digital wallet for quick access"
            icon={<Wallet className="h-6 w-6 text-swift-purple" />}
            delay={0.2}
          />
          <FeatureCard
            title="Send & Receive"
            description="Transfer money to friends and family with just a few taps"
            icon={<Send className="h-6 w-6 text-swift-purple" />}
            delay={0.3}
          />
          <FeatureCard
            title="Add & Withdraw"
            description="Easily move money between your wallet and bank accounts"
            icon={<ArrowDown className="h-6 w-6 text-swift-purple" />}
            delay={0.4}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-4 md:px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 text-swift-dark-gray"
        >
          How SwiftPay Works
        </motion.h2>

        <div className="space-y-6 md:space-y-12 max-w-2xl mx-auto">
          {[
            {
              step: "1",
              title: "Create your account",
              description:
                "Sign up in seconds with just your email and phone number",
            },
            {
              step: "2",
              title: "Connect your bank",
              description: "Securely link your existing bank accounts",
            },
            {
              step: "3",
              title: "Send and receive money",
              description:
                "Transfer funds instantly to anyone with a SwiftPay account",
            },
            {
              step: "4",
              title: "Manage your finances",
              description:
                "Track spending and keep all your transactions organized",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-swift-purple/10 flex items-center justify-center text-swift-purple font-bold">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-swift-dark-gray">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-2xl primary-gradient p-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Ready to get started with SwiftPay?
          </h2>
          <p className="text-white/90 mb-8 max-w-md mx-auto">
            Join thousands of people who trust SwiftPay for their everyday
            payments.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="rounded-full">
              Create your account
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Background Elements */}
      <div className="fixed top-0 right-0 w-72 h-72 bg-gradient-to-b from-swift-purple/10 to-swift-blue/5 rounded-full blur-3xl z-[-1]"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-swift-blue/10 to-swift-light-purple/5 rounded-full blur-3xl z-[-1]"></div>
      <div className="fixed top-1/3 left-1/4 w-48 h-48 bg-gradient-to-tr from-swift-light-purple/5 to-swift-purple/10 rounded-full blur-3xl z-[-1]"></div>
    </div>
  );
};

export default WelcomePage;
