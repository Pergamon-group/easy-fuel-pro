'use client';

export function PricingStructure() {
  const componentsList = [
    {
      name: 'Incotex 600 ESD',
      desc: 'Type C eTIMS Electronic Signature Device',
      opt1: 'KES 70,000.00',
      opt2: 'KES 70,000.00',
      tag: 'KRA Mandated',
    },
    {
      name: 'System Integration (One-off)',
      desc: 'Forecourt network configuration & attendant training',
      opt1: 'KES 30,000.00',
      opt2: 'KES 30,000.00',
      tag: 'One-off',
    },
    {
      name: 'Thermal Receipt Printer',
      desc: 'High-speed till receipt printer with QR output',
      opt1: 'KES 9,500.00',
      opt2: 'KES 9,500.00',
      tag: 'Pump-Side',
    },
    {
      name: 'PTS-2 Forecourt Controller',
      desc: 'Multi-pump & ATG automated protocol bridge',
      opt1: 'Not Required',
      opt2: 'KES 160,000.00',
      tag: 'Full Automation Only',
      opt1Note: 'Manual entry via POS',
    },
    {
      name: 'Civils Works & Cabling',
      desc: 'Trenching, explosion-proof conduit & site ducting',
      opt1: 'Based on Site Survey*',
      opt2: 'Based on Site Survey*',
      isSurvey: true,
      tag: 'Site Specific',
    },
  ];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="w-full py-16 lg:py-24 bg-surface-container-low border-b border-surface-container relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-label-mono text-label-mono font-semibold w-fit uppercase">
              Indicative Pricing &amp; Forecourt Options
            </span>
            <h2
              id="pricing-heading"
              className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight"
            >
              PRICING STRUCTURE
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Transparent, modular hardware pricing tailored for single independent stations and
              regional multi-station fuel networks across East Africa.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3 self-start md:self-auto">
            <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
            <span className="text-[12px] font-label-mono font-bold text-on-surface">
              AMC KES 10,000/yr (From Year 2)
            </span>
          </div>
        </div>

        {/* Pricing Cards Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Option 1: Semi-Automated */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between gap-8 relative">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-mono text-[11px] font-bold uppercase">
                  Entry-Level Compliance
                </span>
                <span className="text-[12px] font-label-mono text-outline">Indicative*</span>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Option 1: Semi-Automated
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Compliant fiscal invoicing via POS and Incotex 600 ESD without automatic dispenser
                  flow locking.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low flex items-baseline gap-2">
                <span className="text-display-hero font-extrabold text-on-surface tracking-tight text-[36px] sm:text-[44px]">
                  KES 109,500
                </span>
                <span className="text-[12px] font-label-mono text-outline">
                  Year 1 (Excl. Civils)*
                </span>
              </div>

              {/* Breakdown */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="text-[11px] font-label-mono text-outline uppercase tracking-wider font-bold">
                  Included Components:
                </span>
                <ul className="flex flex-col gap-2.5 text-[13px] font-body-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-on-surface">Incotex 600 ESD (Type C)</span>
                    <span className="font-label-mono font-bold text-on-surface">KES 70,000.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-on-surface">System Integration (One-off)</span>
                    <span className="font-label-mono font-bold text-on-surface">KES 30,000.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-on-surface">Thermal Receipt Printer</span>
                    <span className="font-label-mono font-bold text-on-surface">KES 9,500.00</span>
                  </li>
                  <li className="flex items-center justify-between text-outline">
                    <span>PTS-2 Controller</span>
                    <span className="font-label-mono italic">Not Required</span>
                  </li>
                  <li className="flex items-center justify-between pt-2 border-t border-surface-container">
                    <span className="font-semibold text-primary">Civils Works</span>
                    <span className="font-label-mono font-semibold text-primary">Based on Site Survey*</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-surface-container">
              <a
                href="#demo-section"
                className="w-full py-3 px-5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-ui text-[14px] font-semibold text-center transition-colors"
              >
                Request Semi-Automated Quote
              </a>
              <span className="text-[11px] font-label-mono text-center text-outline">
                Annual Maintenance Contract (AMC) payable from Year 2: KES 10,000.00
              </span>
            </div>
          </div>

          {/* Option 2: Full Automation */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border-2 border-primary shadow-lg flex flex-col justify-between gap-8 relative">
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-primary text-on-primary font-label-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
              ★ Recommended Forecourt Stack
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-mono text-[11px] font-bold uppercase">
                  Complete Forecourt Telemetry
                </span>
                <span className="text-[12px] font-label-mono text-outline">Indicative*</span>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Option 2: Full Automation
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Direct pump protocol interlocking via PTS-2 controller, live nozzle flow capture,
                  and ATG tank telemetry.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-baseline gap-2">
                <span className="text-display-hero font-extrabold text-primary tracking-tight text-[36px] sm:text-[44px]">
                  KES 269,500
                </span>
                <span className="text-[12px] font-label-mono text-outline">
                  Year 1 (Excl. Civils)*
                </span>
              </div>

              {/* Breakdown */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="text-[11px] font-label-mono text-outline uppercase tracking-wider font-bold">
                  Included Components:
                </span>
                <ul className="flex flex-col gap-2.5 text-[13px] font-body-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-on-surface">Incotex 600 ESD (Type C)</span>
                    <span className="font-label-mono font-bold text-on-surface">KES 70,000.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-on-surface font-semibold text-primary">
                      PTS-2 Forecourt Controller (50 Pumps/50 Tanks)
                    </span>
                    <span className="font-label-mono font-bold text-primary">KES 160,000.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-on-surface">System Integration (One-off)</span>
                    <span className="font-label-mono font-bold text-on-surface">KES 30,000.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-on-surface">Thermal Receipt Printer</span>
                    <span className="font-label-mono font-bold text-on-surface">KES 9,500.00</span>
                  </li>
                  <li className="flex items-center justify-between pt-2 border-t border-surface-container">
                    <span className="font-semibold text-primary">Civils Works</span>
                    <span className="font-label-mono font-semibold text-primary">Based on Site Survey*</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-surface-container">
              <a
                href="#demo-section"
                className="w-full py-3.5 px-5 rounded-xl bg-primary hover:bg-tertiary text-on-primary font-label-ui text-[14px] font-semibold text-center shadow-md transition-all"
              >
                Book Full Automation Site Survey
              </a>
              <span className="text-[11px] font-label-mono text-center text-outline">
                Annual Maintenance Contract (AMC) payable from Year 2: KES 10,000.00
              </span>
            </div>
          </div>
        </div>

        {/* Tentative Pricing Disclaimers & Notes */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary font-label-mono text-[12px] font-bold uppercase">
            <span className="material-symbols-outlined text-[18px]">info</span>
            <span>Commercial Terms &amp; Tentative Pricing Disclaimers</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px] font-body-sm text-on-surface-variant leading-relaxed">
            <p>
              • <strong>Tentative Quotation Note:</strong> All prices are tentative and indicative.
              Formal binding quotations are issued following physical site survey and may vary with
              prevailing foreign exchange rates and specific dispenser electronic interface heads.
            </p>
            <p>
              • <strong>Civil Works Scope:</strong> Civil works (trenching, cabling, conduit,
              explosion-proof junction boxes) are based on site survey and station layout distance
              from the controller to the forecourt pump islands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
