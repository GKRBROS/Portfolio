import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { writeFile } from "fs/promises";
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

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name || "image.png";
        const extension = path.extname(originalName) || ".png";
        const filename = `project_${timestamp}${extension}`;

        const isVercel = !!process.env.VERCEL;
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        if (isVercel && blobToken) {
            // Upload to Vercel Blob under project-images/ prefix
            const { url } = await put(`project-images/${filename}`, buffer, {
                access: "public",
                contentType: file.type || "image/png",
                token: blobToken,
            });

            return NextResponse.json({
                success: true,
                message: "Image uploaded to Blob successfully",
                path: url,
            });
        } else {
            // Local dev: write to public folder
            const uploadDir = path.join(process.cwd(), "public", "Images");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, filename);
            await writeFile(filePath, buffer);

            return NextResponse.json({ 
                success: true, 
                message: "Image uploaded successfully",
                path: `/Images/${filename}`
            });
        }
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
