'use client';

import { pricingConfig } from '@/config/pricing';

export function PricingStructure() {
  const { semiAutomated, fullAutomation } = pricingConfig.options;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="w-full py-16 lg:py-24 bg-surface-container-low border-b border-surface-container relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10 sm:gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-label-mono text-label-mono font-semibold w-fit uppercase">
              Indicative Pricing &amp; Forecourt Options
            </span>
            <h2
              id="pricing-heading"
              className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight"
            >
              PRICING STRUCTURE
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Pergamon Group offers transparent, modular hardware pricing tailored for single independent stations and
              regional multi-station fuel networks across East Africa.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3 self-start md:self-auto shadow-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
            <span className="text-[12px] font-label-mono font-bold text-on-surface">
              {pricingConfig.amcFormattedWithPeriod}
            </span>
          </div>
        </div>

        {/* Pricing Cards - Designed Mobile-First */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Option 1: Semi-Automated */}
          <div className="p-5 sm:p-7 lg:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between gap-8 relative transition-all hover:shadow-md">
            <div className="flex flex-col gap-6">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-mono text-[11px] font-bold uppercase tracking-wider">
                  {semiAutomated.badge}
                </span>
                <span className="text-[11px] sm:text-[12px] font-label-mono text-outline">
                  Indicative*
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-1.5">
                <h3 className="font-headline-md text-[20px] sm:text-headline-md font-bold text-on-surface">
                  {semiAutomated.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {semiAutomated.description}
                </p>
              </div>

              {/* Mobile-First Price Display */}
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[14px] sm:text-[16px] font-bold text-primary font-label-mono uppercase">
                    KES
                  </span>
                  <span className="font-extrabold text-on-surface tracking-tight text-[32px] sm:text-[40px] lg:text-[44px] leading-none">
                    {semiAutomated.totalAmountOnly}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-surface-container/60 text-[11px] sm:text-[12px] font-label-mono text-outline">
                  <span>{semiAutomated.period}</span>
                  <span className="hidden sm:inline">Modular Base Setup</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="flex flex-col gap-3 pt-1">
                <span className="text-[11px] font-label-mono text-outline uppercase tracking-wider font-bold">
                  Included Components:
                </span>
                <ul className="flex flex-col text-[13px] font-body-sm divide-y divide-surface-container/60">
                  {semiAutomated.components.map((comp) => (
                    <li
                      key={comp.name}
                      className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3"
                    >
                      <div className="flex flex-col">
                        <span
                          className={`${comp.highlight ? 'font-semibold text-primary' : 'text-on-surface'
                            }`}
                        >
                          {comp.name}
                        </span>
                        {comp.desc && (
                          <span className="text-[11px] text-on-surface-variant">
                            {comp.desc}
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-label-mono font-bold whitespace-nowrap self-start sm:self-auto ${comp.highlight
                          ? 'text-primary font-semibold'
                          : comp.isExcluded
                            ? 'italic text-outline font-normal'
                            : 'text-on-surface'
                          }`}
                      >
                        {comp.priceFormatted}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card CTA & Disclaimers */}
            <div className="flex flex-col gap-3 pt-4 border-t border-surface-container">
              <a
                href={semiAutomated.ctaHref}
                className="w-full min-h-[48px] py-3.5 px-5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-ui text-[14px] font-semibold text-center transition-colors flex items-center justify-center shadow-xs"
              >
                {semiAutomated.ctaText}
              </a>
              <span className="text-[11px] font-label-mono text-center text-outline">
                {semiAutomated.amcNote}
              </span>
            </div>
          </div>

          {/* Option 2: Full Automation */}
          <div className="p-5 sm:p-7 lg:p-8 rounded-3xl bg-surface-container-lowest border-2 border-primary shadow-lg flex flex-col justify-between gap-8 relative transition-all hover:shadow-xl">
            {/* Recommended Badge: responsive placement */}
            <div className="sm:absolute sm:-top-3.5 sm:right-6 self-start px-3.5 py-1 rounded-full bg-primary text-on-primary font-label-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {fullAutomation.recommendedBadge}
            </div>

            <div className="flex flex-col gap-6">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-mono text-[11px] font-bold uppercase tracking-wider">
                  {fullAutomation.badge}
                </span>
                <span className="text-[11px] sm:text-[12px] font-label-mono text-outline">
                  Indicative*
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-1.5">
                <h3 className="font-headline-md text-[20px] sm:text-headline-md font-bold text-on-surface">
                  {fullAutomation.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {fullAutomation.description}
                </p>
              </div>

              {/* Mobile-First Price Display */}
              <div className="p-4 sm:p-5 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[14px] sm:text-[16px] font-bold text-primary font-label-mono uppercase">
                    KES
                  </span>
                  <span className="font-extrabold text-primary tracking-tight text-[32px] sm:text-[40px] lg:text-[44px] leading-none">
                    {fullAutomation.totalAmountOnly}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-primary/15 text-[11px] sm:text-[12px] font-label-mono text-outline">
                  <span>{fullAutomation.period}</span>
                  <span className="text-primary font-medium">Complete Telemetry Stack</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="flex flex-col gap-3 pt-1">
                <span className="text-[11px] font-label-mono text-outline uppercase tracking-wider font-bold">
                  Included Components:
                </span>
                <ul className="flex flex-col text-[13px] font-body-sm divide-y divide-surface-container/60">
                  {fullAutomation.components.map((comp) => (
                    <li
                      key={comp.name}
                      className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3"
                    >
                      <div className="flex flex-col">
                        <span
                          className={`${comp.highlight ? 'font-semibold text-primary' : 'text-on-surface'
                            }`}
                        >
                          {comp.name}
                        </span>
                        {comp.desc && (
                          <span className="text-[11px] text-on-surface-variant">
                            {comp.desc}
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-label-mono font-bold whitespace-nowrap self-start sm:self-auto ${comp.highlight
                          ? 'text-primary font-semibold'
                          : 'text-on-surface'
                          }`}
                      >
                        {comp.priceFormatted}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card CTA & Disclaimers */}
            <div className="flex flex-col gap-3 pt-4 border-t border-surface-container">
              <a
                href={fullAutomation.ctaHref}
                className="w-full min-h-[48px] py-3.5 px-5 rounded-xl bg-primary hover:bg-tertiary text-on-primary font-label-ui text-[14px] font-semibold text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                {fullAutomation.ctaText}
              </a>
              <span className="text-[11px] font-label-mono text-center text-outline">
                {fullAutomation.amcNote}
              </span>
            </div>
          </div>
        </div>

        {/* Tentative Pricing Disclaimers & Notes */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-primary font-label-mono text-[12px] font-bold uppercase">
            <span className="material-symbols-outlined text-[18px]">info</span>
            <span>{pricingConfig.disclaimers.title}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px] font-body-sm text-on-surface-variant leading-relaxed">
            <p>
              • <strong>Tentative Quotation Note:</strong> {pricingConfig.disclaimers.quotationNote}
            </p>
            <p>
              • <strong>Civil Works Scope:</strong> {pricingConfig.disclaimers.civilsScope}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
