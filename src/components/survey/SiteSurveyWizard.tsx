'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  SiteSurveyData,
  createDefaultSurveyData,
  validateBusinessInfo,
  validateScheduling,
  validateInfrastructure,
  validateCompliance,
  validateReadiness,
  ValidationError,
  SURVEY_STEPS,
} from '@/data/survey-schema';
import { useAutoSave } from './useAutoSave';
import { WizardStepper } from './WizardStepper';
import { BusinessInfoStep } from './steps/BusinessInfoStep';
import { SchedulingStep } from './steps/SchedulingStep';
import { InfrastructureStep } from './steps/InfrastructureStep';
import { ComplianceConnectivityStep } from './steps/ComplianceConnectivityStep';
import { ReviewSubmitStep } from './steps/ReviewSubmitStep';
import { submitSiteSurvey } from '@/app/actions/survey';

export interface SiteSurveyWizardProps {
  onSwitchToOffline?: () => void;
}

export function SiteSurveyWizard({ onSwitchToOffline }: SiteSurveyWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [maxAccessibleStep, setMaxAccessibleStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SiteSurveyData>(createDefaultSurveyData);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [stepErrors, setStepErrors] = useState<ValidationError[]>([]);
  const [submissionSuccessCode, setSubmissionSuccessCode] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // On-device autosave hook
  const { hasSavedDraft, draftData, loadDraft, clearDraft, dismissDraftPrompt } =
    useAutoSave(surveyData);

  const handleResumeDraft = () => {
    const loaded = loadDraft();
    if (loaded) {
      setSurveyData(loaded);
      // Determine furthest filled step
      let furthest = 0;
      if (validateBusinessInfo(loaded.businessInfo).length === 0) furthest = 1;
      if (furthest === 1 && validateScheduling(loaded.scheduling).length === 0) furthest = 2;
      if (furthest === 2 && validateInfrastructure(loaded.infrastructure).length === 0) furthest = 3;
      if (furthest === 3 && validateCompliance(loaded.compliance).length === 0) furthest = 4;
      setMaxAccessibleStep(furthest);
      setCurrentStepIndex(furthest);
    }
  };

  const handleStartFresh = () => {
    clearDraft();
    setSurveyData(createDefaultSurveyData());
    setCurrentStepIndex(0);
    setMaxAccessibleStep(0);
  };

  // Validation per step
  const validateCurrentStep = (): boolean => {
    let errors: ValidationError[] = [];

    switch (currentStepIndex) {
      case 0:
        errors = validateBusinessInfo(surveyData.businessInfo);
        break;
      case 1:
        errors = validateScheduling(surveyData.scheduling);
        break;
      case 2:
        errors = validateInfrastructure(surveyData.infrastructure);
        break;
      case 3:
        errors = validateCompliance(surveyData.compliance);
        break;
      case 4:
        errors = validateReadiness(surveyData.readiness);
        break;
      default:
        break;
    }

    setStepErrors(errors);
    return errors.length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setStepErrors([]);
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setMaxAccessibleStep((prev) => Math.max(prev, nextIndex));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setStepErrors([]);
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepJump = (index: number) => {
    if (index <= maxAccessibleStep) {
      setStepErrors([]);
      setCurrentStepIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (!validateCurrentStep()) return;

    setGlobalError(null);
    startTransition(async () => {
      try {
        const payload = new FormData();
        payload.append('surveyData', JSON.stringify(surveyData));

        selectedImages.forEach((img) => {
          payload.append('images', img);
        });

        const result = await submitSiteSurvey(payload);

        if (result.success && result.referenceCode) {
          clearDraft();
          setSubmissionSuccessCode(result.referenceCode);
        } else {
          setGlobalError(result.error || 'Failed to submit site survey. Please check all fields.');
          if (result.errors) setStepErrors(result.errors);
        }
      } catch {
        setGlobalError('A network error occurred while submitting. Please try again.');
      }
    });
  };

  // Success Screen
  if (submissionSuccessCode) {
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-surface-container-low border border-primary/20 text-center shadow-lg animate-fade-in">
        <span className="material-symbols-outlined text-[64px] text-primary mb-3">
          check_circle
        </span>
        <h3 className="text-2xl font-bold font-headline-sm text-on-surface">
          Site Survey Received!
        </h3>
        <p className="text-sm font-body-md text-on-surface-variant mt-2 max-w-md mx-auto">
          Thank you for completing the technical forecourt audit for{' '}
          <strong>{surveyData.businessInfo.siteName || 'your station'}</strong>.
        </p>

        <div className="my-6 p-4 rounded-xl bg-surface border border-primary/20 max-w-xs mx-auto">
          <span className="text-xs uppercase font-bold text-primary font-label-ui">
            Reference Tracking ID
          </span>
          <div className="text-xl font-bold font-mono text-on-surface mt-1">
            {submissionSuccessCode}
          </div>
        </div>

        <div className="text-xs text-on-surface-variant max-w-md mx-auto space-y-2 text-left bg-surface/50 p-4 rounded-xl border border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
            <span>Confirmation sent to: <strong>{surveyData.businessInfo.contactEmail}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">engineering</span>
            <span>Pergamon deployment team assigned for review</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
            <span>Requested dates: <strong>{surveyData.scheduling.preferredDates.join(', ') || 'Flexible'}</strong></span>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="py-2.5 px-6 rounded-xl bg-primary text-on-primary font-bold text-xs font-label-ui hover:bg-tertiary transition-colors shadow-sm"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Draft Resume Banner */}
      {hasSavedDraft && draftData && (
        <div className="p-4 rounded-2xl bg-tertiary/10 border border-tertiary/30 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary text-[24px]">restore_page</span>
            <div className="text-xs">
              <span className="font-bold text-on-surface font-headline-sm">Unsaved Survey Progress Found:</span>{' '}
              <span className="text-on-surface-variant">
                Continue from where you left off for &quot;{draftData.businessInfo.siteName || draftData.businessInfo.customerName || 'your station'}&quot;?
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleResumeDraft}
              className="py-1.5 px-3 rounded-lg bg-tertiary text-on-tertiary text-xs font-bold font-label-ui hover:bg-tertiary/90 transition-colors shadow-xs"
            >
              Resume Draft
            </button>
            <button
              type="button"
              onClick={handleStartFresh}
              className="py-1.5 px-3 rounded-lg bg-surface text-on-surface text-xs font-medium border border-outline-variant/40 hover:bg-surface-container transition-colors"
            >
              Start Fresh
            </button>
            <button
              type="button"
              onClick={dismissDraftPrompt}
              className="text-on-surface-variant hover:text-on-surface p-1"
              aria-label="Dismiss banner"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Stepper Progress */}
      <WizardStepper
        currentStepIndex={currentStepIndex}
        onStepClick={handleStepJump}
        maxAccessibleStep={maxAccessibleStep}
      />

      {/* Global Error Banner */}
      {globalError && (
        <div className="p-4 rounded-2xl bg-error/10 border border-error/30 text-error text-xs font-body-md flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[20px]">error</span>
          <span>{globalError}</span>
        </div>
      )}

      {/* Active Wizard Step Form Container */}
      <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-surface border border-outline-variant/25">
        {currentStepIndex === 0 && (
          <BusinessInfoStep
            data={surveyData.businessInfo}
            onChange={(updated) =>
              setSurveyData((prev) => ({
                ...prev,
                businessInfo: { ...prev.businessInfo, ...updated },
              }))
            }
            errors={stepErrors}
          />
        )}

        {currentStepIndex === 1 && (
          <SchedulingStep
            data={surveyData.scheduling}
            onChange={(updated) =>
              setSurveyData((prev) => ({
                ...prev,
                scheduling: { ...prev.scheduling, ...updated },
              }))
            }
            errors={stepErrors}
          />
        )}

        {currentStepIndex === 2 && (
          <InfrastructureStep
            data={surveyData.infrastructure}
            onChange={(updated) =>
              setSurveyData((prev) => ({
                ...prev,
                infrastructure: { ...prev.infrastructure, ...updated },
              }))
            }
            errors={stepErrors}
          />
        )}

        {currentStepIndex === 3 && (
          <ComplianceConnectivityStep
            data={surveyData.compliance}
            onChange={(updated) =>
              setSurveyData((prev) => ({
                ...prev,
                compliance: { ...prev.compliance, ...updated },
              }))
            }
            errors={stepErrors}
          />
        )}

        {currentStepIndex === 4 && (
          <ReviewSubmitStep
            survey={surveyData}
            onReadinessChange={(updated) =>
              setSurveyData((prev) => ({
                ...prev,
                readiness: { ...prev.readiness, ...updated },
              }))
            }
            selectedFiles={selectedImages}
            onFilesChange={setSelectedImages}
            errors={stepErrors}
            isSubmitting={isPending}
            onSubmit={handleSubmit}
          />
        )}

        {/* Step Navigation Bar */}
        <div className="mt-8 pt-6 border-t border-outline-variant/30 space-y-3">
          {/* Navigation Context Line */}
          {currentStepIndex < SURVEY_STEPS.length - 1 && (
            <div className="flex items-center justify-between text-xs font-label-ui select-none px-1">
              <span className="text-on-surface-variant font-medium text-[11px]">
                Step {currentStepIndex + 1} of {SURVEY_STEPS.length}:{' '}
                <strong className="text-on-surface font-semibold">
                  {SURVEY_STEPS[currentStepIndex].title}
                </strong>
              </span>

              <div className="flex items-start justify-end text-end gap-1.5 text-[11px] text-on-surface-variant">
                <span className="text-on-surface-variant/70">Next:</span>
                <span className="font-bold text-primary">
                  {SURVEY_STEPS[currentStepIndex + 1].title}
                </span>
                <span className="material-symbols-outlined text-primary text-[14px]">arrow_forward</span>
              </div>
            </div>
          )}

          {/* Symmetrical Button Row: Both buttons aligned on the exact same baseline */}
          <div className="flex items-center justify-between gap-3">
            <div>
              {currentStepIndex > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  aria-label="Previous Step"
                  className="min-h-[44px] py-2.5 px-5 rounded-xl bg-surface border border-outline-variant/60 text-on-surface font-semibold text-xs font-label-ui hover:bg-surface-container hover:border-outline-variant active:scale-[0.98] transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Previous Step</span>
                </button>
              ) : onSwitchToOffline ? (
                <button
                  type="button"
                  onClick={onSwitchToOffline}
                  className="min-h-[44px] text-xs text-primary font-semibold hover:underline flex items-center gap-1.5 font-label-ui cursor-pointer py-2 px-1"
                >
                  <span className="material-symbols-outlined text-[18px]">file_download</span>
                  <span>Switch to Offline PDF Download</span>
                </button>
              ) : (
                <div className="min-h-[44px]" />
              )}
            </div>

            <div>
              {currentStepIndex < SURVEY_STEPS.length - 1 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  aria-label={`Continue to ${SURVEY_STEPS[currentStepIndex + 1].title}`}
                  className="min-h-[44px] min-w-[130px] sm:min-w-[144px] py-2.5 px-6 rounded-xl bg-primary text-on-primary font-bold text-xs font-label-ui hover:bg-tertiary active:scale-[0.98] transition-all duration-150 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentStepIndex === SURVEY_STEPS.length - 2 ? 'Review Survey' : 'Continue'}
                  </span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
