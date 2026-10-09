import { siteConfig } from '@/config/site';

export function ValueProps() {
  const { valueProps } = siteConfig;

  return (
    <section className="w-full py-space-2xl lg:py-space-3xl bg-surface-container-low" data-testid="value-props-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
        <div className="flex flex-col gap-3 text-center items-center max-w-2xl mx-auto">
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-bold">
            {valueProps.badge}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
            {valueProps.headline}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {valueProps.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueProps.pillars.map((pillar, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-3 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">{pillar.icon}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{pillar.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
