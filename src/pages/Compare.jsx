import React from "react";
import Navbar from "../components/Navbar";
import CompareMessage from "../components/CompareMessage";
import AlgorithmComparison from "../components/AlgorithmComparison";

const Compare = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
      <Navbar />
      <CompareMessage />
      <AlgorithmComparison />
    </div>
  );
};

export default Compare;
