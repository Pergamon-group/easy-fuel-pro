'use client';

import { useState } from 'react';

export interface InfoCardProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  icon?: string;
  defaultExpanded?: boolean;
}

export function InfoCard({
  title,
  badge = 'Technical Note',
  children,
  icon = 'help',
  defaultExpanded = false,
}: InfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <aside
      className="my-3 rounded-xl border border-outline-variant/40 bg-surface shadow-2xs overflow-hidden"
      data-testid="info-card"
      aria-label={title}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="accordion-trigger w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-surface-container-low active:bg-surface-container transition-colors duration-150 focus:outline-none focus-visible:bg-surface-container-low cursor-pointer shadow-none"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-surface-container text-on-surface-variant shrink-0">
            <span className="material-symbols-outlined text-[16px]">{icon}</span>
          </span>
          <div className="flex items-center gap-2">
            <h4 className="font-headline-sm text-xs font-semibold text-on-surface">
              {title}
            </h4>
            <span className="hidden sm:inline-block font-label-ui text-[10px] font-medium uppercase tracking-wider text-on-surface-variant/70">
              ({badge})
            </span>
          </div>
        </div>

        <span
          className={`material-symbols-outlined text-on-surface-variant text-[18px] transition-transform duration-200 ease-out shrink-0 ${
            isExpanded ? 'rotate-180 text-primary' : ''
          }`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {isExpanded && (
        <div
          className="px-4 pb-3.5 pt-2.5 text-xs text-on-surface-variant font-body-md border-t border-outline-variant/20 bg-surface-container-lowest/60 leading-relaxed animate-accordion-down"
          data-testid="info-card-content"
        >
          {children}
        </div>
      )}
    </aside>
  );
}
