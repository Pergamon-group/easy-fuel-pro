import { describe, it, expect } from 'vitest';
import { pricingConfig, formatPrice } from './pricing';

describe('pricingConfig (Centralized Forecourt Pricing Single Source of Truth)', () => {
  it('defines consistent numeric totals matching formatted strings', () => {
    expect(pricingConfig.options.semiAutomated.totalYear1).toBe(109500);
    expect(pricingConfig.options.semiAutomated.totalFormatted).toBe('KES 109,500');
    expect(pricingConfig.options.fullAutomation.totalYear1).toBe(269500);
    expect(pricingConfig.options.fullAutomation.totalFormatted).toBe('KES 269,500');
  });

  it('correctly calculates component totals for Option 1 and Option 2', () => {
    const { incotexEsd, systemIntegration, thermalPrinter, ptsController } = pricingConfig.components;
    
    // Option 1 = ESD (70k) + Integration (30k) + Printer (9.5k) = 109,500
    const opt1Sum = (incotexEsd.price || 0) + (systemIntegration.price || 0) + (thermalPrinter.price || 0);
    expect(opt1Sum).toBe(pricingConfig.options.semiAutomated.totalYear1);

    // Option 2 = Option 1 + PTS-2 Controller (160k) = 269,500
    const opt2Sum = opt1Sum + (ptsController.price || 0);
    expect(opt2Sum).toBe(pricingConfig.options.fullAutomation.totalYear1);
  });

  it('defines AMC terms and rate starting year 2', () => {
    expect(pricingConfig.amcPerYear).toBe(10000);
    expect(pricingConfig.amcFormatted).toBe('KES 10,000');
  });

  it('formats custom amounts with formatPrice helper', () => {
    expect(formatPrice(109500)).toBe('KES 109,500');
    expect(formatPrice(269500)).toBe('KES 269,500');
    expect(formatPrice(10000)).toBe('KES 10,000');
  });
});
