import React from "react";
import { Loader2 } from "lucide-react";
import { m } from "framer-motion";

type TransactionLoaderProps = {
  message?: string;
};

const TransactionLoader: React.FC<TransactionLoaderProps> = ({
  message = "Processing...",
}) => {
  console.log(message);
  return (
    <div className="flex flex-col items-center justify-center py-3 gap-2">
      <Loader2 className="h-8 w-8 text-swift-purple animate-spin" />
    </div>
  );
};

export default TransactionLoader;
