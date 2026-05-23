import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ScrollReveal from '../ScrollReveal';

// Mock framer-motion to simplify layout assertions
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, whileInView, viewport, transition, ...rest }) => (
      <div 
        data-testid="motion-div" 
        data-initial={JSON.stringify(initial)} 
        data-whileinview={JSON.stringify(whileInView)}
        data-viewport={JSON.stringify(viewport)}
        data-transition={JSON.stringify(transition)}
        {...rest}
      >
        {children}
      </div>
    ),
  },
}));

describe('ScrollReveal', () => {
  it('should render children without crashing', () => {
    render(<ScrollReveal>Test Child</ScrollReveal>);
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should apply custom animation configurations', () => {
    render(<ScrollReveal delay={0.5} duration={1.2} yOffset={50} blur={10}>Test</ScrollReveal>);
    const element = screen.getByTestId('motion-div');
    
    const initial = JSON.parse(element.getAttribute('data-initial') || '{}');
    const transition = JSON.parse(element.getAttribute('data-transition') || '{}');
    
    expect(initial.opacity).toBe(0);
    expect(initial.y).toBe(50);
    expect(initial.filter).toBe('blur(10px)');
    
    expect(transition.delay).toBe(0.5);
    expect(transition.duration).toBe(1.2);
  });
});
