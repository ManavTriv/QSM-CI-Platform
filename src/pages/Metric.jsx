import React from "react";
import { useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import Navbar from "../components/Navbar";
import NavigateButton from "../components/NavigateButton";

const MetricContent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const metric = searchParams.get("metric");
  const { data, error, loading } = useProcessedData();

  if (error) return <ErrorMessage message={"Error loading data"} />;
  if (loading) return <LoadingMessage />;
  if (!metric) return <ErrorMessage message={"No metric selected"} />;

  const chartData = data.map((algorithm) => ({
    name: algorithm.name,
    [metric]: algorithm[metric] || 0,
  }));

  return (
    <div className="mx-4 space-y-5">
      <NavigateButton />
      <p>{metric} represents ..... metric description</p>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-100">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: metric,
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 14,
                }}
              />
              <Tooltip
                formatter={(value) => [value.toFixed(3), metric]}
                labelFormatter={(name) => `Algorithm: ${name}`}
              />
              <Legend />
              <Bar dataKey={metric} fill="#6366f1" name={metric} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Metric = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full space-y-3">
      <Navbar />
      <MetricContent />
    </div>
  );
};

export default Metric;