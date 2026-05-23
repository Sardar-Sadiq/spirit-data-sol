import { render } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ScrollToTop from '../ScrollToTop';

// Mock react-router-dom's useLocation hook
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

describe('ScrollToTop', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  it('should scroll to top on mount', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/test' });

    render(<ScrollToTop />);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it('should scroll to top when pathname changes', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/test-1' });

    const { rerender } = render(<ScrollToTop />);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    vi.mocked(useLocation).mockReturnValue({ pathname: '/test-2' });
    rerender(<ScrollToTop />);

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });
});
