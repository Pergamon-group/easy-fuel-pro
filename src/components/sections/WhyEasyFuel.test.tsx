import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WhyEasyFuel } from './WhyEasyFuel';
import { siteConfig } from '@/config/site';

describe('WhyEasyFuel Component', () => {
  it('renders the main heading', () => {
    render(<WhyEasyFuel />);
    expect(screen.getByText(siteConfig.whyEasyFuel.headline)).toBeDefined();
  });

  it('renders the legacy vs modern comparison titles', () => {
    render(<WhyEasyFuel />);
    expect(screen.getByText(siteConfig.whyEasyFuel.comparison.legacy.title)).toBeDefined();
    expect(screen.getByText(siteConfig.whyEasyFuel.comparison.modern.title)).toBeDefined();
  });

  it('renders the benefits list', () => {
    render(<WhyEasyFuel />);
    expect(screen.getByText(siteConfig.whyEasyFuel.benefits[0])).toBeDefined();
  });
});
