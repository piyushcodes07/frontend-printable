import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const backendResponse = await fetch("http://localhost:8080/api/v1/security/remove-password", {
        method: "POST",
        body: formData,
    });

    const mediaBlob = await backendResponse.blob();
    const contentType = backendResponse.headers.get("Content-Type") || "application/octet-stream";

    // Try to extract filename from the Content-Disposition header
    const contentDisposition = backendResponse.headers.get("Content-Disposition");
    let filename = "file";

    if (contentDisposition) {
        const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i);
        if (match && match[1]) {
            filename = decodeURIComponent(match[1]);
        }
    } else {
        // Optional: guess extension from content-type if filename is missing
        const extension = contentType.split("/")[1];
        filename = `file.${extension}`;
    }

    return new NextResponse(mediaBlob, {
        status: 200,
        headers: {
            "Content-Type": contentType,
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    });
}