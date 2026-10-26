'use client';

import { useState } from 'react';
import { SurveyScheduling, ValidationError } from '@/data/survey-schema';

export interface SchedulingStepProps {
  data: SurveyScheduling;
  onChange: (updated: Partial<SurveyScheduling>) => void;
  errors: ValidationError[];
}

export function SchedulingStep({ data, onChange, errors }: SchedulingStepProps) {
  const [newDateInput, setNewDateInput] = useState('');

  const getFieldError = (fieldName: string) =>
    errors.find((e) => e.field === fieldName)?.message;

  const handleAddDate = () => {
    if (!newDateInput) return;
    if (data.preferredDates.includes(newDateInput)) return;
    if (data.preferredDates.length >= 3) return;

    onChange({ preferredDates: [...data.preferredDates, newDateInput] });
    setNewDateInput('');
  };

  const handleRemoveDate = (dateToRemove: string) => {
    onChange({
      preferredDates: data.preferredDates.filter((d) => d !== dateToRemove),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/20 pb-3">
        <h3 className="text-xl font-bold font-headline-sm text-on-surface">
          2. Preferred Survey Scheduling
        </h3>
        <p className="text-xs sm:text-sm font-body-md text-on-surface-variant mt-1">
          When would you like our forecourt deployment engineers to visit your station for the technical audit?
        </p>
      </div>

      {/* Date Picker Multi-Date */}
      <div className="rounded-2xl bg-surface p-4 sm:p-5 border border-outline-variant/25">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1">
          Select Preferred Survey Dates (Add up to 3 options) *
        </label>
        <p className="text-xs text-on-surface-variant mb-3">
          Provide 1 to 3 preferred dates so our logistics team can coordinate engineer schedules.
        </p>

        <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
          <input
            type="date"
            value={newDateInput}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setNewDateInput(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-surface border border-outline-variant/35 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={handleAddDate}
            disabled={!newDateInput || data.preferredDates.length >= 3}
            className="px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold font-label-ui hover:bg-tertiary transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Date</span>
          </button>
        </div>

        {/* Selected Dates Chips */}
        {data.preferredDates.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.preferredDates.map((dateStr) => (
              <span
                key={dateStr}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface font-mono text-xs font-semibold text-primary border border-primary/25"
              >
                <span className="material-symbols-outlined text-[15px]">event</span>
                <span>{dateStr}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveDate(dateStr)}
                  className="hover:text-error transition-colors ml-1 focus:outline-none cursor-pointer"
                  aria-label={`Remove date ${dateStr}`}
                >
                  <span className="material-symbols-outlined text-[15px]">close</span>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-on-surface-variant/70 italic">No dates selected yet. Pick a date above and click &quot;Add Date&quot;.</p>
        )}

        {getFieldError('preferredDates') && (
          <p className="text-xs text-error mt-2 font-label-ui">{getFieldError('preferredDates')}</p>
        )}
      </div>

      {/* Operating Hours */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-2">
          Station Operating Hours *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {[
            { value: 'full_24h', label: '24 Hours Open', desc: 'Continuous operations' },
            { value: '6am_10pm', label: '6:00 AM to 10:00 PM', desc: 'Extended day shift' },
            { value: '6am_6pm', label: '6:00 AM to 6:00 PM', desc: 'Daytime only' },
            { value: 'custom', label: 'Custom Hours', desc: 'Specific shift schedule' },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`p-3 rounded-xl border cursor-pointer transition-colors flex flex-col justify-between ${
                data.operatingHours === opt.value
                  ? 'border-primary bg-primary/5 text-on-surface'
                  : 'border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs sm:text-sm font-bold text-on-surface">{opt.label}</span>
                <input
                  type="radio"
                  name="operatingHours"
                  value={opt.value}
                  checked={data.operatingHours === opt.value}
                  onChange={() => onChange({ operatingHours: opt.value as SurveyScheduling['operatingHours'] })}
                  className="mt-0.5 text-primary focus:ring-primary"
                />
              </div>
              <p className="text-[11px] text-on-surface-variant/80 mt-1.5 font-body-md">{opt.desc}</p>
            </label>
          ))}
        </div>

        {data.operatingHours === 'custom' && (
          <div className="mt-3">
            <input
              type="text"
              value={data.customOperatingHours}
              onChange={(e) => onChange({ customOperatingHours: e.target.value })}
              placeholder="e.g. Mon to Sat 5am to 11pm, Sun 7am to 9pm"
              className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/50 text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
            {getFieldError('customOperatingHours') && (
              <p className="text-xs text-error mt-1.5 font-label-ui">{getFieldError('customOperatingHours')}</p>
            )}
          </div>
        )}

        {getFieldError('operatingHours') && (
          <p className="text-xs text-error mt-2 font-label-ui">{getFieldError('operatingHours')}</p>
        )}
      </div>

      {/* Scheduling Notes */}
      <div>
        <label htmlFor="schedulingNotes" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-2">
          Access Instructions or Scheduling Notes (Optional)
        </label>
        <textarea
          id="schedulingNotes"
          rows={3}
          value={data.schedulingNotes}
          onChange={(e) => onChange({ schedulingNotes: e.target.value })}
          placeholder="e.g. Please avoid Wednesday 8-10 AM during bulk fuel offloading; contact the station supervisor on arrival."
          className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/50 text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm resize-none"
        />
      </div>
    </div>
  );
}
