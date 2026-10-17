'use client';

export type SurveyMode = 'wizard' | 'offline_pdf';

export interface SurveyLandingProps {
  onSelectMode: (mode: SurveyMode) => void;
}

export function SurveyLanding({ onSelectMode }: SurveyLandingProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8" data-testid="survey-landing">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary font-label-ui">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span>Forecourt Readiness & eTIMS Checklist</span>
        </span> */}
        <h1 className="inline-flex items-center px-3 py-6 text-3xl sm:text-4xl font-extrabold font-headline-lg text-on-surface tracking-normal">
          How would you like to complete your Site Survey?
        </h1>
        <p className="text-sm sm:text-base font-body-md text-on-surface-variant leading-relaxed">
          Tell us about your station&apos;s pumps, dispenser hardware, and eTIMS setup. This technical snapshot allows our engineering team to design your exact forecourt integration and prevent costly site delays.
        </p>
      </div>

      {/* Choice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Option 1: Interactive Online Wizard */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-primary/30 hover:border-primary shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[28px]">dynamic_form</span>
            </div>

            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary font-label-ui mb-1.5">
                Recommended &bull; 5 Minutes
              </div>
              <h3 className="text-xl font-bold font-headline-sm text-on-surface">
                Complete Survey Online
              </h3>
              <p className="text-xs sm:text-sm font-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                Enter your pump makes, dispenser serials, and tax compliance setup. Capturing these details ensures we specify 100% compatible automation hardware before dispatching engineers to your forecourt.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-on-surface font-body-md pt-2">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Verifies dispenser &amp; controller compatibility before our engineers arrive</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Receive a tailored forecourt blueprint and an accurate quote within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Progress saves automatically to your device as you type so you never lose data</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              type="button"
              onClick={() => onSelectMode('wizard')}
              className="w-full py-3.5 px-6 rounded-xl bg-primary text-on-primary font-bold text-sm font-label-ui hover:bg-tertiary transition-all shadow-sm flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
            >
              <span>Start Online Survey</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Option 2: Download & Offline Upload */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-outline-variant/40 hover:border-outline shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-container-highest text-on-surface flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[28px]">file_download</span>
            </div>

            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-surface-container-highest text-on-surface-variant font-label-ui mb-1.5">
                Printable &bull; Physical Checklist
              </div>
              <h3 className="text-xl font-bold font-headline-sm text-on-surface">
                Download PDF & Upload
              </h3>
              <p className="text-xs sm:text-sm font-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                Download our redesigned site survey checklist, walk the forecourt with your station engineer to fill it out by hand, and upload the completed scan.
              </p>
            </div>

            <ul className="space-y-2 text-xs text-on-surface font-body-md pt-2">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">print</span>
                <span>Standard A4 printable layout</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">draw</span>
                <span>Supports handwriting or digital PDF fill</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">cloud_upload</span>
                <span>Upload completed scan or camera photos</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              type="button"
              onClick={() => onSelectMode('offline_pdf')}
              className="w-full py-3.5 px-6 rounded-xl bg-surface border border-outline-variant text-on-surface font-bold text-sm font-label-ui hover:bg-surface-container transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Download & Upload Offline</span>
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
