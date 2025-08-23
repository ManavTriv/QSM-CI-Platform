/**
 * Tests for useProcessedData Hook
 */

// Mock useFetchData
vi.mock("../useFetchData", () => ({
  default: vi.fn(),
}));

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useProcessedData from "../useProcessedData";
import fetchData from "../useFetchData";

describe("useProcessedData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("URL processing and name extraction", () => {
    it("should extract algorithm name from URL correctly", async () => {
      const mockData = [
        {
          id: "test-1",
          url: "https://example.com/path/Algorithm_Name_Test.jpg",
          Elo: 1500,
        },
      ];

      fetchData.mockResolvedValue(mockData);

      const { result } = renderHook(() => useProcessedData());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toHaveLength(1);
      expect(result.current.data[0].name).toBe("ALGORITHM NAME TEST");
      expect(result.current.error).toBeNull();
    });

    it("should handle underscores and file extensions correctly", async () => {
      const mockData = [
        {
          id: "test-2",
          url: "https://example.com/deep_learning_model.png",
          Elo: 1600,
        },
      ];

      fetchData.mockResolvedValue(mockData);

      const { result } = renderHook(() => useProcessedData());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data[0].name).toBe("DEEP LEARNING MODEL");
    });

    it("should handle URL encoded characters", async () => {
      const mockData = [
        {
          id: "test-3",
          url: "https://example.com/Neural%20Network_Algorithm.jpeg",
          Elo: 1700,
        },
      ];

      fetchData.mockResolvedValue(mockData);

      const { result } = renderHook(() => useProcessedData());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data[0].name).toBe("NEURAL NETWORK ALGORITHM");
    });

    it("should handle complex file paths with multiple directories", async () => {
      const mockData = [
        {
          id: "test-4",
          url: "https://cdn.example.com/v2/algorithms/computer_vision/object_detection_yolo.webp",
          Elo: 1800,
        },
      ];

      fetchData.mockResolvedValue(mockData);

      const { result } = renderHook(() => useProcessedData());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data[0].name).toBe("OBJECT DETECTION YOLO");
    });
  });

  describe("error handling", () => {
    it("should handle invalid URLs gracefully with objectId fallback", async () => {
      const mockData = [
        {
          id: "test-5",
          objectId: "fallback-algorithm-123",
          url: "not-a-valid-url",
          Elo: 1400,
        },
      ];

      fetchData.mockResolvedValue(mockData);

      const { result } = renderHook(() => useProcessedData());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data[0].name).toBe("fallback-algorithm-123");
      expect(result.current.error).toBeNull();
    });

    it("should handle invalid URLs with Unknown Algorithm fallback", async () => {
      const mockData = [
        {
          id: "test-6",
          url: "invalid-url-format",
          Elo: 1300,
        },
      ];

      fetchData.mockResolvedValue(mockData);

      const { result } = renderHook(() => useProcessedData());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data[0].name).toBe("Unknown Algorithm");
      expect(result.current.error).toBeNull();
    });

    it("should handle fetchData errors", async () => {
      const mockError = new Error("Failed to fetch data");
      fetchData.mockRejectedValue(mockError);

      const { result } = renderHook(() => useProcessedData());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBe(mockError);
    });
  });

  describe("hook state management", () => {
    it("should start with loading state", () => {
      fetchData.mockReturnValue(new Promise(() => {})); // Never resolves

      const { result } = renderHook(() => useProcessedData());

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeNull();
    });

    it("should preserve original data properties while adding name", async () => {
      const mockData = [
        {
          id: "test-7",
          url: "https://example.com/test_algorithm.jpg",
          Elo: 1500,
          createdAt: "2023-01-01",
          metadata: { type: "CNN", version: 2 },
        },
      ];

      fetchData.mockResolvedValue(mockData);

      const { result } = renderHook(() => useProcessedData());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const processedItem = result.current.data[0];
      expect(processedItem.id).toBe("test-7");
      expect(processedItem.Elo).toBe(1500);
      expect(processedItem.createdAt).toBe("2023-01-01");
      expect(processedItem.metadata).toEqual({ type: "CNN", version: 2 });
      expect(processedItem.name).toBe("TEST ALGORITHM");
    });
  });
});
