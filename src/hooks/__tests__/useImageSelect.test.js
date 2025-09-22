/**
 * Tests for useImageSelect Hook
 */

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("../useProcessedData", () => ({
  default: vi.fn(),
}));

import useImageSelect from "../useImageSelect";
import useProcessedData from "../useProcessedData";

describe("useImageSelect", () => {
  const mockSetImage = vi.fn();
  const mockData = [
    {
      id: "1",
      url: "https://example.com/1.jpg",
      name: "ALGORITHM ONE",
      tags: ["ai"],
    },
    {
      id: "2",
      url: "https://example.com/2.jpg",
      name: "ALGORITHM TWO",
      tags: ["ml"],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useProcessedData.mockReturnValue({
      data: mockData,
      error: null,
      loading: false,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useImageSelect(mockSetImage));

    expect(result.current.selectedUrl).toBeNull();
    expect(result.current.searchTerm).toBe("");
    expect(result.current.selectedTags).toEqual([]);
    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedName).toBe("Select an algorithm");
  });

  it("should filter data by search term and tags", () => {
    const { result } = renderHook(() => useImageSelect(mockSetImage));

    // Test search filtering
    act(() => {
      result.current.setSearchTerm("one");
    });
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe("ALGORITHM ONE");

    // Test tag filtering
    act(() => {
      result.current.setSearchTerm("");
      result.current.setSelectedTags(["ai"]);
    });
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe("ALGORITHM ONE");
  });

  it("should handle selection and deselection", () => {
    const { result } = renderHook(() => useImageSelect(mockSetImage));

    act(() => {
      result.current.handleSelect("https://example.com/1.jpg");
    });

    expect(result.current.selectedUrl).toBe("https://example.com/1.jpg");
    expect(result.current.selectedName).toBe("ALGORITHM ONE");
    expect(mockSetImage).toHaveBeenCalledWith(
      "https://example.com/1.jpg",
      "ALGORITHM ONE"
    );

    // Deselect
    act(() => {
      result.current.handleSelect("https://example.com/1.jpg");
    });

    expect(result.current.selectedUrl).toBeNull();
    expect(mockSetImage).toHaveBeenCalledWith(null, null);
  });

  it("should toggle dropdown", () => {
    const { result } = renderHook(() => useImageSelect(mockSetImage));

    act(() => {
      result.current.toggleDropdown();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleDropdown();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("should handle null data gracefully", () => {
    useProcessedData.mockReturnValue({
      data: null,
      error: null,
      loading: false,
    });

    const { result } = renderHook(() => useImageSelect(mockSetImage));

    expect(result.current.filteredData).toEqual([]);
  });
});
