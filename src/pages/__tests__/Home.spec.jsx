import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Home from '../Home';

// Lightweight framer-motion mock — avoids 300×useTransform calls hanging jsdom
vi.mock('framer-motion', () => {
  const createComponent = (tag) => ({ children, ...rest }) => {
    const filteredProps = { ...rest };
    delete filteredProps.whileInView;
    delete filteredProps.viewport;
    delete filteredProps.whileHover;
    delete filteredProps.animate;
    delete filteredProps.initial;
    delete filteredProps.transition;
    delete filteredProps.exit;
    delete filteredProps.style;
    delete filteredProps.pathLength;
    const Tag = tag;
    return <Tag {...filteredProps}>{children}</Tag>;
  };
  const mockMotion = new Proxy({}, {
    get: (_, prop) => createComponent(prop),
  });
  return {
    motion: mockMotion,
    AnimatePresence: ({ children }) => <>{children}</>,
    useScroll: () => ({
      scrollY: { get: () => 0, on: () => () => {} },
      scrollYProgress: { get: () => 0, on: () => () => {} },
    }),
    useMotionValue: () => ({ get: () => 0, set: () => {}, on: () => () => {} }),
    useTransform: () => 0,   // plain number — no subscriber, no hang
  };
});

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Code: () => <span data-testid="icon-code">Code</span>,
  Cpu: () => <span data-testid="icon-cpu">Cpu</span>,
  Terminal: () => <span data-testid="icon-terminal">Terminal</span>,
  ShieldCheck: () => <span data-testid="icon-shield">Shield</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
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

// Mock Logo3D to prevent WebGL/R3F rendering issues in JSDOM environment
vi.mock('../../components/Logo3D', () => ({
  default: () => <div data-testid="logo-3d">3D Logo</div>,
}));

// Mock AboutScroll — the 300 animated ScrollChar components hang jsdom
vi.mock('../../components/home/AboutScroll', () => ({
  default: () => <section id="about" data-testid="about-scroll" />,
}));


describe('Home', () => {
  let originalKey;

  beforeEach(() => {
    originalKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = 'test-access-key';
    globalThis.fetch = vi.fn();

    // Mock setInterval to capture slideshow callback and prevent real background timers
    vi.spyOn(globalThis, 'setInterval').mockImplementation(() => {
      return 999;
    });
    vi.spyOn(globalThis, 'clearInterval').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = originalKey;
    vi.restoreAllMocks();
  });

  it('should render page sections correctly', () => {
    render(<Home />);
    expect(screen.getAllByText(/Pioneering Digital/i)[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
  });

  it('should handle successful contact form submission', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
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
