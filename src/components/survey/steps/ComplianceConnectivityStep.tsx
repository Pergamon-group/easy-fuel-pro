'use client';

import { ComplianceConnectivity, YesNo, ConnectionType, ValidationError } from '@/data/survey-schema';
import { InfoCard } from '../InfoCard';

export interface ComplianceConnectivityStepProps {
  data: ComplianceConnectivity;
  onChange: (updated: Partial<ComplianceConnectivity>) => void;
  errors: ValidationError[];
}

export function ComplianceConnectivityStep({
  data,
  onChange,
  errors,
}: ComplianceConnectivityStepProps) {
  const getFieldError = (fieldName: string) =>
    errors.find((e) => e.field === fieldName)?.message;

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/20 pb-3">
        <h3 className="text-xl font-bold font-headline-sm text-on-surface">
          4. eTIMS (KRA) Compliance &amp; Connectivity
        </h3>
        <p className="text-xs sm:text-sm font-body-md text-on-surface-variant mt-1">
          Review your station&apos;s fiscalization model, POS software integration, and network redundancy.
        </p>
      </div>

      {/* Educational Guidance for eTIMS */}
      <InfoCard title="KRA eTIMS Architecture: VSCU vs OSCU Explained" icon="verified" defaultExpanded={false}>
        <div className="space-y-2 text-xs">
          <p>
            <strong>VSCU (Virtual Sales Control Unit):</strong> This is a software integration provided by KRA that enables offline cryptographic signing of your invoices and offers batch synchronization with KRA servers even when your internet drops. This approach is ideal for high-volume forecourts, wholesalers, or stations with intermittent internet connectivity. <em>EasyFuel Pro implicitly offers VSCU architecture so your dispensers never stop fueling during network dropouts.</em>
          </p>
          <p>
            <strong>OSCU (Online Sales Control Unit):</strong> Requires a persistent, real-time online connection to sign invoices immediately at the point of sale, commonly suitable for smaller retail stores with continuous internet.
          </p>
        </div>
      </InfoCard>

      {/* eTIMS Solution Type Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-2">
          What is your station&apos;s eTIMS Solution Type? *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {[
            { value: 'vscu', label: 'Virtual (VSCU)', desc: 'Cloud & offline batch signing (EasyFuel default)' },
            { value: 'oscu', label: 'Online (OSCU)', desc: 'Requires continuous real-time POS connection' },
            { value: 'both', label: 'Hybrid / Both', desc: 'Combined forecourt and convenience store' },
            { value: 'undecided', label: 'Need Advice', desc: 'Let Pergamon engineers advise' },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`p-3 rounded-xl border cursor-pointer transition-colors flex flex-col justify-between ${data.etimsSolutionType === opt.value
                  ? 'border-primary bg-primary/5 text-on-surface'
                  : 'border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface">{opt.label}</span>
                <input
                  type="radio"
                  name="etimsSolutionType"
                  value={opt.value}
                  checked={data.etimsSolutionType === opt.value}
                  onChange={() => onChange({ etimsSolutionType: opt.value as ComplianceConnectivity['etimsSolutionType'] })}
                  className="text-primary focus:ring-primary"
                />
              </div>
              <p className="text-[11px] text-on-surface-variant/80 mt-1">{opt.desc}</p>
            </label>
          ))}
        </div>
        {getFieldError('etimsSolutionType') && (
          <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('etimsSolutionType')}</p>
        )}
      </div>

      {/* POS System & Integration Method */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="posSystem" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            POS / ERP System in Use
          </label>
          <input
            id="posSystem"
            type="text"
            value={data.posSystem}
            onChange={(e) => onChange({ posSystem: e.target.value })}
            placeholder="e.g. EasyFuel POS, SAP, Oracle, Excel / Manual"
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            eTIMS Integration Method
          </label>
          <select
            value={data.etimsIntegrationMethod}
            onChange={(e) =>
              onChange({ etimsIntegrationMethod: e.target.value as ComplianceConnectivity['etimsIntegrationMethod'] })
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">Select Method...</option>
            <option value="api">API Direct Integration</option>
            <option value="middleware_pos">Middleware / POS Integration</option>
          </select>
        </div>
      </div>

      {/* Fiscal Receipt Questions */}
      <div className="rounded-2xl bg-surface p-4 sm:p-5 border border-outline-variant/30 space-y-3.5">
        <div>
          <h4 className="font-bold text-sm text-on-surface font-headline-sm">
            Fiscalization &amp; KRA Transmission Status
          </h4>
          <p className="text-xs text-on-surface-variant font-body-md mt-0.5">
            Please distinguish between your station&apos;s current operational status versus what you require EasyFuel Pro to configure.
          </p>
        </div>

        {[
          {
            field: 'generatesCompliantReceipts',
            label: 'Does the system currently generate eTIMS-compliant receipts?',
            current: data.generatesCompliantReceipts,
            onSelect: (val: YesNo) => onChange({ generatesCompliantReceipts: val }),
          },
          {
            field: 'receiptHasMandatoryFields',
            label: 'Do current receipts include mandatory fields (QR Code, CU No, Invoice No, KRA PIN)?',
            current: data.receiptHasMandatoryFields,
            onSelect: (val: YesNo) => onChange({ receiptHasMandatoryFields: val }),
          },
          {
            field: 'realTimeSalesCurrentlyTransmitting',
            label: 'Current Status: Are fuel sales transmitting to KRA in real-time today?',
            current: data.realTimeSalesCurrentlyTransmitting,
            onSelect: (val: YesNo) => onChange({ realTimeSalesCurrentlyTransmitting: val }),
          },
          {
            field: 'requireRealtimeTransmissionGoal',
            label: 'Project Goal: Do you require EasyFuel Pro to enable automated real-time KRA transmission?',
            current: data.requireRealtimeTransmissionGoal,
            onSelect: (val: YesNo) => onChange({ requireRealtimeTransmissionGoal: val }),
          },
        ].map((item) => (
          <div key={item.field} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-2 border-b border-outline-variant/15 last:border-b-0">
            <span className="text-xs sm:text-sm text-on-surface font-body-md">{item.label}</span>
            <div className="flex items-center gap-4 shrink-0">
              <label className="flex items-center gap-1.5 text-xs text-on-surface cursor-pointer">
                <input
                  type="radio"
                  name={item.field}
                  value="yes"
                  checked={item.current === 'yes'}
                  onChange={() => item.onSelect('yes')}
                  className="text-primary focus:ring-primary"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs text-on-surface cursor-pointer">
                <input
                  type="radio"
                  name={item.field}
                  value="no"
                  checked={item.current === 'no'}
                  onChange={() => item.onSelect('no')}
                  className="text-primary focus:ring-primary"
                />
                <span>No / Unsure</span>
              </label>
            </div>
          </div>
        ))}

        <div className="pt-1">
          <label htmlFor="complianceNotes" className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1">
            Additional eTIMS / Fiscalization Notes (Optional)
          </label>
          <textarea
            id="complianceNotes"
            rows={2}
            value={data.complianceNotes || ''}
            onChange={(e) => onChange({ complianceNotes: e.target.value })}
            placeholder="Any current exemptions, specific tax rates, or KRA eTIMS transition challenges..."
            className="w-full px-3.5 py-2 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
      </div>

      {/* Network Connectivity */}
      <div className="pt-3 border-t border-outline-variant/20 space-y-3.5">
        <h4 className="font-bold text-base text-on-surface font-headline-sm">
          Forecourt Network &amp; Hardware Infrastructure
        </h4>

        <InfoCard title="Why Network Redundancy Matters" icon="router" defaultExpanded={false}>
          <p>
            Under VSCU, local sales are cryptographically logged even if the internet drops, and queued transactions sync back to KRA once reconnected. Having a primary Fiber link backed up by a 4G router guarantees uninterrupted synchronization.
          </p>
        </InfoCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
              Internet Availability on Site *
            </label>
            <div className="flex gap-4 items-center mt-1">
              <label className="flex items-center gap-1.5 text-xs text-on-surface cursor-pointer">
                <input
                  type="radio"
                  name="internetAvailable"
                  value="yes"
                  checked={data.internetAvailable === 'yes'}
                  onChange={() => onChange({ internetAvailable: 'yes' })}
                  className="text-primary focus:ring-primary"
                />
                <span>Yes, Internet Available</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs text-on-surface cursor-pointer">
                <input
                  type="radio"
                  name="internetAvailable"
                  value="no"
                  checked={data.internetAvailable === 'no'}
                  onChange={() => onChange({ internetAvailable: 'no', connectionType: '' })}
                  className="text-primary focus:ring-primary"
                />
                <span>No Internet</span>
              </label>
            </div>
            {getFieldError('internetAvailable') && (
              <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('internetAvailable')}</p>
            )}
          </div>

          {data.internetAvailable === 'yes' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
                Primary Connection Type *
              </label>
              <select
                value={data.connectionType}
                onChange={(e) => onChange({ connectionType: e.target.value as ConnectionType })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select Connection Type...</option>
                <option value="fiber">Fiber Optic (Safaricom, Zuku, Jamii, Liquid)</option>
                <option value="4g_5g">Cellular (4G / 5G Router)</option>
                <option value="dsl">Copper DSL / Wireless Fixed</option>
              </select>
              {getFieldError('connectionType') && (
                <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('connectionType')}</p>
              )}
            </div>
          )}
        </div>

        {/* Quick Hardware Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {[
            { field: 'networkRedundancy', label: 'Network Redundancy Available (e.g. backup 4G router)?', val: data.networkRedundancy },
            { field: 'lanInPlace', label: 'Local Area Network (LAN) wired to forecourt?', val: data.lanInPlace },
            { field: 'posTerminalsInstalled', label: 'POS Terminals currently installed?', val: data.posTerminalsInstalled },
            { field: 'controlUnitSecured', label: 'Forecourt Control Unit in a secure location?', val: data.controlUnitSecured },
            { field: 'upsPowerBackup', label: 'Dedicated UPS / Inverter Power Backup installed?', val: data.upsPowerBackup },
          ].map((item) => (
            <div key={item.field} className="p-3 rounded-xl border border-outline-variant/20 bg-surface flex items-center justify-between">
              <span className="text-xs text-on-surface font-body-md pr-2">{item.label}</span>
              <div className="flex items-center gap-3 shrink-0">
                <label className="flex items-center gap-1 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name={item.field}
                    value="yes"
                    checked={item.val === 'yes'}
                    onChange={() => onChange({ [item.field]: 'yes' as YesNo } as Partial<ComplianceConnectivity>)}
                    className="text-primary focus:ring-primary"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-1 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name={item.field}
                    value="no"
                    checked={item.val === 'no'}
                    onChange={() => onChange({ [item.field]: 'no' as YesNo } as Partial<ComplianceConnectivity>)}
                    className="text-primary focus:ring-primary"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-1">
          <label htmlFor="networkNotes" className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1">
            Additional Network, Power &amp; Hardware Notes (Optional)
          </label>
          <textarea
            id="networkNotes"
            rows={2}
            value={data.networkNotes || ''}
            onChange={(e) => onChange({ networkNotes: e.target.value })}
            placeholder="Details about existing server racks, router makes, generator switchovers, or physical cable paths..."
            className="w-full px-3.5 py-2 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
      </div>
    </div>
  );
}
