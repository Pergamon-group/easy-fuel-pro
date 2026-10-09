import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ComplianceSpotlight } from './ComplianceSpotlight';
import { siteConfig } from '@/config/site';

describe('ComplianceSpotlight Component', () => {
  it('renders the main heading', () => {
    render(<ComplianceSpotlight />);
    expect(screen.getByText(siteConfig.compliance.headline)).toBeDefined();
  });

  it('renders the KRA features', () => {
    render(<ComplianceSpotlight />);
    siteConfig.compliance.features.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeDefined();
    });
  });

  it('renders the receipt mockup details', () => {
    render(<ComplianceSpotlight />);
    expect(screen.getByText(siteConfig.compliance.receipt.cuSerial)).toBeDefined();
    expect(screen.getByText(siteConfig.compliance.receipt.total)).toBeDefined();
  });
});
