import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Footer from '../Footer';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to} data-testid="router-link">{children}</a>,
}));

describe('Footer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render brand logo and title correctly', () => {
    render(<Footer />);
    expect(screen.getByAltText('Spirit Data Logo')).toBeInTheDocument();
    expect(screen.getByText('Spirit')).toBeInTheDocument();
  });

  it('should render current year correctly in copyright text', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('should trigger scrollIntoView when service or project buttons are clicked', () => {
    const scrollMock = vi.fn();
    
    // Mock document.getElementById
    const mockElement = { scrollIntoView: scrollMock };
    const getElementSpy = vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<Footer />);
    
    const servicesButton = screen.getByRole('button', { name: /services/i });
    fireEvent.click(servicesButton);

    expect(getElementSpy).toHaveBeenCalledWith('services');
    expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
