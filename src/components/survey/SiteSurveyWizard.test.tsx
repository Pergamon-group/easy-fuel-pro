import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SiteSurveyWizard } from './SiteSurveyWizard';

// Mock server action
vi.mock('@/app/actions/survey', () => ({
  submitSiteSurvey: vi.fn(),
}));

describe('SiteSurveyWizard Component (TDD)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders Step 1 (Business & Contact) initially', () => {
    render(<SiteSurveyWizard />);
    expect(screen.getByText('1. Business & Contact Information')).toBeDefined();
    expect(screen.getByLabelText(/Company \/ Business Name/i)).toBeDefined();
  });

  it('blocks advancing when required Step 1 fields are empty', () => {
    render(<SiteSurveyWizard />);
    const nextBtn = screen.getByRole('button', { name: /Continue to Survey Scheduling/i });
    fireEvent.click(nextBtn);

    // Stays on Step 1 and displays error
    expect(screen.getByText('1. Business & Contact Information')).toBeDefined();
    expect(screen.getByText('Customer name is required')).toBeDefined();
  });

  it('advances to Step 2 when Step 1 is filled with valid data', () => {
    render(<SiteSurveyWizard />);

    fireEvent.change(screen.getByLabelText(/Company \/ Business Name/i), {
      target: { value: 'Delta Energy' },
    });
    fireEvent.change(screen.getByLabelText(/Site \/ Station Name/i), {
      target: { value: 'Delta Westlands' },
    });
    fireEvent.change(screen.getByLabelText(/Physical Location/i), {
      target: { value: 'Waiyaki Way' },
    });
    fireEvent.change(screen.getByLabelText(/County/i), {
      target: { value: 'Nairobi' },
    });
    fireEvent.change(screen.getByLabelText(/KRA PIN/i), {
      target: { value: 'P051234567A' },
    });
    fireEvent.change(screen.getByLabelText(/Contact Person Name/i), {
      target: { value: 'James Mwangi' },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '+254712345678' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'james@delta.co.ke' },
    });

    const nextBtn = screen.getByRole('button', { name: /Continue to Survey Scheduling/i });
    fireEvent.click(nextBtn);

    // Advances to Step 2
    expect(screen.getByText('2. Preferred Survey Scheduling')).toBeDefined();
  });
});
