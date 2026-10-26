import { test, expect } from '@playwright/test';

test.describe('Site Survey Offline PDF Download Endpoint', () => {
  test('returns a valid PDF file with proper headers', async ({ request }) => {
    const response = await request.get('/site-survey/download');

    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/pdf');

    const contentDisposition = response.headers()['content-disposition'];
    expect(contentDisposition).toContain('EasyFuel-Pro-Site-Survey-Checklist.pdf');

    const body = await response.body();
    expect(body.length).toBeGreaterThan(1000);

    // Verify PDF magic bytes (%PDF)
    const pdfMagicBytes = body.subarray(0, 4).toString('utf-8');
    expect(pdfMagicBytes).toBe('%PDF');
  });
});
