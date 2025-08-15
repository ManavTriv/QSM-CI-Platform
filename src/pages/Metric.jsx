import React, { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavigateButton from "../components/NavigateButton";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import MetricOverview from "../components/MetricOverview";
import { BarChart } from "lucide-react";

// Lazy load heavy chart component (lowers npm bundle size)
const DotPlot = lazy(() => import("../components/DotPlot"));

const MetricContent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const metric = searchParams.get("metric");
  const { data, error, loading } = useProcessedData();

  if (error) return <ErrorMessage message={"Error loading data"} />;
  if (loading) return <LoadingMessage />;
  if (!metric) return <ErrorMessage message={"No metric selected"} />;

  return (
    <div className="space-y-5">
      <div className="px-2 mx-4">
        <NavigateButton to="/overview" label="OVERVIEW" icon={BarChart} />
      </div>
      <MetricOverview metric={metric} />
      <Suspense fallback={<LoadingMessage />}>
        <DotPlot data={data} metric={metric} />
      </Suspense>
    </div>
  );
};

const Metric = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
      <Navbar />
      <MetricContent />
    </div>
  );
};

export default Metric;
