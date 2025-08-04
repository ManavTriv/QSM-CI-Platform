import React from "react";
import { Info, FileText, BarChart } from "lucide-react";
import metricDescriptions from "../data/metricDescriptions";

const MetricOverview = ({ metric }) => {
  const description =
    metricDescriptions[metric] ||
    "No description is available for this metric.";

  return (
    <div className="px-2 mx-4 overflow-x-auto space-y-3">
      <h1 className="font-radio text-indigo-400 font-semibold">
        Metric Overview
      </h1>

      <div className="text-[0.9375rem] text-gray-800 font-radio space-y-3">
        <div className="flex items-start gap-2">
          <Info className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            This is a <span className="font-medium">metric overview</span> for{" "}
            <span className="font-medium">{metric}</span>.
          </span>
        </div>

        <div className="flex items-start gap-2">
          <FileText className="mt-1 h-4 w-4 text-indigo-400" />
          <span>{description}</span>
        </div>

        <div className="flex items-start gap-2">
          <BarChart className="mt-1 h-4 w-4 text-indigo-400" />
          <span>
            Below is a plot comparing this metric across all algorithms.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetricOverview;
