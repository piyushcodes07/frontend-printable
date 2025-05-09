import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const backendResponse = await fetch(
    "http://localhost:8080/api/v1/convert/file/pdf",
    {
      method: "POST",
      body: formData,
    },
  );

  const pdfBlob = await backendResponse.blob();

  return new NextResponse(pdfBlob, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="converted.pdf"',
    },
  });
}
