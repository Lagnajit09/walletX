"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showLoader: (duration?: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const showLoader = (duration = 2000) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, duration);
  };

  // Show loading on navigation
  useEffect(() => {
    showLoader();
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, showLoader }}>
      {children}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-swift-purple via-swift-blue to-swift-light-purple">
          <div className="h-full w-full animate-pulse-soft bg-gradient-to-r from-swift-purple to-swift-blue"></div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
