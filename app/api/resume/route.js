import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const isVercel = !!process.env.VERCEL;
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (isVercel && blobToken) {
      // Try to read pointer; else list latest
      try {
        const { blobs } = await list({ prefix: "resume/", token: blobToken });
        if (blobs && blobs.length > 0) {
          const latest = blobs
            .filter(b => b.pathname.endsWith(".pdf"))
            .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
          if (latest?.url) {
            return NextResponse.json({ url: latest.url });
          }
        }
      } catch {}
      // Fallback to pointer JSON if exists (public URL)
      return NextResponse.json({ url: null }, { status: 404 });
    } else {
      // Local dev: return static public path if file exists
      const localPath = path.join(process.cwd(), "public", "Images", "Gokul_Kiran_Resume.pdf");
      if (fs.existsSync(localPath)) {
        return NextResponse.json({ url: "/Images/Gokul_Kiran_Resume.pdf" });
      }
      return NextResponse.json({ url: null }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to get resume" }, { status: 500 });
  }
}
