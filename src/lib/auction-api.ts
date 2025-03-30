// src/lib/auction-api.ts
import { AuctionItem } from '@/types/auction';

// プラグインのWebAPIエンドポイント
const API_BASE_URL = 'http://100.76.121.124:2445';

export async function fetchAuctionItems(): Promise<AuctionItem[]> {
    const response = await fetch(`${API_BASE_URL}/items`);

    if (!response.ok) {
        throw new Error(`Failed to fetch auction items: ${response.status}`);
    }

    return response.json();
}

export async function fetchAuctionItem(id: number): Promise<AuctionItem> {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch auction item: ${response.status}`);
    }

    return response.json();
}

export async function placeBid(itemId: number, amount: number): Promise<{ success: boolean; message: string }> {
    // ユーザー認証のためのUUID取得（実際のアプリではユーザー認証情報を使用）
    const playerUuid = localStorage.getItem('playerUuid');

    if (!playerUuid) {
        throw new Error('ログインしていません。入札するにはログインが必要です。');
    }

    const response = await fetch(`${API_BASE_URL}/bid`, {
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