import React from "react";
import Navbar from "../components/Navbar";
import ContributeMessage from "../components/ContributeMessage.jsx";

const Contribute = () => {
  return (
    <>
      <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
        <Navbar />
        <ContributeMessage />
      </div>
    </>
  );
};

export default Contribute;
