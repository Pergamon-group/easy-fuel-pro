'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { KENYA_COUNTIES, OfflinePdfSubmission } from '@/data/survey-schema';
import { submitOfflineSurveyPdf } from '@/app/actions/survey';

export interface PdfUploadFlowProps {
  onBackToOnline?: () => void;
}

export function PdfUploadFlow({ onBackToOnline }: PdfUploadFlowProps) {
  const [isPending, startTransition] = useTransition();
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<OfflinePdfSubmission>({
    customerName: '',
    siteName: '',
    contactPersonName: '',
    contactPhone: '',
    contactEmail: '',
    county: '',
    preferredDates: [],
    notes: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedFile) {
      setErrorMessage('Please attach your completed survey document.');
      return;
    }

    startTransition(async () => {
      try {
        const payload = new FormData();
        payload.append('customerName', formData.customerName);
        payload.append('siteName', formData.siteName);
        payload.append('contactPersonName', formData.contactPersonName);
        payload.append('contactPhone', formData.contactPhone);
        payload.append('contactEmail', formData.contactEmail);
        payload.append('county', formData.county);
        payload.append('preferredDates', formData.preferredDates.join(', '));
        payload.append('notes', formData.notes);
        payload.append('document', selectedFile);

        const result = await submitOfflineSurveyPdf(payload);

        if (result.success && result.referenceCode) {
          setSubmissionSuccess(result.referenceCode);
        } else {
          setErrorMessage(result.error || 'Failed to upload survey document.');
        }
      } catch {
        setErrorMessage('An unexpected network error occurred. Please try again.');
      }
    });
  };

  if (submissionSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 text-center shadow-lg">
        <span className="material-symbols-outlined text-[64px] text-primary mb-3">
          check_circle
        </span>
        <h3 className="text-2xl font-bold font-headline-sm text-on-surface">
          Survey Document Received!
        </h3>
        <p className="text-sm font-body-md text-on-surface-variant mt-2 max-w-md mx-auto">
          Your completed survey document has been uploaded securely to our engineering repository.
        </p>

        <div className="my-6 p-4 rounded-xl bg-surface border border-primary/20 max-w-xs mx-auto">
          <span className="text-xs uppercase font-bold text-primary font-label-ui">
            Reference Tracking ID
          </span>
          <div className="text-xl font-bold font-mono text-on-surface mt-1">
            {submissionSuccess}
          </div>
        </div>

        <p className="text-xs text-on-surface-variant">
          A confirmation acknowledgment has been sent to <strong>{formData.contactEmail}</strong>. Our forecourt deployment team will review your handwritten/digital specifications and contact you shortly.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="py-2.5 px-6 rounded-xl bg-primary text-on-primary font-bold text-xs font-label-ui hover:bg-tertiary transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Download Action Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-surface border border-outline-variant/25 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary font-label-ui mb-1.5">
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Step 1: Download</span>
          </span>
          <h4 className="text-base font-bold text-on-surface font-headline-sm">
            Download Blank Site Survey Checklist (PDF)
          </h4>
          <p className="text-xs text-on-surface-variant font-body-md mt-0.5">
            Print and complete on site with your station team, or fill using your favorite PDF reader.
          </p>
        </div>

        <a
          href="/site-survey/download"
          download="EasyFuel-Pro-Site-Survey-Checklist.pdf"
          className="py-2.5 px-5 rounded-xl bg-primary text-on-primary text-xs font-bold font-label-ui hover:bg-tertiary transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">file_download</span>
          <span>Download PDF</span>
        </a>
      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-surface border border-outline-variant/25 space-y-5"
      >
        <div className="border-b border-outline-variant/20 pb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary/10 text-secondary font-label-ui mb-1.5">
            <span className="material-symbols-outlined text-[16px]">upload_file</span>
            <span>Step 2: Upload Completed Survey</span>
          </span>
          <h3 className="text-xl font-bold font-headline-sm text-on-surface">
            Upload Your Completed Checklist
          </h3>
          <p className="text-xs text-on-surface-variant font-body-md mt-1">
            Provide your station contact information and attach your filled PDF or scanned copy for our engineering team to review.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-error/10 border border-error/30 text-error text-xs font-body-md flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1.5">
              Customer / Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="e.g. Delta Petroleum Ltd"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface text-xs font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1.5">
              Site / Station Name *
            </label>
            <input
              type="text"
              required
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              placeholder="e.g. Delta Station Westlands"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface text-xs font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1.5">
              Contact Person Name *
            </label>
            <input
              type="text"
              required
              value={formData.contactPersonName}
              onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
              placeholder="e.g. David Mwangi"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface text-xs font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1.5">
              Contact Phone *
            </label>
            <input
              type="tel"
              required
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              placeholder="e.g. +254 712 345 678"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface text-xs font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="e.g. info@deltapetroleum.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface text-xs font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1.5">
              County *
            </label>
            <select
              required
              value={formData.county}
              onChange={(e) => setFormData({ ...formData, county: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/35 text-on-surface text-xs font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Select County...</option>
              {KENYA_COUNTIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* File Drop Area */}
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1.5">
            Attach Completed Document (PDF, Scanned Image, max 25MB) *
          </label>
          <label className="border-2 border-dashed border-primary/30 hover:border-primary rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-surface/50 hover:bg-surface transition-all text-center">
            <span className="material-symbols-outlined text-[36px] text-primary mb-1">
              upload_file
            </span>
            <span className="text-xs font-bold text-on-surface font-label-ui">
              {selectedFile ? selectedFile.name : 'Select or Drag Completed Document Here'}
            </span>
            <span className="text-[11px] text-on-surface-variant mt-0.5">
              {selectedFile
                ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Click to change`
                : 'Supports PDF, JPEG, PNG, WEBP'}
            </span>
            <input
              type="file"
              required
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1.5">
            Additional Notes (Optional)
          </label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Any specific comments on hand-filled entries or site scheduling..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/50 text-on-surface text-xs font-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-xs resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {onBackToOnline && (
            <button
              type="button"
              onClick={onBackToOnline}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 font-label-ui"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Do you prefer to fill this online instead? Launch the online wizard</span>
            </button>
          )}

          <button
            type="submit"
            disabled={isPending || !selectedFile}
            className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-primary text-on-primary font-bold text-xs font-label-ui hover:bg-tertiary transition-all shadow-xs hover:shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                <span>Uploading Document...</span>
              </>
            ) : (
              <>
                <span>Submit Completed Survey</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
