import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]" data-testid="main-header">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex flex-col items-start gap-0.5">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="py-2 w-auto object-contain h-16"
              style={{ width: 'auto' }}
            />
            {/* <span className="pb-1 pl-1 w-full text-left text-[11px] font-medium text-on-surface-variant tracking-normal">
              By {siteConfig.parentCompany.name}
            </span> */}
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-[15px] font-medium text-on-surface hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors px-2 py-1.5">
            Talk to Us
          </a>
          <a href="#demo-section" className="inline-flex items-center justify-center px-2 md:px-5 py-2.5 rounded-xl bg-primary text-on-primary text-[12px] md:text-[14px] text-center font-semibold shadow-sm hover:bg-tertiary transition-all">
            Request a Demo
          </a>
        </div>
      </div>
    </header>
  );
}
