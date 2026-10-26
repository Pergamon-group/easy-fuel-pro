'use client';

import { useState } from 'react';
import { SiteSurveyData, SiteReadiness, YesNo, ValidationError } from '@/data/survey-schema';

export interface ReviewSubmitStepProps {
  survey: SiteSurveyData;
  onReadinessChange: (updated: Partial<SiteReadiness>) => void;
  selectedFiles: File[];
  onFilesChange: (files: File[]) => void;
  errors: ValidationError[];
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function ReviewSubmitStep({
  survey,
  onReadinessChange,
  selectedFiles,
  onFilesChange,
  errors,
  isSubmitting,
  onSubmit,
}: ReviewSubmitStepProps) {
  const { readiness, businessInfo, scheduling, infrastructure, compliance } = survey;
  const [showSummary, setShowSummary] = useState(false);

  const getFieldError = (fieldName: string) =>
    errors.find((e) => e.field === fieldName)?.message;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    // Limit to max 10 images
    const combined = [...selectedFiles, ...incoming].slice(0, 10);
    onFilesChange(combined);
  };

  const handleRemoveFile = (index: number) => {
    onFilesChange(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/20 pb-3">
        <h3 className="text-xl font-bold font-headline-sm text-on-surface">
          5. Site Readiness, Asset Photos &amp; Final Submission
        </h3>
        <p className="text-xs sm:text-sm font-body-md text-on-surface-variant mt-1">
          Provide civil works readiness, attach station photos, review your answers, and submit your technical survey.
        </p>
      </div>

      {/* Civil & Physical Works Checklist */}
      <div className="rounded-2xl bg-surface p-4 sm:p-5 border border-outline-variant/25 space-y-2.5">
        <h4 className="font-bold text-sm text-on-surface font-headline-sm">
          Civil &amp; Physical Works Readiness
        </h4>
        <p className="text-xs text-on-surface-variant">
          Indicate if preliminary cabling works are already completed on site.
        </p>

        {[
          {
            field: 'trenchingCompleted',
            label: 'Has trenching been completed for data and power cables between canopy and office?',
            val: readiness.trenchingCompleted,
          },
          {
            field: 'conduitsInstalled',
            label: 'Are underground PVC conduits installed and secured?',
            val: readiness.conduitsInstalled,
          },
          {
            field: 'pumpIslandsGrounded',
            label: 'Are pump islands properly grounded with earth bonding in place?',
            val: readiness.pumpIslandsGrounded,
          },
        ].map((item) => (
          <div
            key={item.field}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-2 border-b border-outline-variant/15 last:border-b-0"
          >
            <span className="text-xs sm:text-sm text-on-surface font-body-md">{item.label}</span>
            <div className="flex items-center gap-4 shrink-0">
              <label className="flex items-center gap-1.5 text-xs text-on-surface cursor-pointer">
                <input
                  type="radio"
                  name={item.field}
                  value="yes"
                  checked={item.val === 'yes'}
                  onChange={() =>
                    onReadinessChange({ [item.field]: 'yes' as YesNo } as Partial<SiteReadiness>)
                  }
                  className="text-primary focus:ring-primary"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs text-on-surface cursor-pointer">
                <input
                  type="radio"
                  name={item.field}
                  value="no"
                  checked={item.val === 'no'}
                  onChange={() =>
                    onReadinessChange({ [item.field]: 'no' as YesNo } as Partial<SiteReadiness>)
                  }
                  className="text-primary focus:ring-primary"
                />
                <span>No / In Progress</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Site Notes */}
      <div>
        <label htmlFor="siteNotes" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
          Station Observations &amp; Notes (Optional)
        </label>
        <textarea
          id="siteNotes"
          rows={3}
          value={readiness.siteNotes}
          onChange={(e) => onReadinessChange({ siteNotes: e.target.value })}
          placeholder="e.g. Pump 3 currently has intermittent pulser signal; office power inverter is scheduled for installation next week."
          className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
        />
      </div>

      {/* Private Photo Uploads (ImageKit) */}
      <div className="rounded-2xl bg-surface p-4 sm:p-5 border border-outline-variant/25">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-sm text-on-surface font-headline-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">add_photo_alternate</span>
            <span>Attach Station Photos (Optional but Recommended)</span>
          </h4>
          <span className="text-xs text-on-surface-variant">Max 10 files (25MB total)</span>
        </div>
        <p className="text-xs text-on-surface-variant mb-4">
          Photos of pump dispenser nameplates, forecourt canopy, control unit cabinet, or LAN cabling help engineers prepare before arriving.
        </p>

        {/* Upload Drop Area */}
        <label className="border-2 border-dashed border-primary/30 hover:border-primary rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-surface/40 hover:bg-surface/80 transition-all text-center">
          <span className="material-symbols-outlined text-[32px] text-primary mb-1">
            cloud_upload
          </span>
          <span className="text-xs font-bold text-on-surface font-label-ui">
            Click to Browse or Drag Images Here
          </span>
          <span className="text-[11px] text-on-surface-variant mt-0.5">
            Supports JPEG, PNG, WEBP, PDF
          </span>
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>

        {/* File List */}
        {selectedFiles.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {selectedFiles.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-surface border border-outline-variant/40 text-xs font-body-md"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                    description
                  </span>
                  <span className="truncate max-w-[200px] text-on-surface font-medium">
                    {file.name}
                  </span>
                  <span className="text-on-surface-variant/70 text-[10px]">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  className="text-error hover:text-error/80 p-1 focus:outline-none"
                  aria-label={`Remove ${file.name}`}
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collapsible Submission Summary Preview */}
      <div className="rounded-2xl border border-outline-variant/40 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowSummary(!showSummary)}
          className="w-full p-4 flex items-center justify-between bg-surface-container hover:bg-surface-container-high transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              preview
            </span>
            <span className="font-bold text-sm text-on-surface font-headline-sm">
              Review Survey Summary Before Submitting
            </span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
            {showSummary ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {showSummary && (
          <div className="p-5 bg-surface text-xs font-body-md space-y-4 border-t border-outline-variant/30">
            <div>
              <span className="font-bold text-primary uppercase text-[11px] font-label-ui">Station & Contact:</span>
              <p className="text-on-surface mt-1">
                <strong>{businessInfo.siteName}</strong> &bull; {businessInfo.customerName} &bull; {businessInfo.physicalLocation}, {businessInfo.county} &bull; KRA PIN: {businessInfo.kraPin}
              </p>
              <p className="text-on-surface-variant">
                Contact: {businessInfo.contactPersonName} ({businessInfo.contactPhone}, {businessInfo.contactEmail})
              </p>
            </div>

            <div>
              <span className="font-bold text-primary uppercase text-[11px] font-label-ui">Scheduling:</span>
              <p className="text-on-surface mt-1">
                Preferred: {scheduling.preferredDates.join(', ') || 'Flexible'} &bull; Hours: {scheduling.operatingHours}
              </p>
            </div>

            <div>
              <span className="font-bold text-primary uppercase text-[11px] font-label-ui">Dispensers ({infrastructure.totalPumpCount} Pumps):</span>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-on-surface">
                {infrastructure.pumps.map((p, i) => (
                  <li key={p.id || i}>
                    Pump #{i + 1}: {p.makeModel || 'Unspecified'} {p.dispenserSerial ? `(SN: ${p.dispenserSerial})` : ''} &bull; {p.nozzleCount} Nozzles &bull; Fuels: {p.fuelTypes.map((f) => f === 'other' ? (p.otherFuelType ? `Other (${p.otherFuelType})` : 'Other') : f.toUpperCase()).join(', ')} &bull; {p.meterType} &bull; Pulser: {p.pulseOutputAvailable === 'yes' ? 'Available' : 'No / None'}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-primary uppercase text-[11px] font-label-ui">eTIMS Compliance:</span>
              <p className="text-on-surface mt-1">
                Solution: {compliance.etimsSolutionType?.toUpperCase()} &bull; Live KRA Today: {compliance.realTimeSalesCurrentlyTransmitting || 'No'} &bull; Automate Goal: {compliance.requireRealtimeTransmissionGoal || 'Yes'} &bull; POS: {compliance.posSystem || 'None'} &bull; Internet: {compliance.internetAvailable} ({compliance.connectionType})
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation & Consent */}
      <div className="p-4 rounded-xl bg-surface border border-outline-variant/40">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={readiness.consentGiven}
            onChange={(e) => onReadinessChange({ consentGiven: e.target.checked })}
            className="mt-1 w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
          />
          <span className="text-xs text-on-surface font-body-md leading-relaxed">
            I confirm that the site details, pump counts, and business information provided above are accurate to the best of my knowledge. I authorize Pergamon Group forecourt engineers to contact us and review this station setup. *
          </span>
        </label>
        {getFieldError('consentGiven') && (
          <p className="text-xs text-error mt-2 font-label-ui">{getFieldError('consentGiven')}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !readiness.consentGiven}
          className="w-full py-3.5 px-6 rounded-xl bg-primary text-on-primary font-bold text-sm sm:text-base font-label-ui hover:bg-tertiary transition-all shadow-xs hover:shadow-sm flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
              <span>Submitting Technical Site Survey...</span>
            </>
          ) : (
            <>
              <span>Complete & Submit Site Survey</span>
              <span className="material-symbols-outlined text-[20px]">send</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
