import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getSupabaseClient,
  saveSiteSurveyRecord,
  buildSurveyRecord,
  buildOfflineSurveyRecord,
} from './supabase';
import { createDefaultSurveyData } from '@/data/survey-schema';

describe('Supabase Site Survey Repository (TDD)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('returns null client when environment variables are not set', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    expect(getSupabaseClient()).toBeNull();
  });

  it('handles fallback gracefully when supabase is unconfigured', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;

    const record = buildSurveyRecord(
      createDefaultSurveyData(),
      'EFP-SRV-2026-TEST1',
      ['ik_123']
    );

    const result = await saveSiteSurveyRecord(record);
    expect(result.success).toBe(true);
    expect(result.id).toBe('local_EFP-SRV-2026-TEST1');
  });

  it('constructs well-structured survey records from online wizard data', () => {
    const survey = createDefaultSurveyData();
    survey.businessInfo.customerName = 'KenolKobil';
    survey.businessInfo.siteName = 'Mombasa Port Station';
    survey.businessInfo.county = 'Mombasa';
    survey.businessInfo.contactEmail = 'ops@kenolkobil.com';
    survey.businessInfo.contactPhone = '+254711223344';

    const record = buildSurveyRecord(survey, 'EFP-SRV-2026-MBS1', ['ik_img_1']);
    expect(record.reference_code).toBe('EFP-SRV-2026-MBS1');
    expect(record.customer_name).toBe('KenolKobil');
    expect(record.submission_type).toBe('online_wizard');
    expect(record.status).toBe('pending');
    expect(record.imagekit_file_ids).toEqual(['ik_img_1']);
  });

  it('constructs well-structured survey records from offline upload data', () => {
    const record = buildOfflineSurveyRecord(
      {
        customerName: 'Hashi Energy',
        siteName: 'Hashi Eldoret',
        contactPersonName: 'Daniel Kibet',
        contactPhone: '+254733445566',
        contactEmail: 'daniel@hashienergy.com',
        county: 'Uasin Gishu',
        preferredDates: ['2026-11-05'],
        notes: 'Filled by station manager',
      },
      'EFP-SRV-2026-OFF02',
      ['ik_pdf_99']
    );

    expect(record.reference_code).toBe('EFP-SRV-2026-OFF02');
    expect(record.submission_type).toBe('pdf_upload');
    expect(record.county).toBe('Uasin Gishu');
  });
});
