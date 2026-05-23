import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ProjectsComingSoon from '../ProjectsComingSoon';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }) => <div {...rest}>{children}</div>,
  },
}));

// Mock components
vi.mock('../../components/ScrollReveal', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('ProjectsComingSoon', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key');
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('should render subscription form correctly', () => {
    render(<ProjectsComingSoon />);
    expect(screen.getByText('Get Notified')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your corporate email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /keep me updated/i })).toBeInTheDocument();
  });

  it('should handle successful subscription', async () => {
    // Mock successful fetch response
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ProjectsComingSoon />);

    const emailInput = screen.getByPlaceholderText('Enter your corporate email address');
    const submitButton = screen.getByRole('button', { name: /keep me updated/i });

    fireEvent.change(emailInput, { target: { value: 'user@company.com' } });
    fireEvent.click(submitButton);

    // Verify loading spinner is displayed
    expect(screen.getByText(/subscribing/i)).toBeInTheDocument();

    // Wait for the success state screen to be rendered
    await waitFor(() => {
      expect(screen.getByText('Subscription Confirmed')).toBeInTheDocument();
    });
  });

  it('should display error message on failed submission', async () => {
    // Mock failed fetch response
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: false, message: 'Invalid access key' }),
    });

    render(<ProjectsComingSoon />);

    const emailInput = screen.getByPlaceholderText('Enter your corporate email address');
    const submitButton = screen.getByRole('button', { name: /keep me updated/i });

    fireEvent.change(emailInput, { target: { value: 'user@company.com' } });
    fireEvent.click(submitButton);

    // Wait for error banner to be displayed
    await waitFor(() => {
      expect(screen.getByText(/invalid access key/i)).toBeInTheDocument();
    });
  });

  it('should display missing access key warning if environment variable is not set', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'YOUR_WEB3FORMS_ACCESS_KEY');

    render(<ProjectsComingSoon />);

    const emailInput = screen.getByPlaceholderText('Enter your corporate email address');
    const submitButton = screen.getByRole('button', { name: /keep me updated/i });

    fireEvent.change(emailInput, { target: { value: 'user@company.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/access key is missing/i)).toBeInTheDocument();
    });
  });
});
