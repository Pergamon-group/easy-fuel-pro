import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ImageProps } from 'next/image';
import { siteConfig } from '@/config/site';
import { Partners, PartnerCard } from './Partners';

// Mock next/image to avoid src loading issues in test
vi.mock('next/image', () => ({
  default: ({ src, alt, ...rest }: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={typeof src === 'string' ? src : ''} alt={alt || ''} {...rest} />;
  },
}));

describe('Partners Component', () => {
  it('renders the section badge and headline', () => {
    render(<Partners />);
    expect(screen.getByText(siteConfig.partners.badge)).toBeDefined();
    expect(screen.getByText(siteConfig.partners.headline)).toBeDefined();
    expect(screen.getByText(siteConfig.partners.description)).toBeDefined();
  });

  it('renders retail petroleum networks and dealers', () => {
    render(<Partners />);
    expect(screen.getByText('Retail Petroleum Networks & Oil Marketing Companies')).toBeDefined();
    expect(screen.getByText('National Oil')).toBeDefined();
    expect(screen.getByText('Corporation of Kenya')).toBeDefined();
    expect(screen.getByText('TotalEnergies')).toBeDefined();
    expect(screen.getByText('Rubis Energy')).toBeDefined();
    expect(screen.getByText('Hass Petroleum')).toBeDefined();
    expect(screen.getByText('Shell Dealers')).toBeDefined();
    expect(screen.getByText('Vivo Energy')).toBeDefined();
  });

  it('renders certified forecourt hardware partners', () => {
    render(<Partners />);
    expect(screen.getByText('Forecourt Controllers, Dispensers & ATG Certified Partners')).toBeDefined();
    expect(screen.getByText('PTS-2 Controller')).toBeDefined();
    expect(screen.getByText('Incotex 600 ESD')).toBeDefined();
    expect(screen.getByText('Gilbarco Veeder-Root')).toBeDefined();
    expect(screen.getByText('Wayne Fueling')).toBeDefined();
    expect(screen.getByText('Dover Fueling Solutions')).toBeDefined();
    expect(screen.getByText('Tokheim')).toBeDefined();
    expect(screen.getByText('Tatsuno')).toBeDefined();
    expect(screen.getByText('Franklin Fueling')).toBeDefined();
    expect(screen.getByText('OPW')).toBeDefined();
    expect(screen.getByText('Bennett')).toBeDefined();
  });

  it('has anchor id="about" for navigation linkage', () => {
    const { container } = render(<Partners />);
    const section = container.querySelector('#about');
    expect(section).not.toBeNull();
  });

  it('scrolls the tracks incrementally when in the middle of the track', () => {
    render(<Partners />);

    const clientsTrack = screen.getByTestId('clients-track');
    const partnersTrack = screen.getByTestId('partners-track');

    const scrollByClients = vi.fn();
    const scrollByPartners = vi.fn();

    clientsTrack.scrollBy = scrollByClients;
    partnersTrack.scrollBy = scrollByPartners;

    Object.defineProperty(clientsTrack, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(clientsTrack, 'clientWidth', { value: 400, configurable: true });
    Object.defineProperty(clientsTrack, 'scrollLeft', { value: 200, writable: true, configurable: true });

    Object.defineProperty(partnersTrack, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(partnersTrack, 'clientWidth', { value: 400, configurable: true });
    Object.defineProperty(partnersTrack, 'scrollLeft', { value: 200, writable: true, configurable: true });

    const scrollClientsRightBtn = screen.getByRole('button', { name: /scroll clients right/i });
    fireEvent.click(scrollClientsRightBtn);
    expect(scrollByClients).toHaveBeenCalledWith({ left: 260, behavior: 'smooth' });

    const scrollClientsLeftBtn = screen.getByRole('button', { name: /scroll clients left/i });
    fireEvent.click(scrollClientsLeftBtn);
    expect(scrollByClients).toHaveBeenCalledWith({ left: -260, behavior: 'smooth' });

    const scrollPartnersRightBtn = screen.getByRole('button', { name: /scroll partners right/i });
    fireEvent.click(scrollPartnersRightBtn);
    expect(scrollByPartners).toHaveBeenCalledWith({ left: 260, behavior: 'smooth' });

    const scrollPartnersLeftBtn = screen.getByRole('button', { name: /scroll partners left/i });
    fireEvent.click(scrollPartnersLeftBtn);
    expect(scrollByPartners).toHaveBeenCalledWith({ left: -260, behavior: 'smooth' });
  });

  it('smoothly wraps to start when next chevron is clicked at the end of the track', () => {
    render(<Partners />);
    const clientsTrack = screen.getByTestId('clients-track');
    const scrollTo = vi.fn();
    clientsTrack.scrollTo = scrollTo;

    Object.defineProperty(clientsTrack, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(clientsTrack, 'clientWidth', { value: 400, configurable: true });
    Object.defineProperty(clientsTrack, 'scrollLeft', { value: 595, writable: true, configurable: true });

    const scrollRightBtn = screen.getByRole('button', { name: /scroll clients right/i });
    fireEvent.click(scrollRightBtn);

    expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
  });

  it('smoothly wraps to end when prev chevron is clicked at the start of the track', () => {
    render(<Partners />);
    const clientsTrack = screen.getByTestId('clients-track');
    const scrollTo = vi.fn();
    clientsTrack.scrollTo = scrollTo;

    Object.defineProperty(clientsTrack, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(clientsTrack, 'clientWidth', { value: 400, configurable: true });
    Object.defineProperty(clientsTrack, 'scrollLeft', { value: 0, writable: true, configurable: true });

    const scrollLeftBtn = screen.getByRole('button', { name: /scroll clients left/i });
    fireEvent.click(scrollLeftBtn);

    expect(scrollTo).toHaveBeenCalledWith({ left: 600, behavior: 'smooth' });
  });

  it('supports mouse drag-to-scroll and prevents unwanted text selection', () => {
    render(<Partners />);
    const clientsTrack = screen.getByTestId('clients-track');

    expect(clientsTrack.className).toContain('select-none');
    expect(clientsTrack.className).toContain('cursor-grab');

    let currentScrollLeft = 100;
    Object.defineProperty(clientsTrack, 'scrollLeft', {
      get: () => currentScrollLeft,
      set: (val: number) => {
        currentScrollLeft = val;
      },
      configurable: true,
    });
    Object.defineProperty(clientsTrack, 'offsetLeft', { value: 0, configurable: true });

    fireEvent.mouseDown(clientsTrack, { clientX: 200 });
    fireEvent.mouseMove(clientsTrack, { clientX: 150 });
    expect(clientsTrack.scrollLeft).toBeGreaterThan(100);

    fireEvent.mouseUp(clientsTrack);
  });
});

describe('PartnerCard Component Logo Installation & Fallback', () => {
  it('seamlessly renders logo image with grayscale and hover filter when logoSrc is provided', () => {
    render(
      <PartnerCard
        name="Rubis Energy"
        subtitle="East Africa"
        icon="speed"
        iconBg="bg-primary/10"
        iconColor="text-primary"
        logoSrc="/logos/rubis.png"
      />
    );

    const logo = screen.getByAltText('Rubis Energy logo');
    expect(logo).toBeDefined();
    expect(logo.getAttribute('src')).toBe('/logos/rubis.png');
    expect(logo.className).toContain('grayscale');
    expect(logo.className).toContain('opacity-70');
    expect(logo.className).toContain('group-hover:grayscale-0');
    expect(logo.className).toContain('group-hover:opacity-100');

    // Should not render the icon fallback
    expect(screen.queryByText('speed')).toBeNull();
  });

  it('applies dark background container when logoBg is dark', () => {
    render(
      <PartnerCard
        name="White Logo Partner"
        subtitle="Supplier"
        icon="star"
        iconBg="bg-primary/10"
        iconColor="text-primary"
        logoSrc="/logos/white_logo.png"
        logoBg="dark"
      />
    );

    const logo = screen.getByAltText('White Logo Partner logo');
    expect(logo).toBeDefined();
    const logoContainer = logo.parentElement;
    expect(logoContainer?.className).toContain('bg-[#111827]');
  });

  it('falls back to Material Symbol icon when logoSrc is omitted', () => {
    render(
      <PartnerCard
        name="National Oil"
        subtitle="Corporation of Kenya"
        icon="local_gas_station"
        iconBg="bg-[#006591]/10"
        iconColor="text-[#006591]"
      />
    );

    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('local_gas_station')).toBeDefined();
    expect(screen.getByText('National Oil')).toBeDefined();
  });
});
