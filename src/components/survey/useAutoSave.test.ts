import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAutoSave } from './useAutoSave';
import { createDefaultSurveyData } from '@/data/survey-schema';

describe('useAutoSave Hook (TDD)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('detects existing draft in localStorage on mount', () => {
    const draft = createDefaultSurveyData();
    draft.businessInfo.customerName = 'Shell Nairobi';
    localStorage.setItem('easyfuel_survey_draft_v1', JSON.stringify(draft));

    const { result } = renderHook(() => useAutoSave(createDefaultSurveyData()));
    expect(result.current.hasSavedDraft).toBe(true);
    expect(result.current.draftData?.businessInfo.customerName).toBe('Shell Nairobi');
  });

  it('debounces saving data to localStorage when content changes', () => {
    const survey = createDefaultSurveyData();
    survey.businessInfo.customerName = 'Rubis Karen';

    renderHook(({ data }) => useAutoSave(data), {
      initialProps: { data: survey },
    });

    // Before timer advances, not yet written
    expect(localStorage.getItem('easyfuel_survey_draft_v1')).toBeNull();

    // Advance 850ms
    act(() => {
      vi.advanceTimersByTime(850);
    });

    const stored = localStorage.getItem('easyfuel_survey_draft_v1');
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!).businessInfo.customerName).toBe('Rubis Karen');
  });

  it('clears draft from localStorage when clearDraft is invoked', () => {
    localStorage.setItem('easyfuel_survey_draft_v1', JSON.stringify({ test: 1 }));

    const { result } = renderHook(() => useAutoSave(createDefaultSurveyData()));
    act(() => {
      result.current.clearDraft();
    });

    expect(localStorage.getItem('easyfuel_survey_draft_v1')).toBeNull();
    expect(result.current.hasSavedDraft).toBe(false);
  });
});
