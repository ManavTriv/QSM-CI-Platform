/**
 * Tests for ensureAnonymousUser utility
 */

import { describe, it, expect } from "vitest";
import ensureAnonymousUser from "../ensureAnonymousUser";

describe("ensureAnonymousUser", () => {
  it("should be an async function", () => {
    expect(typeof ensureAnonymousUser).toBe("function");
    expect(ensureAnonymousUser.constructor.name).toBe("AsyncFunction");
  });
});
