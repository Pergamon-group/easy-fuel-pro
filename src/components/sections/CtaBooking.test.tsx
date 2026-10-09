import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CtaBooking } from './CtaBooking';
import * as bookingActions from '@/app/actions/booking';

// Mock the server action
vi.mock('@/app/actions/booking', () => ({
  submitBookingForm: vi.fn(),
}));

describe('CtaBooking Component', () => {
  it('renders the booking form initially', () => {
    render(<CtaBooking />);
    expect(screen.getByText('Book Your EasyFuel Pro Demo Today')).toBeDefined();
    expect(screen.getByLabelText(/Full Name/i)).toBeDefined();
  });

  it('shows success state after valid submission', async () => {
    vi.mocked(bookingActions.submitBookingForm).mockResolvedValueOnce({ success: true });
    
    render(<CtaBooking />);
    
    const form = screen.getByRole('button', { name: /Book Live Forecourt Demo/i }).closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getByText('Demo Request Received')).toBeDefined();
    });
  });
});
