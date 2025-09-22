import { ChevronDown } from "lucide-react";

const ScatterPlotControls = ({ xAxis, yAxis, groupBy, availableMetrics, groupOptions, onXAxisChange, onYAxisChange, onGroupByChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-stone-700">
          X-Axis Metric
        </label>
        <div className="relative">
          <select
            value={xAxis}
            onChange={(e) => onXAxisChange(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-radio focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent cursor-pointer"
          >
            {availableMetrics.map((metric) => (
              <option key={metric} value={metric}>
                {metric}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-stone-700">
          Y-Axis Metric
        </label>
        <div className="relative">
          <select
            value={yAxis}
            onChange={(e) => onYAxisChange(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-radio focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent cursor-pointer"
          >
            {availableMetrics.map((metric) => (
              <option key={metric} value={metric}>
                {metric}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-stone-700">
          Group By
        </label>
        <div className="relative">
          <select
            value={groupBy}
            onChange={(e) => onGroupByChange(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-radio focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent cursor-pointer"
          >
            {groupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ScatterPlotControls;
