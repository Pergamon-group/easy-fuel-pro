import { siteConfig } from '@/config/site';

export function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="w-full bg-surface-container-low text-on-surface" data-testid="footer-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-space-2xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-space-xl">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight uppercase">Pergamon Group</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              {footer.description}
            </p>
            <div className="flex flex-col gap-2 pt-2">
              {footer.certifications.map((cert, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 text-on-surface-variant font-label-mono text-label-mono">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  {cert}
                </div>
              ))}
              <div className="inline-flex items-center gap-2 text-on-surface-variant font-label-mono text-label-mono">
                <span className="material-symbols-outlined text-primary text-[18px]">language</span>
                <a className="hover:text-primary transition-colors" href="https://pergamongroup.com" target="_blank" rel="noopener noreferrer">pergamongroup.com</a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="font-label-ui text-label-ui uppercase tracking-wider text-primary font-bold">{footer.hubsLabel}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {footer.hubs.map((hub, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-surface-container">
                  <span className="font-headline-sm text-[14px] leading-tight block text-on-surface font-semibold">{hub.name}</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 whitespace-pre-line">
                    {hub.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-ui text-label-ui uppercase tracking-wider text-primary font-bold">{footer.contactLabel}</span>
            <div className="flex flex-col gap-3 pt-1">
              <a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors" href="tel:+254111050950">
                <span className="material-symbols-outlined text-primary text-[20px]">call</span>
                <div className="flex flex-col">
                  <span className="font-label-ui text-[10px] text-on-surface-variant uppercase">Helpline Voice Desk</span>
                  <span className="font-label-mono text-label-mono font-bold text-on-surface">+254 111 050 950</span>
                </div>
              </a>
              <a className="flex items-center gap-3 p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors" href="https://wa.me/254112817917" target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-primary text-[20px]">chat</span>
                <div className="flex flex-col">
                  <span className="font-label-ui text-[10px] text-on-surface-variant uppercase">Instant WhatsApp</span>
                  <span className="font-label-mono text-label-mono font-bold text-on-surface">0112 817 917</span>
                </div>
              </a>
              <div className="pt-2 flex flex-col gap-1.5">
                <span className="font-label-ui text-[11px] uppercase tracking-wider text-on-surface-variant">{footer.quickNavLabel}</span>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {footer.quickNav.map((nav, idx) => (
                    <a key={idx} className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface" href={nav.href}>
                      {nav.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-4 text-on-surface-variant font-label-ui text-label-ui">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-6">
            {footer.legalLinks.map((link, idx) => (
              <a key={idx} className="hover:text-on-surface transition-colors" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
