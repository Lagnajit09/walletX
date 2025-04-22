import React from "react";

type Props = {};

const BackBtn = (props: Props) => {
  return (
    <a
      href="/"
      className="inline-flex items-center text-sm font-semibold text-black gap-1 px-3 py-1.5 rounded-md hover:bg-slate-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      Back
    </a>
  );
};

export default BackBtn;
