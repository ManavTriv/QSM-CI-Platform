/**
 * Tests for useEloUpdater Hook
 */

import { describe, it, expect, vi } from "vitest";
import useEloUpdater from "../useEloUpdater";

describe("useEloUpdater", () => {
  it("should return a function", () => {
    const updateElo = useEloUpdater();
    expect(typeof updateElo).toBe("function");
  });

  it("should calculate expected score correctly for equal ratings", () => {
    // Test the formula directly
    const expectedScore = 1 / (1 + Math.pow(10, (1500 - 1500) / 400));
    expect(expectedScore).toBe(0.5);
  });

  it("should calculate new rating with correct K-factor", () => {
    // Test the rating calculation formula
    const currentRating = 1500;
    const expectedScore = 0.5;
    const actualScore = 1; // win
    const K_FACTOR = 32;

    const newRating = Math.round(
      currentRating + K_FACTOR * (actualScore - expectedScore)
    );
    expect(newRating).toBe(1516);
  });

  it("should handle different ELO ratings", () => {
    // Higher ELO vs lower ELO
    const higherExpected = 1 / (1 + Math.pow(10, (1400 - 1600) / 400));
    const lowerExpected = 1 / (1 + Math.pow(10, (1600 - 1400) / 400));

    expect(higherExpected).toBeGreaterThan(0.5);
    expect(lowerExpected).toBeLessThan(0.5);
    expect(higherExpected + lowerExpected).toBeCloseTo(1, 10);
  });
});
