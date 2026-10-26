import { test, expect } from '@playwright/test';

test.describe('FAQ Knowledge Base & Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/faq');
  });

  test('renders FAQ hero section and question directory', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/Showing \d+ of \d+ questions/i)).toBeVisible();
  });

  test('filters questions when typing in the search bar', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: /Search forecourt FAQs/i });
    await expect(searchInput).toBeVisible();

    // Type query
    await searchInput.fill('PTS-2');
    await expect(page.getByText(/Showing \d+ of \d+ questions/i)).toBeVisible();

    // Clear query button
    const clearBtn = page.getByRole('button', { name: /Clear search/i });
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();
    await expect(searchInput).toHaveValue('');
  });

  test('filters questions by category pill', async ({ page }) => {
    // Exact match avoids collision with question buttons that display the category badge
    const compliancePill = page.getByRole('button', { name: 'Compliance & eTIMS', exact: true });
    await expect(compliancePill).toBeVisible();
    await compliancePill.click();

    await expect(compliancePill).toHaveClass(/bg-primary/);
  });

  test('expands and collapses FAQ accordion items', async ({ page }) => {
    // Scope to main container to target the FAQ accordion rather than header mobile toggle
    const firstAccordionBtn = page.locator('main').locator('button[aria-expanded]').first();
    await firstAccordionBtn.scrollIntoViewIfNeeded();
    await expect(firstAccordionBtn).toBeVisible();

    // Item 0 is initially open by default in FaqDirectory
    await expect(firstAccordionBtn).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    await firstAccordionBtn.click();
    await expect(firstAccordionBtn).toHaveAttribute('aria-expanded', 'false');

    // Click to re-expand
    await firstAccordionBtn.click();
    await expect(firstAccordionBtn).toHaveAttribute('aria-expanded', 'true');
  });
});
