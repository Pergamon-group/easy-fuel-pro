import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitSiteSurvey, submitOfflineSurveyPdf } from './survey';
import * as imagekitLib from '@/lib/imagekit';
import * as pdfLib from '@/lib/pdf/pdf-generator';
import * as mailLib from '@/lib/mail';
import * as supabaseLib from '@/lib/supabase';
import { createDefaultSurveyData, SiteSurveyData } from '@/data/survey-schema';

vi.mock('@/lib/imagekit', () => ({
  uploadPrivateSiteAsset: vi.fn(),
}));

vi.mock('@/lib/pdf/pdf-generator', () => ({
  generateSurveyReportPdfBuffer: vi.fn(),
}));

vi.mock('@/lib/mail', () => ({
  sendSiteSurveyNotificationEmail: vi.fn(),
  sendOfflinePdfNotificationEmail: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  saveSiteSurveyRecord: vi.fn(),
  buildSurveyRecord: vi.fn(),
  buildOfflineSurveyRecord: vi.fn(),
}));

describe('Site Survey Server Actions (TDD)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('submitSiteSurvey', () => {
    it('returns validation errors for empty survey payload', async () => {
      const emptySurvey = createDefaultSurveyData();
      const formData = new FormData();
      formData.append('surveyData', JSON.stringify(emptySurvey));

      const result = await submitSiteSurvey(formData);
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
      expect(imagekitLib.uploadPrivateSiteAsset).not.toHaveBeenCalled();
    });

    it('processes valid complete survey, uploads images, generates PDF, and sends emails', async () => {
      const validSurvey: SiteSurveyData = {
        businessInfo: {
          customerName: 'Vivo Energy Kenya',
          siteName: 'Shell Westlands',
          physicalLocation: 'Waiyaki Way',
          county: 'Nairobi',
          kraPin: 'P051234567A',
          contactPersonName: 'Grace Muthoni',
          contactPhone: '+254711002233',
          contactEmail: 'grace@vivoenergy.com',
        },
        scheduling: {
          preferredDates: ['2026-11-01'],
          schedulingNotes: 'Any morning',
          operatingHours: 'full_24h',
          customOperatingHours: '',
        },
        infrastructure: {
          isSiteAutomated: 'yes',
          operationMode: 'fully_automated',
          automationVendor: 'Wayne Fusion',
          totalPumpCount: 1,
          pumps: [
            {
              id: 'p1',
              makeModel: 'Wayne Helix 5000',
              dispenserSerial: 'WH-5021',
              nozzleCount: 4,
              meterType: 'electronic',
              pulseOutputAvailable: 'yes',
              fuelTypes: ['PMS', 'AGO'],
            },
          ],
        },
        compliance: {
          etimsSolutionType: 'vscu',
          etimsIntegrationMethod: 'api',
          posSystem: 'EasyFuel POS',
          generatesCompliantReceipts: 'yes',
          receiptHasMandatoryFields: 'yes',
          realTimeSalesCurrentlyTransmitting: 'yes',
          requireRealtimeTransmissionGoal: 'yes',
          internetAvailable: 'yes',
          connectionType: 'fiber',
          networkRedundancy: 'yes',
          lanInPlace: 'yes',
          posTerminalsInstalled: 'yes',
          automationControllerInstalled: 'yes',
          controlUnitSecured: 'yes',
          upsPowerBackup: 'yes',
        },
        readiness: {
          trenchingCompleted: 'yes',
          conduitsInstalled: 'yes',
          pumpIslandsGrounded: 'yes',
          siteNotes: 'Ready for hardware audit',
          uploadedImageIds: [],
          consentGiven: true,
        },
      };

      vi.mocked(imagekitLib.uploadPrivateSiteAsset).mockResolvedValue({
        fileId: 'ik_mock_123',
        filePath: '/site-surveys/img1.jpg',
        url: 'https://ik.imagekit.io/img1.jpg',
        signedUrl: 'https://ik.imagekit.io/signed-url',
        name: 'img1.jpg',
      });

      vi.mocked(pdfLib.generateSurveyReportPdfBuffer).mockResolvedValue(
        Buffer.from('%PDF-1.4 mock')
      );
      vi.mocked(supabaseLib.saveSiteSurveyRecord).mockResolvedValue({
        success: true,
        id: 'db_123',
      });
      vi.mocked(mailLib.sendSiteSurveyNotificationEmail).mockResolvedValue({
        success: true,
      });

      const formData = new FormData();
      formData.append('surveyData', JSON.stringify(validSurvey));

      // Mock a file attachment
      const fakeFile = new File([new Uint8Array([1, 2, 3])], 'forecourt.jpg', {
        type: 'image/jpeg',
      });
      formData.append('images', fakeFile);

      const result = await submitSiteSurvey(formData);
      expect(result.success).toBe(true);
      expect(result.referenceCode).toMatch(/^EFP-SRV-\d{4}-[A-Z0-9]{5}$/);
      expect(imagekitLib.uploadPrivateSiteAsset).toHaveBeenCalledOnce();
      expect(pdfLib.generateSurveyReportPdfBuffer).toHaveBeenCalledOnce();
      expect(supabaseLib.saveSiteSurveyRecord).toHaveBeenCalledOnce();
      expect(mailLib.sendSiteSurveyNotificationEmail).toHaveBeenCalledOnce();
    });
  });

  describe('submitOfflineSurveyPdf', () => {
    it('returns error if document file is missing', async () => {
      const formData = new FormData();
      formData.append('customerName', 'Total Kenya');
      formData.append('siteName', 'Total Parklands');
      formData.append('contactPersonName', 'Ali Noor');
      formData.append('contactPhone', '+254712345678');
      formData.append('contactEmail', 'ali@total.co.ke');
      formData.append('county', 'Nairobi');

      const result = await submitOfflineSurveyPdf(formData);
      expect(result.success).toBe(false);
      expect(result.error).toContain('attach your completed survey document');
    });

    it('uploads document and dispatches notification on valid submission', async () => {
      vi.mocked(imagekitLib.uploadPrivateSiteAsset).mockResolvedValue({
        fileId: 'ik_doc_999',
        filePath: '/site-surveys/doc.pdf',
        url: 'https://ik.imagekit.io/doc.pdf',
        signedUrl: 'https://ik.imagekit.io/signed-doc',
        name: 'doc.pdf',
      });
      vi.mocked(supabaseLib.saveSiteSurveyRecord).mockResolvedValue({
        success: true,
        id: 'db_456',
      });
      vi.mocked(mailLib.sendOfflinePdfNotificationEmail).mockResolvedValue({
        success: true,
      });

      const formData = new FormData();
      formData.append('customerName', 'Rubis Energy');
      formData.append('siteName', 'Rubis Kilimani');
      formData.append('contactPersonName', 'Samson Otieno');
      formData.append('contactPhone', '+254733112233');
      formData.append('contactEmail', 'samson@rubis.co.ke');
      formData.append('county', 'Nairobi');
      formData.append('preferredDates', '2026-11-10');
      formData.append('notes', 'Scanned document with hand notations');

      const fakePdf = new File([new Uint8Array([37, 80, 68, 70])], 'rubis-survey.pdf', {
        type: 'application/pdf',
      });
      formData.append('document', fakePdf);

      const result = await submitOfflineSurveyPdf(formData);
      expect(result.success).toBe(true);
      expect(result.referenceCode).toMatch(/^EFP-SRV-\d{4}-[A-Z0-9]{5}$/);
      expect(imagekitLib.uploadPrivateSiteAsset).toHaveBeenCalledOnce();
      expect(mailLib.sendOfflinePdfNotificationEmail).toHaveBeenCalledOnce();
    });
  });
});
