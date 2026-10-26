import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { FiscalPrinter } from '@/components/ui/FiscalPrinter';

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-16 lg:py-24" data-testid="hero-section">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="hero-copy relative lg:col-span-6 flex flex-col items-start">
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/0 border border-primary/0 text-primary font-label-ui text-label-ui uppercase tracking-wider font-semibold mb-6"> */}
            {/* <span className="w-2 h-2 rounded-full bg-primary-container"></span> */}
            {/* <span>{siteConfig.hero.badge}</span> */}
            {/* </div> */}

            <h1
              className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight font-extrabold mb-6 leading-tight"
              dangerouslySetInnerHTML={{
                // different color for Smart Forecourt Management
                __html: siteConfig.tagline.replace('Smart Forecourt Management', '<span class="text-primary-container underline decoration-dotted text-shadow-primary/10 text-shadow-xs">Smart Forecourt Management</span>')
              }}
            >
              {/* {siteConfig.tagline} */}
            </h1>
            {/* <p className="text-lg lg:text-xl font-bold text-on-surface tracking-tight leading-snug mb-3">
              {siteConfig.hero.subheadline}
            </p> */}
            {/* <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight font-extrabold mb-6 leading-tight">
              {siteConfig.hero.subheadline}
            </h1>
            <p className="text-lg lg:text-xl font-bold text-on-surface tracking-tight leading-snug mb-3">
              {siteConfig.tagline}
            </p> */}
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="hero-etims relative w-full p-4 sm:p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/50 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="hero-fiscal-printer hero-fiscal-printer--mobile" aria-label="Interactive fiscal printer">
                <FiscalPrinter />
              </div>
              <div className="bg-transparent dark:bg-white/90 rounded-xl p-0 dark:p-2.5 shrink-0 self-start sm:self-center flex items-center justify-center transition-colors">
                <Image
                  src={siteConfig.etimsIntegrator.src}
                  alt={siteConfig.etimsIntegrator.alt}
                  width={siteConfig.etimsIntegrator.width}
                  height={siteConfig.etimsIntegrator.height}
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </div>
              <p
                className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: siteConfig.hero.etimsNote.replace('eTIMS-ready technology', '<b class="font-semibold text-on-surface">eTIMS-ready technology</b>')
                }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                href={siteConfig.hero.primaryCta.href}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-primary-container text-on-primary-container font-label-ui text-[15px] font-bold shadow-md hover:brightness-105 active:scale-95 transition-all duration-120"
              >
                {siteConfig.hero.primaryCta.label}
              </Link>
              <a
                href={siteConfig.hero.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface hover:text-primary font-label-ui text-[15px] font-semibold active:scale-95 transition-all duration-120"
              >
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
              {/* <div className="relative rounded-2xl overflow-hidden shadow-none border border-slate-200/80 bg-white h-[360px] w-full"> */}
              <div className="hero-image relative rounded-2xl overflow-visible shadow-none border border-outline-variant/60 bg-surface-container-lowest aspect-[887/467] w-full">
                <div className="hero-fiscal-printer hero-fiscal-printer--desktop" aria-label="Interactive fiscal printer">
                  <FiscalPrinter />
                </div>
                <div className="hero-image-frame absolute inset-0 overflow-hidden rounded-2xl">
                  <Image
                    src={siteConfig.hero.image.src}
                    alt={siteConfig.hero.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale-15 hover:grayscale-0 transition-all duration-500"
                    priority
                  />
                </div>
                {/* <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs text-on-surface font-label-mono text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span>{siteConfig.hero.image.badge}</span>
                </div> */}
              </div>
              {/* <div className="bg-white rounded-2xl p-5 shadow-none border border-slate-200/80 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pb-3 border-b border-surface-container">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-primary/0 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">local_gas_station</span>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-headline-sm text-[14px] sm:text-[15px] font-bold text-on-surface leading-tight">{siteConfig.hero.liveMetrics.stationName}</h4>
                      <span className="font-label-mono text-[10px] sm:text-[11px] text-on-surface-variant leading-tight">{siteConfig.hero.liveMetrics.controllerId}</span>
                    </div>
                  </div>
                  <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 border border-primary/20 text-white font-label-mono text-[10px] sm:text-[11px] font-bold">
                    <span>{siteConfig.hero.liveMetrics.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-surface-container-low/5 flex flex-col gap-0.5 justify-between">
                    <span className="font-label-ui text-[11px] text-on-surface-variant uppercase font-medium ">{siteConfig.hero.liveMetrics.metrics[0].label}</span>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">{siteConfig.hero.liveMetrics.metrics[0].value}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low/5 flex flex-col gap-0.5 justify-between">
                    <span className="font-label-ui text-[11px] text-on-surface-variant uppercase font-medium">{siteConfig.hero.liveMetrics.metrics[1].label}</span>
                    <span className="font-headline-sm text-[12px] md:text-[15px] font-bold text-primary flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[10px] md:text-[16px]">{siteConfig.hero.liveMetrics.metrics[1].icon}</span>{siteConfig.hero.liveMetrics.metrics[1].value}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low/5 flex flex-col gap-0.5 justify-between">
                    <span className="font-label-ui text-[11px] text-on-surface-variant uppercase font-medium">{siteConfig.hero.liveMetrics.metrics[2].label}</span>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">{siteConfig.hero.liveMetrics.metrics[2].value}</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
