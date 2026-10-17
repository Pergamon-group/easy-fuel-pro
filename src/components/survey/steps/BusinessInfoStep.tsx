'use client';

import { BusinessInfo, KENYA_COUNTIES, ValidationError } from '@/data/survey-schema';

export interface BusinessInfoStepProps {
  data: BusinessInfo;
  onChange: (updated: Partial<BusinessInfo>) => void;
  errors: ValidationError[];
}

export function BusinessInfoStep({ data, onChange, errors }: BusinessInfoStepProps) {
  const getFieldError = (fieldName: string) =>
    errors.find((e) => e.field === fieldName)?.message;

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/20 pb-3">
        <h3 className="text-xl font-bold font-headline-sm text-on-surface">
          1. Business &amp; Contact Information
        </h3>
        <p className="text-xs sm:text-sm font-body-md text-on-surface-variant mt-1">
          Tell us about your station ownership and registered business entity for eTIMS fiscalization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer / Company Name */}
        <div>
          <label htmlFor="customerName" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            Company / Business Name *
          </label>
          <input
            id="customerName"
            type="text"
            value={data.customerName}
            onChange={(e) => onChange({ customerName: e.target.value })}
            placeholder="e.g. Apex Petroleum Ltd"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {getFieldError('customerName') && (
            <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('customerName')}</p>
          )}
        </div>

        {/* Site / Station Name */}
        <div>
          <label htmlFor="siteName" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            Site / Station Name *
          </label>
          <input
            id="siteName"
            type="text"
            value={data.siteName}
            onChange={(e) => onChange({ siteName: e.target.value })}
            placeholder="e.g. Apex Service Station Westlands"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {getFieldError('siteName') && (
            <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('siteName')}</p>
          )}
        </div>

        {/* Physical Location */}
        <div>
          <label htmlFor="physicalLocation" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            Physical Location / Street *
          </label>
          <input
            id="physicalLocation"
            type="text"
            value={data.physicalLocation}
            onChange={(e) => onChange({ physicalLocation: e.target.value })}
            placeholder="e.g. Waiyaki Way, Opposite ABC Place"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {getFieldError('physicalLocation') && (
            <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('physicalLocation')}</p>
          )}
        </div>

        {/* County */}
        <div>
          <label htmlFor="county" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            County *
          </label>
          <select
            id="county"
            value={data.county}
            onChange={(e) => onChange({ county: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">Select County...</option>
            {KENYA_COUNTIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {getFieldError('county') && (
            <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('county')}</p>
          )}
        </div>

        {/* KRA PIN */}
        <div>
          <label htmlFor="kraPin" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            KRA PIN *
          </label>
          <input
            id="kraPin"
            type="text"
            value={data.kraPin}
            onChange={(e) => onChange({ kraPin: e.target.value.toUpperCase().trim() })}
            placeholder="e.g. P051234567A or A001234567B"
            maxLength={11}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface font-mono text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase"
          />
          <p className="text-[11px] text-on-surface-variant/70 mt-1">
            Format: Starts with P (Corporate) or A (Individual), 9 digits, ends with a letter.
          </p>
          {getFieldError('kraPin') && (
            <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('kraPin')}</p>
          )}
        </div>

        {/* Contact Person Name */}
        <div>
          <label htmlFor="contactPersonName" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            Contact Person Name *
          </label>
          <input
            id="contactPersonName"
            type="text"
            value={data.contactPersonName}
            onChange={(e) => onChange({ contactPersonName: e.target.value })}
            placeholder="e.g. James Mwangi"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {getFieldError('contactPersonName') && (
            <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('contactPersonName')}</p>
          )}
        </div>

        {/* Contact Phone */}
        <div>
          <label htmlFor="contactPhone" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            Phone Number *
          </label>
          <input
            id="contactPhone"
            type="tel"
            value={data.contactPhone}
            onChange={(e) => onChange({ contactPhone: e.target.value })}
            placeholder="e.g. +254 712 345 678"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {getFieldError('contactPhone') && (
            <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('contactPhone')}</p>
          )}
        </div>

        {/* Contact Email */}
        <div>
          <label htmlFor="contactEmail" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            Email Address *
          </label>
          <input
            id="contactEmail"
            type="email"
            value={data.contactEmail}
            onChange={(e) => onChange({ contactEmail: e.target.value })}
            placeholder="e.g. info@apexpetroleum.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {getFieldError('contactEmail') && (
            <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('contactEmail')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
