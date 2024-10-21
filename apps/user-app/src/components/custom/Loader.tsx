// /* HTML: <div class="loader"></div> */
// .loader {
//     width: 20px;
//     aspect-ratio: 1;
//     border-radius: 50%;
//     background: #000;
//     box-shadow: 0 0 0 0 #0004;
//     animation: l1 1s infinite;
//   }
//   @keyframes l1 {
//       100% {box-shadow: 0 0 0 30px #0000}
//   }

//   import React from 'react'

//   const Loader = () => {
//     return (
//         <div className="loader"></div>
//     )
//   }

//   export default Loader

import React from "react";

const Loader = () => {
  return (
    <div className="w-5 m-auto mt-[45vh] aspect-square rounded-full bg-gray-300 shadow-[0_0_0_0_rgba(0,0,0,0.25)] animate-ping"></div>
  );
};

export default Loader;
