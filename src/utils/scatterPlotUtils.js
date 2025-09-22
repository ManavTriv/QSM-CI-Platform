export const SCATTER_PLOT_COLORS = [
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

export const calculateAxisConfig = (values, axisName) => {
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

  const showZeroLine = (min < 0 && max > 0) || (min >= 0 && min < range * 0.1);

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

export const processScatterPlotData = (
  data,
  xAxis,
  yAxis,
  groupBy,
  getAlgorithmProcessedTags
) => {
  if (!data || !Array.isArray(data))
    return { chartData: [], groups: [], axisConfig: {} };

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
        groupValue = `${groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}: ${
          grouped[groupBy][0].value
        }`;
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
        color:
          SCATTER_PLOT_COLORS[
            Object.keys(groupedData).length % SCATTER_PLOT_COLORS.length
          ],
      };
    }
    groupedData[groupKey].data.push(processedItem);
  });

  const xConfig = calculateAxisConfig(xValues, xAxis);
  const yConfig = calculateAxisConfig(yValues, yAxis);

  return {
    chartData: processedItems,
    groups: Object.values(groupedData),
    axisConfig: { x: xConfig, y: yConfig },
  };
};
