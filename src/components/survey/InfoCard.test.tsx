import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InfoCard } from './InfoCard';

describe('InfoCard Component (TDD)', () => {
  it('renders title and collapsed content by default', () => {
    render(
      <InfoCard title="VSCU vs OSCU Explained">
        <p>Virtual Sales Control Unit is software-based.</p>
      </InfoCard>
    );

    expect(screen.getByText('VSCU vs OSCU Explained')).toBeDefined();
    expect(screen.queryByText(/Virtual Sales Control Unit is software-based/)).toBeNull();
  });

  it('toggles expansion when clicking the button', () => {
    render(
      <InfoCard title="VSCU vs OSCU Explained">
        <p>Virtual Sales Control Unit is software-based.</p>
      </InfoCard>
    );

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText(/Virtual Sales Control Unit is software-based/)).toBeDefined();

    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders initially open if defaultExpanded is true', () => {
    render(
      <InfoCard title="Pulse Output" defaultExpanded={true}>
        <p>Pulse outputs transmit signal ticks.</p>
      </InfoCard>
    );

    expect(screen.getByText(/Pulse outputs transmit signal ticks/)).toBeDefined();
  });
});
