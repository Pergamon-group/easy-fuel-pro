'use client';

export type SurveyMode = 'wizard' | 'offline_pdf';

export interface SurveyLandingProps {
  onSelectMode: (mode: SurveyMode) => void;
}

export function SurveyLanding({ onSelectMode }: SurveyLandingProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-6" data-testid="survey-landing">
      {/* Intro Header */}
      <div className="w-full text-left max-w-full mx-auto space-y-6">
        <h1 className="w-full inline-flex items-center px-3 py-4 text-3xl sm:text-4xl font-extrabold font-headline-lg text-on-surface tracking-normal">
          How would you like to complete your Site Survey?
        </h1>
        <p className="w-full text-sm sm:text-base font-body-md text-on-surface-variant leading-relaxed">
          Tell us about your station&apos;s pumps, dispenser hardware, and eTIMS setup. This technical snapshot allows our engineering team to design your exact forecourt integration and prevent costly site delays.
        </p>
      </div>

      {/* Quick Direct Download Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3 text-left">
          <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">print</span>
          </span>
          <div>
            <p className="text-sm font-bold text-on-surface font-headline-sm">
              Do you need the printable forecourt paper checklist?
            </p>
            <p className="text-xs text-on-surface-variant font-body-md">
              Print this official A4 checklist to walk the pump islands with your station technician.
            </p>
          </div>
        </div>
        <a
          href="/site-survey/download"
          download="EasyFuel-Pro-Site-Survey-Checklist.pdf"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-ui text-xs font-bold hover:bg-tertiary active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">file_download</span>
          <span>Download PDF (A4)</span>
        </a>
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

          <div className="pt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="/site-survey/download"
              download="EasyFuel-Pro-Site-Survey-Checklist.pdf"
              className="flex-1 py-3 px-4 rounded-xl bg-surface-container-highest text-on-surface hover:bg-surface-container-high font-bold text-xs sm:text-sm font-label-ui transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">file_download</span>
              <span>Download Blank PDF</span>
            </a>
            <button
              type="button"
              onClick={() => onSelectMode('offline_pdf')}
              className="flex-1 py-3 px-4 rounded-xl bg-surface border border-outline-variant text-on-surface font-semibold text-xs sm:text-sm font-label-ui hover:bg-surface-container transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              <span>Upload Scan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
