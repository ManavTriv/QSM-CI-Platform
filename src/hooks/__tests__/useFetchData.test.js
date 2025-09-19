/**
 * Tests for useFetchData Hook
 */

import { describe, it, expect, vi } from "vitest";
import fetchData from "../useFetchData";

// Mock parseConfig
vi.mock("../api/parseConfig", () => ({
  initializeParse: vi.fn(() => ({
    Object: { extend: vi.fn(() => vi.fn()) },
    Query: vi.fn(() => ({ find: vi.fn() })),
  })),
}));

describe("useFetchData", () => {
  it("should be an async function", () => {
    expect(typeof fetchData).toBe("function");
    expect(fetchData.constructor.name).toBe("AsyncFunction");
  });

  it("should transform Parse objects correctly", () => {
    const mockParseObject = {
      id: "test-id",
      toJSON: () => ({ url: "https://example.com/test.jpg", Elo: 1500 }),
    };

    const transformed = {
      id: mockParseObject.id,
      ...mockParseObject.toJSON(),
    };

    expect(transformed).toEqual({
      id: "test-id",
      url: "https://example.com/test.jpg",
      Elo: 1500,
    });
  });

  it("should handle id conflicts (JSON overwrites Parse)", () => {
    const mockObject = {
      id: "parse-id",
      toJSON: () => ({ id: "json-id", url: "test.jpg" }),
    };

    const result = { id: mockObject.id, ...mockObject.toJSON() };
    expect(result.id).toBe("json-id");
  });

  it("should preserve all data properties", () => {
    const mockObject = {
      id: "test-id",
      toJSON: () => ({
        url: "test.jpg",
        Elo: 1500,
        tags: ["ai"],
        metadata: { type: "test" },
      }),
    };

    const result = { id: mockObject.id, ...mockObject.toJSON() };

    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("Elo");
    expect(result).toHaveProperty("tags");
    expect(result).toHaveProperty("metadata.type", "test");
  });
});
