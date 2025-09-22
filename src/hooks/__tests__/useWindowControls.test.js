/**
 * Tests for useWindowControls Hook
 */

import { describe, it, expect, vi } from "vitest";
import useWindowControls from "../useWindowControls";

describe("useWindowControls", () => {
  const mockSetWindowMin = vi.fn();
  const mockSetWindowMax = vi.fn();
  const mockOnWindowChange = vi.fn();

  it("should return required properties", () => {
    const result = useWindowControls(
      -0.1,
      mockSetWindowMin,
      0.1,
      mockSetWindowMax,
      mockOnWindowChange
    );

    expect(result).toHaveProperty("sliderMin");
    expect(result).toHaveProperty("sliderMax");
    expect(result).toHaveProperty("step");
    expect(result).toHaveProperty("formatNumber");
    expect(result).toHaveProperty("handleSliderChange");
    expect(result).toHaveProperty("handleSliderCommit");
    expect(result).toHaveProperty("GLOBAL_MIN");
    expect(result).toHaveProperty("GLOBAL_MAX");
  });

  it("should provide handler functions", () => {
    const result = useWindowControls(
      -0.1,
      mockSetWindowMin,
      0.1,
      mockSetWindowMax,
      mockOnWindowChange
    );

    expect(typeof result.handleSliderChange).toBe("function");
    expect(typeof result.handleSliderCommit).toBe("function");
    expect(typeof result.handleMinInputChange).toBe("function");
    expect(typeof result.handleMaxInputChange).toBe("function");
  });

  it("should format numbers correctly", () => {
    const result = useWindowControls(
      -0.1,
      mockSetWindowMin,
      0.1,
      mockSetWindowMax,
      mockOnWindowChange
    );

    expect(result.formatNumber(0.12345)).toBe("0.123");
    expect(result.formatNumber(null)).toBe("");
    expect(result.formatNumber(undefined)).toBe("");
  });

  it("should have correct global bounds", () => {
    const result = useWindowControls(
      -0.1,
      mockSetWindowMin,
      0.1,
      mockSetWindowMax,
      mockOnWindowChange
    );

    expect(result.GLOBAL_MIN).toBe(-0.2);
    expect(result.GLOBAL_MAX).toBe(0.2);
  });
});
