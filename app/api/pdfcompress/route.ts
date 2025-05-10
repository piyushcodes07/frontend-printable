import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as Blob;

  const apiKey = process.env.Pdftoword_API_KEY;

  const cloudconvertResponse = await fetch('https://api.cloudconvert.com/v2/convert', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputformat: 'pdf',
      outputformat: 'pdf',
      engine: 'poppler',
      input: 'upload',
      file,
      options: {
        quality: 50,
      },
    }),
  });

  const result = await cloudconvertResponse.json();
  return NextResponse.json(result);
}
