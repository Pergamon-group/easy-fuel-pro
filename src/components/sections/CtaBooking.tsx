'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { submitBookingForm } from '@/app/actions/booking';
import { siteConfig } from '@/config/site';

export function CtaBooking() {
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await submitBookingForm(formData);
        if (result.success) {
          setSuccess(true);
        } else {
          setError(result.error || 'Something went wrong. Please check your details.');
        }
      } catch {
        setError('Failed to send your inquiry. Please try again or reach us via WhatsApp.');
      }
    });
  };

  return (
    <section className="w-full py-space-2xl lg:py-space-3xl bg-surface scroll-mt-[108px] sm:scroll-mt-[88px]" id="demo-section" data-testid="cta-section">
      <span id="demo-form" className="sr-only" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">

        {/* Primary Pathway: Full Forecourt Site Survey Gateway */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-primary/15 via-surface-container to-surface-container-low border-2 border-primary/30 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-mono text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Forecourt Technical Onboarding</span>
              </div>

              <h2 className="font-display-hero text-2xl sm:text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight">
                Full Forecourt Site Survey &amp; eTIMS Readiness Audit
              </h2>

              <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-2xl">
                Technical forecourt assessments happen exclusively through our dedicated survey routes. Whether you prefer an interactive 5-minute online wizard with automatic draft autosave, or a printable PDF checklist to walk the pump islands with your station engineer, we have you covered.
              </p>

              <div className="flex flex-wrap gap-2 pt-1 text-xs font-label-ui font-semibold text-on-surface-variant">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-highest/60 text-primary">
                  <span className="material-symbols-outlined text-[15px]">dynamic_form</span>
                  5-Min Online Wizard
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-highest/60 text-primary">
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  Printable Offline Checklist
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-highest/60 text-primary">
                  <span className="material-symbols-outlined text-[15px]">verified_user</span>
                  PTS-2 &amp; eTIMS Architecture
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/site-survey"
                className="w-full py-4 px-6 rounded-2xl bg-primary text-on-primary font-label-ui font-bold text-sm sm:text-base hover:bg-tertiary shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 group text-center cursor-pointer"
              >
                <span>Start Forecourt Survey</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <a
                href="/site-survey/download"
                download="EasyFuel-Pro-Site-Survey-Checklist.pdf"
                className="w-full py-3 px-5 rounded-2xl bg-surface border border-outline-variant/60 text-on-surface font-label-ui font-semibold text-xs sm:text-sm hover:bg-surface-container active:scale-95 transition-all flex items-center justify-center gap-2 text-center shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">file_download</span>
                <span>Download Printable PDF (A4)</span>
              </a>
            </div>
          </div>
        </div>

        {/* General Contact & Inquiry Section */}
        <div className="p-6 md:p-8 lg:p-12 rounded-3xl bg-surface-container-low border border-surface-container shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-start">

            {/* Left Info: Channels & Regional Footprint */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-label-mono text-xs font-semibold w-fit uppercase">
                  💬 General Inquiries &amp; Consultations
                </span>
                <h3 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                  Speak Directly with Pergamon Engineers
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  Do you have a quick question about forecourt automation, need hardware pricing, or want a demo before completing a full site survey? Send us a message or reach our dispatch desks across East Africa.
                </p>
              </div>

              {/* Direct Channel Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a href={siteConfig.phoneHref} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary transition-all">
                  <span className="material-symbols-outlined text-primary text-[20px]">call</span>
                  <div className="flex flex-col">
                    <span className="font-label-ui text-[10px] uppercase text-on-surface-variant font-semibold">Direct Phone</span>
                    <span className="font-label-mono text-[12px] font-bold text-on-surface">{siteConfig.phone}</span>
                  </div>
                </a>

                <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary transition-all">
                  <span className="material-symbols-outlined text-primary text-[20px]">chat</span>
                  <div className="flex flex-col">
                    <span className="font-label-ui text-[10px] uppercase text-on-surface-variant font-semibold">WhatsApp Desk</span>
                    <span className="font-label-mono text-[12px] font-bold text-on-surface">{siteConfig.whatsapp}</span>
                  </div>
                </a>

                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary transition-all">
                  <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
                  <div className="flex flex-col">
                    <span className="font-label-ui text-[10px] uppercase text-on-surface-variant font-semibold">Direct Email</span>
                    <span className="font-label-mono text-[12px] font-bold text-on-surface truncate">{siteConfig.email}</span>
                  </div>
                </a>

                <a href={siteConfig.parentCompany.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary transition-all">
                  <span className="material-symbols-outlined text-primary text-[20px]">language</span>
                  <div className="flex flex-col">
                    <span className="font-label-ui text-[10px] uppercase text-on-surface-variant font-semibold">Corporate Portal</span>
                    <span className="font-label-mono text-[12px] font-bold text-on-surface">pergamongroup.com</span>
                  </div>
                </a>
              </div>

              {/* Pergamon Regional Footprint */}
              <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/20 flex flex-col gap-1.5">
                <span className="font-headline-sm text-xs font-bold text-on-surface">
                  {siteConfig.parentCompany.name} &bull; Regional Operations
                </span>
                <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">
                  Showroom: Lonrho House, Standard St, Nairobi CBD<br />
                  HQ: Springette Office Park, Spring Valley | Kenya &bull; Tanzania &bull; Rwanda
                </p>
              </div>
            </div>

            {/* Right Column: General Contact Us Form */}
            <div id="inquiry-form" className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-5">
              {!success ? (
                <>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-headline-md text-xl sm:text-2xl text-on-surface font-bold">
                      Send a Message or Demo Request
                    </h4>
                    <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                      Drop us a line and our forecourt solutions team will get in touch directly.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-error-container text-on-error-container font-label-ui text-xs">
                      {error}
                    </div>
                  )}

                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="font-label-ui text-xs text-on-surface font-semibold">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="e.g. David Mwangi"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="business" className="font-label-ui text-xs text-on-surface font-semibold">
                          Fuel Station / Company Name *
                        </label>
                        <input
                          type="text"
                          id="business"
                          name="business"
                          required
                          placeholder="e.g. Apex Energy Ltd"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="font-label-ui text-xs text-on-surface font-semibold">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          placeholder="e.g. +254 7XX XXX XXX"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="font-label-ui text-xs text-on-surface font-semibold">
                          Work Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="e.g. david@apexenergy.co.ke"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="font-label-ui text-xs text-on-surface font-semibold">
                        What can we help you with?
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        defaultValue="Live Demo Request"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
                      >
                        <option value="Live Demo Request">Request a Live Forecourt Controller Demo</option>
                        <option value="eTIMS Compliance Advice">KRA eTIMS Compliance Consultation</option>
                        <option value="Pricing & Hardware Quotation">Pricing &amp; Hardware Quotation</option>
                        <option value="Technical Support">Technical Support / Maintenance</option>
                        <option value="Other Inquiry">Other General Question</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="details" className="font-label-ui text-xs text-on-surface font-semibold">
                        Message / Notes (Optional)
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        rows={3}
                        placeholder="Tell us about your forecourt setup, questions, or anything else you'd like us to prepare..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full mt-1 py-3.5 px-6 rounded-xl bg-primary text-on-primary font-label-ui text-sm font-bold hover:bg-tertiary shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                      <span>{isPending ? 'Sending Inquiry...' : 'Submit Inquiry'}</span>
                      {!isPending && <span className="material-symbols-outlined text-[18px]">send</span>}
                    </button>
                  </form>
                </>
              ) : (
                <div className="p-8 rounded-xl bg-surface-container text-center flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[44px]">check_circle</span>
                  <h4 className="font-headline-sm text-lg font-bold text-on-surface">
                    Inquiry Received
                  </h4>
                  <p className="font-body-md text-sm text-on-surface-variant max-w-sm">
                    Thank you for reaching out. Our forecourt deployment team from Pergamon Group will contact you shortly via phone or WhatsApp.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
