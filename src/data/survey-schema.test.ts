import { describe, it, expect } from 'vitest';
import {
  validateBusinessInfo,
  validateScheduling,
  validateInfrastructure,
  validateCompliance,
  validateReadiness,
  validateOfflinePdfSubmission,
  generateSurveyReference,
  createDefaultSurveyData,
  BusinessInfo,
  SurveyScheduling,
  InfrastructureInfo,
  ComplianceConnectivity,
  SiteReadiness,
  OfflinePdfSubmission,
} from './survey-schema';

describe('Site Survey Schema & Validation (TDD)', () => {
  describe('Reference Code Generator', () => {
    it('generates a formatted reference code starting with EFP-SRV', () => {
      const code1 = generateSurveyReference();
      const code2 = generateSurveyReference();
      expect(code1).toMatch(/^EFP-SRV-\d{4}-[A-Z0-9]{5}$/);
      expect(code1).not.toBe(code2);
    });
  });

  describe('createDefaultSurveyData', () => {
    it('creates an initialized survey data structure', () => {
      const data = createDefaultSurveyData();
      expect(data.businessInfo.customerName).toBe('');
      expect(data.infrastructure.pumps).toEqual([]);
      expect(data.readiness.consentGiven).toBe(false);
    });
  });

  describe('validateBusinessInfo', () => {
    const validInfo: BusinessInfo = {
      customerName: 'Delta Energy Ltd',
      siteName: 'Delta Service Station Westlands',
      physicalLocation: 'Waiyaki Way, Westlands',
      county: 'Nairobi',
      kraPin: 'P051234567A',
      contactPersonName: 'James Mwangi',
      contactPhone: '+254712345678',
      contactEmail: 'james@deltaenergy.co.ke',
    };

    it('passes for valid business info with company KRA PIN', () => {
      const errors = validateBusinessInfo(validInfo);
      expect(errors).toHaveLength(0);
    });

    it('passes for valid individual KRA PIN starting with A', () => {
      const errors = validateBusinessInfo({ ...validInfo, kraPin: 'A001234567B' });
      expect(errors).toHaveLength(0);
    });

    it('rejects missing required fields', () => {
      const errors = validateBusinessInfo({
        customerName: '',
        siteName: '',
        physicalLocation: '',
        county: '',
        kraPin: '',
        contactPersonName: '',
        contactPhone: '',
        contactEmail: '',
      });
      expect(errors.some((e) => e.field === 'customerName')).toBe(true);
      expect(errors.some((e) => e.field === 'kraPin')).toBe(true);
      expect(errors.some((e) => e.field === 'contactEmail')).toBe(true);
    });

    it('rejects invalid KRA PIN formats', () => {
      const errors = validateBusinessInfo({ ...validInfo, kraPin: 'INVALID123' });
      expect(errors.some((e) => e.field === 'kraPin')).toBe(true);
      expect(errors.find((e) => e.field === 'kraPin')?.message).toContain('KRA PIN format is invalid');
    });

    it('rejects invalid email formats', () => {
      const errors = validateBusinessInfo({ ...validInfo, contactEmail: 'notanemail' });
      expect(errors.some((e) => e.field === 'contactEmail')).toBe(true);
    });
  });

  describe('validateScheduling', () => {
    const validScheduling: SurveyScheduling = {
      preferredDates: ['2026-10-25', '2026-10-26'],
      schedulingNotes: 'Mornings preferred',
      operatingHours: 'full_24h',
      customOperatingHours: '',
    };

    it('passes for valid scheduling data', () => {
      expect(validateScheduling(validScheduling)).toHaveLength(0);
    });

    it('rejects empty preferredDates', () => {
      const errors = validateScheduling({ ...validScheduling, preferredDates: [] });
      expect(errors.some((e) => e.field === 'preferredDates')).toBe(true);
    });

    it('rejects empty operatingHours', () => {
      const errors = validateScheduling({ ...validScheduling, operatingHours: '' });
      expect(errors.some((e) => e.field === 'operatingHours')).toBe(true);
    });

    it('requires customOperatingHours when operatingHours is custom', () => {
      const errors = validateScheduling({
        ...validScheduling,
        operatingHours: 'custom',
        customOperatingHours: '',
      });
      expect(errors.some((e) => e.field === 'customOperatingHours')).toBe(true);
    });
  });

  describe('validateInfrastructure (Multi-Pump & Multi-Nozzle)', () => {
    const validInfra: InfrastructureInfo = {
      isSiteAutomated: 'yes',
      operationMode: 'fully_automated',
      automationVendor: 'Radix Automation',
      totalPumpCount: 2,
      pumps: [
        {
          id: 'p1',
          makeModel: 'Gilbarco SK700-2',
          dispenserSerial: 'GB-10293',
          nozzleCount: 4,
          meterType: 'electronic',
          pulseOutputAvailable: 'yes',
          fuelTypes: ['PMS', 'PMS', 'AGO', 'AGO'],
        },
        {
          id: 'p2',
          makeModel: 'Tokheim Quantium 510',
          dispenserSerial: 'TK-84721',
          nozzleCount: 2,
          meterType: 'electronic',
          pulseOutputAvailable: 'yes',
          fuelTypes: ['PMS', 'AGO'],
        },
      ],
    };

    it('passes for properly configured multi-pump infrastructure', () => {
      expect(validateInfrastructure(validInfra)).toHaveLength(0);
    });

    it('rejects totalPumpCount < 1', () => {
      const errors = validateInfrastructure({ ...validInfra, totalPumpCount: 0 });
      expect(errors.some((e) => e.field === 'totalPumpCount')).toBe(true);
    });

    it('rejects if fewer pumps are filled than totalPumpCount', () => {
      const errors = validateInfrastructure({ ...validInfra, totalPumpCount: 3 });
      expect(errors.some((e) => e.field === 'pumps')).toBe(true);
    });

    it('validates each pump card makeModel, nozzleCount, and meterType', () => {
      const errors = validateInfrastructure({
        ...validInfra,
        pumps: [
          {
            id: 'p1',
            makeModel: '',
            dispenserSerial: '',
            nozzleCount: 0,
            meterType: '',
            pulseOutputAvailable: '',
            fuelTypes: [],
          },
        ],
        totalPumpCount: 1,
      });
      expect(errors.some((e) => e.field === 'pump_0_makeModel')).toBe(true);
      expect(errors.some((e) => e.field === 'pump_0_nozzleCount')).toBe(true);
      expect(errors.some((e) => e.field === 'pump_0_meterType')).toBe(true);
    });
  });

  describe('validateCompliance', () => {
    const validCompliance: ComplianceConnectivity = {
      etimsSolutionType: 'vscu',
      etimsIntegrationMethod: 'api',
      posSystem: 'EasyFuel POS v3',
      generatesCompliantReceipts: 'yes',
      receiptHasMandatoryFields: 'yes',
      realTimeSalesCurrentlyTransmitting: 'yes',
      requireRealtimeTransmissionGoal: 'yes',
      complianceNotes: 'All pumps ready',
      internetAvailable: 'yes',
      connectionType: 'fiber',
      networkRedundancy: 'yes',
      lanInPlace: 'yes',
      posTerminalsInstalled: 'yes',
      automationControllerInstalled: 'yes',
      controlUnitSecured: 'yes',
      upsPowerBackup: 'yes',
    };

    it('passes for complete compliance and connectivity responses', () => {
      expect(validateCompliance(validCompliance)).toHaveLength(0);
    });

    it('requires etimsSolutionType', () => {
      const errors = validateCompliance({ ...validCompliance, etimsSolutionType: '' });
      expect(errors.some((e) => e.field === 'etimsSolutionType')).toBe(true);
    });

    it('requires connectionType if internetAvailable is yes', () => {
      const errors = validateCompliance({
        ...validCompliance,
        internetAvailable: 'yes',
        connectionType: '',
      });
      expect(errors.some((e) => e.field === 'connectionType')).toBe(true);
    });
  });

  describe('validateReadiness', () => {
    const validReadiness: SiteReadiness = {
      trenchingCompleted: 'yes',
      conduitsInstalled: 'yes',
      pumpIslandsGrounded: 'yes',
      siteNotes: 'Site ready for inspection',
      uploadedImageIds: ['ik_file_123'],
      consentGiven: true,
    };

    it('passes when consent is given', () => {
      expect(validateReadiness(validReadiness)).toHaveLength(0);
    });

    it('rejects if consent is false', () => {
      const errors = validateReadiness({ ...validReadiness, consentGiven: false });
      expect(errors.some((e) => e.field === 'consentGiven')).toBe(true);
    });
  });

  describe('validateOfflinePdfSubmission', () => {
    const validOffline: OfflinePdfSubmission = {
      customerName: 'Apex Petroleum',
      siteName: 'Apex Station Thika',
      contactPersonName: 'Sarah Ochieng',
      contactPhone: '+254722998877',
      contactEmail: 'sarah@apexpetroleum.com',
      county: 'Kiambu',
      preferredDates: ['2026-10-30'],
      notes: 'Scanned handwritten survey attached',
    };

    it('passes for valid offline submission metadata', () => {
      expect(validateOfflinePdfSubmission(validOffline)).toHaveLength(0);
    });

    it('rejects missing contact fields', () => {
      const errors = validateOfflinePdfSubmission({
        ...validOffline,
        customerName: '',
        contactPhone: '',
        contactEmail: 'invalid',
      });
      expect(errors.some((e) => e.field === 'customerName')).toBe(true);
      expect(errors.some((e) => e.field === 'contactPhone')).toBe(true);
      expect(errors.some((e) => e.field === 'contactEmail')).toBe(true);
    });
  });
});
