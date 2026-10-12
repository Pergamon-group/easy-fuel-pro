import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactPage from './page';

// Mock server actions
vi.mock('@/app/actions/booking', () => ({
  submitBookingForm: vi.fn(),
}));

describe('ContactPage Component (/contact Route)', () => {
  it('renders page heading with proposal Page 13 theme', () => {
    render(<ContactPage />);
    expect(screen.getAllByText(/let's get your fuel station etims ready/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/get in touch today/i)).toBeDefined();
  });

  it('renders verified contact channels from proposal', () => {
    render(<ContactPage />);
    expect(screen.getAllByText(/\+254 111 050 950|0111 050 950/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/info@pergamongroup\.com/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/pergamongroup\.com/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders regional branch hubs and showrooms', () => {
    render(<ContactPage />);
    expect(screen.getAllByText(/lonrho house/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/spring valley/i).length).toBeGreaterThanOrEqual(1);
  });
});
