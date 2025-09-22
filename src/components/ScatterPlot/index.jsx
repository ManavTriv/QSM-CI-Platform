import { useState, useMemo } from "react";
import { BarChart3, Settings2 } from "lucide-react";
import MessageCard from "../MessageCard";
import ScatterPlotControls from "./ScatterPlotControls";
import ScatterPlotChart from "./ScatterPlotChart";
import useProcessedTags from "../../hooks/useProcessedTags";
import { getMetricKeys } from "../../config/metrics";

const ScatterPlot = ({
  data,
  xAxis,
  yAxis,
  groupBy,
  onXAxisChange,
  onYAxisChange,
  onGroupByChange,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const { allProcessedTags } = useProcessedTags([], data);

  const availableMetrics = useMemo(() => {
    return getMetricKeys();
  }, []);

  const groupOptions = useMemo(() => {
    const options = [{ value: "none", label: "No Grouping" }];

    if (allProcessedTags?.grouped) {
      Object.keys(allProcessedTags.grouped).forEach((groupId) => {
        options.push({
          value: groupId,
          label: groupId.charAt(0).toUpperCase() + groupId.slice(1),
        });
      });
    }

    return options;
  }, [allProcessedTags]);

  return (
    <div className="space-y-6">
      <MessageCard
        icon={Settings2}
        title="Plot Configuration"
        subtitle="Customize your scatter plot visualization"
      >
        <ScatterPlotControls
          xAxis={xAxis}
          yAxis={yAxis}
          groupBy={groupBy}
          availableMetrics={availableMetrics}
          groupOptions={groupOptions}
          onXAxisChange={onXAxisChange}
          onYAxisChange={onYAxisChange}
          onGroupByChange={onGroupByChange}
        />
      </MessageCard>

      <MessageCard
        icon={BarChart3}
        title={`${yAxis} vs ${xAxis}`}
        subtitle={`Interactive scatter plot${
          groupBy !== "none" ? ` grouped by ${groupBy}` : ""
        }`}
      >
        <ScatterPlotChart
          data={data}
          xAxis={xAxis}
          yAxis={yAxis}
          groupBy={groupBy}
          hoveredPoint={hoveredPoint}
          onHover={setHoveredPoint}
          allProcessedTags={allProcessedTags}
        />
      </MessageCard>
    </div>
  );
};

export default ScatterPlot;
