import { test, expect } from '@playwright/test';

test.describe('Header & Navigation Flows', () => {
  test('navigates through desktop header links', async ({ page, isMobile }) => {
    // Only run on desktop viewport
    if (isMobile) {
      test.skip();
    }

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const nav = page.getByRole('navigation', { name: 'Desktop Navigation' });
    await expect(nav).toBeVisible();

    // Navigate to Site Survey
    await Promise.all([
      page.waitForURL(/\/site-survey/),
      nav.getByRole('link', { name: 'Site Survey' }).click(),
    ]);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Navigate to FAQ
    const faqNav = page.getByRole('navigation', { name: 'Desktop Navigation' });
    await Promise.all([
      page.waitForURL(/\/faq/),
      faqNav.getByRole('link', { name: 'FAQ' }).click(),
    ]);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Navigate to Contact
    const contactNav = page.getByRole('navigation', { name: 'Desktop Navigation' });
    await Promise.all([
      page.waitForURL(/\/contact/),
      contactNav.getByRole('link', { name: 'Contact' }).click(),
    ]);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Navigate back to Home via Logo
    const logoLink = page.getByTestId('main-header').getByRole('link', { name: /EasyFuel Pro Logo/i });
    await Promise.all([
      page.waitForURL(/\/$/),
      logoLink.click(),
    ]);
  });

  test('opens and navigates via mobile drawer menu', async ({ page }) => {
    // Force mobile viewport to ensure hamburger is visible
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('#mobile-menu-toggle');
    await expect(menuToggle).toBeVisible();

    // Open mobile menu
    await menuToggle.click();

    const mobileDrawer = page.locator('#mobile-navigation-drawer');
    await expect(mobileDrawer).toBeVisible();

    // Click a navigation link inside mobile menu
    const siteSurveyLink = mobileDrawer.getByRole('link', { name: 'Site Survey' });
    await expect(siteSurveyLink).toBeVisible();
    await siteSurveyLink.click();

    await expect(page).toHaveURL(/\/site-survey/);
    await expect(mobileDrawer).not.toBeVisible();
  });
});
