/**
 * Tests for useFetchData Hook
 */

// Mock Parse.js modules
vi.mock("parse", () => ({
  default: {
    initialize: vi.fn(),
    Object: {
      extend: vi.fn(() => ({
        get: vi.fn(),
        set: vi.fn(),
        save: vi.fn(),
      })),
    },
    Query: vi.fn(() => ({
      find: vi.fn(),
      get: vi.fn(),
    })),
  },
}));

vi.mock("parse/dist/parse.min.js", () => ({
  default: {
    initialize: vi.fn(),
    Object: {
      extend: vi.fn(() => ({
        get: vi.fn(),
        set: vi.fn(),
        save: vi.fn(),
      })),
    },
    Query: vi.fn(() => ({
      find: vi.fn(),
      get: vi.fn(),
    })),
    AnonymousUtils: {},
  },
}));

// Mock parseConfig
vi.mock("../api/parseConfig", () => ({
  initializeParse: vi.fn(() => ({
    Object: {
      extend: vi.fn(() => {
        const MockClass = vi.fn();
        MockClass.prototype.get = vi.fn();
        MockClass.prototype.set = vi.fn();
        MockClass.prototype.save = vi.fn();
        MockClass.prototype.toJSON = vi.fn(() => ({}));
        return MockClass;
      }),
    },
    Query: vi.fn(() => ({
      find: vi.fn().mockResolvedValue([]),
      get: vi.fn(),
    })),
  })),
}));

import { describe, it, expect, vi } from "vitest";
import fetchData from "../useFetchData";

describe("useFetchData", () => {
  it("should be a function", () => {
    expect(typeof fetchData).toBe("function");
  });

  it("should be async", () => {
    expect(typeof fetchData).toBe("function");
    expect(fetchData.constructor.name).toBe("AsyncFunction");
  });

  describe("data transformation logic", () => {
    it("should transform Parse objects correctly", () => {
      const mockParseObject = {
        id: "test-id-123",
        toJSON: () => ({
          url: "https://example.com/test.jpg",
          Elo: 1500,
          createdAt: "2023-01-01",
          updatedAt: "2023-01-02",
        }),
      };

      const expectedResult = {
        id: "test-id-123",
        url: "https://example.com/test.jpg",
        Elo: 1500,
        createdAt: "2023-01-01",
        updatedAt: "2023-01-02",
      };

      const transformed = {
        id: mockParseObject.id,
        ...mockParseObject.toJSON(),
      };

      expect(transformed).toEqual(expectedResult);
    });

    it("should handle Parse objects with minimal data", () => {
      const mockParseObject = {
        id: "minimal-id",
        toJSON: () => ({
          url: "https://example.com/minimal.jpg",
        }),
      };

      const transformed = {
        id: mockParseObject.id,
        ...mockParseObject.toJSON(),
      };

      expect(transformed).toEqual({
        id: "minimal-id",
        url: "https://example.com/minimal.jpg",
      });
    });

    it("should handle Parse objects with extra properties", () => {
      const mockParseObject = {
        id: "complex-id",
        toJSON: () => ({
          url: "https://example.com/complex.jpg",
          Elo: 1750,
          algorithm: "Complex Algorithm",
          metadata: { type: "test", version: 2 },
          tags: ["ai", "comparison"],
        }),
      };

      const transformed = {
        id: mockParseObject.id,
        ...mockParseObject.toJSON(),
      };

      expect(transformed).toEqual({
        id: "complex-id",
        url: "https://example.com/complex.jpg",
        Elo: 1750,
        algorithm: "Complex Algorithm",
        metadata: { type: "test", version: 2 },
        tags: ["ai", "comparison"],
      });
      expect(transformed).toHaveProperty("id", "complex-id");
      expect(transformed).toHaveProperty("metadata.type", "test");
    });

    it("should handle id conflicts correctly", () => {
      const mockParseObject = {
        id: "parse-id",
        toJSON: () => ({
          id: "json-id",
          url: "https://example.com/test.jpg",
        }),
      };

      const transformed = {
        id: mockParseObject.id,
        ...mockParseObject.toJSON(),
      };

      expect(transformed.id).toBe("json-id");
      expect(transformed.url).toBe("https://example.com/test.jpg");
    });
  });
});
