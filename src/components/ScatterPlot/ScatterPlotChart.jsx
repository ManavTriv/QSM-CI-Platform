import { useMemo } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import useProcessedTags from "../../hooks/useProcessedTags";

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#F97316",
  "#06B6D4",
  "#84CC16",
  "#EC4899",
  "#6B7280",
];

const ScatterPlotChart = ({ data, xAxis, yAxis, groupBy, hoveredPoint, onHover, allProcessedTags }) => {
  const { getAlgorithmProcessedTags } = useProcessedTags([], data);

  const { chartData, groups, axisConfig } = useMemo(() => {
    if (!data || !Array.isArray(data)) return { chartData: [], groups: [], axisConfig: {} };

    const groupedData = {};
    const processedItems = [];
    const xValues = [];
    const yValues = [];

    data.forEach((item) => {
      if (
        typeof item[xAxis] !== "number" ||
        typeof item[yAxis] !== "number" ||
        isNaN(item[xAxis]) ||
        isNaN(item[yAxis])
      ) {
        return;
      }

      let groupValue = "All Algorithms";
      let groupKey = "all";

      if (groupBy !== "none") {
        const { grouped } = getAlgorithmProcessedTags(item.tags || []);
        if (grouped[groupBy] && grouped[groupBy].length > 0) {
          groupValue = `${
            groupBy.charAt(0).toUpperCase() + groupBy.slice(1)
          }: ${grouped[groupBy][0].value}`;
          groupKey = grouped[groupBy][0].value;
        } else {
          groupValue = `${
            groupBy.charAt(0).toUpperCase() + groupBy.slice(1)
          }: NA`;
          groupKey = "NA";
        }
      }

      const processedItem = {
        name: item.name,
        x: item[xAxis],
        y: item[yAxis],
        groupValue,
        groupKey,
        originalData: item,
      };

      processedItems.push(processedItem);
      xValues.push(item[xAxis]);
      yValues.push(item[yAxis]);

      if (!groupedData[groupKey]) {
        groupedData[groupKey] = {
          name: groupValue,
          data: [],
          color: COLORS[Object.keys(groupedData).length % COLORS.length],
        };
      }
      groupedData[groupKey].data.push(processedItem);
    });

    const calculateAxisConfig = (values, axisName) => {
      if (values.length === 0)
        return { domain: ["auto", "auto"], showZeroLine: false };

      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min;

      if (range < 0.001) {
        const center = (min + max) / 2;
        const padding = Math.abs(center) * 0.1 || 0.001;
        return {
          domain: [center - padding, center + padding],
          showZeroLine: center - padding < 0 && center + padding > 0,
        };
      }

      const showZeroLine =
        (min < 0 && max > 0) || (min >= 0 && min < range * 0.1);

      let domainMin, domainMax;

      if (showZeroLine && min >= 0) {
        domainMin = 0;
        domainMax = max + range * 0.05;
      } else if (showZeroLine && max <= 0) {
        domainMin = min - range * 0.05;
        domainMax = 0;
      } else if (showZeroLine) {
        domainMin = min - range * 0.05;
        domainMax = max + range * 0.05;
      } else {
        const padding = range * 0.05;
        domainMin = min - padding;
        domainMax = max + padding;
      }

      return {
        domain: [domainMin, domainMax],
        showZeroLine,
      };
    };

    const xConfig = calculateAxisConfig(xValues, xAxis);
    const yConfig = calculateAxisConfig(yValues, yAxis);

    return {
      chartData: processedItems,
      groups: Object.values(groupedData),
      axisConfig: { x: xConfig, y: yConfig },
    };
  }, [data, xAxis, yAxis, groupBy, getAlgorithmProcessedTags]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-indigo-200 rounded-lg shadow-lg p-3 max-w-xs">
          <div className="font-semibold text-sm mb-2 text-stone-800 font-radio">
            {data.name}
          </div>
          <div className="text-xs space-y-1 font-radio">
            <div className="text-stone-700">
              {xAxis}: <span className="font-medium">{data.x?.toFixed(3)}</span>
            </div>
            <div className="text-stone-700">
              {yAxis}: <span className="font-medium">{data.y?.toFixed(3)}</span>
            </div>
            {groupBy !== "none" && (
              <div className="pt-2 border-t border-indigo-100 text-stone-600">
                {data.groupValue}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

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
            <Tooltip content={<CustomTooltip />} />

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

      {groups.length > 1 && (
        <div className="flex flex-wrap gap-6 justify-center py-4 px-6 bg-gray-50 rounded-lg border border-gray-200">
          {groups.map((group, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: group.color }}
              />
              <span className="text-sm font-medium text-gray-700 font-radio">
                {group.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScatterPlotChart;
