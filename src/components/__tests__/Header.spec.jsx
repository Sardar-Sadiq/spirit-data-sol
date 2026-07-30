import { render, screen, fireEvent } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Header from '../Header';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to, onClick, className }) => (
    <a href={to} onClick={onClick} className={className} data-testid="link">
      {children}
    </a>
  ),
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }) => <div {...rest}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock ThemeToggle to avoid ThemeContext provider dependency in header tests
vi.mock('../ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Menu: () => <span data-testid="menu-icon">Menu</span>,
  X: () => <span data-testid="x-icon">X</span>,
  Sun: () => <span data-testid="sun-icon">Sun</span>,
  Monitor: () => <span data-testid="monitor-icon">Monitor</span>,
  Moon: () => <span data-testid="moon-icon">Moon</span>,
}));

describe('Header', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocation).mockReturnValue({ pathname: '/' });
    window.scrollTo = vi.fn();
  });

  it('should render brand logo correctly', () => {
    render(<Header />);
    expect(screen.getByAltText('Spirit Data Logo')).toBeInTheDocument();
  });

  it('should render desktop navigation links correctly', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
  });

  it('should highlight the active link according to the current location path', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/careers' });
    render(<Header />);
    
    const careersLink = screen.getByText('Careers');
    expect(careersLink).toHaveClass('text-primary-blue');
  });

  it('should toggle mobile menu drawer when mobile icon is clicked', () => {
    render(<Header />);
    
    // Initially the mobile menu is closed (drawer is not rendered)
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();

    const toggleButton = screen.getByLabelText('Toggle navigation menu');
    
    // Open menu
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();

    // Close menu
    fireEvent.click(toggleButton);
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();
  });

  it('should render Services as a navigation route link', () => {
    render(<Header />);
    const servicesLink = screen.getByText('Services');
    expect(servicesLink).toBeInTheDocument();
    expect(servicesLink.getAttribute('href')).toBe('/services');
  });
});
