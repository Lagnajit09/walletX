"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  classname?: string;
  disable?: boolean;
  onClick: () => void;
}

export const Button = ({
  children,
  onClick,
  classname,
  disable,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disable || false}
      className={`focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${classname}`}
    >
      {children}
    </button>
  );
};
