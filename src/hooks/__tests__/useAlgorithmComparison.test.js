import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useAlgorithmComparison from "../useAlgorithmComparison";

describe("useAlgorithmComparison", () => {
  const mockData = [
    { id: 1, name: "Algorithm 1" },
    { id: 2, name: "Algorithm 2" },
    { id: 3, name: "Algorithm 3" },
    { id: 4, name: "Algorithm 4" },
    { id: 5, name: "Algorithm 5" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with empty state when no data is provided", () => {
    const { result } = renderHook(() => useAlgorithmComparison(null));

    expect(result.current.currentPair).toEqual([]);
    expect(result.current.selectedAlgorithm).toBeNull();
    expect(result.current.showNames).toBe(false);
  });

  it("should initialize with empty state when data has less than 2 items", () => {
    const { result } = renderHook(() => useAlgorithmComparison([{ id: 1 }]));

    expect(result.current.currentPair).toEqual([]);
    expect(result.current.selectedAlgorithm).toBeNull();
    expect(result.current.showNames).toBe(false);
  });

  it("should generate initial pair when data has 2 or more items", () => {
    const { result } = renderHook(() => useAlgorithmComparison(mockData));

    expect(result.current.currentPair).toHaveLength(2);
    expect(mockData).toContain(result.current.currentPair[0]);
    expect(mockData).toContain(result.current.currentPair[1]);
    expect(result.current.currentPair[0]).not.toEqual(
      result.current.currentPair[1]
    );
  });

  it("should generate new pair when handleNext is called", () => {
    const { result } = renderHook(() => useAlgorithmComparison(mockData));

    const initialPair = [...result.current.currentPair];

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentPair).toHaveLength(2);
    expect(result.current.currentPair).not.toEqual(initialPair);
    expect(result.current.selectedAlgorithm).toBeNull();
    expect(result.current.showNames).toBe(false);
  });

  it("should handle algorithm selection correctly", () => {
    const { result } = renderHook(() => useAlgorithmComparison(mockData));

    const selectedAlgorithm = result.current.currentPair[0];

    act(() => {
      result.current.handleSelect(selectedAlgorithm);
    });

    expect(result.current.selectedAlgorithm).toEqual(selectedAlgorithm);
    expect(result.current.showNames).toBe(true);
  });

  it("should reset selection state when generating new pair", () => {
    const { result } = renderHook(() => useAlgorithmComparison(mockData));

    act(() => {
      result.current.handleSelect(result.current.currentPair[0]);
    });

    expect(result.current.selectedAlgorithm).toBeTruthy();
    expect(result.current.showNames).toBe(true);

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.selectedAlgorithm).toBeNull();
    expect(result.current.showNames).toBe(false);
  });

  it("should avoid generating the same pair twice in a row", () => {
    const { result } = renderHook(() => useAlgorithmComparison(mockData));

    const firstPair = [...result.current.currentPair];

    act(() => {
      result.current.handleNext();
    });

    const secondPair = [...result.current.currentPair];

    expect(firstPair).not.toEqual(secondPair);
  });

  it("should reset used indices when running out of combinations", () => {
    const smallData = [
      { id: 1, name: "Algorithm 1" },
      { id: 2, name: "Algorithm 2" },
    ];

    const { result } = renderHook(() => useAlgorithmComparison(smallData));

    for (let i = 0; i < 3; i++) {
      act(() => {
        result.current.handleNext();
      });
    }

    expect(result.current.currentPair).toHaveLength(2);
  });

  it("should handle edge case with exactly 2 items", () => {
    const twoItems = [
      { id: 1, name: "Algorithm 1" },
      { id: 2, name: "Algorithm 2" },
    ];

    const { result } = renderHook(() => useAlgorithmComparison(twoItems));

    expect(result.current.currentPair).toHaveLength(2);
    expect(result.current.currentPair).toContain(twoItems[0]);
    expect(result.current.currentPair).toContain(twoItems[1]);
  });
});
