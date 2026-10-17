'use server';

import { sendBookingEmail, BookingLeadPayload } from '@/lib/mail';

export interface BookingResponse {
  success: boolean;
  error?: string;
}

/**
 * Handles demo booking requests submitted from the CTA section.
 * Validates mandatory fields and dispatches real notification emails via Nodemailer SMTP.
 */
export async function submitBookingForm(formData: FormData): Promise<BookingResponse> {
  const name = formData.get('name')?.toString()?.trim();
  const business = formData.get('business')?.toString()?.trim();
  const phone = formData.get('phone')?.toString()?.trim();
  const email = formData.get('email')?.toString()?.trim();
  const subject = formData.get('subject')?.toString()?.trim();
  const details = formData.get('details')?.toString()?.trim();
  const pumps = formData.get('pumps')?.toString()?.trim();
  const location = formData.get('location')?.toString()?.trim();

  if (!name || !business || !phone) {
    return { success: false, error: 'All fields marked with an asterisk are required.' };
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please provide a valid email address.' };
  }

  try {
    const payload: BookingLeadPayload = {
      name,
      business,
      phone,
    };
    if (email) payload.email = email;
    if (subject) payload.subject = subject;
    if (details) payload.details = details;
    if (pumps) payload.pumps = pumps;
    if (location) payload.location = location;

    const result = await sendBookingEmail(payload);

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Failed to dispatch notification email. Please try again.',
      };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred.';
    console.error('[Booking Action Error]', errorMsg);
    return { success: false, error: 'Unable to process your request at this time. Please try again later.' };
  }
}
