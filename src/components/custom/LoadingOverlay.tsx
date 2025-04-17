"use client";
import React from "react";
import { useLoading } from "@/contexts/LoadingContext";
import Loader from "./Loader";

export const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Loader />
    </div>
  );
};
