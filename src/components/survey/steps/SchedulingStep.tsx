'use client';

import { useState } from 'react';
import { SurveyScheduling, ValidationError } from '@/data/survey-schema';

export interface SchedulingStepProps {
  data: SurveyScheduling;
  onChange: (updated: Partial<SurveyScheduling>) => void;
  errors: ValidationError[];
}

function getLeadTimeMinDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2); // Minimum 48h notice
  return d.toISOString().split('T')[0];
}

function getLeadTimeMaxDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 90);
  return d.toISOString().split('T')[0];
}

function formatSlotDate(dateStr: string) {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map(Number);
  const dateObj = new Date(y, m - 1, d);
  if (isNaN(dateObj.getTime())) return null;

  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = dateObj.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  let relative = '';
  if (diffDays === 2) relative = 'In 2 days (Earliest)';
  else if (diffDays > 2) relative = `In ${diffDays} days`;
  else if (diffDays === 1) relative = 'Tomorrow';
  else if (diffDays === 0) relative = 'Today';
  else relative = 'Selected';

  return {
    weekday,
    monthDay,
    fullDisplay: `${weekday}, ${monthDay}`,
    relative,
  };
}

interface SlotDefinition {
  slotIndex: number;
  label: string;
  badge: string;
  badgeClass: string;
  description: string;
  isRequired: boolean;
}

const SLOTS: SlotDefinition[] = [
  {
    slotIndex: 0,
    label: '1st Choice (Preferred Date)',
    badge: 'Primary',
    badgeClass: 'bg-primary/10 text-primary border-primary/25',
    description: 'Your primary preferred date for forecourt engineers to visit.',
    isRequired: true,
  },
  {
    slotIndex: 1,
    label: '2nd Choice (Alternate Date)',
    badge: 'Backup',
    badgeClass: 'bg-tertiary/10 text-tertiary border-tertiary/25',
    description: 'Backup date in case of field route or schedule conflict.',
    isRequired: false,
  },
  {
    slotIndex: 2,
    label: '3rd Choice (Flexible Option)',
    badge: 'Optional',
    badgeClass: 'bg-surface-container-high text-on-surface-variant border-outline-variant/30',
    description: 'Optional additional date to expedite assignment.',
    isRequired: false,
  },
];

