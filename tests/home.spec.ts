import { test, expect } from '@playwright/test';
import { siteConfig } from '../src/config/site';

test.describe('Home Page & Core Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('has correct page title and metadata branding', async ({ page }) => {
    await expect(page).toHaveTitle(new RegExp(siteConfig.name, 'i'));
  });

  test('renders hero section with accessible heading and CTA buttons', async ({ page }) => {
    // Accessible main heading
    const heroHeading = page.getByRole('heading', { level: 1 });
    await expect(heroHeading).toBeVisible();

    // Call to action buttons
    const demoButton = page.locator('main').getByRole('link', { name: /Request a Demo/i }).first();
    await expect(demoButton).toBeVisible();

    const talkToUsLink = page.locator('main').getByRole('link', { name: /Talk to Us/i }).first();
    await expect(talkToUsLink).toBeVisible();
    await expect(talkToUsLink).toHaveAttribute('href', /wa\.me/);
  });

  test('toggles theme between light and dark modes', async ({ page }) => {
    const themeToggleButton = page.getByRole('button', {
      name: /Switch to (dark|light) mode/i,
    }).first();

    await expect(themeToggleButton).toBeVisible();

    const initialLabel = await themeToggleButton.getAttribute('aria-label');
    const expectedToggledLabel =
      initialLabel === 'Switch to dark mode' ? 'Switch to light mode' : 'Switch to dark mode';

    // Click toggle
    await themeToggleButton.click();

    // Verify button label toggles
    await expect(themeToggleButton).toHaveAttribute('aria-label', expectedToggledLabel);

    // Toggle back
    await themeToggleButton.click();
    await expect(themeToggleButton).toHaveAttribute('aria-label', initialLabel || 'Switch to dark mode');
  });

  test('displays key forecourt landing sections and footer', async ({ page }) => {
    // Header
    await expect(page.getByTestId('main-header')).toBeVisible();

    // Interactive Demo / CTA Section (scroll into view for motion animations)
    const ctaSection = page.getByTestId('cta-section');
    await ctaSection.scrollIntoViewIfNeeded();
    await expect(ctaSection).toBeVisible();

    // Footer with company branding
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(siteConfig.parentCompany.name);
  });
});
