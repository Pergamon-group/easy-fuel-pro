import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CtaBooking } from './CtaBooking';
import * as bookingActions from '@/app/actions/booking';

// Mock the server action
vi.mock('@/app/actions/booking', () => ({
  submitBookingForm: vi.fn(),
}));

describe('CtaBooking Component', () => {
  it('renders the prominent Site Survey gateway and General Inquiry form', () => {
    render(<CtaBooking />);
    // Site Survey gateway
    expect(screen.getByText('Full Forecourt Site Survey & eTIMS Readiness Audit')).toBeDefined();
    expect(screen.getByText('Start Forecourt Survey')).toBeDefined();

    // General Inquiry form
    expect(screen.getByText('Send a Message or Demo Request')).toBeDefined();
    expect(screen.getByLabelText(/Full Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Fuel Station \/ Company Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Phone Number/i)).toBeDefined();
  });

  it('shows success state after valid submission', async () => {
    vi.mocked(bookingActions.submitBookingForm).mockResolvedValueOnce({ success: true });

    render(<CtaBooking />);

    const form = screen.getByRole('button', { name: /Submit Inquiry/i }).closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getByText('Inquiry Received')).toBeDefined();
    });
  });
});
