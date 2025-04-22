"use client";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="relative w-12 h-12 mx-auto">
      <div className="w-12 h-12 bg-[#f08080] absolute top-0 left-0 rounded animate-jump">
        <span className="block absolute top-[60px] left-0 w-12 h-[5px] bg-[#f0808050] rounded-full animate-shadow"></span>
      </div>
    </div>
  );
};

export default Loader;
