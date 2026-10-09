import { siteConfig } from '@/config/site';

export function Scalability() {
  const { scalability } = siteConfig;

  return (
    <section className="w-full py-space-2xl lg:py-space-3xl bg-surface-container-low" data-testid="scalability-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-bold">
              {scalability.badge}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              {scalability.headline}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {scalability.description}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container text-primary font-headline-sm text-headline-sm font-semibold max-w-md">
            {scalability.quote}
          </div>
        </div>

        {/* Architectural Mode Switcher Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {scalability.modes.map((mode, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start lg:items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[28px] mt-1 lg:mt-0">{mode.icon}</span>
                  <div>
                    <h3 className="font-headline-md text-[18px] md:text-headline-md text-on-surface font-bold leading-tight">{mode.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 lg:mt-0">{mode.subtitle}</p>
                  </div>
                </div>
                <span className={`self-start lg:self-auto px-3 py-1 rounded font-label-mono text-[11px] md:text-label-mono font-semibold whitespace-nowrap ${mode.badge.type === 'primary' ? 'bg-surface-container text-primary' : 'bg-secondary-container text-on-secondary-container'}`}>
                  {mode.badge.label}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {mode.description}
              </p>
              <div className="p-4 rounded-xl bg-surface-container-low grid grid-cols-2 gap-4 text-center">
                {mode.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="p-3 bg-surface-container-lowest rounded-lg">
                    <span className="font-label-ui text-[11px] text-on-surface-variant uppercase block">{metric.label}</span>
                    <span className="font-headline-sm text-headline-sm font-bold text-primary">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
