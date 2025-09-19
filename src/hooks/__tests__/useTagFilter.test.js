/**
 * Tests for useTagFilter Hook
 */

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useTagFilter from "../useTagFilter";

describe("useTagFilter", () => {
  const mockData = [
    { id: "1", tags: ["ai", "computer-vision"] },
    { id: "2", tags: ["machine-learning"] },
    { id: "3", tags: ["ai", "deep-learning"] },
  ];
  const mockOnTagsChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() =>
      useTagFilter(mockData, [], mockOnTagsChange)
    );

    expect(result.current.isOpen).toBe(false);
    expect(result.current.tagSearchTerm).toBe("");
    expect(result.current.availableTags).toEqual([
      "ai",
      "computer-vision",
      "deep-learning",
      "machine-learning",
    ]);
  });

  it("should extract unique tags from data", () => {
    const { result } = renderHook(() =>
      useTagFilter(mockData, [], mockOnTagsChange)
    );

    expect(result.current.availableTags).toHaveLength(4);
    expect(result.current.availableTags).toContain("ai");
    expect(result.current.availableTags).toContain("machine-learning");
  });

  it("should filter tags by search term", () => {
    const { result } = renderHook(() =>
      useTagFilter(mockData, [], mockOnTagsChange)
    );

    act(() => {
      result.current.setTagSearchTerm("machine");
    });

    expect(result.current.filteredTags).toEqual(["machine-learning"]);
  });

  it("should pin selected tags to top", () => {
    const { result } = renderHook(() =>
      useTagFilter(mockData, ["machine-learning"], mockOnTagsChange)
    );

    expect(result.current.filteredTags[0]).toBe("machine-learning");
  });

  it("should toggle tags", () => {
    const { result } = renderHook(() =>
      useTagFilter(mockData, [], mockOnTagsChange)
    );

    act(() => {
      result.current.handleTagToggle("ai");
    });

    expect(mockOnTagsChange).toHaveBeenCalledWith(["ai"]);

    // Test removing tag
    const { result: result2 } = renderHook(() =>
      useTagFilter(mockData, ["ai"], mockOnTagsChange)
    );

    act(() => {
      result2.current.handleTagToggle("ai");
    });

    expect(mockOnTagsChange).toHaveBeenCalledWith([]);
  });

  it("should toggle dropdown", () => {
    const { result } = renderHook(() =>
      useTagFilter(mockData, [], mockOnTagsChange)
    );

    act(() => {
      result.current.toggleDropdown();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should clear all tags", () => {
    const { result } = renderHook(() =>
      useTagFilter(mockData, ["ai", "ml"], mockOnTagsChange)
    );

    act(() => {
      result.current.clearAllTags();
    });

    expect(mockOnTagsChange).toHaveBeenCalledWith([]);
  });

  it("should handle empty data", () => {
    const { result } = renderHook(() => useTagFilter([], [], mockOnTagsChange));

    expect(result.current.availableTags).toEqual([]);
  });
});
