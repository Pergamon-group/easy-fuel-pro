import { test, expect } from '@playwright/test';

test.describe('Journey: Demo & Consultation Booking Flow', () => {
  test('submits an inquiry form and verifies email delivery to sales/admin team', async ({
    page,
    request,
  }) => {
    // 1. Reset the virtual mail outbox
    const clearRes = await request.delete('/api/test/mail-outbox');
    expect(clearRes.ok()).toBeTruthy();

    // 2. Navigate to Contact page where booking form is embedded
    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');

    // 3. Locate the inquiry form fields by name / label
    const nameInput = page.locator('input[name="name"]');
    const businessInput = page.locator('input[name="business"]');
    const phoneInput = page.locator('input[name="phone"]');
    const emailInput = page.locator('input[name="email"]');
    const detailsInput = page.locator('textarea[name="details"]');
    const submitBtn = page.locator('button[type="submit"]').filter({ hasText: /Send Inquiry|Submit|Book/i });

    // Ensure inputs are visible
    await expect(nameInput).toBeVisible();
    await expect(businessInput).toBeVisible();
    await expect(phoneInput).toBeVisible();

    // 4. Fill in customer details
    const testLead = {
      name: 'Ezekiel Kiprono',
      business: 'Great Rift Fuel Station',
      phone: '+254 711 998 877',
      email: 'kiprono@greatriftpetroleum.co.ke',
      details: 'Looking to upgrade 6 Gilbarco dispensers with PTS-2 and eTIMS integration.',
    };

    await nameInput.fill(testLead.name);
    await businessInput.fill(testLead.business);
    await phoneInput.fill(testLead.phone);
    await emailInput.fill(testLead.email);
    await detailsInput.fill(testLead.details);

    // 5. Submit form
    await submitBtn.click();

    // 6. Verify UI success feedback
    await expect(page.getByRole('heading', { name: /Inquiry Received/i })).toBeVisible({
      timeout: 10000,
    });

    // 7. Verify email dispatched to sales/admin team via test outbox
    const outboxRes = await request.get('/api/test/mail-outbox');
    expect(outboxRes.ok()).toBeTruthy();
    const { messages } = await outboxRes.json();

    expect(messages.length).toBeGreaterThanOrEqual(1);

    const bookingEmail = messages.find(
      (m: { type: string; subject: string }) =>
        m.type === 'booking' && m.subject.includes(testLead.business)
    );
    expect(bookingEmail).toBeDefined();
    expect(bookingEmail.html).toContain(testLead.name);
    expect(bookingEmail.html).toContain(testLead.phone);
  });
});
