import { NextRequest, NextResponse } from 'next/server';
import { getCheckoutSession } from '@/lib/stripe';
import { getTransactionBySessionId, updateTransactionStatus, addToWhitelist } from '@/lib/shop-database';

export async function GET(request: NextRequest) {
    try {
        // Get session ID from URL params
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('session_id');

        if (!sessionId) {
            return NextResponse.json(
                { success: false, message: 'セッションIDが必要です' },
                { status: 400 }
            );
        }

        // Retrieve session from Stripe
        const session = await getCheckoutSession(sessionId);

        // Check payment status
        if (session.payment_status !== 'paid') {
            return NextResponse.json(
                { success: false, message: '支払いが完了していません' },
                { status: 400 }
            );
        }

        // Get transaction details from database
        const transaction = await getTransactionBySessionId(sessionId);

        if (!transaction) {
            return NextResponse.json(
                { success: false, message: '取引情報が見つかりません' },
                { status: 404 }
            );
        }

        // Update transaction status if not already completed
        if (transaction.status !== 'completed') {
            // Get payment intent ID from session
            const paymentIntentId = typeof session.payment_intent === 'string'
                ? session.payment_intent
                : session.payment_intent?.id;

            // Update transaction status
            await updateTransactionStatus(sessionId, 'completed', paymentIntentId);

            // Add player to whitelist
            await addToWhitelist({
                playerName: transaction.player_name,
                ticketType: transaction.ticket_type,
                startTime: new Date(transaction.start_time),
                endTime: new Date(transaction.end_time),
            });
        }

        // Return transaction details to client
        return NextResponse.json({
            success: true,
            playerName: transaction.player_name,
            ticketType: transaction.ticket_type,
            startTime: transaction.start_time,
            endTime: transaction.end_time,
        });
    } catch (error) {
        console.error('Error verifying payment:', error);

        return NextResponse.json(
            { success: false, message: '支払いの検証中にエラーが発生しました' },
            { status: 500 }
        );
    }
}