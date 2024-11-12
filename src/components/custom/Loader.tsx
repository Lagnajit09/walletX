// https://css-loaders.com/pulsing/

import React from "react";

const Loader = () => {
  return (
    <div className="h-[45vh]">
      <div className="w-5 m-auto mt-[45vh] aspect-square rounded-full bg-gray-300 shadow-[0_0_0_0_rgba(0,0,0,0.25)] animate-ping"></div>
    </div>
  );
};

export default Loader;
