import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ValueProps } from './ValueProps';
import { siteConfig } from '@/config/site';

describe('ValueProps Component', () => {
  it('renders the main heading', () => {
    render(<ValueProps />);
    expect(screen.getByText(siteConfig.valueProps.headline)).toBeDefined();
  });

  it('renders all value proposition pillars', () => {
    render(<ValueProps />);
    siteConfig.valueProps.pillars.forEach((pillar) => {
      expect(screen.getByText(pillar.title)).toBeDefined();
    });
  });
});
