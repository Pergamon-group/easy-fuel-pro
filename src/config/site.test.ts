import { describe, it, expect } from 'vitest';
import { siteConfig } from './site';

describe('Site Config SEO & Branding', () => {
  it('has primary domain set to https://easyfuelpro.com', () => {
    expect(siteConfig.url).toBe('https://easyfuelpro.com');
    expect(siteConfig.website).toBe('easyfuelpro.com');
  });

  it('has Pergamon Group as parent company with authority URL and logo', () => {
    expect(siteConfig.parentCompany.name).toBe('Pergamon Group');
    expect(siteConfig.parentCompany.url).toBe('https://pergamongroup.com');
    expect(siteConfig.parentCompany.logo).toBe('/res/pergamon-group-logo.png');
  });

  it('has graphics configuration for both landscape and square variants', () => {
    expect(siteConfig.ogImage).toBe('/res/EasyFuel Pro logo.jpg');
    expect(siteConfig.ogImageSquare).toBe('/res/Logo 1.png');
    expect(siteConfig.logos.landscape).toBe('/res/EasyFuel Pro logo.jpg');
    expect(siteConfig.logos.landscapeTransparent).toBe('/res/EasyFuel Pro logo_transparent.png');
    expect(siteConfig.logos.square).toBe('/res/Logo 1.png');
    expect(siteConfig.logos.squareTransparent).toBe('/res/Logo 1_transparent.png');
  });

  it('contains comprehensive SEO keywords for forecourt and eTIMS', () => {
    expect(siteConfig.keywords).toBeInstanceOf(Array);
    expect(siteConfig.keywords.length).toBeGreaterThan(5);
    expect(siteConfig.keywords).toContain('EasyFuel Pro');
    expect(siteConfig.keywords).toContain('Pergamon Group');
  });
});
