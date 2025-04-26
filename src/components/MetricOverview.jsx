import React from "react";
import metricDescriptions from "../data/metricDescriptions";

const MetricOverview = ({ metric }) => {
  const description =
    metricDescriptions[metric] || "No description available for this metric.";

  return (
    <div className="px-2 mx-4 overflow-x-auto space-y-3">
      <h1 className="font-radio text-indigo-400 font-semibold">
        Overview for metric: {metric}
      </h1>
      <p className="font-radio text-[0.9375rem]">{description}</p>
    </div>
  );
};

export default MetricOverview;
