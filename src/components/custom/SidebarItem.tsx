"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`flex ${
        selected ? "text-[#0077b6]" : "text-slate-300"
      } cursor-pointer p-3 text-lg items-center`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-bold ${
          selected ? "text-[#0077b6]" : "text-slate-300"
        }`}
      >
        {title}
      </div>
    </div>
  );
};
