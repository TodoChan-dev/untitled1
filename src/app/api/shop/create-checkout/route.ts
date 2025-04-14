import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, TICKET_PRICES } from '@/lib/stripe';
import { calculateTicketTimes } from '@/lib/time-utils';
import { createTransaction, hasActiveTicket, initDatabase } from '@/lib/shop-database';
import { isValidMinecraftUsername } from '@/lib/minecraft';

// Initialize database tables on server start
initDatabase().catch(console.error);

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();
        const { playerName, email, ticketType } = body;

        // Validate player name
        if (!playerName || !isValidMinecraftUsername(playerName)) {
            return NextResponse.json(
                { success: false, message: '有効なMinecraftプレイヤー名を入力してください' },
                { status: 400 }
            );
        }
        // Validate email
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return NextResponse.json(
                { success: false, message: '有効なメールアドレスを入力してください' },
                { status: 400 }
            );
        }

        // Validate ticket type
        if (!ticketType || !['regular', 'gold'].includes(ticketType)) {
            return NextResponse.json(
                { success: false, message: '無効なチケットタイプです' },
                { status: 400 }
            );
        }

        // Check if player already has an active ticket for today
        const hasTicket = await hasActiveTicket(playerName);
        if (hasTicket) {
            return NextResponse.json(
                { success: false, message: 'このプレイヤーは既に本日分のチケットを購入しています' },
                { status: 400 }
            );
        }

        // Calculate ticket start and end times
        const { startTime, endTime } = calculateTicketTimes();

        // Create Stripe checkout session
        const session = await createCheckoutSession({
            playerName,
            email,
            ticketType,
            startTime,
            endTime,
        });

        // Save transaction to database

        await createTransaction({
            playerName,
            email,
            ticketType,
            amount: TICKET_PRICES[ticketType as 'regular' | 'gold'],
            stripeSessionId: session.id,
            startTime,
            endTime,
        });

        // Return success response with checkout URL
        return NextResponse.json({
            success: true,
            url: session.url,
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);

        return NextResponse.json(
            { success: false, message: '決済セッションの作成中にエラーが発生しました' },
            { status: 500 }
        );
    }
}