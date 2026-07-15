import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Footer from '../Footer';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to} data-testid="router-link">{children}</a>,
}));

// Mock ThemeContext
vi.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ isDark: false }),
}));

describe('Footer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render brand title correctly', () => {
    render(<Footer />);
    expect(screen.getByText('Spirit')).toBeInTheDocument();
  });

  it('should render menu columns and links correctly', () => {
    render(<Footer />);
    expect(screen.getByText('MENU')).toBeInTheDocument();
    expect(screen.getByText('SOCIAL')).toBeInTheDocument();
    expect(screen.getByText('COMPANY')).toBeInTheDocument();

    // Check presence of some key links
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('SERVICES')).toBeInTheDocument();
    expect(screen.getByText('LINKEDIN')).toBeInTheDocument();
    expect(screen.getByText('Privacy & Policy')).toBeInTheDocument();
  });
});
