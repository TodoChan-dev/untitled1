// src/app/api/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getApplicationStats } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const stats = await getApplicationStats();

        return NextResponse.json(stats, { status: 200 });
    } catch (error) {
        console.error('Stats fetching error:', error);

        return NextResponse.json(
            {
                totalApplications: 0,
                acceptedApplications: 0,
                error: 'サーバーエラーが発生しました'
            },
            { status: 500 }
        );
    }
}