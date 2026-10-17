import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WizardStepper } from './WizardStepper';

describe('WizardStepper Component (TDD)', () => {
  it('renders step 1 as active and progress percentage at 20%', () => {
    render(<WizardStepper currentStepIndex={0} />);
    expect(screen.getByText('Step 1 of 5')).toBeDefined();
    expect(screen.getByText('20% Complete')).toBeDefined();
  });

  it('indicates current step with aria-current="step"', () => {
    render(<WizardStepper currentStepIndex={2} />);
    const currentBtn = screen.getAllByRole('button')[2];
    expect(currentBtn.getAttribute('aria-current')).toBe('step');
  });

  it('allows clicking previous completed steps', () => {
    const handleStepClick = vi.fn();
    render(
      <WizardStepper
        currentStepIndex={2}
        onStepClick={handleStepClick}
        maxAccessibleStep={2}
      />
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); // Click Step 1
    expect(handleStepClick).toHaveBeenCalledWith(0);
  });

  it('disables clicking future inaccessible steps', () => {
    const handleStepClick = vi.fn();
    render(
      <WizardStepper
        currentStepIndex={1}
        onStepClick={handleStepClick}
        maxAccessibleStep={1}
      />
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[3]); // Step 4 (future)
    expect(handleStepClick).not.toHaveBeenCalled();
  });
});
