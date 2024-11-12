"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Props = {};

const FAQ = (props: Props) => {
  // Create an array of open states, one for each FAQ
  const [openStates, setOpenStates] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  // Function to toggle individual FAQ
  const toggleFAQ = (index: number) => {
    setOpenStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  const faqs = [
    {
      question: "How secure is SwiftPay?",
      answer:
        "SwiftPay uses state-of-the-art encryption and security measures to ensure your transactions are safe and secure.",
    },
    {
      question: "What are the fees for using SwiftPay?",
      answer:
        "SwiftPay offers competitive rates with no hidden fees. Our standard fee is 1% per transaction.",
    },
    {
      question: "How quickly are transfers processed?",
      answer:
        "Most transfers are processed instantly. In some cases, it may take up to 24 hours depending on the banks involved.",
    },
  ];

  return (
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ height: openStates[index] ? "auto" : "48px" }}
            className="border-b border-[#1c3a5e] overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full py-4 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{faq.question}</span>
              <ChevronDown
                className={`transform transition-transform ${
                  openStates[index] ? "rotate-180" : ""
                }`}
              />
            </button>
            <p className="pb-4 text-[#a3c2e3]">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
