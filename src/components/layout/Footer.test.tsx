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

  it('renders Pergamon Group main website logo above company name linked to pergamongroup.com', () => {
    render(<Footer />);
    const pergamonLogo = screen.getByAltText(/Pergamon Group Logo/i);
    expect(pergamonLogo).toBeDefined();
    expect(pergamonLogo.getAttribute('src')).toContain('pergamon-group-logo.png');

    const logoLink = pergamonLogo.closest('a');
    expect(logoLink).not.toBeNull();
    expect(logoLink?.getAttribute('href')).toBe('https://pergamongroup.com');
    expect(logoLink?.getAttribute('target')).toBe('_blank');
    expect(logoLink?.getAttribute('rel')).toContain('noopener');
  });

  it('renders Pergamon Group heading linked to pergamongroup.com', () => {
    render(<Footer />);
    const headingLink = screen.getByRole('link', { name: 'Pergamon Group' });
    expect(headingLink.getAttribute('href')).toBe('https://pergamongroup.com');
  });

  it('renders EasyFuel Pro domain easyfuelpro.com', () => {
    render(<Footer />);
    const domainLink = screen.getByRole('link', { name: /easyfuelpro\.com/i });
    expect(domainLink.getAttribute('href')).toBe('https://easyfuelpro.com');
  });

  it('renders copyright text with link for EasyFuel Pro by Pergamon Group', () => {
    render(<Footer />);
    const copyrightLink = screen.getByRole('link', { name: /EasyFuel Pro by Pergamon Group/i });
    expect(copyrightLink).toBeDefined();
    expect(copyrightLink.getAttribute('href')).toBe('https://pergamongroup.com');
  });
});