export function SchedulingStep({ data, onChange, errors }: SchedulingStepProps) {
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  const getFieldError = (fieldName: string) =>
    errors.find((e) => e.field === fieldName)?.message;

  const minDateStr = getLeadTimeMinDate();
  const maxDateStr = getLeadTimeMaxDate();

  const handleSetSlotDate = (slotIndex: number, newDate: string) => {
    setDuplicateWarning(null);
    if (!newDate) return;

    // Check if this date already exists in a different slot
    const existingIndex = data.preferredDates.indexOf(newDate);
    if (existingIndex !== -1 && existingIndex !== slotIndex) {
      setDuplicateWarning(`"${newDate}" is already selected for slot #${existingIndex + 1}.`);
      return;
    }

    const updated = [...data.preferredDates];
    updated[slotIndex] = newDate;
    // Clean up empty gaps
    const filtered = updated.filter(Boolean);
    onChange({ preferredDates: filtered });
  };

  const handleRemoveSlotDate = (slotIndex: number) => {
    setDuplicateWarning(null);
    const updated = data.preferredDates.filter((_, idx) => idx !== slotIndex);
    onChange({ preferredDates: updated });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="border-b border-outline-variant/20 pb-3">
        <h3 className="text-xl font-bold font-headline-sm text-on-surface">
          2. Preferred Survey Scheduling
        </h3>
        <p className="text-xs sm:text-sm font-body-md text-on-surface-variant mt-1">
          When would you like our forecourt deployment engineers to visit your station for the technical audit?
        </p>
      </div>

      {/* Surface Card 1: Slot-Based Schedule Selector */}
      <div className="rounded-2xl sm:rounded-3xl bg-surface border border-outline-variant/25 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/15 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-on-surface font-headline-sm">
                Preferred Survey Visit Dates *
              </h4>
              <p className="text-xs text-on-surface-variant">
                Select 1 to 3 prioritized dates in order of preference.
              </p>
            </div>
          </div>

          <div className="self-start sm:self-center">
            <span className="text-[11px] font-medium font-label-ui px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-on-surface-variant">
              {data.preferredDates.length} of 3 dates selected
            </span>
          </div>
        </div>

        {/* 48h Lead Time Notice */}
        <div className="p-3 rounded-xl bg-tertiary/10 border border-tertiary/25 flex items-start sm:items-center gap-2.5 text-xs text-on-surface">
          <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5 sm:mt-0">
            schedule
          </span>
          <div className="flex-1">
            <span className="font-bold text-tertiary">48-Hour Field Notice:</span>{' '}
            <span className="text-on-surface-variant">
              Audits require at least 2 business days lead time so field engineers can prepare pulser test rigs and calibration units.
            </span>
          </div>
        </div>

        {/* Duplicate warning */}
        {duplicateWarning && (
          <div className="p-3 rounded-xl bg-error/10 border border-error/30 text-error text-xs flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[18px]">warning</span>
            <span>{duplicateWarning}</span>
          </div>
        )}

        {/* Structured Slot Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {SLOTS.map((slot) => {
            const dateValue = data.preferredDates[slot.slotIndex] || '';
            const dateInfo = formatSlotDate(dateValue);
            const isFilled = Boolean(dateValue && dateInfo);
            const isAccessible = slot.slotIndex === 0 || Boolean(data.preferredDates[slot.slotIndex - 1]);

            return (
              <div
                key={slot.slotIndex}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isFilled
                    ? 'bg-surface border-primary/40 shadow-xs'
                    : isAccessible
                    ? 'bg-surface border-outline-variant/35 hover:border-outline-variant/60'
                    : 'bg-surface-container-low/40 border-outline-variant/20 opacity-60'
                }`}
              >
                {/* Slot Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-on-surface font-headline-sm">
                      {slot.label}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded-full border ${slot.badgeClass}`}
                    >
                      {slot.badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-on-surface-variant mb-3 leading-relaxed">
                    {slot.description}
                  </p>
                </div>

                {/* Slot Content */}
                <div>
                  {isFilled && dateInfo ? (
                    <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-primary">
                          <span className="material-symbols-outlined text-[18px]">event_available</span>
                          <span className="text-xs font-bold font-headline-sm">
                            {dateInfo.fullDisplay}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-primary/90 bg-primary/10 px-2 py-0.5 rounded-full font-label-ui">
                          {dateInfo.relative}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-outline-variant/15 text-xs">
                        <label
                          htmlFor={`date-slot-change-${slot.slotIndex}`}
                          className="text-primary hover:underline font-semibold cursor-pointer py-1 px-1 min-h-[36px] flex items-center"
                        >
                          Change Date
                          <input
                            id={`date-slot-change-${slot.slotIndex}`}
                            type="date"
                            min={minDateStr}
                            max={maxDateStr}
                            value={dateValue}
                            onChange={(e) => handleSetSlotDate(slot.slotIndex, e.target.value)}
                            className="sr-only"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => handleRemoveSlotDate(slot.slotIndex)}
                          className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 min-h-[36px] px-1 cursor-pointer font-medium"
                          aria-label={`Remove date from ${slot.label}`}
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                          <span>Clear</span>
                        </button>
                      </div>
                    </div>
                  ) : isAccessible ? (
                    <div className="space-y-1.5">
                      <label
                        htmlFor={`date-slot-input-${slot.slotIndex}`}
                        className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui"
                      >
                        Pick Date (from {minDateStr})
                      </label>
                      <input
                        id={`date-slot-input-${slot.slotIndex}`}
                        type="date"
                        min={minDateStr}
                        max={maxDateStr}
                        value=""
                        onChange={(e) => handleSetSlotDate(slot.slotIndex, e.target.value)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
                      />
                    </div>
                  ) : (
                    <div className="min-h-[44px] flex items-center justify-center p-2 rounded-xl bg-surface-container-low text-on-surface-variant/70 text-xs italic">
                      Fill {SLOTS[slot.slotIndex - 1].badge} date first
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {getFieldError('preferredDates') && (
          <p className="text-xs text-error mt-1 font-label-ui flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{getFieldError('preferredDates')}</span>
          </p>
        )}
      </div>

      {/* Surface Card 2: Forecourt Operating Shift & Business Hours */}
      <div className="rounded-2xl sm:rounded-3xl bg-surface border border-outline-variant/25 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-outline-variant/15 pb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-on-surface font-headline-sm">
              Station Operating Hours &amp; Shifts *
            </h4>
            <p className="text-xs text-on-surface-variant">
              Specify attendant shifts so our auditors visit during active supervision.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {[
            { value: 'full_24h', label: '24 Hours Open', desc: 'Continuous forecourt operations' },
            { value: '6am_10pm', label: '6:00 AM – 10:00 PM', desc: 'Extended 2-shift operations' },
            { value: '6am_6pm', label: '6:00 AM – 6:00 PM', desc: 'Daylight business hours only' },
            { value: 'custom', label: 'Custom Schedule', desc: 'Specific forecourt shifts' },
          ].map((opt) => {
            const isSelected = data.operatingHours === opt.value;
            return (
              <label
                key={opt.value}
                className={`min-h-[44px] p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between active:scale-[0.98] ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-on-surface ring-1 ring-primary/20 shadow-2xs'
                    : 'border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <div className="flex items-start justify-between gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-on-surface font-headline-sm">
                    {opt.label}
                  </span>
                  <input
                    type="radio"
                    name="operatingHours"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() =>
                      onChange({
                        operatingHours: opt.value as SurveyScheduling['operatingHours'],
                      })
                    }
                    className="mt-0.5 text-primary focus:ring-primary shrink-0"
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant/80 mt-2 font-body-md">
                  {opt.desc}
                </p>
              </label>
            );
          })}
        </div>

        {data.operatingHours === 'custom' && (
          <div className="pt-2 animate-fade-in space-y-1.5">
            <label
              htmlFor="customOperatingHours"
              className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui"
            >
              Specify Your Custom Shift Schedule *
            </label>
            <input
              id="customOperatingHours"
              type="text"
              value={data.customOperatingHours}
              onChange={(e) => onChange({ customOperatingHours: e.target.value })}
              placeholder="e.g. Mon–Sat 5:30 AM to 11:00 PM, Sun 7:00 AM to 9:00 PM"
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
            />
            {getFieldError('customOperatingHours') && (
              <p className="text-xs text-error mt-1 font-label-ui">
                {getFieldError('customOperatingHours')}
              </p>
            )}
          </div>
        )}

        {getFieldError('operatingHours') && (
          <p className="text-xs text-error mt-1 font-label-ui flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{getFieldError('operatingHours')}</span>
          </p>
        )}
      </div>

      {/* Surface Card 3: Access Instructions & Logistics Notes */}
      <div className="rounded-2xl sm:rounded-3xl bg-surface border border-outline-variant/25 p-4 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 border-b border-outline-variant/15 pb-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">description</span>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-on-surface font-headline-sm">
              Site Access &amp; Logistics Notes (Optional)
            </h4>
            <p className="text-xs text-on-surface-variant">
              Any special entry permissions, bulk offloading times, or manager contact instructions.
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="schedulingNotes"
            className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5"
          >
            Special Instructions / Gate Clearance
          </label>
          <textarea
            id="schedulingNotes"
            rows={3}
            value={data.schedulingNotes}
            onChange={(e) => onChange({ schedulingNotes: e.target.value })}
            placeholder="e.g. Please avoid Wednesday 8:00–10:00 AM during bulk fuel delivery; check in with station supervisor (James) at the back office upon arrival."
            className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs resize-none"
          />
        </div>
      </div>
    </div>
  );
}
