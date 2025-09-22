import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useProcessedTags from "../useProcessedTags";

// Mock the utilities
vi.mock("../../utils/tagProcessingUtils", () => ({
  processRawTags: vi.fn((rawTags) => ({
    grouped: {},
    ungrouped: rawTags || [],
    all: rawTags || [],
  })),
  processAllAlgorithmTags: vi.fn((data) => ({
    grouped: { type: ["ML", "Traditional"] },
    ungrouped: ["ai"],
    all: ["type::ML", "type::Traditional", "ai"],
  })),
  createAlgorithmTagProcessor: vi.fn(() =>
    vi.fn(() => ({
      grouped: {
        type: [
          {
            original: "type::NA",
            group: "type",
            value: "NA",
            displayName: "NA",
          },
        ],
      },
      ungrouped: [],
    }))
  ),
}));

describe("useProcessedTags", () => {
  const mockData = [
    { id: "1", tags: ["type::Deep Learning", "ai"] },
    { id: "2", tags: ["type::Traditional"] },
  ];

  it("should return processed tags", () => {
    const { result } = renderHook(() => useProcessedTags(["ai"], mockData));

    expect(result.current.processedTags).toBeDefined();
    expect(result.current.allProcessedTags).toBeDefined();
    expect(typeof result.current.getAlgorithmProcessedTags).toBe("function");
  });

  it("should handle empty inputs", () => {
    const { result } = renderHook(() => useProcessedTags([], []));

    expect(result.current.processedTags).toBeDefined();
    expect(result.current.allProcessedTags).toBeDefined();
    expect(typeof result.current.getAlgorithmProcessedTags).toBe("function");
  });

  it("should provide algorithm tag processor", () => {
    const { result } = renderHook(() => useProcessedTags([], mockData));

    const processor = result.current.getAlgorithmProcessedTags;
    const processed = processor([]);

    expect(processed).toHaveProperty("grouped");
    expect(processed).toHaveProperty("ungrouped");
  });
});
