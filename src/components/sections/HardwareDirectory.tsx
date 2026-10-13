'use client';

import { useState } from 'react';
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

  // Derived state without useEffect
  const filteredBrands: readonly HardwareBrand[] = searchHardwareBrands(
    searchQuery,
    activeCategory
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 hover:border-primary text-primary font-label-ui text-[13px] md:text-[14px] font-semibold shadow-xs hover:shadow-md transition-all group cursor-pointer"
        aria-label="Search all 151 dispensers & 62 ATG probes"
      >
        <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">
          search_insights
        </span>
        <span>
          Search All {TOTAL_DISPENSER_COUNT} Dispensers &amp; {TOTAL_ATG_COUNT} ATG Probes
        </span>
        <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">
          open_in_new
        </span>
      </button>

      {/* Interactive Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="hardware-catalog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-on-surface/50 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-surface-container bg-surface-container-low/60 flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-label-mono text-primary font-bold tracking-wider uppercase">
                  Verified Forecourt Protocol Catalog
                </span>
                <h3
                  id="hardware-catalog-title"
                  className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight"
                >
                  Supported Brands of Fuel Dispensers &amp; ATG Probes
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  EasyFuel Pro and the PTS-2 Forecourt Controller provide native industrial protocol
                  support for over 150 dispenser brands and 60+ tank monitoring systems.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close compatibility catalog"
                className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 sm:p-6 border-b border-surface-container flex flex-col sm:flex-row gap-3 sm:items-center justify-between bg-surface-container-lowest">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dispenser or ATG probe brand (e.g. Gilbarco, Wayne, Tatsuno, Fafnir, OPW)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-hidden focus:ring-2 focus:ring-primary shadow-xs border border-transparent focus:border-primary transition-all"
                />
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  aria-label="Filter by All"
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-label-ui font-semibold transition-colors cursor-pointer ${
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
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-label-ui font-semibold transition-colors cursor-pointer ${
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
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-label-ui font-semibold transition-colors cursor-pointer ${
                    activeCategory === 'atg'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  ATG Probes ({TOTAL_ATG_COUNT})
                </button>
              </div>
            </div>

            {/* Brands Grid (Scrollable) */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[50vh] flex flex-col gap-4">
              <div className="flex items-center justify-between text-[12px] font-label-mono text-on-surface-variant">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
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
                <div className="p-8 text-center flex flex-col items-center gap-2 text-on-surface-variant">
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
            <div className="p-4 sm:p-5 border-t border-surface-container bg-surface-container-low/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <span className="text-[12px] font-body-sm text-on-surface-variant">
                Need verification for a rare or older hydraulic dispenser? We support 66+ open RS-485
                and current-loop protocols.
              </span>
              <a
                href="#demo-section"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-tertiary text-on-primary font-label-ui text-[12px] font-semibold transition-colors shrink-0"
              >
                Request Site Compatibility Survey
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
