'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: readonly FaqItem[] = [
  {
    question: 'How does EasyFuel Pro achieve KRA eTIMS compliance?',
    answer:
      'EasyFuel Pro connects directly to the KRA-certified Incotex 600 ESD (Electronic Signature Device) and PTS-2 controller. Each fuel sale transaction is automatically cryptographically signed and issued with a validated KRA QR code on thermal receipts, satisfying tax authority obligations without cashier friction.',
  },
  {
    question: 'What is the difference between Semi-Automated and Full Automation?',
    answer:
      'Option 1 (Semi-Automated, indicative KES 109,500*) utilizes POS-driven fiscalization with an Incotex 600 ESD and thermal printer, where attendants log dispenser totals. Option 2 (Full Automation, indicative KES 269,500*) adds the PTS-2 Forecourt Controller, physically interlocking up to 50 dispensers and 50 ATG probes for live telemetry, automated nozzle flow cutoff, and 0% variance shift audits.',
  },
  {
    question: 'Which dispenser and ATG probe brands are supported?',
    answer:
      'The platform natively supports more than 150 dispenser brands (including Gilbarco, Wayne Dresser, Tokheim, Tatsuno, Bennett, Prowalco, Compac, Censtar) across Petroleum, LPG, and CNG fuels, alongside over 60 Automatic Tank Gauge (ATG) systems including Veeder-Root, Franklin Fueling, OPW, Fafnir, and Enraf.',
  },
  {
    question: 'Why are civil works pricing based on a site survey?',
    answer:
      'Station layouts differ in trenching distance, existing cabling conduits, island counts, and explosion-proof containment requirements. Pergamon forecourt engineers conduct a physical on-site survey to map electrical cable lengths and hazardous zone ducting before calculating exact civil works.',
  },
  {
    question: 'What happens if the fuel station loses internet connection?',
    answer:
      'The PTS-2 Forecourt Controller buffers over 50,000 transactions locally in hardened offline edge storage. Fuel dispensing continues without disruption, and all stored sales and tank dip logs automatically transmit to cloud and KRA servers once connectivity is restored.',
  },
  {
    question: 'What does the Annual Maintenance Contract (AMC) cover?',
    answer:
      'Payable from Year 2 at KES 10,000 per station, the AMC covers firmware upgrades, statutory KRA regulatory protocol updates, priority on-call dispatch, remote health telemetry, and routine controller inspections.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full py-16 lg:py-24 bg-surface border-b border-surface-container relative"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2.5">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-label-mono text-label-mono font-semibold uppercase">
            Clarity &amp; Compliance
          </span>
          <h2
            id="faq-heading"
            className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight"
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Everything station operators, dealers, and oil marketing companies need to know about
            forecourt compliance, PTS-2 controllers, and eTIMS certification.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-headline-sm text-headline-sm font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-primary text-[22px] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''
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

        {/* Bottom Help Note */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col">
            <span className="font-headline-sm text-[15px] font-bold text-on-surface">
              Have a specific forecourt pump or protocol inquiry?
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Our engineering specialists are available via direct dispatch.
            </span>
          </div>
          <a
            href="#demo-section"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-tertiary text-on-primary font-label-ui text-[13px] font-semibold transition-colors shrink-0"
          >
            Speak to a Specialist
          </a>
        </div>
      </div>
    </section>
  );
}
