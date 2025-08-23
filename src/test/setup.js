import "@testing-library/jest-dom";

// Mock Parse.js globally
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

// Mock XMLHttpRequest
global.XMLHttpRequest = vi.fn(() => ({
  open: vi.fn(),
  send: vi.fn(),
  setRequestHeader: vi.fn(),
  readyState: 4,
  status: 200,
  responseText: '{"success": true}',
}));

// Mock fetch API
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
    text: () => Promise.resolve('{"success": true}'),
  })
);

// Mock console methods
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
  log: vi.fn(),
};
