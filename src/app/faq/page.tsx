import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FaqDirectory } from '@/components/faq/FaqDirectory';
import { FORECOURT_FAQS } from '@/data/faqs';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions & Forecourt Compliance | EasyFuel Pro',
  description:
    'Find clear answers to common questions about EasyFuel Pro forecourt management, PTS-2 controllers, KRA eTIMS fiscalization, hardware compatibility, and pricing across East Africa.',
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
  openGraph: {
    title: 'Frequently Asked Questions | EasyFuel Pro by Pergamon Group',
    description:
      'Everything fuel station operators, dealers, and oil marketing companies need to know about forecourt automation and KRA eTIMS readiness.',
    url: `${siteConfig.url}/faq`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.logos.landscape,
        width: 1920,
        height: 1080,
        alt: `${siteConfig.name} FAQ`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | EasyFuel Pro',
    description:
      'Everything fuel station operators, dealers, and oil marketing companies need to know about forecourt automation and KRA eTIMS readiness.',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FORECOURT_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-background min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Hero Section */}
        <section className="w-full py-12 lg:py-16 bg-surface-container-low border-b border-surface-container">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-label-mono text-label-mono font-semibold uppercase">
              Knowledge Base &amp; Technical FAQ
            </span>
            <h1 className="font-display-hero text-headline-lg lg:text-[44px] text-on-surface font-extrabold tracking-tight leading-tight">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              We believe in open, direct communication. Here you will find clear answers on KRA eTIMS compliance, PTS-2 forecourt controller integration, dispenser compatibility, and modular hardware pricing.
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="w-full py-12 lg:py-20 bg-surface">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <FaqDirectory />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
