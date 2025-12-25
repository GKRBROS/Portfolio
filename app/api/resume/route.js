import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const isVercel = !!process.env.VERCEL;
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (isVercel && blobToken) {
      try {
        // Try to list from Blob if token available
        const { list } = await import("@vercel/blob");
        const { blobs } = await list({ prefix: "resume/", token: blobToken });
        if (blobs && blobs.length > 0) {
          const latest = blobs
            .filter(b => b.pathname.endsWith(".pdf"))
            .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
          if (latest?.url) {
            return NextResponse.json({ url: latest.url });
          }
        }
      } catch (blobError) {
        console.error("Blob list error (non-critical):", blobError);
      }
    }

    // Fallback: try local file
    const localPath = path.join(process.cwd(), "public", "Images", "Gokul_Kiran_Resume.pdf");
    if (fs.existsSync(localPath)) {
      return NextResponse.json({ url: "/Images/Gokul_Kiran_Resume.pdf" });
    }

    // No resume found
    return NextResponse.json({ url: null }, { status: 404 });
  } catch (error) {
    console.error("Resume endpoint error:", error);
    return NextResponse.json({ url: null }, { status: 500 });
  }
}
