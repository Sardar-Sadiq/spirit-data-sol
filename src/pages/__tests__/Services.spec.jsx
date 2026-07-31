import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ServicesPage from '../Services';

// Lightweight framer-motion mock to prevent jsdom hanging
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
    useTransform: () => 0,
  };
});

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Code: () => <span data-testid="icon-code">Code</span>,
  Cpu: () => <span data-testid="icon-cpu">Cpu</span>,
  Terminal: () => <span data-testid="icon-terminal">Terminal</span>,
  ShieldCheck: () => <span data-testid="icon-shield">Shield</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
  CheckCircle2: () => <span data-testid="icon-check">Check</span>,
  CheckCircle: () => <span data-testid="icon-check">Check</span>,
  ArrowRight: () => <span data-testid="icon-arrow">Arrow</span>,
  Layers: () => <span data-testid="icon-layers">Layers</span>,
  Zap: () => <span data-testid="icon-zap">Zap</span>,
  Server: () => <span data-testid="icon-server">Server</span>,
  Search: () => <span data-testid="icon-search">Search</span>,
  MapPin: () => <span data-testid="icon-mappin">MapPin</span>,
  Mail: () => <span data-testid="icon-mail">Mail</span>,
  Phone: () => <span data-testid="icon-phone">Phone</span>,
  Send: () => <span data-testid="icon-send">Send</span>,
  Palette: () => <span data-testid="icon-palette">Palette</span>,
  Rocket: () => <span data-testid="icon-rocket">Rocket</span>,
  Headphones: () => <span data-testid="icon-headphones">Headphones</span>,
  GitCommit: () => <span data-testid="icon-gitcommit">GitCommit</span>,
  Users: () => <span data-testid="icon-users">Users</span>,
  Target: () => <span data-testid="icon-target">Target</span>,
  Clock: () => <span data-testid="icon-clock">Clock</span>,
  Briefcase: () => <span data-testid="icon-briefcase">Briefcase</span>,
  Landmark: () => <span data-testid="icon-landmark">Landmark</span>,
  HeartPulse: () => <span data-testid="icon-heartpulse">HeartPulse</span>,
  ShoppingBag: () => <span data-testid="icon-shoppingbag">ShoppingBag</span>,
  Building2: () => <span data-testid="icon-building2">Building2</span>,
  Bot: () => <span data-testid="icon-bot">Bot</span>,
  GraduationCap: () => <span data-testid="icon-graduationcap">GraduationCap</span>,
  Globe2: () => <span data-testid="icon-globe2">Globe2</span>,
  ArrowUpRight: () => <span data-testid="icon-arrowupright">ArrowUpRight</span>,
  TrendingUp: () => <span data-testid="icon-trendingup">TrendingUp</span>,
  Lock: () => <span data-testid="icon-lock">Lock</span>,
  Award: () => <span data-testid="icon-award">Award</span>,
}));

// Mock ScrollReveal
vi.mock('../../components/ScrollReveal', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('ServicesPage', () => {
  let originalKey;

  beforeEach(() => {
    originalKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = 'test-access-key';
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    cleanup();
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = originalKey;
    vi.restoreAllMocks();
  });

  it('renders Hero section with correct main title', () => {
    render(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 1, name: /OUR SERVICES/i })).toBeInTheDocument();
  });

  it('renders Service Categories section with engineering disciplines', () => {
    render(<ServicesPage />);
    expect(screen.getByText(/CORE ENGINEERING DISCIPLINES/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Full Stack Web Development/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Full Stack Java Development/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Full Stack Python & AI Services/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Automation & Selenium QA Testing/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Gen-AI & Intelligent Solutions/i)[0]).toBeInTheDocument();
  });

  it('renders Service Categories section and allows switching active tabs', () => {
    render(<ServicesPage />);
    expect(screen.getByText(/CORE ENGINEERING DISCIPLINES/i)).toBeInTheDocument();

    // Verify default active category (Full Stack Web Development)
    expect(screen.getByRole('heading', { level: 3, name: /Full Stack Web Development/i })).toBeInTheDocument();

    // Switch tab to Full Stack Java
    const javaTab = screen.getByRole('button', { name: /Full Stack Java/i });
    fireEvent.click(javaTab);

    // Verify active details updated
    expect(screen.getByRole('heading', { level: 3, name: /Full Stack Java Development/i })).toBeInTheDocument();
  });

  it('renders Our Process section with all 7 phases and allows step navigation', () => {
    render(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 2, name: /Our Proven 7-Phase Engineering Lifecycle/i })).toBeInTheDocument();

    // Verify all 7 steps exist
    expect(screen.getAllByText(/Discovery/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Planning/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Design/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Development/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Testing/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Deployment/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Support/i)[0]).toBeInTheDocument();

    // Click Next Phase button
    const nextBtn = screen.getByRole('button', { name: /Next Phase/i });
    fireEvent.click(nextBtn);

    // Should move to Phase 02 (Planning)
    expect(screen.getByText(/PHASE 02/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Planning Phase/i })).toBeInTheDocument();
  });

  it('renders Engagement Models section with the 3 startup engagement choices', () => {
    render(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 2, name: /Tailored Engagement Models for Every Stage/i })).toBeInTheDocument();
    expect(screen.getByText(/Dedicated Engineering Team/i)).toBeInTheDocument();
    expect(screen.getByText(/Project-Based Delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Time & Materials \/ Agile Sprints/i)).toBeInTheDocument();
  });

  it('renders Industries We Serve section with target domain verticals', () => {
    render(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 2, name: /Industries We Empower/i })).toBeInTheDocument();
    expect(screen.getByText(/FinTech & Banking/i)).toBeInTheDocument();
    expect(screen.getByText(/HealthTech & Healthcare/i)).toBeInTheDocument();
    expect(screen.getByText(/E-Commerce & Retail Tech/i)).toBeInTheDocument();
  });

  it('renders Why Choose Us section, FAQ section, and Contact section', () => {
    render(<ServicesPage />);
    expect(screen.getByText(/WHY CHOOSE SPIRIT DATA SOLUTIONS/i)).toBeInTheDocument();
    expect(screen.getByText(/Have questions\?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
  });
});
