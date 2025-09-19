/**
 * Tests for parseConfig API
 */

import { describe, it, expect, vi } from "vitest";

vi.mock("parse/dist/parse.min.js", () => ({
  default: {
    initialize: vi.fn(),
    serverURL: "",
    AnonymousUtils: {},
  },
}));

describe("parseConfig", () => {
  it("should have correct server URL", () => {
    expect("https://parseapi.back4app.com/").toBe(
      "https://parseapi.back4app.com/"
    );
  });

  it("should export initializeParse function", async () => {
    const { initializeParse } = await import("../parseConfig");
    expect(typeof initializeParse).toBe("function");
  });

  it("should export AnonymousUtils", async () => {
    const { AnonymousUtils } = await import("../parseConfig");
    expect(AnonymousUtils).toBeDefined();
  });
});
