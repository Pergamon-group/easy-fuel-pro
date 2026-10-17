import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitBookingForm } from './booking';
import * as mailLib from '@/lib/mail';

vi.mock('@/lib/mail', () => ({
  sendBookingEmail: vi.fn(),
}));

describe('Booking Server Action (TDD)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects incomplete form submissions', async () => {
    const formData = new FormData();
    formData.append('name', 'John');
    // Missing business, pumps, phone, location

    const result = await submitBookingForm(formData);
    expect(result.success).toBe(false);
    expect(result.error).toContain('required');
    expect(mailLib.sendBookingEmail).not.toHaveBeenCalled();
  });

  it('dispatches email when form data is complete', async () => {
    vi.mocked(mailLib.sendBookingEmail).mockResolvedValueOnce({ success: true });

    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('business', 'Total Westlands');
    formData.append('pumps', '4');
    formData.append('phone', '+254712345678');
    formData.append('location', 'Westlands, Nairobi');
    formData.append('details', 'Looking for eTIMS integration');

    const result = await submitBookingForm(formData);
    expect(result.success).toBe(true);
    expect(mailLib.sendBookingEmail).toHaveBeenCalledWith({
      name: 'John Doe',
      business: 'Total Westlands',
      pumps: '4',
      phone: '+254712345678',
      location: 'Westlands, Nairobi',
      details: 'Looking for eTIMS integration',
    });
  });

  it('handles email dispatch failure gracefully', async () => {
    vi.mocked(mailLib.sendBookingEmail).mockResolvedValueOnce({
      success: false,
      error: 'SMTP Connection Refused',
    });

    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('business', 'Total Westlands');
    formData.append('pumps', '4');
    formData.append('phone', '+254712345678');
    formData.append('location', 'Westlands, Nairobi');

    const result = await submitBookingForm(formData);
    expect(result.success).toBe(false);
    expect(result.error).toBe('SMTP Connection Refused');
  });
});
