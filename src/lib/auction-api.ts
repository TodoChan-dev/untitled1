// src/lib/auction-api.ts
import { AuctionItem } from '@/types/auction';

export async function fetchAuctionItems(): Promise<AuctionItem[]> {
    const response = await fetch('/api/auction/items');

    if (!response.ok) {
        throw new Error(`Failed to fetch auction items: ${response.status}`);
    }

    return response.json();
}

export async function fetchAuctionItem(id: number): Promise<AuctionItem> {
    const response = await fetch(`/api/auction/items/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch auction item: ${response.status}`);
    }

    return response.json();
}

export async function placeBid(itemId: number, amount: number): Promise<{ success: boolean; message: string }> {
    // In a real application, you would get the player UUID from a context or state
    // For demo purposes, we'll check localStorage, but this could be replaced with a more robust auth system
    let playerUuid = "";

    if (typeof window !== 'undefined') {
        playerUuid = localStorage.getItem('playerUuid') || "demo-player-uuid";
    }

    const response = await fetch('/api/auction/bid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            itemId,
            amount,
            playerUuid
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to place bid');
    }

    return data;
}