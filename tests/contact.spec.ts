import { test, expect } from '@playwright/test';
import { siteConfig } from '../src/config/site';

test.describe('Contact Page & Inquiries', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('renders contact hero and communication channels', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Direct channel links using siteConfig source of truth scoped to main
    const main = page.locator('main');
    const phoneLink = main.locator(`a[href="${siteConfig.phoneHref}"]`).first();
    await expect(phoneLink).toBeVisible();

    const emailLink = main.locator(`a[href="mailto:${siteConfig.email}"]`).first();
    await expect(emailLink).toBeVisible();

    const websiteLink = main.locator(`a[href="${siteConfig.parentCompany.url}"]`).first();
    await expect(websiteLink).toBeVisible();
  });

  test('displays regional operations hubs', async ({ page }) => {
    const main = page.locator('main');
    const hubsHeading = main.getByRole('heading', { name: /Showroom & Regional Operations Hubs/i });
    await hubsHeading.scrollIntoViewIfNeeded();
    await expect(hubsHeading).toBeVisible();

    await expect(main.getByText('Nairobi HQ & Showroom').first()).toBeVisible();
    await expect(main.getByText('Kenya Branches').first()).toBeVisible();
  });

  test('renders embedded inquiry form and site survey gateway', async ({ page }) => {
    const main = page.locator('main');

    // Gateway banner inside main content
    const surveyLink = main.locator('a[href="/site-survey"]').first();
    await surveyLink.scrollIntoViewIfNeeded();
    await expect(surveyLink).toBeVisible();

    // General inquiry form inside main content
    const bookingForm = main.locator('form').first();
    await bookingForm.scrollIntoViewIfNeeded();
    await expect(bookingForm).toBeVisible();
  });
});
