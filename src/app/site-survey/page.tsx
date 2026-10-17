import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SurveyContainer } from '@/components/survey/SurveyContainer';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Forecourt Site Survey & eTIMS Compliance Audit | EasyFuel Pro',
  description:
    'Complete your fuel station site survey online or download the official PDF checklist. Provide information about your pumps, multi-nozzle dispensers, pulser meters, and KRA eTIMS integration that will help Pergamon Group engineers design the best solution for your forecourt.',
  alternates: {
    canonical: `${siteConfig.url}/site-survey`,
  },
  openGraph: {
    title: 'Forecourt Site Survey & eTIMS Audit | EasyFuel Pro',
    description:
      'Interactive 5-step site survey for fuel stations. Configure dispensers, pulsers, and KRA fiscal compliance.',
    url: `${siteConfig.url}/site-survey`,
  },
};

const surveyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'EasyFuel Pro Forecourt Site Survey & Technical Audit',
  description:
    'Pre-deployment technical audit for fueling stations, covering pump pulsers, automation controllers, and KRA eTIMS compliance.',
  provider: {
    '@type': 'Organization',
    name: siteConfig.parentCompany.name,
    url: siteConfig.parentCompany.url,
  },
  areaServed: ['Kenya', 'Tanzania', 'Rwanda', 'Uganda'],
};

export default function SiteSurveyPage() {
  return (
    <>
      <Header />
      <main className="w-full pt-28 sm:pt-24 pb-20 bg-surface">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(surveyJsonLd) }}
        />

        {/* Hero Section */}
        {/* <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-low border border-surface-container relative overflow-hidden">
            <div className="max-w-3xl space-y-4">

              <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight leading-tight">
                Fuel Station Site Survey &amp; eTIMS Readiness
              </h1>

              <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Complete your fuel station site survey online or download the official PDF checklist.
                <br />Help us understand your fuel station setup by providing information about your pumps, multi-nozzle dispensers, pulser meters, and KRA eTIMS integration.
              </p>
            </div>
          </div>
        </section> */}

        {/* Survey Flow Container */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <SurveyContainer />
        </section>
      </main>
      <Footer />
    </>
  );
}
