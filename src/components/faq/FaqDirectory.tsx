'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FORECOURT_FAQS, FaqItem } from '@/data/faqs';
import { siteConfig } from '@/config/site';

const CATEGORIES = [
  'All',
  'Compliance & eTIMS',
  'Commercial & Hardware',
  'Compatibility',
  'Deployment',
  'Reliability',
  'Support & Warranty',
] as const;

export function FaqDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  // Derived filtered state - no useEffect needed
  const filteredFaqs: readonly FaqItem[] = FORECOURT_FAQS.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      q === '' ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const toggleItem = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Search Bar & Category Filter Bar */}
      <div className="flex flex-col gap-5 p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
        {/* Search input */}
        <div className="relative w-full">
          <span className="material-symbols-outlined text-outline text-[22px] absolute left-4 top-1/2 -translate-y-1/2">
            search
          </span>
          <input
            type="text"
            aria-label="Search forecourt FAQs"
            placeholder="Search by topic, e.g. PTS-2, Incotex ESD, Wayne, site survey, AMC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-surface-container-low border border-surface-container text-on-surface font-body-md text-[14px] placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 rounded-full text-[18px]"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scroll-smooth no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-label-mono text-[11px] font-bold uppercase whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Accordion */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-[12px] font-label-mono text-outline px-1">
          <span>Showing {filteredFaqs.length} of {FORECOURT_FAQS.length} questions</span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-primary hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 text-center flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-[36px] text-outline">
              search_off
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              No matching answers found
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              We couldn&apos;t find an exact answer for &quot;{searchQuery}&quot;. Our engineering specialists are available to answer your specific technical forecourt questions directly.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-ui text-[13px] font-semibold hover:bg-surface-container-high transition-colors"
              >
                Clear Search
              </button>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-ui text-[13px] font-semibold hover:bg-tertiary transition-colors"
              >
                Ask an Engineer
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndices.includes(index);
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 font-headline-sm text-[16px] sm:text-headline-sm font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col gap-1">
                      {faq.category && (
                        <span className="font-label-mono text-[10px] uppercase tracking-wider text-primary font-semibold">
                          {faq.category}
                        </span>
                      )}
                      <span>{faq.question}</span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-primary text-[22px] transition-transform duration-200 shrink-0 mt-0.5 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      keyboard_arrow_down
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 font-body-md text-body-md text-on-surface-variant leading-relaxed border-t border-surface-container/60 pt-4 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Human Consultation Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex flex-col gap-1.5 max-w-xl">
          <div className="inline-flex items-center gap-2 text-primary font-label-mono text-[11px] font-bold uppercase">
            <span className="material-symbols-outlined text-[16px]">headset_mic</span>
            <span>Direct Technical Assistance</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Do you have questions about your forecourt setup?
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Every forecourt is unique. Our team is ready to review your dispenser brands, tank configuration, and KRA compliance timeline with you.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={siteConfig.phoneHref}
            className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-ui text-[13px] font-semibold transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">call</span>
            <span>{siteConfig.phone}</span>
          </a>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-tertiary text-on-primary font-label-ui text-[13px] font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Book a Site Survey</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
