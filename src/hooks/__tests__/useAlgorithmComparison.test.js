import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useAlgorithmComparison from "../useAlgorithmComparison";

describe("useAlgorithmComparison", () => {
  const mockData = [
    { id: 1, name: "Algorithm 1" },
    { id: 2, name: "Algorithm 2" },
    { id: 3, name: "Algorithm 3" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with empty state when no data", () => {
    const { result } = renderHook(() => useAlgorithmComparison(null));

    expect(result.current.currentPair).toEqual([]);
    expect(result.current.selectedAlgorithm).toBeNull();
    expect(result.current.showNames).toBe(false);
  });

  it("should generate initial pair with valid data", () => {
    const { result } = renderHook(() => useAlgorithmComparison(mockData));

    expect(result.current.currentPair).toHaveLength(2);
    expect(result.current.currentPair[0]).not.toEqual(
      result.current.currentPair[1]
    );
  });

  it("should handle algorithm selection", () => {
    const { result } = renderHook(() => useAlgorithmComparison(mockData));
    const selectedAlgorithm = result.current.currentPair[0];

    act(() => {
      result.current.handleSelect(selectedAlgorithm);
    });

    expect(result.current.selectedAlgorithm).toEqual(selectedAlgorithm);
    expect(result.current.showNames).toBe(true);
  });

  it("should generate new pair and reset selection", () => {
    const { result } = renderHook(() => useAlgorithmComparison(mockData));

    act(() => {
      result.current.handleSelect(result.current.currentPair[0]);
    });

    const initialPair = [...result.current.currentPair];

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentPair).toHaveLength(2);
    expect(result.current.currentPair).not.toEqual(initialPair);
    expect(result.current.selectedAlgorithm).toBeNull();
    expect(result.current.showNames).toBe(false);
  });
});
