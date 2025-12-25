import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const analyticsFile = path.join(process.cwd(), "data", "analytics.json");

export async function GET() {
    try {
        if (!fs.existsSync(analyticsFile)) {
            const initialData = {
                totalViews: 0,
                pageViews: {
                    home: 0,
                    work: 0,
                    resume: 0,
                    contact: 0,
                    certificates: 0
                },
                lastUpdated: new Date().toISOString()
            };
            fs.writeFileSync(analyticsFile, JSON.stringify(initialData, null, 2));
            return NextResponse.json(initialData);
        }

        const data = fs.readFileSync(analyticsFile, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: "Failed to read analytics" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { page } = await request.json();

        let analytics;

        if (!fs.existsSync(analyticsFile)) {
            analytics = {
                totalViews: 0,
                pageViews: {
                    home: 0,
                    work: 0,
                    resume: 0,
                    contact: 0,
                    certificates: 0
                },
                lastUpdated: new Date().toISOString()
            };
        } else {
            const data = fs.readFileSync(analyticsFile, "utf-8");
            analytics = JSON.parse(data);
        }

        analytics.totalViews += 1;
        if (analytics.pageViews[page] !== undefined) {
            analytics.pageViews[page] += 1;
        }
        analytics.lastUpdated = new Date().toISOString();

        fs.writeFileSync(analyticsFile, JSON.stringify(analytics, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to track view" }, { status: 500 });
    }
}
