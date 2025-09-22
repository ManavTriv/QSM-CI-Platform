import { describe, it, expect } from "vitest";
import {
  SCATTER_PLOT_COLORS,
  calculateAxisConfig,
  processScatterPlotData,
} from "../scatterPlotUtils";

describe("scatterPlotUtils", () => {
  describe("calculateAxisConfig", () => {
    it("should handle empty values", () => {
      const result = calculateAxisConfig([]);
      expect(result.domain).toEqual(["auto", "auto"]);
      expect(result.showZeroLine).toBe(false);
    });

    it("should calculate domain for normal range", () => {
      const result = calculateAxisConfig([1, 2, 3, 4, 5]);
      expect(result.domain).toHaveLength(2);
      expect(typeof result.showZeroLine).toBe("boolean");
    });

    it("should handle very small ranges", () => {
      const result = calculateAxisConfig([1.0001, 1.0002]);
      expect(result.domain).toHaveLength(2);
      expect(result.domain[1]).toBeGreaterThan(result.domain[0]);
    });
  });

  describe("processScatterPlotData", () => {
    const mockData = [
      { name: "Algo1", RMSE: 0.1, HFEN: 0.2, tags: ["type::ML"] },
      { name: "Algo2", RMSE: 0.15, HFEN: 0.25, tags: ["type::Traditional"] },
    ];

    const mockGetTags = () => ({
      grouped: { type: [{ value: "ML" }] },
      ungrouped: [],
    });

    it("should handle empty data", () => {
      const result = processScatterPlotData(
        [],
        "RMSE",
        "HFEN",
        "none",
        mockGetTags
      );
      expect(result.chartData).toEqual([]);
      expect(result.groups).toEqual([]);
    });

    it("should process valid data", () => {
      const result = processScatterPlotData(
        mockData,
        "RMSE",
        "HFEN",
        "none",
        mockGetTags
      );
      expect(result.chartData).toHaveLength(2);
      expect(result.groups).toHaveLength(1);
      expect(result.axisConfig).toHaveProperty("x");
      expect(result.axisConfig).toHaveProperty("y");
    });

    it("should filter invalid data points", () => {
      const invalidData = [
        { name: "Valid", RMSE: 0.1, HFEN: 0.2 },
        { name: "Invalid1", RMSE: "invalid", HFEN: 0.2 },
        { name: "Invalid2", RMSE: 0.1, HFEN: null },
      ];

      const result = processScatterPlotData(
        invalidData,
        "RMSE",
        "HFEN",
        "none",
        mockGetTags
      );
      expect(result.chartData).toHaveLength(1);
      expect(result.chartData[0].name).toBe("Valid");
    });
  });
});
