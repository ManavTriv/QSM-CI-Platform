import { describe, it, expect } from "vitest";
import {
  METRICS,
  getMetricKeys,
  getMetricDescriptions,
  formatMetricValue,
} from "../metrics";

describe("metrics config", () => {
  it("should export METRICS array", () => {
    expect(Array.isArray(METRICS)).toBe(true);
    expect(METRICS.length).toBeGreaterThan(0);
  });

  it("should have valid metric structure", () => {
    METRICS.forEach((metric) => {
      expect(metric).toHaveProperty("key");
      expect(metric).toHaveProperty("label");
      expect(metric).toHaveProperty("description");
      expect(typeof metric.key).toBe("string");
      expect(typeof metric.label).toBe("string");
    });
  });

  it("should return metric keys", () => {
    const keys = getMetricKeys();
    expect(Array.isArray(keys)).toBe(true);
    expect(keys.length).toBe(METRICS.length);
  });

  it("should return metric descriptions", () => {
    const descriptions = getMetricDescriptions();
    expect(typeof descriptions).toBe("object");
    expect(Object.keys(descriptions).length).toBe(METRICS.length);
  });

  it("should format metric values", () => {
    expect(formatMetricValue("RMSE", 1.23456)).toBe("1.235");
    expect(formatMetricValue("HFEN", 1.23456)).toBe("1.235");
    expect(formatMetricValue("RMSE", "invalid")).toBe("N/A");
  });
});
