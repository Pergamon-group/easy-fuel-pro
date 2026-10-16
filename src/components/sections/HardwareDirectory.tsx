'use client';

import { useState, useEffect } from 'react';
import {
  TOTAL_DISPENSER_COUNT,
  TOTAL_ATG_COUNT,
  searchHardwareBrands,
  type HardwareBrand,
} from '@/data/hardware-brands';

interface HardwareDirectoryProps {
  defaultOpen?: boolean;
}

export function HardwareDirectory({ defaultOpen = false }: HardwareDirectoryProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'dispenser' | 'atg'>('all');

  // Justified useEffect per React documentation (https://react.dev/reference/react/useEffect#connecting-to-an-external-system):
  // Synchronizing with external browser window keyboard events (Escape key listener) and locking background body scroll when open.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Derived state without useEffect
  const filteredBrands: readonly HardwareBrand[] = searchHardwareBrands(
    searchQuery,
    activeCategory
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Trigger Button: Subtle accessorial link across mobile and desktop for clean, intentional visual hierarchy */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2 py-2 px-3 text-[13px] sm:text-[14px] text-on-surface-variant hover:text-primary transition-all cursor-pointer bg-transparent border-0 shadow-none"
        aria-label={`Search all ${TOTAL_DISPENSER_COUNT} dispensers & ${TOTAL_ATG_COUNT} ATG probes`}
      >
        <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-outline group-hover:text-primary transition-colors">
          search_insights
        </span>
        <span className="underline decoration-outline-variant/60 underline-offset-4 group-hover:decoration-primary font-medium">
          Search All {TOTAL_DISPENSER_COUNT} Dispensers &amp; {TOTAL_ATG_COUNT} ATG Probes
        </span>
        <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-transform">
          arrow_forward
        </span>
      </button>

      {/* Interactive Modal Dialog: Elevated above fixed header (z-[150] vs z-[100]) & mobile bottom-sheet */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="hardware-catalog-title"
          data-testid="hardware-directory-dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
          className="fixed inset-0 z-[150] flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 md:p-6 bg-on-surface/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full sm:max-w-4xl h-[92dvh] sm:h-auto sm:max-h-[88vh] bg-surface-container-lowest rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-outline-variant/40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200">
            {/* Mobile Sheet Handle Bar */}
            <div className="pt-2.5 pb-1 sm:hidden flex justify-center shrink-0">
              <span className="w-10 h-1 bg-outline-variant/70 rounded-full" aria-hidden="true" />
            </div>

            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-surface-container bg-surface-container-low/70 flex items-start justify-between gap-3 shrink-0">
              <div className="flex flex-col gap-1 min-w-0 pr-1">
                <span className="text-[10px] sm:text-[11px] font-label-mono text-primary font-bold tracking-wider uppercase">
                  Verified Forecourt Protocol Catalog
                </span>
                <h3
                  id="hardware-catalog-title"
                  className="font-headline-sm sm:font-headline-md text-[17px] sm:text-headline-md text-on-surface font-extrabold tracking-tight leading-snug"
                >
                  Supported Brands of Fuel Dispensers &amp; ATG Probes
                </h3>
                <p className="font-body-sm text-[12px] sm:text-body-sm text-on-surface-variant line-clamp-2 sm:line-clamp-none">
                  EasyFuel Pro and the PTS-2 Forecourt Controller provide native industrial protocol
                  support for over 150 dispenser brands and 60+ tank monitoring systems.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close compatibility catalog"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full sm:rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer shrink-0 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-3 sm:p-5 border-b border-surface-container flex flex-col sm:flex-row gap-2.5 sm:gap-3 sm:items-center justify-between bg-surface-container-lowest shrink-0">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dispenser or ATG probe brand (e.g. Gilbarco, Wayne, Tatsuno, Fafnir, OPW)..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-[13px] sm:text-body-md focus:outline-hidden focus:ring-2 focus:ring-primary shadow-xs border border-transparent focus:border-primary transition-all placeholder:text-on-surface-variant/60"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search input"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
              </div>

              {/* Category Filter Tabs with Horizontal Swipe Scrolling on Mobile */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shrink-0">
                <button
                  type="button"
                  aria-label="Filter by All"
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-label-ui font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    activeCategory === 'all'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  All ({TOTAL_DISPENSER_COUNT + TOTAL_ATG_COUNT})
                </button>
                <button
                  type="button"
                  aria-label="Filter by Fuel Dispensers"
                  onClick={() => setActiveCategory('dispenser')}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-label-ui font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    activeCategory === 'dispenser'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Fuel Dispensers ({TOTAL_DISPENSER_COUNT})
                </button>
                <button
                  type="button"
                  aria-label="Filter by ATG Probes"
                  onClick={() => setActiveCategory('atg')}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-label-ui font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    activeCategory === 'atg'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  ATG Probes ({TOTAL_ATG_COUNT})
                </button>
              </div>
            </div>

            {/* Brands Grid (Scrollable Body) */}
            <div className="p-3.5 sm:p-6 overflow-y-auto flex-1 min-h-0 flex flex-col gap-3.5">
              <div className="flex items-center justify-between text-[11px] sm:text-[12px] font-label-mono text-on-surface-variant shrink-0">
                <span>Showing {filteredBrands.length} verified manufacturers</span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Clear search
                  </button>
                )}
              </div>

              {filteredBrands.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 pb-2">
                  {filteredBrands.map((brand) => (
                    <div
                      key={brand.id}
                      className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low/40 hover:bg-surface-container-low hover:border-primary/40 transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-sm text-[13px] font-bold text-on-surface truncate">
                          {brand.name}
                        </span>
                        {brand.notes ? (
                          <span className="text-[10px] font-body-sm text-on-surface-variant truncate">
                            {brand.notes}
                          </span>
                        ) : (
                          <span className="text-[10px] font-label-mono text-outline uppercase tracking-wider">
                            {brand.category === 'dispenser' ? 'Pump Protocol' : 'ATG Probe Protocol'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {brand.fuelType && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-label-mono font-bold uppercase bg-tertiary-container/20 text-tertiary">
                            {brand.fuelType}
                          </span>
                        )}
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-label-mono font-semibold uppercase ${
                            brand.category === 'dispenser'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary/15 text-secondary'
                          }`}
                        >
                          {brand.category === 'dispenser' ? 'Dispenser' : 'ATG'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center flex-1 gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[32px] text-outline">
                    search_off
                  </span>
                  <p className="font-body-md text-body-md font-medium text-on-surface">
                    No hardware found matching &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                    Our engineering team custom-integrates additional proprietary protocols. Contact us
                    for your site survey.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-5 border-t border-surface-container bg-surface-container-low/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-center sm:text-left shrink-0">
              <span className="text-[11px] sm:text-[12px] font-body-sm text-on-surface-variant hidden sm:block">
                Need verification for a rare or older hydraulic dispenser? We support 66+ open RS-485
                and current-loop protocols.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="sm:hidden flex-1 px-4 py-2.5 rounded-lg border border-outline-variant/60 hover:bg-surface-container text-on-surface font-label-ui text-[12px] font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href="#demo-section"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-2 rounded-lg bg-primary hover:bg-tertiary text-on-primary font-label-ui text-[12px] font-semibold transition-colors shrink-0 text-center"
                >
                  Request Compatibility Survey
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

