'use client';

import { ForecourtArchitectureDiagram } from '@/components/ui/ForecourtArchitectureDiagram';

export function ForecourtArchitecture() {
  const nodes = [
    {
      step: '01',
      title: 'KRA eTIMS Servers',
      badge: 'Tax Authority Cloud',
      icon: 'cloud_done',
      desc: 'Every sale is cryptographically signed in real time, validating each transaction directly with the Kenya Revenue Authority so your station remains fully compliant without manual bookkeeping.',
      role: 'Compliance & Audit Handshake',
    },
    {
      step: '02',
      title: 'POS / Station Management',
      badge: 'Touch Forecourt Terminal',
      icon: 'point_of_sale',
      desc: 'Manage your daily shifts, pump pricing, attendant handovers, and payment reconciliations from one intuitive interface built specifically for busy forecourts.',
      role: 'Operations & Cash Management',
    },
    {
      step: '03',
      title: 'Type C eTIMS ETR (Incotex 600 ESD)',
      badge: 'Fiscal Electronic Signature',
      icon: 'fingerprint',
      desc: 'A certified hardware signature device that signs each dispensing event instantly, keeping your queues moving while securing statutory tax compliance.',
      role: 'Hardware Security Module',
    },
    {
      step: '04',
      title: 'Thermal Receipt Printer',
      badge: 'Pump-Side / Till Printing',
      icon: 'receipt_long',
      desc: 'Crisp, high-speed receipt printing equipped with scannable KRA QR codes that both retail drivers and corporate fleet managers can rely on.',
      role: 'Customer Fiscal Proof',
    },
    {
      step: '05',
      title: 'Forecourt Controller (PTS-2)',
      badge: 'Industrial Brain',
      icon: 'developer_board',
      desc: 'The central nerve center of your station. It bridges communication across up to 50 fuel dispensers, 50 underground tank probes, and price displays, speaking over 60 industry protocols seamlessly.',
      role: 'Forecourt Protocol Bridge',
    },
    {
      step: '06',
      title: 'Fuel Dispensers & ATG Probes',
      badge: 'Petroleum, LPG & CNG',
      icon: 'local_gas_station',
      desc: 'Direct sensor feeds capture every drop pumped and monitor underground fuel inventory around the clock, protecting your margins against variances and unauthorized dispensing.',
      role: 'Physical Forecourt Assets',
    },
  ];

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="w-full py-16 lg:py-24 bg-surface relative overflow-hidden border-b border-surface-container"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-label-mono text-label-mono font-semibold w-fit uppercase">
              Hardware-to-Cloud Fiscal Data Flow
            </span>
            <h2
              id="architecture-heading"
              className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight"
            >
              THE FORECOURT ARCHITECTURE
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              EasyFuel Pro connects your forecourt directly to KRA. When fuel is dispensed, the sale records in the POS, signs through the fiscal unit, prints a verified QR receipt, and files with KRA. This keeps your forecourt operations smooth and fully compliant.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-3 self-start md:self-auto shadow-xs">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="flex flex-col">
              <span className="text-[12px] font-label-mono font-bold text-on-surface">
                PTS-2 &amp; Incotex 600
              </span>
              <span className="text-[11px] font-body-sm text-on-surface-variant">
                Certified KRA Type C Forecourt Stack
              </span>
            </div>
          </div>
        </div>

        {/* Forecourt Architecture Schematic & Interactive Topology */}
        <ForecourtArchitectureDiagram />

        {/* Visual Architecture Flow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {nodes.map((node) => (
            <div
              key={node.step}
              className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between gap-6 group relative overflow-hidden"
            >
              {/* Subtle accent corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-[12px] font-bold text-primary px-2.5 py-1 rounded-md bg-surface-container">
                    NODE {node.step}
                  </span>
                  <span className="text-[11px] font-label-mono text-on-surface-variant uppercase tracking-wider">
                    {node.badge}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-xl bg-surface-container/70 group-hover:bg-primary/10 flex items-center justify-center text-primary transition-colors">
                  <span className="material-symbols-outlined text-[26px]">{node.icon}</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {node.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-container flex items-center justify-between text-[11px] font-label-mono text-outline">
                <span>ROLE</span>
                <span className="text-on-surface font-semibold">{node.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Interconnect Banner */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">sync_alt</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                Uninterrupted Offline Operations
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                If internet drops, the PTS-2 controller buffers over 50,000 transactions locally. Your station keeps pumping without delay, and all data auto-syncs when reconnected.
              </span>
            </div>
          </div>
          <a
            href="#pricing"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-tertiary text-on-primary font-label-ui text-[13px] font-semibold transition-colors shrink-0"
          >
            Explore Pricing &amp; Controllers
          </a>
        </div>
      </div>
    </section>
  );
}
