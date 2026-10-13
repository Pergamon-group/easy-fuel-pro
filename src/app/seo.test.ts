import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';
import robots from './robots';
import { metadata } from './layout';
import { siteConfig } from '@/config/site';

describe('SEO Metadata Routes (sitemap & robots)', () => {
  it('generates robots.txt pointing to the correct sitemap and domain', () => {
    const robotsConfig = robots();
    expect(robotsConfig.rules).toBeDefined();
    expect(robotsConfig.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });

  it('generates sitemap.xml with easyfuelpro.com root entry, contact, and faq routes', () => {
    const sitemapEntries = sitemap();
    expect(sitemapEntries.length).toBeGreaterThanOrEqual(3);
    const rootEntry = sitemapEntries.find((entry) => entry.url === siteConfig.url);
    expect(rootEntry).toBeDefined();
    expect(rootEntry?.priority).toBe(1.0);

    const contactEntry = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}/contact`);
    expect(contactEntry).toBeDefined();

    const faqEntry = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}/faq`);
    expect(faqEntry).toBeDefined();
    expect(faqEntry?.priority).toBe(0.9);
  });

  it('exports complete SEO and OpenGraph metadata in root layout', () => {
    expect(metadata.metadataBase?.toString()).toBe(`${siteConfig.url}/`);
    expect(metadata.openGraph?.images).toBeDefined();
    expect(metadata.openGraph?.url).toBe(siteConfig.url);
    expect(metadata.twitter).toBeDefined();
    if (metadata.twitter && 'card' in metadata.twitter) {
      expect(metadata.twitter.card).toBe('summary_large_image');
    }
    expect(metadata.robots).toBeDefined();
  });
});
