import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FaqPage, { metadata } from './page';
import { pricingConfig } from '@/config/pricing';

describe('FaqPage Route Component (/faq)', () => {
  it('defines comprehensive SEO metadata and canonical URL', () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
    expect(metadata.alternates?.canonical).toContain('/faq');
  });

  it('renders page heading and introductory text', () => {
    render(<FaqPage />);
    expect(
      screen.getAllByRole('heading', { level: 1, name: /frequently asked questions/i }).length
    ).toBeGreaterThan(0);
    expect(screen.getByText(/knowledge base & technical faq/i)).toBeDefined();
  });

  it('renders all key forecourt questions with centralized pricing figures', () => {
    render(<FaqPage />);
    expect(
      screen.getByText(/how does easyfuel pro achieve kra etims compliance\?/i)
    ).toBeDefined();

    const questionBtn = screen.getByRole('button', {
      name: /what is the difference between semi-automated and full automation\?/i,
    });
    fireEvent.click(questionBtn);

    // Check that centralized numbers are rendered in the answers
    expect(screen.getAllByText(new RegExp(pricingConfig.options.semiAutomated.totalAmountOnly, 'i')).length).toBeGreaterThan(0);
  });

  it('filters questions via interactive search input', () => {
    render(<FaqPage />);
    const searchInput = screen.getByPlaceholderText(/search by topic/i);

    fireEvent.change(searchInput, { target: { value: 'PTS-2' } });
    expect(screen.getByText(/how does easyfuel pro achieve kra etims compliance\?/i)).toBeDefined();

    fireEvent.change(searchInput, { target: { value: 'non-existent-search-term-xyz' } });
    expect(screen.getByText(/no matching answers found/i)).toBeDefined();
  });

  it('embeds JSON-LD FAQPage schema for search engines', () => {
    const { container } = render(<FaqPage />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const json = JSON.parse(script?.innerHTML || '{}');
    expect(json['@type']).toBe('FAQPage');
    expect(json.mainEntity.length).toBeGreaterThanOrEqual(4);
  });
});
