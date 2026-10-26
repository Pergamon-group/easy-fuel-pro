'use client';

import { useState } from 'react';
import NumberFlow from '@number-flow/react';
import { siteConfig } from '@/config/site';

export function FeatureGrid() {
  const { featuresGrid } = siteConfig;
  const [activeFlow, setActiveFlow] = useState<number>(41.8);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const triggerPulse = () => {
    setIsSimulating(true);
    setActiveFlow((prev) => (prev > 45 ? 38.4 : Number((prev + 3.2).toFixed(1))));
    setTimeout(() => setIsSimulating(false), 300);
  };

  return (
    <section
      className="w-full py-16 lg:py-24 bg-surface-container-low border-b border-surface-container scroll-mt-24 relative"
      data-testid="feature-grid-section"
      id="solutions"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2.5 max-w-3xl">
            <span className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-bold">
              {featuresGrid.badge}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              {featuresGrid.headline}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {featuresGrid.description}
            </p>
          </div>
          <div className="p-3 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-2.5 self-start md:self-auto shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] font-label-mono font-bold text-on-surface">
              Telemetry Status: Active
            </span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresGrid.features.map((feature, idx) => {
            const isFeatured = idx === 0 || idx === 2;

            return (
              <div
                key={feature.title}
                className={`p-6 sm:p-7 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col justify-between gap-6 transition-all duration-200 hover:border-primary/40 hover:shadow-md ${
                  isFeatured ? 'lg:col-span-1' : ''
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shadow-xs">
                    <span className="material-symbols-outlined text-[26px]">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-[19px] sm:text-[21px] text-on-surface font-bold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant mt-2 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Feature specific visual component */}
                {feature.visual.type === 'flow' && (
                  <div
                    onClick={triggerPulse}
                    role="button"
                    tabIndex={0}
                    aria-label="Simulate nozzle pulse"
                    className="p-4 rounded-2xl bg-surface-container border border-surface-container-high flex flex-col gap-2.5 cursor-pointer active:scale-[0.98] transition-transform select-none"
                  >
                    <div className="flex items-center justify-between font-label-mono text-[11px] sm:text-label-mono">
                      <span className="text-on-surface-variant flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                        Active Nozzle Pulse
                      </span>
                      <span className="text-primary font-bold flex items-center gap-1">
                        <span>Flow: </span>
                        <NumberFlow value={activeFlow} format={{ minimumFractionDigits: 1 }} />
                        <span> L/min</span>
                      </span>
                    </div>
                    <div className="w-full flex items-end gap-1.5 h-8 pt-1">
                      <div
                        className={`flex-1 bg-primary-container rounded-xs transition-all duration-200 ${
                          isSimulating ? 'h-6' : 'h-4'
                        }`}
                      />
                      <div
                        className={`flex-1 bg-primary-container rounded-xs transition-all duration-200 ${
                          isSimulating ? 'h-8' : 'h-6'
                        }`}
                      />
                      <div
                        className={`flex-1 bg-primary rounded-xs transition-all duration-200 ${
                          isSimulating ? 'h-5' : 'h-7'
                        }`}
                      />
                      <div
                        className={`flex-1 bg-primary-container rounded-xs transition-all duration-200 ${
                          isSimulating ? 'h-7' : 'h-5'
                        }`}
                      />
                      <div
                        className={`flex-1 bg-primary-container rounded-xs transition-all duration-200 ${
                          isSimulating ? 'h-8' : 'h-7'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {feature.visual.type === 'sparkline' && (
                  <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-high flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-label-ui text-label-ui text-on-surface-variant uppercase font-medium">
                        Throughput / Hr
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">
                        {feature.visual.value}
                      </span>
                    </div>
                    <svg className="w-24 h-8 text-primary" fill="none" viewBox="0 0 100 30" aria-hidden="true">
                      <path
                        d="M0 25 L20 18 L40 22 L60 8 L80 14 L100 4"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                )}

                {feature.visual.type === 'badge' && (
                  <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">qr_code_2</span>
                      <span className="font-label-mono text-[11px] sm:text-label-mono text-on-surface font-bold leading-tight">
                        {feature.visual.label}
                      </span>
                    </div>
                    <span className="self-start sm:self-auto px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-label-mono text-[10px] font-bold tracking-wider uppercase whitespace-nowrap">
                      AUTO-FISCAL
                    </span>
                  </div>
                )}

                {feature.visual.type === 'splits' && (
                  <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-high flex justify-between items-center text-center">
                    <div>
                      <span className="font-label-ui text-[11px] text-on-surface-variant block font-semibold">
                        M-PESA
                      </span>
                      <span className="font-label-mono text-label-mono font-bold text-on-surface">58%</span>
                    </div>
                    <div className="w-[1px] h-6 bg-outline-variant/60" />
                    <div>
                      <span className="font-label-ui text-[11px] text-on-surface-variant block font-semibold">
                        CASH
                      </span>
                      <span className="font-label-mono text-label-mono font-bold text-on-surface">24%</span>
                    </div>
                    <div className="w-[1px] h-6 bg-outline-variant/60" />
                    <div>
                      <span className="font-label-ui text-[11px] text-on-surface-variant block font-semibold">
                        FLEET CARD
                      </span>
                      <span className="font-label-mono text-label-mono font-bold text-primary">18%</span>
                    </div>
                  </div>
                )}

                {feature.visual.type === 'audit' && (
                  <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                    <span className="font-label-mono text-[11px] sm:text-label-mono text-on-surface-variant leading-tight font-medium">
                      {feature.visual.label}
                    </span>
                    <span className="font-label-mono text-label-mono font-bold text-emerald-600 dark:text-emerald-400">
                      Variance: 0.00 L
                    </span>
                  </div>
                )}

                {feature.visual.type === 'lock' && (
                  <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-high flex items-center justify-between">
                    <span className="font-label-mono text-label-mono text-on-surface-variant font-medium">
                      {feature.visual.label}
                    </span>
                    <span className="material-symbols-outlined text-primary text-[20px]">lock_clock</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
