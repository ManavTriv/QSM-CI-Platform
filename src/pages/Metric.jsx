import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavigateButton from "../components/NavigateButton";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import MetricOverview from "../components/MetricOverview";
import { BarChart } from "lucide-react";

// Lazy load heavy chart component (lowers npm bundle size)
const DotPlot = lazy(() => import("../components/DotPlot"));

const MetricContent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const metric = searchParams.get("metric");
  const { data, error, loading } = useProcessedData();

  if (error) return <ErrorMessage message="Error loading data" />;
  if (loading)
    return (
      <LoadingSpinner
        message="Loading metric data"
        description="Fetching metric information..."
      />
    );
  if (!metric) return <ErrorMessage message="No metric selected" />;

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-8">
      <div>
        <NavigateButton to="/overview" label="OVERVIEW" icon={BarChart} />
      </div>
      <MetricOverview metric={metric} />
      <Suspense
        fallback={
          <LoadingSpinner
            message="Loading chart"
            description="Rendering visualization..."
          />
        }
      >
        <DotPlot data={data} metric={metric} />
      </Suspense>
    </div>
  );
};

const Metric = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="py-6">
        <MetricContent />
      </div>
    </div>
  );
};

export default Metric;
