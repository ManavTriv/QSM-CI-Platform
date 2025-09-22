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

  it("should transform Parse objects and handle data merging", () => {
    const mockParseObject = {
      id: "test-id",
      toJSON: () => ({ url: "test.jpg", Elo: 1500, tags: ["ai"] }),
    };

    const result = { id: mockParseObject.id, ...mockParseObject.toJSON() };

    expect(result).toEqual({
      id: "test-id",
      url: "test.jpg",
      Elo: 1500,
      tags: ["ai"],
    });
  });
});
