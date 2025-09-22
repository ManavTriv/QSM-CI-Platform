/**
 * Tests for tagGroups configuration
 */

import { describe, it, expect } from "vitest";
import {
  TAG_GROUPS,
  TAG_DELIMITER,
  DEFAULT_TAG_VALUE,
  getSupportedGroupIds,
  isGroupedTag,
  parseGroupedTag,
} from "../tagGroups";

describe("tagGroups config", () => {
  it("should export TAG_GROUPS array", () => {
    expect(Array.isArray(TAG_GROUPS)).toBe(true);
    expect(TAG_GROUPS.length).toBeGreaterThan(0);
  });

  it("should have valid tag group structure", () => {
    TAG_GROUPS.forEach((group) => {
      expect(group).toHaveProperty("id");
      expect(group).toHaveProperty("displayName");
      expect(typeof group.id).toBe("string");
      expect(typeof group.displayName).toBe("string");
    });
  });

  it("should return supported group IDs", () => {
    const ids = getSupportedGroupIds();
    expect(Array.isArray(ids)).toBe(true);
    expect(ids.length).toBe(TAG_GROUPS.length);
  });

  it("should identify grouped tags", () => {
    expect(isGroupedTag("type::Deep Learning")).toBe(true);
    expect(isGroupedTag("regular-tag")).toBe(false);
    expect(isGroupedTag("")).toBe(false);
  });

  it("should parse grouped tags", () => {
    const parsed = parseGroupedTag("type::Deep Learning");
    expect(parsed).toEqual({
      groupId: "type",
      value: "Deep Learning",
      original: "type::Deep Learning",
    });

    expect(parseGroupedTag("regular-tag")).toBeNull();
  });

  it("should use correct delimiter and default value", () => {
    expect(TAG_DELIMITER).toBe("::");
    expect(DEFAULT_TAG_VALUE).toBe("NA");
  });
});
