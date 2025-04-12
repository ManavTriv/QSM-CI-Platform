import React from "react";
import { useLocation } from "react-router-dom";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import NavigateButton from "./NavigateButton";

const DotPlot = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const metric = searchParams.get("metric");
  const { data, error, loading } = useProcessedData();

  if (error) return <ErrorMessage message={"Error loading data"} />;
  if (loading) return <LoadingMessage />;
  if (!metric) return <ErrorMessage message={"No metric selected"} />;

  const chartData = data.map((algorithm) => ({
    x: algorithm.name,
    y: algorithm[metric] || 0,
    metricName: metric,
  }));

  return (
    <div className="mx-4 space-y-5">
      <NavigateButton />
      <p className="text-stone-800 text-sm">
        <span className="font-semibold text-indigo-600">{metric}</span>{" "}
        represents ..... metric description
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-100">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis
                dataKey="x"
                type="category"
                name="Algorithm"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12, fill: "#1c1917" }} // stone-800
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
                fill="#6366f1"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DotPlot;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const { x: algorithmName, y: metricValue, metricName } = dataPoint;

    return (
      <div className="bg-white border border-indigo-200 shadow-md rounded-md p-3 text-sm">
        <p className="text-stone-800 font-semibold">{algorithmName}</p>
        <p className="text-stone-800">
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
