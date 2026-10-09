'use client';

import { useState, useTransition } from 'react';
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
          setError(result.error || 'Something went wrong.');
        }
      } catch (err) {
        setError('Failed to submit the form. Please try again.');
      }
    });
  };

  return (
    <section className="w-full py-space-2xl lg:py-space-3xl bg-surface scroll-mt-24" id="demo-section" data-testid="cta-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="p-5 md:p-8 lg:p-14 rounded-3xl bg-surface-container-low shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">

            {/* CTA Left Info */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-label-mono text-label-mono font-semibold w-fit">
                  ⚡ LET'S GET STARTED
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
                  READY TO TRANSFORM YOUR FORECOURT?
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Upgrade Your Fuel Station with EasyFuel Pro. Get real-time visibility, smarter operations, better control, and eTIMS-ready technology in one powerful solution.
                </p>
              </div>

              {/* Direct Channel Cards */}
              <div className="flex flex-col gap-3">
                <div className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Book Your EasyFuel Pro Demo Today
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <a href={siteConfig.phoneHref} className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow transition-shadow">
                    <span className="material-symbols-outlined text-primary text-[22px]">call</span>
                    <div className="flex flex-col">
                      <span className="font-label-ui text-[10px] uppercase text-on-surface-variant font-semibold">Voice Inquiries</span>
                      <span className="font-label-mono text-label-mono font-bold text-on-surface">Call: {siteConfig.phone}</span>
                    </div>
                  </a>
                  <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow transition-shadow">
                    <span className="material-symbols-outlined text-primary text-[22px]">chat</span>
                    <div className="flex flex-col">
                      <span className="font-label-ui text-[10px] uppercase text-on-surface-variant font-semibold">Direct WhatsApp</span>
                      <span className="font-label-mono text-label-mono font-bold text-on-surface">WhatsApp: {siteConfig.whatsapp}</span>
                    </div>
                  </a>
                  <a href="https://pergamongroup.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow transition-shadow">
                    <span className="material-symbols-outlined text-primary text-[22px]">language</span>
                    <div className="flex flex-col">
                      <span className="font-label-ui text-[10px] uppercase text-on-surface-variant font-semibold">Corporate Portal</span>
                      <span className="font-label-mono text-label-mono font-bold text-on-surface">Website: pergamongroup.com</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Pergamon Footprint Info */}
              <div className="p-4 rounded-xl bg-surface-container flex flex-col gap-1.5">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                  Pergamon Group — Modern Technology for a More Profitable Future.
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  HQ: Springette Office Park, Spring Valley | Showroom: Lonrho House, Standard St<br />
                  Regional: Kenya (Mombasa, Eldoret, Kisii) • Tanzania (Dar es Salaam) • Rwanda (Kigali)
                </p>
              </div>
            </div>

            {/* CTA Right: Request a Demo Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-5 md:p-8 lg:p-10 rounded-2xl shadow-sm flex flex-col gap-6">
              {!success ? (
                <>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Request an On-Site or Virtual Demo</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Connect your forecourt to the EasyFuel Pro architecture. Fill in the details below.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded bg-error-container text-on-error-container font-label-ui">
                      {error}
                    </div>
                  )}

                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="font-label-ui text-label-ui text-on-surface font-semibold">Full Name *</label>
                      <input type="text" id="name" name="name" required placeholder="e.g. David Mwangi" className="w-full px-4 py-2.5 rounded-lg bg-surface text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="business" className="font-label-ui text-label-ui text-on-surface font-semibold">Fuel Station / Business Name *</label>
                      <input type="text" id="business" name="business" required placeholder="e.g. Apex Petroleum Ltd" className="w-full px-4 py-2.5 rounded-lg bg-surface text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="pumps" className="font-label-ui text-label-ui text-on-surface font-semibold">Number of Stations / Pumps *</label>
                        <input type="text" id="pumps" name="pumps" required placeholder="e.g. 2 Stations (8 Pumps)" className="w-full px-4 py-2.5 rounded-lg bg-surface text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="font-label-ui text-label-ui text-on-surface font-semibold">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" required placeholder="e.g. +254 7XX XXX XXX" className="w-full px-4 py-2.5 rounded-lg bg-surface text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="location" className="font-label-ui text-label-ui text-on-surface font-semibold">Primary Operations Location *</label>
                      <select id="location" name="location" required defaultValue="" className="w-full px-4 py-2.5 rounded-lg bg-surface text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm">
                        <option value="" disabled>Select location corridor...</option>
                        <option value="Nairobi">Nairobi, Kenya (HQ &amp; Showroom)</option>
                        <option value="Mombasa">Mombasa, Kenya (Branch)</option>
                        <option value="Eldoret">Eldoret, Kenya (Branch)</option>
                        <option value="Kisii">Kisii, Kenya (Branch)</option>
                        <option value="Dar_es_Salaam">Dar es Salaam, Tanzania (Hub)</option>
                        <option value="Kigali">Kigali, Rwanda (Hub)</option>
                        <option value="Other">Other Location in East Africa</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full mt-2 py-3.5 px-6 rounded-xl bg-primary text-on-primary font-label-ui text-headline-sm font-semibold hover:bg-tertiary shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      <span>{isPending ? 'Submitting...' : 'Book Live Forecourt Demo'}</span>
                      {!isPending && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                    </button>
                  </form>
                </>
              ) : (
                <div className="p-6 rounded-xl bg-surface-container text-center flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[40px]">check_circle</span>
                  <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Demo Request Received</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                    Our forecourt deployment engineers from Pergamon Group will contact you shortly via phone or WhatsApp.
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
