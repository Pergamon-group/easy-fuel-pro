import { siteConfig } from '@/config/site';

export function WhyEasyFuel() {
  const { whyEasyFuel } = siteConfig;

  return (
    <section className="w-full py-space-2xl lg:py-space-3xl bg-surface scroll-mt-24" data-testid="why-easy-fuel-section" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <span className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-bold">
              {whyEasyFuel.badge}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              {whyEasyFuel.headline}
            </h2>
            <div className="font-headline-md text-headline-md text-primary font-bold">
              {whyEasyFuel.subheadline}
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {whyEasyFuel.description}
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <span className="font-label-ui text-label-ui uppercase tracking-wider text-on-surface font-bold">
                {whyEasyFuel.benefitsLabel}
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {whyEasyFuel.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Problem vs Solution Comparison Visual Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Legacy Card */}
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[24px] shrink-0">cancel</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {whyEasyFuel.comparison.legacy.title}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {whyEasyFuel.comparison.legacy.description}
              </p>
              <div className="flex flex-col gap-3 pt-2">
                {whyEasyFuel.comparison.legacy.points.map((point, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-surface-container-high flex flex-col gap-1">
                    <span className="font-label-ui text-label-ui text-error font-semibold">{point.title}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{point.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EasyFuel Pro Smart Card */}
            <div className="p-6 rounded-2xl bg-primary text-on-primary shadow-lg flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed text-[24px] shrink-0">check_circle</span>
                <span className="font-headline-sm text-headline-sm font-bold">
                  {whyEasyFuel.comparison.modern.title}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-primary-fixed">
                {whyEasyFuel.comparison.modern.description}
              </p>
              <div className="flex flex-col gap-3 pt-2">
                {whyEasyFuel.comparison.modern.points.map((point, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-surface-container-lowest/10 flex flex-col gap-1">
                    <span className="font-label-ui text-label-ui text-tertiary-fixed font-semibold">{point.title}</span>
                    <span className="font-body-sm text-body-sm text-surface-container-low">{point.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
