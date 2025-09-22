/**
 * Tests for useNiivueViewer Hook
 */

import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useNiivueViewer from "../useNiivueViewer";

// Mock Niivue
vi.mock("@niivue/niivue", () => ({
  Niivue: vi.fn(() => ({
    attachToCanvas: vi.fn(),
    loadVolumes: vi.fn(() => Promise.resolve()),
    setSliceType: vi.fn(),
    sliceTypeMultiplanar: "multiplanar",
    volumes: [{ cal_min: -0.1, cal_max: 0.1 }],
    updateGLVolume: vi.fn(),
    destroy: vi.fn(),
  })),
}));

describe("useNiivueViewer", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useNiivueViewer("test-image.nii"));

    expect(result.current.canvasRef).toBeDefined();
    expect(result.current.windowMin).toBeNull();
    expect(result.current.windowMax).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
  });

  it("should provide required functions", () => {
    const { result } = renderHook(() => useNiivueViewer("test-image.nii"));

    expect(typeof result.current.resetSettings).toBe("function");
    expect(typeof result.current.applyWindow).toBe("function");
    expect(typeof result.current.setWindowMin).toBe("function");
    expect(typeof result.current.setWindowMax).toBe("function");
  });

  it("should handle image changes", () => {
    const { result, rerender } = renderHook(
      ({ image }) => useNiivueViewer(image),
      { initialProps: { image: "image1.nii" } }
    );

    expect(result.current.isLoading).toBe(true);

    // Change image
    rerender({ image: "image2.nii" });
    expect(result.current.isLoading).toBe(true);
  });
});
