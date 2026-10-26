'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FORECOURT_FAQS, FaqItem } from '@/data/faqs';

export type { FaqItem };
export { FORECOURT_FAQS };

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqSchema = {
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
          <div className="pt-2">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-label-ui text-[14px] font-semibold underline underline-offset-4"
            >
              <span>Explore our Dedicated Knowledge Base &amp; FAQ Page</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-3.5">
          {FORECOURT_FAQS.map((faq, index) => {
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
              Do you have questions about a specific forecourt pump or protocol?
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Our engineering specialists are available to review your forecourt setup and provide personalized guidance.
            </span>
          </div>
          <a
            href="#demo-form"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-tertiary text-on-primary font-label-ui text-[13px] font-semibold transition-colors shrink-0"
          >
            Speak to a Specialist
          </a>
        </div>
      </div>
    </section>
  );
}
