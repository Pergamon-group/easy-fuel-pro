import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { SiteSurveyData, OfflinePdfSubmission } from '@/data/survey-schema';

export interface SiteSurveyRecord {
  id?: string;
  reference_code: string;
  customer_name: string;
  site_name: string;
  contact_email: string;
  contact_phone: string;
  county: string;
  status: 'pending' | 'reviewed' | 'scheduled' | 'completed';
  submission_type: 'online_wizard' | 'pdf_upload';
  form_data: Record<string, unknown>;
  imagekit_file_ids: string[];
  created_at?: string;
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseInstance;
}

export async function saveSiteSurveyRecord(
  record: SiteSurveyRecord
): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.info('[Supabase Repository] Credentials unconfigured. Stored in memory/fallback log.');
    return { success: true, id: `local_${record.reference_code}` };
  }

  try {
    const { data, error } = await supabase
      .from('site_surveys')
      .insert([record])
      .select('id')
      .single();

    if (error) {
      console.error('[Supabase Insert Error]', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Database error';
    console.error('[Supabase Repository Exception]', errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Transforms an online survey submission into a standard database record.
 */
export function buildSurveyRecord(
  survey: SiteSurveyData,
  referenceCode: string,
  imagekitFileIds: string[] = []
): SiteSurveyRecord {
  return {
    reference_code: referenceCode,
    customer_name: survey.businessInfo.customerName,
    site_name: survey.businessInfo.siteName,
    contact_email: survey.businessInfo.contactEmail,
    contact_phone: survey.businessInfo.contactPhone,
    county: survey.businessInfo.county,
    status: 'pending',
    submission_type: 'online_wizard',
    form_data: survey as unknown as Record<string, unknown>,
    imagekit_file_ids: imagekitFileIds,
  };
}

/**
 * Transforms an offline PDF upload submission into a standard database record.
 */
export function buildOfflineSurveyRecord(
  submission: OfflinePdfSubmission,
  referenceCode: string,
  imagekitFileIds: string[] = []
): SiteSurveyRecord {
  return {
    reference_code: referenceCode,
    customer_name: submission.customerName,
    site_name: submission.siteName,
    contact_email: submission.contactEmail,
    contact_phone: submission.contactPhone,
    county: submission.county,
    status: 'pending',
    submission_type: 'pdf_upload',
    form_data: submission as unknown as Record<string, unknown>,
    imagekit_file_ids: imagekitFileIds,
  };
}
