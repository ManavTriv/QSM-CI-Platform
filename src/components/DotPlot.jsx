import React, { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatMetricName = (name) =>
  name.replace(/[_-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const DotPlot = ({ data, metric }) => {
  const chartData = useMemo(() => {
    if (!data || !metric || data.length === 0) return [];
    return data.map((algorithm) => ({
      x: algorithm.name,
      y: algorithm[metric] ?? 0,
      metricName: formatMetricName(metric),
    }));
  }, [data, metric]);

  if (chartData.length === 0) {
    return (
      <div className="bg-white px-6 py-8 rounded-2xl shadow-md border border-indigo-100 font-radio">
        <div className="text-center text-stone-500 py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-indigo-50 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2">No Chart Data Available</p>
          <p className="text-sm">
            Unable to generate visualization for this metric.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-6 py-8 rounded-2xl shadow-md border border-indigo-100 font-radio">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-800 mb-1">
            {formatMetricName(metric)} Distribution
          </h2>
          <p className="text-sm text-stone-600">
            Performance comparison across {chartData.length} algorithms
          </p>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-xs text-stone-500">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
            Algorithm Score
          </div>
        </div>
      </div>

      <div className="h-[28rem] w-full bg-gray-50 rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 40, bottom: 80 }}>
            <CartesianGrid
              strokeDasharray="2 2"
              stroke="#e2e8f0"
              opacity={0.5}
            />
            <XAxis
              dataKey="x"
              type="category"
              name="Algorithm"
              angle={-45}
              textAnchor="end"
              height={90}
              tick={{
                fontSize: 11,
                fill: "#475569",
                fontFamily: "Radio Canada",
              }}
              axisLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
              tickLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
            />
            <YAxis
              dataKey="y"
              name={metric}
              label={{
                value: formatMetricName(metric),
                angle: -90,
                position: "insideLeft",
                fontSize: 13,
                fill: "#334155",
                fontFamily: "Radio Canada",
                fontWeight: 500,
              }}
              tick={{
                fontSize: 11,
                fill: "#475569",
                fontFamily: "Radio Canada",
              }}
              axisLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
              tickLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              name={metric}
              data={chartData}
              fill="#6366f1"
              shape="circle"
              r={6}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DotPlot;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { x: algorithmName, y: metricValue, metricName } = payload[0].payload;
    return (
      <div className="bg-white border border-indigo-200 shadow-lg rounded-lg p-4 text-sm font-radio max-w-64">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
          <p className="text-stone-800 font-semibold text-base">
            {algorithmName}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-stone-600 text-xs uppercase tracking-wide">
            {metricName}
          </p>
          <p className="text-stone-800 font-bold text-lg">
            {typeof metricValue === "number"
              ? metricValue.toFixed(3)
              : metricValue}
          </p>
        </div>
      </div>
    );
  }
  return null;
};
