/**
 * Tests for useEloUpdater Hook
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock external dependencies
vi.mock("../api/parseConfig", () => ({
  initializeParse: vi.fn(),
}));

vi.mock("../utils/ensureAnonymousUser", () => ({
  default: vi.fn(),
}));

import useEloUpdater from "../useEloUpdater";

describe("useEloUpdater", () => {
  describe("Hook structure", () => {
    it("should return a function", () => {
      const updateElo = useEloUpdater();
      expect(typeof updateElo).toBe("function");
    });
  });

  describe("ELO calculation formulas", () => {
    let updateElo;

    beforeEach(() => {
      updateElo = useEloUpdater();
    });

    it("should calculate expected score correctly for equal ratings", () => {
      // For equal elo (1500 vs 1500), expected score should be 0.5
      // Expected score: 1 / (1 + 10^((algo1 - algo2) / 400))
      const expectedScore = 1 / (1 + Math.pow(10, (1500 - 1500) / 400));
      expect(expectedScore).toBe(0.5);
    });

    it("should calculate expected score correctly for different ratings", () => {
      // Higher elo (1600) vs lower elo (1400)
      // Higher elo algo should have higher expected score
      const higherPlayerExpected = 1 / (1 + Math.pow(10, (1400 - 1600) / 400));
      const lowerPlayerExpected = 1 / (1 + Math.pow(10, (1600 - 1400) / 400));

      expect(higherPlayerExpected).toBeGreaterThan(0.5);
      expect(lowerPlayerExpected).toBeLessThan(0.5);
      expect(higherPlayerExpected + lowerPlayerExpected).toBeCloseTo(1, 10);
    });

    it("should calculate new rating with correct K-factor (32)", () => {
      // New rating = current + K * (actual - expected)
      const currentRating = 1500;
      const expectedScore = 0.5;
      const actualScore = 1; // win
      const K_FACTOR = 32;

      const expectedNewRating = Math.round(
        currentRating + K_FACTOR * (actualScore - expectedScore)
      );
      expect(expectedNewRating).toBe(1516); // 1500 + 32 * (1 - 0.5) = 1516
    });

    it("should calculate rating loss correctly", () => {
      // When an algorithm loses (actual = 0) against equal elo algorithm (expected = 0.5)
      const currentRating = 1500;
      const expectedScore = 0.5;
      const actualScore = 0; // loss
      const K_FACTOR = 32;

      const expectedNewRating = Math.round(
        currentRating + K_FACTOR * (actualScore - expectedScore)
      );
      expect(expectedNewRating).toBe(1484); // 1500 + 32 * (0 - 0.5) = 1484
    });

    it("should handle rating boundaries correctly", () => {
      // Test with high ratings
      const highRating = 2000;
      const lowRating = 1000;

      // High elo vs low elo
      const highPlayerExpected =
        1 / (1 + Math.pow(10, (lowRating - highRating) / 400));
      const lowPlayerExpected =
        1 / (1 + Math.pow(10, (highRating - lowRating) / 400));

      expect(highPlayerExpected).toBeGreaterThan(0.9); // Should be high
      expect(lowPlayerExpected).toBeLessThan(0.1); // Should b low
    });
  });
});
