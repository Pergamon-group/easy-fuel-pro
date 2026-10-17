'use client';

import { SURVEY_STEPS } from '@/data/survey-schema';

export interface WizardStepperProps {
  currentStepIndex: number;
  onStepClick?: (stepIndex: number) => void;
  maxAccessibleStep?: number;
}

export function WizardStepper({
  currentStepIndex,
  onStepClick,
  maxAccessibleStep = currentStepIndex,
}: WizardStepperProps) {
  const totalSteps = SURVEY_STEPS.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <nav
      className="w-full bg-surface rounded-2xl p-3 sm:p-4 border border-outline-variant/25 mb-6"
      aria-label="Survey Progress"
    >
      {/* Top row: Step text + Percentage */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary font-label-ui">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
          <span className="text-xs text-on-surface-variant font-body-md hidden sm:inline">
            &bull; {SURVEY_STEPS[currentStepIndex].title}
          </span>
        </div>
        <span className="text-xs font-semibold text-primary font-label-ui">
          {progressPercent}% Complete
        </span>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden mb-3 sm:mb-4">
        <div
          className="h-full bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Stepper items (Timeline on tablet & desktop) */}
      <ol className="grid grid-cols-5 gap-1.5 sm:gap-3 list-none p-0 m-0">
        {SURVEY_STEPS.map((step, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isCompleted = idx < currentStepIndex;
          const isClickable = onStepClick && idx <= maxAccessibleStep;

          return (
            <li key={step.id} className="flex flex-col items-center text-center">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(idx)}
                aria-current={isCurrent ? 'step' : undefined}
                className={`w-full flex flex-col items-center group transition-colors focus:outline-none ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-label-ui text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-primary text-on-primary'
                      : isCompleted
                      ? 'bg-primary/15 text-primary'
                      : 'bg-surface-container text-on-surface-variant/60'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                      check
                    </span>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <span
                  className={`mt-2 text-[10px] sm:text-xs font-label-ui hidden md:block line-clamp-1 max-w-[100px] ${
                    isCurrent
                      ? 'font-bold text-primary'
                      : isCompleted
                      ? 'text-on-surface font-medium'
                      : 'text-on-surface-variant/60'
                  }`}
                >
                  {step.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
