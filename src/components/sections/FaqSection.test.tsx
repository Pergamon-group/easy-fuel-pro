import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FaqSection } from './FaqSection';

describe('FaqSection Component (Forecourt & eTIMS FAQ for SEO)', () => {
  it('renders section title and badge', () => {
    render(<FaqSection />);
    expect(screen.getByText(/frequently asked questions/i)).toBeDefined();
    expect(screen.getByText(/clarity & compliance/i)).toBeDefined();
  });

  it('renders key forecourt compliance and automation questions', () => {
    render(<FaqSection />);
    expect(
      screen.getByText(/how does easyfuel pro achieve kra etims compliance\?/i)
    ).toBeDefined();
    expect(
      screen.getByText(/what is the difference between semi-automated and full automation\?/i)
    ).toBeDefined();
    expect(
      screen.getByText(/why are civil works pricing based on a site survey\?/i)
    ).toBeDefined();
    expect(
      screen.getByText(/which dispenser and atg probe brands are supported\?/i)
    ).toBeDefined();
  });

  it('toggles answer visibility on question click', () => {
    render(<FaqSection />);
    const questionButton = screen.getByRole('button', {
      name: /why are civil works pricing based on a site survey\?/i,
    });
    fireEvent.click(questionButton);

    expect(screen.getByText(/station layouts differ in trenching distance/i)).toBeDefined();
  });

  it('includes JSON-LD FAQPage structured data for rich snippet SEO', () => {
    const { container } = render(<FaqSection />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const json = JSON.parse(script?.innerHTML || '{}');
    expect(json['@type']).toBe('FAQPage');
    expect(json.mainEntity.length).toBeGreaterThanOrEqual(4);
  });

  it('has anchor link #faq for navigation', () => {
    const { container } = render(<FaqSection />);
    const section = container.querySelector('#faq');
    expect(section).not.toBeNull();
  });
});
