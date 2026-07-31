import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import WhyChooseUs from '../about/WhyChooseUs';
import ServicesSnapshot from '../about/ServicesSnapshot';
import MeetOurTeam from '../about/MeetOurTeam';
import FAQSection from '../about/FAQSection';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to} data-testid="router-link">{children}</a>,
}));

describe('About Page New Sections', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('WhyChooseUs Component', () => {
    it('should render section title and enterprise description', () => {
      render(<WhyChooseUs />);
      expect(screen.getByText(/WHY CHOOSE SPIRIT DATA SOLUTIONS/i)).toBeInTheDocument();
      expect(screen.getByText(/Engineering Standards Built for/i)).toBeInTheDocument();
    });

    it('should render reason cards correctly', () => {
      render(<WhyChooseUs />);
      expect(screen.getByText('Enterprise Engineering Precision')).toBeInTheDocument();
      expect(screen.getByText('Agile Velocity & Transparency')).toBeInTheDocument();
      expect(screen.getByText('End-to-End Delivery Ownership')).toBeInTheDocument();
    });
  });

  describe('ServicesSnapshot Component', () => {
    it('should render header and small service cards', () => {
      render(<ServicesSnapshot />);
      expect(screen.getByText(/SERVICES SNAPSHOT/i)).toBeInTheDocument();
      expect(screen.getByText('Full Stack Web Apps')).toBeInTheDocument();
      expect(screen.getByText('Java Microservices')).toBeInTheDocument();
      expect(screen.getByText('Selenium QA Automation')).toBeInTheDocument();
    });
  });

  describe('MeetOurTeam Component', () => {
    it('should render header and team member cards', () => {
      render(<MeetOurTeam />);
      expect(screen.getByText(/OUR PEOPLE & LEADERSHIP/i)).toBeInTheDocument();
      expect(screen.getByText('Sardar Sadiq')).toBeInTheDocument();
      expect(screen.getByText('Elena Rostova')).toBeInTheDocument();
    });

    it('should filter members by tab selection', () => {
      render(<MeetOurTeam />);
      const leadershipTab = screen.getByRole('button', { name: 'Leadership' });
      fireEvent.click(leadershipTab);
      expect(screen.getByText('Sardar Sadiq')).toBeInTheDocument();
    });
  });

  describe('FAQSection Component', () => {
    it('should render heading and question items', () => {
      render(<FAQSection />);
      expect(screen.getByText(/Have questions\?/i)).toBeInTheDocument();
      expect(screen.getByText(/We got answers/i)).toBeInTheDocument();
      expect(screen.getByText(/Are Spirit Data Solutions' software systems tailored for our specific business needs\?/i)).toBeInTheDocument();
    });

    it('should expand FAQ answer on click', () => {
      render(<FAQSection />);
      const questionBtn = screen.getByText(/What software development methodology does your team follow\?/i);
      fireEvent.click(questionBtn);
      expect(screen.getByText(/We follow a disciplined Agile Scrum framework/i)).toBeInTheDocument();
    });
  });
});
