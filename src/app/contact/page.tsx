import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CtaBooking } from '@/components/sections/CtaBooking';
import { ForecourtCanopyIllustration } from '@/components/ui/ForecourtCanopyIllustration';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact & Forecourt Site Surveys | EasyFuel Pro',
  description:
    'Contact EasyFuel Pro by Pergamon Group. Book an on-site forecourt audit, PTS-2 controller demonstration, or eTIMS fiscalization consultation across Kenya, Tanzania, and Rwanda.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact EasyFuel Pro',
  description: 'Book an on-site forecourt audit or live PTS-2 controller demonstration.',
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: 'Pergamon Group Ltd',
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: siteConfig.parentCompany.url,
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="w-full pt-24 sm:pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
        />

        {/* Forecourt Assessment & Site Survey Hero Banner */}
        <section className="w-full py-12 lg:py-20 bg-surface-container-low border-b border-surface-container relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Typography & Direct Action */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-label-mono text-label-mono font-semibold w-fit uppercase">
                  Forecourt Deployment &amp; Site Assessment
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="font-display-hero text-headline-lg lg:text-[44px] text-on-surface font-extrabold tracking-tight leading-tight">
                    LET&apos;S GET YOUR FUEL STATION eTIMS READY
                  </h1>
                  <span className="font-headline-sm text-headline-sm font-bold text-primary">
                    GET IN TOUCH TODAY
                  </span>
                </div>

                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Connect with Pergamon Group&apos;s certified forecourt engineers. Whether you need
                  a single station eTIMS Type C upgrade or multi-station PTS-2 network automation,
                  we are ready to dispatch.
                </p>

                {/* Direct Channel Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <a
                    href={siteConfig.phoneHref}
                    className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary shadow-xs hover:shadow transition-all flex flex-col gap-1"
                  >
                    <span className="material-symbols-outlined text-primary text-[22px]">call</span>
                    <span className="text-[10px] font-label-mono uppercase text-outline font-bold">
                      Phone
                    </span>
                    <span className="font-label-mono text-[13px] font-bold text-on-surface">
                      {siteConfig.phone}
                    </span>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary shadow-xs hover:shadow transition-all flex flex-col gap-1"
                  >
                    <span className="material-symbols-outlined text-primary text-[22px]">mail</span>
                    <span className="text-[10px] font-label-mono uppercase text-outline font-bold">
                      Email
                    </span>
                    <span className="font-label-mono text-[13px] font-bold text-on-surface truncate">
                      {siteConfig.email}
                    </span>
                  </a>

                  <a
                    href={siteConfig.parentCompany.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary shadow-xs hover:shadow transition-all flex flex-col gap-1"
                  >
                    <span className="material-symbols-outlined text-primary text-[22px]">language</span>
                    <span className="text-[10px] font-label-mono uppercase text-outline font-bold">
                      Website
                    </span>
                    <span className="font-label-mono text-[13px] font-bold text-on-surface truncate">
                      pergamongroup.com
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Column: Vetted Canopy Vector Illustration */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-lg rounded-3xl overflow-hidden border border-outline-variant/40 bg-surface-container-lowest p-4 sm:p-6 shadow-md">
                  <ForecourtCanopyIllustration className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Hubs & Offices */}
        <section className="w-full py-12 bg-surface border-b border-surface-container">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-6">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
              Showroom &amp; Regional Operations Hubs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                  Nairobi HQ &amp; Showroom
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  HQ: Springette Office Park, Spring Valley, Lower Kabete Rd, Block B1
                  <br />
                  Showroom: Lonrho House, Standard St, Nairobi CBD
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                  Kenya Branches
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Mombasa: Digo Rd, 3rd Floor
                  <br />
                  Eldoret: Laneen Centre, Utalii St
                  <br />
                  Kisii: Magsons Plaza, Off Hospital Rd
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                  Tanzania (Dar es Salaam)
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Misasani, Mikocheni A, Old Bagamoyo Rd, Plot 101
                  <br />
                  Tel: +255 22 277 5626 / +255 782 572 670
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                  Rwanda (Kigali)
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Nobiscum House, 1st Floor, Remera Kisimenti
                  <br />
                  Tel: +250 786 381 374 / +250 786 654 154
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Interactive Booking & Survey Section */}
        <CtaBooking />
      </main>
      <Footer />
    </>
  );
}
