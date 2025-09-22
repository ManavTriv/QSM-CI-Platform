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

  it("should process algorithm names from URLs and handle fallbacks", async () => {
    const mockData = [
      { id: "1", url: "https://example.com/Algorithm_Test.jpg", Elo: 1500 },
      { id: "2", url: "https://example.com/Neural%20Network.png", Elo: 1600 },
      { id: "3", objectId: "fallback-123", url: "invalid-url", Elo: 1400 },
    ];

    fetchData.mockResolvedValue(mockData);
    const { result } = renderHook(() => useProcessedData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data[0].name).toBe("ALGORITHM TEST");
    expect(result.current.data[1].name).toBe("NEURAL NETWORK");
    expect(result.current.data[2].name).toBe("fallback-123");
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
