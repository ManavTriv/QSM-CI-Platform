import React from "react";
import Navbar from "../components/Navbar";
import DotPlot from "../components/DotPlot";

const Metric = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full space-y-3">
      <Navbar />
      <DotPlot />
    </div>
  );
};

export default Metric;
