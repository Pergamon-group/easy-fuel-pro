'use server';

import {
  SiteSurveyData,
  OfflinePdfSubmission,
  validateBusinessInfo,
  validateScheduling,
  validateInfrastructure,
  validateCompliance,
  validateReadiness,
  validateOfflinePdfSubmission,
  generateSurveyReference,
  ValidationError,
} from '@/data/survey-schema';
import { uploadPrivateSiteAsset } from '@/lib/imagekit';
import { generateSurveyReportPdfBuffer } from '@/lib/pdf/pdf-generator';
import {
  sendSiteSurveyNotificationEmail,
  sendOfflinePdfNotificationEmail,
} from '@/lib/mail';
import {
  saveSiteSurveyRecord,
  buildSurveyRecord,
  buildOfflineSurveyRecord,
} from '@/lib/supabase';

export interface SurveyActionResponse {
  success: boolean;
  referenceCode?: string;
  errors?: ValidationError[];
  error?: string;
}

/**
 * Handles online 5-step site survey submission.
 * Validates all sections, uploads station photos securely to ImageKit (private files),
 * generates a PDF report, records in Supabase, and dispatches multi-recipient emails.
 */
export async function submitSiteSurvey(formData: FormData): Promise<SurveyActionResponse> {
  try {
    const rawData = formData.get('surveyData');
    if (!rawData || typeof rawData !== 'string') {
      return { success: false, error: 'Invalid or missing survey form payload.' };
    }

    const survey: SiteSurveyData = JSON.parse(rawData);

    // Validate all 5 steps
    const businessErrors = validateBusinessInfo(survey.businessInfo);
    const schedulingErrors = validateScheduling(survey.scheduling);
    const infraErrors = validateInfrastructure(survey.infrastructure);
    const complianceErrors = validateCompliance(survey.compliance);
    const readinessErrors = validateReadiness(survey.readiness);

    const allErrors = [
      ...businessErrors,
      ...schedulingErrors,
      ...infraErrors,
      ...complianceErrors,
      ...readinessErrors,
    ];

    if (allErrors.length > 0) {
      return {
        success: false,
        errors: allErrors,
        error: `Please correct the ${allErrors.length} validation issue(s) before submitting.`,
      };
    }

    const referenceCode = generateSurveyReference();

    // Process attached image files
    const imageFiles = formData.getAll('images') as File[];
    const imagekitFileIds: string[] = [];
    const imageSignedUrls: string[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult = await uploadPrivateSiteAsset({
          file: buffer,
          fileName: `${referenceCode}_img_${i + 1}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`,
          folder: '/site-surveys/images',
          referenceCode,
        });

        imagekitFileIds.push(uploadResult.fileId);
        imageSignedUrls.push(uploadResult.signedUrl);
      }
    }

    survey.readiness.uploadedImageIds = imagekitFileIds;

    // Generate completed PDF report buffer
    let pdfBuffer: Buffer | undefined;
    try {
      pdfBuffer = await generateSurveyReportPdfBuffer(survey, referenceCode);
    } catch (pdfErr: unknown) {
      console.warn('[Survey Action Warning] PDF generation failed, continuing email dispatch without PDF:', pdfErr);
    }

    // Persist to Supabase
    await saveSiteSurveyRecord(buildSurveyRecord(survey, referenceCode, imagekitFileIds));

    // Dispatch emails (operations team + customer)
    await sendSiteSurveyNotificationEmail({
      survey,
      referenceCode,
      pdfBuffer,
      imageSignedUrls,
    });

    return {
      success: true,
      referenceCode,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Survey Action Error]', errorMsg);
    return {
      success: false,
      error: 'An unexpected error occurred while processing your survey. Please try again.',
    };
  }
}

/**
 * Handles submission of an offline-filled PDF or scanned document.
 */
export async function submitOfflineSurveyPdf(formData: FormData): Promise<SurveyActionResponse> {
  try {
    const customerName = formData.get('customerName')?.toString()?.trim() || '';
    const siteName = formData.get('siteName')?.toString()?.trim() || '';
    const contactPersonName = formData.get('contactPersonName')?.toString()?.trim() || '';
    const contactPhone = formData.get('contactPhone')?.toString()?.trim() || '';
    const contactEmail = formData.get('contactEmail')?.toString()?.trim() || '';
    const county = formData.get('county')?.toString()?.trim() || '';
    const rawDates = formData.get('preferredDates')?.toString()?.trim() || '';
    const preferredDates = rawDates ? rawDates.split(',').map((d) => d.trim()).filter(Boolean) : [];
    const notes = formData.get('notes')?.toString()?.trim() || '';

    const submission: OfflinePdfSubmission = {
      customerName,
      siteName,
      contactPersonName,
      contactPhone,
      contactEmail,
      county,
      preferredDates,
      notes,
    };

    const errors = validateOfflinePdfSubmission(submission);
    if (errors.length > 0) {
      return { success: false, errors, error: 'Please fill in all required contact fields.' };
    }

    const documentFile = formData.get('document') as File | null;
    if (!documentFile || typeof documentFile.arrayBuffer !== 'function' || documentFile.size === 0) {
      return {
        success: false,
        error: 'Please attach your completed survey document (PDF or scanned image).',
      };
    }

    // Maximum file size: 25MB
    if (documentFile.size > 25 * 1024 * 1024) {
      return { success: false, error: 'File size exceeds maximum allowable limit of 25MB.' };
    }

    const referenceCode = generateSurveyReference();
    const fileBuffer = Buffer.from(await documentFile.arrayBuffer());

    // Upload to ImageKit as private file
    const uploadResult = await uploadPrivateSiteAsset({
      file: fileBuffer,
      fileName: `${referenceCode}_offline_${documentFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`,
      folder: '/site-surveys/offline-docs',
      referenceCode,
    });

    // Save to Supabase
    await saveSiteSurveyRecord(
      buildOfflineSurveyRecord(submission, referenceCode, [uploadResult.fileId])
    );

    // Send email notification with file attached
    await sendOfflinePdfNotificationEmail({
      submission,
      referenceCode,
      fileBuffer,
      fileName: documentFile.name,
      fileUrl: uploadResult.signedUrl,
    });

    return {
      success: true,
      referenceCode,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Offline Survey Action Error]', errorMsg);
    return {
      success: false,
      error: 'An unexpected error occurred while uploading your document. Please try again.',
    };
  }
}
