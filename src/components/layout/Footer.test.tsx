import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';
import { siteConfig } from '@/config/site';

describe('Footer Component', () => {
  it('renders the description', () => {
    render(<Footer />);
    expect(screen.getByText(siteConfig.footer.description)).toBeDefined();
  });

  it('renders hubs', () => {
    render(<Footer />);
    siteConfig.footer.hubs.forEach((hub) => {
      expect(screen.getByText(hub.name)).toBeDefined();
    });
  });

  it('renders quick navigation links', () => {
    render(<Footer />);
    siteConfig.footer.quickNav.forEach((nav) => {
      expect(screen.getByText(nav.label)).toBeDefined();
    });
  });
});
