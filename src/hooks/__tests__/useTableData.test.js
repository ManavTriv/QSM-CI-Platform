/**
 * Tests for useTableData Hook
 */

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useTableData from "../useTableData";

describe("useTableData", () => {
  const mockData = [
    { id: "1", name: "ALGORITHM ONE", Elo: 1500, tags: ["ai"] },
    { id: "2", name: "ALGORITHM TWO", Elo: 1600, tags: ["ml"] },
    { id: "3", name: "DEEP LEARNING", Elo: 1400, tags: ["ai", "deep"] },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useTableData(mockData));

    expect(result.current.sortConfig).toEqual({ key: null, direction: null });
    expect(result.current.searchTerm).toBe("");
    expect(result.current.selectedTags).toEqual([]);
    expect(result.current.sortedData).toEqual(mockData);
  });

  it("should filter by search term and tags", () => {
    const { result } = renderHook(() => useTableData(mockData));

    // Test search filtering
    act(() => result.current.setSearchTerm("deep"));
    expect(result.current.sortedData).toHaveLength(1);
    expect(result.current.sortedData[0].name).toBe("DEEP LEARNING");

    // Test tag filtering
    act(() => {
      result.current.setSearchTerm("");
      result.current.setSelectedTags(["ai"]);
    });
    expect(result.current.sortedData).toHaveLength(2);
  });

  it("should sort data", () => {
    const { result } = renderHook(() => useTableData(mockData));

    act(() => {
      result.current.requestSort("Elo");
    });

    expect(result.current.sortConfig.key).toBe("Elo");
    expect(result.current.sortConfig.direction).toBe("high-to-low");
    expect(result.current.sortedData[0].Elo).toBe(1600);
  });

  it("should toggle sort direction", async () => {
    const { result } = renderHook(() => useTableData(mockData));

    act(() => {
      result.current.requestSort("Elo");
    });

    // should timeout here
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    act(() => {
      result.current.requestSort("Elo");
    });

    expect(result.current.sortConfig.direction).toBe("low-to-high");
    expect(result.current.sortedData[0].Elo).toBe(1400);
  });

  it("should clear filters", () => {
    const { result } = renderHook(() => useTableData(mockData));

    act(() => {
      result.current.setSearchTerm("test");
      result.current.setSelectedTags(["ai"]);
    });

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.searchTerm).toBe("");
    expect(result.current.selectedTags).toEqual([]);
  });

  it("should handle empty data", () => {
    const { result } = renderHook(() => useTableData([]));

    expect(result.current.sortedData).toEqual([]);
  });
});
