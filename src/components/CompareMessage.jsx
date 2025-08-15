import { Users, TrendingUp, Eye } from "lucide-react";

const CompareMessage = () => {
  return (
    <div className="px-2 mx-4 overflow-x-auto space-y-3">
      <h1 className="font-radio text-indigo-400 font-semibold">
        ELO Ranking System
      </h1>
      <div className="text-sm text-stone-800 font-radio space-y-3">
        <div className="flex items-start gap-2">
          <Users className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            This is a{" "}
            <span className="font-medium">community-driven ranking system</span>{" "}
            that compares algorithms based on their{" "}
            <span className="font-medium">susceptibility maps</span>.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <TrendingUp className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            The results correspond to the{" "}
            <span className="font-medium">ELO metric</span> for each algorithm.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Eye className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            Select the <span className="font-medium">susceptibility map</span>{" "}
            below that you believe is better. The algorithm names will then be
            revealed and their ELO scores updated.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompareMessage;
