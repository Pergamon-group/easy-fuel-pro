import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from './Hero';

// Mock next/image to avoid src loading issues in test
vi.mock('next/image', () => ({
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />);
    expect(screen.getByText('The Future of Smart Forecourt Management')).toBeDefined();
  });

  it('renders the call to action buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Request a Demo')).toBeDefined();
    expect(screen.getByText('Talk to Us')).toBeDefined();
  });

  it('renders the eTIMS readiness text', () => {
    render(<Hero />);
    expect(screen.getByText(/eTIMS-ready technology/i)).toBeDefined();
  });
});
