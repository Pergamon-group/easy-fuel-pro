import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getImageKitConfig,
  getImageKitClient,
  uploadPrivateSiteAsset,
  getSignedAssetUrl,
} from './imagekit';

describe('ImageKit Private Asset Service (TDD)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('returns null config when keys are missing', () => {
    delete process.env.IMAGEKIT_PUBLIC_KEY;
    delete process.env.IMAGEKIT_PRIVATE_KEY;
    delete process.env.IMAGEKIT_URL_ENDPOINT;
    expect(getImageKitConfig()).toBeNull();
    expect(getImageKitClient()).toBeNull();
  });

  it('provides safe mock result when keys are not configured', async () => {
    delete process.env.IMAGEKIT_PUBLIC_KEY;
    const result = await uploadPrivateSiteAsset({
      file: Buffer.from('mock image data'),
      fileName: 'pump1.jpg',
      referenceCode: 'EFP-SRV-2026-TEST',
    });

    expect(result.fileId).toContain('mock_ik_');
    expect(result.name).toBe('pump1.jpg');
    expect(result.signedUrl).toContain('mock_signed');
  });

  it('generates signed url via mock fallback when unconfigured', () => {
    delete process.env.IMAGEKIT_PUBLIC_KEY;
    const url = getSignedAssetUrl('/site-surveys/pump1.jpg');
    expect(url).toContain('token=mock_signed');
  });
});
