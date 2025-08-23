import "@testing-library/jest-dom";

global.Parse = {
  initialize: vi.fn(),
  Object: {
    extend: vi.fn(() => ({
      get: vi.fn(),
      set: vi.fn(),
      save: vi.fn(),
    })),
  },
  Query: vi.fn(() => ({
    find: vi.fn(),
    get: vi.fn(),
  })),
};

global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
  log: vi.fn(),
};
