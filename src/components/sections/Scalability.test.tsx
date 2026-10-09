import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Scalability } from './Scalability';
import { siteConfig } from '@/config/site';

describe('Scalability Component', () => {
  it('renders the main heading', () => {
    render(<Scalability />);
    expect(screen.getByText(siteConfig.scalability.headline)).toBeDefined();
  });

  it('renders the modes', () => {
    render(<Scalability />);
    siteConfig.scalability.modes.forEach((mode) => {
      expect(screen.getByText(mode.title)).toBeDefined();
    });
  });
});
