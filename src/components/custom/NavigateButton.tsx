"use client";
import { useRouter } from "next/navigation";
import React from "react";

const NavigateButton = ({
  page,
  title,
  classname,
}: {
  page: string;
  title: string;
  classname?: string;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(page.toLowerCase());
      }}
      className={`w-[100%] ${classname}`}
    >
      {title}
    </button>
  );
};

export default NavigateButton;
