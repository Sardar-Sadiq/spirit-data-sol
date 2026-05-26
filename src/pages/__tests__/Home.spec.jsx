import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { act } from 'react';
import Home from '../Home';

// Cached dynamic mock for framer-motion tags to strip out motion props and avoid DOM node warnings
vi.mock('framer-motion', () => {
  const mockMotion = {};
  const tags = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'img', 'section', 'button', 'a'];
  tags.forEach(tag => {
    mockMotion[tag] = ({ children, whileInView, viewport, whileHover, animate, initial, transition, exit, ...rest }) => {
      const Tag = tag;
      return <Tag {...rest}>{children}</Tag>;
    };
  });
  return {
    motion: mockMotion,
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Code: () => <span data-testid="icon-code">Code</span>,
  Cpu: () => <span data-testid="icon-cpu">Cpu</span>,
  Terminal: () => <span data-testid="icon-terminal">Terminal</span>,
  ShieldCheck: () => <span data-testid="icon-shield">Shield</span>,
  MapPin: () => <span data-testid="icon-map">Map</span>,
  Mail: () => <span data-testid="icon-mail">Mail</span>,
  Phone: () => <span data-testid="icon-phone">Phone</span>,
  ArrowRight: () => <span data-testid="icon-arrow">Arrow</span>,
  CheckCircle: () => <span data-testid="icon-check">Check</span>,
  Eye: () => <span data-testid="icon-eye">Eye</span>,
  Rocket: () => <span data-testid="icon-rocket">Rocket</span>,
  Compass: () => <span data-testid="icon-compass">Compass</span>,
  Users: () => <span data-testid="icon-users">Users</span>,
}));

// Mock ScrollReveal with correct relative path
vi.mock('../../components/ScrollReveal', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('Home', () => {
  let originalKey;
  let setIntervalCallback;

  beforeEach(() => {
    originalKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = 'test-access-key';
    global.fetch = vi.fn();

    // Mock setInterval to capture slideshow callback and prevent real background timers
    vi.spyOn(global, 'setInterval').mockImplementation((cb) => {
      setIntervalCallback = cb;
      return 999;
    });
    vi.spyOn(global, 'clearInterval').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = originalKey;
    vi.restoreAllMocks();
    setIntervalCallback = undefined;
  });

  it('should render page sections correctly', () => {
    render(<Home />);
    expect(screen.getByText(/Pioneering Digital/i)).toBeInTheDocument();
    expect(screen.getByText('Agile Alignment Workshops')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
  });

  it('should auto-rotate gallery slides when interval triggers', () => {
    render(<Home />);
    
    // First slide should be visible initially
    expect(screen.getByText('Agile Alignment Workshops')).toBeInTheDocument();

    // Manually trigger the slideshow callback captured by the mock inside act
    if (setIntervalCallback) {
      act(() => {
        setIntervalCallback();
      });
    }

    // Second slide should now be visible
    expect(screen.getByText('Collaborator Synergy')).toBeInTheDocument();
  });

  it('should handle successful contact form submission', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'jane@company.com' } });
    fireEvent.change(screen.getByPlaceholderText('How can we help?'), { target: { value: 'Inquiry' } });
    fireEvent.change(screen.getByPlaceholderText(/requirements/i), { target: { value: 'Hello' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/sending/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Message Sent Successfully')).toBeInTheDocument();
    });
  });

  it('should display warning banner if access key is missing', async () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'jane@company.com' } });
    fireEvent.change(screen.getByPlaceholderText('How can we help?'), { target: { value: 'Inquiry' } });
    fireEvent.change(screen.getByPlaceholderText(/requirements/i), { target: { value: 'Hello' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/access key is missing/i)).toBeInTheDocument();
    });
  });
});
