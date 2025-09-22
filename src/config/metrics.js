/**
 * Metrics Configuration
 *
 * To add a new metric, add an entry to the METRICS array with the required properties.
 *
 * Format:
 * - key: unique identifier
 * - label: display name
 * - description: detailed explanation of what the metric measures
 * - sortable: whether this metric can be sorted in tables
 * - unit: optional unit of measurement
 * - lowerIsBetter: whether lower values are better
 * - precision: decimal places
 */

export const METRICS = [
  {
    key: "Elo",
    label: "ELO",
    description:
      "An ELO-style ranking score derived from community-based pairwise comparisons of susceptibility maps. Higher scores reflect better perceived quality.",
    sortable: true,
    lowerIsBetter: false,
    precision: 3,
  },
  {
    key: "RMSE",
    label: "RMSE",
    description:
      "Root Mean Squared Error between the reconstructed susceptibility map and the ground truth. Lower values indicate better overall accuracy.",
    sortable: true,
    lowerIsBetter: true,
    precision: 3,
  },
  {
    key: "NRMSE",
    label: "NRMSE",
    description:
      "Normalized Root Mean Squared Error, adjusting RMSE relative to the magnitude of the ground truth. Useful for comparing across different scales.",
    sortable: true,
    lowerIsBetter: true,
    precision: 3,
  },
  {
    key: "HFEN",
    label: "HFEN",
    description:
      "High Frequency Error Norm. Captures differences in fine structural details between reconstruction and ground truth, emphasizing sharpness and edge preservation.",
    sortable: true,
    lowerIsBetter: true,
    precision: 3,
  },
  {
    key: "MAD",
    label: "MAD",
    description:
      "Mean Absolute Difference between the reconstructed and true susceptibility values. A lower MAD indicates better reconstruction fidelity.",
    sortable: true,
    lowerIsBetter: true,
    precision: 3,
  },
  {
    key: "XSIM",
    label: "XSIM",
    description:
      "Extended Structural SIMilarity index. Measures structural similarity, tuned for QSM to evaluate perceptual quality of reconstructions.",
    sortable: true,
    lowerIsBetter: false,
    precision: 3,
  },
  {
    key: "CC1",
    label: "CC1",
    description:
      "Pearson Correlation Coefficient between the reconstructed and ground truth susceptibility values within the brain mask.",
    sortable: true,
    lowerIsBetter: false,
    precision: 3,
  },
  {
    key: "CC2",
    label: "CC2",
    description:
      "Pearson Correlation Coefficient focusing on susceptibility variations within regions of interest (ROIs), complementing CC1.",
    sortable: true,
    lowerIsBetter: false,
    precision: 3,
  },
  {
    key: "NMI",
    label: "NMI",
    description:
      "Normalized Mutual Information between the reconstruction and ground truth, quantifying shared information independent of intensity scaling.",
    sortable: true,
    lowerIsBetter: false,
    precision: 3,
  },
  {
    key: "GXE",
    label: "GXE",
    description:
      "Gradient-domain RMSE (GXE). Measures RMSE of the spatial gradients between reconstructed and ground truth maps, emphasizing preservation of fine gradient features.",
    sortable: true,
    lowerIsBetter: true,
    precision: 3,
  },
  // Add new metrics here following the same pattern
  // {
  //   key: 'NEW_METRIC',
  //   label: 'New Metric',
  //   description: 'Description of what this metric measures.',
  //   sortable: true,
  //   lowerIsBetter: true,
  //   precision: 3,
  //   unit: 'optional unit'
  // },
];

export const getMetricKeys = () => METRICS.map((metric) => metric.key);

export const getSortableMetrics = () =>
  METRICS.filter((metric) => metric.sortable);

export const getMetricConfig = (key) =>
  METRICS.find((metric) => metric.key === key);

export const formatMetricValue = (key, value) => {
  if (typeof value !== "number" || isNaN(value)) return "N/A";

  const config = getMetricConfig(key);
  const precision = config?.precision ?? 3;
  const unit = config?.unit ?? "";

  return `${value.toFixed(precision)}${unit}`;
};

export const getMetricDescription = (key) => {
  const config = getMetricConfig(key);
  return config?.description ?? "No description available for this metric.";
};

export const createTableHeaders = () => {
  const headers = [{ key: "name", label: "ALGORITHM", sortable: false }];

  METRICS.forEach((metric) => {
    headers.push({
      key: metric.key,
      label: metric.label,
      sortable: metric.sortable,
    });
  });

  return headers;
};

// old - i think this is unused
export const getMetricDescriptions = () => {
  const descriptions = {};
  METRICS.forEach((metric) => {
    descriptions[metric.key] = metric.description;
  });
  return descriptions;
};
