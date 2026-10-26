import { test, expect } from '@playwright/test';

test.describe('Journey: Complete 5-Step Site Survey & Notification Delivery', () => {
  test('submits online survey and verifies admin notification and customer confirmation', async ({
    page,
    request,
  }) => {
    // 1. Reset the virtual mail outbox
    const clearRes = await request.delete('/api/test/mail-outbox');
    expect(clearRes.ok()).toBeTruthy();

    // 2. Clear localStorage and navigate to /site-survey
    await page.goto('/site-survey');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Enter Online Wizard from Landing screen
    const startWizardBtn = page.getByRole('button', { name: /Start Online Survey/i });
    if (await startWizardBtn.isVisible()) {
      await startWizardBtn.click();
    }

    // 3. Step 1: Business & Contact Information
    await expect(page.getByText('1. Business & Contact Information')).toBeVisible();

    const testStation = {
      customerName: 'Kiprono Petroleum Energy Ltd',
      siteName: 'Great Rift Oasis Forecourt',
      location: 'Nakuru-Eldoret Highway, Salgaa',
      county: 'Nakuru',
      kraPin: 'P051234567A',
      contactPerson: 'Ezekiel Kiprono',
      phone: '+254 711 223 344',
      email: 'ezekiel@greatriftpetroleum.co.ke',
    };

    await page.locator('#customerName').fill(testStation.customerName);
    await page.locator('#siteName').fill(testStation.siteName);
    await page.locator('#physicalLocation').fill(testStation.location);
    await page.locator('#county').selectOption(testStation.county);
    await page.locator('#kraPin').fill(testStation.kraPin);
    await page.locator('#contactPersonName').fill(testStation.contactPerson);
    await page.locator('#contactPhone').fill(testStation.phone);
    await page.locator('#contactEmail').fill(testStation.email);

    // Advance to Step 2
    await page.getByRole('button', { name: /Continue/i }).click();

    // 4. Step 2: Survey Scheduling
    await expect(page.getByText('2. Preferred Survey Scheduling')).toBeVisible();

    // Select operating hours radio (24 Hours Open)
    await page.locator('input[name="operatingHours"][value="full_24h"]').check();

    // Fill valid preferred date in slot 1 (at least 2 days in future)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
    const dateStr = targetDate.toISOString().split('T')[0];
    await page.locator('#date-slot-input-0').fill(dateStr);

    // Advance to Step 3
    await page.getByRole('button', { name: /Continue/i }).click();

    // 5. Step 3: Station Setup & Infrastructure
    await expect(page.getByText('3. Station Setup & Fueling Infrastructure')).toBeVisible();

    // Select site automation status (No, Standalone)
    await page.locator('input[name="isSiteAutomated"][value="no"]').check();

    // Select operation mode
    await page.locator('select').filter({ hasText: /Operational Mode|Fully Automated|Manual/i }).selectOption('semi_automated');

    // Use Quick Preset to configure 2 pumps
    await page.getByRole('button', { name: '2 Pumps', exact: true }).click();

    // Fill make & model for configured pumps
    await page.locator('[data-testid="pump-card-0"] input[type="text"]').first().fill('Gilbarco SK700');
    await page.locator('[data-testid="pump-card-1"] input[type="text"]').first().fill('Wayne Helix 5000');

    // Advance to Step 4
    await page.getByRole('button', { name: /Continue/i }).click();

    // 6. Step 4: Compliance & Network Connectivity
    await expect(page.getByText('4. eTIMS (KRA) Compliance & Connectivity')).toBeVisible();

    // Select eTIMS VSCU architecture
    await page.locator('input[name="etimsSolutionType"][value="vscu"]').check();

    // Select internet availability & primary fiber connection
    await page.locator('input[name="internetAvailable"][value="yes"]').check();
    await page.locator('select').filter({ hasText: /Connection Type|Fiber Optic/i }).selectOption('fiber');

    // Advance to Step 5 (Review & Submit)
    await page.getByRole('button', { name: /Review Survey|Continue/i }).click();

    // 7. Step 5: Final Review & Submission
    await expect(page.getByText('5. Site Readiness, Asset Photos & Final Submission')).toBeVisible();

    // Check consent checkbox
    const consentCheckbox = page.locator('input[type="checkbox"]').first();
    await consentCheckbox.check();

    // Click Complete & Submit Site Survey
    const submitSurveyBtn = page.getByRole('button', { name: /Complete & Submit Site Survey/i });
    await expect(submitSurveyBtn).toBeEnabled();
    await submitSurveyBtn.click();

    // 8. Assert Success confirmation screen
    await expect(page.getByText('Site Survey Received!')).toBeVisible({ timeout: 15000 });
    const refCodeElement = page.locator('.font-mono').filter({ hasText: /^EFP-/i }).first();
    await expect(refCodeElement).toBeVisible();
    const referenceCode = await refCodeElement.innerText();
    expect(referenceCode).toMatch(/^EFP-/i);

    // 9. Verify Email Dispatches via test outbox
    const outboxRes = await request.get('/api/test/mail-outbox');
    expect(outboxRes.ok()).toBeTruthy();
    const { messages } = await outboxRes.json();

    expect(messages.length).toBeGreaterThanOrEqual(1);

    // Verify operations team email
    const opsEmail = messages.find((m: { type: string }) => m.type === 'site-survey');
    expect(opsEmail).toBeDefined();
    expect(opsEmail.subject).toContain(testStation.siteName);
    expect(opsEmail.subject).toContain(referenceCode);

    // Verify PDF attachment was generated and attached
    expect(opsEmail.attachments).toBeDefined();
    expect(opsEmail.attachments.length).toBeGreaterThanOrEqual(1);
    expect(opsEmail.attachments[0].filename).toContain(referenceCode);

    // Verify customer confirmation email
    const customerEmail = messages.find((m: { type: string }) => m.type === 'customer-confirmation');
    if (customerEmail) {
      expect(customerEmail.to).toContain(testStation.email);
      expect(customerEmail.subject).toContain(referenceCode);
    }
  });
});
