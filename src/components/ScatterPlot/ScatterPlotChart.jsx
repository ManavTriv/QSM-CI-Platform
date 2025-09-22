import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import useProcessedTags from "../../hooks/useProcessedTags";
import ScatterPlotTooltip from "./ScatterPlotTooltip";
import ScatterPlotLegend from "./ScatterPlotLegend";
import { processScatterPlotData } from "../../utils/scatterPlotUtils";

const ScatterPlotChart = ({
  data,
  xAxis,
  yAxis,
  groupBy,
  hoveredPoint,
  onHover,
  allProcessedTags,
}) => {
  const { getAlgorithmProcessedTags } = useProcessedTags([], data);

  const { chartData, groups, axisConfig } = useMemo(() => {
    return processScatterPlotData(
      data,
      xAxis,
      yAxis,
      groupBy,
      getAlgorithmProcessedTags
    );
  }, [data, xAxis, yAxis, groupBy, getAlgorithmProcessedTags]);

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 60,
              left: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              type="number"
              dataKey="x"
              name={xAxis}
              domain={axisConfig.x?.domain || ["auto", "auto"]}
              axisLine={{ stroke: "#374151", strokeWidth: 1 }}
              tickLine={{ stroke: "#6b7280" }}
              tick={{
                fill: "#6b7280",
                fontSize: 11,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              tickFormatter={(value) =>
                typeof value === "number" ? value.toFixed(3) : value
              }
              label={{
                value: xAxis,
                position: "insideBottom",
                offset: -10,
                style: {
                  textAnchor: "middle",
                  fill: "#374151",
                  fontWeight: 600,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                },
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yAxis}
              domain={axisConfig.y?.domain || ["auto", "auto"]}
              axisLine={{ stroke: "#374151", strokeWidth: 1 }}
              tickLine={{ stroke: "#6b7280" }}
              tick={{
                fill: "#6b7280",
                fontSize: 11,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              tickFormatter={(value) =>
                typeof value === "number" ? value.toFixed(3) : value
              }
              label={{
                value: yAxis,
                angle: -90,
                position: "insideLeft",
                style: {
                  textAnchor: "middle",
                  fill: "#374151",
                  fontWeight: 600,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                },
              }}
            />

            {axisConfig.x?.showZeroLine && (
              <ReferenceLine
                x={0}
                stroke="#6b7280"
                strokeDasharray="2 2"
                opacity={0.5}
              />
            )}
            {axisConfig.y?.showZeroLine && (
              <ReferenceLine
                y={0}
                stroke="#6b7280"
                strokeDasharray="2 2"
                opacity={0.5}
              />
            )}
            <Tooltip
              content={
                <ScatterPlotTooltip
                  xAxis={xAxis}
                  yAxis={yAxis}
                  groupBy={groupBy}
                />
              }
            />

            {groups.map((group, index) => (
              <Scatter
                key={group.name}
                name={group.name}
                data={group.data}
                fill={group.color}
                stroke="white"
                strokeWidth={1}
                r={5}
                opacity={0.85}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <ScatterPlotLegend groups={groups} />
    </div>
  );
};

export default ScatterPlotChart;
