import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PricingStructure } from './PricingStructure';

describe('PricingStructure Component', () => {
  it('renders section headline and tentative disclaimer badge', () => {
    render(<PricingStructure />);
    expect(screen.getByText(/pricing structure/i)).toBeDefined();
    expect(screen.getByText(/indicative pricing & forecourt options/i)).toBeDefined();
  });

  it('renders Option 1 Semi-Automated and Option 2 Full Automation', () => {
    render(<PricingStructure />);
    expect(screen.getByText('Option 1: Semi-Automated')).toBeDefined();
    expect(screen.getByText('Option 2: Full Automation')).toBeDefined();
    expect(screen.getByText(/109,500/i)).toBeDefined();
    expect(screen.getByText(/269,500/i)).toBeDefined();
  });

  it('clearly highlights that civil works are based on site survey', () => {
    render(<PricingStructure />);
    const siteSurveyElements = screen.getAllByText(/based on site survey/i);
    expect(siteSurveyElements.length).toBeGreaterThanOrEqual(2);
  });

  it('prominently displays disclaimers that prices are tentative and subject to change', () => {
    render(<PricingStructure />);
    expect(
      screen.getByText(/all prices are tentative and indicative/i)
    ).toBeDefined();
    expect(
      screen.getAllByText(/annual maintenance contract \(amc\) payable from year 2/i).length
    ).toBeGreaterThanOrEqual(1);
  });

  it('has anchor link #pricing for navigation', () => {
    const { container } = render(<PricingStructure />);
    const section = container.querySelector('#pricing');
    expect(section).not.toBeNull();
  });
});
