import Navbar from "../components/Navbar";
import AlgorithmComparison from "../components/AlgorithmComparison";

const Compare = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
      <Navbar />
      <div className="px-2 mx-4 overflow-x-auto space-y-3">
        <h1 className="font-radio text-indigo-400 font-semibold">
          ELO Ranking System
        </h1>
        <p className="font-radio text-[0.9375rem]">
          Use this comparison tool to compare algorithms based on their
          susceptibility maps.
        </p>
        <AlgorithmComparison />
      </div>
    </div>
  );
};

export default Compare;
