import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file: File | null = formData.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const apiKey = process.env.SWAGGER_API_KEY;

    if (!apiKey) {
      throw new Error('Missing API key. Please set SWAGGER_API_KEY in your .env.local');
    }

    const apiForm = new FormData();
    apiForm.append('file', new Blob([buffer]), file.name);

    const response = await fetch('https://your-api-domain.com/api/v1/convert/pdf/word', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey, // Only used if defined
      } as HeadersInit, // <-- cast to fix TypeScript
      body: apiForm,
    });

    const result = await response.json();

    if (!response.ok || !result.url) {
      throw new Error(result.message || 'Conversion failed');
    }

    return NextResponse.json({ url: result.url });
  } catch (err: any) {
    console.error('Conversion error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
