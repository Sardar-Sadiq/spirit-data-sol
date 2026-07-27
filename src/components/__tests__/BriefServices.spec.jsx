import { render, screen, fireEvent, waitFor, cleanup, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import BriefServices from '../home/BriefServices';

// Mock framer-motion to prevent JSDOM issues
vi.mock('framer-motion', () => {
  const cache = new Map();
  const getComponent = (tag) => {
    if (!cache.has(tag)) {
      cache.set(tag, ({ children, ...rest }) => {
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
      });
    }
    return cache.get(tag);
  };
  return {
    motion: new Proxy({}, {
      get: (_, prop) => getComponent(prop),
    }),
  };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Code: () => <span data-testid="icon-code">Code</span>,
  Cpu: () => <span data-testid="icon-cpu">Cpu</span>,
  Terminal: () => <span data-testid="icon-terminal">Terminal</span>,
  ShieldCheck: () => <span data-testid="icon-shield">Shield</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
}));

describe('BriefServices', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-demo-access-key');
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('should render demo form and service tags correctly', () => {
    render(<BriefServices />);
    expect(screen.getByPlaceholderText('Enter your email here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book a demo/i })).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Gen-AI Solutions')).toBeInTheDocument();
  });

  it('should submit demo request successfully via Web3Forms API', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<BriefServices />);

    const input = screen.getByPlaceholderText('Enter your email here');
    const submitButton = screen.getByRole('button', { name: /book a demo/i });

    await act(async () => {
      fireEvent.change(input, { target: { value: 'client@company.com' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://api.web3forms.com/submit',
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    expect(screen.getByText(/demo request sent/i)).toBeInTheDocument();
  });

  it('should display error message on failed submission', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: false, message: 'Invalid access key' }),
    });

    render(<BriefServices />);

    const input = screen.getByPlaceholderText('Enter your email here');
    const submitButton = screen.getByRole('button', { name: /book a demo/i });

    await act(async () => {
      fireEvent.change(input, { target: { value: 'client@company.com' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/invalid access key/i)).toBeInTheDocument();
    });
  });
});
