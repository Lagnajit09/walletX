import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "primary" | "white";
}

export function Spinner({
  size = "md",
  className,
  variant = "primary",
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const variantClasses = {
    primary: "text-swift-purple",
    white: "text-white",
  };

  return (
    <div
      className={cn(
        "animate-spin",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-label="Loading"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
}
