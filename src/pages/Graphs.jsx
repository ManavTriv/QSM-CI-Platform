import { useState } from "react";
import Navbar from "../components/Navbar";
import GraphsMessage from "../components/GraphsMessage";
import ScatterPlot from "../components/ScatterPlot";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const GraphsContent = () => {
  const { data, error, loading } = useProcessedData();
  const [xAxis, setXAxis] = useState("RMSE");
  const [yAxis, setYAxis] = useState("HFEN");
  const [groupBy, setGroupBy] = useState("none");

  if (error) return <ErrorMessage message="Error loading data" />;
  if (loading)
    return (
      <LoadingSpinner
        message="Loading graph data"
        description="Preparing algorithm metrics for visualization..."
      />
    );

  return (
    <>
      <GraphsMessage />
      <ScatterPlot
        data={data}
        xAxis={xAxis}
        yAxis={yAxis}
        groupBy={groupBy}
        onXAxisChange={setXAxis}
        onYAxisChange={setYAxis}
        onGroupByChange={setGroupBy}
      />
    </>
  );
};

const Graphs = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <GraphsContent />
        </div>
      </div>
    </div>
  );
};

export default Graphs;
