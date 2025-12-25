import { NextResponse } from "next/server";

let analyticsCache = {
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

const defaultAnalytics = {
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

export async function GET() {
    try {
        // Try to use KV if available, otherwise return cache
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                const analytics = await kv.get("portfolio:analytics");
                if (analytics) {
                    return NextResponse.json(analytics);
                }
            } catch {}
        }
        // Fallback to cache
        return NextResponse.json(analyticsCache);
    } catch (error) {
        console.error("Analytics GET error:", error);
        return NextResponse.json(analyticsCache);
    }
}

export async function POST(request) {
    try {
        const { page } = await request.json();

        // Update cache
        analyticsCache.totalViews += 1;
        if (analyticsCache.pageViews[page] !== undefined) {
            analyticsCache.pageViews[page] += 1;
        }
        analyticsCache.lastUpdated = new Date().toISOString();

        // Try to sync to KV if available
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                await kv.set("portfolio:analytics", analyticsCache);
            } catch {}
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics POST error:", error);
        return NextResponse.json({ success: true }); // Still count the view
    }
}
