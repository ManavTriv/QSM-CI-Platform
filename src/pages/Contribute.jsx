import React from "react";
import Navbar from "../components/Navbar";

const Contribute = () => {
  return (
    <>
      <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
        <Navbar />
        <div className="px-2 mx-4 overflow-x-auto space-y-3">
          <h1 className="font-radio text-indigo-400 font-semibold">
            Contribute to QSM-CI
          </h1>
          <p className="font-radio text-[0.9375rem]">
            Help contribute to QSM-CI
          </p>
        </div>
      </div>
    </>
  );
};

export default Contribute;
