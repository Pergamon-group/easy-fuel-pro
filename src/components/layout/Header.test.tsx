import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';
import { siteConfig } from '@/config/site';

describe('Header Component', () => {
  it('renders the header with the logo', () => {
    render(<Header />);
    expect(screen.getByAltText(siteConfig.logo.alt)).toBeDefined();
  });

  it('renders the navigation links and desktop CTA', () => {
    render(<Header />);
    expect(screen.getByText('Solutions')).toBeDefined();
    const demoLink = screen.getByText('Request a Demo');
    expect(demoLink).toBeDefined();
    // Verify it is hidden on mobile screens so it does not cram the menu
    expect(demoLink.className).toContain('hidden sm:inline-flex');
  });

  it('renders full mobile top banner for booking a demo on mobile', () => {
    render(<Header />);
    const banner = screen.getByTestId('mobile-top-banner');
    expect(banner).toBeDefined();
    expect(banner.className).toContain('sm:hidden');
    expect(within(banner).getByText('Book a Demo')).toBeDefined();
  });

  it('renders the mobile menu toggle button with defined text initially showing Menu', () => {
    render(<Header />);
    const toggleBtn = screen.getByTestId('mobile-menu-toggle');
    expect(toggleBtn).toBeDefined();
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    expect(within(toggleBtn).getByText('Menu')).toBeDefined();
    expect(screen.queryByTestId('mobile-navigation-drawer')).toBeNull();
  });

  it('opens mobile drawer and updates toggle button text to Close', () => {
    render(<Header />);
    const toggleBtn = screen.getByTestId('mobile-menu-toggle');
    fireEvent.click(toggleBtn);

    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');
    expect(within(toggleBtn).getByText('Close')).toBeDefined();

    const drawer = screen.getByTestId('mobile-navigation-drawer');
    expect(drawer).toBeDefined();

    const mobilePhoneText = screen.getByTestId('mobile-phone-header-text');
    expect(mobilePhoneText).toBeDefined();
    expect(mobilePhoneText.textContent).toContain(siteConfig.phone);

    const mobileWhatsappText = screen.getByTestId('mobile-whatsapp-header-text');
    expect(mobileWhatsappText).toBeDefined();
    expect(mobileWhatsappText.textContent).toContain(siteConfig.whatsapp);

    const drawerScope = within(drawer);
    expect(drawerScope.getByText('Site Navigation')).toBeDefined();
    expect(drawerScope.getByText(/EasyFuel Pro/i)).toBeDefined();
    expect(drawerScope.getByText('Architecture')).toBeDefined();
    expect(drawerScope.getByText('Partners')).toBeDefined();
    expect(drawerScope.getByText('Pricing')).toBeDefined();
    expect(drawerScope.getByText('FAQ')).toBeDefined();
    expect(drawerScope.getByText('Contact')).toBeDefined();
  });

  it('toggles solutions sub-items inside mobile drawer when accordion is clicked', () => {
    render(<Header />);
    const toggleBtn = screen.getByTestId('mobile-menu-toggle');
    fireEvent.click(toggleBtn);

    const accordionBtn = screen.getByTestId('mobile-solutions-accordion');
    expect(accordionBtn.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText('Pump Automation')).toBeNull();

    // Open solutions accordion
    fireEvent.click(accordionBtn);
    expect(accordionBtn.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Forecourt Management')).toBeDefined();
    expect(screen.getByText('Pump Automation')).toBeDefined();
    expect(screen.getByText('eTIMS Compliance')).toBeDefined();
    expect(screen.getByText('Analytics & Variance')).toBeDefined();

    // Close solutions accordion
    fireEvent.click(accordionBtn);
    expect(accordionBtn.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText('Pump Automation')).toBeNull();
  });

  it('closes mobile drawer when the toggle button (in Close state) is clicked', () => {
    render(<Header />);
    const toggleBtn = screen.getByTestId('mobile-menu-toggle');
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId('mobile-navigation-drawer')).toBeDefined();
    expect(within(toggleBtn).getByText('Close')).toBeDefined();

    // Click toggle button again (showing Close)
    fireEvent.click(toggleBtn);

    expect(screen.queryByTestId('mobile-navigation-drawer')).toBeNull();
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    expect(within(toggleBtn).getByText('Menu')).toBeDefined();
  });

  it('closes mobile drawer when any navigation link is clicked', () => {
    render(<Header />);
    const toggleBtn = screen.getByTestId('mobile-menu-toggle');
    fireEvent.click(toggleBtn);

    const drawer = screen.getByTestId('mobile-navigation-drawer');
    expect(drawer).toBeDefined();

    // Click FAQ link in drawer
    const faqLink = within(drawer).getByRole('link', { name: /FAQ/i });
    fireEvent.click(faqLink);

    expect(screen.queryByTestId('mobile-navigation-drawer')).toBeNull();
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
  });
});
