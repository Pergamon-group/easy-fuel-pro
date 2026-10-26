import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ImageProps } from 'next/image';
import { Hero } from './Hero';

// Mock next/image to avoid src loading issues in test
vi.mock('next/image', () => ({
  default: ({ src, alt, ...rest }: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={typeof src === 'string' ? src : ''} alt={alt || ''} {...rest} />;
  },
}));

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { level: 1, name: /The Future of Smart Forecourt Management/i })
    ).toBeDefined();
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
