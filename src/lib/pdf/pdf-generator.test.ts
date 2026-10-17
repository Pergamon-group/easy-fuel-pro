/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { generateSurveyReportPdfBuffer, generateBlankSurveyPdfBuffer } from './pdf-generator';
import { createDefaultSurveyData } from '@/data/survey-schema';

describe('PDF Generation Service (TDD)', () => {
  it('generates a valid PDF buffer for a completed survey report', async () => {
    const survey = createDefaultSurveyData();
    survey.businessInfo = {
      customerName: 'Oilibya Kenya',
      siteName: 'Oilibya Westlands',
      physicalLocation: 'Ring Road, Westlands',
      county: 'Nairobi',
      kraPin: 'P051234567A',
      contactPersonName: 'David Kariuki',
      contactPhone: '+254711998877',
      contactEmail: 'david@oilibya.co.ke',
    };
    survey.infrastructure.totalPumpCount = 2;
    survey.infrastructure.pumps = [
      {
        id: 'p1',
        makeModel: 'Gilbarco SK700',
        dispenserSerial: 'SN-001',
        nozzleCount: 4,
        meterType: 'electronic',
        pulseOutputAvailable: 'yes',
        fuelTypes: ['PMS', 'AGO'],
      },
    ];

    const buffer = await generateSurveyReportPdfBuffer(survey, 'EFP-SRV-2026-PDF01');
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(100);
    // PDF magic bytes %PDF
    expect(buffer.subarray(0, 4).toString()).toBe('%PDF');
  });

  it('generates a valid blank checklist PDF buffer', async () => {
    const buffer = await generateBlankSurveyPdfBuffer();
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(100);
    expect(buffer.subarray(0, 4).toString()).toBe('%PDF');
  });
});
