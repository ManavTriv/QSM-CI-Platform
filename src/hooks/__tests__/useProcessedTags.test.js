/**
 * Tests for useProcessedTags Hook
 */

import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useProcessedTags from "../useProcessedTags";

describe("useProcessedTags", () => {
  const mockData = [
    { id: "1", tags: ["type::Deep Learning", "ai", "computer-vision"] },
    { id: "2", tags: ["machine-learning"] },
    { id: "3", tags: ["type::Traditional", "ai"] },
    { id: "4", tags: [] },
  ];

  it("should process tags correctly", () => {
    const { result } = renderHook(() => useProcessedTags([], mockData));

    expect(result.current.allProcessedTags).toBeDefined();
    expect(result.current.allProcessedTags.grouped).toBeDefined();
    expect(result.current.allProcessedTags.ungrouped).toBeDefined();
    expect(result.current.allProcessedTags.all).toBeDefined();
  });

  it("should group tags by type", () => {
    const { result } = renderHook(() => useProcessedTags([], mockData));

    const groupedTags = result.current.allProcessedTags.grouped;
    expect(groupedTags.type).toBeDefined();
    expect(groupedTags.type.length).toBeGreaterThan(0);
  });

  it("should handle algorithms with no tags", () => {
    const { result } = renderHook(() => useProcessedTags([], mockData));

    const processedTags = result.current.getAlgorithmProcessedTags([]);
    expect(processedTags.grouped.type).toEqual([
      {
        original: "type::NA",
        group: "type",
        value: "NA",
        displayName: "NA",
      },
    ]);
  });

  it("should separate ungrouped tags", () => {
    const { result } = renderHook(() => useProcessedTags([], mockData));

    const ungroupedTags = result.current.allProcessedTags.ungrouped;
    expect(ungroupedTags).toContain("ai");
    expect(ungroupedTags).toContain("computer-vision");
    expect(ungroupedTags).toContain("machine-learning");
  });
});
