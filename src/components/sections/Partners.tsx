'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { siteConfig, type PartnerItem } from '@/config/site';

export interface PartnerCardProps {
  name: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  logoSrc?: string;
  logoBg?: 'light' | 'dark';
}

export function PartnerCard({
  name,
  subtitle,
  icon,
  iconBg,
  iconColor,
  logoSrc,
  logoBg,
}: PartnerCardProps) {
  const isDark = logoBg === 'dark';

  return (
    <div className="border border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xs hover:border-primary/50 transition-all flex items-center gap-3 shrink-0 min-w-[200px] h-[72px] select-none group">
      {logoSrc ? (
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center p-1.5 overflow-hidden shrink-0 transition-colors ${
            isDark ? 'bg-[#111827]' : 'bg-surface-container/60'
          }`}
        >
          <Image
            src={logoSrc}
            alt={`${name} logo`}
            width={40}
            height={40}
            className={`max-w-full max-h-full object-contain transition-all duration-300 ${
              !isDark
                ? 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'
                : 'opacity-90 group-hover:opacity-100'
            }`}
          />
        </div>
      ) : (
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-headline-sm text-[14px] font-bold text-on-surface">{name}</span>
        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">{subtitle}</span>
      </div>
    </div>
  );
}

export function Partners() {
  const clientsTrackRef = useRef<HTMLDivElement>(null);
  const partnersTrackRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.dataset.isDragging = 'true';
    el.dataset.startX = String(e.clientX);
    el.dataset.startScroll = String(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.dataset.isDragging !== 'true') return;
    e.preventDefault();
    const startX = parseFloat(el.dataset.startX || '0');
    const startScroll = parseFloat(el.dataset.startScroll || '0');
    const walk = (e.clientX - startX) * 1.4;
    el.scrollLeft = startScroll - walk;
  };

  const stopDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.dataset.isDragging = 'false';
  };

  const scrollTrack = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: 'left' | 'right'
  ) => {
    const el = ref.current;
    if (!el) return;

    const step = 260;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (direction === 'right') {
      // Loop smoothly back to the beginning when at the end
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    } else {
      // Loop smoothly to the end when at the beginning
      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -step, behavior: 'smooth' });
      }
    }
  };

  const { partners } = siteConfig;

  return (
    <section
      id="about"
      aria-labelledby="partners-heading"
      className="w-full py-12 lg:py-16 bg-surface-container-low border-b border-surface-container relative"
    >
      <span id="partners" className="sr-only" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 text-primary font-label-mono text-label-mono font-bold tracking-wider uppercase">
              {/* <span className="w-1.5 h-1.5 rounded-full bg-primary-container" /> */}
              <span>{partners.badge}</span>
            </div>
            <h2
              id="partners-heading"
              className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight"
            >
              {partners.headline}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {partners.description}
            </p>
          </div>
        </div>

        {/* Category 1: Retail Petroleum Networks & Oil Marketing Companies */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-label-ui text-label-ui font-semibold text-on-surface uppercase tracking-wider select-none">
              {partners.networksCategory.title}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Scroll clients left"
                onClick={() => scrollTrack(clientsTrackRef, 'left')}
                className="w-8 h-8 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface hover:text-primary flex items-center justify-center transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button
                type="button"
                aria-label="Scroll clients right"
                onClick={() => scrollTrack(clientsTrackRef, 'right')}
                className="w-8 h-8 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface hover:text-primary flex items-center justify-center transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-surface-container-low to-transparent z-10 hidden sm:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface-container-low to-transparent z-10 hidden sm:block" />
            <div
              ref={clientsTrackRef}
              id="clients-track"
              data-testid="clients-track"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              className="overflow-x-auto flex items-center gap-4 py-2 scroll-smooth select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none]"
            >
              {(partners.networksCategory.items as readonly PartnerItem[]).map((item) => (
                <PartnerCard
                  key={item.name}
                  name={item.name}
                  subtitle={item.subtitle}
                  icon={item.icon}
                  iconBg={item.iconBg}
                  iconColor={item.iconColor}
                  logoSrc={item.logoSrc}
                  logoBg={item.logoBg}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Category 2: Forecourt POS & Hardware Certified Partners */}
        <div className="flex flex-col gap-3 pt-4 border-t border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-label-ui text-label-ui font-semibold text-on-surface uppercase tracking-wider select-none">
              {partners.hardwareCategory.title}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Scroll partners left"
                onClick={() => scrollTrack(partnersTrackRef, 'left')}
                className="w-8 h-8 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface hover:text-primary flex items-center justify-center transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button
                type="button"
                aria-label="Scroll partners right"
                onClick={() => scrollTrack(partnersTrackRef, 'right')}
                className="w-8 h-8 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface hover:text-primary flex items-center justify-center transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-surface-container-low to-transparent z-10 hidden sm:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface-container-low to-transparent z-10 hidden sm:block" />
            <div
              ref={partnersTrackRef}
              id="partners-track"
              data-testid="partners-track"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              className="overflow-x-auto flex items-center gap-4 py-2 scroll-smooth select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none]"
            >
              {(partners.hardwareCategory.items as readonly PartnerItem[]).map((item) => (
                <PartnerCard
                  key={item.name}
                  name={item.name}
                  subtitle={item.subtitle}
                  icon={item.icon}
                  iconBg={item.iconBg}
                  iconColor={item.iconColor}
                  logoSrc={item.logoSrc}
                  logoBg={item.logoBg}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
