import Link from 'next/link';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function GlobalNotFound() {
  return (
    <>
      <Header />
      <main className="w-full pt-20">
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-surface">
          <span className="material-symbols-outlined text-[72px] text-primary mb-6 opacity-80">
            explore_off
          </span>
          <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface mb-4 tracking-tight">
            Page Not Found
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-8">
            We couldn&apos;t find the page you were looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-label-ui text-headline-sm font-semibold text-on-primary bg-primary hover:bg-tertiary transition-all hover:shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">home</span>
              Go Home
            </Link>
            <Link 
              href="https://wa.me/254112817917"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-label-ui text-headline-sm font-semibold text-on-surface border border-outline hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
