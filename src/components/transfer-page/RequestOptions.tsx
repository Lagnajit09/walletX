"use client";

import { UserPlus2 } from "lucide-react";

interface RequestOptionsProps {
  onRequestMethodSelect: (method: string) => void;
}

export default function RequestOptions({
  onRequestMethodSelect,
}: RequestOptionsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div
        className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/40 hover:bg-muted cursor-pointer transition-colors"
        onClick={() => onRequestMethodSelect("Request Number")}
      >
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-primary">
          <UserPlus2 className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-center">Request Number</p>
      </div>
    </div>
  );
}
