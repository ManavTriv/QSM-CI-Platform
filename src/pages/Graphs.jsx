import { useState } from "react";
import GraphsMessage from "../components/GraphsMessage";
import ScatterPlot from "../components/ScatterPlot";
import PageWithState from "../components/Layout/PageWithState";

const Graphs = () => {
  const [xAxis, setXAxis] = useState("RMSE");
  const [yAxis, setYAxis] = useState("HFEN");
  const [groupBy, setGroupBy] = useState("none");

  return (
    <PageWithState
      loadingMessage="Loading graph data"
      loadingDescription="Preparing algorithm metrics for visualization..."
    >
      {(data) => (
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
      )}
    </PageWithState>
  );
};

export default Graphs;
