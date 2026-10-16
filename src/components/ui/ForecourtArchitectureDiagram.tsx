'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ArchitectureNode {
  id: string;
  name: string;
  category: string;
  role: string;
  protocol: string;
  pinPosition: { top: string; left: string };
  description: string;
}

const ARCHITECTURE_NODES: readonly ArchitectureNode[] = [
  {
    id: 'kra-servers',
    name: 'KRA Servers',
    category: 'Fiscal Authority Cloud',
    role: 'Tax Authority Auditing & Validation',
    protocol: 'Encrypted HTTPS / REST API / Digital Signature Verification',
    pinPosition: { top: '22%', left: '12%' },
    description:
      'Receives cryptographically signed dispensing invoices in real time from the forecourt POS and fiscal unit, eliminating manual tax reporting.',
  },
  {
    id: 'pos-system',
    name: 'POS / Fuel Management System',
    category: 'Forecourt Terminal',
    role: 'Centralized Station Operations & Attendant Till',
    protocol: 'Local Ethernet / RS-232 / TCP/IP Handshake',
    pinPosition: { top: '35%', left: '42%' },
    description:
      'Coordinates pump dispensing authorizations, attendant shift reconciliations, inventory balances, and cashless payment options from one screen.',
  },
  {
    id: 'etims-etr',
    name: 'Fuel Pro eTIMS ETR (EasyFuel Pro Fiscal Device)',
    category: 'Hardware Fiscal Unit',
    role: 'Cryptographic Fiscal Signature Engine',
    protocol: 'Direct Hardware Serial / USB Fiscal Interface',
    pinPosition: { top: '44%', left: '52%' },
    description:
      'Certified electronic signature device that instantly signs fuel transactions, generating verified QR payloads without slowing pump flow.',
  },
  {
    id: 'printer',
    name: 'Printer',
    category: 'Point-of-Sale Output',
    role: 'Instant Fiscal Receipt Generation',
    protocol: 'ESC/POS High-Speed Thermal Protocol',
    pinPosition: { top: '72%', left: '21%' },
    description:
      'Crisp thermal till printer issuing customer receipts with verified, scannable KRA QR codes for retail motorists and fleet account verification.',
  },
  {
    id: 'forecourt-controller',
    name: 'Forecourt Controller',
    category: 'Industrial Hardware Hub',
    role: 'PTS-2 Protocol Interlock & Buffer',
    protocol: 'RS-485 / 20mA Current Loop / 60+ Forecourt Protocols',
    pinPosition: { top: '68%', left: '56%' },
    description:
      'The industrial nerve center. It bridges communication across dispensers, ATG tank probes, and price displays, and buffers 50,000+ sales if offline.',
  },
  {
    id: 'dispensers',
    name: 'Fuel Station Dispensers',
    category: 'Physical Dispensing Assets',
    role: 'Pumps, Multi-Product Nozzles & ATG Probes',
    protocol: 'Gilbarco, Wayne, Tokheim, Tatsuno, Bennett Protocols',
    pinPosition: { top: '36%', left: '84%' },
    description:
      'Telemetry connection to forecourt nozzles and underground storage probes captures every dispensed millilitre and detects fuel variances instantly.',
  },
];

export function ForecourtArchitectureDiagram() {
  const [activeNodeId, setActiveNodeId] = useState<string>('forecourt-controller');

  const activeNode =
    ARCHITECTURE_NODES.find((node) => node.id === activeNodeId) ?? ARCHITECTURE_NODES[4];

  return (
    <div
      className="w-full rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-md p-6 sm:p-8 lg:p-10 flex flex-col gap-6 relative overflow-hidden"
      data-testid="forecourt-architecture-diagram"
    >
      {/* Schematic Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container">
        <div className="flex items-center gap-3">
          {/* <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" /> */}
          <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">
            Forecourt Fiscal Architecture &amp; Device Topology
          </h3>
        </div>
        <span className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
          Integrated Data Flow
        </span>
      </div>

      {/* Interactive Navigation Pills */}
      <div
        role="tablist"
        aria-label="Forecourt Architecture Components"
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
      >
        {ARCHITECTURE_NODES.map((node) => {
          const isActive = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActiveNodeId(node.id)}
              className={`px-3.5 py-1.5 rounded-xl font-label-ui text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${isActive
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
            >
              {node.name}
            </button>
          );
        })}
      </div>

      {/* Main Diagram Canvas with Authentic Schematic & Interactive Hotspots */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-outline-variant/20 bg-slate-50 shadow-inner group">
        <div className="relative w-full aspect-[916/488] max-h-[520px]">
          <Image
            src="/res/forecourt-architecture-diagram.png"
            alt="Forecourt Architecture Schematic showing KRA Servers, POS System, EasyFuel Pro eTIMS ETR, Forecourt Controller, Thermal Printer, and Dispensers"
            fill
            sizes="(max-width: 1024px) 100vw, 1100px"
            priority
            className="object-contain"
          />

          {/* Interactive Device Hotspot Pins Overlaid on the Schematic */}
          {ARCHITECTURE_NODES.map((node) => {
            const isActive = node.id === activeNodeId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                onMouseEnter={() => setActiveNodeId(node.id)}
                aria-label={`Inspect ${node.name}`}
                style={{
                  top: node.pinPosition.top,
                  left: node.pinPosition.left,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-transform cursor-pointer focus:outline-none ${isActive ? 'scale-125 z-30' : 'hover:scale-115 opacity-85 hover:opacity-100'
                  }`}
              >
                <span className="relative flex h-7 w-7 items-center justify-center">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${isActive ? 'bg-primary' : 'bg-sky-400'
                      }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-5 w-5 border-2 border-white shadow-md items-center justify-center text-[10px] font-bold text-white ${isActive ? 'bg-primary' : 'bg-[#00a2e6]'
                      }`}
                  >
                    •
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Component Inspector Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <span className="material-symbols-outlined text-[22px]">settings_input_component</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                {activeNode.name}
              </span>
              <span className="text-[11px] font-label-mono text-primary font-semibold px-2 py-0.5 rounded-full bg-primary/10">
                {activeNode.category}
              </span>
            </div>
            <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              {activeNode.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end shrink-0 pl-13 md:pl-0 pt-2 md:pt-0 border-t md:border-t-0 border-surface-container/60">
          <span className="text-[10px] font-label-mono text-outline uppercase font-semibold">
            Interface Protocol
          </span>
          <span className="text-[12px] font-label-mono font-bold text-on-surface">
            {activeNode.protocol}
          </span>
        </div>
      </div>
    </div>
  );
}
