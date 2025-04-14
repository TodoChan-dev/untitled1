import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateTransactionStatus, getTransactionBySessionId, addToWhitelist } from '@/lib/shop-database';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-03-31.basil',
});

export async function POST(request: NextRequest) {
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    try {
        // Verify the webhook signature
        const event = stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ''
        );

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;

                // Get transaction from database
                const transaction = await getTransactionBySessionId(session.id);

                if (!transaction) {
                    console.error(`Transaction not found for session ID: ${session.id}`);
                    return NextResponse.json({ received: true });
                }

                // Update transaction status
                const paymentIntentId = typeof session.payment_intent === 'string'
                    ? session.payment_intent
                    : session.payment_intent?.id;

                await updateTransactionStatus(session.id, 'completed', paymentIntentId);

                // Add player to whitelist
                await addToWhitelist({
                    playerName: transaction.player_name,
                    ticketType: transaction.ticket_type,
                    startTime: new Date(transaction.start_time),
                    endTime: new Date(transaction.end_time),
                });

                break;
            }

            case 'checkout.session.expired': {
                const session = event.data.object as Stripe.Checkout.Session;

                // Update transaction status to failed
                await updateTransactionStatus(session.id, 'failed');

                break;
            }

            case 'charge.refunded': {
                const charge = event.data.object as Stripe.Charge;

                // If we have payment intent ID, update the related transaction
                if (charge.payment_intent) {
                    // This would require looking up by payment intent ID
                    // For simplicity, we'll just log this case
                    console.log(`Refund processed for payment intent: ${charge.payment_intent}`);
                }

                break;
            }
        }

        // Return a 200 response to acknowledge receipt of the event
        return NextResponse.json({ received: true });
    } catch (err) {
        console.error(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 400 }
        );
    }
}