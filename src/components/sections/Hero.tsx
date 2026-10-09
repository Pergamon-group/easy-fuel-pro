import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-16 lg:py-24" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/0 border border-primary/0 text-primary font-label-ui text-label-ui uppercase tracking-wider font-semibold mb-6"> */}
            {/* <span className="w-2 h-2 rounded-full bg-primary-container"></span> */}
            {/* <span>{siteConfig.hero.badge}</span> */}
            {/* </div> */}

            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight font-extrabold mb-6 leading-tight">
              {siteConfig.tagline}
            </h1>
            <p className="text-lg lg:text-xl font-bold text-on-surface tracking-tight leading-snug mb-3">
              {siteConfig.hero.subheadline}
            </p>
            {/* <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight font-extrabold mb-6 leading-tight">
              {siteConfig.hero.subheadline}
            </h1>
            <p className="text-lg lg:text-xl font-bold text-on-surface tracking-tight leading-snug mb-3">
              {siteConfig.tagline}
            </p> */}
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="w-full p-4 rounded-xl bg-surface-container-lowest border border-primary/20 shadow-sm mb-8">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[22px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <p
                  className="font-body-sm text-body-sm text-on-surface font-medium leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: siteConfig.hero.etimsNote.replace('eTIMS-ready technology', '<b class="font-semibold text-primary">eTIMS-ready technology</b>')
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link href={siteConfig.hero.primaryCta.href} className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#00a3e0] text-white font-label-ui  text-[15px] text-[15px] font-semibold shadow-md hover:bg-primary transition-all duration-200">
                {siteConfig.hero.primaryCta.label}
              </Link>
              <a href={siteConfig.hero.secondaryCta.href} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-transparent border border-outline-variant hover:border-primary text-on-surface hover:text-primary font-label-ui text-[15px] font-semibold transition-all duration-200">
                {siteConfig.hero.secondaryCta.label}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href={siteConfig.phoneHref} className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-primary text-[18px]">call</span>
                <span className="font-label-mono text-label-mono font-semibold">{siteConfig.phone}</span>
              </a>
              <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-primary text-[18px]">chat</span>
                <span className="font-label-mono text-label-mono font-semibold">WhatsApp: {siteConfig.whatsapp}</span>
              </a>
            </div>
          </div>
          {/* Right Column */}
          <div className="lg:col-span-6 relative">
            <div className="flex flex-col gap-4 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white h-[360px] w-full">
                <Image
                  src={siteConfig.hero.image.src}
                  alt={siteConfig.hero.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-on-surface font-label-mono text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span>{siteConfig.hero.image.badge}</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200/80 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">local_gas_station</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-[15px] font-bold text-on-surface">{siteConfig.hero.liveMetrics.stationName}</h4>
                      <span className="font-label-mono text-[11px] text-on-surface-variant">{siteConfig.hero.liveMetrics.controllerId}</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-mono text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    <span>{siteConfig.hero.liveMetrics.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-0.5 justify-between">
                    <span className="font-label-ui text-[11px] text-on-surface-variant uppercase font-medium">{siteConfig.hero.liveMetrics.metrics[0].label}</span>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">{siteConfig.hero.liveMetrics.metrics[0].value}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-0.5 justify-between">
                    <span className="font-label-ui text-[11px] text-on-surface-variant uppercase font-medium">{siteConfig.hero.liveMetrics.metrics[1].label}</span>
                    <span className="font-headline-sm text-[12px] md:text-[15px] font-bold text-primary flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[10px] md:text-[16px]">{siteConfig.hero.liveMetrics.metrics[1].icon}</span>{siteConfig.hero.liveMetrics.metrics[1].value}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-0.5 justify-between">
                    <span className="font-label-ui text-[11px] text-on-surface-variant uppercase font-medium">{siteConfig.hero.liveMetrics.metrics[2].label}</span>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">{siteConfig.hero.liveMetrics.metrics[2].value}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
