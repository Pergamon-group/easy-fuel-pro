import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeatureGrid } from './FeatureGrid';
import { siteConfig } from '@/config/site';

describe('FeatureGrid Component', () => {
  it('renders the main heading', () => {
    render(<FeatureGrid />);
    expect(screen.getByText(siteConfig.featuresGrid.headline)).toBeDefined();
  });

  it('renders all feature titles', () => {
    render(<FeatureGrid />);
    siteConfig.featuresGrid.features.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeDefined();
    });
  });

  it('renders visual elements specific to features', () => {
    render(<FeatureGrid />);
    // Check for some known text in visuals
    expect(screen.getByText('Throughput / Hr')).toBeDefined();
    expect(screen.getByText('M-PESA')).toBeDefined();
    expect(screen.getByText('Variance: 0.00 L')).toBeDefined();
  });
});
