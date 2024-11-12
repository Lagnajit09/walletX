import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <p className="text-xs text-[#a3c2e3]">
        © 2024 SwiftPay. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs text-[#a3c2e3] hover:text-[#4A9FF5] transition-colors"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs text-[#a3c2e3] hover:text-[#4A9FF5] transition-colors"
          href="#"
        >
          Privacy Policy
        </Link>
      </nav>
    </>
  );
};

export default Footer;
