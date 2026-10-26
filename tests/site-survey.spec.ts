import { test, expect } from '@playwright/test';

test.describe('Site Survey Landing & Wizard Progression', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure fresh wizard state
    await page.goto('/site-survey');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
  });

  test('displays landing options and printable PDF download link', async ({ page }) => {
    await expect(page.getByTestId('survey-landing')).toBeVisible();

    // Verify direct PDF download link exists on the landing view
    const downloadLink = page.locator('a[href*="/site-survey/download"]').first();
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute('href', /\/site-survey\/download/);

    // Verify online survey initiation button
    const startWizardBtn = page.getByRole('button', { name: /Start Online Survey/i });
    await expect(startWizardBtn).toBeVisible();
  });

  test('transitions into wizard and renders step 1 business form', async ({ page }) => {
    // Click Start Online Survey to enter wizard
    const startWizardBtn = page.getByRole('button', { name: /Start Online Survey/i });
    await expect(startWizardBtn).toBeVisible();
    await startWizardBtn.click();

    await expect(page.locator('#customerName')).toBeVisible();
    await expect(page.getByText('1. Business & Contact Information')).toBeVisible();

    // Verify key step 1 input fields are present
    await expect(page.locator('#customerName')).toBeVisible();
    await expect(page.locator('#siteName')).toBeVisible();
    await expect(page.locator('#physicalLocation')).toBeVisible();
    await expect(page.locator('#county')).toBeVisible();
    await expect(page.locator('#kraPin')).toBeVisible();
    await expect(page.locator('#contactPersonName')).toBeVisible();
    await expect(page.locator('#contactPhone')).toBeVisible();
    await expect(page.locator('#contactEmail')).toBeVisible();
  });

  test('validates required fields before allowing progression to step 2', async ({ page }) => {
    // Enter wizard
    const startWizardBtn = page.getByRole('button', { name: /Start Online Survey/i });
    await expect(startWizardBtn).toBeVisible();
    await startWizardBtn.click();
    await expect(page.locator('#customerName')).toBeVisible();

    // Click Continue without entering required details
    const continueBtn = page.getByRole('button', { name: /Continue/i });
    await continueBtn.click();

    // Check that validation messages are displayed
    await expect(page.getByText(/Customer name is required/i)).toBeVisible();
    await expect(page.getByText(/Site \/ station name is required/i)).toBeVisible();
  });

  test('fills step 1 with valid data and advances to step 2', async ({ page }) => {
    // Enter wizard
    const startWizardBtn = page.getByRole('button', { name: /Start Online Survey/i });
    await expect(startWizardBtn).toBeVisible();
    await startWizardBtn.click();
    await expect(page.locator('#customerName')).toBeVisible();

    // Fill required business info
    await page.locator('#customerName').fill('Apex Petroleum Ltd');
    await page.locator('#siteName').fill('Apex Service Station Westlands');
    await page.locator('#physicalLocation').fill('Waiyaki Way, Opposite ABC Place');
    await page.locator('#county').selectOption('Nairobi');
    await page.locator('#kraPin').fill('P051234567A');
    await page.locator('#contactPersonName').fill('James Mwangi');
    await page.locator('#contactPhone').fill('+254 712 345 678');
    await page.locator('#contactEmail').fill('operations@apexpetroleum.com');

    // Click Continue to step 2
    const continueBtn = page.getByRole('button', { name: /Continue/i });
    await continueBtn.click();

    // Verify Step 2 is reached
    await expect(page.getByText('2. Preferred Survey Scheduling')).toBeVisible();
  });
});
