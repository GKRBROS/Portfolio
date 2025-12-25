import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { put } from "@vercel/blob";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // In Vercel production, use Blob storage; locally, write to public/Images
        const isVercel = !!process.env.VERCEL;
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        if (isVercel && blobToken) {
            // Upload to Vercel Blob under a resume/ prefix, public access
            const filename = `resume_${Date.now()}.pdf`;
            const { url } = await put(`resume/${filename}`, buffer, {
                access: "public",
                contentType: "application/pdf",
                token: blobToken,
            });

            // Optionally write a pointer file to latest URL (public JSON)
            await put("resume/latest.json", JSON.stringify({ url }), {
                access: "public",
                contentType: "application/json",
                token: blobToken,
            });

            return NextResponse.json({
                success: true,
                message: "Resume uploaded to Blob successfully",
                path: url,
            });
        } else {
            // Local dev fallback: write to public folder
            const uploadDir = path.join(process.cwd(), "public", "Images");
            if (!fs.existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, "Gokul_Kiran_Resume.pdf");
            await writeFile(filePath, buffer);

            return NextResponse.json({ 
                success: true, 
                message: "Resume uploaded successfully",
                path: "/Images/Gokul_Kiran_Resume.pdf"
            });
        }
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 });
    }
}
