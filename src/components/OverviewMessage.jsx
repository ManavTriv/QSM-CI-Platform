import { Table, BarChart2, Info } from "lucide-react";

const OverviewMessage = () => {
  return (
    <div className="space-y-3">
      <h1 className="font-radio text-indigo-400 font-semibold">
        Algorithm and Metric Overview
      </h1>
      <div className="text-[0.9375rem] text-stone-800 font-radio space-y-3">
        <div className="flex items-start gap-2">
          <Table className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            This table provides an overview of the{" "}
            <span className="font-medium">QSM algorithms</span>, along with
            their corresponding{" "}
            <span className="font-medium">metric values</span>.
          </span>
        </div>

        <div className="flex items-start gap-2">
          <BarChart2 className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            The <span className="font-medium">ELO rating</span> is a
            community-driven metric that scores the algorithms against each
            other based on their{" "}
            <span className="font-medium">susceptibility maps</span>.
          </span>
        </div>

        <div className="flex items-start gap-2">
          <Info className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            To view more details about a{" "}
            <span className="font-medium">metric</span> or{" "}
            <span className="font-medium">algorithm</span>, click on the
            respective name in the table.
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverviewMessage;
