/**
 * Stripe payment utilities
 */
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-03-31.basil', // Use the latest Stripe API version
});

// Define ticket prices (in JPY)
export const TICKET_PRICES = {
    regular: 330, // 330 yen
    gold: 1000, // 1000 yen
};

// Ticket descriptions for display in Stripe checkout
const TICKET_DESCRIPTIONS = {
    regular: 'ステラフィルワールド 一般チケット（1日）',
    gold: 'ステラフィルワールド ゴールドチケット（1日）',
};

/**
 * Creates a Stripe checkout session for ticket purchase
 */
export async function createCheckoutSession(params: {
    playerName: string;
    ticketType: 'regular' | 'gold';
    startTime: Date;
    endTime: Date;
}): Promise<Stripe.Checkout.Session> {
    const { playerName, ticketType, startTime, endTime } = params;
    const price = TICKET_PRICES[ticketType];
    const description = TICKET_DESCRIPTIONS[ticketType];

    // Format dates for display
    const formattedStartTime = startTime.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedEndTime = endTime.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'jpy',
                    product_data: {
                        name: description,
                        description: `プレイヤー: ${playerName} | 有効期間: ${formattedStartTime} から ${formattedEndTime}`,
                    },
                    unit_amount: price,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/cancel`,
        metadata: {
            playerName,
            ticketType,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
        },
    });

    return session;
}

/**
 * Retrieves a checkout session by ID
 */
export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    return await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent'],
    });
}