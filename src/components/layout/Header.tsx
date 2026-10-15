'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/config/site';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
      data-testid="main-header"
    >
      {/* ── Mobile Top Booking Banner (hidden on sm+) ─────────────────── */}
      <div
        className="sm:hidden w-full bg-gradient-to-r from-primary via-[#007ba8] to-primary text-white border-b border-primary/20 shadow-xs"
        data-testid="mobile-top-banner"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shrink-0" />
            <span className="font-semibold truncate tracking-tight text-white/95">
              Get eTIMS Ready
            </span>
          </div>
          <Link
            href="/#demo-section"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center gap-1 bg-white text-primary px-3 py-1 rounded-full text-[11px] font-bold shadow-xs hover:bg-surface-container active:scale-95 transition-all shrink-0"
          >
            <span>Book a Demo</span>
            <span className="material-symbols-outlined text-[13px] leading-none">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* ── Main Navigation Bar ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
        <div className="flex items-center gap-6 lg:gap-10">
          <Link
            href="/"
            className="flex flex-col items-start gap-0.5"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="py-1.5 sm:py-2 w-auto object-contain h-14 sm:h-16"
              style={{ width: 'auto' }}
              priority
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-8" aria-label="Desktop Navigation">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-on-surface hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors px-2 py-1.5"
          >
            Talk to Us
          </a>

          {/* Desktop/Tablet CTA Button (Hidden on Mobile <sm, replaced by Top Banner) */}
          <a
            href="#demo-section"
            className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-primary text-on-primary text-[13px] sm:text-[14px] text-center font-semibold shadow-sm hover:bg-tertiary transition-all"
          >
            Request a Demo
          </a>

          {/* Mobile Navigation Toggle Button with Defined Text */}
          <button
            type="button"
            id="mobile-menu-toggle"
            data-testid="mobile-menu-toggle"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-surface-container-high bg-surface-container-lowest text-on-surface hover:text-primary hover:border-primary/40 active:scale-95 transition-all cursor-pointer touch-manipulation shadow-xs"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="material-symbols-outlined text-[20px] select-none pointer-events-none transition-transform duration-200">
              {mobileOpen ? 'close' : 'menu'}
            </span>
            <span className="font-semibold text-[13px] tracking-tight">
              {mobileOpen ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer Menu ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          data-testid="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden absolute top-full left-0 w-full h-[100dvh] bg-[#faf8ff] border-t border-surface-container shadow-2xl overflow-y-auto z-[100]"
        >
          <div className="max-w-lg mx-auto px-6 py-6 pb-40 flex flex-col">

            {/* Clean Site Navigation Header */}
            <div className="pb-3 mb-2 border-b border-surface-container">
              <p className="text-[14px] font-bold text-on-surface tracking-tight">
                Site Navigation
              </p>
              <p className="text-[11px] text-on-surface-variant font-medium">
                EasyFuel Pro • eTIMS-Ready Fuel Solution
              </p>
            </div>

            {/* ── Main Navigation List (Linear, Elegant, Typographic) ── */}
            <nav className="flex flex-col divide-y divide-surface-container/70" aria-label="Mobile Navigation Links">

              {/* Solutions Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  id="mobile-solutions-accordion"
                  data-testid="mobile-solutions-accordion"
                  aria-expanded={solutionsOpen}
                  aria-label="Toggle solutions menu"
                  onClick={() => setSolutionsOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between py-3 text-[17px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer touch-manipulation text-left"
                >
                  <span>Solutions</span>
                  <span
                    className={`material-symbols-outlined text-[22px] text-on-surface-variant transition-transform duration-200 ${solutionsOpen ? 'rotate-180 text-primary' : ''
                      }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Sub-menu items indented and clean */}
                {solutionsOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-2 border-l-2 border-primary/40 my-1 ml-1 bg-surface-container-low/30 rounded-r-lg">
                    {[
                      { label: 'Forecourt Management', href: '/#solutions' },
                      { label: 'Pump Automation', href: '/#solutions' },
                      { label: 'eTIMS Compliance', href: '/#etims-compliance' },
                      { label: 'Analytics & Variance', href: '/#solutions' },
                    ].map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-[14px] font-medium text-on-surface hover:text-primary active:text-primary transition-colors py-1.5"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Core Nav Links */}
              {[
                { label: 'Architecture', href: '/#architecture' },
                { label: 'Partners', href: '/#about' },
                { label: 'Pricing', href: '/#pricing' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3.5 text-[17px] font-semibold text-on-surface hover:text-primary transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant/40">
                    arrow_forward
                  </span>
                </Link>
              ))}
            </nav>

            {/* ── Direct Contact & Dispatch Section ── */}
            <div className="mt-8 pt-6 border-t border-surface-container flex flex-col gap-3">
              <p className="text-[11px] uppercase font-label-mono tracking-widest text-on-surface-variant font-semibold">
                Direct Channels
              </p>

              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 py-2 text-[15px] font-semibold text-on-surface hover:text-primary transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                </span>
                <span data-testid="mobile-phone-header-text">{siteConfig.phone}</span>
              </a>

              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between py-2 text-[15px] font-semibold text-on-surface hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#25D366]/15 flex items-center justify-center text-[#075E54] shrink-0">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </span>
                  <span>WhatsApp Dispatch</span>
                </div>
                <span data-testid="mobile-whatsapp-header-text" className="text-xs font-label-mono text-on-surface-variant">
                  {siteConfig.whatsapp}
                </span>
              </a>
            </div>

            {/* ── Primary Action CTA ── */}
            <div className="mt-6 pt-2">
              <Link
                href="/#demo-section"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-3.5 px-6 rounded-xl bg-primary text-on-primary text-center font-bold text-[15px] shadow-sm hover:bg-tertiary active:scale-[0.99] transition-all"
              >
                Request a Demo
              </Link>
            </div>

            <p className="text-center text-[11px] text-on-surface-variant mt-6">
              Pergamon Group • Industrial Automation & Forecourt Systems
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
