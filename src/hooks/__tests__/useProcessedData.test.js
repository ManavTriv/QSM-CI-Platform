/**
 * Tests for useProcessedData Hook
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("../useFetchData", () => ({
  default: vi.fn(),
}));

import useProcessedData from "../useProcessedData";
import fetchData from "../useFetchData";

describe("useProcessedData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should start with loading state", () => {
    fetchData.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useProcessedData());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("should extract algorithm name from URL", async () => {
    const mockData = [
      {
        id: "test-1",
        url: "https://example.com/Algorithm_Name_Test.jpg",
        Elo: 1500,
      },
    ];

    fetchData.mockResolvedValue(mockData);

    const { result } = renderHook(() => useProcessedData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data[0].name).toBe("ALGORITHM NAME TEST");
  });

  it("should handle URL decoding and file extensions", async () => {
    const mockData = [
      {
        id: "test-2",
        url: "https://example.com/Neural%20Network_Model.png",
        Elo: 1600,
      },
    ];

    fetchData.mockResolvedValue(mockData);

    const { result } = renderHook(() => useProcessedData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data[0].name).toBe("NEURAL NETWORK MODEL");
  });

  it("should use objectId fallback for invalid URLs", async () => {
    const mockData = [
      {
        id: "test-3",
        objectId: "fallback-algorithm-123",
        url: "invalid-url",
        Elo: 1400,
      },
    ];

    fetchData.mockResolvedValue(mockData);

    const { result } = renderHook(() => useProcessedData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data[0].name).toBe("fallback-algorithm-123");
  });

  it("should handle fetch errors", async () => {
    const mockError = new Error("Failed to fetch");
    fetchData.mockRejectedValue(mockError);

    const { result } = renderHook(() => useProcessedData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(mockError);
  });
});
