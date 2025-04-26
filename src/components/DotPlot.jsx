import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DotPlot = ({ data, metric }) => {
  if (!data || !metric) return null;

  const chartData = data.map((algorithm) => ({
    x: algorithm.name,
    y: algorithm[metric] || 0,
    metricName: metric,
  }));

  return (
    <div className="bg-white p-6 mx-6 rounded-2xl shadow-lg border border-indigo-100">
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#c7d2fe" />
            <XAxis
              dataKey="x"
              type="category"
              name="Algorithm"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12, fill: "#1c1917" }}
              axisLine={{ stroke: "#1c1917" }}
              tickLine={{ stroke: "#1c1917" }}
            />
            <YAxis
              dataKey="y"
              name={metric}
              label={{
                value: metric,
                angle: -90,
                position: "insideLeft",
                fontSize: 14,
                fill: "#1c1917",
              }}
              tick={{ fontSize: 12, fill: "#1c1917" }}
              axisLine={{ stroke: "#1c1917" }}
              tickLine={{ stroke: "#1c1917" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              name={metric}
              data={chartData}
              fill="#818cf8"
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
      <div className="bg-white border border-indigo-200 shadow-md rounded-lg p-3 text-sm">
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
