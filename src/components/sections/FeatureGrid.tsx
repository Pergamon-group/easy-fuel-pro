import { siteConfig } from '@/config/site';

export function FeatureGrid() {
  const { featuresGrid } = siteConfig;

  return (
    <section className="w-full py-space-2xl lg:py-space-3xl bg-surface-container-low" data-testid="feature-grid-section" id="solutions">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-3xl">
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-bold">
            {featuresGrid.badge}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            {featuresGrid.headline}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {featuresGrid.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresGrid.features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">{feature.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Feature specific visual component */}
              {feature.visual.type === "flow" && (
                <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-2">
                  <div className="flex items-center justify-between font-label-mono text-label-mono">
                    <span className="text-on-surface-variant">Active Nozzle Pulse</span>
                    <span className="text-primary font-bold">Flow: 41.8 L/min</span>
                  </div>
                  <div className="w-full flex items-end gap-1 h-8">
                    <div className="flex-1 bg-primary-container h-4 rounded-sm"></div>
                    <div className="flex-1 bg-primary-container h-6 rounded-sm"></div>
                    <div className="flex-1 bg-primary h-7 rounded-sm"></div>
                    <div className="flex-1 bg-primary-container h-5 rounded-sm"></div>
                    <div className="flex-1 bg-tertiary-container h-8 rounded-sm"></div>
                  </div>
                </div>
              )}

              {feature.visual.type === "sparkline" && (
                <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-ui text-label-ui text-on-surface-variant">Throughput / Hr</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{feature.visual.value}</span>
                  </div>
                  <svg className="w-24 h-8 text-primary" fill="none" viewBox="0 0 100 30">
                    <path d="M0 25 L20 18 L40 22 L60 8 L80 14 L100 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  </svg>
                </div>
              )}

              {feature.visual.type === "badge" && (
                <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">qr_code_2</span>
                    <span className="font-label-mono text-label-mono text-on-surface font-bold">{feature.visual.label}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container font-label-mono text-[10px] text-primary font-bold">AUTO-FISCAL</span>
                </div>
              )}

              {feature.visual.type === "splits" && (
                <div className="p-3.5 rounded-xl bg-surface-container-low flex justify-between items-center text-center">
                  <div>
                    <span className="font-label-ui text-[11px] text-on-surface-variant block">M-PESA</span>
                    <span className="font-label-mono text-label-mono font-bold text-on-surface">58%</span>
                  </div>
                  <div>
                    <span className="font-label-ui text-[11px] text-on-surface-variant block">CASH</span>
                    <span className="font-label-mono text-label-mono font-bold text-on-surface">24%</span>
                  </div>
                  <div>
                    <span className="font-label-ui text-[11px] text-on-surface-variant block">FLEET CARD</span>
                    <span className="font-label-mono text-label-mono font-bold text-primary">18%</span>
                  </div>
                </div>
              )}

              {feature.visual.type === "audit" && (
                <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-on-surface-variant">{feature.visual.label}</span>
                  <span className="font-label-mono text-label-mono font-bold text-primary">Variance: 0.00 L</span>
                </div>
              )}

              {feature.visual.type === "lock" && (
                <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-on-surface-variant">{feature.visual.label}</span>
                  <span className="material-symbols-outlined text-primary text-[20px]">lock_clock</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
