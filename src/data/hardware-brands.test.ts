import { describe, it, expect } from 'vitest';
import {
  DISPENSER_BRANDS,
  ATG_PROBE_BRANDS,
  TOTAL_DISPENSER_COUNT,
  TOTAL_ATG_COUNT,
  searchHardwareBrands,
} from './hardware-brands';

describe('Hardware Compatibility Dataset (Vetted Forecourt Catalog)', () => {
  it('contains at least 150 supported fuel dispenser brands', () => {
    expect(DISPENSER_BRANDS.length).toBeGreaterThanOrEqual(150);
    expect(TOTAL_DISPENSER_COUNT).toBe(DISPENSER_BRANDS.length);
  });

  it('contains at least 60 supported ATG systems and probe brands', () => {
    expect(ATG_PROBE_BRANDS.length).toBeGreaterThanOrEqual(60);
    expect(TOTAL_ATG_COUNT).toBe(ATG_PROBE_BRANDS.length);
  });

  it('includes key global dispenser manufacturers supported in EasyFuel Pro', () => {
    const dispenserNames = DISPENSER_BRANDS.map((b) => b.name.toLowerCase());
    expect(dispenserNames).toContain('gilbarco');
    expect(dispenserNames.some((n) => n.includes('wayne'))).toBe(true);
    expect(dispenserNames).toContain('tokheim');
    expect(dispenserNames.some((n) => n.includes('tatsuno'))).toBe(true);
    expect(dispenserNames).toContain('bennett');
    expect(dispenserNames).toContain('prowalco');
  });

  it('includes key global ATG probe manufacturers supported in EasyFuel Pro', () => {
    const atgNames = ATG_PROBE_BRANDS.map((b) => b.name.toLowerCase());
    expect(atgNames.some((n) => n.includes('veeder root'))).toBe(true);
    expect(atgNames.some((n) => n.includes('franklin fueling'))).toBe(true);
    expect(atgNames).toContain('opw');
    expect(atgNames).toContain('fafnir');
    expect(atgNames).toContain('hectronic');
    expect(atgNames).toContain('start italiana');
  });

  it('filters brands correctly via searchHardwareBrands utility', () => {
    const gilbarcoResults = searchHardwareBrands('gilbarco');
    expect(gilbarcoResults.length).toBeGreaterThan(0);
    expect(gilbarcoResults.some((item) => item.category === 'dispenser')).toBe(true);
    expect(gilbarcoResults.some((item) => item.category === 'atg')).toBe(true);

    const atgOnly = searchHardwareBrands('fafnir', 'atg');
    expect(atgOnly.length).toBe(1);
    expect(atgOnly[0].name).toBe('FAFNIR');
  });
});
