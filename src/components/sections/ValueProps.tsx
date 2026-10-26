import { siteConfig } from '@/config/site';

export function ValueProps() {
  const { valueProps } = siteConfig;

  return (
    <section
      className="w-full py-16 lg:py-24 bg-surface border-b border-surface-container"
      data-testid="value-props-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
        <div className="flex flex-col gap-3 text-center items-center max-w-2xl mx-auto">
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-bold">
            {valueProps.badge}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
            {valueProps.headline}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {valueProps.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueProps.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col gap-4 hover:border-primary/40 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-2xl bg-surface-container flex items-center justify-center text-primary shadow-xs">
                <span className="material-symbols-outlined text-[24px]">{pillar.icon}</span>
              </div>
              <h3 className="font-headline-sm text-[18px] font-bold text-on-surface tracking-tight">
                {pillar.title}
              </h3>
              <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
