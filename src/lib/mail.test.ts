import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import nodemailer from 'nodemailer';
import {
  getSmtpConfig,
  sendBookingEmail,
  sendSiteSurveyNotificationEmail,
  sendOfflinePdfNotificationEmail,
  sendCustomerSurveyConfirmation,
} from './mail';
import { createDefaultSurveyData } from '@/data/survey-schema';

describe('Nodemailer 10 SMTP Service (TDD)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('getSmtpConfig', () => {
    it('returns null when SMTP credentials are not set', () => {
      delete process.env.SMTP_USER;
      delete process.env.SMTP_PASS;
      expect(getSmtpConfig()).toBeNull();
    });

    it('parses SMTP configuration with multiple comma-separated recipients', () => {
      process.env.SMTP_USER = 'notifications@easyfuelpro.com';
      process.env.SMTP_PASS = 'secretpass';
      process.env.SMTP_HOST = 'mail.pergamongroup.com';
      process.env.SMTP_PORT = '465';
      process.env.SMTP_SECURE = 'true';
      process.env.MAIL_TO = 'sales@pergamongroup.com, info@easyfuelpro.com, ops@pergamongroup.com';

      const config = getSmtpConfig();
      expect(config).not.toBeNull();
      expect(config?.host).toBe('mail.pergamongroup.com');
      expect(config?.port).toBe(465);
      expect(config?.secure).toBe(true);
      expect(config?.to).toEqual([
        'sales@pergamongroup.com',
        'info@easyfuelpro.com',
        'ops@pergamongroup.com',
      ]);
    });
  });

  describe('Email Dispatchers', () => {
    let mockSendMail: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      process.env.SMTP_USER = 'notifications@easyfuelpro.com';
      process.env.SMTP_PASS = 'secretpass';
      process.env.MAIL_TO = 'ops@pergamongroup.com';

      mockSendMail = vi.fn().mockResolvedValue({ messageId: 'test-123' });
      vi.spyOn(nodemailer, 'createTransport').mockReturnValue({
        sendMail: mockSendMail,
      } as unknown as ReturnType<typeof nodemailer.createTransport>);
    });

    it('sends booking notification email successfully', async () => {
      const result = await sendBookingEmail({
        name: 'John Doe',
        business: 'TotalEnergies Nairobi',
        pumps: '4',
        phone: '+254712345678',
        location: 'Kilimani',
        details: 'Need 4 dispensers integrated',
      });

      expect(result.success).toBe(true);
      expect(mockSendMail).toHaveBeenCalledOnce();
      const callArg = mockSendMail.mock.calls[0][0];
      expect(callArg.subject).toContain('TotalEnergies Nairobi');
      expect(callArg.html).toContain('John Doe');
      expect(callArg.html).toContain('Kilimani');
    });

    it('sends full site survey notification with attached PDF', async () => {
      const surveyData = createDefaultSurveyData();
      surveyData.businessInfo = {
        customerName: 'KenolKobil Ltd',
        siteName: 'Rubis Express Karen',
        physicalLocation: 'Ngong Road, Karen',
        county: 'Nairobi',
        kraPin: 'P051234567A',
        contactPersonName: 'Alice Muthoni',
        contactPhone: '+254700112233',
        contactEmail: 'alice@rubis.co.ke',
      };
      surveyData.infrastructure.totalPumpCount = 1;
      surveyData.infrastructure.pumps = [
        {
          id: 'p1',
          makeModel: 'Gilbarco SK700',
          dispenserSerial: 'GB-9921',
          nozzleCount: 4,
          meterType: 'electronic',
          pulseOutputAvailable: 'yes',
          fuelTypes: ['PMS', 'AGO'],
        },
      ];

      const pdfBuffer = Buffer.from('%PDF-1.4 test mock');

      const result = await sendSiteSurveyNotificationEmail({
        survey: surveyData,
        referenceCode: 'EFP-SRV-2026-X99Z1',
        pdfBuffer,
        imageSignedUrls: ['https://ik.imagekit.io/signed-test-url'],
      });

      expect(result.success).toBe(true);
      // Main ops email + customer confirmation email
      expect(mockSendMail).toHaveBeenCalled();
      const opsCallArg = mockSendMail.mock.calls[0][0];
      expect(opsCallArg.subject).toContain('EFP-SRV-2026-X99Z1');
      expect(opsCallArg.attachments).toHaveLength(1);
      expect(opsCallArg.attachments[0].filename).toBe('Site-Survey-EFP-SRV-2026-X99Z1.pdf');
      expect(opsCallArg.html).toContain('Rubis Express Karen');
      expect(opsCallArg.html).toContain('https://ik.imagekit.io/signed-test-url');
    });

    it('sends offline PDF notification email with attached document', async () => {
      const result = await sendOfflinePdfNotificationEmail({
        submission: {
          customerName: 'Ola Energy',
          siteName: 'Ola Westlands',
          contactPersonName: 'Peter Kamau',
          contactPhone: '+254722334455',
          contactEmail: 'peter@olaenergy.com',
          county: 'Nairobi',
          preferredDates: ['2026-11-01'],
          notes: 'Handwritten scan attached',
        },
        referenceCode: 'EFP-SRV-2026-OFF01',
        fileBuffer: Buffer.from('%PDF-1.4 scan'),
        fileName: 'handwritten-survey.pdf',
      });

      expect(result.success).toBe(true);
      expect(mockSendMail).toHaveBeenCalled();
      const callArg = mockSendMail.mock.calls[0][0];
      expect(callArg.subject).toContain('EFP-SRV-2026-OFF01');
      expect(callArg.attachments).toHaveLength(1);
      expect(callArg.attachments[0].filename).toBe('handwritten-survey.pdf');
    });

    it('sends customer confirmation email', async () => {
      const result = await sendCustomerSurveyConfirmation({
        to: 'customer@example.com',
        customerName: 'Peter Kamau',
        siteName: 'Ola Westlands',
        referenceCode: 'EFP-SRV-2026-CONF',
      });

      expect(result.success).toBe(true);
      expect(mockSendMail).toHaveBeenCalled();
      const callArg = mockSendMail.mock.calls[0][0];
      expect(callArg.to).toBe('customer@example.com');
      expect(callArg.subject).toContain('EFP-SRV-2026-CONF');
    });
  });
});
