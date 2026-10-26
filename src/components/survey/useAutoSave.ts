'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { SiteSurveyData } from '@/data/survey-schema';

const STORAGE_KEY = 'easyfuel_survey_draft_v1';
const AUTOSAVE_DELAY_MS = 800;

export interface UseAutoSaveReturn {
  hasSavedDraft: boolean;
  draftData: SiteSurveyData | null;
  loadDraft: () => SiteSurveyData | null;
  saveDraft: (data: SiteSurveyData) => void;
  clearDraft: () => void;
  dismissDraftPrompt: () => void;
}

function getStoredDraft(): SiteSurveyData | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as SiteSurveyData;
    if (
      parsed.businessInfo?.customerName ||
      parsed.businessInfo?.siteName ||
      parsed.businessInfo?.kraPin ||
      parsed.infrastructure?.totalPumpCount > 0
    ) {
      return parsed;
    }
  } catch {
    // Storage access disabled or corrupt JSON
  }
  return null;
}

export function useAutoSave(currentData: SiteSurveyData): UseAutoSaveReturn {
  const [draftData, setDraftData] = useState<SiteSurveyData | null>(getStoredDraft);
  const [hasSavedDraft, setHasSavedDraft] = useState<boolean>(() => getStoredDraft() !== null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced auto-save when currentData changes
  useEffect(() => {
    // Only autosave if user has entered at least some content
    const hasAnyContent = Boolean(
      currentData.businessInfo.customerName ||
        currentData.businessInfo.siteName ||
        currentData.businessInfo.kraPin ||
        currentData.infrastructure.totalPumpCount > 0
    );

    if (!hasAnyContent) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
      } catch {
        // Handle storage quota exceeded silently
      }
    }, AUTOSAVE_DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentData]);

  const loadDraft = useCallback((): SiteSurveyData | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SiteSurveyData;
        setHasSavedDraft(false);
        return parsed;
      }
    } catch {
      // Handle error
    }
    return null;
  }, []);

  const saveDraft = useCallback((data: SiteSurveyData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Quota exceeded
    }
  }, []);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasSavedDraft(false);
      setDraftData(null);
    } catch {
      // Handle error
    }
  }, []);

  const dismissDraftPrompt = useCallback(() => {
    setHasSavedDraft(false);
  }, []);

  return {
    hasSavedDraft,
    draftData,
    loadDraft,
    saveDraft,
    clearDraft,
    dismissDraftPrompt,
  };
}
