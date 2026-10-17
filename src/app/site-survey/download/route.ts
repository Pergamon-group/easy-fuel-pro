import { NextResponse } from 'next/server';
import { generateBlankSurveyPdfBuffer } from '@/lib/pdf/pdf-generator';

export async function GET() {
  try {
    const buffer = await generateBlankSurveyPdfBuffer();

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="EasyFuel-Pro-Site-Survey-Checklist.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[PDF Download Error]', errorMsg);
    return new NextResponse('Failed to generate survey checklist PDF.', { status: 500 });
  }
}
