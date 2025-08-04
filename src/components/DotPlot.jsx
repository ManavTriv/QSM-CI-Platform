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
  name.replace(/[_\-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const DotPlot = ({ data, metric }) => {
  if (!data || !metric || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12 font-radio">
        No data available to plot.
      </div>
    );
  }

  const chartData = useMemo(() => {
    return data.map((algorithm) => ({
      x: algorithm.name,
      y: algorithm[metric] ?? 0,
      metricName: formatMetricName(metric),
    }));
  }, [data, metric]);

  return (
    <div className="bg-white px-6 py-8 mx-4 md:mx-6 lg:mx-12 rounded-2xl shadow-lg border border-indigo-100 font-radio">
      <h2 className="text-xl font-semibold text-stone-800 mb-6">
        {formatMetricName(metric)} Distribution
      </h2>

      <div className="h-[24rem] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis
              dataKey="x"
              type="category"
              name="Algorithm"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12, fill: "#1c1917" }}
              axisLine={{ stroke: "#a5b4fc" }}
              tickLine={{ stroke: "#a5b4fc" }}
            />
            <YAxis
              dataKey="y"
              name={metric}
              label={{
                value: formatMetricName(metric),
                angle: -90,
                position: "insideLeft",
                fontSize: 14,
                fill: "#1c1917",
              }}
              tick={{ fontSize: 12, fill: "#1c1917" }}
              axisLine={{ stroke: "#a5b4fc" }}
              tickLine={{ stroke: "#a5b4fc" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              name={metric}
              data={chartData}
              fill="#6366f1"
              shape="circle"
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
      <div className="bg-white border border-indigo-200 shadow-md rounded-lg p-3 text-sm font-radio">
        <p className="text-stone-800 font-semibold">{algorithmName}</p>
        <p className="text-stone-700">
          {metricName}:{" "}
          {typeof metricValue === "number"
            ? metricValue.toFixed(3)
            : metricValue}
        </p>
      </div>
    );
  }
  return null;
};
