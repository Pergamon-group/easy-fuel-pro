import fs from 'fs';
import path from 'path';
import { renderToBuffer } from '@react-pdf/renderer';
import { SiteSurveyReportPdf } from './SiteSurveyReportPdf';
import { SiteSurveyBlankPdf } from './SiteSurveyBlankPdf';
import type { SiteSurveyData } from '@/data/survey-schema';

/**
 * Reads the official EasyFuel Pro transparent logo as a base64 Data URI for robust embedding into PDF documents.
 */
function getLogoBase64(): string | undefined {
  try {
    const logoPath = path.join(process.cwd(), 'public/res/EasyFuel_Pro logo_transparent_475.png');
    if (fs.existsSync(logoPath)) {
      const buffer = fs.readFileSync(logoPath);
      return `data:image/png;base64,${buffer.toString('base64')}`;
    }
  } catch (err: unknown) {
    console.warn('[PDF Generator] Could not read logo file:', err);
  }
  return undefined;
}

/**
 * Generates an official, filled PDF report buffer from a customer's site survey submission.
 */
export async function generateSurveyReportPdfBuffer(
  survey: SiteSurveyData,
  referenceCode: string
): Promise<Buffer> {
  const logoBase64 = getLogoBase64();
  return await renderToBuffer(SiteSurveyReportPdf({ survey, referenceCode, logoBase64 }));
}

/**
 * Generates a clean, blank checklist PDF buffer for offline printing and manual completion.
 */
export async function generateBlankSurveyPdfBuffer(): Promise<Buffer> {
  const logoBase64 = getLogoBase64();
  return await renderToBuffer(SiteSurveyBlankPdf({ logoBase64 }));
}
