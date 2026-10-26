'use client';

import { useState } from 'react';
import { SurveyLanding, SurveyMode } from './SurveyLanding';
import { SiteSurveyWizard } from './SiteSurveyWizard';
import { PdfUploadFlow } from './PdfUploadFlow';

export function SurveyContainer() {
  const [mode, setMode] = useState<SurveyMode | 'landing'>('landing');

  return (
    <div className="w-full">
      {mode !== 'landing' && (
        <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setMode('landing')}
            className="text-xs font-semibold text-primary hover:text-tertiary flex items-center gap-2 font-label-ui transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span className='text-left'>Switch Submission Method</span>
          </button>

          <span className="text-right text-xs text-on-surface-variant font-label-ui">
            Current mode:{' '}
            <strong className="text-on-surface">
              {mode === 'wizard' ? 'Online 5-Step Wizard' : 'Offline PDF Checklist'}
            </strong>
          </span>
        </div>
      )}

      {mode === 'landing' && (
        <SurveyLanding onSelectMode={(selected) => setMode(selected)} />
      )}

      {mode === 'wizard' && (
        <SiteSurveyWizard onSwitchToOffline={() => setMode('offline_pdf')} />
      )}

      {mode === 'offline_pdf' && (
        <PdfUploadFlow onBackToOnline={() => setMode('wizard')} />
      )}
    </div>
  );
}
