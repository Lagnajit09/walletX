"use client";

import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { ContactSearchProps } from "@/types/contact";

export default function ContactSearch({
  searchQuery,
  setSearchQuery,
}: ContactSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by name or phone number"
        className="pl-9"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
