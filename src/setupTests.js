import '@testing-library/jest-dom';

// Mock IntersectionObserver for JSDOM testing environment
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(element) {
    this.callback([{ isIntersecting: true, target: element }], this);
  }
  unobserve() {}
  disconnect() {}
};
