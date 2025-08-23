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

global.XMLHttpRequest = vi.fn(() => ({
  open: vi.fn(),
  send: vi.fn(),
  setRequestHeader: vi.fn(),
  readyState: 4,
  status: 200,
  responseText: '{"success": true}',
}));

// Mock fetch to prevent network errors
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
    text: () => Promise.resolve('{"success": true}'),
  })
);

global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
  log: vi.fn(),
};
