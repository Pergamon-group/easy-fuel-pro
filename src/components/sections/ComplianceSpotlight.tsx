import { siteConfig } from '@/config/site';

export function ComplianceSpotlight() {
  const { compliance } = siteConfig;

  return (
    <section className="w-full py-space-2xl lg:py-space-3xl bg-surface scroll-mt-24" data-testid="compliance-spotlight-section" id="etims-compliance">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="p-8 lg:p-12 rounded-3xl bg-surface-container flex flex-col lg:flex-row gap-12 items-center justify-between shadow-sm">
          <div className="flex flex-col gap-5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container-lowest text-primary font-label-mono text-label-mono font-bold w-fit">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              {compliance.badge}
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              {compliance.headline}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {compliance.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {compliance.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">{feature.icon}</span>
                  <div>
                    <span className="font-headline-sm text-[15px] font-bold text-on-surface block">{feature.title}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{feature.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fiscal eTIMS Mockup Visual */}
          <div className="w-full lg:w-80 p-6 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col gap-4 overflow-x-auto">
            <div className="text-center pb-3 border-b border-surface-container">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface block">{compliance.receipt.header}</span>
              <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">{compliance.receipt.subheader}</span>
            </div>
            <div className="font-label-mono text-[12px] flex flex-col gap-1 text-on-surface-variant">
              <div className="flex justify-between">
                <span>CU SERIAL:</span>
                <span className="font-bold text-on-surface">{compliance.receipt.cuSerial}</span>
              </div>
              <div className="flex justify-between">
                <span>INVOICE NO:</span>
                <span className="font-bold text-on-surface">{compliance.receipt.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span>PRODUCT:</span>
                <span className="font-bold text-on-surface">{compliance.receipt.product}</span>
              </div>
              <div className="flex justify-between">
                <span>VOLUME:</span>
                <span className="font-bold text-on-surface">{compliance.receipt.volume}</span>
              </div>
              <div className="flex justify-between">
                <span>TOTAL (KES):</span>
                <span className="font-bold text-primary">{compliance.receipt.total}</span>
              </div>
            </div>
            {/* Centered QR Box */}
            <div className="w-28 h-28 mx-auto bg-surface-container rounded-xl flex items-center justify-center p-2">
              <span className="material-symbols-outlined text-[80px] text-on-surface">qr_code_2</span>
            </div>
            <div className="text-center font-label-mono text-[10px] text-primary font-semibold">
              {compliance.receipt.status}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
