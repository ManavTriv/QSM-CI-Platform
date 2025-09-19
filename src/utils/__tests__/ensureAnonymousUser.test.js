/**
 * Tests for ensureAnonymousUser utility
 */

import { describe, it, expect } from "vitest";
import ensureAnonymousUser from "../ensureAnonymousUser";

describe("ensureAnonymousUser", () => {
  it("should be a function", () => {
    expect(typeof ensureAnonymousUser).toBe("function");
  });

  it("should be async", () => {
    expect(ensureAnonymousUser.constructor.name).toBe("AsyncFunction");
  });
});
