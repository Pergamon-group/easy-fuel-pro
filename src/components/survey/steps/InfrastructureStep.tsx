'use client';

import {
  InfrastructureInfo,
  PumpEntry,
  MeterType,
  YesNo,
  FUEL_TYPES,
  ValidationError,
} from '@/data/survey-schema';
import { InfoCard } from '../InfoCard';

export interface InfrastructureStepProps {
  data: InfrastructureInfo;
  onChange: (updated: Partial<InfrastructureInfo>) => void;
  errors: ValidationError[];
}

export function InfrastructureStep({ data, onChange, errors }: InfrastructureStepProps) {
  const getFieldError = (fieldName: string) =>
    errors.find((e) => e.field === fieldName)?.message;

  // Handle total pump count adjustment
  const handlePumpCountChange = (newCount: number) => {
    const validCount = Math.max(1, Math.min(24, newCount));
    const currentPumps = [...data.pumps];

    if (validCount > currentPumps.length) {
      // Add missing pump slots
      for (let i = currentPumps.length; i < validCount; i++) {
        currentPumps.push({
          id: `pump_${Date.now()}_${i + 1}`,
          makeModel: '',
          dispenserSerial: '',
          nozzleCount: 2,
          meterType: 'electronic',
          pulseOutputAvailable: 'yes',
          fuelTypes: ['pms', 'ago'],
        });
      }
    } else if (validCount < currentPumps.length) {
      // Trim extra slots
      currentPumps.splice(validCount);
    }

    onChange({ totalPumpCount: validCount, pumps: currentPumps });
  };

  const handleUpdatePump = (index: number, updated: Partial<PumpEntry>) => {
    const updatedPumps = [...data.pumps];
    updatedPumps[index] = { ...updatedPumps[index], ...updated };
    onChange({ pumps: updatedPumps });
  };

  const handleAddSinglePump = () => {
    const newPump: PumpEntry = {
      id: `pump_${Date.now()}_${data.pumps.length + 1}`,
      makeModel: '',
      dispenserSerial: '',
      nozzleCount: 2,
      meterType: 'electronic',
      pulseOutputAvailable: 'yes',
      fuelTypes: ['pms', 'ago'],
    };
    onChange({
      totalPumpCount: data.totalPumpCount + 1,
      pumps: [...data.pumps, newPump],
    });
  };

  const handleRemovePump = (index: number) => {
    if (data.pumps.length <= 1) return;
    const updated = data.pumps.filter((_, i) => i !== index);
    onChange({
      totalPumpCount: updated.length,
      pumps: updated,
    });
  };

  const handleToggleFuelType = (pumpIndex: number, fuelValue: string) => {
    const pump = data.pumps[pumpIndex];
    const exists = pump.fuelTypes.includes(fuelValue);
    const updatedFuels = exists
      ? pump.fuelTypes.filter((f) => f !== fuelValue)
      : [...pump.fuelTypes, fuelValue];

    handleUpdatePump(pumpIndex, {
      fuelTypes: updatedFuels,
      // Clear otherFuelType if 'other' was unselected
      ...(exists && fuelValue === 'other' ? { otherFuelType: '' } : {}),
    });
  };

  const filledCount = data.pumps.filter((p) => p.makeModel.trim() && p.nozzleCount > 0).length;

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/20 pb-3">
        <h3 className="text-xl font-bold font-headline-sm text-on-surface">
          3. Station Setup &amp; Fueling Infrastructure
        </h3>
        <p className="text-xs sm:text-sm font-body-md text-on-surface-variant mt-1">
          Specify your forecourt dispensers, nozzle counts, and current automation status.
        </p>
      </div>

      {/* Site Automation Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            Is the Site Automated? *
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { value: 'yes', label: 'Yes, Automated', desc: 'Forecourt controller present' },
              { value: 'no', label: 'No, Standalone', desc: 'Dispensers operate offline' },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`p-3 rounded-xl border cursor-pointer transition-colors flex flex-col justify-between ${
                  data.isSiteAutomated === opt.value
                    ? 'border-primary bg-primary/5 text-on-surface'
                    : 'border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface">{opt.label}</span>
                  <input
                    type="radio"
                    name="isSiteAutomated"
                    value={opt.value}
                    checked={data.isSiteAutomated === opt.value}
                    onChange={() => onChange({ isSiteAutomated: opt.value as InfrastructureInfo['isSiteAutomated'] })}
                    className="text-primary focus:ring-primary"
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant/80 mt-1">{opt.desc}</p>
              </label>
            ))}
          </div>
          {getFieldError('isSiteAutomated') && (
            <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('isSiteAutomated')}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            Mode of Operation *
          </label>
          <select
            value={data.operationMode}
            onChange={(e) => onChange({ operationMode: e.target.value as InfrastructureInfo['operationMode'] })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">Select Operational Mode...</option>
            <option value="fully_automated">Fully Automated (POS authorizes dispensers)</option>
            <option value="semi_automated">Semi-Automated (Manual pump start with electronic logging)</option>
            <option value="manual">Manual (Attendant operates pump, manual bookkeeping)</option>
          </select>
          {getFieldError('operationMode') && (
            <p className="text-xs text-error mt-1 font-label-ui">{getFieldError('operationMode')}</p>
          )}
        </div>
      </div>

      {data.isSiteAutomated === 'yes' && (
        <div>
          <label htmlFor="automationVendor" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label-ui mb-1.5">
            Current Automation Vendor / System Name
          </label>
          <input
            id="automationVendor"
            type="text"
            value={data.automationVendor}
            onChange={(e) => onChange({ automationVendor: e.target.value })}
            placeholder="e.g. Radix, Wayne Fusion, Tokheim Kaizen, DOMS, etc."
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      )}

      {/* Multi-Pump Configuration Section */}
      <div className="pt-3 border-t border-outline-variant/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
          <div>
            <h4 className="text-base font-bold text-on-surface font-headline-sm">
              Forecourt Pump &amp; Dispenser Setup
            </h4>
            <p className="text-xs text-on-surface-variant">
              Specify each dispenser&apos;s serial, nozzle count, and meter technology below.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center">
            <span className="text-[11px] font-medium text-primary px-2.5 py-1 bg-primary/10 rounded-full font-label-ui">
              {filledCount} of {data.totalPumpCount || data.pumps.length} configured
            </span>
            <div className="flex items-center border border-outline-variant/30 rounded-lg bg-surface px-2 py-0.5">
              <label htmlFor="totalPumpInput" className="text-xs text-on-surface-variant mr-1.5">Pumps:</label>
              <input
                id="totalPumpInput"
                type="number"
                min={1}
                max={24}
                value={data.totalPumpCount || ''}
                onChange={(e) => handlePumpCountChange(parseInt(e.target.value || '1', 10))}
                className="w-10 px-1 py-0.5 text-center font-bold text-xs bg-surface-container rounded focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {getFieldError('totalPumpCount') && (
          <p className="text-xs text-error mb-3 font-label-ui">{getFieldError('totalPumpCount')}</p>
        )}

        {getFieldError('pumps') && (
          <p className="text-xs text-error mb-3 font-label-ui">{getFieldError('pumps')}</p>
        )}

        {/* Collapsible Guidance InfoCards */}
        <InfoCard title="Meter Types: Mechanical vs Electronic Pulsers" icon="speed" defaultExpanded={false}>
          <div className="space-y-1.5">
            <p>
              <strong>Electronic Pulsers:</strong> Dispensers with internal electronic calculator heads that stream volume and monetary totals via serial protocols (Current Loop, RS-485, or IFSF) directly into our PTS-2 controller.
            </p>
            <p>
              <strong>Mechanical Meters:</strong> Pumps with rolling number tumblers. We install an external pulse generator retrofit to translate meter rotation into digital ticks for automated KRA eTIMS signing.
            </p>
          </div>
        </InfoCard>

        <InfoCard title="What is a Pulse Output?" icon="sensors" defaultExpanded={false}>
          <p>
            A <strong>Pulse Output</strong> is an electronic electrical signal generated by the flow meter (e.g. 50 or 100 pulses per litre). It enables the automation controller to track liters dispensed in real-time, preventing volume leaks and un-receipted sales.
          </p>
        </InfoCard>

        {/* Dynamic Pump Cards Grid */}
        <div className="space-y-3.5 mt-4">
          {data.pumps.map((pump, idx) => {
            const makeError = getFieldError(`pump_${idx}_makeModel`);
            const nozzleError = getFieldError(`pump_${idx}_nozzleCount`);
            const meterError = getFieldError(`pump_${idx}_meterType`);

            return (
              <div
                key={pump.id || idx}
                className="p-4 sm:p-5 rounded-2xl bg-surface border border-outline-variant/30 transition-all"
                data-testid={`pump-card-${idx}`}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-label-ui text-primary">
                      Pump #{idx + 1}
                    </span>
                    {pump.makeModel.trim() && (
                      <span className="text-xs text-on-surface-variant font-medium">
                        &bull; {pump.makeModel}
                      </span>
                    )}
                  </div>

                  {data.pumps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePump(idx)}
                      className="text-xs text-on-surface-variant/70 hover:text-error flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded"
                      aria-label={`Remove Pump ${idx + 1}`}
                    >
                      <span className="material-symbols-outlined text-[15px]">delete</span>
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {/* Make / Model */}
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1">
                      Dispenser Make / Model *
                    </label>
                    <input
                      type="text"
                      value={pump.makeModel}
                      onChange={(e) => handleUpdatePump(idx, { makeModel: e.target.value })}
                      placeholder="e.g. Gilbarco SK700, Wayne Helix, Tokheim"
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    {makeError && <p className="text-xs text-error mt-1">{makeError}</p>}
                  </div>

                  {/* Serial Number */}
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1">
                      Serial Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={pump.dispenserSerial}
                      onChange={(e) => handleUpdatePump(idx, { dispenserSerial: e.target.value })}
                      placeholder="e.g. SN-88492"
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Nozzle Count */}
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1">
                      Number of Nozzles *
                    </label>
                    <select
                      value={pump.nozzleCount}
                      onChange={(e) =>
                        handleUpdatePump(idx, { nozzleCount: parseInt(e.target.value, 10) })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value={1}>1 Nozzle (Single product)</option>
                      <option value={2}>2 Nozzles (Dual hose)</option>
                      <option value={3}>3 Nozzles</option>
                      <option value={4}>4 Nozzles (Multi-product MPD)</option>
                      <option value={6}>6 Nozzles (Dual side 3-product MPD)</option>
                      <option value={8}>8 Nozzles (High volume quad)</option>
                    </select>
                    {nozzleError && <p className="text-xs text-error mt-1">{nozzleError}</p>}
                  </div>

                  {/* Meter Type */}
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1">
                      Meter Technology *
                    </label>
                    <div className="flex gap-3 items-center mt-1.5">
                      <label className="flex items-center gap-1.5 text-xs text-on-surface cursor-pointer">
                        <input
                          type="radio"
                          name={`meter_${idx}`}
                          value="electronic"
                          checked={pump.meterType === 'electronic'}
                          onChange={() => handleUpdatePump(idx, { meterType: 'electronic' as MeterType })}
                          className="text-primary focus:ring-primary"
                        />
                        <span>Electronic Pulser</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-on-surface cursor-pointer">
                        <input
                          type="radio"
                          name={`meter_${idx}`}
                          value="mechanical"
                          checked={pump.meterType === 'mechanical'}
                          onChange={() => handleUpdatePump(idx, { meterType: 'mechanical' as MeterType })}
                          className="text-primary focus:ring-primary"
                        />
                        <span>Mechanical</span>
                      </label>
                    </div>
                    {meterError && <p className="text-xs text-error mt-1">{meterError}</p>}
                  </div>

                  {/* Pulse Output Available */}
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1">
                      Pulse Output Available?
                    </label>
                    <div className="flex gap-3 items-center mt-1.5">
                      <label className="flex items-center gap-1.5 text-xs text-on-surface cursor-pointer">
                        <input
                          type="radio"
                          name={`pulse_${idx}`}
                          value="yes"
                          checked={pump.pulseOutputAvailable === 'yes'}
                          onChange={() => handleUpdatePump(idx, { pulseOutputAvailable: 'yes' as YesNo })}
                          className="text-primary focus:ring-primary"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-on-surface cursor-pointer">
                        <input
                          type="radio"
                          name={`pulse_${idx}`}
                          value="no"
                          checked={pump.pulseOutputAvailable === 'no'}
                          onChange={() => handleUpdatePump(idx, { pulseOutputAvailable: 'no' as YesNo })}
                          className="text-primary focus:ring-primary"
                        />
                        <span>No / Unsure</span>
                      </label>
                    </div>
                  </div>

                  {/* Fuel Types Available on this Pump */}
                  <div className="sm:col-span-2 md:col-span-3 pt-1">
                    <label className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1.5">
                      Fuel Grades Dispensed at this Pump
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {FUEL_TYPES.map((fuel) => {
                        const isSelected = pump.fuelTypes.includes(fuel.value);
                        return (
                          <button
                            type="button"
                            key={fuel.value}
                            onClick={() => handleToggleFuelType(idx, fuel.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-label-ui transition-colors border ${
                              isSelected
                                ? 'bg-primary text-on-primary border-primary'
                                : 'bg-surface text-on-surface border-outline-variant/30 hover:bg-surface-container-low'
                            }`}
                          >
                            {fuel.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Specific justification field for 'other' selection */}
                    {pump.fuelTypes.includes('other') && (
                      <div className="mt-2.5 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/30 space-y-1">
                        <label
                          htmlFor={`pump_${idx}_otherFuel`}
                          className="block text-xs font-semibold text-on-surface font-label-ui"
                        >
                          Specify &ldquo;Other&rdquo; Fuel Grade / Product *
                        </label>
                        <input
                          id={`pump_${idx}_otherFuel`}
                          type="text"
                          value={pump.otherFuelType || ''}
                          onChange={(e) => handleUpdatePump(idx, { otherFuelType: e.target.value })}
                          placeholder="e.g. Jet A-1, Aviation Gas (Avgas), Heavy Fuel Oil (HFO), AdBlue"
                          className="w-full sm:w-3/4 px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <p className="text-[11px] text-on-surface-variant">
                          Knowing the exact product ensures we configure appropriate meter pulse calibrations and safety interlocks.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Another Pump Button */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleAddSinglePump}
            className="px-4 py-2 rounded-xl border border-outline-variant/40 bg-surface text-primary font-semibold text-xs hover:bg-surface-container-low transition-colors flex items-center gap-1.5 font-label-ui cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Another Pump</span>
          </button>
        </div>

        {/* Additional Forecourt Notes */}
        <div className="mt-5 pt-3 border-t border-outline-variant/20">
          <label htmlFor="infrastructureNotes" className="block text-xs font-semibold text-on-surface-variant font-label-ui mb-1">
            Additional Forecourt &amp; Pump Notes (Optional)
          </label>
          <textarea
            id="infrastructureNotes"
            rows={2}
            value={data.infrastructureNotes || ''}
            onChange={(e) => onChange({ infrastructureNotes: e.target.value })}
            placeholder="Special dispenser arrangements, master-satellite configurations, high-flow commercial nozzles, or ATG probe models..."
            className="w-full px-3.5 py-2 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-body-md text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
      </div>
    </div>
  );
}
