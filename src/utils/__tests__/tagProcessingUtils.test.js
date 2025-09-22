import { describe, it, expect, vi } from "vitest";
import {
  processRawTags,
  processAllAlgorithmTags,
  createAlgorithmTagProcessor,
} from "../tagProcessingUtils";

// Mock tagGroups config
vi.mock("../../config/tagGroups", () => ({
  getSupportedGroupIds: () => ["type", "category"],
  TAG_DELIMITER: "::",
  DEFAULT_TAG_VALUE: "NA",
  isGroupedTag: (tag) => tag.includes("::"),
  parseGroupedTag: (tag) => {
    if (!tag.includes("::")) return null;
    const [groupId, value] = tag.split("::");
    return { original: tag, groupId, value };
  },
}));

describe("tagProcessingUtils", () => {
  describe("processRawTags", () => {
    it("should handle empty input", () => {
      const result = processRawTags([]);
      expect(result.grouped).toEqual({});
      expect(result.ungrouped).toEqual([]);
      expect(result.all).toEqual([]);
    });

    it("should process mixed tags", () => {
      const tags = ["type::ML", "ai", "category::Research"];
      const result = processRawTags(tags);

      expect(result.grouped.type).toHaveLength(1);
      expect(result.grouped.category).toHaveLength(1);
      expect(result.ungrouped).toContain("ai");
      expect(result.all).toHaveLength(3);
    });

    it("should handle invalid input gracefully", () => {
      const result = processRawTags(null);
      expect(result.grouped).toEqual({});
      expect(result.ungrouped).toEqual([]);
      expect(result.all).toEqual([]);
    });
  });

  describe("processAllAlgorithmTags", () => {
    it("should handle empty data", () => {
      const result = processAllAlgorithmTags([]);
      expect(result.grouped).toHaveProperty("type");
      expect(result.grouped).toHaveProperty("category");
      expect(result.ungrouped).toEqual([]);
      expect(result.all).toEqual(expect.arrayContaining([]));
    });

    it("should process algorithm data", () => {
      const data = [
        { tags: ["type::ML", "ai"] },
        { tags: ["type::Traditional", "research"] },
      ];

      const result = processAllAlgorithmTags(data);
      expect(result.grouped.type).toContain("ML");
      expect(result.grouped.type).toContain("Traditional");
      expect(result.ungrouped).toContain("ai");
      expect(result.ungrouped).toContain("research");
    });

    it("should add NA for missing groups", () => {
      const data = [{ tags: ["ai"] }];
      const result = processAllAlgorithmTags(data);

      expect(result.grouped.type).toContain("NA");
      expect(result.grouped.category).toContain("NA");
    });
  });

  describe("createAlgorithmTagProcessor", () => {
    it("should return a function", () => {
      const processor = createAlgorithmTagProcessor();
      expect(typeof processor).toBe("function");
    });

    it("should process algorithm tags correctly", () => {
      const processor = createAlgorithmTagProcessor();
      const result = processor(["type::ML", "ai"]);

      expect(result.grouped.type).toHaveLength(1);
      expect(result.grouped.type[0].value).toBe("ML");
      expect(result.ungrouped).toContain("ai");
    });

    it("should add NA for missing groups", () => {
      const processor = createAlgorithmTagProcessor();
      const result = processor([]);

      expect(result.grouped.type[0].value).toBe("NA");
      expect(result.grouped.category[0].value).toBe("NA");
    });
  });
});
